---
title: "Before you can afford a VP R&D: who pushes back?"
pubDatetime: 2026-08-24T09:00:00+03:00
description: "Early companies often lack anyone senior enough to push back on irreversible tech decisions. How to build real challenge before hiring a VP."
tags:
  - fractional-vp-rnd
  - engineering-leadership
  - early-stage
  - decision-making
featured: false
draft: false
---

You are not ready to hire a VP R&D, and you already feel the gap that hire is supposed to fill.

Someone proposes a rewrite. Someone else wants to adopt a platform the team has never run. A vendor demo goes well and suddenly there is momentum behind a tool that will own a critical path for three years. The founder says yes because the room sounded confident. The strongest engineer says yes because disagreeing in that room is expensive. Nobody in the building has both the seniority and the permission to say "not yet" and make it stick.

That is a different problem from "we need a VP." A VP is one way to buy pushback. It is not the only way, and at your size it is often the wrong first purchase. What you need in the next ninety days is challenge on a small number of decisions that are hard to undo, from somebody who will not lose the argument by being outranked in the room.

This piece is about building that challenge before the hire. It is not about when to hire a VP, and it is not about what a fractional leader does in month one. Those are separate essays. This one assumes you already know you are early, under-led on the tech side, and still have to ship.

---

## What "nobody can push back" actually looks like

It rarely looks like chaos. It looks like smooth agreement.

Roadmap items land without a technical counter-proposal. Architecture choices are made in a meeting that was supposed to be a demo. Hiring bars slide because the only interviewer who could hold them is also the person desperate to fill the seat. Postmortems end in action items that nobody with authority will defend when the next launch pressure arrives.

The tell is not that bad decisions happen. Every early company makes bad decisions. The tell is that bad decisions do not get a serious opposing memo. There is no artefact that says "here is the cost, here is the lock-in, here is what we give up," written by someone who will still be in the building when the bill arrives.

If your CTO is also the bottleneck for every merge and every customer call, you may have the opposite problem on paper and the same problem in practice: challenge exists in one person's head and never becomes a decision the company can see. The patterns in [your CTO is becoming a bottleneck](/posts/2026/cto-becoming-a-bottleneck) are useful here even when you do not have a CTO title on the org chart. One brain doing all the judgement is not the same thing as a system that can disagree with itself.

---

## Four cheap sources of pushback that are not a VP

You can assemble challenge from pieces you already have, if you treat it as a designed habit rather than a personality trait.

### 1. A decision log with a forced counter-case

For any decision that is hard to undo (new data store, multi-year vendor, rewrite of a core surface, changing how you deploy), require a one-page note before the meeting where it will be approved.

The note has four headings only:

- What we are deciding
- What this makes expensive or impossible later
- The alternative we are rejecting, and why
- Who will own the consequences in twelve months

The author cannot be the person proposing the change. That is the whole trick. Proposals write themselves into inevitability. A second engineer writing the counter-case, even a weak one, surfaces the disagreements people were performing agreement over.

If nobody will write the counter-case, you have learned something more important than the decision: you have no culture of challenge yet, and buying a VP into that culture will not create it.

### 2. A standing "red team" hour that is not optional

Ninety minutes every two weeks. One in-flight technical decision. One person assigned to argue against the current plan. Rotate the arguer. The founder or acting CTO is not allowed to win by talking last.

This feels theatrical the first three times. By the sixth, people stop bringing half-baked rewrites into the main meeting because they know the red team hour exists. The goal is not to reject everything. The goal is to make rejection speakable.

Keep a public list of decisions that survived red team and decisions that changed. The list is what trains the company. Without it, the hour becomes venting.

### 3. An external sparring partner on a narrow brief

Not a fractional VP. Not a retainer. A paid day or two from someone senior who has no stake in your roadmap politics, scoped to one decision: "Should we rewrite X," "Should we sign this vendor," "Is this architecture ready to hire against."

Brief them with artefacts, not vibes. Repo access or architecture diagrams, the last three incidents, the proposal under debate. Ask for a written recommendation with the conditions that would change their mind. Then do the uncomfortable part: read it in a room that includes the people who will be offended.

The point of the outsider is not brilliance. It is that they can say the sentence your strongest IC will not say to your face, and leave.

### 4. Promote challenge in the interview loop before you promote titles

If you are hiring seniors, hire at least one person whose reference story is "they stopped us doing something expensive." Ask for it explicitly in references. Then give that person air cover in their first month to disagree in writing.

A single senior who is allowed to push back is worth more than a process document nobody reads. A single senior who is hired for velocity and punished for dissent makes the pushback problem worse, because now the company has proof that challenge is career-limiting.

---

## How to tell which decisions deserve pushback

You cannot red-team everything. Early companies that try become slow in a different way. Filter with a blunt test.

Hard to undo in six months? Push back. Easy to reverse next sprint? Ship and learn.

Touches money, identity, customer data, or how you deploy? Push back. Touches copy, layout, or a feature flag default? Usually not.

Creates a dependency on a vendor or a person who might leave? Push back. Uses a library you can delete in a day? Usually not.

If you want a wider frame for why some slowdowns are structural and some are just load, use the diagnostic in [why engineering teams get slower as they grow](/posts/2026/why-engineering-teams-get-slower). The management bottleneck and ownership rows are the ones that most often hide under "we need more seniority."

---

## A two-week DIY challenge kit

Week one:

1. List the last five technical decisions that are still in force. For each, write who opposed them in writing at the time. If the answer is nobody for most of them, you have confirmed the gap.
2. Pick the next hard-to-undo decision already on the calendar. Assign a counter-case author who is not the proposer. Put the one-pager due before the approval meeting.
3. Schedule the first red team hour. Put one decision on it. Invite the smallest room that includes the proposer, the counter-author, and whoever can actually say no.

Week two:

4. Run the red team hour. Capture what changed. Publish the note.
5. Book one external sparring day for the decision you are most uneasy about, or skip it if the internal counter-case was already strong enough to change the plan.
6. Add one interview question to your senior loop: "Tell me about a time you killed a project or a tool." Listen for whether they are proud of the kill or apologetic.

None of this requires a new title. It requires the founder to treat disagreement as a deliverable.

---

## What not to do while you wait for senior leadership

**Do not outsource your taste to the loudest engineer.** Confidence and correctness correlate loosely at this stage. Demand artefacts.

**Do not add approval gates on every pull request.** That recreates a bottleneck without adding challenge on the decisions that matter. Pushback belongs on irreversible choices, not on every line of code.

**Do not hire a "strong IC" and silently expect them to be your VP.** If you need organisational pushback, say so in the offer and the first-month goals. Hidden job descriptions produce resignation-shaped surprises.

**Do not use "we will hire a VP later" as permission to sign multi-year lock-in now.** The future VP inherits the contracts and the architecture. Make the temporary absence of seniority a reason for smaller commitments, not larger ones.

**Do not skip the written counter-case because the decision feels urgent.** Urgent irreversible decisions are exactly when the page is cheapest relative to the downside.

---

## How this relates to hiring later, without making hiring the point

Eventually many companies in this spot do hire a VP R&D or bring in fractional leadership. The companies that get value from that hire are the ones that already practised challenge. The hire then raises the quality of disagreement rather than introducing disagreement from zero.

The companies that hire a VP into a room that only knows how to agree get a highly paid person who either becomes a bottleneck themselves or spends six months discovering that nobody wanted challenge after all.

So the sequence is: install pushback habits, shrink the blast radius of decisions you cannot staff senior judgement for, then hire. If you want the hiring-timing question on its own terms, read [when to hire a VP R&D](/posts/2026/when-to-hire-vp-rnd). If you want what a fractional engagement looks like once you are ready for outside help to run the system rather than spar on one decision, that is a different article again. Neither replaces the work above.

---

## The honest limit of DIY pushback

Internal red teams fail when the founder wins every argument by force of personality. External sparring fails when the recommendation is received as theatre and filed. A decision log fails when nobody reads it at approval time.

If you have tried the counter-case rule twice and the room still rubber-stamps, you do not have a template problem. You have a power problem. Templates cannot fix that. You need either a founder who will lose on purpose sometimes, or an outside leader with enough mandate that losing to them is allowed.

That mandate is the scarce thing, and it is reasonable to buy it in fractional form before you buy it as a full-time executive. The cheapest version is still the DIY kit above. Use it until it stops working, and be honest about the moment it stops.

If you want a structured read on whether your gap is missing challenge, missing ownership, or missing a hire, that is what an [R&D health check](/services/fractional-vp-rnd#health-check) is for. It is designed for teams that are not ready for a VP search and are tired of discovering irreversible decisions in retrospect. The output is a plain account of what to change in the next quarter, including the option that you do not need more leadership yet.

Tomer Gal @tomerwave
