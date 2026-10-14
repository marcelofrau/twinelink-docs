# AGENTS.md - twinelink-docs

Project home and the registered OpenSpec store for **twinelink** (`twinelink`).

## Repo role

- Cross-cutting specs, architecture, requirements, roadmap, and the VitePress
  documentation site (content under `docs/`).
- OpenSpec store `twinelink` is registered here. Changes live in the repo they
  modify (desktop/android), not here.

## Commands

- Docs: `npm ci`, `npm run docs:dev`, `npm run docs:build`, `npm run lint`,
  `npm run format`.
- OpenSpec: `openspec list`, `openspec validate --all`,
  `openspec new change <name>`.

## Continuity

Read `docs/plan/session-log.md` for the running project journal.

## Working rules (all twinelink repositories)

- Everything committed is in English (docs, code, comments, commits, PRs).
  The maintainer chats in Portuguese and uses a terse, compressed style.
- OpenSpec-first: every feature/fix is an OpenSpec change (proposal, specs,
  design, tasks) approved before code is written.
- Branches `feat|fix|chore`; Conventional Commits; SOLID; unit tests for new logic.
- Lint/format/static analysis per language; CI must stay green.
- Do NOT rename KDE Connect protocol identifiers (`kdeconnect.*`), the config
  directory or the DBus service (interop with stock KDE Connect).
- No performance claim without a measurement method.
