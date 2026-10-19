# Compatibility and version record

Updated: 2026-10-07. Exact versions are selected through compatibility preflight
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
The root contains the `apps/api` workspace; its dependencies are declared in that
package and resolved in the single root lockfile.

## API/compiler preflight — 2026-10-06

Test environment: Ubuntu 24.04.3, Linux x86_64, Node 24.21.0 and npm 11.19.0.
Exact direct dependencies are declared in `apps/api/package.json`:

| Packages | Version |
|---|---|
| `@nestjs/common`, `@nestjs/core`, `@nestjs/platform-express`, `@nestjs/testing` | 12.1.2 |
| `reflect-metadata` | 0.2.2 |
| `rxjs` | 7.8.2 |
| `typescript` | 6.0.3 |
| `@types/node` | 24.19.1 |
| `vitest` | 5.0.3 |
| `vite` | 8.3.2 |
| `@swc/core` | 1.16.13 |
| `unplugin-swc` | 2.0.0 |
| `supertest` | 7.3.1 |
| `@types/supertest` | 7.2.1 |

Package engines and required peers were checked against registry metadata. Normal
installation and `npm ci` succeeded without forced peer resolution. `npm ls --all`
reported no problems. Source/test typechecking, all three Vitest tests and the ESM
production build passed. A compiled-process smoke verified HTTP liveness, SIGTERM
exit/port closure and invalid-port rejection. These are Linux preflight results,
not a deployed-system or database/browser compatibility claim.

`npm audit` reported zero known vulnerabilities for this lockfile on 2026-10-06;
that dated result is not a general security assessment.

### Compiler and install-script decisions

- Production uses TypeScript with strict NodeNext settings, explicit source/output
  roots, Node types and decorator metadata. Test compilation uses SWC with legacy
  decorators and metadata enabled, following Nest's Vitest integration.
- `tsconfig.test.json` alone sets `skipLibCheck: true`. The installed `unplugin`
  declarations import optional bundler types including webpack, Rspack, Bun and
  Rollup. Checking those declarations fails without installing unused tooling.
  Source/tests/configuration remain typechecked; production compilation still checks
  dependency declarations. Test-only declaration inconsistencies can be missed;
  revisit this setting when the upstream declarations change.
- npm 11.19.0 requires an explicit decision for dependency install scripts. The root
  `allowScripts` denies `@swc/core`'s postinstall script: the locked native optional
  package works on the supported Linux platform, while the script can install a
  fallback outside the root lockfile. A fresh `npm ci` and SWC-backed tests passed
  with this policy. Do not omit optional packages; unsupported native platforms
  require their own compatibility review.

## Configuration, logging and contract preflight — 2026-10-07

Test environment: Ubuntu 24.04.3, Linux x86_64, Node 24.21.0 and npm 11.19.0.
The configuration/logging/contract working tree extends the API/compiler checkpoint.

| Added direct dependencies | Version |
|---|---|
| `@nestjs/swagger` | 12.0.2 |
| `zod` | 4.6.5 |
| `nestjs-pino` | 5.3.1 |
| `pino` | 10.4.0 |
| `pino-http` | 11.0.0 |

Registry metadata and installed declarations confirmed compatibility with the pinned
Nest 12/TypeScript 6/Node 24 stack. Normal strict installation and fresh `npm ci`
succeeded. `npm ls --all` reported no dependency-tree problems; `npm run check`
passed typechecking, 20 tests and the production build. A compiled-process smoke
passed liveness, OpenAPI, request-log correlation, SIGTERM/port closure, and invalid
configuration rejection. `npm audit` reported zero known vulnerabilities on this
date. These are Linux API results, not database/browser/deployment evidence.

Zod's native Standard JSON Schema support supplies Swagger's response contract;
no converter package or duplicated DTO schema is required. The health controller
validates the same schema at runtime and returns a generic 500 on invalid output.
The endpoint has no domain request payload; input validation currently covers
startup settings. Request schemas are added with data-accepting endpoints.

Pino request serializers allowlist IDs/method/status and omit URLs, headers and
bodies. Tests exercise secret-like values in those fields and server-generated
request IDs. This policy does not automatically sanitize free-form application log
messages. The raw Swagger document route bypasses Nest's request logging middleware.

Swagger introduces the transitive `@scarf/scarf@1.4.0` installation-analytics script.
It was inspected and explicitly denied in root `allowScripts`; it is unnecessary
for runtime behavior. Fresh installation and tests pass with both this script and
SWC's fallback installer disabled. `npm install-scripts ls` reports no unreviewed
scripts. No blanket install-script approval or dependency conflict override was used.

Lint/format checks remain within V0.d. No later-release infrastructure is installed.

## Components requiring preflight

| Component | Required release line or constraint | First integration gate |
|---|---|---|
| TypeScript | 6; strict, package-specific compiler settings | API/compiler preflight passed; see exact selections above |
| NestJS | 12 with compatible companion packages | Production startup and real Vitest dependency injection passed |
| Vitest | One compatible maintained line; no parallel Jest stack | 20 SWC-backed tests passed |
| Validation/OpenAPI/Pino | Zod runtime contracts, compatible Nest integration | Configuration, response/OpenAPI agreement and request-log checks passed |
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
| Root lockfile and installation | Passed — Linux preflight, 2026-10-06 | `npm ci` installs the locked API workspace graph; no dependency-tree problems |
| Git/editor foundation | Passed — recorded output | Staged whitespace check; LF in index and working tree for all 16 foundation files |
| Dependency graph and API/compiler | Passed — Linux preflight, 2026-10-06 | Normal install/`npm ci`, typechecks, three tests, production build/start and shutdown |
| API contract/logging | Passed — Linux preflight, 2026-10-07 | Runtime response/OpenAPI agreement; invalid settings/output rejected; request-log privacy/correlation |
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

- [Nest 12 migration and ESM requirements](https://docs.nestjs.com/migration-guide)
- [Nest Vitest/SWC integration](https://docs.nestjs.com/recipes/swc)
- [Nest Swagger and Standard Schema support](https://docs.nestjs.com/openapi/introduction)
- [Nest Pino compatibility and setup](https://github.com/iamolegga/nestjs-pino)
- [Pino HTTP request serializers and IDs](https://github.com/pinojs/pino-http)
- [TypeScript declaration-checking trade-off](https://www.typescriptlang.org/tsconfig/skipLibCheck.html)
- [npm dependency install-script policy](https://docs.npmjs.com/cli/v11/commands/npm-install-scripts/)

- [Node 24.21.0 release](https://nodejs.org/en/blog/release/v24.21.0)
- [nvm installation](https://github.com/nvm-sh/nvm#installing-and-updating)
- [Node on WSL](https://learn.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-wsl)
- [Docker WSL integration](https://docs.docker.com/desktop/features/wsl/)
- [Docker bind mounts](https://docs.docker.com/engine/storage/bind-mounts/)
- [VS Code WSL](https://code.visualstudio.com/docs/remote/wsl)
- [npm package metadata](https://docs.npmjs.com/cli/v11/configuring-npm/package-json/)
- [npm configuration](https://docs.npmjs.com/cli/v11/using-npm/config/)
- [Git attributes](https://git-scm.com/docs/gitattributes)
