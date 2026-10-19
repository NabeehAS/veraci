# Project status

Updated: 2026-10-06. This file records implementation progress; the
[roadmap](MASTER_ROADMAP.md) defines planned functionality. Exact versions and
verification limitations are recorded in [compatibility.md](compatibility.md).

## 1. Current version

**V0 — Reproducible Foundation**, in progress. No public release is tagged.

## 2. Current internal checkpoint

**V0.d — Dependency resolution and minimal API/compiler preflight**, in progress.
The minimal API/compiler slice is implemented and verified in Linux. Structured
logging, runtime API validation/OpenAPI and lint/format checks remain unfinished.
V0.a–V0.c are complete.

## 3. Completed functionality

- Linux development foundation, exact Node/npm pins and one root lockfile.
- One API workspace with aligned Nest packages and strict dependency resolution.
- ESM production compilation and startup, validated port and shutdown hooks.
- `GET /health/live` with process status and uptime, bound to loopback by default.
- Vitest/SWC tests for real Nest injection and HTTP behavior.

## 4. Current architecture

One modular NestJS API workspace, using Express and a health controller/provider.
The root forwards build, typecheck, test and startup commands to that workspace.
See [architecture.md](architecture.md) for current and target designs.

## 5. Database schema status

No database configuration, Prisma schema, generated client or migrations.
PostgreSQL/Prisma integration begins in V0.e. No readiness route is implemented.

## 6. Queues/processes currently present

One manually started API process. No application queues, workers, runners or agents.

## 7. Tests that currently pass

Recorded on 2026-10-06 with Node 24.21.0 and npm 11.19.0 on Ubuntu 24.04.3, x86_64:

- `npm ci`: lockfile installation succeeded with strict engine/peer settings.
- `npm ls --all`: no dependency-tree problems.
- `npm run check`: source/test typecheck, three Vitest tests and production build passed.
- Compiled-process smoke: HTTP 200 liveness, SIGTERM exit/port closure and invalid-port rejection.
- `npm install-scripts ls`: no unreviewed dependency scripts.

The three automated tests cover liveness through real provider injection, the
unimplemented readiness route returning 404 and rejection of a missing provider.
These results do not establish database, browser, runner or deployed behavior.

## 8. Known bugs

No open defect is recorded for the implemented API slice. Broader application
behavior remains unimplemented.

## 9. Known technical debt

Test/tooling typechecks skip declaration-file body validation because `unplugin`
imports types for unused optional bundlers. Production compilation retains that
validation. The rationale and limitation are in [compatibility.md](compatibility.md).

The original Docker filesystem/signal probe lacks a retained transcript and image
digest. It is not reproducible runner evidence.

## 10. Known security limitations

The API exposes only local process liveness. Authorization, sensitive-data logging
controls, domain validation and execution isolation are not implemented. The health
response does not establish database readiness or security of repository execution.

## 11. Next bounded task

Complete the next V0.d API contract slice: structured Pino logging, runtime-validated
input/configuration and matching OpenAPI output. Add lint/format checks before V0.d
completion. PostgreSQL remains V0.e; the web package remains V0.f.

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

From the repository root in Ubuntu/WSL:

```bash
nvm use
npm ci
npm ls --all
npm install-scripts ls
npm run check
npm audit
git diff --check
git diff --cached --check
```

Start the compiled API:

```bash
npm run start:api
```

In another Ubuntu terminal:

```bash
curl --fail --silent --show-error http://127.0.0.1:3001/health/live
```

Expected: HTTP success with `status: "ok"` and positive `uptimeSeconds`. Stop the
server with Ctrl+C. The default port is 3001; `PORT` accepts integers from 1 to 65535.
