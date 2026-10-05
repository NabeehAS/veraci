# ADR 0001 — Preserve the accepted product and architectural baseline

Status: **Accepted**. Recorded: 2026-10-05 from the user's accepted master plan and
final amendments. Implementation status is tracked separately in PROJECT_STATUS.md.

## Context

VeraCI is one developer's flagship portfolio project. It must demonstrate conventional
software engineering and genuine agentic-AI engineering while remaining achievable.
A broad autonomous coding product or framework inventory would weaken that goal.

## Decision

The reviewable verification report is the primary product. Preserve the separation
of observations, hypotheses, candidates, verification and authorization; ensure useful
behavior without successful model output and with human-supplied candidate diffs.

Use the accepted TypeScript modular NestJS/Next.js architecture, PostgreSQL/Prisma,
RabbitMQ/direct AMQP/outbox, Docker execution boundaries and GitHub App integration.
Introduce one LangGraph.js workflow with a thin OpenAI adapter, durable state, bounded
tools, structured outputs, abstention and evaluations. Require independent verification,
exact human approval for publication and no automatic merge.

Follow the ten releases in MASTER_ROADMAP.md: V5 is the first read-only agent/evaluation
milestone after V4 evidence/reproduction; V6 remains mandatory cloud/operational proof.
Optional infrastructure requires evidence of need. The invariants list all retained
decisions and excluded/optional technologies.

## Alternatives and consequences

A general terminal agent, automatic merge, multiple autonomous agents and a domain
microservice architecture are outside the accepted core. Adding infrastructure for
résumé keywords is rejected. The chosen scope concentrates effort on reliability,
evidence, authorization, operational behavior and measurable limitations.

Framework presence does not prove a capability. Each version must finish as a
working, tested system. Current implementation may be much smaller than the target.

## Change control

Concrete implementation evidence can justify reconsideration. Stop the affected
architectural change and explain the evidence, trade-off, smallest alternative and
scope/test/delivery impact before changing the decision. Record the outcome in a new
or superseding ADR and synchronize invariants, architecture, compatibility and status.
Supported patch/minor resolution is recorded in compatibility.md and does not itself
reopen the architectural baseline.
