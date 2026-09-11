# Risk

`risk-tiers.md` says who decides. `scope.md` says what is built now. This file says when a risk has to be answered at all.

A risk is a fact about the world that can stop the project. Every one of them has a scale at which it starts to matter, and most do not matter yet. A payment provider does not review a site taking $1,000 a month. A regulator does not know it exists. A platform's revenue share that drops at $1m cumulative is a fact about the finish line, not about the first release.

Answering a risk before it can bite costs what answering it late costs, and buys nothing.

## Every risk carries a threshold

    <the risk> — bites at: <the observable condition that makes it real>

The threshold is a number or an event the loop can check: the first real payment, the first stored password, a thousand monthly players, a rung that passes. *When we are bigger* is not a threshold, and a risk without one is not deferred — it is unexamined.

Two consequences carry the whole file:

- **A threshold the release already meets is not deferred.** A release that takes money is inside every payment risk today. A release that stores a password is inside the auth risks today. The rule gives nothing away, because a risk you can reach is a risk you are in.
- **A threshold the release cannot reach is not evidence.** It is not a bar count, not a FAIL, not a blocker. It is a line in `docs/risks.md`.

## Risks and bars

A bar tests the claim its rung makes, and it never counts a risk whose threshold this release cannot reach.

Such a count cannot be met by any amount of good work. The rung fails for something the artifact could not have fixed, and it fails the same way every round. *Does a payment provider permit this in writing* is not diligence on a release that takes no money. It is a question asked years early, wearing a count.

The absence of a disclosure is not a finding about the world either way. Nobody publishing a permission is not evidence that the answer is no.

## Input or risk

R1 asks whether the world already refutes the Arithmetic, and some risks look like they belong in that sum. One question separates them.

**Does the Arithmetic multiply it?** A number the sum is built from is an **input**, and R1 faces it however uncomfortable it is — the cost of reaching one person is an input when the goal is divided by it. A fact that only gates a later release is a **risk**, and it goes to the register with the scale it bites at. Whether a processor permits the model gates the day money moves; it multiplies nothing.

An input whose value is bad is a finding, not a failed count. Write the count so it fails when no figure was sourced, never when the figure came back against you: no artifact could have made the world cheaper.

## The register

`docs/risks.md`, append-only. A risk is registered by whoever names it, the moment it is named.

    - <the risk> — bites at: <observable threshold> — clears by: <what would settle it> — status: open | cleared | hit

Orient reads it. A risk whose threshold the current work now meets stops being a line in a ledger and becomes the work.

## Tiers are unchanged

Deferring changes when a risk is answered, never who answers it. A risk that is T3 when it bites is T3 when it bites: money movement stops the loop on the day money moves — not before, and not never.

Deferring one is T2. Record it, and flag the Done entry ` — review`.
