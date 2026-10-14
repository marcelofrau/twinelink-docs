# Desktop architecture

`twinelink-desktop` is a hard fork of KDE Connect's desktop client, retargeted
to Windows-first and a modern Qt Quick UI.

## Inheritance

- `core/` - protocol, daemon, plugins, link providers, backends.
- `daemon/` - the `twinelinkd` process.
- UI components (`app/`, `indicator/`, ...) - **replaced**.

The KDE `core` exposes a **DBus API** and keeps the UI decoupled. Twine keeps
that boundary (NFR-30): the core stays UI-agnostic, and the presentation layer is
swappable.

## Target process model

Upstream splits into `kdeconnectd` + `kdeconnect-indicator` + `kdeconnect-app`.
Twine collapses these into **one resident process** hosting the daemon, the tray
and the window, eliminating the cold-start cost of opening the UI. See
[startup performance](./startup-performance.md).

## Dependencies to shed on Windows

| Framework | Why | Replacement |
| --- | --- | --- |
| `KF6::KIOWidgets` | heavy I/O stack in the daemon | `QNetworkAccessManager`, `QFile` |
| `KF6::ColorScheme` / Breeze style | forced style + icon theme | native style + baked QRC icons |
| `KF6::Notifications` | desktop notify | native Windows toasts |
| `Qt::QuickControls2` in daemon | unused | none |
| `KF6::I18n` at startup | eager translation load | lazy |

## Build

Off-Craft. See [build desktop](../development/build-desktop.md).

## UI

Rewritten in Qt Quick Controls (no Kirigami/Plasma), precompiled with `qmltc`.
See the M2 change `rebrand-desktop-ui`.
