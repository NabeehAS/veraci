# Project status

Last updated: 2026-10-05. This file describes actual implementation state.
Target functionality is defined by the master roadmap and invariants.

## 1. Current version

**V0 — Reproducible Foundation**, in progress. No public version has been released.

## 2. Current internal checkpoint

**V0.c — Minimal workspace and authoritative documentation**, complete.
Root lockfile/installation/configuration and staged Git checks passed from supplied
terminal output on 2026-10-05. V0.a and V0.b are complete. V0.d has not started.
The initial foundation is ready for its first Git commit.

## 3. Completed functionality

Application functionality: none yet.

- Windows/WSL/Ubuntu/tooling inventory completed.
- Linux Node/npm selection and fresh-shell resolution verified from supplied output.
- Ubuntu can reach Docker Desktop's Linux engine; Linux Git is available.
- User confirmed the Linux workspace, VS Code WSL connection and disposable Docker
  filesystem/basic-signal probe work. The probe's raw output/digest was not supplied.
- Root npm manifest/pins, Git/editor configuration and authoritative documents exist.
- The root lockfile was generated with npm 11.19.0 and consumed successfully by `npm ci`.
  The dependency tree is empty, all three npm settings are enabled, and the 16 staged
  foundation files pass the whitespace check with LF in both index and working tree.

## 4. Current architecture

One repository with a private npm workspace root and no child workspaces yet.
The workspace list is intentionally empty until the first real package is introduced.
There is no application runtime, API, UI, worker, runner or agent implementation.
See `architecture.md` for the current/target distinction.

## 5. Database schema status

No database, Prisma schema, generated client or migrations. PostgreSQL/Prisma
compatibility work begins in V0.e. No V1 authorization/tenant schema exists.

## 6. Queues/processes currently present

No application queues or persistent application processes. Docker Desktop and the
VS Code WSL server are development tools. The V0.b container was disposable; its
temporary probe directory may remain locally pending cleanup.

## 7. Tests that currently pass

Application unit/integration/browser tests: **none implemented or run**.

Environment checks, 2026-10-05:

- Supplied output verified Node 24.21.0, npm 11.19.0, nvm 0.40.8, Linux executable
  paths, `linux/x64` and the nvm npm prefix in a fresh Ubuntu session.
- Supplied output verified Git 2.43.0 and Docker Desktop 4.94.0 with a Linux client
  and server, Engine 29.8.2 and Compose 5.5.1.
- User confirmed the remaining V0.b checks passed. This is recorded as user-confirmed,
  not as directly inspected raw test output or independently reproduced results.

V0.c foundation checks: **passed — supplied output reviewed, 2026-10-05**.

- `nvm use` selected Node 24.21.0 with npm 11.19.0 from `.nvmrc`.
- `npm install --package-lock-only` and `npm ci` succeeded.
- `npm ls --all` reported `veraci@0.0.0` with an empty dependency tree.
- `engine-strict`, `strict-peer-deps` and `save-exact` all returned `true`.
- `git diff --cached --check` produced no diagnostics.
- Git status listed the expected 16 new files on an unborn `main` branch.
- `git ls-files --eol` reported `i/lf` and `w/lf` for every staged file.

The audit reported zero vulnerabilities for the empty root dependency graph. These
checks establish only this foundation; they do not prove application security or
compatibility of uninstalled Nest, TypeScript, Prisma or Next dependencies.

## 8. Known bugs

No remaining environment bug has been reported. No application exists to evaluate
for application bugs. The earlier Windows-npm resolution issue is resolved.

## 9. Known technical debt

No intentional code debt introduced. Evidence limitation: the final V0.b probe's
transcript/image digest was not retained here. Pending V0 implementation is planned
work, not completed functionality or automatically classified as technical debt.

## 10. Known security limitations

No application authorization, secret handling, execution isolation or public service
exists yet. Local Docker access is a development capability, not a hostile-code
sandbox. No claim about future runner isolation follows from the environment probe.
Ignore patterns reduce accidental secret commits but are not a complete secret scan.

## 11. Next bounded task

**V0.d — Dependency resolution and minimal API/compiler preflight**, not started.
Begin by checking official engine/peer requirements for the minimal server toolchain
and resolving its exact compatible versions. Introduce only the minimal API/compiler
foundation needed for this checkpoint; PostgreSQL/Prisma remains V0.e and the web
package remains V0.f. V1 and all later-version infrastructure remain unopened.

Planned internal V0 sequence:

| Checkpoint | Scope |
|---|---|
| V0.a | Host/existing-work inventory — complete |
| V0.b | Linux development environment — complete |
| V0.c | Minimal workspace/docs — complete |
| V0.d | Dependency resolution and minimal API/compiler preflight |
| V0.e | PostgreSQL/Prisma integration preflight |
| V0.f | Web/browser preflight |
| V0.g | Clean-checkout Linux CI and V0 acceptance |

Planned V2 tracking, to activate only when V2 begins: V2.a Build/Job/Attempt and
GitHub Check state; V2.b transactional outbox/RabbitMQ; V2.c Docker runner;
V2.d leasing/fencing; V2.e crash/recovery/duplicate-delivery validation.
These are internal checkpoints, not public product versions.

## 12. Exact verification commands

Run in the repository's Ubuntu/WSL terminal. First-time Git initialization/config:

```bash
git init -b main
git config --local core.autocrlf false
git config --local core.filemode true
```

First-time root lockfile generation, followed by reproducible installation:

```bash
nvm use
node --version
npm --version
npm install --package-lock-only
npm ci
npm ls --all
npm config get engine-strict
npm config get strict-peer-deps
npm config get save-exact
```

Expected versions: Node v24.21.0, npm 11.19.0. Expected tree: root package `veraci`
with no dependencies. All three configuration queries should return `true`.

Review the initial files and stage only the known foundation paths:

```bash
git add -- README.md AGENTS.md package.json package-lock.json .nvmrc .npmrc .gitignore .gitattributes .editorconfig docs
git diff --cached --check
git status --short --branch
git diff --cached --stat
git ls-files --eol
```

No output from `git diff --cached --check` means no whitespace errors were found.
Text files should show LF in the index and working tree. Review the staged diff
locally with `git diff --cached` before committing.

Suggested first commit after verified completion:
`chore: initialize VeraCI workspace and architecture docs`.
Git author identity, remote setup, commit and push are not performed by the bootstrap.
