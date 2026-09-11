# .claude/

The project's own harness: commands, agents, and skills this repo's agent writes for itself. Tracked, so worktree subagents and fresh clones see it. The agent owns this directory. The user's global library in `~/.claude` is callable from here and is never edited from here.

## When to write something here

- The same brief was dispatched twice: `agents/<name>.md`.
- The same multi-step procedure was run twice: `skills/<name>/SKILL.md`.
- The project needs a role nothing global covers (a domain reviewer, a fixture generator): `agents/<name>.md`.
- A one-file prompt wanted as a slash command: `commands/<name>.md`.

Not here: a one-off brief (just write the brief); something a global artifact already does (use it); a name that shadows a global one by accident. Reuse a global name only to replace it deliberately, and say so in `docs/decisions.md`.

## Formats

Claude Code reads the frontmatter. The `description` line is what delegation and the slash menu read, so it is the contract.

Agent, `agents/<name>.md`:

    ---
    name: <kebab-case>
    description: <when to delegate to this agent>
    tools: Read, Grep, Glob, Bash   # optional; omit to inherit all tools
    model: inherit                  # optional: sonnet | opus | haiku | inherit
    ---
    <system prompt: the role, what to read first, what to return, the stop conditions from CLAUDE.md>

Skill, `skills/<name>/SKILL.md` (supporting files beside it, referenced by relative path):

    ---
    name: <kebab-case>
    description: <what it produces and when to use it>
    allowed-tools: Read, Grep, Glob, Bash   # optional
    ---
    <instructions: numbered steps, what the artifact is>

Command, `commands/<name>.md`:

    ---
    description: <one line shown in the slash menu>
    argument-hint: <optional, for example [task-slug]>
    allowed-tools: Read, Bash(git log:*)   # optional
    ---
    <the prompt; $ARGUMENTS receives what follows /<name>>

An agent whose prompt is load-bearing gets a regression battery beside it, `agents/<name>.evals.md`, with no frontmatter so the registry skips it: a protocol, shared fixtures, a probe table (bias / brief / input / pass criterion), and a dated results log. Run it after any change to that prompt instead of trusting a re-read. A failing probe gets a prompt fix and a re-run — never a lowered pass criterion, which is the same move as changing a bar after seeing the evidence.

## Rules

- Generic to this repo, not to one task.
- Short. The description is the contract; the body says how.
- Kebab-case names.
- Every agent brief carries the stop conditions from `CLAUDE.md` and the no-armor rule from `docs/engineering/conventions.md`.
- An agent's `tools:` list is part of its design. A subject that can read a file or search the web is not a subject. An empty `tools: []` grants every tool; `AskUserQuestion` is unavailable to subagents; `Skill` is a path back to file access. Never widen a list to be helpful.
- Try it once in a fresh session before relying on it.
- Creating or changing one is T0 work and gets a Done entry like any change.

## Settings

`settings.json` is tracked. Adding a hook is T2. Widening permissions is T3: stop and ask. `settings.local.json` is gitignored and never relied on.

## Precedence

A project artifact overrides a global one of the same name. Everything else composes: global first, project when nothing global fits.
