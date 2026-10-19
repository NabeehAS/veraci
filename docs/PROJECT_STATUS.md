# Project status

Updated: 2026-10-19. This file records implementation progress; the
[roadmap](MASTER_ROADMAP.md) defines planned functionality. Exact versions and
verification limitations are recorded in [compatibility.md](compatibility.md).

## 1. Current version

**V0 — Reproducible Foundation**, in progress. No public release is tagged.

## 2. Current internal checkpoint

**V0.e — PostgreSQL/Prisma integration preflight**, in progress.
The first bounded checkpoint defines the local PostgreSQL service. Its Docker,
authentication, SQL and volume-persistence acceptance checks are pending.
V0.a–V0.d are complete; the V0.d checks also passed in WSL on 2026-10-19.

## 3. Completed functionality

- Linux development foundation, exact Node/npm pins and one root lockfile.
- One API workspace with aligned Nest packages and strict dependency resolution.
- ESM production compilation and startup, validated port and shutdown hooks.
- `GET /health/live` with process status and uptime, bound to loopback by default.
- Vitest/SWC tests for real Nest injection and HTTP behavior.
- Validated port/log-level settings and generic startup errors without supplied values.
- Runtime-validated liveness responses and generated `/openapi.json` from the same schema.
- Pino JSON logs with server-generated request IDs and allowlisted request/response metadata.
- One root ESLint flat config with type-aware API/test checks and zero-warning enforcement.
- Pinned Prettier and an aggregate check for lint, formatting, types, tests and build.
- PostgreSQL-only Compose configuration with an immutable image pin, loopback port,
  SCRAM initialization, named storage volume and process healthcheck; runtime verification pending.

## 4. Current architecture

One modular NestJS API workspace, using Express, a health controller/provider,
Zod contracts and Pino logging. Configuration is validated before application startup.
The root forwards build, typecheck, test and startup commands to that workspace
and owns the lint/format tooling.
See [architecture.md](architecture.md) for current and target designs.

## 5. Database schema status

`compose.yaml` defines a PostgreSQL 18 development service and bootstrap database.
No application schema, Prisma client or migrations exist. Runtime acceptance will
use disposable SQL probes and remove them afterward. The API has no database
connection or readiness route yet.

## 6. Queues/processes currently present

One manually started API entrypoint and one defined PostgreSQL Compose service.
Only the API has recorded runtime verification; PostgreSQL startup is pending.
No application queues, workers, runners or agents.

## 7. Tests that currently pass

Recorded on 2026-10-19 with Node 24.21.0 and npm 11.19.0 on Ubuntu 24.04.3, x86_64:

- `npm ci`: lockfile installation succeeded with strict engine/peer settings.
- `npm ls --all`: no dependency-tree problems.
- `npm run check`: ESLint with zero warnings, Prettier, source/test typecheck,
  20 Vitest tests and production build passed.
- An in-memory negative probe confirmed that lint rejects an unhandled Promise
  and excludes generated build output.
- Compiled-process smoke: liveness, OpenAPI, correlated JSON logs, SIGTERM exit/port closure,
  and invalid port/log-level rejection without exposing supplied values.
- `npm install-scripts ls`: no unreviewed dependency scripts.

The tests cover configuration defaults and invalid settings; real HTTP/provider
injection; absent readiness; OpenAPI response constraints; invalid provider responses;
unique server-generated request IDs; and omission of sensitive header/query/body/path
values from request logs. These results do not establish database, browser, runner or
deployed behavior. WSL output inspected on 2026-10-19 confirms a clean install,
zero-warning lint, formatting, typechecking, 20 tests, build, the expected direct
dependency pins, no unreviewed installation scripts and zero known vulnerabilities.

The PostgreSQL YAML parses and its image/directory/authentication/port settings
were checked against official metadata and documentation. Docker is unavailable
in the preparation environment, so Compose validation, startup, SQL, credential
rejection and volume persistence have not been executed there.

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
The local database bootstrap role is a superuser, its connection is not TLS-protected
and its port is restricted to loopback. Production credentials and roles are not configured.

## 11. Next bounded task

Verify the PostgreSQL service in WSL: Compose parsing, startup, server/data-directory
identity, valid and invalid password behavior, SQL rollback and persistence across
container recreation. After those checks pass, introduce the aligned Prisma 7
packages, reviewed migration, real integration tests and database readiness.

| Checkpoint | Scope | Status |
|---|---|---|
| V0.a | Host and tooling inventory | Complete |
| V0.b | Linux development environment | Complete |
| V0.c | Minimal workspace and documentation | Complete |
| V0.d | Dependency resolution and API/compiler preflight | Complete — Linux and WSL checks |
| V0.e | PostgreSQL/Prisma integration preflight | In progress — PostgreSQL runtime checks pending |
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

`npm run check` leaves source and configuration unchanged; the build writes ignored
`apps/api/dist` output. `npm run format` applies formatting to JavaScript, TypeScript,
JSON and YAML; the generated lockfile is excluded. Markdown remains manually maintained.
Review formatting changes before committing.

After creating `.env` with a local password, validate and start PostgreSQL:

```bash
docker compose config --quiet
docker compose pull postgres
docker compose up -d --wait postgres
docker compose ps
docker compose exec -T postgres sh -c 'PGPASSWORD="$POSTGRES_PASSWORD" exec psql -X -h 127.0.0.1 -U "$POSTGRES_USER" -d "$POSTGRES_DB" -w -v ON_ERROR_STOP=1' <<'SQL'
SELECT current_setting('server_version') AS server_version;
SHOW data_directory;
SELECT current_user, current_database();
BEGIN;
CREATE TABLE public.veraci_v0e_rollback_probe (id integer PRIMARY KEY);
INSERT INTO public.veraci_v0e_rollback_probe VALUES (1);
ROLLBACK;
SELECT to_regclass('public.veraci_v0e_rollback_probe') IS NULL AS rollback_clean;
CREATE TABLE public.veraci_v0e_persistence_probe (id integer PRIMARY KEY);
INSERT INTO public.veraci_v0e_persistence_probe VALUES (1);
SQL
```

Expected: PostgreSQL `18.6`, data under `/var/lib/postgresql/18/docker`, role/database
`veraci`, `rollback_clean = t`, and a healthy service whose published port is on
`127.0.0.1`. The persistence probe intentionally remains until the next check.

Recreate the container while preserving its named volume:

```bash
docker compose down
docker compose up -d --wait --wait-timeout 90 postgres
docker compose exec -T postgres sh -c 'PGPASSWORD="$POSTGRES_PASSWORD" exec psql -X -h 127.0.0.1 -U "$POSTGRES_USER" -d "$POSTGRES_DB" -w -v ON_ERROR_STOP=1' <<'SQL'
SELECT id FROM public.veraci_v0e_persistence_probe;
DROP TABLE public.veraci_v0e_persistence_probe;
SELECT to_regclass('public.veraci_v0e_persistence_probe') IS NULL AS probe_removed;
SQL
```

Expected: the persisted row has `id = 1`, followed by `probe_removed = t`. Do not add
`--volumes` to `down` for this check. These probes are acceptance fixtures, not
application tables or migrations.

Run this deliberate authentication failure separately:

```bash
docker compose exec -T postgres sh -c 'PGPASSWORD=invalid-password exec psql -X -h 127.0.0.1 -U "$POSTGRES_USER" -d "$POSTGRES_DB" -w -c "SELECT 1"'
```

Expected: nonzero exit with password authentication failure for `veraci`. A missing
or stopped container is not a successful authentication-denial check. Container
health alone does not prove credential enforcement or API readiness.

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
