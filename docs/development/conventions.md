# Conventions and code standards

## Language

Everything committed - code, comments, commit messages, docs, PRs - is in
**English**. Conversation between maintainers may be in any language.

## Branching and commits

- Branches: `feat/<topic>`, `fix/<topic>`, `docs/<topic>`, `chore/<topic>`.
- Commits: **Conventional Commits** (`feat:`, `fix:`, `docs:`, `refactor:`,
  `test:`, `chore:`).
- PRs: one concern each; red CI blocks merge; squash-merge.

## Architecture principles

All code follows **SOLID**:

- **S**ingle responsibility - one plugin/provider/module does one job.
- **O**pen/closed - new transports and plugins are added without editing the
  core.
- **L**iskov - providers are interchangeable behind the interface.
- **I**nterface segregation - narrow interfaces (`RemoteSessionProvider`).
- **D**ependency inversion - the UI depends on the DBus abstraction, not on core
  internals; the core depends on interfaces, not concrete transports.

Prefer small, testable units and explicit dependencies.

## Static analysis and compilation tooling

Quality is enforced by tooling, not by convention alone. Per language:

| Language                | Format         | Lint / static analysis           | Type / build checks                                         |
| ----------------------- | -------------- | -------------------------------- | ----------------------------------------------------------- |
| C++ / Qt (desktop)      | `clang-format` | `clang-tidy`, `cppcheck`, IWYU   | warnings-as-errors, ASan/UBSan on debug CI                  |
| Kotlin (android)        | `ktlint`       | `detekt`, Android Lint           | `assembleDebug`, javac/kt warnings-as-errors where possible |
| TypeScript / Vue (docs) | `prettier`     | `eslint` (flat config)           | VitePress build, `vue-tsc`                                  |
| Markdown                | `prettier`     | `markdownlint-cli2`              | link check                                                  |
| YAML / CI               | -              | `actionlint`, `yamllint`         | -                                                           |
| Shell / PowerShell      | -              | `shellcheck`, `PSScriptAnalyzer` | -                                                           |

Every repository runs these in CI; a failure blocks merge.

## Sizing

Prefer functions that fit on a screen and files that stay under a few hundred
lines. Split rather than nest.

## No comments unless asked

Comments explain intent, not mechanics; keep them rare and meaningful.
