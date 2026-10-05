# VeraCI

**Evidence-First CI Verification Platform**

Evidence-first verification for reproducible CI failures and human-approved fixes.

VeraCI's primary product is a reviewable verification report. The accepted design
combines reproducible execution, evidence-linked investigation, independent
verification and exact human approval. A generated patch is one possible input.

## Current state

V0 — Reproducible Foundation is in progress. The repository currently contains
root npm configuration, Git/editor rules and authoritative documentation.
Application packages, a database, queues, GitHub integration and AI behavior are
planned; none is implemented at this checkpoint.

See [project status](docs/PROJECT_STATUS.md) for the current checkpoint and verified
behavior. See the [master roadmap](docs/MASTER_ROADMAP.md) for V0–V9 and release gates.

## Development

Use Ubuntu in WSL2, Windows VS Code connected to WSL and Docker Desktop with Linux
containers. Keep the repository in the Linux filesystem, for example
`~/projects/veraci`. Run repository commands in the Ubuntu terminal.

After V0.c has generated and committed the root lockfile:

```bash
nvm use
npm ci
```

The selected toolchain is Node 24.21.0 and npm 11.19.0. See the
[compatibility record](docs/compatibility.md) for evidence and pending gates.
There is no application start, build or test command yet.

## Authoritative documentation

- [Architecture invariants](docs/ARCHITECTURE_INVARIANTS.md)
- [Project status and verification commands](docs/PROJECT_STATUS.md)
- [Compatibility and version selections](docs/compatibility.md)
- [Current and planned architecture](docs/architecture.md)
- [Architecture decisions](docs/adr/)
- [Accepted master roadmap](docs/MASTER_ROADMAP.md)
