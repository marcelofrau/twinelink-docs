# platform-architecture

## ADDED Requirements

### Requirement: Control plane and transport plane are separate

The system SHALL separate a trusted control plane (intent, pairing, negotiation)
from the transport plane (media), and the control plane SHALL NOT carry media.

#### Scenario: Remote session

- **WHEN** a remote session is requested
- **THEN** the control plane negotiates parameters only
- **AND** media flows over the transport plane

### Requirement: Protocol interoperability

The system SHALL keep KDE Connect protocol identifiers unchanged so that Twine
peers interoperate with stock KDE Connect peers.

#### Scenario: Stock peer

- **WHEN** a Twine device connects to a stock KDE Connect device
- **THEN** base features work
- **AND** Twine-only features are hidden unless their capabilities are advertised

### Requirement: Pluggable transports

The system SHALL provide remote sessions through a single provider interface, so
new transports are added without changing the core.

#### Scenario: Adding a transport

- **WHEN** a new transport provider is added
- **THEN** no core change is required

### Requirement: Desktop single resident process

The desktop SHALL host the daemon, tray and main window in one resident process.

#### Scenario: Opening the UI

- **WHEN** the user opens the main window
- **THEN** no new process is spawned

### Requirement: English and licensing

Everything committed to any repository SHALL be in English. Code SHALL be
GPL-2.0-or-later and documentation SHALL be CC BY 4.0.

#### Scenario: A pull request

- **WHEN** a change is proposed
- **THEN** all text is in English
- **AND** it is licensed compatibly

### Requirement: Standards and quality gates

Code SHALL follow SOLID. Each repository SHALL enforce format, lint, static
analysis, build and tests in CI.

#### Scenario: CI on a pull request

- **WHEN** a pull request is opened
- **THEN** format, lint, static analysis and tests run
- **AND** a red result blocks merge
