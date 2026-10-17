# Startup performance — diagnosis and targets

This document records _why_ upstream KDE Connect feels slow on Windows and the
plan to fix it. It is evidence-based: findings cite the upstream source.

## Evidence (upstream KDE Connect)

Each of the three binaries is a full Qt6 + KDE Frameworks application.

1. **Dependency weight.** `kdeconnectd` links `KF6::KIOWidgets`,
   `KF6::Notifications`, `KF6::ColorScheme`, `Qt::QuickControls2`,
   `Qt::Widgets` (`daemon/CMakeLists.txt`). The UI app links `Qt::Quick`,
   `Qt::QuickControls2`, `Qt::Widgets`, `KF6::CoreAddons/I18n/I18nQml/
ColorScheme/ItemModels/DBusAddons/WindowSystem` (`app/CMakeLists.txt`).
   On Windows, cold start pays disk + Defender scan for every DLL.
2. **Forced Breeze everywhere.** `KColorSchemeManager::instance()` +
   `QApplication::setStyle("breeze")` + `QIcon::setThemeName("breeze")` run in
   the daemon, app, indicator, urlhandler and smsapp; the daemon even calls
   `QQuickStyle::setStyle("org.kde.desktop")` although it renders no QML
   (`kdeconnectd.cpp`). This loads a QStyle plugin and parses the SVG icon
   theme.
3. **UI window is a fresh process.** The tray launches `kdeconnect-app` on
   demand instead of hosting the window; every open is a cold start.
4. **DBus on Windows.** Every process registers a unique DBus service and
   per-device object trees; DBus is not native on Windows.
5. **Synchronous init.** `Daemon::init()` registers DBus, builds the
   `LanLinkProvider` (UDP + mDNS), reads paired-device certificates, starts
   providers and initialises notifications in one blocking sequence; the daemon
   also spawns the indicator at logon.
6. **QML is bytecode-only.** Modules are registered via `ecm_add_qml_module`
   (qmlcachegen) with no `qmltc` AOT; there is no shader disk cache.
7. **Mutual unconditional spawn.** The daemon spawns the tray at logon
   (`daemon/kdeconnectd.cpp`: `ProcessHelper::startDetached("kdeconnect-indicator.exe")`
   under `Q_OS_WIN`) and the tray spawns the daemon (`indicator/main.cpp` calls
   `IndicatorHelper::startDaemon()` → `indicator/indicatorhelper_win.cpp`:
   `kdeconnectd.start("kdeconnectd.exe")`). Neither side checks whether the
   peer is already alive, so duplicate suppression rests entirely on
   `KDBusService::Unique`, that is, on a working session bus. Measured on
   Windows without a session bus, starting the tray boots a second daemon and,
   through it, a second tray. This is the same reason "open the window" never
   reuses a process.

## Targets

See [NFR-1..NFR-5](../requirements/non-functional.md). Summary:

| Metric                           | Target   |
| -------------------------------- | -------- |
| Daemon service registered (warm) | < 500 ms |
| Daemon service registered (cold) | < 2 s    |
| Main window visible              | < 300 ms |
| Main window interactive          | < 800 ms |
| Session start to first frame     | < 3 s    |

## Remediation plan

Cheap wins (M1):

1. Windows Defender exclusion for the install directory + code-signed binaries.
2. Do not force Breeze on Windows; use the native style and a baked icon set
   from embedded resources.
3. Remove `QQuickStyle::setStyle` from processes that render no QML.
4. Slim the daemon: `QCoreApplication`/`QGuiApplication`, drop `KIOWidgets`,
   `Notifications`, `ColorScheme`, `QuickControls2`, `Widgets`.
5. Defer plugin metadata scan, notification init and discovery to an idle timer;
   register the DBus service first.

Structural (M1):

6. One resident process hosting daemon + tray + window (no spawn to open UI).
7. Strip KDE Frameworks from the Windows build; rewrite the UI in plain Qt Quick
   Controls (no Kirigami/Plasma).
8. `qmltc` for the UI, Qt Quick shader disk cache (Qt 6.7+), LTCG + PGO build.

## Measurement

Startup is instrumented, not guessed: every number in this change comes from
the same per-line trace, and no claim is made without one.

### Harness

`kdeconnectcore` exports a startup trace (`core/startuptrace.h`). It is on by
default and emits one line per startup phase:

```
[startup] wall=2026-10-17T12:24:07.634 pid=29012 proc=kdeconnectd proc_ms=216 lib_us=158375 delta_us=114278 phase="daemon: KDBusService acquired"
```

| Field                 | Meaning                                                                                                                                                                              |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `proc_ms`             | milliseconds since the OS created the process; includes loader time (process creation time from `GetProcessTimes` on Windows, `/proc` elsewhere). This is the number the user feels. |
| `lib_us`              | microseconds since the trace library was loaded — the earliest instant the process can observe itself.                                                                               |
| `delta_us`            | microseconds since the previous mark: the cost of the phase.                                                                                                                         |
| `wall`, `pid`, `proc` | let traces of several processes be interleaved into one file.                                                                                                                        |

| Environment variable           | Effect                                                                                                                 |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| `TWINELINK_STARTUP_TRACE`      | `0` silences the trace (default: on)                                                                                   |
| `TWINELINK_STARTUP_TRACE_FILE` | appends the trace to this file, flushed per line; without it the lines go to the logging category `kdeconnect.startup` |

The marks cover exactly what the design asks for: process start, Qt
initialization, the style/icon decision, DBus registration, each deferred task,
the first window frame and the first input.

The UI process does not link `kdeconnectcore` (it must stay slim), so it
compiles its own copy of the trace (`app/CMakeLists.txt`,
`KDECONNECT_STARTUPTRACE_STATIC`).

### Baseline

Development machine (Windows 11, VS2022 x64, `RelWithDebInfo`, warm file cache,
no session bus — **not** a clean end-user machine; a session bus is what stops
the daemon and the tray from spawning each other). Measured 2026-10-17, one
representative run per binary, milliseconds since process creation:

| Phase                              | daemon | app               | indicator          |
| ---------------------------------- | ------ | ----------------- | ------------------ |
| process created → `main()`         | 134    | 39                | 40                 |
| → Qt application constructed       | 164    | 65                | 67                 |
| → style/icon decision applied      | 168    | 71                | 77                 |
| → DBus service acquired            | 189    | 96                | 106                |
| → last phase before the event loop | 302    | 2264 (QML module) | 111 (tray visible) |
| → `org.kde.kdeconnect` registered  | 197    | —                 | —                  |
| → first frame presented            | —      | 2272              | —                  |

Headline numbers, three runs each (`tools/measure-startup.ps1 -Runs 3`), min /
median / max in ms:

| Metric                                  | min  | median | max  |
| --------------------------------------- | ---- | ------ | ---- |
| daemon: `org.kde.kdeconnect` registered | 191  | 206    | 240  |
| app: first frame presented              | 2228 | 2241   | 2267 |
| indicator: tray icon visible            | 94   | 101    | 109  |

Reading, phase by phase:

- **The daemon is not the warm problem.** The service is registered ~200 ms
  after the process starts, inside the 500 ms target. Its largest single step is
  building the link providers (65 ms), not Qt (30 ms) or DBus (21 ms).
- **The UI process is.** The QML engine plus module load costs **2.17 s** of the
  2.27 s to the first frame; everything the C++ side does before it fits in
  96 ms. Nothing short of cutting the engine load will move that number.
- **Qt initialization, the style/icon decision and the DBus registration cost
  tens of milliseconds in every process.** They cannot explain a user-visible
  delay on a warm machine, whatever they may cost cold.
- A first-ever QML load (no compiled or disk cache — what a user gets right
  after an install) measured **7.9 s**.

Every number above moved by 10–25 % between runs: a single run is not a
measurement.

Cold numbers (first start after boot, Defender in its default configuration)
and the after-column are recorded on the release machine in task 7.1.

### Reproduce

1. Build `RelWithDebInfo` (see [build-desktop.md](../development/build-desktop.md)).
2. Measure with the harness:

   ```powershell
   .\tools\measure-startup.ps1 -Binary kdeconnectd -Runs 3
   .\tools\measure-startup.ps1 -Binary kdeconnect-app -Phase 'app: first frame presented'
   ```

   The script filters the trace by pid (the binaries spawn each other, so one
   file carries several processes), starts the binary with a visible window — a
   hidden UI process never presents a frame — and stops only processes it
   started from `build\bin`. `-KeepTrace` keeps the raw trace, which is what a
   performance report should carry.

3. `proc_ms` on the phase of interest is the metric. A cold measurement
   additionally needs a reboot (or an empty file cache) and an install directory
   that is not excluded from Defender.
