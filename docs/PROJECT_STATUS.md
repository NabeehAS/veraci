# Project status

Updated: 2026-10-06. This file records implementation progress; the
[roadmap](MASTER_ROADMAP.md) defines planned functionality. Compatibility evidence
and its limitations are recorded in [compatibility.md](compatibility.md).

## 1. Current version

**V0 — Reproducible Foundation**, in progress. No public release is tagged.

## 2. Current internal checkpoint

**V0.d — Dependency resolution and minimal API/compiler preflight**, in progress.
Dependency selection is under review; the API/compiler gate is not complete.
V0.a–V0.c are complete. The committed implementation remains the V0.c foundation.

## 3. Completed functionality

No application functionality is implemented yet. The foundation provides:

- A Linux development environment using WSL2 and Docker Desktop.
- A private npm workspace root with exact Node/npm pins and one root lockfile.
- Strict engine/peer settings, exact dependency saves and LF/Git/editor rules.
- Architecture constraints, release gates and compatibility/status records.

## 4. Current architecture

One repository with a private npm workspace root and no child workspaces.
There are no application entrypoints, routes or UI. See
[architecture.md](architecture.md) for the current and target designs.

## 5. Database schema status

No database configuration, Prisma schema, generated client or migrations.
PostgreSQL/Prisma integration begins in V0.e.

## 6. Queues/processes currently present

No application queues, workers, runners or persistent application processes.
Docker Desktop and VS Code's WSL server are development tools.

## 7. Tests that currently pass

Application tests: **none implemented or run**.

The recorded V0.c checks passed on 2026-10-05: Node/npm selection, lockfile
generation, `npm ci`, the empty `npm ls --all` tree, all three npm configuration
checks, staged whitespace validation and LF line endings. These results cover the
foundation only; they do not establish API, database or browser compatibility.
Evidence details and remaining gates are in [compatibility.md](compatibility.md).

## 8. Known bugs

No open foundation defect is recorded. Application behavior is not yet available
for assessment.

## 9. Known technical debt

No intentional code debt. The initial Docker filesystem/signal probe lacks a
retained transcript and image digest; it is a reported check, not reproducible
runner evidence. Unimplemented release scope remains planned work.

## 10. Known security limitations

Application authorization, secret handling and execution isolation are not yet
implemented. Local Docker access does not provide a hostile-code sandbox. Ignore
patterns help prevent accidental secret commits but do not replace secret scanning.

## 11. Next bounded task

Complete V0.d dependency resolution and record exact versions and results before
adding the minimal API/compiler foundation. Verify build/startup, Nest dependency
injection under Vitest, runtime validation/OpenAPI agreement and structured logging.
PostgreSQL remains V0.e; the web package remains V0.f.

| Checkpoint | Scope | Status |
|---|---|---|
| V0.a | Host and tooling inventory | Complete |
| V0.b | Linux development environment | Complete |
| V0.c | Minimal workspace and documentation | Complete |
| V0.d | Dependency resolution and API/compiler preflight | In progress |
| V0.e | PostgreSQL/Prisma integration preflight | Planned |
| V0.f | Web/browser preflight | Planned |
| V0.g | Clean-checkout Linux CI and V0 acceptance | Planned |

## 12. Exact verification commands

Run from the repository root in Ubuntu/WSL to verify the committed foundation:

```bash
nvm use
node --version
npm --version
npm ci
npm ls --all
npm config get engine-strict
npm config get strict-peer-deps
npm config get save-exact
git diff --check
git diff --cached --check
git status --short --branch
git ls-files --eol
```

Expected: Node v24.21.0, npm 11.19.0, an empty root dependency tree and `true` for
all three npm settings. Diff checks should report no whitespace errors; tracked
text should use LF. Build/test commands will be added with the application packages.
