---
name: frame
description: Turn a fuzzy goal into a success spec, a ladder of bars, and an open bet — before any evidence exists. Run it when the roadmap's Goal names no command, file, or output that could settle it, and again whenever a bet is killed.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash, Agent, SendMessage
---

# Frame

A fuzzy goal cannot be verified by building the thing well. This skill turns it into something that can return yes or no. The artifact is a success spec, one registered bar per rung, and an open bet. No evidence is gathered here and no code is written.

Read `docs/engineering/evidence.md` first. It is the law; this is the procedure.

## Arguments

- `/frame` — frame the Goal section of `docs/roadmap.md`.
- `/frame <goal>` — frame the goal in the argument. Used when opening the next bet after a kill.

## When this is the wrong skill

- The goal names a command that passes or a file that exists → it is not fuzzy; run the ordinary loop.
- A bet is already open and un-killed → run `prove` on its next rung.
- The approach needs judging, not framing → run `pivot`.

## Steps

### 1. Confirm the goal is fuzzy

A goal is fuzzy when no command, file, or output settles it. If the Goal section is empty, stop and ask; that is a stop condition in `CLAUDE.md` and nothing below applies.

### 2. Read the lessons

If any bet has been killed, read every `docs/research/lessons-*.md` before writing a word. The new bet must contradict at least one line in them. A bet that contradicts none is the killed bet in new clothes, and `pivot` will reject it.

### 3. Write the success spec

Five slots, in `docs/evidence/bet-<n>/spec.md`. The doctrine has worked examples for a revenue goal, a game goal and an adoption goal.

    # bet-<n> — success spec

    Who:      <the one person whose behavior decides the goal>
    Moment:   <when they meet it, and what pushed them to be there>
    Behavior: <the observable act that counts>
    Rate:     <how often it must happen, as a number>
    Arithmetic: <the line from that rate to the goal's own words>

Rules that decide whether this is a spec or a wish:

- **Who is a person in a situation, not a segment.** "Small businesses" cannot be briefed. "A freelance bookkeeper running 20 client files alone" can.
- **Behavior is observable in a transcript.** "Loves it" is not. "Comes back on day 5 with the old tool still installed" is.
- **The Arithmetic is written out with its numbers**, and the numbers that are guesses say so. `field-researcher` replaces them with sourced ones at R1.

### 4. Derive a bar per rung

One `bar.md` per rung, R1 through R5, under `docs/evidence/bet-<n>/r<n>/`. Each bar states:

    # bet-<n> R<n> — bar

    Claim:    <the one falsifiable sentence this rung tests>
    Bar:      <the count that passes, by a definition a reader cannot loosen>
    Panel:    <how many subjects, and the temperament mix>
    Stands in for: <the real-world observation this rung substitutes for>
    Fails when: <the count that ends the rung>

A bar is honest when a reasonable person could look at the evidence and reach the same number without you. Write the count, not the sentiment: *4 of 7 name a moment in their own week without being offered one* — never *most subjects show interest*.

### 5. Have the bars attacked before you register them

A bar the builder chose is a bar the builder can meet. Two dispatches, in parallel, before anything is committed:

- `falsifier` on the **Arithmetic** — "find the input that breaks this number."
- The global `ceo` on the **spec** — "challenge this end to end; do not rubber-stamp."

Never `subagent_type: "fork"` for either. Raise any bar their answers show to be easy, and say in the spec which bar moved and why. This is the only moment a bar may move.

### 6. Set the kill conditions

Written now, before a single rung runs, into the bet entry. Two of them:

- A ceiling on rung attempts that end in FAIL. Not a ceiling on rungs: a bet that passes its way up the ladder is a bet that is working.
- A repeat rule: the same rung fails *n* times for the same reason.

Default both to 3 unless the goal argues otherwise. The point of writing them now is that they cannot be softened later by whoever is losing.

### 7. Open the bet and register

Append the bet to `docs/bets.md` per its format, naming the assumption it rests on and the lesson it contradicts.

Then commit — **the bars land in their own commit, before any brief is written or any subject is spawned.** `bin/evidence-check` compares every bar against its content at the commit that introduced it, so a bar committed after its evidence is a red CI run, not a private decision.

    Register bars for bet-<n>

### 8. Put the ladder on the roadmap

Fill Milestones first: one row per rung, Rung `R<n>`, "Done when" naming that rung's `verdict.md` and the word it must open with. Then one Now or Next item per rung, in order, each naming its bar path. The build task for R3 is written but stays in Next: the loop refuses to open it until R2 has a PASS.

Write that R3 item as the first release, not as the goal: the thinnest artifact a person can walk, in one market, on one platform. What it leaves out is cut per `docs/engineering/scope.md` — under Later, each with the trigger that brings it back.

## Key rules

1. **No evidence is gathered here.** Framing that already knows the answer is not framing.
2. **No code is written here.** Code first exists at R3, and only the thinnest artifact a person can walk.
3. **Bars are registered before evidence, in their own commit.** Changing one afterwards is T3: stop and ask.
4. **The goal is untouchable.** It is T3 and user-owned. The bet changes; the goal does not.
5. **A new bet names the lesson that makes it different.** Otherwise it is the old one repainted.
6. **The spec is goal-sized; the release is not.** When the work is too big, cut the release. Never cut the spec to fit it — a spec trimmed to what is easy is the goal quietly replaced.
