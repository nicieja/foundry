# Plans

One plan per task. A plan is written before the code and moves with the task.

- `active/` holds plans in flight. `completed/` holds plans whose task is in the roadmap's Done list.
- Move a plan with `git mv` in the task's last commit, as part of the Record step.
- One file per task: `<slug>.md`, two to four lowercase hyphenated words (`user-login`, `csv-export-v2`).
- Copy `TEMPLATE.md`. Open with `# Title`, then `## Context`.
- Context, Implementation, and Verification are always filled. Research and Considerations exist only when a real choice was made; otherwise delete the heading. Out of scope is one section near the end.
- Implementation steps are checkboxes. Tick them as they land. After a context reset, the first unticked box is where work resumes.
- Link the plan from its roadmap bullet: `- [ ] <task> — plan: docs/plans/active/<slug>.md`.
- A small task gets a small plan. Five lines is fine. No plan is not fine.
