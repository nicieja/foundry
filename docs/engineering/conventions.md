# Conventions

## Code

- TypeScript, strict, ES modules. Relative imports carry the `.ts` extension.
- Biome decides formatting and lint rules. Run `pnpm format` before a commit; do not hand-format.
- Packages use named exports only. No default exports.

### No armor

Validate at the system boundary: user input, external API responses, deserialized payloads. Trust what is inside. Do not guard states no caller can produce. Do not catch and default; that turns a bug into a wrong answer. Do not add retries, timeouts, or flags nobody asked for. Prefer the crash with a good message. When the right failure behavior is a real decision (retry, degrade, alert, drop), that is an escalation, not a silent choice.

## Testing

- Vitest. Tests live beside the source as `*.test.ts`.
- Test behavior at the package boundary, through its exports. Do not test private helpers.
- Every package has a `test` script, even if it runs one test.

## Adding a package

Three files, and nothing else:

    packages/<name>/
      package.json    @repo/<name>, private, "type": "module", "exports" pointing at
                      ./src/index.ts, and the four scripts: test, lint, format, typecheck
      tsconfig.json   extends ../../tsconfig.base.json, includes src
      src/index.ts    the package, with its tests beside it

Consumers depend on it with `"@repo/<name>": "workspace:*"`.

## Adding an app

Same as a package, plus `dev` and `build` scripts. A pure-Node app runs TypeScript directly (`node src/main.ts`). A framework app (Vite, Next, Astro) uses its own tooling and writes build output to `dist/`.

## Adding a non-JS app (Rails, for example)

- It lives in `apps/<name>/` with no `package.json`. pnpm and turbo do not see it. That is the design.
- It owns its toolchain, dependencies, and lint rules. Its JavaScript is not linted by root Biome.
- It ships `bin/ci` (Rails 8 generates one). The root `bin/ci` discovers and runs it.
- It pins its runtime: add `ruby <version>` to the root `.tool-versions`, or a `.ruby-version` inside the app.
- `rails new` writes the app's own `.gitignore`. The root `.gitignore` already ignores `apps/*/log`, `tmp`, `storage`, and credential keys as a safety net.
- Its dev command goes in the Commands section of `CLAUDE.md`.
- The boundary between it and the JS packages is HTTP or JSON. Never shared code.

## Commits

- Subject: imperative, under 50 characters, no trailing period. Body wrapped at 72, says why.
- One logical change per commit. The roadmap and plan edits that describe the change ride in the same commit.
- Never commit with `bin/ci` red.

Example:

    Add CSV export for reports

    Users asked for spreadsheets, and the JSON endpoint was being scraped
    for the same purpose. The exporter streams rows so a large report does
    not buffer in memory.
