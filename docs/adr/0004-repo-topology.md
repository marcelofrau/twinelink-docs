# ADR-0004: Polyrepo with a meta superproject

- Status: accepted

## Context

The desktop (C++/Qt/CMake) and Android (Kotlin/Gradle) sides share no code and
use different build systems. A single repository couples their CI and history.

## Decision

Keep separate repositories - `twinelink-desktop`, `twinelink-android`,
`twinelink-docs` - and tie them with a **meta repository** that uses git
submodules. OpenSpec uses `twinelink-docs` as the registered store; changes live
in the repo they modify.

## Consequences

- Independent CI, versioning and upstream remotes per repo.
- Clean `upstream` fetches without monorepo conflicts.
- One meta clone gives a complete workspace (`--recurse-submodules`).
- Slightly more ceremony to keep submodule pointers current.
