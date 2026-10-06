# Repository guidance

Read `docs/ARCHITECTURE_INVARIANTS.md`, `docs/PROJECT_STATUS.md`,
`docs/compatibility.md`, `docs/architecture.md`, relevant ADRs and the relevant
roadmap sections before making changes. Inspect the code and Git status; planned
capabilities are not evidence of implementation.

- Work on one bounded checkpoint and verify its behavior before continuing.
- Preserve working code and architecture. Add packages, processes and infrastructure
  only when the current checkpoint requires them.
- Prefer direct, readable implementations. Extract abstractions for an existing
  responsibility or repeated behavior, not hypothetical future reuse.
- Comments should explain constraints, decisions or non-obvious behavior. Avoid
  restating code, generated commentary and placeholder documentation.
- Test observable behavior and meaningful failure modes. Do not weaken assertions
  to make a check pass or claim results from tests that were not run.
- Run Git, Node, npm, builds and tests in Linux. Keep host administration separate.
- Never conceal dependency conflicts with `--force`, `--legacy-peer-deps` or
  unexplained overrides.
- Architectural conflicts require evidence, alternatives and an ADR decision before
  implementation. Supported patch/minor changes belong in the compatibility record.
- Resolve failing checks or document the blocker before declaring a checkpoint
  complete. Keep commits focused on verified changes.
- Update existing documentation when behavior changes. Keep current state, planned
  scope and evidence limitations distinct; use the README as the concise entry point.

This file governs development tooling. The runtime investigation agent's separate
capability restrictions are defined in the architecture invariants.
