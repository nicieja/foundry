# Foundry

A template for an autonomous agent that builds software from a goal. The agent reads `CLAUDE.md`, works the roadmap task by task, and commits as it goes.

Code is verified by `bin/ci`. A goal that no command can settle is verified by `docs/engineering/evidence.md`: a bar registered before the evidence exists, a blind panel that can walk away, and a verdict ruled by an agent that never sees the builder's reasoning. Preparation is the work; code is what it earns.

## Quick start

Once per machine, `bin/install` links `foundry` into `~/.local/bin`, or into `BIN_DIR` when you set one. Then, wherever your projects live:

```sh
foundry new my-app --goal "Keep going until you've built a game you think could make \$1M or more"
```

That copies this clone into `my-app`, installs it, and makes the first commit. Escape a `$` in the goal, or the shell eats it. Then `cd my-app`, run `claude`, and type `/foundry`.

The CLI reads the template from this clone with `git ls-files`, so the template lives in one place and cannot drift — and an uncommitted file here never reaches a new project. `packages/cli`, `packages/example` and this README stay behind.

## Without the CLI

Clone this repo, write the goal in the Goal section of `docs/roadmap.md` — one paragraph: what exists when it is done, and how you know — then `mise install node pnpm && pnpm install && bin/ci`, then `claude` and `/foundry`.

Everything else is in `CLAUDE.md`. Conventions and the evidence doctrine are in `docs/engineering/`. Approaches tried and what killed them are in `docs/bets.md`. The agent's own commands, agents, and skills live in `.claude/`.
