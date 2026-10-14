# Conventions & code standards

## Language of the repositories

Everything committed to any Twine repository is written in **English**:
code identifiers, comments, commit messages, documentation, issue/PR text,
branch names, ADRs, and OpenSpec artifacts. Working chat with maintainers may be
in any language; the repository is English-only.

## Design principles

Twine follows **SOLID** and general clean-code practice. Concretely, in this
codebase:

- **Single Responsibility** — each plugin does one job; each transport provider
  handles one protocol; per-process binaries have one responsibility.
- **Open/Closed** — new transports (VNC, Moonlight) are added by implementing
  `RemoteSessionProvider`; core protocol code is not modified.
- **Liskov Substitution** — any provider can stand in for another wherever a
  provider is required; the control plane treats them uniformly.
- **Interface Segregation** — narrow, purpose-specific interfaces (provider,
  host, packet handler) instead of one fat interface.
- **Dependency Inversion** — the presentation layer depends on the DBus
  abstraction, not on core internals; transports depend on a small interface,
  not on concrete clients.

Additional rules:

- Keep functions small and single-purpose.
- Prefer composition over inheritance.
- No unrelated refactors in a feature PR (see [CONTRIBUTING](../../CONTRIBUTING.md)).
- Every change is backed by an OpenSpec change with specs and tasks.

## Branches & commits

- Branch names: `feat/<topic>`, `fix/<topic>`, `chore/<topic>`, `docs/<topic>`.
- Branch off `main`, open a PR, squash-merge, delete the branch.
- Commit messages: **Conventional Commits** (`feat:`, `fix:`, `docs:`,
  `chore:`, `refactor:`, `test:`, `ci:`, `perf:`).

## Style & tooling by language

| Layer | Language | Format | Static analysis | Compile gate |
| --- | --- | --- | --- | --- |
| Desktop | C++17 / Qt6 / KF6 | `clang-format` | `clang-tidy`, `cppcheck` | `cmake --build`, warnings-as-errors; ASan/UBSan in CI debug |
| Desktop build | CMake | `cmake-format` | `cmake-lint` | configure + build |
| Android | Kotlin | `ktlint` | `detekt`, Android Lint | Gradle `assembleDebug` |
| Android deps | Gradle | — | Dependency analysis | `./gradlew build` |
| Docs site | TypeScript/Vue | `prettier` | `eslint` (flat config), `vue-tsc` typecheck | VitePress build |
| Markdown | — | `prettier` | `markdownlint-cli2` | — |
| Workflows | YAML | `prettier` | `actionlint`, `yamllint` | — |
| Scripts | PowerShell/Bash | — | `PSScriptAnalyzer` / `shellcheck` | — |

`eslint` is used where JavaScript/TypeScript exists (the documentation site and
any tooling) — for other languages the equivalent static-analysis tool listed
above applies. The principle is the same across the project: **formatter +
linter + static analyzer + compile gate**, enforced in CI.

## Testing

See [testing](./testing.md). Every feature PR ships tests; the default is unit
tests plus, where relevant, integration tests.

## CI gates

Every repository's CI must, at minimum: format check, lint, static analysis,
build, and test. Red CI blocks merge.
