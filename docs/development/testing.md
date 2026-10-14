# Testing

## Philosophy

Tests are part of the definition of done. New logic ships with tests. Tests are
deterministic and run in CI.

## Unit tests

| Area               | Framework | Notes                                     |
| ------------------ | --------- | ----------------------------------------- |
| Desktop core (C++) | Qt Test   | plugin, provider, negotiation logic       |
| Android (Kotlin)   | JUnit     | view models, controllers, packet handling |
| Docs tooling (TS)  | minimal   | build must succeed; ESLint gates config   |

## Coverage

Aim for meaningful coverage of core logic (target 70% on core modules). Coverage
is reported in CI; regressions are flagged, not silently accepted.

## Integration

- Control-plane handshake and capability negotiation between the two apps.
- Remote-session negotiation (without real media) using the provider interface.
- Wake-on-LAN packet construction (magic packet correctness).

## Instrumentation

Startup and latency are measured with per-line timestamped logs, not by feel. The
measurement points are defined in the startup-performance document.

## Real-device verification

Desktop changes are verified on real Windows hardware; Android changes on a real
device. Build-only success is not acceptance.

## Failure visibility

No failure is swallowed. Errors are logged and, where user-facing, surfaced in
the UI.
