# Constraints

Hard constraints the project must respect. These are not preferences.

## Platform

- **C-1** Windows is the primary desktop target. The desktop core must build and
  run on Windows without KDE Plasma.
- **C-2** Windows remote desktop host uses the OS RDP server. RDP host is
  available on Windows Pro/Enterprise; Windows Home requires RDPWrapper — this
  must be documented and detected.
- **C-3** DBus is not native on Windows; a session bus must be bundled or IPC
  moved off DBus.
- **C-4** Wake-on-LAN works only on the same L2 network by default; WAN wake
  requires a relay (router, always-on host, or port-forward) — documented, not
  assumed.
- **C-5** Android native builds use the NDK; FreeRDP and its dependencies
  (OpenSSL, OpenH264) must be packaged into the APK.

## Compatibility

- **C-10** Protocol identifiers stay `kdeconnect.*`; the product name never
  changes the wire format.
- **C-11** Stock KDE Connect peers must remain interoperable.

## Licensing

- **C-20** Desktop and Android forks are **GPL-2.0-or-later** (inherited).
  Derivative work must remain GPL-compatible.
- **C-21** FreeRDP is **Apache-2.0** — compatible when linked; attribution in
  `THIRD_PARTY`.
- **C-22** Documentation is **CC BY 4.0** unless stated otherwise.

## Process

- **C-30** Everything committed is in **English**.
- **C-31** Upstream KDE does not accept AI-engineered contributions
  (`AGENTS.md`); Twine is a hard fork and does not send MRs upstream.
- **C-32** Every feature is delivered through an OpenSpec change (proposal →
  specs → design → tasks) before code.
