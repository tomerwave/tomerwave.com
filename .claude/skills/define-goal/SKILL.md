---
name: define-goal
description: Turn a fuzzy request into a concrete, measurable objective — the outcome, the evidence that proves it, and the scope boundary — before starting multi-step work.
---

# Define Goal

Source: adapted from `define-goal` (openai/skills).

## When to use it

Before multi-step work starts, when the request is an activity rather than an outcome: "make
progress on X," "keep investigating," "improve things," "work on the auth system." Also when a
request has a real goal buried in it but is missing how success will be verified, what's in or
out of scope, or when to stop and ask instead of grinding.

Not for: requests that are already unambiguous, single-step or mechanical work, or pure
information questions. If the missing piece is *who it's for* or *why now* rather than a success
metric, use `clarify-before-building` instead — that skill interviews the user question by
question; this one is about sharpening an already-understood intent into something verifiable.

## The playbook

1. **Name the concrete outcome.** What will be true when this is done — a specific artifact,
   system state, or user-facing behavior — not a description of activity.
2. **Attach evidence.** State how completion will be verified: the exact test, command, CI job,
   metric threshold, or reviewed example that proves the outcome happened. An objective without a
   validator is a wish.
3. **Quantify where the domain supports it.** Prefer real thresholds over decorative precision:
   latency/error-rate/cost targets, a pass/fail test command, a count of reproduced failures or
   migrated records, an exact file/module scope.
4. **Bound the scope.** State what's in scope and, when ambiguity would matter, what's explicitly
   out of scope — half of misalignment is silent disagreement about what isn't being built.
5. **Set the stop condition.** Decide up front what should make you pause and ask rather than
   keep grinding: an ambiguous fork, a missing metric, or a scope conflict with existing work.
6. **Reject pure activity goals.** "Make it better," "keep looking into it," and "work on X" are
   not goals until they're rewritten into a verifiable outcome — rewrite them yourself when local
   context makes it safe, or ask one concise question when it doesn't.
7. **Check for a goal already in flight** before starting a new one. If existing work already
   covers this intent, continue it instead of restating it; if it conflicts, surface the conflict
   before proceeding.

## Why this matters

"Make progress on the auth system" and "reduce login p95 latency below 250ms, verified by three
consecutive local benchmark runs" produce different work — the first invites busywork that looks
productive but never resolves, the second has a clear finish line. Naming the evidence before
starting also prevents the common failure of doing real work and then discovering, at review
time, that nobody agreed on what would count as done.
