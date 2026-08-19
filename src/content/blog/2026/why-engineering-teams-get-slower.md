---
title: "Why Engineering Teams Get Slower as They Grow"
pubDatetime: 2026-07-09T09:00:00+03:00
description: "You doubled the team and shipped less. Eight causes that look identical from outside, how to tell which one you have, and roughly what each costs to fix."
tags:
  - engineering-management
  - startup
  - delivery
  - leadership
featured: false
draft: false
---

You went from six engineers to fourteen and you are shipping less than you were.

Not less per person. Less. The absolute number went down, and everyone can feel it, and the conversation about it has started going in circles because nobody can point at the thing.

This is so common that it is almost a rule, and it is worth saying early that it is not a sign anyone is bad at their job. The most common version of this involves a strong team, a good CTO and no villain anywhere in the story.

The problem is that eight causes produce the same symptom, and from the outside they are indistinguishable. So people guess. Usually they guess process, because process is the thing you can add on a Monday, and then six weeks later they are slower again and now they have standups.

Here they are, and how to tell them apart.

---

## 1. Communication overhead

The mechanical one. Six people have fifteen pairs between them. Fourteen have ninety one. If everyone needs to know what everyone else is doing, you have added a second job to everybody's week and given nobody the time for it.

**How it shows up:** meetings that exist to keep people informed rather than to decide anything. The same context being explained three times in a week to three different people. New joiners taking a long time to become useful and nobody quite knowing why.

**The tell:** ask an engineer what someone on another team shipped last week. If they know, and they did not need to know, you are paying for that.

---

## 2. Ownership that never got written down

At six people, ownership is obvious because there is nobody else it could be. At fourteen, ownership is whatever it was when you were six, which means several things now have no owner and nobody has noticed.

**How it shows up:** work falling between people. Two engineers doing versions of the same thing. Bugs that sit because they are nobody's, or that get fixed three times because they are everybody's. A question in a channel that nobody answers, not out of rudeness, but because everyone assumes someone else will.

**The tell:** name three parts of your system and ask three people who owns each. Different answers means it is this one. Consistent answers means it is not, and you can stop looking here.

---

## 3. Dependencies between teams

You split into teams, which was correct, and the split does not match how the work actually flows. Now most meaningful work needs two teams and a calendar.

**How it shows up:** things that are ninety percent done for weeks. Sprints that end with a lot of almost. Engineers who are busy all week and cannot point at anything that shipped.

**The tell:** take your last ten pieces of delivered work and count how many needed more than one team. If it is most of them, your team boundaries are in the wrong place, and no amount of coordination will fix a boundary problem. You move the boundary.

This one is easy to confuse with number five, and the fix is the opposite, so it is worth separating. If two teams need each other because the org chart split something that belongs together, that is this. If two teams need each other because they both have to edit the same part of the system, that is number five. Ask whether the collision is in the calendar or in the code.

---

## 4. Process that grew without pruning

Somebody added a review step after an incident. Someone else added an approval after a different incident. Each was right at the time. Nobody ever removed one, because removing a safety step is a thing you have to defend and adding one is not.

**How it shows up:** a change taking days to go out that used to take an hour, with most of that time spent waiting rather than working.

**The tell:** take a one line change, a genuinely trivial one, and time it from written to live. Not the average. That specific change. Whatever that number is, it is your floor, and everything else in your process sits on top of it.

---

## 5. Architecture that is now in the way

The system was built for a team that could hold all of it in their heads. It cannot be worked on in parallel, so adding people does not add throughput, it adds queueing.

**How it shows up:** merge conflicts as a daily fact of life. Two engineers unable to work on separate features because both need the same file. Every change needing a full deploy of everything. Test suites long enough that people batch their work to avoid running them.

**The tell:** how many engineers can be productive on this codebase at once before they start colliding? If that number is smaller than your team, you have found it, and hiring more people is actively making it worse.

**If you are not technical**, you can still test this one. Ask your CTO how many people could work on separate features this week without needing to coordinate. If the honest answer is four and you employ fourteen, that is the whole conversation, and it is the one case on this list where hiring is making things worse rather than merely not helping.

---

## 6. The management bottleneck

Decisions queue behind one person, usually the CTO, usually because it has always been that way and nobody chose it.

**How it shows up:** work waiting for approval rather than for effort. A calendar that is the critical path for the company. Everything slowing down when one person takes a week off, and everyone joking about it, which is how you know it is true.

**The tell:** look at last week. For every piece of work that took longer than expected, was it slow because it was hard, or slow because it was waiting? If most of it was waiting, and waiting on the same name, it is this one. I wrote more about that specific case in [when should a startup hire a VP R&D](/posts/2026/when-to-hire-vp-rnd).

---

## 7. Requirements that keep moving

The one engineers rarely name, because it does not feel like an engineering problem, and the one that shows up most often in the reasons your product lead gives.

Work gets built, shelved, half rebuilt, and quietly abandoned. None of it was waiting on anything. None of it was slow. It was just wasted, and waste does not appear in any of the tells above.

**How it shows up:** things that were nearly done and are now not being talked about. Engineers who can tell you exactly which two weeks of their year were pointless. A roadmap where the current version does not resemble the one from two months ago and nobody can say when it changed.

**The tell:** take the last quarter and ask how much shipped work is still in use. If a meaningful chunk of it is shelved, your problem is upstream of engineering, and every fix on this list will produce a faster team building the wrong things.

---

## 8. The cost of everyone being new

You did not add eight engineers. You added eight engineers and removed a large part of the senior half's week.

**How it shows up:** your best people are in fewer commits and more conversations, and both they and you read that as them being less productive.

**The tell:** ask a senior engineer what fraction of last week was their own work. If the answer is half, that is not a problem, that is the job. If it is a fifth, and it has been a fifth for a quarter, you are quietly running an internal training company and should decide whether you meant to.

---

## When your CTO says technical debt

You will hear this word, and it is worth knowing that it covers at least three different things.

Sometimes it means the code is messy and unpleasant to work in. That is real, and it mostly costs morale, not weeks. Sometimes it means the system cannot be worked on by several people at once, which is number five and is genuinely expensive. And sometimes it is shorthand for we made choices under time pressure and I have never had permission to revisit them, which is a prioritisation conversation rather than an engineering one.

Only the middle one slows a growing team down in the way you are feeling. So the useful follow up question is not how bad is the debt. It is: which of these three do you mean, and what would we be able to do in three months that we cannot do now.

---

## How to actually tell which one you have

You will have more than one. Everyone has more than one. The question is which is dominant, because fixing the second most important one produces no visible change and a lot of disappointment.

Four steps, about ten minutes a day.

1. **Pick two weeks.** Not a fortnight with a launch or a major incident in it. If one turns up halfway through, run it again rather than trusting it.
2. **Every time something takes longer than someone expected, write one line.** What was it waiting on. Not why it was hard, not whose fault it was. What it was waiting on.
3. **On the last day, list everything still unfinished** and what each one is waiting on. Two weeks only captures what completed, and the most stuck work is exactly the work that will not complete inside the window. This list is usually shorter and more damning than the finished one.
4. **Sort the lines using the table below**, and count them.

If you are the CEO rather than the CTO, read the warning after the table before you start.

### What each line means

| If the line says | The cause is |
| --- | --- |
| Waiting on one particular person to decide | 6. Management bottleneck |
| Waiting on another team | 3. Dependencies between teams |
| Waiting on a required approval or gate | 4. Process |
| Waiting on somebody's opinion, informally | 1. Communication overhead |
| Waiting on nobody, because nobody knew it was theirs | 2. Ownership |
| Not waiting at all, just slow to work in | 5. Architecture |
| Built, then shelved | 7. Requirements churn |
| Waiting on a senior person who was teaching | 8. Onboarding load |

The review case is the one people get wrong, so it is worth being precise. If the change could not ship without that approval, it is four. If it could have shipped and somebody chose to ask first, it is one.

And if what you wrote down does not fit any of these, believe your notes over my list.

Do not do this from memory. Memory gives you the loudest incident of the month, not the pattern. The whole value is in it being boring and written down at the time.

### If you are the CEO and not the CTO

Introduce this badly and it reads as surveillance, and you will get a list that carefully contains nothing embarrassing. Say what it is for out loud: we keep disagreeing about why this is slow, and none of us actually knows, so let us find out.

Ask your CTO to run it rather than running it yourself, with one exception that matters. If you suspect number six, the CTO cannot be the one holding the list, because nobody writes down that they were waiting on the person compiling it. In that case have someone else collect it, or collect it anonymously, and say why. If that suggestion is what causes the argument, you have your answer without running anything.

---

## What to fix first

Fix the one the evidence points at, even if it is not the one you find interesting.

That sounds obvious and it is the part people skip. Architecture is interesting. Ownership is not. Most teams I have worked with would rather spend a quarter on a migration than an afternoon on a document that says who owns billing, and the document is more often the thing that unblocks them.

| Cause | What fixing it takes | Fades on its own? |
| --- | --- | --- |
| 1. Communication overhead | Cancelling things. Mostly free. | Partly |
| 2. Ownership | An afternoon writing, a fortnight arguing | No |
| 3. Dependencies between teams | A reorg | No |
| 4. Process | About a week of pruning | No |
| 5. Architecture | A quarter or more | No |
| 6. Management bottleneck | A habit change, and the hardest of the lot | No |
| 7. Requirements churn | A founder conversation people avoid | No |
| 8. Onboarding load | A hiring decision | Yes, if you pause hiring |

Three of these you can start on Monday. The rest need you to decide they matter more than the roadmap.

Two things worth saying before you spend anything.

**Adding people makes most of these worse.** Communication overhead, ownership gaps, cross team dependencies, process, architectural contention and onboarding load all get harder with more people. Only the management bottleneck improves, and only if you add the right person. If you are slow and your instinct is to hire, check which one you have first, because you may be about to pay for the problem to get worse.

**Do not add process to fix a structure problem.** Process is what you use when a structure is right and needs consistency. Used on a structure that is wrong, it makes the wrongness reliable.

---

Eight causes, one symptom, and the only difference between guessing and knowing is two weeks of writing down what things were waiting on.

The paid version is not a better diagnosis. Two weeks of honest notes will get you most of the way to which one it is. What it adds is the part after: what to actually change, in what order, and the outside voice for the conversations where somebody has to be told something they will not enjoy hearing. That is what an [R&D health check](/services/fractional-vp-rnd#health-check) is. But the two week version costs nothing and you can start it tomorrow, and honestly, most teams who do it properly do not need me for the next part.
