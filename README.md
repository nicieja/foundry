# Foundry

A template for an autonomous agent that builds software from a goal. The agent reads `CLAUDE.md`, works the roadmap task by task, and commits as it goes.

Code is verified by `bin/ci`. A goal that no command can settle — *an app that earns $1m*, *a game people finish* — is verified by `docs/engineering/evidence.md`: a bar registered before the evidence exists, a blind panel that can walk away, and a verdict ruled by an agent that never sees the builder's reasoning. Preparation is the work; code is what it earns.

## Start a project

The CLI in `packages/cli` scaffolds a new project from this clone, so the template exists in one place only. Link it onto your PATH once per machine with `bin/install`, which puts the link in `~/.local/bin` unless you set `BIN_DIR`.

Then, wherever your projects live: `foundry new my-app --goal "..."`. It writes the tree, installs it, and makes the first commit. Only tracked files are template, so commit here before you scaffold.

## Quick start

1. Write the goal in the Goal section of `docs/roadmap.md`. One paragraph: what exists when it is done, and how you know.
2. `mise install node pnpm && pnpm install && bin/ci`
3. `claude`, then `/foundry`.

Everything else is in `CLAUDE.md`. Conventions and the evidence doctrine are in `docs/engineering/`. Approaches tried and what killed them are in `docs/bets.md`. The agent's own commands, agents, and skills live in `.claude/`.
