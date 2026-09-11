# context/

Short-lived working memory for the agents on the current task. Tracked in git so subagents in worktrees can read it. May be wiped between tasks. Never the only copy of anything durable: durable goes to `docs/`.

- `notes.md` — the shared scratchpad. Append-only during a task. Entry format: `## YYYY-MM-DD HH:MM — <role> — <task slug>` followed by bullets. Truncated to its header in the Record step.
- `<task-slug>/` — handoff bundles between subagents (a research dump, a list of files to touch). Deleted with the task.

Subagents write here. Only the coordinating agent edits `docs/roadmap.md`.
