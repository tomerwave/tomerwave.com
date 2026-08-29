---
name: clarify-before-building
description: Interview the user one question at a time, with a confidence number and a guess attached, until you can predict their reaction — before any plan, spec, or code exists.
---

# Clarify Before Building

Source: adapted from `interview-me` (addyosmani/agent-skills).

## When to use it

When the ask is missing at least one of: who it's for, why now, what success looks like, or the
binding constraint. When the request is conventional rather than specific ("build me X", "make it
faster") and the convention can't be unpacked without guessing. When you catch yourself about to
silently fill in ambiguous requirements before anything exists to build against.

Not for: requests that are already unambiguous and self-contained, mechanical operations, pure
information questions, or when the user has explicitly asked for speed over verification. Needs a
live, responsive user — don't run this in a non-interactive or autonomous context; flag the
ambiguity as a blocker instead of guessing. If the trigger is a bug or unexpected behavior rather
than a new feature, use `systematic-debugging` first to establish the root cause — clarify only
what to do about a confirmed cause, not what the code currently does.

## The playbook

1. **Hypothesize with a confidence number before asking anything.** One sentence: your best
   current guess. One number: honest confidence, 0–100%. Below ~70%, name what's missing on the
   same line — that tells the user exactly what the next question needs to surface.
2. **Ask one question at a time, with your guess attached, and wait for a reaction.** Batching
   questions gets skim-read answers, and the third question often depends on the answer to the
   first. A guess the user can react to and correct is faster than a blank question they have to
   generate an answer to from scratch.
3. **Watch for "what they think they should want" answers**: buzzwords as goals ("scalable",
   "clean", "modern"), deferring to convention ("the way most apps do it"), or "I should
   probably…". When you hear one, ask: "if you didn't have to justify this to anyone, what would
   you actually want?"
4. **If brownfield, explore the codebase before asking the user something the code already
   answers.** Cite what you found (file, pattern) instead of asking the user to restate it.
5. **When confidence is high, restate the intent** as: Outcome, User, Why now, Success,
   Constraint, Out of scope — one line each. The "out of scope" line is not optional; half of
   misalignment is silent disagreement about what isn't being built.
6. **Gate on an explicit yes.** "Sounds good," "whatever you think," and silence followed by
   "okay let's start" are not yes — they mean the user hasn't converged either. Re-ask concretely.
7. **Stop when you can predict the user's reaction to the next three questions you'd ask.** If
   several rounds pass with confidence not visibly rising, say so plainly and ask whether
   something foundational is missing, rather than continuing to grind on peripheral questions.

## Why this matters

What people ask for and what they actually want are often different things — "a dashboard"
because that's the conventional answer, not because a dashboard solves the problem. The cheapest
moment to close that gap is before any plan, spec, or code exists; once work has started, the
user rationalizes the wrong thing into a "good enough" thing, and the misfit gets built in. A
confidence number with a reason forces honesty about how much is actually known, instead of
letting a plausible-sounding request pass as understood.
