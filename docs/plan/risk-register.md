# Risk register

| ID | Risk | Likelihood | Impact | Mitigation | Status |
| --- | --- | --- | --- | --- | --- |
| R-1 | Building Qt6 + KF6 on Windows without Craft is non-trivial | High | High | Spike early in M1; try vcpkg and a minimal Craft; document what works | open |
| R-2 | FreeRDP on Android (NDK, OpenSSL, OpenH264) packaging | Medium | High | Prototype in A4; use prebuilt deps where possible | open |
| R-3 | Windows Home lacks an RDP host | Medium | Medium | Detect edition; document RDPWrapper; degrade gracefully | open |
| R-4 | DBus on Windows bundling/latency | Medium | Medium | Bundle session bus; evaluate moving IPC off DBus | open |
| R-5 | Losing upstream security fixes by hard-forking | Medium | High | Keep `upstream` remote; cherry-pick security commits | open |
| R-6 | Transport abstraction leaking provider specifics | Low | Medium | Keep interface minimal; providers are self-contained | open |
| R-7 | Name collision for `twinelink` | Low | Low | Collision pass (domains, registries, trademark) in M0 | open |
| R-8 | Performance claims not provable | Low | Medium | Mandatory timestamped instrumentation (NFR-1..5) | open |
