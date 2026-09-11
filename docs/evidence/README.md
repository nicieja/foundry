# Evidence

What was measured, what the bar was, and who ruled. Durable, because a verdict rests on it: a transcript that is deleted takes its verdict with it. The doctrine is `docs/engineering/evidence.md`.

## Layout

    docs/evidence/bet-<n>/spec.md          the success spec: Who, Moment, Behavior, Rate, Arithmetic
    docs/evidence/bet-<n>/r<n>/bar.md      the registered bar, committed alone and before anything else
    docs/evidence/bet-<n>/r<n>/panel.md    the briefs, the temperaments, the arbiter's brief audit, every re-run and its reason
    docs/evidence/bet-<n>/r<n>/t-<n>.md    one raw transcript per subject
    docs/evidence/bet-<n>/r<n>/verdict.md  the ruling, the count, and the artifact SHA

## Rules

- A bar lands in a commit that carries no evidence — all of a bet's bars together is fine, a bar beside its own transcripts is not. It is committed before a brief is written or a subject is spawned. `bin/evidence-check` fails `bin/ci` when a bar was introduced in the same commit as its verdict or later, or when its content has changed since the commit that introduced it.
- Transcripts are raw. Never a summary, never an excerpt, never tidied. The arbiter reads these and nothing else about the run.
- `verdict.md` opens with one word — PASS, FAIL, or VOID — then the count against the bar, then the artifact SHA the verdict binds to.
- Nothing here is edited after its verdict lands. A wrong run is re-run into a new rung directory, not corrected in place.
- A killed bet keeps its evidence. That is what makes the next bet different.

## Lessons

When a bet is killed, `docs/research/lessons-<bet>.md` records what is now known to be **false** about the world — not what went wrong with the work. One line per lesson, each citing the rung verdict that proved it:

    - <the claim that is now false> — refuted by: docs/evidence/bet-<n>/r<n>/verdict.md

The next bet names the lesson it contradicts. A bet that contradicts none is the killed bet in new clothes.
