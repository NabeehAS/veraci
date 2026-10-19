# Project status

Updated: 2026-10-07. This file records implementation progress; the
[roadmap](MASTER_ROADMAP.md) defines planned functionality. Exact versions and
verification limitations are recorded in [compatibility.md](compatibility.md).

## 1. Current version

**V0 — Reproducible Foundation**, in progress. No public release is tagged.

## 2. Current internal checkpoint

**V0.d — Dependency resolution and minimal API/compiler preflight**, in progress.
The API/compiler and configuration/logging/contract slices are implemented and
verified in Linux. Lint/format checks remain unfinished.
V0.a–V0.c are complete.

## 3. Completed functionality

- Linux development foundation, exact Node/npm pins and one root lockfile.
- One API workspace with aligned Nest packages and strict dependency resolution.
- ESM production compilation and startup, validated port and shutdown hooks.
- `GET /health/live` with process status and uptime, bound to loopback by default.
- Vitest/SWC tests for real Nest injection and HTTP behavior.
- Validated port/log-level settings and generic startup errors without supplied values.
- Runtime-validated liveness responses and generated `/openapi.json` from the same schema.
- Pino JSON logs with server-generated request IDs and allowlisted request/response metadata.

## 4. Current architecture

One modular NestJS API workspace, using Express, a health controller/provider,
Zod contracts and Pino logging. Configuration is validated before application startup.
The root forwards build, typecheck, test and startup commands to that workspace.
See [architecture.md](architecture.md) for current and target designs.

## 5. Database schema status

No database configuration, Prisma schema, generated client or migrations.
PostgreSQL/Prisma integration begins in V0.e. No readiness route is implemented.

## 6. Queues/processes currently present

One manually started API process. No application queues, workers, runners or agents.

## 7. Tests that currently pass

Recorded on 2026-10-07 with Node 24.21.0 and npm 11.19.0 on Ubuntu 24.04.3, x86_64:

- `npm ci`: lockfile installation succeeded with strict engine/peer settings.
- `npm ls --all`: no dependency-tree problems.
- `npm run check`: source/test typecheck, 20 Vitest tests and production build passed.
- Compiled-process smoke: liveness, OpenAPI, correlated JSON logs, SIGTERM exit/port closure,
  and invalid port/log-level rejection without exposing supplied values.
- `npm install-scripts ls`: no unreviewed dependency scripts.

The tests cover configuration defaults and invalid settings; real HTTP/provider
injection; absent readiness; OpenAPI response constraints; invalid provider responses;
unique server-generated request IDs; and omission of sensitive header/query/body/path
values from request logs. These results do not establish database, browser, runner or
deployed behavior.

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

The API exposes local process liveness and its OpenAPI document. Authorization,
domain request validation and execution isolation are not implemented. Request log
serializers omit sensitive request fields; this does not sanitize arbitrary future
application log messages. The bootstrap OpenAPI route is outside request logging.
Health does not establish database readiness or security of repository execution.

## 11. Next bounded task

Add focused ESLint and Prettier checks, verify the existing API under those checks,
and complete V0.d acceptance. PostgreSQL remains V0.e; the web package remains V0.f.

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
curl --fail --silent --show-error --include http://127.0.0.1:3001/health/live
curl --fail --silent --show-error http://127.0.0.1:3001/openapi.json
```

Expected: HTTP 200 with `status: "ok"`, positive `uptimeSeconds` and a UUID
`X-Request-Id` that also appears in the JSON request log. The OpenAPI document
includes `/health/live` and its response constraints. Stop with Ctrl+C.

The default port is 3001; `PORT` accepts decimal integers from 1 to 65535.
`LOG_LEVEL` accepts `fatal`, `error`, `warn`, `info`, `debug`, `trace` or `silent`;
the default is `info`. Invalid settings must exit nonzero before listening:

```bash
PORT=invalid node apps/api/dist/main.js
LOG_LEVEL=invalid node apps/api/dist/main.js
```

These two deliberate failure checks should name the invalid setting without echoing
its value. They do not replace `npm run check`.
