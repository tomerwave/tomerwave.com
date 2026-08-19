---
title: "How to Find Processes Worth Automating With AI"
pubDatetime: 2026-08-07T09:00:00+03:00
description: "Everyone is using AI and nobody can point at an hour they got back. What makes a workflow worth automating, and where AI is the wrong tool entirely."
tags:
  - ai
  - automation
  - operations
  - decision-making
featured: false
draft: false
---

The most common version of this conversation starts the same way.

Everyone here is using these tools. We pay for several of them. And I cannot point at a single hour we got back.

That is usually true, and it is usually not a tools problem. I wrote a version of this argument [back in 2023](/posts/2023/future-of-work-automation-ai), and the part I got wrong then was thinking the interesting question was about the technology. The work that got automated was the work that was easy to automate, which is rarely the work that was expensive. Somebody built the thing that was interesting to build on a Tuesday, it worked, everyone was pleased, and it saved four minutes a week.

So the useful question is not what can we automate. Almost anything can be automated now. The question is which of these is worth it, and that is a much smaller list than people expect.

---

## What makes a workflow worth automating?

Four things I score, and three that are simply gates: no gate, no build, however good the score. Not to produce a number to hide behind, but because writing them down stops you picking the interesting one.

**Frequency.** How often does this actually happen? Not how often it feels like it happens. Twice a day is a candidate. Twice a quarter is almost never worth it, no matter how much everyone hates it, because you will spend longer maintaining it than doing it.

**Human time.** How long does it take, times how often, times how many people. This is the number that decides whether anything else matters. A task that takes ninety seconds and happens four times a day across six people is about thirteen hours a month, on working days. A task that takes a whole day and happens monthly is eight. People almost always want to automate the second one because it is the one they dread, and the first one is where the hours are.

**Predictability.** Does the same input produce the same output? Can someone describe the rule? If a person can write down what they do in steps, you may not need a model at all. If they cannot, because the judgement is real, that is where AI earns its place and also where your reliability problems live.

**Cost of being wrong.** This is the one that decides the shape of the solution, not whether to build it. Wrong draft email that a human reads before sending is cheap. Wrong number in a report the board sees is not. Wrong record written to your finance system is much worse than either, because now you have to find it.

**Data.** A gate. Does the information this needs already exist somewhere a machine can reach? If the answer involves a person checking a shared drive, or knowledge that only lives in someone's head, you have a data project first and an automation project second. Most stalled automation projects are actually stalled data projects that nobody named.

**How you would know it broke.** A gate. If this stopped working correctly on a Tuesday, how long before somebody noticed? If the honest answer is months, you are not building an automation, you are building a way to be wrong at scale quietly. Either the output is checked by someone who would spot it, or it tells you when it fails, or you do not build it. This is the difference between the automation everyone still uses and the one that died in March and got found in June.

Ask the same gate backwards, too: how much did this process change in the last year? Something that has been rewritten twice will be rewritten again, and you will spend your time maintaining the automation rather than getting anything back from it.

**An owner.** A gate. Who fixes this when it breaks in eight months? If there is no name, do not build it. An automation with no owner is a thing that will silently stop working and quietly be replaced by people doing it by hand again, and nobody will tell you.

---

## When is AI the wrong tool?

This is most of the value in an honest audit, and it is the part vendors will not give you.

**If the rule is writeable, write the rule.** A conditional and a scheduled job is cheaper to run, cheaper to fix and it does the same thing every time. Plenty of what gets pitched as AI automation is a form and an if statement wearing a costume.

**If it has to be right every time, start elsewhere.** Not never. Start elsewhere. Your first automation should be one where being occasionally wrong is survivable and, more importantly, visible. Pick something where a person is already in the loop and would notice.

**If it happens rarely, leave it.** The maintenance is fixed and the saving is not. Rare and painful is a candidate for a better checklist, not a system.

**If nobody can explain the current process, do not automate it yet.** You will encode the confusion and make it permanent, and then it will be much harder to fix, because now it is software and software feels authoritative.

**If the goal is to say we use AI, stop.** I say this plainly because I have watched money go into it. That project has no owner, no measurement and no second version, and everybody involved knows it within a month.

---

## How do you find the workflows worth automating?

Take a real week and watch where people move information rather than decide things.

Someone copying numbers between two systems every morning. Someone answering a version of the same question for the fortieth time. Someone assembling a report by hand from four places. Someone re-typing what a customer already typed into a form. Someone checking whether something happened yet, again, because there is no notification.

Then run each one through all seven. Frequency, hours, predictability and cost of error are the scores. Data, how you would know it broke, and who owns it are the gates.

In the ones I have run, what comes out is usually something like ten candidates and a handful worth doing. The ones worth doing are almost never the ones people nominated at the start. The nominated ones tend to be the tasks people find most annoying, and annoyance and cost turn out to be poorly correlated. The one that quietly eats thirteen hours a month is usually something nobody complains about because it only takes ninety seconds.

The other thing that comes out of it is a shorter list of things to stop doing entirely. Some reports have no reader. Some approvals approve nothing. It is worth checking before you automate a step whether the step should exist, which is a boring question and saves more time than most of the automation does.

---

## Start smaller than you want to

The temptation is to build the whole thing, because the whole thing is where the value is. Build the smallest part that a person could check.

Something where the output is a draft rather than an action. Where a human sees it before it matters. Where you can turn it off and everyone goes back to Tuesday with no drama. You will learn more from two weeks of that than from three months of design, mostly about how much messier the real inputs are than anyone remembers.

Then measure it, using the same number you used to score it: how many hours a month did this actually take back. If it did not, say so out loud and turn it off. The willingness to turn things off is what separates a company that gets value out of this from a company with a graveyard of half trusted scripts that nobody will admit to not using.

The same discipline applies here as anywhere else. Solve one thing completely before generalising, which is the argument I made about [over-abstraction in code and in startups](/posts/2025/from-code-to-business-generics). Most failed automation projects are that same mistake, arriving in a different department.

---

## What do you tell a board about AI automation?

Most people reading this have someone above them who wants to know what the plan is.

What a board can actually act on is not a tool and not a strategy. It is a list. Ten workflows, the hours each one actually costs today, the three you are doing first, the reason the other seven are not worth it, and a name against each of the three. That last column is what makes it a plan rather than an intention.

It also gives you the only honest measure of success available: in three months, did those hours come back. Not adoption, not usage, not how many people tried it. Hours.

---

If you want someone to go through the real workflows with you and come back with the three worth doing and the seven that are not, that is what an [AI and automation opportunity audit](/services/ai-automation) is.

But the version you can do yourself is genuinely useful, and it is one week of paying attention. Watch where information gets moved by hand. Count the ninety second tasks, not the ones people complain about. And before you build anything, write down whose name is on it when it breaks.
