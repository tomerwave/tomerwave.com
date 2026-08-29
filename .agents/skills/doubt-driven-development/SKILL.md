---
name: doubt-driven-development
description: Subject every non-trivial decision to an adversarial review from a fresh, independent context before it stands — in-flight, while course-correction is still cheap.
---

# Doubt-Driven Development

Source: adapted from `doubt-driven-development` (addyosmani/agent-skills).

## When to use it

A decision is non-trivial when at least one is true: it introduces or changes branching logic, it
crosses a module or service boundary, it asserts a property nothing mechanical can verify (thread
safety, idempotence, ordering, an invariant), its correctness depends on context a future reader
won't have, or its blast radius is irreversible (a production deploy, a data migration, a public
API change). Apply this before committing such a decision, before claiming a non-obvious fact
("this is safe," "this scales"), or when working in code you don't fully understand.

Not for: mechanical edits (renaming, formatting), following a clear unambiguous instruction,
reading or summarizing existing code, obviously-correct one-line changes, or when the user has
explicitly asked for speed over verification. This is a complement to `requesting-code-review`,
not a replacement — that skill gates a finished artifact before merge; this one gates individual
decisions while they're still cheap to change.

## The playbook

1. **CLAIM**: name the decision in two or three lines — what stands, and why it matters if it's
   wrong. If it can't be written that compactly, it's a vibe, not a decision yet; surface it
   before scrutinizing it.
2. **EXTRACT**: isolate the smallest reviewable unit — the artifact (a diff, a function, a
   proposal) and its contract (the constraints it has to satisfy) — stripped of your reasoning. If
   it's too large to hold in one read, decompose it first rather than handing over the whole
   thing.
3. **DOUBT**: get the artifact and contract reviewed by a context that didn't produce them — a
   fresh subagent, a different reviewer, a teammate. The prompt must be adversarial: find what's
   wrong, assume the author is overconfident, don't validate. Never pass your own conclusion (the
   CLAIM) to the reviewer — handing over a conclusion biases the review toward agreeing with it.
4. **RECONCILE**: classify each finding, in this order — a contract misread (the contract you
   gave was unclear; fix it and re-run), a valid and actionable issue (fix the artifact), a valid
   trade-off (real but not worth fixing; document it explicitly), or noise (the reviewer lacked
   context you have). Re-read the artifact against each finding — treating the reviewer's output
   as an automatic verdict is the same failure mode as ignoring it.
5. **STOP**: when a cycle returns only trivial or already-considered findings, after three cycles
   (escalate rather than running a fourth alone), or when the user explicitly says to proceed. If
   three cycles keep surfacing substantive issues, that's information the artifact isn't ready —
   not a reason to keep looping.

## Why this matters

Confidence doesn't correlate well with correctness on novel problems — the moments an author feels
most certain are exactly where blind spots hide, and a long working session quietly turns
unexamined assumptions into treated-as-facts. Reviewing a finished artifact at merge time catches
this too late to matter cheaply; materializing an adversarial, independent review of the specific
decision while it's still in flight is what makes catching it inexpensive instead of a rewrite.
