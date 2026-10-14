# Startup performance — diagnosis and targets

This document records *why* upstream KDE Connect feels slow on Windows and the
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

## Targets

See [NFR-1..NFR-5](../requirements/non-functional.md). Summary:

| Metric | Target |
| --- | --- |
| Daemon service registered (warm) | < 500 ms |
| Daemon service registered (cold) | < 2 s |
| Main window visible | < 300 ms |
| Main window interactive | < 800 ms |
| Session start to first frame | < 3 s |

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

Every claim above is re-measured on real Windows hardware with per-line
timestamped logs, recorded here as a table (warm/cold, before/after) once M1
lands.
