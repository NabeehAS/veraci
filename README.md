# VeraCI

**Evidence-First CI Verification Platform**

Evidence-first verification for reproducible CI failures and human-approved fixes.

VeraCI is designed around a reviewable verification report: what failed, what ran,
what the evidence supports and what remains uncertain. Investigation, candidate
generation, independent verification and publication approval are separate steps.
A generated patch is one possible input; human-authored candidates use the same
verification policy.

## Current state

V0 — Reproducible Foundation is in progress. The committed foundation contains
root npm configuration, Git/editor rules and project documentation. Application
packages, database integration, queues, GitHub integration and agent behavior are
not yet implemented.

See [project status](docs/PROJECT_STATUS.md) for verified behavior and the current
checkpoint, and the [roadmap](docs/MASTER_ROADMAP.md) for planned releases.

## Development

Use Ubuntu in WSL2, VS Code connected to WSL and Docker Desktop with Linux containers.
Keep the repository in the Linux filesystem, such as `~/projects/veraci`, and run
repository commands in Ubuntu.

```bash
nvm use
npm ci
```

The committed toolchain selects Node 24.21.0 and npm 11.19.0. The foundation has no
application start, build or test command yet.

## Documentation

- [Architecture invariants](docs/ARCHITECTURE_INVARIANTS.md)
- [Project status and verification commands](docs/PROJECT_STATUS.md)
- [Compatibility and version selections](docs/compatibility.md)
- [Current and planned architecture](docs/architecture.md)
- [Architecture decisions](docs/adr/)
- [Roadmap and release gates](docs/MASTER_ROADMAP.md)
