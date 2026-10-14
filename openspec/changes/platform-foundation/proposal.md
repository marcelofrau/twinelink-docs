## Why

twinelink is a multi-repository project that must keep a stable architecture across
components, a protocol that stays interoperable with KDE Connect, and a
consistent developer experience. These invariants must be written down as specs
before code diverges.

## What Changes

- Establish the platform architecture as a specification: control plane vs
  transport plane, protocol interop, pluggable transports, and the desktop
  single-process model.
- Establish the licensing and language rules.

## Capabilities

### New Capabilities

- `platform-architecture`: the invariants that bind the desktop, Android and
  documentation repositories together.

### Modified Capabilities

<!-- none: foundation -->

## Impact

- Applies to all repositories in the set.
- No code impact by itself; it constrains future changes.
