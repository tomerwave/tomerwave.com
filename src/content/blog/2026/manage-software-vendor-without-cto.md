---
title: "How to manage a software vendor when you don't have a CTO"
pubDatetime: 2026-08-24T09:00:00+03:00
description: "You have signed the contract. Now what? A plain-language playbook for non-technical leaders managing software vendors without a CTO on staff."
tags:
  - technology-advisor
  - vendors
  - nonprofits
  - non-technical-leaders
featured: false
draft: false
---

You've signed. The proposal's done. There's a kickoff next week, and you're the person who'll be on the call even though you're not technical.

That's a normal place to be for a lot of organisations, especially nonprofits and small operators who bought software (or a build) without a CTO on staff. The hard part isn't usually the signing. It's the six months after, when scope drifts, demos look fine, and you can't tell whether you're being careful or being difficult.

This isn't a guide to choosing the vendor. If you're still deciding build vs buy, start with [build vs buy for non-technical leaders](/posts/2026/build-vs-buy-non-technical-leaders). If you're staring at a proposal and don't know what "good" looks like, use [how to evaluate a software development proposal](/posts/2026/evaluate-software-development-proposal). This piece assumes the ink's dry and you need a way to steer.

You'll use more everyday language here on purpose. You shouldn't need a technical vocabulary to ask for control.

---

## What goes wrong after signing (and what it usually means)

**Everything is "on track" until it isn't.** Symptom. Cause is often that progress was reported in activities (meetings held, tickets moved) instead of outcomes you can click. Ask for proof in the product, not in the slide.

**Small changes keep costing extra.** Symptom. Cause might be a vague scope, or a vendor pricing model that treats every clarification as change. Both are manageable if you spot them early. Neither gets better if you stay polite and quiet.

**You're the bottleneck for every tiny question.** Symptom. Cause is that the vendor has one customer contact (you) and no written decision rules. You'll burn out, and they'll bill for wait time you created by accident.

**The thing works in the demo and fails on Monday morning with real staff.** Symptom. Cause is usually missing real users in UAT, or training that was a single afternoon. This is the most common failure mode I see after a "successful" delivery.

**Your one technical volunteer is holding the whole relationship.** Symptom. Cause is undocumented access, undocumented decisions, and a bus factor of one. If they leave, you don't have a system. You have a mystery.

If any of that feels familiar, you're not bad at this. You're missing a lightweight operating rhythm that technical teams take for granted.

---

## The operating rhythm: a DIY vendor management kit

You can run this in a spreadsheet. Fancy tools are optional.

### 1. One page: what "done" means

Before kickoff deepens, write a one-page definition of done in plain sentences.

- Who will use it on week one (roles, not names only)
- What they must be able to do (ten to twenty bullets max)
- What "good enough to pay the next invoice" looks like
- What is explicitly out of scope until a later phase

Send it to the vendor and ask them to reply with disagreements in writing. Silence isn't agreement. A short reply that lists mismatches is gold.

### 2. A weekly 30-minute steering call with a fixed agenda

Same day each week. Same agenda:

1. Demo of something real (screen share in the actual environment)
2. Decisions needed from you (list must be sent 24 hours ahead)
3. Risks and blockers (vendor speaks first)
4. Invoice milestones vs evidence

If there's no demo because "we're in a foundation phase," ask what foundation artefact you can see this week: environments, access, data migration sample, test plan. Invisible weeks are how overruns hide.

### 3. A decision log you own

A simple table: date, question, options, your decision, who at the vendor confirmed it. When debates restart ("I thought we said X"), you have a page, not a memory contest.

You're allowed to say "I need until Thursday" on technical choices. You're also allowed to bring a volunteer or paid advisor into just those rows. You don't need them on every call.

### 4. Access and handover notes from day one

Ask, in writing:

- Who has admin access, and how you revoke it
- Where credentials live (not in someone's personal email)
- How you'd get a full export of your data
- What happens if the vendor relationship ends mid-project

If answers are fuzzy, pause feature talk until they're clear. This isn't distrust. It's basic custody of your organisation's information.

### 5. UAT with the people who do the job

User acceptance testing shouldn't be you clicking around while the vendor watches. Pull two or three people who will live in the system. Give them real tasks from last month. Write down what breaks.

Budget time for a second UAT after fixes. One pass is how you accept a system that only works in the happy path.

---

## Questions you're allowed to ask (copy/paste)

Use these when you feel out of your depth. They're reasonable. A good vendor won't punish you for them.

- "Can you show me last week's change in the staging environment, not in slides?"
- "Which of this week's tasks were in the original scope document, and which are new?"
- "If we stop after this milestone, what do we own and what still depends on you?"
- "Who on your side is the named lead this month, and who covers them on leave?"
- "What are you waiting on from us, in a list we can clear in one go?"
- "What would you do if you were me, given our budget and deadline?"

That last one is fair. You're hiring judgement, not just hands. Notice whether the answer serves your constraints or their preferred architecture.

---

## How to handle scope, invoices, and the awkward bits

**Scope creep from your side.** Staff will ask for "just one more field" forever. Park requests in a phase-two list. Review fortnightly. Anything urgent must replace something else, not sit on top. You're the person who protects the finish line.

**Scope creep from their side.** If a "discovery finding" expands cost, ask for the finding in writing, the options (including do nothing), and the price of each. Don't accept expansion explained only on a call.

**Invoices ahead of evidence.** Tie payment milestones to visible outcomes from your definition of done. "Sprint completed" is not an outcome. "Staff can issue a receipt with the right charity number" is.

**Feeling rude.** You're not rude for wanting clarity. You're rude if you surprise them with anger after months of silent confusion. Weekly short honesty beats a quarterly explosion.

**When to escalate.** If two weeks pass with no demoable progress and no clear blocker list, escalate once in writing to the vendor sponsor. If nothing changes, get outside technical help before you keep funding hope.

---

## What "good enough" looks like without a CTO

You don't need to understand every technical choice. You need four assurances:

1. **Your data can leave.** Export tested, not promised.
2. **Someone internal can do basic admin.** Password resets, adding a user, running the main report.
3. **There's a written record of decisions.** Your log, not their memory.
4. **Real users have tried real tasks.** UAT notes exist.

If those four are true, you can survive a lot of imperfect architecture. If they're false, even a clever system is fragile.

For the earlier decision of whether you should have built at all, the five-year cost thinking in [build vs buy for non-technical leaders](/posts/2026/build-vs-buy-non-technical-leaders) still applies after signing: maintenance is where organisations get surprised. Ask your vendor for the year-two support picture again, now that you're live-ish, and put it in front of finance while you still have attention.

---

## A 14-day catch-up plan if you're already mid-project

Day 1 to 2: Write the one-page definition of done from what you believe was agreed. Send it. Ask for corrections.

Day 3: Start the decision log with anything you can remember. Mark guesses as guesses.

Day 4: Demand a demo in the real environment this week.

Day 5 to 10: Run one UAT session with real staff on real tasks. List gaps.

Day 11: Meet the vendor with gaps + scope table. Separate "must for go-live," "phase two," and "not doing."

Day 12 to 14: Re-base milestones and invoice triggers on the must list. Confirm access and export in writing.

You won't fix a whole programme in a fortnight. You will stop drifting.

---

## When to bring in a technology advisor

Bring someone in if:

- You're about to sign a big change order and can't tell if it's necessary
- The vendor and your staff tell incompatible stories about what's finished
- You're mid-build and considering a restart
- Your technical volunteer is leaving
- Board or funders want assurance that the money produced a maintainable system

Don't bring someone in only to translate jargon on every call. That's expensive and teaches the vendor to talk to them instead of you. Use an advisor for sharp moments: assessment, milestone disputes, handover design, and the occasional steering meeting where a technical read changes the decision.

If you want that kind of plain-language assessment of where you stand with a vendor or a system, that's what a [technology assessment](/services/technology-advisor#technology-assessment) is for. A lot of the weekly rhythm above you can run yourselves. Use outside help when the next invoice is large, the relationship is tense, or you need a second pair of eyes before you double down.

You've got more leverage than it feels like on those vendor calls. Use a short written rhythm, ask for proof in the product, and keep humans who do the work in the loop. That's most of vendor management, CTO or not.

Tomer Gal @tomerwave
