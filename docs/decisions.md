# Decisions

Dated, append-only. Record the why at decision time, not later. One line per decision:

`- YYYY-MM-DD — <decision> — <why> — revisit when: <trigger>`

- 2026-09-10 — docs/roadmap.md is the tracker; no external tool — an unattended loop needs a checkpoint it can read and write with the same tools it uses for code — revisit when: a second human needs to assign work.
- 2026-09-10 — Packages export TypeScript source; no build step — Node 24 runs .ts directly and Vite-style apps consume source; a build step adds files and ordering nobody needs yet — revisit when: a package must publish to npm.
- 2026-09-10 — Biome runs per package through turbo, never root-wide — a directory without package.json is invisible to turbo, so a future Rails app's JavaScript is never linted with TypeScript rules — revisit when: a root-level config file needs linting.
- 2026-09-10 — bin/ci is the one verify command; it runs turbo, then every apps/*/bin/ci — the root command must stay true when a non-JS app appears, without anyone remembering to edit it — revisit when: apps need ordering or shared setup.
- 2026-09-10 — Runtime versions pin in .tool-versions (mise and asdf both read it) — one file pins node and pnpm now and ruby later — revisit when: a contributor uses neither tool.
- 2026-09-10 — context/ is tracked — subagents in git worktrees cannot see untracked files; wipeable means emptied and committed, not ignored — revisit when: notes leak durable content (fix the notes, not the rule).
- 2026-09-10 — Commits land on main; T2 work is committed and flagged `review` in Done — there is no remote and no merge gate, so the gate is a review list the user reads later — revisit when: a remote and a PR flow exist.
- 2026-09-10 — A simulated verdict decides a fuzzy goal, overriding the global rule that a simulated person is never evidence — an unattended factory has no real customers, so simulated reaction is the only evidence available; the strictness of `docs/engineering/evidence.md` is the price of the override — revisit when: real users or real revenue exist, at which point real evidence supersedes simulated without debate.
- 2026-09-10 — The factory kills its own approach; a pivot is T2, not T3 — an approach that fails the same rung the same way ten times must end without waiting for a human, and the kill is ruled by `bet-reviewer` from the verdicts alone — revisit when: two consecutive bets die at the same rung, which is a signal about the goal rather than the approach.
- 2026-09-10 — Bars, transcripts, and verdicts live in tracked `docs/evidence/`, not `context/` — a verdict rests on its transcripts, so deleting them deletes the verdict; and pre-registration is only enforceable against git history — revisit when: transcript volume makes the repo unpleasant to clone.
- 2026-09-10 — Pre-registration is enforced by `bin/evidence-check` in `bin/ci`, not by a rule — a rule the builder can quietly break is not a lock; moving a bar after seeing evidence now shows up as a red CI run — revisit when: history rewriting defeats it in practice and an external anchor is worth the cost.
- 2026-09-10 — `trial-subject` is a new project agent rather than a reuse of the global `persona` — `persona` is a buyer meeting a pitch and stays available for R2; `trial-subject` is a person walking an artifact step by step with the door open behind them, which is a different job — revisit when: the two prompts converge enough that one covers both.
