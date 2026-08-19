---
title: "When Technical Debt Is Actually a Problem"
pubDatetime: 2026-07-30T09:00:00+03:00
description: "Most technical debt costs you nothing. How to tell which of it is actually expensive, what it is costing you in, and how to rank it against shipping."
tags:
  - technical-debt
  - architecture
  - engineering-management
  - decision-making
featured: false
draft: false
---

Your CTO says you have a lot of technical debt. Your CEO hears that as a bill arriving. Somebody suggests a quarter of cleanup, somebody else points at the roadmap, and the conversation ends the way it always ends, which is with nobody deciding anything and everyone slightly more frustrated.

The reason this conversation goes nowhere is that both sides are arguing about the size of the debt, and the size of the debt is not the interesting number.

Here is the part that changes the conversation. **Debt mostly costs you where you work.** A badly written module nobody has opened in fourteen months is usually not costing you anything this quarter. It might be embarrassing, it might be genuinely bad, and it is still not a line item until somebody has to go in there.

Two exceptions, and they matter because they are invisible to everything else in this article. Something with no commits still charges you if a great deal depends on it, because it constrains every change made around it while never showing up in a history. And something with no commits charges you immediately if it holds customer data on unpatched dependencies, because that is a liability rather than a delivery cost and it does not care how often you visit. Check both before you cross anything off.

Which means the useful question is never how much debt do we have. It is: which of our debt is in the path of what we are trying to do next, and what is it charging us.

---

## The four things debt actually charges you

Debt is not one cost. It shows up in four different currencies, and they are not interchangeable, which is why an engineer and a CEO can look at the same thing and honestly disagree about whether it matters.

**Delivery speed.** Work in this area takes noticeably longer than comparable work elsewhere. "Three times longer than it should" is what your engineers will say, and it is not a number you can use, because there is no baseline for what it should be. The usable version compares one part of your own system to another: the same kind of change, in the messy area and in a clean one. That comparison you can actually make, and it is the one the carrying-cost method below depends on.

**Reliability.** It works until it doesn't, and when it doesn't, nobody can predict where. Incidents cluster. The same area shows up in the postmortem twice a quarter. This one is worse than delivery cost because it spends your credibility with customers rather than your calendar.

**People.** New engineers take four months to be useful instead of six weeks, because the thing they need to understand cannot be understood one piece at a time. Or one person is the only one who can safely touch a system, and everyone has quietly agreed not to think about what happens when they leave. This cost is invisible for a long time and then arrives all at once.

**Optionality.** There is something you want to build and you cannot, or the estimate is so large that it never survives prioritisation. This is the most expensive kind and the least visible, because it does not show up as a slow ticket. It shows up as a conversation that stopped happening.

When your CTO says debt and your CEO says roadmap, they are usually talking about different currencies. Getting the person to say which of the four they mean is most of the work. "This is costing us reliability" is a conversation a board can act on. "We have a lot of technical debt" is not.

---

## The debt that is fine, and there is a lot of it

I want to be blunt about this because the industry is not: most technical debt should be left exactly where it is.

**Debt in code nobody touches.** Covered above and worth repeating, because it is the biggest category by volume and the one people spend the most time feeling bad about.

**Debt you took deliberately and it worked.** You built the quick version to find out whether anyone wanted the thing. They did, or they didn't, and either way the shortcut did its job. A startup with no debt of this kind is a startup that has been building carefully for a market it never checked. That is a much more expensive mistake and nobody ever calls it debt.

**Debt in something you are going to delete.** Do not pay down a mortgage on a house you are demolishing. This sounds obvious and I have watched teams spend six weeks tidying a service that was scheduled for removal, because tidying it was on the list and removing it was a decision nobody had made out loud.

**Ugly code that works and is well tested.** Aesthetics are real, and they matter for retention, but they are not a delivery problem. If a module is unpleasant to read and it changes twice a year and it has never broken, leave it.

The debt that is not fine is the debt sitting in the path of the next six months of work, in an area you touch weekly, in a system where being wrong is expensive. That is a much shorter list than the one your team will give you if you ask them what needs fixing.

---

## Two hours to find out which is which

You do not need a consultant for this part, and the version you can run yourself is genuinely most of the value.

1. **Ask your team for the list.** Everything they consider debt. No filtering, no ranking, no justifying. You will get somewhere between fifteen and forty items and some of them will be one person's long-standing grievance, which is fine and also information.
2. **Pull where the work has actually landed.** Last six months of commits, grouped by area, or last six months of tickets grouped by component if your repository history is not clean enough to be useful. You want a rough picture of where people spend their time.
3. **Cross off everything on the list that is not in a place people work**, after checking it against the two exceptions above. Expect this to remove something between a third and half of the list. That is a rule of thumb rather than a measurement, so treat it as a sign you are doing it right rather than a target. The crossing off is worth doing in front of the team, because it changes what the list means.
4. **For each survivor, ask which currencies it charges.** Delivery, reliability, people, optionality. Name every one that applies rather than forcing a single label, because the items charging in three currencies at once are your expensive ones and a single label is exactly what hides them. If somebody cannot name any currency at all, it goes to the bottom. An unnameable cost cannot be ranked against a named one.
5. **Now check the other direction: take next year's roadmap and ask which items on it run through debt.** This is the step everyone skips, and it is the one that surfaces the optionality costs, which never make it onto a list written by people looking at code rather than at plans.
6. **For the handful that obviously matter, get a rough delivery multiple.** By this point in the session everybody knows which four items they are actually arguing about, so you do not need the ranking first. Ask the people who work in both parts of the system: the same kind of change takes about a day in the clean part, and about how long here? The same kind matters, because comparing a schema migration in the messy area against a copy tweak in the clean one produces a number that means nothing, and a motivated room will do exactly that without noticing. Take a spread rather than a point, and two or three people agreeing on "two to three times" is enough.

   Two things about that number before you use it. It is self-reported by the people asking for the money, so say so yourself before anybody else does, and defend the low end of the spread rather than the middle: if they said two to three, present two. And triangulate it against something nobody reported, which you already have. Step 2 pulled tickets grouped by component, so median cycle time for the messy component against a clean one is sitting in that same data. If the team says three and the tickets say one point eight, present one point eight and you cannot be argued with.
7. **Rank what is left on three axes: how many currencies it charges, how soon your work touches it, and how bad it is when it fails.** That third axis is the one people leave out, and leaving it out produces the wrong order. Reliability debt in a busy area that fails softly loses to reliability debt in a quiet area where failure takes out authentication or payments. Frequency of work is not the same as cost of being wrong, and only one of them is visible in a commit history.

Three axes do not produce a ranked list on their own, they produce a cluster near the top, and this is where your judgement enters rather than the method. Say that out loud when you present it. Then break the cluster on what is cheapest to finish, because two things fixed completely beats four things started.

About a third of what a team calls debt will be taste, and that is the one case the process above handles badly, so handle it separately. Crossing off a hot-area item is easy, because the reason is external: this is not where we work. Crossing off a taste item means saying you do not believe it costs anything, which the person hears as a judgement on their judgement.

What works is to not argue about whether it is bad. Concede that immediately and completely, because it usually is. Then ask them for the cost in one of the four currencies, and treat a good answer as decisive. Something like: I am not disputing that this is bad code, I am asking what it charges us, and if you can show me it costs us delivery in an area we are about to work in, it goes to the top and I will fund it. Half the time they come back with something real and you were wrong. The other half they cannot, and they crossed it off themselves, which is a different experience from you crossing it off.

Do this with the team in the room rather than for them. A list of debt that leadership has silently deprioritised feels like being ignored. The same list, crossed off together with a reason, feels like a decision. Same outcome, completely different effect on the people who have to keep working in there.

One warning about step two. If your version control history is full of giant merges or the whole team commits through one account, the commit picture will lie to you and you should use tickets instead. And if you find you cannot answer where work has landed at all, that is worth more attention than any single item on the debt list.

---

## What each kind costs to fix

Rough numbers, and the shape matters more than the numbers.

Engineer-weeks rather than calendar weeks, because a row saying four weeks means something completely different at four engineers and at sixteen. Some rows are calendar rather than effort and are marked where they are, because they are bound by duration. You cannot compress a quarter of deliberate pairing by adding people to it, and the same is true of anything gated on a migration running safely.

| Kind of debt | Typical cost to fix | What you get back |
| --- | --- | --- |
| Slow tests on code that is already testable | Two to six engineer-weeks | Everything else gets cheaper |
| Tests on code that is not testable yet | A quarter of calendar, because the coupling comes first | The same thing, at four times the price |
| One hot module everybody dreads | Four to twelve engineer-weeks | Delivery speed where you feel it |
| No observability, incidents are guesswork | Four to eight engineer-weeks | Reliability, and much better arguments |
| Only one person understands a system | A quarter of calendar, because pairing cannot be compressed | People risk, and it is the only fix |
| Everything depends on everything | Two to eight engineer-quarters | Parallel work, real hiring capacity |
| The data model no longer matches the business | Six months of calendar and up | Optionality, and nothing else feels different |

Two of those deserve a comment.

The two test rows are separate on purpose, because collapsing them is how that estimate becomes a lie. Adding coverage to code that can already be instantiated in isolation is genuinely a few weeks. Adding it to the untested legacy path, which is the only case where anybody cares, means breaking the coupling first, and that is a quarter. Work out which one you are quoting before you quote it.

Tests first where the thing you need to change is the thing nobody dares touch, because there the reason nobody dares is that they cannot tell whether they broke it. That is the condition, and it holds often enough to be the usual answer, but state the condition rather than the rule.

And the last row is the one that gets misdiagnosed as a rewrite. If the words in your code no longer match the words your customers use, that is real and it is expensive, and it is still usually fixable in pieces. I wrote about how to tell that apart in [rewrite versus refactor](/posts/2026/rewrite-vs-refactor).

---

## How to say it to people who do not write code

If you are the CTO, the reason your debt argument keeps losing is probably not that your CEO does not care. It is that you are asking for a quarter and offering a category.

What works is a sentence with a currency, a place, and a consequence:

*The billing service breaks about once a month, it takes a day to recover, and it is the reason we have not launched annual plans. Fixing it is about three weeks and I would do it in April.*

That is a decision somebody can make.

If you have been asked for a number rather than a sentence, and you probably have, the number they want is the carrying cost, not the cost to fix. Those are different questions and the second one is the one every article answers. Carrying cost is what this debt charges you per year if you do nothing, and you build it currency by currency:

- **Delivery.** Engineer-days a month spent in that area, times (the multiple minus one) divided by the multiple, times twelve, times a loaded daily rate. Do not skip the divide. The days you observed are already inflated by the multiple, so multiplying them by the multiple minus one counts the inflation twice: at a multiple of three it would claim you lost forty days in an area where you only spent twenty. At a multiple of two and a half the factor is 0.6, so twenty days a month becomes twelve days of genuine excess. You are pricing the excess over doing the same work in a clean part of your own system, not the work itself.
- **Reliability.** Incidents a year, times hours to recover, times people involved. Add anything that surfaced in a renewal conversation or a security review, because that is where reliability stops being an engineering number.
- **People.** Extra onboarding weeks into that area, times hires a year, counting only capacity you have not already counted under delivery. Do not fold key-person risk into this total. If exactly one person can safely deploy it, present that separately as exposure, with a probability attached, because a risk-weighted number added to a realised one is the first thing a CFO will pull out, and once they pull one line the whole figure gets discounted.
- **Optionality.** The revenue on the roadmap item it is blocking. If nobody will commit to that figure, say so and give the board the blocked item by name instead. A named blocked feature moves a board more reliably than a number everyone knows is invented.

Two things to say before anybody asks, because they will be asked.

**Engineer-days are capacity, not cash.** Nobody is getting made redundant, so this is not a saving in the sense a CFO means. It is opportunity cost, and it is worth naming that yourself in the first sentence rather than being corrected on it in the third.

**Then divide, in the same units.** Convert the fix cost to money first, at the loaded rate you already used, or you are dividing pounds a year by engineer-weeks and getting nothing meaningful. Eight engineer-weeks is forty engineer-days, so at seven hundred a day it is about twenty-eight thousand. Against a carrying cost of sixty thousand a year that is a payback of under six months, and that is the most legible number this whole exercise produces. *This charges us about sixty a year, costs about twenty-eight to fix, and pays back inside six months* is a sentence a board can act on in one hearing, and it is the only form in which any of this reliably gets funded.

Present it as a range, and say which of the four you are most confident in. A range you can defend beats a point estimate you cannot. And if the honest version is *this is unpleasant to work in and it is costing us two engineers' patience*, say that too, because retention is a real number and it is a better argument than pretending it is a delivery problem.

The other half of this, which is harder: be willing to say which of it does not matter. A CTO who brings a ranked list with things crossed off gets believed. A CTO who says everything is urgent gets a budget once and then stops being asked.

---

## When the answer is to ship instead

Sometimes you run this and the list comes back short, and the roadmap does not run through any of it, and delivery is fine. That happens, and the right response is to do nothing and go build the product.

There is a failure mode on the other side of this that gets much less attention. Teams that are very good at hygiene, with excellent tests and clean boundaries and a codebase you could show anybody, slowly losing because they are solving problems the business does not have yet. That is [building for a general case that never arrives](/posts/2025/from-code-to-business-generics), and it costs about what debt costs.

The teams I would bet on are the ones that can tell you in a sentence which debt they are choosing to keep, and why, and when they will look at it again.

---

So: not how much debt do we have. Which of it is in the way, what is it charging us in, and what does the next six months need.

Two hours with the team and last quarter's commit history gets you most of that answer, and you should run it before you spend anything.

If it comes back messy, or if what you find is the last row of that table and you want someone who has split systems apart before to tell you whether it can be done in pieces, that is what an [architecture review](/services/architecture-review#architecture-review) is. Most of what I hand back is a list of things I would not touch. The value is in the short list of things I would, and in being able to say which quarter each one belongs in.
