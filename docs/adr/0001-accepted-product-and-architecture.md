# ADR 0001 — Evidence-first product and architecture

Status: **Accepted**. Date: 2026-10-05.

## Context

CI failures can arise from source defects, intermittent tests or infrastructure.
A plausible diagnosis or generated patch does not establish correctness. The
system needs reviewable execution evidence and explicit publication authorization,
with a scope maintainable by one developer.

## Decision

The verification report is the primary product. Observations, hypotheses,
candidates, verification and authorization remain distinct. Reports and supported
human-candidate verification must remain useful without successful model output.

Use a TypeScript modular NestJS backend, Next.js/React UI, PostgreSQL/Prisma,
RabbitMQ with direct AMQP and a transactional outbox, Docker execution boundaries
and GitHub App integration. Introduce one durable LangGraph.js workflow with a thin
OpenAI adapter, bounded tools, structured outputs, abstention and evaluations.
Require independent deterministic verification and exact human approval before
publication. Do not merge automatically.

Deliver the ten releases in the [roadmap](../MASTER_ROADMAP.md). V5 introduces the
read-only investigation agent after V4's evidence/reproduction foundation; V6
deploys and operates that system in AWS before candidate generation in V7.
The [invariants](../ARCHITECTURE_INVARIANTS.md) define required boundaries and
the evidence gates for optional infrastructure.

## Alternatives and consequences

A general terminal agent would expand both execution authority and supported
tasks. Multiple autonomous agents or services per domain would add coordination
and operational complexity without a core requirement. These alternatives are
excluded from the initial scope.

The selected design concentrates on bounded repairs, recoverable execution and
inspectable evidence. It requires explicit handling of uncertainty, stale inputs,
duplicate delivery and external effects. Each release must be runnable and tested;
its planned architecture does not imply that all capabilities are implemented.

## Change control

Architectural changes require concrete implementation evidence, evaluated
alternatives and a recorded decision before implementation. A superseding ADR must
state consequences and synchronize the affected architecture and status documents.
Supported patch/minor adjustments are recorded in [compatibility.md](../compatibility.md).
