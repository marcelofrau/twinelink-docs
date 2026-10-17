# Milestones

Each milestone is delivered through one or more OpenSpec changes. A change is
not started until its proposal, specs, design and tasks are written. A milestone
is not done until its checklist is complete and verified on real hardware.

## M0 - Foundations

- [x] Repositories created: `twinelink`, `twinelink-desktop`, `twinelink-android`, `twinelink-docs`
- [x] Meta superproject with submodules
- [x] OpenSpec initialised in each repo + docs store registered
- [x] Documentation skeleton (this site)
- [x] Governance: CONTRIBUTING, SECURITY, CODE_OF_CONDUCT, LICENSE
- [x] CI skeletons

## M1 - Desktop startup performance

OpenSpec change: `windows-startup-perf`.

- [ ] Defender exclusion + code signing documented
- [ ] Drop forced Breeze style/icon theme on Windows
- [ ] Remove `QQuickStyle::setStyle` from non-QML processes
- [ ] Slim daemon dependencies (drop KIOWidgets/Notifications/ColorScheme/QuickControls2/Widgets)
- [ ] Defer plugin scan, notification init, discovery to idle
- [ ] Single resident process: daemon + tray + window
- [ ] `qmltc` + shader disk cache + LTCG/PGO
- [ ] Measured before/after recorded in startup-performance.md

## M2 - Desktop UI rebrand

OpenSpec change: `rebrand-desktop-ui`.

- [ ] Design tokens and components defined
- [ ] Qt Quick Controls UI replacing Kirigami/Plasma
- [ ] Tray + window flows
- [ ] Accessibility and keyboard navigation

## A2 - Android UI rewrite

OpenSpec change: `compose-ui-rewrite`.

- [ ] Compose + Material 3 shell
- [ ] Port existing plugin screens
- [ ] Design tokens shared with desktop

## M3 / A3 - Wake-on-LAN

OpenSpec changes: `wake-on-lan-desktop`, `wake-on-lan-android`.

- [ ] MAC + broadcast exchange capability
- [ ] Magic packet sender with unit tests
- [ ] Per-host WoL config and one-tap wake
- [ ] Same-LAN detection and relay guidance

## M4 / A4 - Remote desktop

OpenSpec changes: `remote-session-host`, `transport-abstraction`, `freerdp-embedded-client`.

- [ ] `RemoteSessionProvider` interface
- [ ] Host orchestration over control plane (ephemeral creds, pinned fingerprint)
- [ ] Embedded FreeRDP client with cert pinning
- [ ] RDPGFX/AVC420 benchmark
- [ ] Session teardown and credential TTL

## M5 - Release

- [ ] Full CI matrix green
- [ ] Signed desktop installer + APK
- [ ] Docs site published
- [ ] Release notes and compatibility matrix
