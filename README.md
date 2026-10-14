# Twine documentation

Home of Twine architecture, requirements, roadmap and specifications.

> Twine links your devices: remote desktop (RDP), Wake-on-LAN, file transfer,
> clipboard, notifications and a modern cross-platform UX. Open source, a hard
> fork of KDE Connect.

## Layout

| Path                 | Contents                                       |
| -------------------- | ---------------------------------------------- |
| `docs/architecture/` | Architecture, protocol, transport, performance |
| `docs/requirements/` | Functional, non-functional, constraints        |
| `docs/plan/`         | Roadmap, milestones, risk register             |
| `docs/development/`  | Setup, builds, conventions, testing            |
| `docs/adr/`          | Architecture Decision Records                  |
| `openspec/`          | OpenSpec store (specs hub)                     |

## Build the docs site

```bash
npm install
npm run docs:dev      # local preview
npm run docs:build    # production build
```

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md). Everything here is English.
