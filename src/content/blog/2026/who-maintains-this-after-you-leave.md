---
title: "Who Maintains This After You've Moved On?"
pubDatetime: 2026-09-08T09:00:00+03:00
description: "The real risk isn't the vendor shutting down. It's a product that stays technically supported while nobody maintains it, and what to check before you sign."
tags:
  - technology-advisory
  - nonprofit
  - vendors
  - decision-making
featured: false
draft: false
---

Somebody asked me this on LinkedIn recently, and it's worth answering properly because the question is upside down.

How does an organisation commit years of support to a product that might stop being maintained? Not the company disappearing, that's rare and you'd see it coming. The quieter version: it stays "supported" in name, a ticket queue exists, and the actual product stops moving. No updates, patches slow down, the integrations around it drift, and a year or two in you're running something that technically still works and no longer fits anything else in your stack.

That's a real worry and it's aimed at a real but secondary target. Whether the vendor keeps investing in the product matters, and you can check for it, but it's not the thing most likely to hurt you. The question that actually decides how this goes is whether the thing depends on one person, on either side of the relationship, and whether anyone is checking in on it at all.

## The direct answer

A vendor quietly deprioritising a product is real, and it leaves marks you can check for, which the next section covers. A system that only one person understands fails quietly, at the worst possible time, and nobody sees it coming because everything was fine right up until it wasn't.

**My opinion:** stop asking "will this still be maintained in three years." Start asking "can more than one person touch this today, on either side of the relationship." The second question is the one you can actually check before you sign anything, and it's the one that predicts the bad outcome.

There's a structural fix underneath the checklist, and it's worth naming. Multi-year commitments are safer as a standing arrangement than as a one-off project with a delivery date and then silence, but a retainer only helps if it also answers test one: is delivery still possible if this specific person is unavailable, not just whether someone keeps checking in. A retainer that runs through one person with no documentation and no one else on the account gives you scheduled attention and nothing else. A retainer worth having comes with the code, the reasoning, and other people who could pick it up, so an illness or a departure is an inconvenience rather than a production incident.

### The three tests

Run any system, vendor relationship, or internal build through these before you commit to it.

| Test | Why it matters |
| --- | --- |
| **Can more than one person touch it?** | If the answer is no, you don't have a system, you have a person with a system-shaped job. When they leave, the system leaves with them. |
| **Is the reasoning written down, not just the result?** | Knowing what the configuration does isn't the same as knowing why it's set that way. The why is what lets someone safely change it later. |
| **Is somebody accountable for revisiting it?** | A decision made once and never rechecked isn't a decision, it's a fossil. Something has to trigger the next look, on a date, not "when it breaks." |

Fail the first test and you have a bus factor problem. Fail the second and you have a system nobody can safely change even with two people on it, because neither of them knows what would break. Fail the third and even a well-documented system rots, because nobody's job is to notice when it stops fitting.

**Precedence:** the first test is the one that bites hardest and fastest, so if you can only fix one thing before signing, fix that one. The second and third compound slowly, and you can genuinely retrofit them later if you catch it in time.

## The distinction that trips people up

People conflate vendor risk with dependency risk, and they're not the same thing.

Vendor risk is about whether the product keeps moving. Not the company shutting down, that's the dramatic and rare version. The common one is a product that stays technically supported while nobody invests in it, so it slowly stops matching everything around it. Real, but slow, and it usually gives you warning. Release notes go quiet, tickets take longer, other customers start asking the same question you're asking. You see it coming if you check.

Dependency risk is about the work. Who actually knows how this thing is configured, why it was built this way, what breaks if a setting changes. This one gives you no warning at all, because the person who holds it is still there, still competent, still doing a good job, right up until the day they hand in their notice or go on leave for six weeks. Then you find out what you were actually running on.

It's a sharper problem when that person is your vendor rather than your employee. An internal single point of failure is still inside your reach: you can cross-train someone, hire around them, put a second person on the account. A vendor that's genuinely one person has no second person to put on it, and you can't manage someone else's company the way you manage your own team. The fix isn't managerial in that case, it's contractual: ask for it in writing before you sign, not after.

The mistake is treating a vendor question as a stand-in for a dependency question. "Is this vendor solid" feels like due diligence and it answers almost nothing about whether your organisation can survive the person who set this up leaving. Ask both, separately, because they fail on completely different timelines.

The vendor question still deserves a real answer, not just a reframe. If they fold, or if the product just stops moving and you decide to leave, what happens to your data isn't a people problem, it's a contract term. Before you sign, get three things in writing: how you export everything you put in, in what format, and whether that export includes configuration and history or just raw records. If the contract is silent on export, that silence is the answer, and it's the same silence whether the vendor is thriving or already coasting.

## The free method

You can check all of this yourself before you sign anything, in an afternoon.

1. **Name the one person.** For any system currently running, ask: if this person left tomorrow, who picks it up? If the honest answer is "we'd figure it out," write that down. Don't soften it into a maybe.
2. **Ask them to explain a decision, not describe a setting.** Not "what does this field do" but "why is it set to this and not the default." If they can't answer without checking, the reasoning was never captured, even if the person is still here.
3. **Find where that reasoning lives.** A comment in the code, a document, an email thread, a Slack message. If it lives only in their head, that's the finding, and it's worth writing down before you do anything else on this list.
4. **Ask who owns the vendor relationship day to day.** Same test as above, aimed outward. If it's one name, that name is now a dependency too.
5. **Put a date on the next review**, not a trigger. "We'll look again if it breaks" means never. "We review this every October" means somebody actually does.
6. **On the last day, write the one page.** What it does, why it's built this way, who to call, what breaks first. Not a manual. One page. It's the difference between a system and a hostage situation.

None of this needs a consultant. It needs somebody to actually do it, and most organisations don't because it feels like admin rather than progress. It's the least visible work in any technology decision and the one that decides how the third year of it goes.

## Where I'd tell you not to bother

**If the system is genuinely disposable.** Not everything needs a bus factor of two. A spreadsheet that gets rebuilt every January doesn't need a documented handover, it needs someone competent to rebuild it. Match the effort to what the thing actually is.

**If you're about to replace it anyway.** Documenting a system you're migrating away from in six months is effort spent on the wrong asset. Document the new one instead.

**If the person in question isn't actually going anywhere.** Some of this is precautionary theatre applied to a stable, long-tenured employee who has no plans to leave. Fine to do lightly, not worth a project plan.

## What it costs, and what fades

| What you're checking | What fixing a gap costs | Fades on its own? |
| --- | --- | --- |
| One person holds it | A day or two of that person's real work, pulled off something else | No, gets worse as the system grows |
| Reasoning isn't written down | An afternoon per system, done properly | No |
| Nobody owns the next review | A calendar date and a named owner | No |

None of that is free, especially if your team is already stretched. It's real hours coming off a program you could be running instead. The honest comparison isn't "documentation versus nothing," it's "a day now versus the week it takes to reconstruct the same thing later, badly, under pressure, after the person who knew it has already left." Small teams don't get to skip this. They get to do it in smaller pieces, one system at a time.

A single point of failure doesn't resolve itself, it just sits there getting more expensive to unwind the longer the system runs on it. The person who inherits the mess is rarely the person who created it, and it's not a fair position to put someone in. It's avoidable for the cost of one page written at the start.

I wrote separately about [what a technology decision actually costs](/posts/2026/what-does-this-actually-cost) and about [what to do when a project you've already signed is going badly](/posts/2026/vendor-fault-or-ours). This one is about the check that happens before either of those becomes the problem.

If you want somebody to go through what you're running today and tell you honestly where the dependency risk actually sits, that's part of what a [technology assessment](/services/technology-advisor#technology-assessment) is. It's also the ongoing version of it: helping you decide what's actually worth building or buying next, pushing back on a vendor when the answer isn't good enough, and staying around to notice when something needs revisiting rather than handing over a report and leaving.

And yes, hiring an outside advisor is its own version of the question this article is about, so I'll say plainly how I try not to become the next single point of failure: the documentation and the reasoning go to you, not to me, and I work alongside other advisors and your own staff rather than positioning myself as the only person who can explain any of it. Judge that the same way you'd judge anyone else's answer to test one.
