# Architecture

Updated 2026-10-05. Separate **current implementation** from **accepted target design**.
The [invariants](ARCHITECTURE_INVARIANTS.md) and [master roadmap](MASTER_ROADMAP.md)
constrain implementation; [project status](PROJECT_STATUS.md) records current progress.

## Current implementation — V0.c

A private npm workspace root with no child packages or dependencies, exact Node/npm
selections, LF/Git/editor rules and repository documentation. Root module mode is ESM;
there is no application JavaScript or TypeScript build configuration yet.

Development uses Windows → WSL2 Ubuntu → a Linux filesystem workspace. Windows
VS Code connects through its WSL extension. Git/Node/npm run in Ubuntu; Docker
Desktop supplies a Linux engine accessible through WSL integration.

| Area | Current state |
|---|---|
| Application entrypoints | None |
| API routes/OpenAPI | None |
| Web UI | None |
| Database/schema/migrations | None |
| Queues/outbox | None |
| Agent/model provider | None |
| Project Docker/Compose configuration | None |
| CI/CD/cloud deployment | None |
| Application tests | None |

The development smoke container is not an implemented job runner or application
service. No application request/data flow exists yet.

## Accepted target design — not yet implemented

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
| V0.d | Minimal Nest API, compiler/test preflight, logging, health and one validated API/OpenAPI contract |
| V0.e | PostgreSQL-only Compose setup and Prisma migration/query/transaction preflight |
| V0.f | Minimal Next/React review shell and actual API/browser integration; shared contracts only at use |
| V0.g | Clean-checkout Linux CI and aggregate V0 acceptance |

Backend Node ESM/NodeNext and the frontend's supported bundler settings will be
verified in their own packages. No universal shared TypeScript configuration or
empty worker/runner/agent packages are created in advance.

## Boundaries to preserve as implementation grows

Observations, hypotheses, candidates, verification and authorization are distinct
objects and decisions. Repository/model content cannot grant capabilities, alter
protected policy or authorize publication. Controller-observed execution supplies
verification evidence; approval binds exact immutable inputs and expires when stale.

Test, operational and security claims must name the implemented behavior and its
limitations. Any departure from the target architecture requires the evidence and
ADR process in the invariants; synchronize this file after the actual change.
