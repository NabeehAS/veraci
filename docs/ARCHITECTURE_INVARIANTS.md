# Architecture invariants

These constraints govern implementation; they do not imply that a capability is
already built. The [roadmap](MASTER_ROADMAP.md) defines the target system, and
[project status](PROJECT_STATUS.md) records the current implementation.

## Product identity

VeraCI is a **GitHub-integrated evidence and verification system for small software
changes**. Its primary object is the reviewable verification report.

Preserve these distinctions in the model, APIs, UI and decisions:

**observations ≠ hypotheses ≠ generated candidate ≠ verification ≠ authorization**

Model output cannot become an observation or successful execution result by assertion.
Passing checks does not authorize publication. A generated patch is one possible
input to verification; a human-supplied candidate uses the same policy and verifier.
Reports must remain useful when the model abstains, fails or is unavailable, when
evidence is insufficient, and when failures may be flaky or infrastructure-related.

## Core scope

- One developer, one coherent product and ten working, tested public releases.
  Prefer depth, measurements and explainability over feature count.
- Initially two or three curated, developer-controlled repositories with approved
  contributors and same-repository PRs. Target one Node/TypeScript npm package,
  committed lockfile, approved check policy and Vitest reporter/adapter.
- The platform may use npm workspaces. Arbitrary target monorepos, fork PR execution,
  private registries, arbitrary Dockerfiles and public self-service onboarding are
  outside the core envelope.
- Core repairs are small source-code changes. Dependency/lockfile/workflow changes,
  migrations, policy/security configuration, flaky tests and infrastructure failures
  are investigation/abstention cases. Do not expand repair scope casually.

## Application and state

- TypeScript is the primary application language. Use one modular NestJS backend
  codebase with separate process entrypoints where lifecycle or security requires it.
  Process separation does not create a microservice-per-domain architecture.
- React/Next.js provides the review UI. Domain authorization belongs to the backend.
- PostgreSQL is authoritative durable state. Use Prisma for normal ORM work and
  explicit SQL for locking/concurrency where required. Preserve real transactions,
  constraints, migrations and REST/OpenAPI semantics.
- GitHub determines source revision state; PostgreSQL determines platform workflow
  state. Every execution/candidate/report refers to immutable relevant inputs.

## Asynchronous execution and recovery

- RabbitMQ supplies asynchronous dispatch through direct AMQP semantics. Avoid
  unnecessary Nest microservice transport abstractions.
- Use a transactional outbox and at-least-once dispatch. Design for duplicates,
  retries and reconciliation; do not claim exactly-once external effects.
- Leases and monotonically advancing fencing generations govern attempt ownership.
  A stale worker cannot finalize or overwrite a newer attempt's authoritative result.
- A broker acknowledgment or model response cannot prove successful execution.
  Only trusted controller-observed results satisfy verification checks.

## Execution and security boundaries

- Execute real commands in fresh Docker-based environments with bounded resources,
  output and runtime. Do not substitute simulated success for execution.
- Deployed repository execution has a separate runner trust boundary. Keep control
  plane/model/GitHub credentials and host capabilities away from build containers.
- Curated repositories limit exposure; their contents, package scripts, logs and
  tool output remain untrusted. Ordinary Docker is not a claim of isolation for
  arbitrary hostile code.
- Use GitHub App installation permissions and short-lived credentials, not a PAT-based
  architecture. Apply repository/tenant authorization and least privilege.
- Keep secrets out of repository files, prompts, logs, artifacts and browser bundles.
  Protect tests, harnesses and policy files from candidate modification.

## Agent behavior

- Introduce one LangGraph.js workflow in V5, with durable state/checkpointing and
  explicit recovery semantics. PostgreSQL remains the durable authority.
- Use OpenAI through a thin provider adapter, structured outputs and runtime schema
  validation. Framework/provider output is not implicitly trustworthy.
- Expose typed, allowlisted, bounded tools with budgets, path/data limits and explicit
  permitted actions. Repository text and tool output cannot redefine tool policy.
- No unrestricted shell or general-purpose terminal tool. No direct GitHub write
  tool or write credentials available to the agent. No multiple autonomous agents.
- Preserve observations and evidence references separately from hypotheses.
  Explicit abstention and useful failure/provider-unavailable outcomes are required.
- Treat prompt injection as untrusted-data handling and capability enforcement,
  not merely a system-prompt instruction to behave safely.

## Verification and publication

- Candidate generation and deterministic verification are independent. Required
  checks come from protected policy/harness inputs and run in fresh environments.
  Missing or skipped required checks cannot count as success.
- Exact human approval is required before publication. Bind approval to the repository,
  relevant revisions, candidate, environment, policy and versioned verification report.
  Changed inputs or stale authorization invalidate publication eligibility.
- Publication is idempotent/reconciled application behavior, not an agent action.
  No automatic merge.

## Evidence, testing and operations

- Every claim states its evidence and limitations. Tests demonstrate bounded behavior;
  they are not a proof of universal correctness or a security certification.
- Preserve conventional SWE depth: SQL, REST, transactions, concurrency, queues,
  idempotency, tests, Docker, CI/CD, security, observability and cloud operation.
- Evaluate the agent with denominators, failures, abstentions, unsafe-action attempts,
  latency/cost and limitations. Initial evaluations accompany V5, not only V9.
- Use Vitest rather than maintaining both Jest and Vitest. Add browser/integration
  checks where their behavior requires them; do not create placeholder passing tests.

## Release order and scope gates

| Version | Required milestone |
|---|---|
| V0 | Reproducible foundation |
| V1 | GitHub identity, authorization and event intake |
| V2 | Real queued execution |
| V3 | Recovery, artifacts and live review |
| V4 | Reproduction and evidence-first product |
| V5 | Durable read-only investigation agent + initial evaluations |
| V6 | Early cloud deployment and operational proof |
| V7 | Candidates + independent verification |
| V8 | Exact approval + fix-PR publication |
| V9 | Evaluation, operational review and portfolio release |

V5 follows the actual evidence/reproduction foundation. V6 remains mandatory and
deploys/operates the system including V5's agent; cloud is not deferred to V9.
V2.a–V2.e are internal implementation checkpoints, not additional public releases.

Optional only after a demonstrated need: Redis, pgvector, LangSmith, Grafana Loki,
Terraform, RDS, MCP, a second model provider, a Python/FastAPI service, AST tooling
and stronger sandbox/microVM infrastructure. Record the need and trade-off first.

Outside the core unless requirements fundamentally change: Kafka, Kubernetes,
Temporal, multiple agent frameworks, multiple autonomous agents, a separate vector
database, microservice-per-domain architecture, automatic merge and a general-purpose
terminal agent. Core artifact storage uses local files and private S3; a separate
S3-compatible storage service is not required.

## Compatibility and change control

Retain Node 24 LTS, TypeScript 6, NestJS 12, React 19, a supported/patched Next.js 16
line, PostgreSQL 18, a maintained stable Prisma 7 line, RabbitMQ 4.3 and Vitest unless
concrete evidence requires reconsideration. Exact versions are compatibility
preflight candidates. Resolve and pin supported versions as each component is
introduced; commit the lockfile and record results in `compatibility.md`.

Never conceal a conflict with `--force`, `--legacy-peer-deps` or an unexplained
workaround. A justified supported patch/minor adjustment is recorded, not treated as
an architectural rewrite. A conflict requiring an architectural change must be
explained before changing the decision: evidence, trade-off, smallest alternative,
scope/test/delivery impact, then an ADR and synchronized documents.

Implement and verify one bounded checkpoint at a time. Keep current state and target
design distinct. Preserve working architecture and do not implement future-version
infrastructure early. A public version is complete only when its acceptance gates
pass as a working system.
