# Software factory

A template for an autonomous agent that builds software from a goal. The agent reads `CLAUDE.md`, works the roadmap task by task, verifies with one command, and commits as it goes.

## Quick start

1. Write the goal in the Goal section of `docs/roadmap.md`. One paragraph: what exists when it is done, and how you know.
2. `mise install node pnpm && pnpm install && bin/ci`
3. `claude`, then `/factory`.

Everything else is in `CLAUDE.md`. Conventions are in `docs/engineering/`. The agent's own commands, agents, and skills live in `.claude/`.
