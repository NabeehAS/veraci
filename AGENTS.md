# Working on VeraCI

Before changing the repository, read `docs/ARCHITECTURE_INVARIANTS.md`,
`docs/PROJECT_STATUS.md`, `docs/compatibility.md`, `docs/architecture.md`, relevant
ADRs and the relevant sections of `docs/MASTER_ROADMAP.md`. Inspect actual files
and Git status; do not infer implementation from the target design.

- Implement one bounded checkpoint at a time. Verify it before moving forward.
- Preserve the evidence-first product and accepted architecture. Do not regenerate
  working earlier code or introduce infrastructure from later versions.
- Keep implemented behavior, user-confirmed checks, directly observed results and
  planned work distinct. Never claim a test passed without evidence.
- Update status, compatibility, architecture and relevant decisions after meaningful
  changes. The README is a concise entry point, not the task board.
- Run project Git, Node, npm, tests and builds in Linux. Explain commands and label
  Windows PowerShell versus Ubuntu Bash when the user must run them.
- Do not hide dependency problems with `--force` or `--legacy-peer-deps`.
- If implementation conflicts with the master architecture, stop the affected
  change and explain the evidence, trade-off and smallest alternative before
  changing the decision. Record the outcome in an ADR.
- Explain failing checks and resolve or document the blocker before calling a
  checkpoint complete. Do not skip failures silently.
- At a verified commit/push checkpoint, tell the user what is ready and suggest a
  focused commit message. Do not treat an internal checkpoint as a public release.

The runtime investigation agent's permissions are product architecture, separate
from this development workflow. Its no-shell/no-GitHub-write boundaries are in
the invariants and must remain intact.
