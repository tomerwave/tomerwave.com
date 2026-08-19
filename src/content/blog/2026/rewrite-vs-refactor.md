---
title: "Rewrite vs Refactor: How to Actually Decide"
pubDatetime: 2026-07-14T09:00:00+03:00
description: "Someone on your team wants to rewrite it. How to tell whether the system is really the problem, when incremental wins, and what a rewrite actually costs."
tags:
  - architecture
  - technical-debt
  - decision-making
  - startup
featured: false
draft: false
---

Somebody on your team wants to rewrite it.

They have been saying it for a while, and lately they have started saying it in meetings rather than in the kitchen. They are not wrong about the pain. Everything takes longer than it should, the tests are slow, two people cannot work in the same area without stepping on each other, and every new feature arrives with an apology attached.

And somebody else, usually you, is resisting it, and you are not wrong either. You have watched a rewrite before. You know that the six months they are quoting is going to be fourteen, and that the fourteen months come out of the roadmap rather than out of nowhere.

Both people are right about the half they can see, which is why arguing it harder never settles it. What settles it is being much more specific about what is actually wrong.

---

## The word rewrite covers four different jobs

Most of these arguments are two people using one word for two different things.

**Cleaning it up.** Same language, same boundaries, same shape. Better names, fewer surprises, tests that run in a minute instead of eleven. This is refactoring with a real budget attached, and it is what a lot of engineers mean when they say rewrite. It is also the cheapest thing on this list by a wide margin.

**Changing what it is built on.** Same behaviour, new framework or language or runtime. Usually driven by hiring, by a vendor going away, or by something underneath you going out of support.

**Moving the seams.** The code is mostly fine. The boundaries between the parts are in the wrong place, so everything touches everything, and adding a person adds queueing rather than throughput. This is the expensive one that gets misdiagnosed as either of the two above.

**Building a different product.** New behaviour, new model of the domain, new everything. This is a new product that happens to replace an old one, and it should be planned like a product.

Four different costs, four different failure modes, and the meeting treats them as one question. So before anything else, make the person proposing it say which they mean. Half the time the argument dissolves there, because everybody already agrees on cleaning it up and nobody was actually proposing the fourth thing.

---

## The question that actually decides it

Finish this sentence, out loud, with something specific:

*We cannot ______ , and the reason is the system.*

Then look at what you put in the gap. There are really only three kinds of answer, and each one points somewhere different.

**"It's unpleasant to work in."** Take this one seriously and do not file it under feelings. It shows up in retention before it shows up anywhere else, and losing the one senior engineer who understands a system nobody else understands is a larger delivery cost than anything else on this page. So price it as delivery risk, out loud, in the same conversation.

Then notice that a rewrite is still the wrong instrument for it. The person is unhappy now. The new system is a year away, and the year in between is the grimmest part of any rewrite, because nothing ships and nobody can see progress. If somebody is close to leaving, the thing that keeps them is a visible improvement this quarter in the code they touch on Tuesday, not a promise about next summer.

**"Only three people can work on it at once."** This is the one that genuinely caps you, and the one worth spending real money on. If your team is twelve and your codebase supports four people working in parallel, every hire past the fourth is making things worse, not better. That is a seams problem, and it is the case where the honest answer is sometimes big.

**"We literally cannot build the thing we need to build next."** This is the only answer where a full rewrite belongs in the conversation at all, and even then you have to be able to name the feature. Not a category of feature. The actual one, the one on the roadmap, the one a customer is waiting for.

If you cannot fill that blank with something concrete, you do not have a rewrite decision. You have a feeling, and the feeling might be entirely justified, but you should not spend a year of the roadmap on it.

---

## An afternoon that will tell you more than the argument will

You can settle most of this yourself, and it is an afternoon with the tracker open. Not a fortnight. That distinction matters more than it sounds: if you have already asked twice for time to think about it, a third request for two weeks of data is the thing that makes the person proposing it start taking recruiter calls. Say out loud that it is an afternoon and that you will have an answer on Friday.

This is the same shape as the exercise in [why engineering teams get slower as they grow](/posts/2026/why-engineering-teams-get-slower), narrowed to the code and compressed.

1. **List the last twenty things you shipped or tried to ship.** Real items, from the tracker, including the ones that got abandoned. Especially the ones that got abandoned.
2. **For each one, write a line: what made it slow.** One line. No analysis. If nothing made it slow, write that, and notice how many of those there are.
3. **Sort every line into one of three piles.** Slow because of the code. Slow because of how the team works. Slow because the requirement moved while it was being built. Most people are surprised by how much lands in the second and third piles, and neither of those gets better with a new codebase.
4. **For everything in the code pile, name the file or the module.** Not the system. The place. Then count.
5. **Write down what you want to build in the next twelve months that you currently cannot.** If that list is empty, stop here. You are not choosing between rewrite and refactor, you are choosing between cleanup and shipping, and you should ship.

One rule about who does the sorting: not the person who proposed the rewrite, and not you either. People sort ambiguous evidence toward the answer they already hold, without any dishonesty being involved. Two people sorting separately and comparing is better still.

Step four is the one that decides it. If most of your code pile points at two or three places, that is not a rewrite, that is a fortnight of focused work on two or three places. If your code pile is scattered evenly across everything, with no repeat offenders, then the shape really is the problem and you are in seams territory.

And if your code pile is short, the system is not your bottleneck, whatever anyone believes about it. That happens more often than you would think, particularly on teams where the code has become the thing everyone is allowed to complain about.

### What the piles usually mean

| If the honest answer is | The move is |
| --- | --- |
| Two or three modules keep showing up | Fix those. Weeks, not quarters. |
| Everything is slow, nothing repeats | Move the seams, incrementally |
| Tests are the bottleneck | Fix the tests. Cheapest win on this list. |
| Nobody can work in parallel | Seams again, and stop hiring until it is better |
| Runtime or framework out of support | Replatform, and start before you have to |
| The next product does not fit the model | A rewrite is genuinely on the table |
| It is slow because the requirements moved | No amount of code work will help |

---

## What moving the seams actually means

This is the answer for the reader who most needs one and the least explained thing in every article on the subject. Cheapest first, and in this order.

1. **Make the test suite fast.** A large amount of what people experience as a system that cannot be worked on in parallel is a system where finding out whether you broke something takes forty minutes, so everybody batches, so everybody collides. Usually this is weeks of work and it sometimes ends the conversation entirely. One caveat, because it bites often: if the tests are slow because every one of them hits a single shared database full of four years of fixtures, this step is not independent of step three, and you should read that one before promising anybody a date.
2. **Enforce the boundaries you already have.** Most systems already have modules roughly the right shape and nothing stopping anyone crossing them. Put ownership on directories, fail the build on imports that cross a line you care about, and see what breaks. What breaks is your actual dependency map, which is usually not the one on the wall.
3. **Work out where the data separates, before you move any code.** Splitting code is a solved problem. Splitting a schema with four years of assumptions baked into it is not. You end up dual writing to both shapes, backfilling history, reconciling the two, and living through a stretch where there are genuinely two sources of truth and a bug means deciding which one lied. Get this the wrong way round, extracting first and untangling the data afterwards, and a nine month migration becomes a three year one. If nobody can currently answer where the data separates, that is your actual first task, and it is a week of reading rather than a project.
4. **Then pull out the one piece everything waits on.** Not all of it. The single component that appears in every conflict, and only once step three says where its data ends. Decide explicitly what you are pulling it out *to*, because "extract it" hides three different projects: a module behind an internal interface in the same deployable, a separately versioned package, or a separate service with a network between you and it. They differ by an order of magnitude in cost and the default drift is toward the most expensive one. Start at the cheapest that solves the collision. And finish it, in production, before anyone is allowed to propose a second.

The reason step three sits where it does is that it is the answer to how much all of this costs. If your seams fall cleanly at the data layer, moving them is a quarter. If they do not, it is closer to three, and that one question is the difference between the two ends of that range.

A related question your CEO will ask within ninety seconds, so have the answer ready: a quarter with whom. Everybody, or three people while the other eight keep shipping. The second is almost always right and it roughly doubles the calendar, and saying so up front is much better than discovering it in month two.

---

## When a rewrite really is the right call

I would rather you did not do one, and most of what I get asked to look at turns out to need two or three specific things fixed and one decision made properly. But four cases are real.

**The ground under it is gone.** Runtime out of support, vendor shut down, or you genuinely cannot hire anyone who will touch it. This one has a deadline and somebody else sets it.

**It was never meant to be run.** A prototype, or something generated, promoted to production because it worked. What makes these different from ordinary messy code is that there is no design underneath to preserve, so refactoring has nothing to hold onto.

**The product changed shape.** If the core concepts in the code no longer match the words your customers use, every feature becomes a translation, and each new one has to be translated through all the previous mistranslations. That is why it gets worse rather than better.

**A requirement the design cannot meet.** Security, data residency, an audit obligation that assumes a separation the system does not have. It arrives from outside and does not negotiate.

Notice what is not on that list. Ugly code, bad choices by the previous team, and knowing more now are true in every company I have worked in, including the ones shipping perfectly well.

---

## If you do it, do it in pieces

The version that works is rarely the one where you build a new system alongside the old for a year and then switch. It is the one where you put something in front and move a piece at a time behind it, so there is always exactly one production system and it works.

The failure mode worth naming: the most expensive outcome is not a rewrite that goes badly, it is one that stops at sixty percent, because the urgent thing came back and the new system was good enough to keep while the old one was too load-bearing to delete. Now you maintain both forever, everyone learns both, and every feature has to decide which side it lives on.

So decide up front what makes you stop and who is allowed to say so. A migration with no named finish line does not finish. It gets absorbed.

The other thing to plan for is nearly a law. Given a blank file, a team does not rebuild what exists. It rebuilds what exists plus everything it has wanted for two years, because this time it will be done properly. That is how six months becomes fourteen, with good engineers acting in good faith throughout. The only defence I know is to write down what is explicitly out of scope before anyone opens an editor, and to treat additions to that list as a decision rather than as progress. It is the same failure as [building for a general case that never arrives](/posts/2025/from-code-to-business-generics), at a larger scale.

---

## What each one actually costs

| The move | Calendar time | What you get | Does the pain come back |
| --- | --- | --- | --- |
| Nothing | Free today | Nothing, and it compounds | It never left. This is the option you are picking by default. |
| Fix the tests | One to three weeks | Everything downstream gets cheaper | No |
| Clean up the hot spots | Two to six weeks | Faster work where you touch most | Yes, slowly, unless the habit changes |
| Move the seams | A quarter if the data separates, three if it does not | Parallel work, real hiring capacity | No |
| Replatform | Two quarters and up | Support, hiring, and not much else | No, but you feel no faster on day one |
| Full rewrite | Fourteen months, when they said six | The thing you could not build before | Only if you kept the habits that got you here |

The top row is there because it is the one nobody prices. Doing nothing is a real option with a real cost, and if you are going to choose it, choose it out loud with a date to revisit, because the version where you choose it by not deciding is the same cost with none of the benefit of having agreed to it.

The line people skip is the replatform one. Moving to a supported runtime is often necessary and almost never feels like an improvement, because the point of it is that nothing changes. Tell the team that before you start, or you will spend the last month of it managing disappointment.

And on all of these, the number that matters is not the estimate. It is what the estimate assumes about everything else. Ask the person proposing it what happens to the roadmap during the work, and whether the estimate assumed a feature freeze that nobody has agreed to. Most rewrite estimates are accurate for a team that is doing nothing else, and no team is doing nothing else.

---

## Whoever asked for this still works here on Monday

The decision is the hard part. The week after it is the neglected part, and it is where these go wrong.

If the answer is no, it is the third no that matters. Somebody has proposed the same thing three times now, and however carefully you walk them through the evidence, what they take home is that their judgement does not count here. So do not deliver a verdict on its own. Give them the parts you are saying yes to, with dates and their name on them, because there always are some: the tests, the two modules, the boundary nobody enforces. A no with three yeses attached is a different conversation entirely.

Say why the sorting is going to somebody else, in advance, and say it to them before anyone else. Something like: I want this sorted by someone with no position on it, including me, because I wrote half of this and I do not trust my own read either. That last clause is what makes it survivable. If you are going to question their objectivity, put yours on the table first.

---

The version of this decision that gets made properly is not the one where the loudest person wins. It is the one where somebody spends an afternoon writing down what actually made things slow, and the answer comes back narrower and cheaper than either side expected.

Do that first. It costs you almost nothing and it is the only input that will not be an opinion.

And the person who sorts it does not have to be paid. A CTO you know at another company, your product lead, an engineer from a team that does not touch this system, or a technical board member all work. The only requirement is that they have no stake in the answer, and all of those people meet it.

If the answer comes back that the shape really is wrong, what you want next is not another neutral opinion. It is somebody who has done this often enough to say which parts to leave alone, which is the judgement that takes repetition rather than distance. That is what an [architecture review](/services/architecture-review#architecture-review) is for. It ends with what specifically you would be able to build in six months that you cannot build today, and if I cannot answer that one, you should not do it.
