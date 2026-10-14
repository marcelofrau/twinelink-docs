# Functional requirements

## Base device link (inherited from KDE Connect)

- **FR-1** The user can pair a phone and a computer with mutual confirmation.
- **FR-2** Paired devices can exchange clipboard contents.
- **FR-3** The user can send and receive files.
- **FR-4** The computer can mirror the phone notifications.
- **FR-5** The phone can act as a remote input/pointer for the computer.
- **FR-6** Media playback can be controlled from the phone.
- **FR-7** Paired devices reconnect automatically without re-pairing.

## Wake-on-LAN

- **FR-10** A paired phone can wake a sleeping computer on the same LAN with one
  action.
- **FR-11** The computer exposes its MAC address and broadcast address to paired
  devices.
- **FR-12** If the phone is not on the same LAN, the app explains that a relay or
  router feature is required instead of failing silently.
- **FR-13** The user can store per-host wake configuration.

## Remote desktop

- **FR-20** A paired phone can start a remote desktop session on the computer.
- **FR-21** The computer orchestrates the session over the control plane and
  returns host, port, ephemeral credentials and the pinned certificate
  fingerprint.
- **FR-22** The client verifies the pinned fingerprint before connecting.
- **FR-23** The session uses a transport provider (FreeRDP first).
- **FR-24** The user can end the session; credentials and processes are released.
- **FR-25** Latency and image quality are adequate for desktop use on a LAN.

## UX

- **FR-30** The desktop client starts fast and the main window opens without a
  process spawn.
- **FR-31** The Android UI is modern (Material 3) and consistent with the
  desktop.
- **FR-40** Twine-only features require the peer to advertise the capability, so
  stock KDE Connect peers are unaffected.
- **FR-41** A peer without a capability never receives packets for that feature.
