# Non-functional requirements

## Performance

- **NFR-1** Desktop daemon ready (service registered): < 500 ms warm, < 2 s
  cold.
- **NFR-2** Desktop daemon fully idle (discovery up): < 1.5 s warm.
- **NFR-3** Desktop main window visible: < 300 ms from the resident process.
- **NFR-4** Desktop main window interactive (first input): < 800 ms.
- **NFR-5** Remote desktop session start-to-first-frame: < 3 s on a LAN.

All performance claims must be **measured with per-line timestamped
instrumentation** and recorded in
[startup performance](../architecture/startup-performance.md).

## Reliability

- **NFR-10** A dropped control-plane connection reconnects automatically without
  re-pairing.
- **NFR-11** A failed transport session never leaves stale credentials or
  processes.
- **NFR-12** No failure is swallowed silently — every error is surfaced in logs
  and, where user-facing, in the UI.

## Security

- **NFR-20** Pairing requires explicit user approval on both ends.
- **NFR-21** Control-plane traffic is mutually authenticated TLS.
- **NFR-22** Remote-session server certificates are pinned to the fingerprint
  delivered over the control plane.
- **NFR-23** Ephemeral remote-session credentials expire (TTL) and are never
  persisted in plaintext.

## Portability & maintainability

- **NFR-30** The desktop core stays UI-agnostic (DBus boundary) so the
  presentation layer is replaceable.
- **NFR-31** The transport layer is pluggable (provider interface).
- **NFR-32** Code follows SOLID and the project
  [conventions](../development/conventions.md).
- **NFR-33** Every repository enforces format, lint, static analysis, build and
  test gates in CI.

## Usability

- **NFR-40** Primary actions (connect, wake, start session) are reachable in one
  or two taps.
- **NFR-41** The UI is documented and consistent across platforms.
