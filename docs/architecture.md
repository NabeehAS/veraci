# Architecture

Updated: 2026-10-19. Current implementation and target design are described separately.
The [invariants](ARCHITECTURE_INVARIANTS.md) and [master roadmap](MASTER_ROADMAP.md)
constrain implementation; [project status](PROJECT_STATUS.md) records current progress.

## Current implementation — minimal API

One private npm workspace, `apps/api`, contains a NestJS API with an Express adapter.
`AppModule` registers `HealthController` and `HealthService`. `GET /health/live`
returns process liveness and uptime; it does not check external dependencies.

TypeScript emits Node ESM into `apps/api/dist` using NodeNext resolution and `.js`
relative imports. Vitest uses SWC to preserve Nest's decorator metadata. The HTTP
integration tests exercise real provider injection and reject a missing provider.

Root-owned ESLint uses the existing API test compiler configuration for type-aware
source/test/tooling checks. Prettier formats JavaScript, TypeScript, JSON and YAML, while
npm owns the generated lockfile format. The aggregate `check` command runs lint,
format checking, typechecking, tests and build. Source and configuration remain
unchanged; compilation writes ignored `apps/api/dist` output.

The entrypoint validates `PORT` and `LOG_LEVEL` with Zod before creating the app,
binds to loopback (default port 3001) and enables Nest shutdown hooks. The root
module configures Pino once. Health requests receive server-generated UUIDs; request
logs retain method, ID, status and duration, omitting URLs, headers and bodies.

The health controller validates its response with one Zod schema; Nest Swagger
converts that same schema to OpenAPI. An invalid provider response returns a generic
500 without exposing validation input. `/openapi.json` serves the generated contract
without a Swagger UI. It is a bootstrap documentation route, outside Nest's request
logging middleware. Request-body validation will accompany data-accepting endpoints.

The PostgreSQL-only Compose definition pins an official PostgreSQL 18.6 Bookworm
image by OCI index digest, mounts a named volume at `/var/lib/postgresql` and
publishes only `127.0.0.1:5432`. Initialization requests SCRAM for local and host
connections. `.env.example` declares the required variables; real local credentials
belong in ignored `.env`. The image initializes a development superuser/database.
The API is not connected to PostgreSQL yet. Container execution and persistence
checks remain pending; `pg_isready` alone is not an authentication test.

Development uses WSL2 Ubuntu, a Linux filesystem workspace, Windows VS Code connected
through WSL and Docker Desktop's Linux engine. Git, Node, npm and tests run in Linux.

| Area | Current state |
|---|---|
| Application entrypoints | `apps/api/src/main.ts` |
| API routes | `GET /health/live`; documentation at `GET /openapi.json` |
| Runtime schemas | Zod configuration and liveness response; domain request schemas not yet needed |
| Web UI | None |
| Database/schema/migrations | PostgreSQL development service defined; runtime checks pending; no application schema/migrations |
| Queues/outbox | None |
| Agent/model provider | None |
| Project Docker/Compose configuration | One PostgreSQL service in root `compose.yaml` |
| CI/CD/cloud deployment | None |
| Application tests | Configuration, HTTP liveness, OpenAPI constraints, invalid responses, log privacy/correlation and provider injection |

## Target design — not yet implemented

One TypeScript modular NestJS backend codebase owns domain rules and authorization.
Separate API, worker and runner process entrypoints are introduced only when their
lifecycle or security boundary requires them. Next.js/React is the review UI.

PostgreSQL is authoritative for durable domain/workflow state. Prisma handles normal
ORM work; explicit SQL handles the concurrency/locking cases that require it. REST
contracts are runtime-validated and documented. Shared contracts are extracted only
when the API and UI actually need them.

RabbitMQ dispatches work using direct AMQP semantics. A transactional outbox,
at-least-once delivery, idempotency, leases and fencing provide inspectable recovery.
Stale attempts cannot complete newer work. Docker executes approved checks against
curated repository snapshots, with a distinct deployed runner trust boundary.

Evidence/reporting and reproduction become useful before AI. V5 introduces one
durable, read-only LangGraph.js investigation workflow and initial evaluations.
OpenAI is accessed through a thin adapter; typed bounded tools, structured outputs,
prompt-injection defenses and abstention are required. V6 deploys and operates this
system in AWS. Candidate generation/independent verification arrive in V7; exact
human approval and idempotent fix-PR publication arrive in V8. No automatic merge.

## Next additions within V0

| Checkpoint | Bounded addition |
|---|---|
| V0.e | Verify local PostgreSQL, then add Prisma migration/query/transaction preflight and readiness |
| V0.f | Minimal Next/React review shell and actual API/browser integration; shared contracts only at use |
| V0.g | Clean-checkout Linux CI and aggregate V0 acceptance |

The API has package-specific compiler/test settings. Frontend bundler settings will
be verified when the web package exists. Shared contracts and additional process
packages are introduced only when used.

## Boundaries to preserve as implementation grows

Observations, hypotheses, candidates, verification and authorization are distinct
objects and decisions. Repository/model content cannot grant capabilities, alter
protected policy or authorize publication. Controller-observed execution supplies
verification evidence; approval binds exact immutable inputs and expires when stale.

Test, operational and security claims must name the implemented behavior and its
limitations. Any departure from the target architecture requires the evidence and
ADR process in the invariants; synchronize this file after the actual change.
