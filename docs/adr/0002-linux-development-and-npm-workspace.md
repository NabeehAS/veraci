# ADR 0002 — Linux development and a minimal npm workspace

Status: **Accepted**. Recorded: 2026-10-05.

## Context

The user's workstation is Windows with WSL2 Ubuntu, Windows VS Code and Docker
Desktop. Eventual runners and AWS hosts are Linux. Initial inventory found Windows
npm on the WSL PATH and no Linux Node, which was resolved using Linux nvm.

## Decision

- Keep the repository at `~/projects/veraci` in the Linux filesystem. Run Git, Node,
  npm, tests and builds in Ubuntu. Use PowerShell for host-level administration.
- Use Windows VS Code with its WSL extension and Docker Desktop's Linux engine/Ubuntu
  integration. Preserve Linux paths, permissions, symlinks, signals and mount behavior.
- Select Node 24.21.0 through nvm 0.40.8 and record npm 11.19.0. These versions were
  verified from a fresh Linux shell. Record justified later adjustments explicitly.
- Use a private root npm workspace and one committed root package-lock.json. Begin
  with an empty workspace list; register real packages only when introduced.
- Record the manager/version in package.json, enforce engine/peer compatibility
  through project npm configuration, and save direct dependency versions exactly.
  No `--force`, `--legacy-peer-deps`, package-manager switch or hidden override.
- Use LF text endings and repository-local Git configuration. Preserve file modes
  for executable scripts when they are introduced.
- Root module mode is ESM. Backend Node ESM/NodeNext and frontend Next/bundler compiler
  configurations are introduced and tested with their actual packages in V0.d/V0.f.
- Do not create placeholder test scripts or empty future application packages.

## Alternatives and consequences

Developing primarily under `/mnt/c` or running repository npm with Windows Node would
increase Windows/Linux differences. Multiple package managers or nested lockfiles
would complicate reproducibility without a demonstrated benefit.

The root dependency graph is currently empty. A successful root install only proves
this foundation; Nest/TypeScript/Prisma/Next integration still needs its own preflight.
Exact toolchain pins add maintenance work: version metadata, .nvmrc, lockfile and
compatibility.md must remain consistent when a supported version is deliberately changed.

## Verification

Fresh-shell versions/paths are verified from supplied output. The final filesystem,
editor and Docker probe was user-confirmed. On 2026-10-05, supplied output verified
root lockfile generation, `npm ci`, an empty dependency tree, all three npm settings,
a clean staged whitespace check and LF in all 16 staged foundation files. Application
dependency/compiler/database/browser compatibility remains pending later V0 checkpoints.
