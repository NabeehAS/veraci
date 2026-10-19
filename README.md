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
Database readiness, domain APIs, the web UI, GitHub integration, queues and agent
behavior are not implemented yet.

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
build. `npm run format` formats JavaScript, TypeScript and JSON files; the generated
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

## Documentation

- [Architecture invariants](docs/ARCHITECTURE_INVARIANTS.md)
- [Project status and verification commands](docs/PROJECT_STATUS.md)
- [Compatibility and version selections](docs/compatibility.md)
- [Current and planned architecture](docs/architecture.md)
- [Architecture decisions](docs/adr/)
- [Roadmap and release gates](docs/MASTER_ROADMAP.md)
