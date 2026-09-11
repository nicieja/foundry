---
name: prove
description: Run one rung of the evidence ladder end to end — research, briefs, brief audit, panel, raw transcripts, verdict — and record PASS, FAIL or VOID against the bar that was registered before it. Run it for every rung of the open bet, in order.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash, Agent, SendMessage
---

# Prove

One rung, one verdict. The bar already exists and you do not touch it. Read `docs/engineering/evidence.md` first.

## Arguments

- `/prove` — run the open bet's next unruled rung.
- `/prove R<n>` — run that rung.

## When this is the wrong skill

- No bet is open, or the goal has never been framed → run `frame`.
- The rung has already ruled and you dislike the ruling → run `pivot`, or go back to the artifact. Never re-run a rung to get a different answer.

## Steps

### 1. Read the bar

`docs/evidence/bet-<n>/r<n>/bar.md`. Read it and nothing else about the rung. If it does not exist, stop: the bar is registered by `frame`, before evidence, and writing one now would be writing it to fit.

You are the builder. **You do not write a brief, you do not speak to a subject, and you do not decide the verdict.** Your job here is dispatch, capture and record.

### 2. Research — dispatch `field-researcher`

Brief it with the rung's Claim and nothing about what you hope it finds. It returns `docs/research/<topic>.md` with sourced material, and — for R2 onward — the panel briefs, every trait labelled Grounded or Assumed.

At **R1 this is the whole rung.** The material *is* the evidence: comparables, real prices, the failure shelf. Skip to step 6 and let the arbiter rule the research against the bar.

### 3. Audit the briefs — dispatch `arbiter`, job 1

Fresh dispatch. It returns ACCEPT or REJECT per brief, with the offending phrase. A REJECT goes back to `field-researcher` to rewrite; it never comes to you to fix, because you are the one whose hypothesis would leak into the repair.

This audit is the load-bearing defense. A panel that runs on a leaking brief produces a transcript indistinguishable from evidence.

### 4. Run the panel

- **R2 — the premise.** Dispatch the global `persona`, one per brief. It meets a pitch, which is exactly its job. Ask about their world first, then show the premise, then find where it falls over.
- **R3 and R4 — the artifact.** Dispatch the project `trial-subject`, one per brief. Show **one step at a time**, continuing the same agent with `SendMessage`. When a subject stops, stop. Do not show the next step to someone who has left; a walked-away subject is the most useful result on the page.

Both, always:

- Never `subagent_type: "fork"`. A fork inherits your context and the trial becomes you talking to yourself.
- Open questions before closed ones, and never one that names its own answer.
- Your reasoning reaches no subject. Not as a preamble, not as a clarification, not as an aside.

### 5. Save the transcripts raw

One file per subject, `t-<n>.md`, verbatim. Never a summary, never an excerpt, never tidied. The arbiter reads these and your account of them reaches it nowhere.

Write `panel.md`: the briefs, the temperaments, the arbiter's audit, and every re-run with its reason. Re-run only for mechanical failure — broken character, invented artifact facts, a leaking brief. **Never because the answer was unwelcome.** An unlogged re-run is the failure this skill exists to prevent.

### 6. Rule — dispatch `arbiter`, job 2

Fresh dispatch. Give it the rung directory path and the artifact SHA. Give it nothing else: no summary, no framing, no "as you'll see". It counts, quotes, and returns one word.

Write its answer to `verdict.md` unedited.

### 7. Record

- Append the round to the bet in `docs/bets.md`: `- R<n> — PASS — <one line> — <verdict path>`.
- Update the roadmap Status line: `YYYY-MM-DD · bet-<n> · R<n> · <task> · verifying`.
- Commit. One commit per ruled rung.

### 8. Act on the ruling

- **PASS** — the next rung opens. At R2's PASS, and not before, the R3 build task may move to Now.
- **FAIL** — go back to the artifact or the premise. **The bar does not move.** Count the consecutive FAILs at this rung with the same reason; at the bet's kill threshold, run `pivot`.
- **VOID** — the instrument broke. Fix the instrument, re-run into a new rung directory, and log why in `panel.md`.

## Key rules

1. **The bar is read, never written, and never moved.** Changing a registered bar is T3: stop and ask.
2. **You do not write briefs and you do not judge.** The builder doing either is the whole failure mode.
3. **Transcripts are raw and durable.** A verdict without its transcripts is not a verdict.
4. **Re-run for mechanical failure only, and log every one.**
5. **A near miss is a FAIL.** There is no partial credit.
6. **A verdict binds to an artifact SHA.** Change the artifact materially and every rung above it is void.
7. **Never `fork`, never a second opinion from the same context.**
