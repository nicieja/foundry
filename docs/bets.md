# Bets

One bet is one approach to the goal. The goal does not change; the bet does. Append-only, newest last.

A bet opens with the assumption that makes it different from every bet before it, and with the conditions that end it. Both are written before its first rung runs. `bet-reviewer` rules a bet Persevere, Pivot, or Kill from the rounds alone. Killing a bet and opening the next is T2 work: proceed, and flag it ` — review` in the roadmap's Done.

Format:

    ## bet-<n> — <the approach in one line>

    - Opened: YYYY-MM-DD — rests on: <the assumption that makes this bet different>
    - Contradicts: <lesson from a killed bet, or "first bet">
    - Kill when: <n> rungs attempted, or the same rung fails <n> times for the same reason
    - Spec: docs/evidence/bet-<n>/spec.md
    - R<n> — PASS | FAIL | VOID — <one line> — docs/evidence/bet-<n>/r<n>/verdict.md
    - Closed: YYYY-MM-DD — persevere | pivot | kill — <the reason> — lessons: docs/research/lessons-bet-<n>.md

Rounds are appended in order as they land. A bet with no `Closed` line is the live one, and there is only ever one.
