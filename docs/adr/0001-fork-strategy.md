# ADR-0001: Fork KDE Connect rather than rewrite

- Status: accepted

## Context

KDE Connect already solves the hard control-plane problems: pairing with mutual
TLS, LAN discovery, a capability/packet protocol, and a plugin system (clipboard,
files, notifications, media, input). What it lacks is Wake-on-LAN, an integrated
remote desktop, a polished cross-platform UX, and fast startup on Windows.

## Decision

Fork the desktop (`KDE/kdeconnect-kde`) and Android (`KDE/kdeconnect-android`)
clients and evolve them. Do **not** rewrite the protocol. Do **not** fork the
transport projects (FreeRDP, RustDesk, Moonlight) - consume them.

The fork is a **hard fork**: upstream KDE does not accept AI-engineered
contributions, and Twine direction (Windows-first, custom UI) diverges. An
`upstream` remote is kept to cherry-pick security fixes.

## Consequences

- Fast start on the hard part; reuse a battle-tested protocol.
- Interoperability with stock KDE Connect is preserved (C-11).
- We inherit GPL-2.0-or-later (C-20) and KDE Frameworks weight to be pruned.
- We must actively pull upstream security fixes (R-5).
