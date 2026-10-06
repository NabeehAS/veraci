# Compatibility and version record

Updated: 2026-10-06. Exact versions are selected through compatibility preflight
within the release lines defined by the [invariants](ARCHITECTURE_INVARIANTS.md).
An installed package is not considered integrated until its required checks pass.

## Evidence levels

- **Recorded output:** command results were inspected for the stated environment.
- **Reported check:** success was reported without a retained command transcript.
- **Pending:** compatibility or integration has not been demonstrated.

## Development environment

The following environment results were recorded on 2026-10-05.

| Component | Recorded version | Evidence |
|---|---|---|
| Windows | Windows 11 Home, x64; build 26300 | Recorded inventory output |
| WSL | 2.4.13.0; Ubuntu uses WSL2 | Recorded inventory output |
| Ubuntu | 24.04.2 LTS, x86_64 | `/etc/os-release`, `uname -m` |
| Kernel | 5.15.167.4-microsoft-standard-WSL2 | `uname -r` |
| Linux Git | 2.43.0 | `git --version` |
| Docker Desktop | 4.94.0 (241994) | Ubuntu `docker version` |
| Docker client/engine | 29.8.2, API 1.56, linux/amd64 | Ubuntu `docker version` |
| Docker Compose | 5.5.1 | `docker compose version` |
| VS Code | 1.139.1, x64 | Windows CLI output |
| VS Code WSL extension | 0.104.3 | Extension installation output |
| nvm | 0.40.8 | Fresh Ubuntu shell output |
| Node.js | 24.21.0 LTS | Version, Linux executable path and `linux/x64` |
| npm | 11.19.0 | Version, Linux executable path and nvm prefix |

The workspace is in the Ubuntu filesystem (`~/projects/veraci`). VS Code's WSL
connection and the Docker filesystem probe are reported checks. The probe covered
case sensitivity, relative symlinks, executable behavior, container writes,
UID/GID ownership and basic SIGTERM handling. Its transcript and disposable image
digest were not retained; it does not establish a reproducible runner image.

## Root toolchain pins

| File | Selection |
|---|---|
| `.nvmrc` | `24.21.0` |
| `package.json` engines | Node `24.21.0`; npm `11.19.0` |
| `package.json` packageManager | `npm@11.19.0` |
| `package.json` module mode | `type: module` |
| `.npmrc` | `engine-strict=true`, `strict-peer-deps=true`, `save-exact=true` |
| `package-lock.json` | One root lockfile, generated and consumed with npm 11.19.0 |

Node 24.21.0 was selected within the accepted Node 24 LTS line. npm 11.19.0 was
observed after that Linux Node installation. The `packageManager` field records
selection; engine/peer settings and explicit version checks provide enforcement.
The committed root has no application dependencies or child workspaces.

## Components requiring preflight

| Component | Required release line or constraint | First integration gate |
|---|---|---|
| TypeScript | 6; strict, package-specific compiler settings | V0.d: exact version, build/test roots and module behavior |
| NestJS | 12 with compatible companion packages | V0.d: production startup and dependency injection in Vitest |
| Vitest | One compatible maintained line; no parallel Jest stack | V0.d: SWC/decorator metadata integration |
| Validation/OpenAPI/Pino | Zod runtime contracts, compatible Nest integration | V0.d: schema agreement, invalid-input handling and safe logs |
| PostgreSQL | 18 | V0.e: maintained image tag/digest and real integration |
| Prisma | Maintained stable 7 line | V0.e: aligned CLI/client/adapter/driver and database checks |
| Next.js | Supported, patched 16 line | V0.f: package peers and production build/start |
| React/React DOM/types | Compatible React 19 set | V0.f: rendering and interaction test |
| Playwright | Compatible maintained release | V0.f: matching Linux browsers/dependencies and smoke test |
| RabbitMQ/direct AMQP client | RabbitMQ 4.3 | V2: confirms, acknowledgements and recovery |
| LangGraph.js/OpenAI adapter | One workflow and provider adapter | V5: checkpoints, bounded tools, structured output and evals |
| Cloud/runtime/artifact integrations | AWS deployment plan | V6: deployed integration and operational proof |

Confirm official package engines, peers, support status and installed behavior at
each component's introduction. Record exact pins, commands and results here;
metadata review or a dry run does not complete an integration gate. Later-version
infrastructure is not installed during V0 to reserve versions.

## V0 verification gates

| Gate | Status | Evidence or required result |
|---|---|---|
| Host/runtime identity | Passed — recorded output | Linux tool paths and selected versions |
| Workspace/editor/Docker filesystem | Passed — reported check | WSL editor and mount/ownership/symlink/executable/basic signal checks; transcript not retained |
| Root lockfile and installation | Passed — recorded output | Lockfile generation, `npm ci` and the expected empty `npm ls --all` tree |
| Git/editor foundation | Passed — recorded output | Staged whitespace check; LF in index and working tree for all 16 foundation files |
| Dependency graph and API/compiler | Pending — V0.d | Supported engine/peer resolution, normal install, production build/start and real Nest DI test |
| API contract/logging | Pending — V0.d | Runtime validation agrees with OpenAPI; invalid input rejected; safe Pino logs |
| PostgreSQL/Prisma | Pending — V0.e | Generate, migrate, query and transaction rollback in an isolated real database; distinct liveness/readiness |
| UI/browser | Pending — V0.f | Next build/start, React interaction and Linux Playwright against real API/database state |
| Clean checkout/Linux CI | Pending — V0.g | Lockfile install, lint/typecheck/tests/build/startup from a clean checkout |

V0.c results were recorded on 2026-10-05 against the foundation working tree later
committed as `4d64a77`. The three npm settings returned `true`. These checks cover
an empty application dependency graph; they do not establish V0.d–V0.g compatibility.
Verification commands are maintained in [PROJECT_STATUS.md](PROJECT_STATUS.md).
For new results, record the command, version/commit or working-tree context, date,
result and limitations.

## Version changes

Pin direct dependencies exactly and commit the root lockfile. Record image digests
when project containers are introduced. Explain version changes and keep `.nvmrc`,
package metadata, the lockfile and this record synchronized.

Do not use `--force`, `--legacy-peer-deps` or unexplained overrides to conceal
conflicts. Review security findings explicitly. Architectural or release-line
changes follow the [change-control process](ARCHITECTURE_INVARIANTS.md#compatibility-and-change-control).

## Official references

- [Node 24.21.0 release](https://nodejs.org/en/blog/release/v24.21.0)
- [nvm installation](https://github.com/nvm-sh/nvm#installing-and-updating)
- [Node on WSL](https://learn.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-wsl)
- [Docker WSL integration](https://docs.docker.com/desktop/features/wsl/)
- [Docker bind mounts](https://docs.docker.com/engine/storage/bind-mounts/)
- [VS Code WSL](https://code.visualstudio.com/docs/remote/wsl)
- [npm package metadata](https://docs.npmjs.com/cli/v11/configuring-npm/package-json/)
- [npm configuration](https://docs.npmjs.com/cli/v11/using-npm/config/)
- [Git attributes](https://git-scm.com/docs/gitattributes)
