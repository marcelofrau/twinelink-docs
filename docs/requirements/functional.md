# Functional requirements

Numbered, testable requirements. Each maps to specs and milestones in the
[plan](../plan/roadmap.md).

## Core device link (inherited from KDE Connect)

- **FR-1** Pair two devices over the LAN with mutual TLS and a user-approved
  pairing step.
- **FR-2** Discover peers automatically on the local network (UDP 1716 and
  mDNS).
- **FR-3** Share the clipboard bidirectionally between paired devices.
- **FR-4** Send and receive files between paired devices.
- **FR-5** Mirror phone notifications to the desktop and dismiss them from
  either side.
- **FR-6** Control media playback (MPRIS) from the phone.
- **FR-7** Use the phone as a remote input device (mousepad / presenter).

## Wake-on-LAN (Twine)

- **FR-10** From the phone, send a Wake-on-LAN magic packet to a configured
  desktop.
- **FR-11** The desktop exposes its MAC address and broadcast address to a
  paired phone.
- **FR-12** The phone stores per-host WoL configuration for one-tap wake.
- **FR-13** The UI offers WoL only when a host is configured and reachable on
  the same network (or via a documented relay).

## Remote desktop (Twine)

- **FR-20** From the phone, start an RDP session to a paired desktop with one
  action.
- **FR-21** The desktop negotiates the session over the control plane and
  returns host, port, ephemeral credentials and a pinned certificate
  fingerprint.
- **FR-22** The Android client connects with an embedded FreeRDP client and
  validates the certificate against the pinned fingerprint.
- **FR-23** The session supports keyboard and pointer input and returns video
  using RDPGFX (AVC420 when available).
- **FR-24** Ending the session releases credentials and resources on both ends.
- **FR-25** The transport is pluggable: VNC and Moonlight can be added without
  changing the control plane.

## UX (Twine)

- **FR-30** The desktop opens its main window in under the NFR-5 budget from a
  resident process (no cold process spawn).
- **FR-31** Both clients follow a consistent, documented design language.
- **FR-32** The desktop runs in the system tray and starts on logon.

## Compatibility

- **FR-40** A Twine device interoperates with a stock KDE Connect peer for all
  FR-1..FR-7 capabilities.
- **FR-41** Twine-only features degrade gracefully (are hidden) with stock
  peers.
