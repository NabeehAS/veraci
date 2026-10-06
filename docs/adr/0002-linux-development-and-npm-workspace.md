# ADR 0002 — Linux development and a minimal npm workspace

Status: **Accepted**. Date: 2026-10-05.

## Context

Development uses a Windows host; runners and deployment hosts use Linux. Paths,
permissions, symlinks, mounts and process signals must behave consistently across
development, CI and deployment. The initial repository needs reproducible tooling
without scaffolding packages for later releases.

## Decision

- Keep the repository in the WSL2 Ubuntu filesystem, such as `~/projects/veraci`.
  Run Git, Node, npm, tests and builds in Ubuntu; use PowerShell for host administration.
- Connect Windows VS Code through its WSL extension. Use Docker Desktop's Linux
  engine with Ubuntu integration rather than a second daemon inside WSL.
- Select Linux Node through nvm. Record exact Node/npm selections in `.nvmrc`,
  package metadata and [compatibility.md](../compatibility.md).
- Use a private npm workspace root and one committed root lockfile. Register
  packages only when introduced; do not add placeholder applications or test scripts.
- Enforce engine/peer compatibility and exact direct dependency saves through npm
  configuration. Do not hide conflicts with forced resolution or unexplained overrides.
- Use LF text endings and repository-local Git settings; preserve executable modes.
- Use ESM at the root. Verify backend Node ESM/NodeNext and frontend Next/bundler
  compiler configurations in their actual packages during V0.d and V0.f.

## Alternatives and consequences

Developing primarily under `/mnt/c` or using Windows Node for the Linux workspace
would increase filesystem and runtime differences. Multiple package managers and
nested lockfiles would complicate reproducibility without a demonstrated benefit.

Exact pins require coordinated updates to metadata, the lockfile and compatibility
records. A successful empty-root install does not establish application compatibility;
Nest, Prisma and Next integrations require their own preflight checks.
