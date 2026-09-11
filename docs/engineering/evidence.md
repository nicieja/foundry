# Evidence

`bin/ci` verifies an artifact against itself. Some goals are claims about how people respond to an artifact, and no test suite can settle one. This file is the verification system for those goals, the way `conventions.md` is the one for code.

A goal is fuzzy when its "done when" names no command, file, or output: *an app that earns $1m*, *a game people finish*, *the tool this team opens every morning*. A fuzzy goal is never verified by building the thing well. It is verified by measuring a response and doing arithmetic.

## The success spec

Every fuzzy goal decomposes into five slots. The slots do not change with the domain.

- **Who** — the one person whose behavior decides the goal. A role, a situation, a week. Not a segment.
- **Moment** — when that person meets the artifact, and what pushed them to be there.
- **Behavior** — the observable act that counts. Buys. Comes back on day 7. Finishes level 1. Tells someone.
- **Rate** — how often the behavior must happen, as a number.
- **Arithmetic** — the line from the rate to the goal's own words, written out.

Worked, so the frame is visibly generic:

    Goal: an app that earns $1m a year.
    Who: a freelance bookkeeper running 20 client files alone.
    Moment: the week a client's bank feed breaks and reconciliation stops.
    Behavior: pays the annual price within 14 days of first use.
    Rate: 4 of 100 who reach the product page pay.
    Arithmetic: $340/yr x 0.04 x 75,000 reached = $1.02m.

    Goal: a game people finish.
    Who: someone who buys two or three indie titles a year and abandons most.
    Moment: the first evening after the download.
    Behavior: starts a second session within a week.
    Rate: 45 of 100 who start session 1 start session 2.
    Arithmetic: 45% session-2 return is the floor under a 25% completion rate;
                below it, completion has never been reached by a comparable.

    Goal: the tool this team opens every morning.
    Who: a support lead who already has a dashboard they built themselves.
    Moment: the 9am triage, before standup.
    Behavior: opens it unprompted on day 5 with the old dashboard still available.
    Rate: 3 of 7 subjects.
    Arithmetic: unprompted day-5 use with the incumbent still present is the
                behavior the goal names; no further model is needed.

The Rate and the Arithmetic are the verdict. Everything below exists to measure the Rate honestly.

The spec is written at goal size. What gets built is a release, which is smaller — `scope.md` governs that cut, and the spec never shrinks to match it.

## The ladder

Six rungs, cheapest falsification first. Each rung has its own bar, registered before it runs, and each rung can kill the approach.

- **R0 Frame** — write the success spec. Derive a bar per rung. Open the bet. No evidence yet.
- **R1 World** — real-world research. Comparables, real prices, real reviews and complaints, real failures. Bar: the arithmetic is not already refuted by what the world shows, and named comparables exist.
- **R2 Premise** — a blind panel meets the premise only. No product. Bar: a count of unprompted pull, and at least one subject naming a concrete moment in their own week.
- **R3 Artifact** — a blind panel walks the real thing, one step at a time, free to quit at each step. Bar: the drop-out curve. **This is where code first exists, and only the thinnest artifact a person can walk.**
- **R4 Repeat** — does the behavior recur. Return, replay, recommend. Bar: the Rate slot of the spec.
- **R5 Arithmetic** — the goal number, computed from the rates R1 to R4 measured, then attacked. Bar: the number survives the falsifier's worst plausible input.

Code before R2 has passed is work done on an unfalsified guess. The loop refuses it.

## Behavior the foundry may not perform

Some Behavior slots name an act the tiers forbid. Money movement is T3, and so is collecting evidence from real people, so a goal that turns on *buys* names an act no rung can observe.

R4's bar then counts the nearest act a subject can actually perform, and the bar says in one line what that act is not. *Chooses the paid option and says what they would pay for it* is not a payment; a bar that does not say so reads, three weeks later, as though it were one.

Never resolve this by loosening the Behavior slot. The spec keeps the act the goal names, and the bar carries the substitution in the open, where the arbiter counts it and the reader can see what was traded away.

## Pre-registration

The bar is written, committed in a commit that carries no evidence, and only then tested. `bin/evidence-check` fails `bin/ci` when a bar was introduced in the same commit as any of its evidence — its transcripts or its verdict — or later, or when its content has changed since the commit that introduced it. Changing a registered bar after evidence exists is T3: stop and ask.

The lock reads git history, and commit order is the only signal git gives that the builder does not also control. A rewritten history defeats it, and so does writing a bar and its verdict together and committing them one after the other. It is a tripwire for drift, not a guard against a determined forger. What it does catch is the move that actually happens: reaching for the bar after the count came back short.

## The brief is a whitelist

A subject knows its own life and nothing else. The brief carries that life: the role and what it is accountable for, the shape of the week, the workaround in use today and what it costs, who else has to agree, what happens to *them* if they choose wrong, and how they meet change.

Never in a brief, in any wording: the claim under test, the hypothesis, the value proposition, draft copy, the builder's analysis, the subject's own appetite for the thing, or any trait phrased as a conclusion rather than a circumstance. *Closes the books by hand every month* is a circumstance. *Frustrated by manual work* is the finding the panel exists to produce; write it in and it comes back as a discovery. The full rule, and the reasoning behind it, is in `~/.claude/agents/marketer.md`.

**The builder never writes a brief.** `field-researcher` writes it from real material. `arbiter` audits it against the registered claim before any subject runs, and rejects a brief that can only produce one answer. This audit is the load-bearing defense; the subject's own prompt is the second line, not the first.

## The panel

- Five to seven subjects per rung.
- Temperament chosen and recorded before the run. An all-eager panel is a pep rally; an all-skeptic panel can only kill.
- At least two subjects already have an alternative they are content with, and no reason to move.
- **Grounded** means every trait traces to real material a researcher pulled. **Assumed** means nothing real was available and each trait says so. Never blur the two.
- The signal is where subjects diverge (a split) or converge (a real objection). Different briefs objecting in the same words is the cheapest sign a brief was leaking.

## The verdict

`arbiter` rules each rung. It reads the registered bar, the raw transcripts, and the artifact. It never reads the plan, the builder's summary, or the bet's history. It counts against the bar and returns one word:

- **PASS** — the count meets the bar.
- **FAIL** — it does not.
- **VOID** — the instrument broke, not the idea. Mechanical failure only.

The arbiter is forbidden to suggest how to pass. A judge who coaches is a judge with a stake.

## Re-runs

Re-run only for mechanical failure: a subject broke character, invented artifact facts it was never shown, or a brief leaked. Never because the answer was unwelcome. Log every re-run and its reason in `panel.md`. An unlogged re-run is the failure mode this whole file exists to prevent.

## Evidence decay

A verdict binds to the artifact's git SHA, written in `verdict.md`. Change the artifact materially and every rung above the change is void. Re-run them; do not carry the old count forward.

## Spawning

- Never `subagent_type: "fork"`. A fork inherits the builder's context, and the check becomes the builder talking to itself.
- Fresh context for every check. A second opinion from the same conversation is the same opinion.
- The builder's reasoning reaches no subject, no researcher, and no arbiter. They get the artifact, the material, and the bar.
- Subjects are isolated by their tool list. See the comment at the top of `.claude/agents/trial-subject.md` before touching it.

## What this is not

One model plays the builder, the subject and the judge. Pre-registration, fresh context, blind briefs, raw transcripts instead of summaries, mechanical counting and a CI lock are what hold those roles apart. None of it turns a simulated pass into revenue, a player, or a user.

A rung stands in for a real observation. Name the real one when you register the bar, so the substitution stays visible:

| Rung | Stands in for |
|---|---|
| R1 | What the market already did to everyone who tried this. |
| R2 | Twenty conversations with people in the described moment. |
| R3 | A live page or build, and what visitors actually did on it. |
| R4 | A cohort's second week. |
| R5 | A bank statement. |

Real evidence supersedes simulated evidence the moment it exists, without debate. Collecting it means touching the world, which is T3: stop and ask.
