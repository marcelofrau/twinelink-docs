# Testing strategy

Testing is part of every change, not an afterthought. Each OpenSpec change
includes a `tasks.md` whose items cover tests, and CI enforces the gates.

## Levels

```mermaid
flowchart LR
  Unit[Unit tests] --> Integration[Integration tests] --> Manual[Manual device tests] --> E2E[End-to-end]
```

- **Unit** — pure logic: packet encode/decode, WoL magic-packet builder,
  session-info validation, provider registry.
- **Integration** — two processes/sides: control-plane handshake, capability
  negotiation, a managed RDP session against a test host.
- **Manual device tests** — real Windows + Android hardware; recorded as a
  checklist in the change (format, flow, expected result).
- **End-to-end** — automated where feasible (networking harness); otherwise the
  documented manual checklist.

## Framework per layer

| Layer | Framework |
| --- | --- |
| C++ / Qt | Qt Test (`QTest`) |
| Kotlin / Android | JUnit 5 + Robolectric; instrumented tests where needed |
| Docs / TS | Vitest |

## Coverage

- Coverage is measured (C++: `gcov`/`llvm-cov`; Kotlin: JaCoCo).
- Target: no decrease on a PR; new code should be covered.
- Coverage is reported in CI but is not the sole gate — behavior matters.

## What every change must include

- [ ] At least one unit test for new logic.
- [ ] An integration or manual test where the feature crosses the wire or a
      device boundary.
- [ ] Failed-approach notes for anything that did not work (so we do not repeat
      it).

## Instrumentation

For performance work (see
[startup performance](../architecture/startup-performance.md)), tests and logs
must carry **per-line timestamps** so measurements are provable rather than
asserted.
