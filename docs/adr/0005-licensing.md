# ADR-0005: Licensing

- Status: accepted

## Context

The desktop and Android forks inherit KDE Connect GPL-2.0-or-later. FreeRDP is
Apache-2.0. Documentation should allow broad reuse.

## Decision

- Code (desktop, android): **GPL-2.0-or-later**.
- Documentation: **CC BY 4.0**.
- FreeRDP and other third-party components: kept under their own licenses, listed
  in `THIRD_PARTY`.

## Consequences

- Derivative work must stay GPL-compatible (C-20).
- FreeRDP is linkable under GPL (C-21).
- Docs can be reused with attribution.
