---
title: "How Do You Refactor an Existing Product's UI With an AI Agent?"
pubDatetime: 2026-08-29T09:00:00+03:00
description: "The UI refactor process broken into twelve small, gated steps, so an agent can't collapse it into generic redesign slop or break flows nobody documented."
tags:
  - ai
  - automation
  - product-design
  - decision-making
featured: false
draft: false
---

You've got a product that works. It was built fast, and it looks it. You point Claude at the whole UI and ask for a redesign, and one of two things happens. Either it comes back generic: rounded cards, a gradient hero, copy that says "Elevate your workflow," the exact page three other companies shipped this month. Or it goes further than you meant and quietly breaks a flow nobody had written down.

## What actually causes it, and what fixes it?

One prompt is being asked to make twelve decisions at once: audience, palette, hierarchy, tone, and more. Nobody's checking any of them, so the model guesses toward the safest, most average version of "redesign" it's seen. The fix is to split that one prompt into small steps, each with a written exit condition, so you always know exactly which one to redo when something's off.

Five rules make that concrete:

| Do this | Because |
|---|---|
| Split "redesign" into decisions you check one at a time | One prompt guessing at all of them lands on the generic default |
| Get sign-off on a mock before touching real code | Mockups are cheap to redo; a shipped rewrite isn't |
| Merge duplicate components before building the new direction | A new coat on five duplicate buttons is still five components |
| Show mocks to a real user stand-in before you ship | The model's "looks good" isn't the same as a buyer's "I trust this" |
| Reuse the same reviewer personas every round | Fresh personas each round leaves nothing to compare against |

## What does the process actually look like?

Twelve steps, one line. Each one only runs once the step before it has a written, checkable exit condition, not a vibe.

This isn't a hypothetical process. It's twelve gated skill files, chained together, shipped inside [godharness](https://github.com/tomerwave/godharness), an open-source tool I built and publish that hands an agent the right process and standards automatically, instead of relying on someone remembering to ask for them.

<div style="border:1px solid var(--hairline); border-radius:8px; background:var(--surface-warm); padding:1.5rem 1.5rem 1.75rem; margin:2rem 0;">
  <div style="font-family:'Fraunces',Georgia,serif; font-style:italic; color:var(--sage-deep); font-size:.85rem; letter-spacing:.04em; text-transform:uppercase; margin-bottom:.75rem;">Frame &middot; 1&ndash;3</div>
  <div style="display:flex; align-items:center; gap:.7rem; border:1px solid var(--hairline); border-radius:6px; background:var(--surface); padding:.55rem .85rem; margin-top:.5rem;"><span style="flex:0 0 auto; width:1.7rem; height:1.7rem; border-radius:50%; border:1.5px solid var(--sand); display:flex; align-items:center; justify-content:center; font-size:.78rem; color:var(--text-muted);">1</span><span>Frame the session</span></div>
  <div style="display:flex; align-items:center; gap:.7rem; border:1px solid var(--hairline); border-radius:6px; background:var(--surface); padding:.55rem .85rem; margin-top:.5rem;"><span style="flex:0 0 auto; width:1.7rem; height:1.7rem; border-radius:50%; border:1.5px solid var(--sand); display:flex; align-items:center; justify-content:center; font-size:.78rem; color:var(--text-muted);">2</span><span>Confirm the goal</span></div>
  <div style="display:flex; align-items:center; gap:.7rem; border:1px solid var(--hairline); border-radius:6px; background:var(--surface); padding:.55rem .85rem; margin-top:.5rem;"><span style="flex:0 0 auto; width:1.7rem; height:1.7rem; border-radius:50%; border:1.5px solid var(--sand); display:flex; align-items:center; justify-content:center; font-size:.78rem; color:var(--text-muted);">3</span><span>Draft desired journeys</span></div>

  <div style="font-family:'Fraunces',Georgia,serif; font-style:italic; color:var(--sage-deep); font-size:.85rem; letter-spacing:.04em; text-transform:uppercase; margin:1.5rem 0 .75rem;">Check &middot; 4</div>
  <div style="display:flex; align-items:center; gap:.7rem; border:1.5px solid var(--sage-deep); border-radius:6px; background:color-mix(in srgb, var(--sage) 14%, var(--surface)); padding:.55rem .85rem;"><span style="flex:0 0 auto; width:1.7rem; height:1.7rem; border-radius:50%; background:var(--sage-deep); display:flex; align-items:center; justify-content:center; font-size:.78rem; color:var(--surface);">4</span><span style="color:var(--sage-deep); font-weight:600;">ICP panel on the journeys</span><span style="margin-left:auto; font-size:.65rem; text-transform:uppercase; letter-spacing:.04em; border:1px solid var(--sage-deep); color:var(--sage-deep); border-radius:3px; padding:.1rem .4rem;">gate</span></div>

  <div style="font-family:'Fraunces',Georgia,serif; font-style:italic; color:var(--sage-deep); font-size:.85rem; letter-spacing:.04em; text-transform:uppercase; margin:1.5rem 0 .75rem;">Design &middot; 5&ndash;6</div>
  <div style="display:flex; align-items:center; gap:.7rem; border:1px solid var(--hairline); border-radius:6px; background:var(--surface); padding:.55rem .85rem;"><span style="flex:0 0 auto; width:1.7rem; height:1.7rem; border-radius:50%; border:1.5px solid var(--sand); display:flex; align-items:center; justify-content:center; font-size:.78rem; color:var(--text-muted);">5</span><span>Pick color scheme</span></div>
  <div style="display:flex; align-items:center; gap:.7rem; border:1.5px solid var(--sage-deep); border-radius:6px; background:color-mix(in srgb, var(--sage) 14%, var(--surface)); padding:.55rem .85rem; margin-top:.5rem;"><span style="flex:0 0 auto; width:1.7rem; height:1.7rem; border-radius:50%; background:var(--sage-deep); display:flex; align-items:center; justify-content:center; font-size:.78rem; color:var(--surface);">6</span><span style="color:var(--sage-deep); font-weight:600;">Mock &amp; iterate</span><span style="margin-left:auto; font-size:.65rem; text-transform:uppercase; letter-spacing:.04em; border:1px solid var(--sage-deep); color:var(--sage-deep); border-radius:3px; padding:.1rem .4rem;">gate</span></div>

  <div style="font-family:'Fraunces',Georgia,serif; font-style:italic; color:var(--sage-deep); font-size:.85rem; letter-spacing:.04em; text-transform:uppercase; margin:1.5rem 0 .75rem;">Build &middot; 7&ndash;9</div>
  <div style="display:flex; align-items:center; gap:.7rem; border:1px solid var(--hairline); border-radius:6px; background:var(--surface); padding:.55rem .85rem;"><span style="flex:0 0 auto; width:1.7rem; height:1.7rem; border-radius:50%; border:1.5px solid var(--sand); display:flex; align-items:center; justify-content:center; font-size:.78rem; color:var(--text-muted);">7</span><span>Consolidate components</span></div>
  <div style="display:flex; align-items:center; gap:.7rem; border:1px solid var(--hairline); border-radius:6px; background:var(--surface); padding:.55rem .85rem; margin-top:.5rem;"><span style="flex:0 0 auto; width:1.7rem; height:1.7rem; border-radius:50%; border:1.5px solid var(--sand); display:flex; align-items:center; justify-content:center; font-size:.78rem; color:var(--text-muted);">8</span><span>Framework health check</span></div>
  <div style="display:flex; align-items:center; gap:.7rem; border:1px solid var(--hairline); border-radius:6px; background:var(--surface); padding:.55rem .85rem; margin-top:.5rem;"><span style="flex:0 0 auto; width:1.7rem; height:1.7rem; border-radius:50%; border:1.5px solid var(--sand); display:flex; align-items:center; justify-content:center; font-size:.78rem; color:var(--text-muted);">9</span><span>Build for real</span></div>

  <div style="font-family:'Fraunces',Georgia,serif; font-style:italic; color:var(--sage-deep); font-size:.85rem; letter-spacing:.04em; text-transform:uppercase; margin:1.5rem 0 .75rem;">Ship &middot; 10&ndash;12</div>
  <div style="display:flex; align-items:center; gap:.7rem; border:1.5px solid var(--sage-deep); border-radius:6px; background:color-mix(in srgb, var(--sage) 14%, var(--surface)); padding:.55rem .85rem;"><span style="flex:0 0 auto; width:1.7rem; height:1.7rem; border-radius:50%; background:var(--sage-deep); display:flex; align-items:center; justify-content:center; font-size:.78rem; color:var(--surface);">10</span><span style="color:var(--sage-deep); font-weight:600;">ICP panel on the look</span><span style="margin-left:auto; font-size:.65rem; text-transform:uppercase; letter-spacing:.04em; border:1px solid var(--sage-deep); color:var(--sage-deep); border-radius:3px; padding:.1rem .4rem;">gate</span></div>
  <div style="display:flex; align-items:center; gap:.7rem; border:1px solid var(--hairline); border-radius:6px; background:var(--surface); padding:.55rem .85rem; margin-top:.5rem;"><span style="flex:0 0 auto; width:1.7rem; height:1.7rem; border-radius:50%; border:1.5px solid var(--sand); display:flex; align-items:center; justify-content:center; font-size:.78rem; color:var(--text-muted);">11</span><span>Your final notes</span></div>
  <div style="display:flex; align-items:center; gap:.7rem; border:1px solid var(--hairline); border-radius:6px; background:var(--surface); padding:.55rem .85rem; margin-top:.5rem;"><span style="flex:0 0 auto; width:1.7rem; height:1.7rem; border-radius:50%; border:1.5px solid var(--sand); display:flex; align-items:center; justify-content:center; font-size:.78rem; color:var(--text-muted);">12</span><span>Write design.md + icp.md</span></div>

  <div style="text-align:center; font-size:.75rem; color:var(--text-muted); margin-top:1.4rem; padding-top:1.1rem; border-top:1px dashed var(--hairline);">step &nbsp;&middot;&nbsp; <span style="color:var(--sage-deep);">gate</span> = needs your reaction to advance</div>
</div>

The gates aren't the same model marking its own homework: at every panel step, the agent brings you its raw feedback and waits for your reaction before the next step runs. If you never react, the gate never opens.

No existing product yet? This compresses to three steps: write the direction down, build to it, run the same panel on the result. Same mechanism, much shorter chain.

## When should you skip this?

If you don't know your ICP yet, skip the panel steps. A panel judging against personas you made up in the moment produces false confidence instead of an honest "we don't know." Go figure out who you're building for first.

If the product isn't stable enough to call it a refactor, running the full twelve steps against it is theater. Ship the smaller version, see if anyone cares, then come back.

And skip the whole thing for a one-off landing page or an internal tool three people use. The gates cost calendar time, so spend it where the UI is customer-facing and actually matters.

## What does this actually cost?

| Step group | Real cost | Fades? |
|---|---|---|
| Frame + confirm goal | ~30 min, once | No |
| ICP panel, both passes | Hours of your attention | Personas age yearly |
| Mocks + iterate | A few rounds | No, becomes design.md |
| Consolidate + doctor check | Real eng time, once | No, compounds forward |

Running the sub-agents is cheap compared to an engineer's afternoon. The real cost is your calendar time reacting to what they find, which is exactly the part a better prompt can't buy you out of.

Related: [when agents beat traditional automation and when they don't](/blog/2026/ai-agents-vs-traditional-automation), [which of your processes are actually worth automating](/blog/2026/processes-worth-automating-with-ai), and [rewrite vs. refactor](/blog/2026/rewrite-vs-refactor) if "existing product" is the fork you're actually stuck on.

## Who actually benefits from this?

The person this actually costs is whoever's been rubber-stamping whatever the last prompt returned, because arguing with a generic mockup felt like a worse use of an afternoon than just shipping it. This process moves them from approving pixels to approving journeys, which is a better use of their time either way.

If your team's using AI agents inconsistently on real product work and you want a second read on what's actually worth building, that's what an [AI & Automation Opportunity Audit](/services/ai-automation#opportunity-audit) is.
