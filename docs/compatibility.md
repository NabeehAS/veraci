# Compatibility and version record

Recorded 2026-10-05 during V0. Exact September 21 roadmap versions are researched
candidates, not immutable requirements. Architecture stays fixed unless concrete
evidence justifies an explained change. Installation alone does not prove integration.

## Evidence convention

- **Verified output:** terminal results supplied by the developer and reviewed.
- **User-confirmed:** the developer reported success; full raw results were not supplied.
- **Selected/pending:** configuration exists, but its local verification is not complete.
- **Planned:** the component is not installed/implemented in this repository.

## Development environment

| Component | Exact observed selection | Evidence |
|---|---|---|
| Windows | Windows 11 Home, x64; reported build 26300 | Verified inventory output |
| WSL package | 2.4.13.0; Ubuntu uses WSL2 | Verified inventory output |
| Ubuntu | 24.04.2 LTS, x86_64 | Verified `/etc/os-release` and `uname -m` |
| Kernel | 5.15.167.4-microsoft-standard-WSL2 | Verified `uname -r` |
| Linux Git | 2.43.0 | Verified `git --version` |
| Docker Desktop | 4.94.0 (241994) | Verified fresh Ubuntu `docker version` |
| Docker client/engine | 29.8.2, API 1.56, linux/amd64 | Verified fresh Ubuntu output |
| Docker Compose | 5.5.1 | Verified `docker compose version` |
| VS Code | 1.139.1, x64 | Verified Windows CLI output |
| VS Code WSL extension | 0.104.3 | Verified installation output |
| nvm | 0.40.8 | Verified fresh Ubuntu output |
| Node.js | 24.21.0 LTS | Verified Linux executable, version and `linux/x64` |
| npm | 11.19.0 | Verified Linux executable, version and nvm prefix |

The earlier Docker Desktop 4.40.0 result predates the update and is superseded by
the verified 4.94.0 result. The earlier Windows npm 11.4.2 result is not this
repository's Linux npm selection.

The selected workspace is `~/projects/veraci` in the Ubuntu filesystem. The user
confirmed that VS Code opens it through WSL and that the Docker filesystem probe
passes. The probe checked case sensitivity, a relative symlink, executable behavior,
container writes, UID/GID ownership and a basic self-SIGTERM handler. Raw final
output and the disposable Ubuntu image digest were not supplied, so they are not
represented as independently inspected evidence or a pinned project runner image.

## Root toolchain pins

| File | Selection |
|---|---|
| `.nvmrc` | `24.21.0` |
| `package.json` engines | Node `24.21.0`; npm `11.19.0` |
| `package.json` packageManager | `npm@11.19.0` |
| `package.json` module mode | `type: module` |
| `.npmrc` | `engine-strict=true`, `strict-peer-deps=true`, `save-exact=true` |
| `package-lock.json` | Generated with npm 11.19.0; consumed successfully by `npm ci`; one root lockfile |

The `packageManager` field records the selected manager/version; it is not by itself
proof of enforcement. Engine/peer settings and explicit version/install checks are
part of verification. The workspace list is empty until an actual package is added.
There are no application dependencies or application test scripts at this checkpoint.

Initial resolution reason: Node 24.21.0 remains in the accepted Node 24 LTS line and
was observed on the official download/release pages. npm 11.19.0 was observed after
that Linux Node installation; no separate npm upgrade was performed.

## Components still requiring preflight

| Component | Accepted choice | First introduction / pending evidence |
|---|---|---|
| TypeScript | 6 | V0.d: exact supported version, compiler/module settings, build/test roots |
| NestJS | 12 | V0.d: aligned companion packages, DI in Vitest, production startup |
| Vitest | One maintained compatible line | V0.d: SWC/decorator metadata path, no parallel Jest stack |
| API validation/OpenAPI/Pino | Accepted roadmap choices | V0.d: schema/runtime agreement, safe structured logging |
| PostgreSQL | 18 | V0.e: maintained image tag/digest and actual integration |
| Prisma | Maintained stable 7 line | V0.e: CLI/client/adapter/driver alignment and real database checks |
| Next.js | Supported/patched 16 line | V0.f: exact supported package peers, production build/start |
| React/React DOM/types | Compatible React 19 set | V0.f: rendering and real interaction test |
| Playwright | Compatible maintained release | V0.f: matching Linux browser/dependencies and smoke test |
| RabbitMQ/direct AMQP client | RabbitMQ 4.3 | V2: queue, confirms/acks and recovery behavior |
| LangGraph.js/OpenAI adapter | One workflow/provider adapter | V5: durable state, bounded tools, structured output and evals |
| Cloud/runtime/artifact integrations | Accepted AWS plan | V6: actual deployed integration and operational proof |

The roadmap's September research remains historical documentary evidence. Recheck
official docs/package metadata at introduction and record exact installed versions
and integration results. Do not install later components just to reserve versions.

## Required V0 gates

| Gate | Current status | Required result |
|---|---|---|
| Host/runtime identity | Passed — verified output | Linux tools and selected versions resolve correctly |
| Workspace/VS Code/Docker filesystem behavior | Passed — user-confirmed | Linux workspace, WSL editor, mount/ownership/symlink/executable/basic signal checks |
| Root lockfile and installation | Passed — verified output, 2026-10-05 | Lockfile generation and normal `npm ci` succeeded; `npm ls --all` showed the expected empty tree |
| Git/editor foundation | Passed — verified output, 2026-10-05 | Staged whitespace check had no diagnostics; all 16 staged files showed LF in index and working tree |
| Dependency graph and API/compiler | Pending — V0.d | Official engine/peer review, normal install, production build/start, real Nest DI test |
| API contract/logging | Pending — V0.d | Runtime validation agrees with OpenAPI; invalid input rejected; safe Pino logs |
| PostgreSQL/Prisma | Pending — V0.e | Generate, migrate, query and rollback in an isolated real database; distinct live/ready behavior |
| UI/browser | Pending — V0.f | Production Next build/start, React interaction test, Linux Playwright against real API/database state |
| Clean checkout/Linux CI | Pending — V0.g | Lockfile install, lint/typecheck/tests/build/startup from a clean checkout |

V0.c was checked on the initial, uncommitted `main` working tree. The three npm
configuration queries returned `true`. The audit reported zero vulnerabilities for
the root-only graph; this is not an application security assessment. The resulting
foundation is recorded in commit `4d64a77`, whose published files were inspected in
a fresh GitHub clone on 2026-10-05. That inspection is separate from the earlier
developer-run environment/install checks; it does not claim those checks were rerun.

Update a gate only from its actual output. Record command, version/commit or working
tree context, date, result and limitations. V0.c has an empty dependency graph, so
its success cannot establish V0.d–V0.g compatibility.

## Version-change procedure

Use supported compatible versions, exact direct dependency selections and the root
lockfile. Record container digests when actual project containers are introduced.
Document why any selected version differs from a researched candidate; keep `.nvmrc`,
package metadata, lockfile and this record synchronized.

Never use `--force`, `--legacy-peer-deps` or a silent override to conceal conflicts.
Review security findings explicitly. A change to an accepted architecture/release
line follows the invariants' change-control process before implementation.

## Official references used for the foundation

- [Node 24.21.0 release](https://nodejs.org/en/blog/release/v24.21.0)
- [nvm installation instructions](https://github.com/nvm-sh/nvm#installing-and-updating)
- [Node on WSL](https://learn.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-wsl)
- [Docker WSL integration](https://docs.docker.com/desktop/features/wsl/)
- [Docker bind mounts](https://docs.docker.com/engine/storage/bind-mounts/)
- [VS Code WSL](https://code.visualstudio.com/docs/remote/wsl)
- [npm package metadata](https://docs.npmjs.com/cli/v11/configuring-npm/package-json/)
- [npm configuration](https://docs.npmjs.com/cli/v11/using-npm/config/)
- [Git attributes](https://git-scm.com/docs/gitattributes)
