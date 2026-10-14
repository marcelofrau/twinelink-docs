# ADR-0003: Pluggable transport, FreeRDP first

- Status: accepted

## Context

Remote desktop can be delivered many ways (RDP, VNC, Moonlight). The Windows
host has a native RDP server. Hard-wiring one into the core would make adding
others expensive.

## Decision

Define one `RemoteSessionProvider` interface (id, capabilities, start, stop,
input, signals). Ship a **FreeRDP** provider first (Apache-2.0, RDPGFX/AVC420,
certificate pinning). VNC and Moonlight become additional providers later. The
control plane only negotiates; it carries no media.

## Consequences

- New transports are additive (OCP), no core changes.
- Providers are self-contained and independently testable.
- A minimal interface must be maintained carefully to avoid leaking provider
  specifics (R-6).
