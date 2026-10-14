# Session log

Running project journal. Append new entries at the top. Purpose: let any
contributor or AI agent continue the work across sessions. English only.

## 2026-10-14 - Inception and M0 foundation

### Context

Goal: fork KDE Connect into **Twine** (identifier `twinelink`) - an open-source
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
