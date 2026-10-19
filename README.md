# VeraCI

**Evidence-First CI Verification Platform**

Evidence-first verification for reproducible CI failures and human-approved fixes.

VeraCI is designed around a reviewable verification report: what failed, what ran,
what the evidence supports and what remains uncertain. Investigation, candidate
generation, independent verification and publication approval are separate steps.
A generated patch is one possible input; human-authored candidates use the same
verification policy.

## Current state

V0 — Reproducible Foundation is in progress. The API workspace provides process
liveness at `GET /health/live`, a runtime-validated response contract published at
`GET /openapi.json`, structured request logs and Nest/Vitest integration tests.
A local PostgreSQL Compose configuration is included. The API is not connected to
it yet. Database readiness, domain APIs, the web UI, GitHub integration, queues and
agent behavior are not implemented yet.

See [project status](docs/PROJECT_STATUS.md) for the current checkpoint and
[the roadmap](docs/MASTER_ROADMAP.md) for planned releases.

## Development

Use Ubuntu in WSL2, VS Code connected to WSL and Docker Desktop with Linux containers.
Keep the repository in the Linux filesystem, such as `~/projects/veraci`, and run
repository commands in Ubuntu. The toolchain is Node 24.21.0 and npm 11.19.0.

```bash
nvm use
npm ci
npm run check
npm run start:api
```

`check` runs ESLint, Prettier checks, source/test typechecking, Vitest and the API
build. `npm run format` formats JavaScript, TypeScript, JSON and YAML; the generated
lockfile is excluded. The server binds to `127.0.0.1:3001`; `PORT` accepts a decimal
integer from 1 to 65535. `LOG_LEVEL` defaults to `info` and accepts Pino levels or
`silent`. Invalid settings stop startup.
In another terminal:

```bash
curl --fail --silent --show-error http://127.0.0.1:3001/health/live
curl --fail --silent --show-error http://127.0.0.1:3001/openapi.json
```

The response contains `status: "ok"` and process `uptimeSeconds`. This endpoint
reports process liveness only. Its `X-Request-Id` response header correlates with
JSON request logs. Request URLs, headers and bodies are omitted from those logs.
Stop the server with Ctrl+C.

## Local PostgreSQL

Create an ignored `.env` from `.env.example` and set a locally generated
`POSTGRES_PASSWORD`. Keep it for the existing database volume: changing the file
does not change an initialized database's password.

```bash
docker compose config --quiet
docker compose up -d --wait postgres
docker compose ps
```

The service publishes `127.0.0.1:5432` and stores data in a named volume mounted at
`/var/lib/postgresql`, as required by the PostgreSQL 18 image. The bootstrap role
is a local development superuser. This is not a production database configuration.
`docker compose down` stops the service and preserves its named volume. Adding
`--volumes` deletes the database volume.

## Documentation

- [Architecture invariants](docs/ARCHITECTURE_INVARIANTS.md)
- [Project status and verification commands](docs/PROJECT_STATUS.md)
- [Compatibility and version selections](docs/compatibility.md)
- [Current and planned architecture](docs/architecture.md)
- [Architecture decisions](docs/adr/)
- [Roadmap and release gates](docs/MASTER_ROADMAP.md)
