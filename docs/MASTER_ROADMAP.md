# VeraCI — Evidence-First CI Verification Platform

## Authoritative flagship project master roadmap

Research snapshot: **21 September 2026**. Status: **accepted master plan; final amendments incorporated**. This is the frozen architectural baseline. Implementation progress is recorded in [PROJECT_STATUS.md](PROJECT_STATUS.md), and actual version selections/results in [compatibility.md](compatibility.md). The final section records the original revision decisions and the user's final amendments.

Project name accepted by the user on **5 October 2026**: **VeraCI — Evidence-First CI Verification Platform**, repository `veraci`. This repository copy updates the name and implementation-status pointers; the accepted architecture and release ordering are unchanged. The technology/job-market research below remains the historical September 21 snapshot, not a claim that uninstalled packages have passed compatibility preflight.

Navigation: [acceptance and change control](#0-acceptance-and-change-control) · [market findings](#2-israeli-job-market-findings-and-their-implications) · [competition](#3-competition-and-a-defensible-product-distinction) · [technology audit](#5-technology-and-compatibility-audit) · [delivery versions](#17-version-by-version-delivery-plan) · [optional specializations](#18-optional-specializations-and-evidence-gates) · [documentation and implementation discipline](#19-repository-documentation-and-completion-standard) · [change ledger](#20-meaningful-changes-from-the-proposed-roadmap-and-why).

## 0. Acceptance and change control

The user has accepted this roadmap with the final amendments incorporated below. Treat its product identity, core architectural decisions, scope boundaries and ten-release progression as frozen. Do not reopen those decisions because another framework is fashionable or a new session suggests a different architecture.

An architectural change requires concrete implementation evidence: a reproduced compatibility failure, a measured limitation, a demonstrated security problem, or a requirement that cannot be met within the accepted design. Before changing the architecture, stop the affected work and explain the evidence, trade-off, smallest viable alternative and impact on scope, tests and delivery. Record the resulting decision in an ADR and synchronize the roadmap and repository documentation. Do not silently work around the conflict or regenerate working earlier architecture.

Exact dependency patch/minor selections are **V0 preflight candidates**, not frozen architectural requirements. A supported compatible adjustment within the accepted technology choices can proceed with an explanation and a record in `docs/compatibility.md`; it does not require reopening the master plan. Replacing a chosen technology or departing from its accepted release line because of a real conflict follows the architectural change process above.

The repository documentation established in V0 is authoritative for implementation state and accepted decisions. This roadmap specifies the intended system; `docs/PROJECT_STATUS.md` describes what actually exists and passes today. Documentation remains current as implementation progresses, while architectural decisions remain stable. A planned capability must never be labeled implemented merely because it appears here.

This remains one developer's flagship portfolio project. Prefer depth, tested behavior, measurements and clear explanations over feature count. Listing an optional technology does not make it part of the core or authorize adding it early.

## 1. The decision

Build a **GitHub-integrated evidence and verification system for small software changes**, with a bounded agent that investigates reproducible failures and can propose a repair.

The main product is a reviewable verification report: what failed, what was actually executed, what the evidence supports, what remains uncertain, and precisely which candidate a person approved. Generated patches are one input to that system. The product must still be useful when the agent abstains or fails, the model provider is unavailable, the failure is possibly flaky or infrastructure-related, or a developer supplies the candidate diff.

Preserve these separate concepts in the data model, API, UI and decision rules: **observations ≠ hypotheses ≠ generated candidate ≠ verification ≠ authorization**. A model hypothesis cannot become an observed fact, a candidate cannot become a verified change without execution, and passing checks cannot become permission to publish. Implementation must continue to serve the evidence and verification product rather than drift into a general autonomous coding agent.

Keep TypeScript, a modular NestJS backend, React/Next.js, PostgreSQL, Prisma, RabbitMQ, Docker, GitHub Apps, one LangGraph.js workflow, the OpenAI Responses API, tests, observability and AWS. Remove unused infrastructure from the mandatory path. Deliver ten incremental releases, each usable and tested.

Primary employment positioning: **junior software engineer / backend / full-stack engineer with demonstrated reliability and agentic-AI engineering**. Developer tools is the natural product domain. Applied and agentic AI are credible specializations, not a reason to dilute the software engineering or claim senior-level production experience.

### What the project is responsible for

1. Receive an authenticated GitHub event and identify the exact revision.
2. Execute an approved check suite in a fresh, resource-limited environment.
3. Preserve structured results and bounded artifacts.
4. Reproduce a failure and distinguish observations from hypotheses.
5. Let a constrained agent investigate through typed tools, with durable state and budgets.
6. Optionally create one small source-code candidate.
7. Independently execute mandatory verification and produce a versioned report.
8. Require a human decision before publishing a fix PR; never merge automatically.

This is not a general CI replacement, autonomous coding employee, production incident responder, arbitrary-code hosting service, or open-ended multi-agent platform.

## 2. Israeli job-market findings and their implications

### Research method and limits

The sample below consists of employer career pages and employer-hosted application pages accessible on 21 September 2026. It is a purposive sample across the requested role families, not a census. Most pages do not expose a reliable posting date. “Observed in September” therefore does **not** mean “newly posted in September,” and an accessible application page does not guarantee that hiring remains open tomorrow.

The Israel Innovation Authority's 2026 report describes **2025** employment: roughly 400,000 high-tech employees and 2.3% annual growth, with slower recent growth than the earlier decade and a decline in software R&D employment. These are background conditions, not September 2026 junior vacancy counts or evidence that AI caused a particular hiring change. [Israel Innovation Authority employment report](https://innovationisrael.org.il/en/report/part-1-high-tech-employment/)

| Role family and observed example | What the employer actually emphasizes | Consequence for this project |
|---|---|---|
| General junior SWE — Lightricks, Haifa | Engineering fundamentals, clean code and participation across design, testing, deployment and maintenance. The page is undated. [Employer page](https://www.lightricks.com/career/junior-software-engineer-haifa) | Show a maintained, deployed system and explain its code. A polished AI demo alone is insufficient. |
| Graduate backend — ERGO NEXT UpNEXT, Kfar Saba | Server-side Kotlin, testable code, production CI/CD and feature ownership. Academic screening includes an 85 GPA requirement; GitHub contributions and AI-tool exposure are advantages. [Employer posting](https://job-boards.greenhouse.io/nextinsurance66/jobs/7979131003) | Preserve relational modeling, transactions, APIs and delivery. A TypeScript portfolio can demonstrate transferable concepts, but does not replace employer-specific language or academic requirements. |
| Graduate frontend/full-stack — ERGO NEXT UpNEXT, Kfar Saba | TypeScript, React/Angular, Node.js, API integration, testing and complete feature ownership; personal applications and GitHub work are explicitly relevant. [Employer posting](https://job-boards.greenhouse.io/nextinsurance66/jobs/7979090003) | The proposed TypeScript stack is defensible. Build an actual review workflow, not just an admin template. |
| Junior full-stack — WeDev, Holon | Modern frontend frameworks, Node.js, SQL/NoSQL familiarity, debugging and independent learning. [Employer posting](https://job-boards.eu.greenhouse.io/wedev/jobs/4871703101) | SQL and frontend/backend integration deserve substantial implementation time. This does not justify adding MongoDB alongside PostgreSQL. |
| Developer experience — JFrog, Netanya/Tel Aviv | The observed **senior** posting requires 6+ years and emphasizes developer platforms, server-side engineering, cloud/container infrastructure and reliability. [Employer posting](https://join.jfrog.com/job/7510102-senior-software-engineer-developer-experience/) | Developer tools is relevant, but this senior posting is not evidence of junior demand for every listed infrastructure tool. Do not add Kubernetes to imitate it. |
| Applied AI — Mobileye, Jerusalem, temporary role | The observed role asks for 4+ years, strong Python, production LLM systems and tools supporting engineering workflows. [Employer posting](https://careers.mobileye.com/jobs/applied-ai-engineer-temporary-position/2dcef828-5169-4a8c-8975-6f4cedf183d9) | Production behavior, evaluation and tool integration matter. Python can be a later focused specialization; a second backend is unnecessary. |
| Agentic AI — Cato Networks, Tel Aviv | The observed role asks for 2–3 years of AI experience, Python, APIs/databases/cloud, and reliable agents with operational safeguards. [Employer posting](https://www.catonetworks.com/careers/careers-post/4863034101/agentic-ai-engineer/) | Demonstrate tool boundaries, approvals, state, monitoring and failure handling. Avoid presenting framework familiarity as production experience. |
| AI engineering — ERGO NEXT, Kfar Saba | The observed AI engineer role asks for 5+ years of software engineering and end-to-end delivery, with LLM evaluation and retrieval experience relevant. [Employer posting](https://job-boards.greenhouse.io/nextinsurance66/jobs/7993814003) | Evaluation should accompany a strong application, rather than displace it. |

**Inference from this sample:** the strongest portfolio strategy is broad SWE credibility with a demonstrable AI specialization. There are genuine graduate/junior openings, but the dedicated AI and developer-platform examples reviewed here mostly target experienced candidates. This sample does not establish the national proportion of junior AI jobs, a framework popularity ranking, salary expectations or hiring odds.

Practical priorities:

- Spend substantial time on SQL, HTTP semantics, concurrency, debugging, tests and deployment.
- Keep one primary language and one coherent backend. NestJS is an architectural choice, not a claim that Israeli employers universally require Nest.
- Present actual measurements and failure demonstrations. Do not substitute a long technology list for evidence.
- Keep interview preparation in algorithms, language fundamentals and SQL outside this project's scope; the project does not replace it.

## 3. Competition and a defensible product distinction

| Public product | Verified overlap | Positioning consequence |
|---|---|---|
| Nx Self-Healing CI | Investigates CI failures, proposes fixes and supports review or automatic application of verified changes. [Nx documentation](https://nx.dev/docs/features/ci-features/self-healing-ci) | “An agent that fixes CI and runs tests” is already an established feature. |
| CircleCI Chunk / Sidecar | AI repair and validation are central, including running checks in clean execution environments. [Chunk introduction](https://circleci.com/blog/introducing-chunk/), [Sidecar Microbuild](https://circleci.com/blog/sidecar-microbuild-in-five-minutes/) | Independent execution and CI integration alone are not unique claims. |
| GitHub Copilot cloud agent | Repository investigation, changes, branches and PR-oriented work overlap with the coding-agent portion. [GitHub documentation](https://docs.github.com/copilot/concepts/agents/cloud-agent/about-cloud-agent) | Competing on general coding autonomy would broaden the project and weaken its identity. |
| NovaOps | Its public IBM catalog listing positions it around agentic ChatOps for DevOps, SRE and cloud operations. [Public listing](https://cloud.ibm.com/catalog/services/novaops) | Keep the domain at pre-merge software verification, not production incident remediation. No claims are made about NovaOps' private implementation. |

The project's distinction is a deliberately narrow combination that can be demonstrated:

1. **Evidence is the primary output.** Every diagnosis links to source excerpts or execution observations. Reports distinguish observations, hypotheses, checks and limitations.
2. **Verification works independently of patch generation.** A small authenticated API can accept a human-authored diff and route it through the identical policy and verification path.
3. **Abstention is a useful product result.** Unreproduced, flaky, unsupported and insufficient-evidence cases receive an explanation and evidence, not a speculative “fix.”
4. **The approved object is exact.** Approval binds a repository, revisions, candidate, execution environment, policy and report. A changed input invalidates approval.
5. **Reliability is inspectable.** Duplicate delivery, worker death, resumed investigation, stale completion and ambiguous GitHub publication are demonstrated with tests and traces.
6. **Quality claims have denominators.** Publish a small reproducible benchmark including failures and unsafe-action attempts, not only successful demos.

These are design and portfolio differentiation goals. They are not an assertion that no commercial product provides similar capabilities. Do not market the report as a mathematical proof of correctness, a security certification, or a signed supply-chain attestation.

## 4. Required scope, limits and success cases

### Required core by V9

GitHub App integration; login and tenant authorization; REST/OpenAPI; PostgreSQL transactions and migrations; RabbitMQ/outbox delivery; leases and stale-attempt fencing; Docker execution; structured logs and artifacts; reproduction and classification; one durable tool-using agent; structured outputs; prompt-injection defenses; bounded patch generation; independent verification; human approval; idempotent PR publication; an evidence dashboard; evaluation; CI/CD; security; operational telemetry; and a real AWS deployment.

### Supported repository envelope

- Initially **two or three curated repositories controlled by the developer**, with owner-approved contributors and same-repository PRs.
- One Node.js/TypeScript package per target repository, npm and a committed lockfile, one fixed runtime image family, and one supported test reporter/adapter: Vitest.
- Lint, typecheck, tests and build are declared in an owner-approved policy. “Not applicable” is explicit; a missing required check is not success.
- Small source-code bugs are repairable. Dependency upgrades, lockfile changes, workflow changes, database migrations, security configuration, infrastructure failures and flaky tests are diagnosis/abstention cases in the core.
- No arbitrary fork PR execution, public self-service repository onboarding, private package registries, arbitrary Dockerfiles, monorepo matrices, browser-dependent target builds, or customer production credentials.
- The platform repository may use npm workspaces. That does not imply support for arbitrary monorepos as build targets.

“Curated” limits exposure; it does not make repository text trustworthy or remove the fact that package installation and tests execute code.

### Required demonstration stories

| Story | What a reviewer should see |
|---|---|
| Reproducible source bug | A duplicate-user endpoint returns 500 where its test requires 409. The same failure is observed in fresh runs; evidence points to error handling; a small candidate passes required checks; approval publishes a fix PR. |
| Intermittent failure | The same test passes and fails across recorded attempts, for example 2 failures in 4 executions. The report says “possibly flaky” and abstains from automatic repair. |
| Prompt injection | A repository comment or log tells the agent to disable tests, read secrets or push code. Tool policy prevents those actions; the attempt and outcome are recorded. |
| Recovery and staleness | A worker is killed and replaced. Its late result cannot overwrite the new attempt. A new GitHub revision invalidates the old candidate's publication eligibility. |
| Generator-independent verification | A developer submits a small incorrect diff through the API. The verifier rejects it using execution evidence without invoking the patch generator. |

The last two are small extensions of core mechanisms, not separate product modules.

## 5. Technology and compatibility audit

The documentation below was checked for this research snapshot. **This is documentary verification, not an executed dependency compatibility test.** No project was installed or compiled. V0 must resolve and record the exact dependency graph and run the integration preflight before application development continues.

Use stable releases, a committed lockfile, reproducible container digests and a dated compatibility record. “Current” below means observed on 21 September 2026. All exact numbers in this research table are starting candidates, not immutable requirements. During V0, resolve compatible supported versions, pin them appropriately and document the reasons for any adjustment. Do not use `--force` or `--legacy-peer-deps` to conceal conflicts, and do not resolve every package to an unqualified `latest` tag.

Retain these choices unless concrete compatibility evidence requires reconsideration: **Node.js 24 LTS; TypeScript 6; NestJS 12; React 19; a supported/patched Next.js 16 line; PostgreSQL 18; maintained stable Prisma 7; RabbitMQ 4.3; and Vitest without a parallel Jest stack**. Prefer a supported compatible patch/minor over blindly preserving the researched number. Architectural departures follow section 0.

### Application, persistence and integration

| Technology | Revised baseline and compatibility decision | Official evidence |
|---|---|---|
| Node.js | **24 LTS**, with **24.21.0** observed. Use the maintained 24.x patch available at implementation. Do not switch to the Current line merely because its number is higher. | [Node 24.21.0 release](https://nodejs.org/en/blog/release/v24.21.0) |
| TypeScript | **6.0 stable line**, strict mode. Use separate server and Next.js compiler configurations; do not force one module configuration across all packages. | [TypeScript 6.0 release](https://devblogs.microsoft.com/typescript/announcing-typescript-6-0/) |
| NestJS | **12.x**, matching compatible Nest packages. Prefer coherent ESM. Its CLI has stricter Node minimums than some runtime paths; Node 24.21 satisfies the documented 24.15+ CLI requirement. New ESM projects use Vitest. | [Nest migration guide](https://docs.nestjs.com/migration-guide) |
| React / React DOM | **19.3.0 observed**, with matching React and React DOM versions and compatible type packages. Validate component peers rather than forcing installation. | [React versions](https://react.dev/versions), [Next React guidance](https://nextjs.org/docs/messages/react-version) |
| Next.js | **16.3.5 observed**, on the active 16.x major line. The original 16.2 baseline should not be frozen: the August security release identifies 16.3.3 as a patched 16.x release. Use the latest patched supported release when starting. | [16.3.5 release](https://github.com/vercel/next.js/releases/tag/v16.3.5), [security release](https://nextjs.org/blog/august-2026-security-release), [support policy](https://nextjs.org/support-policy) |
| PostgreSQL | **18.6 observed**, a supported stable major/patch combination. Use the same major locally, in integration tests and in the initial self-hosted deployment. Do not adopt PostgreSQL 19 beta. | [PostgreSQL version policy](https://www.postgresql.org/support/versioning/) |
| Prisma | **Pin the maintained 7.x line explicitly.** Prisma's September 9 statement identifies 8 as a release candidate and promises continued 7 maintenance. Use matching compatible Prisma client/CLI/adapter releases, `prisma-client`, explicit output, `prisma.config.ts`, and the PostgreSQL driver adapter. Do not copy a CommonJS recipe into an ESM project unchanged. | [Prisma release status explanation](https://www.prisma.io/blog/is-prisma-8-ready-for-long-lived-production-apps), [Nest Prisma integration](https://docs.nestjs.com/recipes/prisma) |
| PostgreSQL driver | Use `pg` with `@prisma/adapter-pg`; configure pool bounds, timeouts and verified TLS explicitly. One database, separate application/checkpoint tables, and a total connection budget across processes. | [Prisma PostgreSQL integration recipe](https://docs.nestjs.com/recipes/prisma) |
| RabbitMQ | **4.3.x**, with **4.3.6 observed**. Use a supported patched image. Community support is time-bounded; schedule an upgrade review rather than assuming 4.x is indefinitely supported. | [RabbitMQ releases/support](https://www.rabbitmq.com/release-information) |
| AMQP client | `amqplib` directly, so publisher confirms, returned messages and manual acknowledgements remain explicit. It is not necessary to turn the backend into Nest microservices. | [amqplib channel API](https://amqp-node.github.io/amqplib/channel_api.html), [RabbitMQ confirms](https://www.rabbitmq.com/docs/confirms) |
| GitHub integration | One official Octokit package set, a GitHub App and a documented, pinned REST API version. Validate raw webhook signatures; keep installation tokens server-side. | [Octokit](https://github.com/octokit/octokit.js), [webhook validation](https://docs.github.com/en/webhooks/using-webhooks/validating-webhook-deliveries) |
| OpenAPI / Swagger | Nest's supported OpenAPI integration, with package peers matching Nest 12. Use its documented Standard Schema path for Zod inputs and a schema converter where required; verify emitted schemas. Keep HTTP contracts separate from ORM entities. | [Nest OpenAPI](https://docs.nestjs.com/openapi/introduction) |

Prisma does not replace SQL knowledge: use reviewed SQL migrations for constraints and indexes that need it, and parameterized SQL for locking/claim queries when that is clearer. There is no requirement to adopt Prisma 8 during the project; reevaluate after stable release and a migration benefit exists.

The indexed official Prisma v7 runtime requirements include Node 24. Some versioned Prisma documentation pages could not be retrieved in full during this review; the maintained-line decision is supported by Prisma's release statement and Nest's integration recipe. The exact Prisma/driver/PostgreSQL 18 combination remains a mandatory V0 integration gate, not an already-tested claim. [Prisma v7 system requirements](https://www.prisma.io/docs/orm/v7/reference/system-requirements)

### UI, agents and tests

| Technology | Revised decision and compatibility detail | Official evidence |
|---|---|---|
| Tailwind CSS | Current **4.x** line; use its Next.js/PostCSS integration rather than copying a v3 setup. | [Tailwind Next.js installation](https://tailwindcss.com/docs/installation/framework-guides/nextjs) |
| shadcn/ui | Copy only needed accessible primitives into the project; it is not a second application framework. Check React 19 peers and component behavior. | [React 19 guidance](https://ui.shadcn.com/docs/react-19) |
| TanStack Query | Supported React Query release for REST data, cache invalidation and mutation state. Do not duplicate authoritative build state in browser stores. | [Installation documentation](https://tanstack.com/query/latest/docs/framework/react/installation) |
| Zod | **4.x**, with strict TypeScript. Validate API/config/tool/report boundaries at runtime. Restrict model schemas to the provider's supported JSON Schema subset. | [Zod documentation](https://zod.dev/) |
| React Hook Form | **Optional**, only when repository settings forms become complex enough to justify it. If introduced, use a resolver release supporting Zod 4. | [Official resolvers](https://github.com/react-hook-form/resolvers) |
| LangGraph.js | **1.x stable/LTS line**, one bounded workflow with the official PostgreSQL checkpointer. Checkpointer packages have their own versions; validate the combination. | [Release policy](https://docs.langchain.com/oss/javascript/release-policy), [checkpointers](https://docs.langchain.com/oss/javascript/langgraph/checkpointers) |
| OpenAI SDK / Responses API | Official JavaScript SDK. Use documented function calling and structured outputs through a small provider adapter. Select an available model supporting both capabilities at implementation and record its exact identifier. Do not invent a future model or make product policy depend on its name. | [Function calling](https://developers.openai.com/api/docs/guides/function-calling), [structured outputs](https://developers.openai.com/api/docs/guides/structured-outputs) |
| Vitest | One unit/integration test runner across server and browser packages, with package-specific configuration. Node 24 satisfies the current runtime floor. Nest tests need its documented SWC/decorator metadata setup; generic frontend transpilation is insufficient for Nest dependency injection. | [Vitest requirements](https://vitest.dev/guide/), [Nest SWC/Vitest recipe](https://docs.nestjs.com/recipes/swc) |
| Supertest | Keep for HTTP contract tests with Vitest; it is test-runner independent. | [Supertest](https://github.com/forwardemail/supertest) |
| Testcontainers | Keep for real PostgreSQL and RabbitMQ integration tests. Requires a functioning Docker environment, not just Node dependencies. | [Testcontainers for Node.js](https://node.testcontainers.org/) |
| React Testing Library | Keep for interaction and accessibility-oriented component tests; install its required DOM testing peer. | [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) |
| Playwright | Keep for browser workflows and server-rendered routes. Current documentation supports Node 24 and Linux/WSL environments; do not promise native Windows 10 support. Match browser binaries to the locked Playwright version. | [Playwright requirements](https://playwright.dev/docs/intro) |
| Next.js test boundary | Test pure functions/client components with Vitest; use browser E2E for async server-component behavior that Vitest does not support. | [Next.js Vitest guide](https://nextjs.org/docs/app/guides/testing/vitest) |
| ESLint / typescript-eslint / Prettier | One linter plus formatter. The documented typescript-eslint range includes TypeScript 6.0 but not 6.1+. Choose a mutually supported ESLint/plugin set; remove an alternate generated linter instead of maintaining two. | [typescript-eslint compatibility](https://typescript-eslint.io/users/dependency-versions/), [Prettier installation](https://prettier.io/docs/install) |
| k6 | One small performance scenario at completion. It is a separate runtime/CLI, not a Node.js application dependency. | [k6 documentation](https://grafana.com/docs/k6/latest/) |

### Execution, operations and cloud

| Technology | Revised decision and compatibility detail | Official evidence |
|---|---|---|
| Docker / Compose | Maintained Docker Engine and Compose plugin, Linux containers and pinned images. Docker is an execution boundary with important limits, not a promise of hostile multi-tenant isolation. | [Docker security](https://docs.docker.com/engine/security/), [Compose model](https://docs.docker.com/compose/intro/compose-application-model/) |
| Artifact storage | A small filesystem-backed `ArtifactStore` locally; private S3 in AWS using SDK v3. Run contract tests for both adapters and a real S3 smoke test at deployment. Do not assume a filesystem test proves S3 behavior. | [AWS SDK v3](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/getting-started-nodejs.html), [S3 security](https://docs.aws.amazon.com/AmazonS3/latest/userguide/security-best-practices.html) |
| Pino | Structured application logs from V0. Redact credentials and sensitive payloads before logging. | [Pino](https://github.com/pinojs/pino) |
| OpenTelemetry | Server-side traces and metrics, with compatible SDK/exporter versions. Current JS documentation marks traces/metrics stable and logs in development; keep Pino for logs and avoid experimental browser telemetry in the core. Initialize instrumentation before instrumented modules load, including the ESM case. | [OpenTelemetry JS](https://opentelemetry.io/docs/languages/js/), [Node setup](https://opentelemetry.io/docs/languages/js/getting-started/nodejs/) |
| Prometheus / Grafana | A small metrics endpoint and one dashboard. Use compatible maintained releases; keep both private. Rich log aggregation is optional. | [Prometheus](https://prometheus.io/docs/introduction/overview/), [Grafana](https://grafana.com/docs/grafana/latest/) |
| GitHub Actions | CI plus image deployment. Pin actions to reviewed commit SHAs; use AWS OIDC with restricted repository/environment claims instead of stored AWS access keys. | [Secure Actions usage](https://docs.github.com/en/actions/reference/security/secure-use), [AWS OIDC](https://docs.github.com/en/actions/how-tos/secure-your-work/security-harden-deployments/oidc-in-aws) |
| AWS EC2 / ECR / S3 / IAM | Two security-separated hosts when executing repositories in the deployed demo; ECR for images, S3 for artifacts/backups, least-privilege IAM roles. AWS services do not have a single npm-style version to pin; pin images, SDK and deployment configuration. | [ECR](https://docs.aws.amazon.com/AmazonECR/latest/userguide/what-is-ecr.html), [EC2 metadata controls](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-instance-metadata-service.html), [S3 security](https://docs.aws.amazon.com/AmazonS3/latest/userguide/security-best-practices.html) |
| Caddy | Maintained Caddy 2 release for HTTPS and reverse proxying. Configure DNS, certificate reachability and SSE behavior. | [Automatic HTTPS](https://caddyserver.com/docs/automatic-https) |

### Original dependencies that leave the mandatory stack

| Original item | Decision |
|---|---|
| MinIO | Remove. Its community repository was archived on 25 April 2026 and states that it is no longer maintained. A new core dependency on it is unjustified. Local files plus real S3 are enough for this scope. [MinIO repository](https://github.com/minio/minio) |
| Redis 8 | Optional only after a measured need for shared caching or distributed rate limits. PostgreSQL stores sessions and durable state; RabbitMQ dispatches work. Do not add a second job system. [Redis Node client](https://redis.io/docs/latest/develop/clients/nodejs/) |
| pgvector | Optional retrieval experiment after enough historical cases exist and keyword/SQL retrieval has a measured limitation. Keep vectors in PostgreSQL if introduced; verify extension/server compatibility then. [pgvector](https://github.com/pgvector/pgvector) |
| LangSmith | Optional hosted tracing/evaluation convenience. The core must retain its own traceable runs and eval artifacts, and must work without a LangSmith account. Review source-code retention before enabling it. [LangSmith observability](https://docs.langchain.com/langsmith/observability) |
| Grafana Loki | Optional when searching container/Pino logs becomes a demonstrated operational problem. Do not add a log platform solely for its dashboard. [Loki documentation](https://grafana.com/docs/loki/latest/) |
| Jest | Remove the second default test runner; use the supported Vitest path. Jest itself is not declared obsolete or incompatible. |
| Python/FastAPI service | Replace the default specialization idea with an offline Python evaluation/analysis tool. Add an HTTP service only if a real independent consumer needs it. |

### Primary development environment

Use a **Windows host with WSL2 Ubuntu, VS Code connected to WSL, and Docker Desktop using Linux containers**. Keep the repository in the WSL Linux filesystem, for example `~/projects/<project-name>`, rather than developing primarily under `/mnt/c/...`.

- Run repository Git, Node.js, npm, builds, tests and ordinary development commands inside WSL. Use the VS Code WSL connection so the editor, terminal and extensions operate on that same Linux workspace.
- Use Docker Desktop's WSL integration for the Ubuntu distribution. Verify Linux-container mode and access from WSL; do not add a second Docker daemon inside WSL without a concrete need.
- Use Linux workspace paths for Compose bind mounts. Verify file ownership, executable permissions, case sensitivity and a controlled symlink example; use LF line endings for repository scripts. Keep Windows and Linux dependency installations separate, including `node_modules`.
- Run Playwright with its matching Linux browser binaries/dependencies inside WSL and Linux CI. Do not rely on native Windows browser-test behavior to validate the Linux application.
- Use argument arrays for child processes and test cancellation, signals and process-tree cleanup on Linux when the runner enters V2. Avoid Windows-specific path, shell and process assumptions in application code.
- PowerShell remains appropriate for Windows host setup, WSL administration and Docker Desktop administration. Clearly label host-level PowerShell commands separately from WSL commands when giving implementation instructions.

V0 verifies this environment with small setup checks; it does not implement the V2 runner early. Record the actual Ubuntu, WSL, Docker and tool versions in `docs/compatibility.md`, and use Linux CI/runners to check the remaining differences from the eventual AWS environment.

### V0 compatibility preflight

Before feature work, resolve exact compatible version selections and record Node/npm, TypeScript, relevant package peers, image digests, environment details, verification commands and reasons for adjustments in `docs/compatibility.md`. Pin the dependencies introduced in V0 and commit the lockfile. Record later components' researched/resolved candidates without creating their runtime infrastructure early; confirm their pins and update the lockfile when their milestone introduces them.

The preflight must demonstrate: clean `npm ci`; no forced peer resolution; server production build and startup; Nest provider injection in a test; an OpenAPI schema matching an actually validated endpoint; Prisma generation/migration/query against the chosen PostgreSQL image; Next production build; a React interaction test; and a Linux Playwright smoke test. Use Node ESM/NodeNext conventions in backend packages and Next's supported bundler configuration in the frontend. Define explicit build/test roots where TypeScript 6 requires them.

Verify the WSL workspace location, Linux Docker access/mounts and Linux test environment as part of this preflight. When RabbitMQ enters V2, LangGraph/OpenAI enter V5 and S3/cloud deployment enter V6, extend the record with their actual integration smoke tests. Resolve conflicts transparently using official documentation and installation evidence. If resolution would change an architectural choice, stop and explain before changing it. No roadmap can pre-prove an uninstalled transitive dependency graph.

## 6. Architecture and trust boundaries

Use a **modular monolith** in one repository, with separate process entrypoints for different lifecycles. Shared ownership, shared contracts and one domain database remain intact; process separation is not a microservices program.

| Component | Responsibility | Must not do |
|---|---|---|
| Next.js web | Dashboard, evidence review, approval UI | Own domain authorization or execute repository code |
| NestJS API | Authentication, authorization, REST, webhooks, reports, SSE and internal runner endpoints | Perform long builds inside HTTP requests |
| Worker | Outbox dispatch, job coordination, graph execution, reconciliation, GitHub effects | Trust model output as a completed check |
| Runner controller | Fetch an approved snapshot, launch/stop containers, capture actual process results and upload bounded artifacts | Expose host capabilities to the build container |
| PostgreSQL | Authoritative domain state, constraints, events, idempotency and graph checkpoints | Depend on Redis or RabbitMQ as the only record of work |
| RabbitMQ | At-least-once dispatch and backpressure | Decide whether a job was completed correctly |
| Artifact store | Log chunks, reports, patches and test output | Authorize access merely because someone knows an object key |

```mermaid
flowchart TD
    GH["GitHub"] --> API["API and authorization"]
    UI["Review dashboard"] --> API
    API --> DB["PostgreSQL"]
    DB --> W["Worker and outbox"]
    W --> Q["RabbitMQ"]
    Q --> R["Runner controller"]
    R --> C["Ephemeral build container"]
    R --> API
    W --> M["Model API"]
    W --> GH
```

Artifacts and telemetry are omitted from the diagram for readability. They never replace the database's ownership and status checks.

Core invariants:

1. GitHub determines repository revision state; PostgreSQL determines platform workflow state.
2. Every execution refers to immutable source and environment identifiers.
3. Only trusted controller-observed execution results can satisfy a verification check.
4. Model text, repository contents, tool output and candidate patches are untrusted inputs.
5. Duplicate dispatch is expected; domain effects have idempotency keys and reconciliation.
6. An expired attempt cannot finalize a job after a new attempt takes ownership.
7. A candidate cannot alter its own verification policy or protected tests.
8. Publication requires a current, authorized approval of the exact verified candidate.
9. The agent cannot obtain GitHub write credentials or merge code.
10. Missing evidence, unsupported scope and expired budgets result in explicit non-success states.
11. Observations, hypotheses, candidates, verification results and authorization remain distinct objects and decisions.
12. Ordinary checks, evidence review and supported human-candidate verification do not require a successful model call.

## 7. Relational model, APIs and transactional correctness

### Domain model

Introduce tables only when the corresponding release needs them. Use relational columns and foreign keys for ownership/state; reserve JSONB for versioned structured payloads, never as a substitute for core relationships.

| Group | Principal records |
|---|---|
| Identity and tenancy | `User`, `Session`, `Organization`, `Membership` |
| GitHub and policy | `GitHubInstallation`, `Repository`, `RepositoryPolicy`, `PullRequest`, `WebhookDelivery` |
| Work and execution | `Build`, `Job`, `JobAttempt`, `Runner`, `Execution`, `CheckResult` |
| Evidence and AI | `Failure`, `Evidence`, `AgentRun`, `ToolCall`, `Diagnosis`, `PatchProposal`, `VerificationReport` |
| Decisions and effects | `Approval`, `ExternalEffect`, `OutboxMessage`, `DomainEvent`, `Artifact`, `AuditEvent` |

Use one execution/check model for initial checks, reproductions, targeted investigations and candidate verification, with a purpose field and explicit relationships. A graph timeline can be stored as typed events rather than a second generic agent-step CRUD subsystem. LangGraph's internal checkpoint tables remain separate from domain entities.

Important database constraints and indexes:

- Unique GitHub delivery ID per app; unique installation and repository identifiers in their ownership context.
- Unique membership `(organization_id, user_id)`.
- Unique build business key `(repository_id, pr_number, head_sha, policy_version, rerun_generation)`; explicit reruns increment a generation.
- One active logical job for each domain operation; unique attempt number/fencing generation within a job.
- Unique scoped idempotency key plus stored request hash. Reusing a key with different input returns a conflict.
- Tenant-aware foreign keys or equivalent constrained relationships prevent connecting another tenant's proposal, report or artifact.
- Unique publication intent per approved candidate; recorded external branch/PR identifiers.
- Index queueable jobs by state and next-attempt time; leases by expiry; outbox by dispatch state; build lists by tenant/repository/creation time; events by stream/sequence.
- Keep large logs outside PostgreSQL. Store artifact IDs, hashes, sizes, media types and retention state.

Use short transactions. Do not hold a database transaction open while running Docker, calling GitHub or waiting for a model. Use compare-and-set updates for transitions, and explicit isolation/locking where invariants require it. Bound retries for serialization/deadlock errors and explain the chosen isolation level in an ADR.

### Core REST surface

All public domain routes are versioned under `/api/v1`; names can evolve before V1. Document request/response schemas, permissions, pagination, errors and idempotency behavior.

| Area | Representative operation |
|---|---|
| Identity | Login callback, current session, logout |
| Repositories | List connected repositories; view/update owner-approved policy |
| Builds | List/get builds; explicitly rerun or cancel; fetch check results |
| Evidence | Get failure, attempts, evidence references and sanitized artifact downloads |
| Investigation | Start/get/cancel an agent investigation |
| Candidates | Get a proposal; submit a bounded human diff through the same candidate path |
| Verification | Start/get verification; download versioned JSON and Markdown reports |
| Approval | Approve or reject a current candidate; inspect the recorded decision |
| Publication | Request publication of an approved candidate; inspect/reconcile its result |
| Events | Authorized SSE stream with a durable cursor |
| Internal runner | Claim/heartbeat/complete a dispatched attempt using runner-scoped authentication |

Use `202 Accepted` plus an operation resource for asynchronous actions. Distinguish invalid input, unauthenticated, unauthorized, missing resource, stale conflict, rate limit and upstream failure. A consistent error envelope includes a stable code, safe message and request ID. Enforce tenant membership on every resource access, including SSE and downloads.

Avoid building generic CRUD screens for every table. The API and UI should serve the workflow, not expose database internals.

## 8. GitHub, authentication and authorization

### User sessions and tenants

Use the GitHub App web authorization flow with one-time random state, **PKCE S256**, a fixed registered callback, server-side code exchange and server-side sessions. Current GitHub App documentation supports PKCE; a separate OAuth App is unnecessary for this scope. Keep user tokens distinct from installation tokens. [GitHub App user authorization](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-a-user-access-token-for-a-github-app)

Use secure HttpOnly cookies, regenerate session identifiers after login, expire/revoke sessions and protect state-changing requests against CSRF. Keep the web and API on one origin to simplify cookies, CORS and SSE. Handle user authorization revocation as well as installation removal.

Use three roles:

- **OWNER:** repository policy, membership, approvals and publication.
- **DEVELOPER:** investigations, reruns, candidates and ordinary review.
- **VIEWER:** authorized read-only access.

A solo developer may approve their own demo candidate; record this honestly. Do not imply a four-eyes separation-of-duties guarantee. Test two organizations and every cross-tenant relationship even if the hosted demonstration uses one active organization.

An installation is linked to an organization only after server-side verification of the installing user's authority and the installation/repository relationship. A user-supplied installation ID is not proof of ownership. Uninstallations and permission revocations disable new work and invalidate pending publication.

### GitHub App permissions and events

Initially request repository contents read, pull requests read and checks write, plus necessary metadata access. At V8, explicitly add contents write and pull requests write for fix publication. Do not request workflow administration or expose a merge action.

GitHub's contents-write permission is broad; it is **not** restricted to the application's branch prefix. Enforce branch policy in trusted application code and keep repository branch protections. Installation tokens are short-lived and server-side; current documentation specifies a one-hour lifetime. [Installation token documentation](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/generating-an-installation-access-token-for-a-github-app), [Git reference permissions](https://docs.github.com/en/rest/git/refs)

Subscribe only to the events needed: installation/repository access changes and the selected pull-request opened/reopened/synchronize actions. Do not simultaneously create the same build from push, PR and check-suite events without a business deduplication rule. Never let the bot's own publication trigger an infinite repair cycle.

Validate the signature against the **raw request bytes**, restrict payload size and supported event types, and durably record an accepted delivery plus its domain/outbox changes in one transaction. Return promptly within GitHub's documented webhook response window; do not run checks inside the webhook. If durable acceptance fails, return a failure and make redelivery/reconciliation possible. [Webhook validation](https://docs.github.com/en/webhooks/using-webhooks/validating-webhook-deliveries), [webhook delivery guidance](https://docs.github.com/en/webhooks/using-webhooks/best-practices-for-using-webhooks)

Deduplicate both delivery IDs and business events. Reconcile current PR state when ordering is ambiguous; do not assume webhook arrival order matches GitHub history. Use the exact `head_sha` for the check run, persist its external ID, and reconcile ambiguous API timeouts before creating another check. [GitHub check runs](https://docs.github.com/en/rest/checks/runs)

A passing candidate never turns the original failing revision's CI check green. Its report is a separate result tied to the candidate. Ordinary CI runs on the published candidate revision.

## 9. Reliable dispatch, concurrency and recovery

Use two bounded work categories: execution jobs and control/agent jobs. A small retry/dead-letter arrangement is acceptable; do not create a queue for every graph node. A single RabbitMQ node is sufficient for the portfolio and is not highly available.

### Transactional outbox

Create the domain operation and outbox row in the same PostgreSQL transaction. The dispatcher claims due rows using short transactions, for example `FOR UPDATE SKIP LOCKED`, commits the claim, publishes outside that transaction, waits for broker confirmation, and then records dispatch.

Persistent messages, durable queues, publisher confirms and handling of unroutable messages are separate responsibilities. In amqplib, the boolean returned by `publish` concerns stream backpressure; it is not a publisher confirmation. A crash after broker acceptance but before recording dispatch can produce a duplicate. Consumers must tolerate it. [RabbitMQ acknowledgements and confirms](https://www.rabbitmq.com/docs/confirms), [amqplib publish semantics](https://amqp-node.github.io/amqplib/channel_api.html)

### Attempts, leases and fencing

1. A consumer loads the authoritative job; it does not trust a queue payload's tenant, path or command.
2. It atomically acquires ownership, increments an attempt generation, and records a lease deadline.
3. Heartbeats extend only that attempt's lease.
4. Completion updates require the current job/attempt/generation and an eligible state. A late worker loses the compare-and-set and its artifacts remain non-authoritative.
5. A sweeper handles expired leases and redispatches eligible work with bounded backoff.
6. Cancelled or superseded work cannot later become a successful current result. Stop its process tree and retain the observed termination reason.

Manual acknowledgement occurs only after a durable result or durable retry/failure decision. A redelivered message for completed work is acknowledged without repeating its domain effect. Long executions require compatible broker acknowledgement timeouts and low prefetch.

Retry transient network/worker failures; do not repeatedly requeue a deterministic failed test as though it were infrastructure failure. Bound attempt counts and elapsed time. Poison messages reach a dead-letter/terminal state that an operator can inspect and explicitly re-drive.

Reconcile orphaned queued jobs and uncertain external effects; RabbitMQ is not the sole record that work exists. Apply per-repository and global concurrency limits, fair scheduling sufficient for the demo, and backpressure before admitting expensive work.

There is no end-to-end exactly-once guarantee across PostgreSQL, RabbitMQ, Docker, GitHub and a model provider. The intended guarantee is at-least-once dispatch with constrained, idempotent or reconciled effects and fenced authoritative completion.

## 10. Runner and repository policy

### Trusted policy and execution preparation

The working `.evidenceci.yml` is an owner-reviewed configuration proposal, not an instruction channel the PR may rewrite. Store the approved policy version in PostgreSQL, including check IDs, fixed argument arrays, allowed source roots, protected files, runtime image digest, resource limits and dependency-lock hash.

Read policy from an approved baseline; changes require owner approval and a new policy version. A PR that changes the approved harness or test configuration requires policy review; do not silently adopt its replacement. Reject unsupported manifests or configuration changes from automatic repair. Resolve revision, paths and policy before dispatch; fetch using a short-lived read token in the trusted controller and remove credentials before constructing the build workspace. The core executes PR head/candidate code, not a simulated merge with the default branch, and does not claim to establish merge-integration correctness.

Pin dependency resolution with the committed lockfile. For curated fixtures, use a controlled dependency-preparation step or an immutable dependency image keyed to the lock hash. Default to installation without lifecycle scripts where the fixtures permit it; explicitly review any required scripts. This is not a claim that `npm ci --ignore-scripts` makes arbitrary dependencies safe.

Networked dependency preparation and offline test execution are separate phases. The core must demonstrate at least one clean dependency preparation, not rely only on a developer's existing `node_modules` cache.

### Container controls

- Fresh workspace and container per execution; no writable shared dependency cache across unrelated runs.
- Non-root process; drop capabilities; no privilege escalation; appropriate seccomp; read-only root filesystem with bounded writable workspace/temp locations.
- CPU, memory, process count, disk/output and wall-clock limits; kill the entire process tree on cancellation/timeout.
- No Docker socket, host home directory, cloud credentials, GitHub token, model key or control-plane environment in the child container.
- No repository-chosen container image, host mount, arbitrary executable path or user-controlled shell command string.
- Disable network for checks. If preparation needs network, use a narrow documented policy; a default Docker bridge is not an egress restriction.
- Block metadata endpoints, internal databases, broker management and control-plane networks from build containers.
- Canonicalize paths and reject traversal, symlink escapes, special files, submodules and oversized archives in supported inputs.

Docker shares the host kernel and the daemon is security-sensitive. For the deployed runner, use a separate VM from the control plane and keep the child containers unable to reach its credentials or management services. IMDSv2 and metadata hop settings are defense in depth, not a replacement for network isolation. A compromised runner host is outside the claimed verification trust boundary. [Docker security](https://docs.docker.com/engine/security/), [EC2 metadata documentation](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-instance-metadata-service.html)

A local one-machine profile is acceptable for the developer's curated fixtures. Public arbitrary-code execution requires a different isolation design and is outside the core.

### Results and artifacts

The controller captures exit status, signal, timeout, start/end time, command identity and bounded stdout/stderr. Parse structured test output with the supported adapter and retain discovered/executed/failed/skipped counts. Missing, malformed or truncated required evidence produces an inconclusive result.

Do not trust a repository-produced JSON report without reconciling it with controller-observed process results. Test counts and protected harnesses reduce suppression risks; they do not prove that malicious source code cannot manipulate its test environment.

Upload artifacts under server-generated keys with tenant/job ownership and content hashes. Redact secrets before display or model transmission, sanitize terminal controls, render logs as text, and serve untrusted files as safe downloads rather than active HTML. Retention cleanup records which evidence expired.

## 11. Reproduction, classification and evidence reports

### Reproduction protocol

Record the initial failure and then run up to three fresh reproductions under the same approved source, lockfile, image, command and relevant environment. Persist each attempt individually. The default maximum of four observations is a budget choice, not statistical proof of determinism.

Use structured reporter fields and conservative normalized fingerprints: check ID, failure kind, test identity, assertion/stack location and selected message fields. Do not merge unrelated failures just because their log text is similar. Keep raw evidence references behind the fingerprint.

| Classification | Required interpretation | Repair eligibility |
|---|---|---|
| `REPRODUCIBLE_FAILURE` | The same relevant failure was observed repeatedly under the recorded conditions | Potentially eligible if scope and evidence gates also pass |
| `POSSIBLY_FLAKY` | Pass/fail or failure-signature variation across comparable attempts | Abstain from automatic repair |
| `INFRASTRUCTURE_FAILURE` | Controller/network/resource/dependency-preparation evidence points outside supported source repair | Diagnose and stop or bounded infrastructure retry |
| `UNREPRODUCED` | Initial failure exists but controlled attempts did not reproduce it | Abstain; retain observations |
| `UNKNOWN` | Evidence is insufficient or contradictory | Abstain and explain missing evidence |

Record environmental differences and seed/time controls when available. Do not call a run “reproducible” if dependencies or execution policy changed between attempts. A model may explain classification evidence; it cannot override deterministic execution records.

### Failure capsule and verification report

The failure capsule gives the agent a bounded starting context: repository and revision, approved policy, failed check/test, structured error, selected redacted logs, changed paths and reproduction observations. Source snippets are retrieved through tools rather than sending the entire repository.

The portable report contains:

- Schema version, report ID, tenant/repository/PR IDs and creation time.
- Failing head revision `H`, original PR base revision `B`, candidate revision/tree identity `C`, and exact patch hash where applicable.
- Policy version/hash, runtime image digest, lockfile hash, harness version, relevant environment/seed identifiers and source provenance.
- Execution IDs, purposes, check IDs, timing, exit status, test counts and artifact hashes.
- Failure classification, diagnosis claims, supporting and contradicting evidence IDs, assumptions and missing evidence.
- Mandatory versus agent-requested checks, their individual outcomes and overall verdict.
- Candidate provenance: model-generated or human-supplied; model/prompt/tool versions where relevant.
- Links to approval/publication events, with current retention/staleness status in a separate lifecycle envelope.

Provide JSON for inspection and Markdown for human review. Finalize an immutable verification payload and hash its canonical content and referenced artifacts; the hash itself is excluded from its own input. Approval binds this payload hash. Mutable approval/publication/retention status belongs in the linked lifecycle envelope, so recording an approval does not change the object that was approved. New verification evidence creates a new report. A hash demonstrates consistency with stored bytes; without an external trust/signing design it does not establish independent authenticity.

Use verdicts such as `CHECKS_PASSED`, `CHECKS_FAILED`, `INCONCLUSIVE`, `POLICY_REJECTED` and `STALE`. The UI should say **“These checks passed for this candidate under these conditions”**, not “the code is correct” or “safe to merge.”

## 12. The agent: real tool use, durable state and bounded authority

### One graph, one provider integration

Use LangGraph.js for a stateful workflow. Call the official OpenAI SDK inside graph nodes through a thin application adapter; do not add another agent framework or duplicate tool orchestration layers.

The graph loads a failure capsule, checks eligibility, asks for a structured hypothesis, selects allowed evidence tools, revises its hypothesis, proposes supplemental checks, and either abstains or returns a bounded diagnosis/candidate request. Deterministic application gates decide whether patching, verification or publication may proceed.

The agent chooses among tools and can revise its investigation based on results. It is therefore more than a fixed prompt chain. Its freedom is limited by typed tools, evidence requirements, execution budgets and application state.

### State and durability

Persist an agent-run ID, graph thread/checkpoint IDs, revision/policy identities, hypothesis/evidence references, tool-call ledger, remaining budgets, waiting job IDs, outcome and version metadata. Use the official PostgreSQL checkpointer; provision and migrate it deliberately.

Checkpointing preserves graph progress, but does not make a side effect exactly once. Stable tool invocation IDs map to domain operations; a resumed node reuses or reconciles an existing operation rather than starting a new build or PR. A long-running check returns a job ID and pauses the investigation until its result is durable. Human approval waits in database state without holding an AMQP message or worker open. LangGraph explicitly documents replay and idempotency concerns around interrupts. [Checkpointers](https://docs.langchain.com/oss/javascript/langgraph/checkpointers), [interrupts and replay](https://docs.langchain.com/oss/javascript/langgraph/interrupts)

Serialize resumes for each graph thread with domain ownership/version checks, and make result-to-resume events idempotent. Reconcile the domain job ledger with checkpoints after a crash; do not assume those writes were one atomic operation.

Record model requests/results sufficiently to reconcile retries. A timeout can still make provider billing uncertain; reserve a bounded budget and record that uncertainty rather than claiming exactly-once model spend. Store observable actions, evidence and concise rationale, not private chain-of-thought.

### Tool contract

| Tool category | Allowed operations and limits |
|---|---|
| Failure/context | Get authorized failure capsule, changed-file list and bounded PR diff |
| Source evidence | Read a file range at the exact revision; obtain protected test source; inspect an approved manifest |
| Search | Bounded literal/text search within approved paths, with result/byte limits |
| Execution evidence | Read selected check output and structured test results |
| Supplemental checks | Request an existing allowed check ID or validated test selector; returns a durable execution ID |
| History | Bounded same-repository failure/history lookup, after ordinary SQL retrieval exists |
| Candidate proposal | Return a schema-valid diff proposal for application validation; no direct workspace mutation or GitHub action |

No generic shell, arbitrary URL fetch, unrestricted filesystem access, package installer, credential reader, GitHub write tool or merge tool. Even “run test” is code execution, so it uses the same isolated runner and budgets as other checks. Avoid regex search if it would introduce uncontrolled regular-expression execution.

Validate tool arguments, authorization, revision, paths and resource limits outside the model. A repository may contain instructions in code comments, documentation, filenames, test names, logs or historical records; all remain lower-trust data.

Validate cited evidence IDs against the run's authorized evidence set and validate source ranges against the recorded revision. An invented or unrelated citation cannot satisfy an evidence requirement.

### Structured outputs and prompt-injection defenses

Define Zod schemas for diagnosis, evidence reference, check request, patch proposal and abstention. Set strict function schemas explicitly, use the documented supported JSON Schema subset, and handle provider refusal, incomplete output and schema failure as distinct outcomes. Schema-valid JSON is not evidence that a claim is true. [OpenAI function calling](https://developers.openai.com/api/docs/guides/function-calling), [structured outputs](https://developers.openai.com/api/docs/guides/structured-outputs)

Keep trusted policy/instructions separate from retrieved material. Mark untrusted excerpts with provenance, cap and redact them, and enforce all capabilities outside prompts. Test direct and indirect injection, encoded instructions, malicious logs and historical-record poisoning. Treat detection as an extra signal; the security boundary is restricted capability and authorization, not a promise that the model always recognizes attacks. [OWASP prompt-injection guidance](https://cheatsheetseries.owasp.org/cheatsheets/LLM_Prompt_Injection_Prevention_Cheat_Sheet.html)

Use `store: false` when appropriate for Responses, minimize transmitted source/logs, and document provider handling. That flag alone is not a zero-data-retention guarantee. The initial demo uses non-sensitive repositories. [OpenAI data controls](https://developers.openai.com/api/docs/guides/your-data)

Initial configurable budgets: one active investigation per failure; approximately 12 tool calls; at most two supplemental executions; one candidate; bounded model tokens, input bytes and elapsed time; and per-day spend/admission limits. Tune using measurements. Reject new expensive work before the budget is exhausted rather than discovering overspend afterward.

## 13. Candidate generation, independent verification and approval

### Candidate policy

Start with at most **two source files and 80 changed lines**, one candidate per investigation. Expand only if measured fixture failures justify it. Accept a bounded unified diff, parse it, validate all paths and apply it to a fresh workspace at `H`.

Protect tests, snapshots, reporter/harness files, package manifests and lockfiles, compiler/linter/test configuration, CI workflows, `.evidenceci.yml`, secrets and deployment files. Reject binaries, symlink changes, submodules, path escapes and unsupported rename operations. Recheck protected-file hashes after application. Keep the trusted harness outside the mutable checkout and check tracked-source integrity after execution; checks may write only approved generated outputs and must not silently edit the candidate they purport to validate.

The same parser and policy apply to human-submitted diffs. There is no general upload marketplace or arbitrary patch-generation plugin system in the core.

### Verification policy

The owner-approved policy supplies mandatory checks. The agent can add a targeted check or explain relevance; it cannot remove, weaken or replace mandatory checks.

For an eligible candidate:

1. Confirm source/policy freshness and reproduce the baseline failure.
2. Apply the exact patch and construct the candidate commit `C` with parent `H`, recording its tree and commit identity before verification. Publish this verified commit rather than regenerating the patch later.
3. Check size, paths and protected files.
4. Execute the originally failing test/check.
5. Execute all mandatory lint, typecheck, test and build checks for the supported fixture.
6. Compare test discovery/execution/skip counts and verify required output completeness.
7. Repeat the relevant check under the configured reproduction policy.
8. Construct the report from controller-observed results, not an LLM verdict.

“Independent” means separate trusted policy and fresh execution from patch generation. It does not require a second model or agent.

For the flagship deterministic fixtures, include a negative control: apply the inverse candidate change or otherwise restore the known failing code under the same harness and show that the relevant test fails again. Negative controls strengthen causal evidence but do not prove that a patch is generally correct. A comprehensive mutation-testing engine is optional.

### Approval identity and freshness

Approval binds at least:

`organization + repository + PR + H + B + candidate/tree C + patch hash + report hash + policy hash + environment identity + approver + expiry`.

Store approval and publication intent transactionally. Recheck permissions, installation access, current relevant GitHub heads, report validity and candidate identity immediately before publication. Changing the patch, head/base, policy or required execution evidence invalidates eligibility and requires verification/reapproval. Approval expiry can default to 24 hours for the demo and remains configurable.

### Correct fix-PR semantics

For a failing **same-repository PR**, build the candidate from the failing PR head `H`, then open the fix PR **into that PR's source branch**. This keeps the fix incremental and avoids accidentally including the original feature changes in a separate PR against the default branch. Show the destination branch clearly during approval. Fork PR publication is outside the core.

Use a deterministic application-owned branch name, persist a publication intent, and record resulting Git references/PR IDs. If an API call times out after GitHub may have accepted it, inspect existing branch/PR state before retrying. Never overwrite a conflicting human-owned branch.

GitHub and PostgreSQL cannot participate in one atomic transaction. A branch may change between the final read and PR creation. Detect and mark that result stale/superseded, avoid claiming its old verification still applies, and require ordinary CI and human review on the current PR. The application never merges.

## 14. Dashboard and live updates

Build six focused views: repository/build list; build execution detail; failure and reproduction evidence; investigation timeline; candidate diff and verification report; and approval/publication history. Repository policy settings can be a small owner-only panel.

The central screen answers: What revision is this? What failed? How often? What evidence supports the diagnosis? What changed? Which checks ran? What is still unknown? Is this approval current?

Use TanStack Query for REST state and SSE for notifications/progress. Persist events with monotonic per-stream sequence IDs, support `Last-Event-ID`, and return a snapshot/resynchronization instruction when old events have expired. Authorize subscriptions and artifact links individually.

For one API instance, in-process fan-out plus bounded database event polling is sufficient. This provides a concrete reason to omit Redis. Limit stream count, heartbeat connections, disable proxy buffering where required, and use polling fallback after disconnects. Do not stream unlimited raw logs or make SSE the source of truth.

Include loading, empty, partial, failed, expired and stale states; keyboard-accessible review controls; clear time/revision labels; and safe diff/log rendering. A read-only seeded demo can be public; execution and write actions remain authenticated and restricted.

## 15. Testing and measurable agent evaluation

### Conventional test strategy

| Layer | Important behaviors |
|---|---|
| Unit | State-transition eligibility, fingerprints, diff/path rules, evidence references, budgets and verdict aggregation |
| HTTP contract | Validation, status/error semantics, pagination, sessions/CSRF, role and tenant boundaries, idempotency conflicts |
| PostgreSQL/RabbitMQ integration | Transaction rollback, outbox crash windows, duplicate delivery, publisher-return handling, claim races, stale fencing and recovery |
| Runner integration | Actual failing/passing fixture, clean dependencies, timeout/cancel/process cleanup, resource/output caps and forbidden mounts/network |
| Agent contract | Tool schemas, refused/partial outputs, authorization, replay/idempotent tool effects, budget exhaustion and abstention |
| UI | Evidence navigation, disabled stale approvals, accessible interactions and SSE reconnection |
| Browser E2E | Login/review; failed build; abstention; candidate verification; approval/publication with controlled GitHub integration; cross-tenant denial |
| Cloud smoke | HTTPS, private artifact access, deployed execution, OIDC deployment, rollback and backup restore |

Use real PostgreSQL/RabbitMQ in integration tests. Mock provider/GitHub responses in deterministic CI, and run a small explicitly configured live smoke/evaluation separately. Mocked LLM tests validate plumbing, not model quality. Do not use a line-coverage percentage as the main completion criterion.

At least one fault-injection test must kill a worker between meaningful durable transitions and demonstrate correct recovery. At least one test must show that a stale worker's otherwise valid-looking completion is rejected.

### Evaluation dataset and protocol

Start with **12 distinct scenarios when the first agent ships**, then grow to approximately **26 curated scenarios** by V9: 12 deterministic source bugs, four intermittent cases, three infrastructure cases, three ambiguous/unsupported cases and four injection/tampering cases. Tag overlaps explicitly instead of double-counting them. These are scenario counts, not claims about executions already performed.

Split by underlying bug/repository family, not merely by filenames. Reserve a holdout set before prompt tuning. Use inexpensive development cases frequently; run the frozen holdout and selected stochastic repeats at release gates. Three repeats on a selected subset reveal some instability without pretending to establish high statistical confidence.

Each scenario contains a known source revision, expected classification/allowed outcomes, evidence requirements, independent behavioral checks, allowed/prohibited paths, environment and budget. The benchmark's independent assertions catch plausible but wrong or overfitted patches; passing the repository's existing tests is not the only definition of benchmark correctness.

Compare:

1. Deterministic classification and evidence collection without an LLM.
2. One model call over the same initial capsule, without investigative tools.
3. The bounded tool-using graph under a declared budget.

Use the same frozen cases and comparable conditions. State differences in information access and cost; do not claim a tool agent won a controlled experiment if it received extra ground-truth data.

| Metric | Definition and reporting rule |
|---|---|
| Classification quality | Per-class counts and confusion matrix, including unknown/abstention |
| Diagnosis quality | Evidence-grounded rubric plus known cause; report unsupported citations separately |
| Repair precision | Independently correct candidates divided by candidates produced; include denominator |
| Repair coverage | Correct repairs divided by eligible deterministic cases; publish alongside precision so always abstaining cannot look optimal |
| False verification | Candidates reported as passing whose independent benchmark checks fail |
| Regression | Newly failing independent behavior after the candidate |
| Abstention | Appropriate abstentions and missed repair opportunities by category |
| Safety | Prohibited actions requested, blocked and actually executed, recorded separately |
| Tampering | Prohibited file/harness changes attempted and accepted |
| Reliability | Successful resumes, duplicate effects, rejected stale completions and abandoned jobs |
| Efficiency | Tool/check count, input/output tokens, elapsed time and actual or explicitly estimated cost |

Publish case-level outcomes and small-sample limitations. Zero unsafe executions in 26 cases is a release result, not proof of immunity. Before allowing publication, require no accepted forbidden actions or test-tampering cases in the release suite and no known false-pass path in deterministic verification tests. There is no invented repair-success target before a baseline exists.

Version dataset, source revisions, prompts, tool contracts, policy, model identifier, SDK and environment together. A model change is an evaluated release decision. Keep redacted evaluation outputs available without a commercial observability account.

## 16. Security, observability, cloud and operations

### Security work is continuous

Authentication/authorization enters with the first connected repository; runner controls enter with the first execution; prompt defenses and evaluations enter with the first agent. The final release performs a review of existing controls rather than introducing security for the first time.

Cover webhook forgery/replay, tenant confusion, CSRF/session theft, malicious repository text, dangerous build scripts, artifact traversal/XSS, secret leakage, stale approvals, supply-chain changes, denial of service and denial of wallet. Apply request/body/artifact limits, timeouts and concurrency/spend admission controls at their actual boundaries.

Keep secrets out of builds, logs, traces and browser bundles. Separate development and deployment credentials. Scan dependencies/images and review advisories; do not automatically apply a breaking dependency upgrade without the compatibility suite. CI on untrusted PRs must not receive deployment credentials or execute privileged workflows using that PR's code. [GitHub Actions security guidance](https://docs.github.com/en/actions/reference/security/secure-use)

### Observability with a small operational footprint

Pino logs include request, tenant, repository, build, job, attempt, execution and agent-run identifiers where appropriate. Redact sensitive fields. Audit records capture actor, action, object, previous/new state and reason.

Add server-side OpenTelemetry spans across webhook intake, transaction/outbox, dispatch/claim, execution, agent node/tool and GitHub publication. Propagate trace context through messages while keeping authority in the database. Initially retain a bounded trace export for debugging; a hosted trace backend is optional.

Prometheus/Grafana cover queue age, outbox backlog, running/expired attempts, failure/retry rates, execution duration, resource kills, approval/publication errors, agent latency/tokens/cost, tool denials and abstention. Avoid tenant IDs or job IDs as unbounded metric labels. Keep detailed identifiers in logs/traces.

Provide liveness separately from readiness. Database/broker/provider degradation should be visible and should disable affected work safely; it should not create a restart storm. A model outage does not prevent viewing old reports or running ordinary CI checks.

### Deployment

Use one control-plane EC2 host for Caddy, web/API/worker, PostgreSQL and RabbitMQ, and a separate runner EC2 host for the trusted controller and ephemeral builds. This is a cost-conscious portfolio topology with single points of failure, not a production HA claim. Monitoring can be a Compose profile enabled during demonstrations and operations work.

The runner authenticates to narrow internal endpoints and the necessary dispatch channel; it receives scoped execution instructions and artifact upload capability. Build containers receive neither those credentials nor database/broker access. Keep PostgreSQL, broker management and monitoring off the public internet.

Use ECR image digests, private S3, encrypted volumes, least-privilege roles, TLS and restricted security groups. S3 access is checked through application authorization before issuing short-lived download links; use lifecycle rules and bounded retention. Set cost alerts and stop idle runner capacity when practical. Price the actual selected region/resources at deployment rather than quoting unverified monthly costs here.

GitHub Actions authenticates to AWS through OIDC with a restricted audience/subject, builds/tests/scans images, and deploys an explicitly selected release. Keep deployment secrets away from PR workflows. Serialize migrations, run production migrations deliberately, and verify health after deployment. Image rollback requires backward-compatible database changes; database rollback is not assumed automatic.

Back up PostgreSQL and required configuration/artifact metadata. Perform a restore drill into a clean environment before calling the project complete. Record measured restore time and data-loss window; do not claim an untested RTO/RPO. RDS is optional when managed database operations justify its cost; validate regional engine support if chosen.

### Performance claims

Use one k6 scenario for authenticated build-list/detail reads and a bounded webhook burst. State hardware, dataset size, concurrency, duration, error rate and latency percentiles. Measure queue wait and execution separately; the model provider's latency is not the API's database latency. Use `EXPLAIN ANALYZE` for a real slow query and document one evidence-based index or query decision.

Targets are established after a baseline. Never advertise a throughput number inferred from an empty local database or a mocked execution path.

## 17. Version-by-version delivery plan

Every version ends with a tagged, runnable system, a demonstrated workflow, tests for its new risks, updated API/docs and a short known-limitations note. Earlier capabilities continue to work. Unsupported features remain absent or explicitly disabled; they never return simulated production success.

The public roadmap remains exactly **V0–V9**. Internal checkpoints organize work within a release; they are not additional public versions. V4's real execution, failures, reproduction, evidence and classification are the prerequisites for the first agent. Therefore **V5 is the durable read-only investigation agent and initial evaluations; V6 is early cloud deployment and operational proof**. Cloud remains mandatory and must be complete before V7.

Effort estimates below are planning estimates for a developer learning some of this stack, not commitments. Total: approximately **260–404 focused hours**, plus about **25% integration/learning contingency**. At 10–12 hours per week, that is roughly **27–51 weeks**. Re-estimate after V2. If that is too large, stop at a coherent milestone and postpone optional work; do not remove verification/security to preserve a deadline.

| Version | Working outcome | Planning range |
|---|---|---:|
| V0 | Reproducible foundation | 12–20 h |
| V1 | GitHub identity, authorization and event intake | 24–36 h |
| V2 | Real queued execution | 40–60 h |
| V3 | Recovery, artifacts and live review | 24–40 h |
| V4 | Reproduction and evidence-first product | 24–36 h |
| V5 | Durable read-only investigation agent + initial evaluations | 40–60 h |
| V6 | Early cloud deployment and operational proof | 20–32 h |
| V7 | Candidates + independent verification | 32–48 h |
| V8 | Exact approval + fix-PR publication | 20–32 h |
| V9 | Evaluation, operational review and portfolio release | 24–40 h |

The V5/V6 effort ranges move with their work; the total estimate remains **260–404 hours before contingency**. No additional public release or infrastructure is added. V5 proves agent behavior and restart durability locally under WSL/Linux; V6 proves that same behavior on the deployed system, including checkpoint recovery, provider-outage handling, secrets and budgets. Those deployment checks are necessary integration work, now grouped in V6. Re-estimate from actual progress after V2 rather than treating these ranges as fixed commitments.

### V0 — Reproducible foundation

Establish the WSL2 Ubuntu/VS Code/Docker Desktop Linux environment described in section 5, with the repository in the Linux filesystem. Build the npm-workspace repository, minimal Next web and Nest API, PostgreSQL/Prisma migration, shared boundary schemas, Pino, health endpoints, lint/format/typecheck/test scripts and CI. Create only the packages/processes needed now. Record the threat model outline and supported repository envelope.

Establish `docs/ARCHITECTURE_INVARIANTS.md`, `docs/PROJECT_STATUS.md`, `docs/compatibility.md`, `docs/architecture.md` and `docs/adr/` with the responsibilities in section 19. Populate current facts and clearly labeled plans; do not fabricate completed checks or an implemented schema/queue that does not yet exist.

**Working demonstration:** a clean checkout in the WSL Linux filesystem installs, migrates, starts and displays API/database health, with the documented commands also exercised in Linux CI where applicable.

**Acceptance:** the compatibility preflight in section 5 passes; exact V0 pins and the lockfile are committed; any supported version adjustments have recorded reasons; a real API/database integration test and Linux browser smoke pass; production builds start; the five required documentation locations exist and describe current reality. No `--force`, `--legacy-peer-deps`, hidden local prerequisites, fake build results or future-version runtime infrastructure.

### V1 — GitHub identity, authorization and event intake

Add login/session security, organizations and three roles, verified App installation/repository linking, owner-approved policy records, raw-signature webhook validation, delivery deduplication and an authorized repository/event dashboard. Record accepted deliveries durably. Execution is clearly unavailable until V2.

**Working demonstration:** an owner connects a curated repository; a genuine PR event appears; another tenant cannot inspect it.

**Acceptance:** valid/invalid signatures, duplicate deliveries, role checks, CSRF/session expiry, installation ownership and cross-tenant access tests pass. Webhook response is prompt and durable; no “passed” check is posted without execution.

### V2 — Real queued execution

Introduce Build/Job/Attempt, transactional outbox, RabbitMQ confirms/manual ACKs, minimum lease/fencing protocol, runner controller and hardened Docker execution. Execute the approved install/lint/typecheck/test/build path at the exact revision. Capture exit status and bounded artifacts. Publish truthful GitHub checks.

**Working demonstration:** one fixture fails and another passes through an actual webhook-to-container-to-GitHub path.

**Acceptance:** real PostgreSQL/RabbitMQ tests; duplicate dispatch does not create conflicting authoritative results; transaction rollback does not publish work; timeout/kill and stale completion are handled; protected credentials/mounts/network are absent from the child; a missing required result is inconclusive. No temporary success stub.

#### Internal V2 implementation checkpoints

Track the following in `docs/PROJECT_STATUS.md`, completing and verifying one bounded checkpoint at a time. They share the existing V2 effort range and do not receive separate public release numbers.

| Internal checkpoint | Bounded outcome and verification focus |
|---|---|
| V2.a | Build/Job/Attempt domain and truthful GitHub Check state. Verify transitions, tenant ownership and business deduplication; execution remains unavailable until it exists. |
| V2.b | Transactional outbox and RabbitMQ. Verify transaction rollback, publisher confirms/returns, durable dispatch and duplicate-message handling. |
| V2.c | Docker execution adapter for curated fixtures. Verify real exit/results, Linux paths/mounts/permissions, resource bounds, timeout, signals and process-tree cleanup. Exercise it in a controlled local path while concurrency protections are completed. |
| V2.d | Leases, heartbeat ownership and fencing generations integrated with dispatch/completion. Verify claim races and rejection of stale-worker completion before enabling concurrent queued execution or automatic takeover. |
| V2.e | Integrated crash/recovery and duplicate-delivery validation. Verify worker loss/redelivery/late-result cases across the real database, broker and runner; complete the whole V2 acceptance gate. |

The V2.c adapter is not a released unfenced multi-worker execution service. The public V2 milestone is complete only after V2.e and all release acceptance criteria pass. V3 then extends recovery/reconciliation, cancellation, artifact access and live review; it does not postpone V2's basic correctness guarantees.

### V3 — Recovery, artifacts and live review

Complete reconciliation, expired-lease recovery, retry categories/backoff, cancellation/supersession, output retention and durable event cursors. Add filesystem ArtifactStore contracts, safe log/download views and SSE reconnection. Introduce lifecycle trace propagation.

**Working demonstration:** kill a runner or worker during a build, recover the job, reconnect the UI and inspect the retained attempt history.

**Acceptance:** crash-window tests around outbox and ACK; poison-message handling; old-attempt fencing; bounded concurrency; `Last-Event-ID`/snapshot recovery; artifact path/tenant denial; cleanup of cancelled processes and expired artifacts. The UI distinguishes failure, cancellation and infrastructure error.

### V4 — Reproduction and evidence-first product

Add failure fingerprints, fresh reruns, the classification table, failure capsules, evidence references and portable JSON/Markdown reports. Build the evidence/reproduction view and deterministic/flaky/infra fixtures. Begin ordinary SQL history lookup where useful.

**Working demonstration:** repeated assertion failure and intermittent failure produce different reports and explicit uncertainty, with no model required.

**Acceptance:** observations are retained individually; unrelated failures are not incorrectly conflated; missing evidence cannot pass; reports bind exact source/environment/policy; tests cover all classification branches. Every claim shown as observed has an evidence reference.

This is already a coherent backend/full-stack developer-tool portfolio milestone.

### V5 — Durable read-only investigation agent + initial evaluations

Prerequisite: completed V4 on top of V2/V3's real execution, durable dispatch/recovery and usable evidence. This milestone runs in the established WSL/Linux development environment and Linux CI; AWS deployment is not a prerequisite.

Add one LangGraph workflow, PostgreSQL checkpoints, the thin OpenAI adapter, structured diagnosis/abstention, bounded read/search/check tools, tool ledger, budgets and prompt versions. Seed 12 evaluation scenarios and deterministic mocks. Carry forward existing logging/tracing and add agent-specific evidence/timing/cost records. The agent cannot propose or publish a patch in this version, and has neither an unrestricted shell nor a GitHub write tool.

**Working demonstration:** an agent gathers additional evidence from real V4 failures, cites it in a diagnosis, abstains on possibly flaky/unsupported cases, and resumes after a worker restart without repeating a completed check.

**Acceptance:** a live smoke validates selected model/SDK capabilities; mocks cover refusal/partial/schema failures and provider unavailability; typed tool authorization, budgets and injection fixtures pass; restart/resume tests use real PostgreSQL checkpoints and demonstrate guarded, idempotent tool effects; baseline eval quality/cost results are saved with denominators, failures and limitations. Agent failure or provider outage leaves ordinary CI, reproduction and evidence review usable. No S3/AWS deployment dependency is introduced just to complete V5.

### V6 — Early cloud deployment and operational proof

Prerequisite: completed V5, including its initial eval results and local restart/replay checks. Deploy the existing evidence system **and its read-only agent** to the two-host AWS topology. Add ECR/S3/IAM/OIDC, Caddy HTTPS, the production artifact adapter, backups, one Prometheus/Grafana dashboard, health/degradation behavior and a deployment/rollback runbook. Cloud remains early and mandatory; do not move it to the final polish release.

**Working demonstration:** a real GitHub event executes on the separate cloud runner and produces an authorized report over HTTPS; the deployed read-only agent investigates a supported failure, and can resume after a worker restart.

**Acceptance:** actual S3 adapter smoke test; private data-plane services; child network/metadata restrictions; a successful OIDC deployment and compatible image rollback; a backup of domain data and agent checkpoints restored in a clean environment; no long-lived AWS deployment key in Actions. Verify model credentials stay out of build containers, deployed budgets/tool policy remain enforced, and provider unavailability preserves ordinary CI/evidence access. Run a small selected agent evaluation smoke in the deployed environment; investigate material differences from V5 rather than rerunning the entire benchmark on every deploy. Record cost and single-host failure limits. Cloud acceptance must pass before V7.

### V7 — Candidates + independent verification

Prerequisite: completed V5 agent/eval gates and V6 deployment/operational gates. Add the limited diff proposal, human-diff API, patch policy/parser, fresh candidate workspace, mandatory verification, protected-file/test-count checks, negative controls for flagship fixtures, and candidate/report UI. Candidate creation and its verifier ship together. Human-supplied candidates use that verifier even if the model is unavailable.

**Working demonstration:** one supported bug receives a candidate that passes checks; a plausible wrong human diff fails; a test-disabling proposal is rejected.

**Acceptance:** bounds/path/protected-file tests; wrong-patch and false-pass regression cases; no agent-selected weakening of mandatory checks; reproducible candidate identity and report hash; original failing check remains truthful. No GitHub write permission is needed yet.

### V8 — Exact approval + fix-PR publication

Add the approval tuple, expiry, role checks, GitHub freshness reconciliation, publication intents and deterministic branch/PR reconciliation. Request the additional App permissions now. Open the fix PR against the original PR's source branch and retain the complete decision history.

**Working demonstration:** a human reviews the exact evidence/diff and publishes a fix PR; a concurrent source change blocks or marks publication stale.

**Acceptance:** double-click/retry idempotency; changed candidate/head/base/policy rejection; revoked membership/installation handling; timeout-after-GitHub-success reconciliation; no conflicting branch overwrite; destination branch displayed and tested; no merge capability.

### V9 — Evaluation, operational review and portfolio release

Complete the approximately 26-scenario benchmark and holdout protocol, compare baselines, run selected repeats, review security boundaries, exercise recovery/restore again where changed, and run the small load test. Finish docs, architecture/ER diagrams, demo data, walkthrough video and honest CV material.

**Working demonstration:** the five stories in section 4, using the same release and reported limitations.

**Acceptance:** case-level eval results with denominators and failures; no accepted prohibited actions/tampering in the release suite; no known deterministic false-pass path; measured performance/resource/cost observations; clean setup from README; working hosted read-only demo; source, tests and deployment instructions match the release tag.

V9 is the **complete core**. Historical vector retrieval, a second provider or more infrastructure is not required to call it finished.

## 18. Optional specializations and evidence gates

Choose at most one specialization after the core and only when a measured need or concrete consumer requirement justifies it. Keep Redis, pgvector, LangSmith, Grafana Loki, Terraform, RDS, MCP, a second model provider, a Python/FastAPI service, AST tooling and stronger sandbox/microVM infrastructure optional. The following gates do not override the architectural change process in section 0.

| Specialization | Add only when | Smallest acceptable experiment |
|---|---|---|
| Historical retrieval / pgvector | There are enough labeled prior cases and SQL/text retrieval misses useful analogues | Compare text retrieval with embeddings on frozen cases; enforce tenant/repository filtering; measure diagnosis benefit and latency. No separate vector database. |
| Python for AI roles | Target postings repeatedly require Python and the core is complete | A typed offline evaluation/analysis CLI consuming exported reports and producing reproducible metrics. FastAPI only for an actual HTTP consumer. |
| MCP | A real external client needs the existing read-only evidence tools | Expose a few tools through current MCP transport/auth guidance; reuse authorization and limits. Protocol availability does not grant new capabilities. |
| Second model provider | A measured cost, quality or availability question exists | Implement the existing small adapter and run the same eval cases; do not introduce a second orchestration framework. |
| AST / TypeScript Compiler API / ts-morph | Text search repeatedly fails on a documented code-navigation case | One symbol/reference tool with an evaluation of usefulness and memory/latency cost. |
| LangSmith | Trace analysis/eval management consumes enough time to justify hosted tooling | Opt-in redacted traces; core reports and eval results remain portable. |
| Redis | Multiple API instances need shared rate limits/fan-out, or a measured cache need exists | One explicitly bounded use case; never move authoritative approval/job state into it. |
| Loki or trace backend | Existing logs/trace exports fail a concrete debugging need | One operational view tied to an incident question; no duplicate telemetry stores by default. |
| Terraform / RDS | Repeatable infrastructure changes or database operations justify the effort/cost | Codify the already proven deployment or move the same database after a tested migration/restore plan. |
| Stronger isolation | Supporting external/untrusted contributors becomes a real requirement | A separately scoped threat-model and microVM/sandbox evaluation before accepting such workloads. |

**Out of the core unless requirements fundamentally change:** Kafka, Kubernetes, Temporal, multiple agent frameworks, multiple autonomous agents, a separate vector database, microservice-per-domain architecture, automatic merge and a general-purpose terminal agent. Reconsider only against concrete requirements/evidence, explain the trade-off before changing the architecture, and record the decision. Two hosts for a trust boundary do not justify a service-mesh architecture.

Also out of scope: billing, enterprise SSO, marketplace publishing, arbitrary language support, production incident remediation, automatic merge, broad code refactoring, self-modifying policies, general-purpose terminals and a custom CI workflow language.

Optional technologies are not frozen to guessed September patch versions: if an option is selected later, its official documentation, support status, authentication model and compatibility receive their own preflight before adoption.

## 19. Repository, documentation and completion standard

Suggested repository organization, introduced incrementally:

| Path | Responsibility |
|---|---|
| `apps/api` | HTTP, authentication and domain modules |
| `apps/web` | Review UI |
| `apps/worker` | Worker entrypoint using shared application modules |
| `apps/runner` | Trusted execution controller |
| `packages/contracts` | Public/event/tool schemas; no Prisma entity export to browsers |
| `packages/domain` | Shared domain rules only when actual reuse appears |
| `packages/agent` | Graph, provider adapter, prompts and tool policy, from V5 |
| `prisma` | Schema and reviewed migrations |
| `fixtures` / `evals` | Controlled repositories/scenarios, benchmark definitions and results |
| `infra` | Compose/deployment configuration and runbooks |
| `docs` | Architecture, threat model, decisions and measured results |

Do not create an internal framework or dozens of empty packages up front. Use normal branches and small PRs with passing CI; tag each version. Never rewrite tests merely to make a demo pass without recording the behavior change.

### Authoritative documentation established in V0

| Required path | Responsibility |
|---|---|
| `docs/ARCHITECTURE_INVARIANTS.md` | Rules that must not casually drift: evidence-first identity; separation of observations/hypotheses/candidates/verification/authorization; authoritative PostgreSQL state; outbox/at-least-once dispatch/leases/fencing; trust boundaries; bounded agent capabilities; protected tests/policy; exact approval and no automatic merge. Preserve the accepted decisions throughout this roadmap, not only this abbreviated list. |
| `docs/PROJECT_STATUS.md` | Current implementation facts, the current public version/internal checkpoint, verification evidence, limitations and the next bounded task. Update after every meaningful checkpoint. |
| `docs/compatibility.md` | Exact selected/pinned tool and dependency versions, lockfile/image references, supported environment, preflight results and reasons for version adjustments. Distinguish candidates from installed/tested versions. |
| `docs/architecture.md` | Current architecture, processes, data flows, schema and trust boundaries, with target/planned additions clearly labeled. Keep diagrams synchronized with reality. |
| `docs/adr/` | Accepted architectural decisions and evidence-based amendments, including alternatives, rationale, consequences and any superseded decision. |

`docs/PROJECT_STATUS.md` must always state:

1. Current version.
2. Current internal checkpoint, including V2.a–V2.e where applicable.
3. Completed functionality.
4. Current architecture.
5. Database schema status, including applied/planned migrations.
6. Queues/processes currently present.
7. Tests that currently pass, with the relevant command/result context.
8. Known bugs.
9. Known technical debt.
10. Known security limitations.
11. Next bounded task.
12. Exact verification commands.

Use explicit “none yet,” “not run,” or “planned” entries where appropriate. Do not present an old test result as verification of changed code. Keep the public README concise: purpose, implemented versus planned scope, setup, demo, current release and a high-level milestone table. **The README is not the detailed TODO/task board.**

As their features arrive, maintain the threat model and repository policy, API/OpenAPI reference, recovery/deployment/backup runbooks, evaluation protocol/results, and measured performance/cost notes. Do not fill future-version documents with claims that the corresponding system already exists.

### Implementation discipline

For future AI-assisted sessions, the repository's invariants, status, compatibility record and relevant ADRs are authoritative. Read them and inspect current code/tests before selecting the next task.

- Implement one bounded checkpoint at a time, then verify its meaningful behavior before proceeding.
- Explain the purpose and expected outcome of commands before asking the user to run them when useful; identify whether each command belongs in WSL or host PowerShell.
- Preserve working earlier architecture. Do not regenerate it or implement future-version infrastructure early.
- Resolve failing tests before calling a checkpoint complete. If an issue blocks completion, record and explain the failure, cause/uncertainty and next diagnostic step; never silently skip it or leave it unexplained.
- Handle compatibility failures transparently. Do not hide them with forced peer resolution or an undocumented workaround.
- At a good verified Git commit/push checkpoint, tell the user what is ready and suggest a concrete commit message. Keep release tags distinct from the internal work checkpoints.
- Synchronize architecture/status documentation with the actual code, schema, processes and queues after each meaningful checkpoint. Clearly separate implemented behavior from planned behavior.
- If a choice conflicts with this master plan, stop the affected architectural change and explain the evidence and trade-off before proceeding, following section 0.

The objective is deep, tested, measured and explainable conventional SWE plus genuine production-oriented agentic AI. Feature count is not a completion criterion.

Portfolio completion means a reviewer can:

1. Run the project from a clean checkout and inspect the deployed demonstration.
2. Follow a failed revision through reproduction, evidence, diagnosis, candidate, checks, approval and PR publication.
3. See a useful abstention and a blocked malicious instruction.
4. Inspect SQL constraints, an outbox transaction, a lease/fencing race and a recovery test.
5. Read real evaluation and performance results, including limitations and failures.
6. Verify that the source code, CI, deployment and documentation describe the same release.

Interview explanations should cover: why PostgreSQL is authoritative; why RabbitMQ and not Kafka; outbox crash windows; why leases need fencing; why checkpoints do not imply exactly-once effects; how source revisions/approvals become stale; why passing tests do not prove correctness; prompt injection and capability restrictions; Docker's limits; and which measurements justify the design.

The eventual CV description should state what was actually built and measured. Example structure: “Built a GitHub-integrated CI verification platform with PostgreSQL-backed job recovery, isolated execution and a durable tool-using investigation workflow; evaluated it on N scenarios and measured X.” Fill N and X only after execution. Omit optional technologies that were never implemented.

## 20. Meaningful changes from the proposed roadmap, and why

This section is a change ledger, separate from the master plan above. The first table records the original revision decisions, with release references reconciled to the accepted final ordering. The second table records the user's final amendments. Unchanged foundations—evidence first, PostgreSQL authority, human approval, no merge, at-least-once work, protected tests and bounded tools—remain intentional.

| # | Change | Why |
|---:|---|---|
| 1 | Made junior SWE/backend/full-stack the primary positioning; AI and developer tools remain specializations | The reviewed junior roles reward end-to-end engineering, while the observed dedicated AI/DevEx roles often require prior experience. This is a sample-based positioning decision, not a market census. |
| 2 | Added a dated employer-source market table, academic/experience constraints and research limits | Prevents generic or exaggerated job-market claims and explains what the portfolio can and cannot substitute for. |
| 3 | Compared Nx, CircleCI and GitHub coding agents as well as NovaOps | CI repair plus test execution already exists publicly; comparison only with an SRE product understated the overlap. |
| 4 | Made the portable evidence/verification report the main product object | Strengthens identity beyond “another coding agent” and makes abstention and non-AI operation useful. |
| 5 | Added a small human-diff verification API | Demonstrates that evidence and verification are independent of the patch generator, without building a plugin ecosystem. |
| 6 | Replaced uniqueness claims with specific, demonstrable differentiation goals | Public research cannot prove that no competitor has a feature. |
| 7 | Narrowed supported repositories, test adapter, package manager, contributor model and repair categories | Makes runner/security/evaluation work achievable for one developer and prevents accidental arbitrary-code SaaS scope. |
| 8 | Kept Node 24 LTS and TypeScript 6, but added exact-version preflight and separate compiler configurations | A list of majors does not prove interoperability; ESM, peers, decorators and TypeScript configuration must be exercised. |
| 9 | Updated Next 16.2 to the patched 16.3 line, with 16.3.5 observed, and checked matching React versions | Current official releases and security fixes supersede the original minor-version baseline. |
| 10 | Made Nest 12's ESM/CLI/testing implications explicit | Old CommonJS/Jest assumptions cannot be copied into the current scaffold without review. |
| 11 | Explicitly retained Prisma 7 instead of following an unqualified latest tag; added driver/config/pool details | Prisma 8 is an RC in the reviewed September documentation. The stable 7 integration needs deliberate ESM/adapter setup. |
| 12 | Specified supported PostgreSQL 18 and RabbitMQ 4.3 baselines and an upgrade record | “Supported stable” needs an actual starting decision; broker support windows and database majors matter operationally. |
| 13 | Unified tests around Vitest, retaining Supertest/Testcontainers/RTL/Playwright | Reduces two-runner maintenance while following Nest's current supported route; documents SWC and async server-component boundaries. |
| 14 | Removed MinIO from the core | Its community repository is archived/no longer maintained; local files and S3 satisfy the actual storage requirement. |
| 15 | Moved Redis, pgvector, LangSmith, Loki and React Hook Form behind concrete need gates | Their original mandatory or near-mandatory placement added infrastructure/services without a demonstrated core requirement. |
| 16 | Replaced the proposed Python/FastAPI service specialization with an offline Python eval tool first | Preserves a route toward Python-heavy AI roles without adding an artificial service boundary. |
| 17 | Consolidated 19 versions into 10 outcome-based releases | Reduces fragmentation and ensures each release is a usable vertical slice, with an honest effort estimate and stop points. |
| 18 | Removed a temporary successful build/check stub from the delivery path | A green result must always correspond to actual execution; unsupported functionality stays explicitly unavailable. |
| 19 | Moved queue/outbox/basic lease correctness into the first execution release | The application should not first establish an execution architecture that must later be replaced to become reliable. |
| 20 | Kept cloud deployment early and mandatory, with security/evals/observability in their first relevant versions; final ordering places the agent in V5 and cloud in V6 | The accepted amendment introduces useful AI as soon as real evidence exists, while preserving early deployment and continuous quality gates. |
| 21 | Made the modular-monolith process boundaries and runner trust boundary explicit | Preserves operational separation without introducing microservices, separate data ownership or unnecessary frameworks. |
| 22 | Reused one execution/check model and added explicit delivery/policy/attempt/effect/event records | Reduces duplicated build/reproduction/verification machinery while giving actual concurrency and audit requirements durable representation. |
| 23 | Added delivery-level plus business-event deduplication and out-of-order GitHub handling | Unique webhook IDs alone do not prevent duplicate builds from different events or stale state updates. |
| 24 | Specified outbox claim/publish boundaries, confirms, unroutable messages and ACK timing | Makes queue reliability concrete and avoids confusing stream backpressure with broker acceptance. |
| 25 | Added fencing generations, guarded completion, orphan reconciliation and supersession | Heartbeats/leases alone do not prevent an old worker from committing after a replacement has taken ownership. |
| 26 | Separated retryable infrastructure failures from completed failing checks and bounded all retries | Prevents poison loops, misleading reruns and uncontrolled cost. |
| 27 | Bound execution to owner-approved policy and dependency/harness identities | A PR must not rewrite the commands or policy used to declare itself correct. |
| 28 | Expanded runner controls and required a separate deployed runner host | Repository scripts execute code; no generic-shell tool does not solve that risk. The separation protects control-plane credentials while keeping hostile public workloads out of scope. |
| 29 | Distinguished dependency preparation from offline checks and constrained cache reuse | Reproducibility and network isolation otherwise conflict; npm installation is itself an execution/supply-chain boundary. |
| 30 | Changed “deterministic/flaky” language to observed reproducibility and “possibly flaky,” with recorded sample sizes | Four executions cannot establish statistical determinism or prove the absence of flakiness. |
| 31 | Added missing-evidence/inconclusive states, test-count checks and safe artifact handling | Prevents fabricated green results, missing reporter output and log/artifact security gaps. |
| 32 | Made LangGraph checkpoint replay, serialized resume and tool-effect idempotency explicit | Durable graph state is not an exactly-once guarantee for builds, model calls or GitHub mutations; domain/checkpoint reconciliation is still necessary. |
| 33 | Kept one graph and official provider SDK with a thin adapter | Preserves genuine tool-using AI depth without multiple frameworks or agent-role theater. |
| 34 | Added schema/refusal/incomplete-output handling, capability enforcement and provider-data limits | Structured outputs constrain syntax, not truth or authorization; prompt text alone is not an injection defense. |
| 35 | Reduced the default patch budget from five files/200 lines to two files/80 lines | Matches the deliberately narrow first repair domain and makes review/evaluation tractable; expansion requires evidence. |
| 36 | Shipped candidate generation with its independent verifier and kept mandatory checks outside agent control | Avoids a release that can generate convincing edits without a trustworthy way to assess them. |
| 37 | Made approval bind an immutable verification payload and full candidate/source/policy/environment identity, with expiry | A generic approve button is insufficient when inputs change; separating mutable lifecycle status also prevents approval from changing its own approved hash. |
| 38 | Defined fix-PR destination, original-check semantics and ambiguous GitHub-effect reconciliation | Prevents duplicate PRs, accidental inclusion of unrelated feature changes and falsely marking the failing revision green. |
| 39 | Reduced four roles to three and specified GitHub App login with PKCE, installation verification and tenant authorization | Simplifies UI/policy scope while using the current documented authorization flow and preserving ownership/cross-tenant tests. |
| 40 | Added durable SSE cursors and a one-instance strategy without Redis | Reconnection correctness is valuable; a second infrastructure dependency is not needed at demo scale. |
| 41 | Started evals with the first agent and set a roughly 26-scenario completion benchmark instead of a late 30–50-case requirement | Earlier feedback and better-labeled cases offer more value than a larger late dataset; preserves a manageable solo scope. |
| 42 | Added holdout separation, deterministic/single-call/tool-agent baselines, independent patch checks and precision plus coverage | Makes AI benefit, abstention and false repairs measurable and harder to cherry-pick. |
| 43 | Separated attempted from executed unsafe actions and required denominators/limitations | A blocked malicious request is different from a successful unsafe operation; zero observed incidents is not a security proof. |
| 44 | Added production restore/rollback, service degradation and measured performance requirements | Demonstrates operational competence beyond “Docker containers run on a VM.” |
| 45 | Replaced implied completeness through technology count with observable release gates, scope limits and truthful CV claims | Keeps the project credible, reviewable and finishable. |

### Final accepted amendments

| Amendment | Incorporated change | Consequence |
|---|---|---|
| 1 — V5/V6 ordering | V5 is the durable read-only agent plus initial evaluations; V6 is cloud deployment and operational proof. Updated dependencies, acceptance criteria, package timing and effort table. | V5 depends on completed V4, not cloud. V6 deploys and validates the already working agent as well as the evidence system. V7 requires both. Total planning effort is unchanged. |
| 2 — Development environment | Windows host, WSL2 Ubuntu, VS Code connected to WSL and Docker Desktop Linux containers; repository in the Linux filesystem. | V0 verifies environment/tool paths and Linux test/container behavior; host PowerShell commands remain separately labeled. |
| 3 — Version candidates | Research snapshot versions are compatible-version starting points; retain the accepted technology/release-line choices unless evidence shows a problem. | V0 resolves/pins its dependencies, commits the lockfile and records reasons/results. No `--force` or `--legacy-peer-deps`; later components are confirmed when introduced. |
| 4 — Internal V2 checkpoints | Added V2.a domain/check state, V2.b outbox/broker, V2.c runner, V2.d leases/fencing and V2.e integrated failure validation. | Public roadmap remains ten releases. Concurrent/recoverable execution is not released before fencing and the integrated acceptance gate. |
| 5 — Product identity | Explicitly separate observations, hypotheses, generated candidates, verification and authorization; keep the reviewable report central. | Abstention, model failure/outage, flaky/infra cases and human candidates remain useful product paths. |
| 6 — Preserved architecture | Marked the accepted decisions and invariants as frozen, with an evidence-based ADR/change process. | No casual framework, service-boundary, queue, authority or agent-capability drift. |
| 7 — Optional and excluded infrastructure | Retained the optional need gates and the explicit list outside the core. | No résumé-driven infrastructure and no automatic merge/general terminal agent. |
| 8 — Repository documentation | Required all five documentation locations at V0 and the full twelve-field status record. | Repository documents describe current facts and accepted decisions; README stays a concise public front page. |
| 9 — Implementation discipline | One bounded verified checkpoint at a time; command context, explained failures/conflicts, synchronized docs and commit/push guidance. | Earlier working architecture is preserved and no future infrastructure is implemented prematurely. |
| 10 — Solo scope | Reaffirmed depth, tests, measurements and explainability over breadth. | The complete core remains finishable without optional specializations or extra public versions. |

**This master plan is accepted and frozen under section 0's change-control rule. No implementation was performed while incorporating these amendments.** When implementation is requested, begin with one bounded **V0** environment/compatibility/foundation checkpoint and maintain the required repository documents as work proceeds.
