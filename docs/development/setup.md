# Development setup

## Prerequisites

- Git with submodule support.
- Windows: PowerShell 7, a C++ toolchain (MSVC), CMake, Qt 6 and KDE Frameworks 6
  (see [build desktop](./build-desktop.md)).
- Android: JDK 17+, Android SDK/NDK, Gradle.
- Node 20+ for the documentation site.
- OpenSpec CLI 1.5+ (`openspec`).

## Clone

```bash
git clone --recurse-submodules https://github.com/marcelofrau/twinelink.git
cd twinelink
# later updates
git submodule update --init --recursive
```

## OpenSpec

Each repo carries its own `openspec/`. The documentation repo is registered as
the **store**; the code repos are the set:

```bash
openspec store register ./docs
openspec workset create twinelink
openspec context --store twinelink --code-workspace twinelink.code-workspace
```

## Where things live

| Need                                | Location         |
| ----------------------------------- | ---------------- |
| Architecture, requirements, roadmap | `docs/`          |
| Desktop code                        | `desktop/`       |
| Android code                        | `android/`       |
| Specs hub (OpenSpec store)          | `docs/openspec/` |

## Conventions

See [conventions](./conventions.md). Everything committed is English.
