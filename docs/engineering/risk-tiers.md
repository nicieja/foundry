# Risk tiers

Tiers say who decides. `risk.md` says when a risk has to be answered at all, and deferring one never changes its tier.

Tier semantics are fixed. The surfaces are per project: edit the lists below when the project has real ones. When work touches surfaces in two tiers, the higher tier wins. An unlisted surface is T2.

## What the foundry does per tier

- **T0 — flows freely.** Proceed and commit.
- **T1 — machine-gated.** Proceed after a subagent review, with the evidence in the plan's Verification section. Commit.
- **T2 — user-gated.** Proceed and commit. Mark the Done entry ` — review`. The user skims flagged diffs later. This is the default for anything not listed.
- **T3 — user-joined.** Stop before touching it. Write the item under Blocked & escalations, commit, and end the turn with the question. Never unattended.

## Surfaces

- **T3:** money movement; auth, permissions, sessions; irreversible data deletion or migration; secrets and credentials; anything deployed to a shared environment; externally visible contracts; the Goal section of `docs/roadmap.md`; a registered bar or success spec under `docs/evidence/` once evidence exists; collecting evidence from real people; widening permissions in `.claude/settings.json`.
- **T2:** schema and migrations; public API; core domain logic; reducing a release's scope; killing a bet and opening the next one; root toolchain files (`package.json`, `turbo.json`, `biome.json`, `tsconfig.base.json`, `bin/ci`, `bin/evidence-check`, `CLAUDE.md`); hooks in `.claude/settings.json`.
- **T1:** feature work inside a package or app that has tests.
- **T0:** `docs/`, `context/`, tests, scripts, comments, `.claude/agents`, `.claude/skills`, `.claude/commands`. Includes `docs/bets.md` and a new `docs/evidence/` bar, transcript, or verdict — writing one is free, changing one after it has been ruled is T3.
