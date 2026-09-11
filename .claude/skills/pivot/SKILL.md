---
name: pivot
description: Judge whether the current approach is a dead end, and if it is, kill it — harvest what is now known to be false, close the bet, and open the next one. The goal never changes; only the bet does. Run it when a rung keeps failing or the bet's kill conditions are met.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash, Agent, SendMessage
---

# Pivot

A failed rung is information. A rung that keeps failing the same way is the world answering. This skill tells the two apart, and ends an approach without ending the goal.

Read `docs/engineering/evidence.md` and `docs/bets.md` first.

## Arguments

- `/pivot` — rule the open bet.

## When this is the wrong skill

- The rung has failed once → fix the artifact and run `prove` again.
- The rung failed for a different reason each time → that is a build problem; fix the build.
- No bet is open → run `frame`.

## Steps

### 1. Dispatch `bet-reviewer`

Fresh dispatch, never `fork`. Give it the bet id and nothing else — it reads the ledger entry, the spec, and the rung verdicts itself.

**Do not argue for the bet in the dispatch.** No history, no reasoning, no account of how close it got. Effort already spent is the argument for killing, not against it, and a reviewer that hears the case for continuing has stopped being independent.

It returns persevere, pivot or kill, with the counts and whether the failure is executional or structural.

### 2. On persevere

It named one rung and the count the next round must reach. Go do that. Nothing else in this skill applies, and the bet stays open.

### 3. On pivot

The approach may survive a different Who or Moment; the spec is what the evidence contradicts. The reviewer named the slot.

Close the bet as `pivot`, write the lessons file for what the evidence did refute, and run `frame` on the same goal with that slot rewritten. The new bet carries a new number and a new set of registered bars. Bars are never inherited.

### 4. On kill

1. **Write `docs/research/lessons-<bet>.md`** from the reviewer's list. One line per lesson, each a claim about the world that is now **false**, each citing the verdict that refuted it:

        - <the claim that is now false> — refuted by: docs/evidence/bet-<n>/r<n>/verdict.md

   Write what is no longer worth believing, not what went wrong with the work. *People in this moment will not give a card before they see output* is a lesson. *The onboarding needed more polish* is a note about the build, and it teaches the next bet nothing.

2. **Close the bet** in `docs/bets.md` with the date, the ruling, the reason and the lessons path.

3. **Run `frame`** on the unchanged goal. The new bet must name a lesson it contradicts. **Reject a new bet that contradicts none** — it is the killed bet repainted, and it will die at the same rung for the same reason.

4. **Keep the evidence.** Nothing under `docs/evidence/<killed bet>/` is deleted. It is what makes the next bet different.

5. **Record.** The Done entry carries ` — review`: killing a bet is T2. The roadmap's Now and Next are cleared of the dead bet's rungs and refilled from the new one.

### 5. When the goal itself looks unreachable

If the reviewer says the evidence contradicts the goal rather than the approach, stop. Write the item under Blocked & escalations with the verdicts that support it, commit, and end the turn with the question. The Goal section is T3 and user-owned. Narrowing a goal to make it reachable is the same move as moving a bar, done at a larger scale.

## Key rules

1. **The goal never changes here.** The bet does.
2. **The reviewer rules, not the builder.** Dispatch it fresh, and never argue the case in the brief.
3. **Sunk effort is an argument for killing.** Ten expensive rounds do not entitle a bet to an eleventh.
4. **Lessons are claims about the world that are now false** — traceable to a verdict, not to a feeling.
5. **A new bet contradicts a lesson, or it is not a new bet.**
6. **Evidence from a killed bet is kept**, and its bars are never reused.
