---
name: refactor-ux-06-mock-iterate
description: Turn the drafted journeys and chosen palette into Artifact mockups and iterate until the direction is one worth shipping — step 6 of the refactor-ux chain.
---

# Mock the Journeys, Then Iterate

Source: this repository's `refactor-ux` chain.

## When to use it

Immediately after `refactor-ux-05-color-scheme` in the same session — never standalone.

## The playbook

1. **Build the journeys from step 3, in the palette from step 5, as Artifact mockups** — real
   screens for the key steps of each journey, not one generic hero screen.
2. **Iterate with the user round by round.** Each round: show the mock, get specific reactions,
   revise. Don't wait for a single "make it perfect" pass — several fast rounds beat one slow one.
3. **Keep the mocks honest to what step 9 will actually build.** A mock that depends on
   interactions or content the real build can't produce sets up a mismatch later.
4. **Stop iterating only on explicit approval of the direction** — not on running out of obvious
   changes to suggest.

## Exit gate

- [ ] mockups exist for the key steps of the drafted journeys
- [ ] the user has explicitly approved the mocked direction

Once both hold, invoke `refactor-ux-07-consolidate`.

## Why this matters

Mockups are the cheapest place to be wrong. Getting the user to an explicit "yes, this" here means
step 9's real implementation executes a decided direction instead of re-litigating it in code,
where changes cost far more.
