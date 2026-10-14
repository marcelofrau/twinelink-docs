# Contributing to Twine

Thanks for helping. Twine is a hard fork of KDE Connect; see
[docs/adr/0001](docs/adr/0001-fork-strategy.md).

## Before you start

1. Read the [conventions](docs/development/conventions.md) and the
   [requirements](docs/requirements/functional.md).
2. **Every feature or fix is an OpenSpec change.** Create the proposal, specs,
   design and tasks first; then implement.
3. Everything committed is in **English**.

## Workflow

1. Fork/branch off `main`: `feat/<topic>`, `fix/<topic>`, `docs/<topic>`.
2. Commit with **Conventional Commits**.
3. Ensure format, lint, static analysis, build and tests pass locally.
4. Open a PR. Red CI blocks merge. Squash-merge and delete the branch.

## Design rules

- Follow **SOLID** and the project code standards.
- Tests are required for new logic (see [testing](docs/development/testing.md)).
- Keep PRs focused; no unrelated refactors.

## License

By contributing you agree your contribution is licensed under
**GPL-2.0-or-later** (code) or **CC BY 4.0** (docs). See [LICENSE.md](LICENSE.md).

## Code of Conduct

Participation is governed by the [Code of Conduct](CODE_OF_CONDUCT.md).
