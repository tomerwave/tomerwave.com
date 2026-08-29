---
name: refactor-ux-02-confirm-goal
description: State the project's purpose back to the user and get it corrected before designing anything against it — step 2 of the refactor-ux chain.
---

# Confirm the Project Goal

Source: this repository's `refactor-ux` chain.

## When to use it

Immediately after `refactor-ux-01-frame-session` in the same session — never standalone. If
you've arrived here without having run step 1 first, go back and start the chain there.

## The playbook

1. **Explore enough to state the project's purpose in your own words** — what it does, who it's
   for, and what "working well" currently means for it. Read code and docs; don't just ask.
2. **State that understanding to the user as a claim, not a question.** "My read is: X, for Y,
   succeeding when Z" — something concrete enough to be wrong about.
3. **Let the user correct it, and keep restating until they don't.** A "sounds about right" is not
   confirmation; ask for the specific correction if anything felt off.
4. **Do not propose journeys, color, or layout yet.** This step produces a shared understanding of
   the goal, nothing else — that understanding is what every later step gets checked against.

## Exit gate

- [ ] the goal statement matches the user's intent, in their own words of confirmation

Once true, invoke `refactor-ux-03-draft-journeys`.

## Why this matters

Every step downstream — journeys, color, consolidation — is a design decision made *against* this
goal. Getting it wrong here doesn't fail loudly; it produces a UI that's internally consistent and
wrong for the product, which is far more expensive to catch later.
