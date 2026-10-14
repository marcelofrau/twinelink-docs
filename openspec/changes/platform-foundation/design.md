## Context

twinelink spans a C++/Qt desktop client, a Kotlin Android app and a documentation
repository. Without written invariants the three drift apart.

## Decisions

### D1: Two planes

Control (KDE Connect protocol, TLS, capabilities) is separate from transport
(FreeRDP first, VNC/Moonlight later). The control plane only negotiates.

### D2: Protocol unchanged

`kdeconnect.*` identifiers, config dir and device identity are untouched, so
interop with stock KDE Connect holds and twinelink features degrade gracefully.

### D3: One provider interface

`RemoteSessionProvider` is the only seam between the core and a transport.

### D4: Repo topology

Polyrepo tied by a meta superproject; OpenSpec store in the docs repository;
changes live in the repository they modify.

## Alternatives considered

- Monorepo: rejected (no shared code, different build systems, couples CI).
- One fork only: rejected (features need UI on both ends).
- Bespoke protocol: rejected (reinvents pairing/TLS/discovery).

## Risks / Trade-offs

- Cross-repo specs can drift from code: mitigated by `openspec doctor` and the
  store.
- Hard fork loses upstream MRs: mitigated by keeping `upstream` for security
  cherry-picks.
