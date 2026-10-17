# Session log

Running project journal. Append new entries at the top. Purpose: let any
contributor or AI agent continue the work across sessions. English only.

## 2026-10-17 - M1 started: startup trace and the first measured baseline

Implemented the measurement half of `windows-startup-perf` (tasks 1.1 and 1.2).

### Instrumentation

- `core/startuptrace.{h,cpp}`: per-line timestamped startup trace, exported by
  `kdeconnectcore`. Fields: `proc_ms` (since OS process creation, via
  `GetProcessTimes` / `/proc`), `lib_us` (since the trace library was loaded),
  `delta_us` (since the previous mark), plus wall clock, pid and process name.
  On by default; `TWINELINK_STARTUP_TRACE=0` silences it,
  `TWINELINK_STARTUP_TRACE_FILE` captures to a file, flushed per line.
- Marks in the daemon (`daemon/kdeconnectd.cpp`, `core/daemon.cpp`,
  `daemon/desktop_daemon.cpp`), the UI (`app/main.cpp`, including first frame via
  `QQuickWindow::frameSwapped` and first input via an event filter) and the tray
  (`indicator/main.cpp`).
- The UI process does not link `kdeconnectcore` (it must stay slim), so it
  compiles its own copy of the trace (`KDECONNECT_STARTUPTRACE_STATIC`).

### Measured (dev machine, warm, `RelWithDebInfo`)

Three runs each, min / median / max:

- Daemon: `org.kde.kdeconnect` registered **191 / 206 / 240 ms** after process
  creation.
- App: first frame **2228 / 2241 / 2267 ms**, of which **2.17 s** is the QML
  engine and module load; everything the C++ side does fits in 96 ms. A first
  QML load without a compiled or disk cache measured **7.9 s**.
- Indicator: tray icon visible **94 / 101 / 109 ms**.

Method, the per-phase table and the harness script
(`desktop/tools/measure-startup.ps1`) are in
`docs/architecture/startup-performance.md`.

### New evidence (recorded as finding 7)

The daemon spawns the tray and the tray spawns the daemon, both unconditionally
(`daemon/kdeconnectd.cpp`, `indicator/main.cpp` +
`indicator/indicatorhelper_win.cpp`). Duplicate suppression rests entirely on
`KDBusService::Unique`, i.e. on a working session bus; without one, starting the
tray boots a second daemon and a second tray.

### Tooling corrections

- `.clang-format` contradicted the codebase (column limit 100, left-aligned
  pointers, `Cpp11BracedListStyle` off), so a whole-file check would have
  reformatted every upstream file it touched — unacceptable for a fork that
  pulls upstream security fixes by hand. Corrected to match the existing KDE
  style; repo-wide violations dropped from 109 files to 80.
- CI now checks only the lines a change touches
  (`git-clang-format-18 --binary clang-format-18 --diff <base> HEAD`), pinned to
  clang-format 18.
- Local build recipe that works: enter the VS2022 **Community** developer shell,
  then prepend `C:\CraftRoot\bin` to `PATH`. Craft's `craftenv.ps1` selects the
  BuildTools toolchain and the build fails.
- `docs:build` fails locally with 19–20 "dead link" errors for links that
  resolve fine in CI. Cause found: this machine reaches the workspace both as
  `F:\workspace\twinelink` (real) and `C:\Users\marcelo\workspace\twinelink`
  (junction); VitePress resolves files to the `F:` path but links against the
  `C:` root. Run npm/vitepress from `F:\workspace\twinelink\docs` and the build
  passes. Not a Node version issue (reproduced on Node 26 and 20).

Next: task 1.3 (cold baseline on the release machine), then the cheap wins (2.x).

## 2026-10-14 - Dev environment ready (desktop, M1 enabler)

Installed a reproducible local Windows build for the desktop client:

- KDE Craft bootstrapped at `C:\CraftRoot` (ABI `windows-cl-msvc2022-x86_64`).
- Visual Studio 2022 C++ toolchain (Community); Craft deps for
  `kde/applications/kdeconnect-kde` installed from the prebuilt msvc2022 cache.
- Configured and built the fork: 504/504 targets; binaries in `build/bin`
  (`kdeconnectd`, `kdeconnect-app`, `kdeconnect-indicator`, `kdeconnect-cli 26.11.70`, tests).
- Recipe documented in `docs/development/build-desktop.md`.

Consequence: M1 (`windows-startup-perf`) is now verifiable locally
(build + run + measure), not just by CI.

## 2026-10-14 - Inception and M0 foundation

### Context

Goal: fork KDE Connect into **twinelink** (identifier `twinelink`) - an open-source
cross-device link with a modern UX, remote desktop (RDP) and Wake-on-LAN.
Windows-first, personal project opened to the community, GPL-2.0-or-later.

### Decisions

- Name: `twinelink` (disambiguates from PyPA `twine`/twinery). Protocol ids stay `kdeconnect.*`.
- Fork strategy: hard fork of KDE Connect (desktop + android). No upstream MRs (KDE forbids AI-engineered MRs).
- Topology: meta repo + submodules (desktop/android/docs). Not a monorepo.
- Transport: pluggable `RemoteSessionProvider`; FreeRDP embedded first (Moonlight/VNC later).
- OpenSpec: changes live per code repo; central store in the docs repo.
- All committed artifacts in English; chat may be in Portuguese.

### Built (M0)

- GitHub repos under `marcelofrau`: `twinelink` (meta), `twinelink-desktop`, `twinelink-android`, `twinelink-docs`.
- Seeded from KDE upstream; `upstream` remote kept for reference/security merges.
- Meta repo ties the three repos via git submodules.
- OpenSpec store `twinelink` (docs) + workset `twinelink`.
  Changes: `platform-foundation` (docs), `windows-startup-perf` (desktop), `compose-ui-rewrite` (android).
- Docs: architecture (Mermaid), requirements (FR/NFR/constraints), plan (roadmap, milestones, risk register), development docs, ADRs 0001-0005, governance files.
- VitePress docs site + GitHub Pages: https://marcelofrau.github.io/twinelink-docs/
- CI green: desktop (clang-format; cmake configure advisory), android (`assembleDebug` + `testDebugUnitTest` + `lintDebug`), docs (eslint + prettier + build + Pages deploy).

### Startup-performance diagnosis (feeds `windows-startup-perf`)

Ranked causes of slow desktop startup:

1. Cold-start weight: every binary is a full Qt6 + KDE Frameworks app; Windows Defender scans each DLL on first load. Dominant cost.
2. Breeze forced everywhere (`setStyle("breeze")`, `QIcon::setThemeName("breeze")`), even in the headless daemon; `QIcon::fromTheme` used widely.
3. Main window is a fresh process per click (tray does not host the UI).
4. DBus on Windows (session bus + `KDBusService` per process).
5. Synchronous init in `Daemon::init()` (LAN link provider, mDNS, cert checks) + daemon spawns the indicator at boot.
6. QML compiled to bytecode only (qmlcachegen), no AOT (qmltc); no shader cache.
   Fixes (cheap -> structural): Defender exclusions + signing; drop forced Breeze; remove `QQuickStyle` from daemon/indicator; host the window in the tray process; trim daemon deps (KIO/Notifications/ColorScheme); defer init; shader cache + qmltc.

### Current state

All CI green; submodules in sync; OpenSpec store/workset registered.

### Known gaps

- `ktlint` + `detekt` + JaCoCo not wired on android (CI uses Android Lint only).
- Windows desktop build still needs Craft; the off-Craft (vcpkg) path is not done.
- `clang-tidy`/`cppcheck` not yet in desktop CI.
- Name collision pass (domains, registries, trademark) pending.

### Next

- M1: implement `windows-startup-perf` (desktop), validate the off-Craft build.
- Then `compose-ui-rewrite` (android), WoL, transport abstraction + FreeRDP, rebrand UI.

### Notes for the next agent

- Work is driven by OpenSpec changes; open one before writing code.
- Read the repo `AGENTS.md` first. Keep protocol identifiers unchanged.
- Verify on real Windows hardware where possible.
