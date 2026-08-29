---
name: refactor-ux-04-icp-panel-journeys
description: Run sub-agents role-playing your ICPs against the current product and the drafted journeys, and react to their feedback — step 4 of the refactor-ux chain.
---

# ICP Panel — First Pass, on the Journeys

Source: this repository's `refactor-ux` chain.

## When to use it

Immediately after `refactor-ux-03-draft-journeys` in the same session — never standalone.

## The playbook

1. **Load personas from `icp.md` at the repository root.** If it doesn't exist yet, draft it with
   the user now, using the persona block format below, then save it before continuing — this file
   is what every ICP panel in this chain (this step, step 10, and `design-new-03-icp-panel-look`
   in the other chain) reads from, so personas stay identical across passes instead of being
   reinvented each time.

   ```md
   ### Persona: <name>
   - role: <who they are, and their relationship to the product — buyer, daily user, etc.>
   - goal: <what success looks like for them, specifically>
   - triggers churn: <the thing that makes them give up or leave>
   - judges "good" by: <the metric or feeling they actually use>
   - reviews: journeys, look
   - feedback format: keep / cut / confused-by / "would I renew" — one line each
   ```

2. **Spawn one sub-agent per persona**, feeding it the persona block verbatim and the drafted
   journeys from step 3 (and the current product, for contrast). Instruct it to react as that
   persona would, using the feedback format from `icp.md`, and not to soften criticism to be
   helpful.
3. **Do not paraphrase the feedback away.** Bring it to the user in full, then get their reaction
   to it — agreement, pushback, or a revision to the journeys.

## Exit gate

- [ ] `icp.md` exists with at least one persona
- [ ] every persona gave concrete, un-softened feedback on the journeys
- [ ] the user has reacted to that feedback

Once all hold, invoke `refactor-ux-05-color-scheme`.

## Why this matters

A journey that reads well to the person who wrote it can still fail the person who'll actually use
it. A panel that reuses the same personas across every pass in this chain is what makes "the ICP
approved it" mean something consistent, rather than a fresh, unaccountable judgment call each time.
