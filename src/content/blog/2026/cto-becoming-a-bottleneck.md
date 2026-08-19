---
title: "Your CTO Is Becoming a Bottleneck. What Now?"
pubDatetime: 2026-08-04T09:00:00+03:00
description: "Four different things get called a CTO bottleneck, and they have different fixes. How to tell which one you have, and how to have the conversation."
tags:
  - leadership
  - engineering-management
  - startup
  - founders
featured: false
draft: false
---

You have started to notice that things wait for one person.

Not dramatically. Nobody is blocked for a week. But a design decision sits for three days, and a hire does not get an offer until the end of the month, and a question in a channel goes unanswered until that one name appears in it. And when they took four days off in March, the whole quarter had a small dent in it that nobody wrote down anywhere.

Or you did not notice at all. Somebody told you. Two or three engineers, separately, carefully, in the way people raise something they have decided is worth the risk of raising, and now you cannot un-hear it and you are not sure whether it is true or whether it is what people say when they want more room. If that is your version, you are already standing somewhere the rest of this article would have advised you not to go, and you did not choose to go there.

It changes one thing, so let me say it here rather than make you hunt for it. You cannot run the private fortnight of notes first and then present the result as something you noticed yourself, because you did not, and if it ever emerges that their engineers came to you before you went to them, that is the fact everybody will remember. So the conversation moves to the front, and it opens with the awkward part rather than burying it: some of your team have come to me separately, and I would rather tell you that than sit on it. That is a worse ten minutes and a considerably better year, and they will assume you were told anyway.

This is your CTO, and the thing that makes it hard is that they are almost certainly excellent. That is usually how they became the bottleneck. Everything went through them because everything going through them produced the best answer, and at six people it genuinely did. Nobody chose the arrangement. It just never stopped being true.

I have been on both ends of this. I have been the person things queued behind, and I have been brought in later to unwind somebody else's version of it. It looks identical from either side, and from the inside it does not feel like being a bottleneck. It feels like being busy and slightly guilty.

So before you do anything about it, you need to know which kind you have, because there are four and they do not share a fix.

---

## Which kind of CTO bottleneck do you have?

**The decision bottleneck.** Work waits for approval rather than for effort. Which library, is this ready to merge, do we need a migration for this, is this design good enough. Individually trivial, collectively a full-time job that nobody has been given the hours for.

**The knowledge bottleneck.** They are the only person who understands something, and everyone routes around that fact politely. You can spot this one because certain questions always end up in the same place regardless of who they were asked to.

**The delivery bottleneck.** They are still the strongest engineer, so the hardest and most urgent work goes to them, and it does not stop coming. This is the most self-inflicted of the four, and the most comfortable one to stay inside, because writing code is the part of the job that gives feedback the same day.

**The interface bottleneck.** Customers, recruiting, vendors, the board, the security questionnaire, the enterprise call where somebody has to be credible about the architecture. Nothing on this list is optional and all of it lands on one calendar.

This is the one that carries the longest timeline in the article, so it is worth being precise about why. The other three can be delegated to people you already have. This one usually cannot, because what is actually scarce is somebody a customer or a candidate will believe, and belief is not something you can assign in a document. There are two partial fixes worth trying before you accept the hire. Take the parts that only look like they need seniority, which is most security questionnaires and a good deal of vendor management, and give them to somebody organised with a template. And start deliberately putting a second person in the room on enterprise calls, silent at first, six months before you need them to carry one. Neither of those solves it. Both of them shorten the gap, and the gap is the expensive part.

Most stretched CTOs have two or three of these at once, but one is dominant, and fixing the second most important one produces no visible change and a lot of disappointment.

The fastest way to tell them apart is to look at what waited last week and ask what it was waiting for. Was it waiting for a yes? That is the first one. Waiting for information only one person had? The second. Waiting for a person to be free to do the work? The third. Waiting for a meeting to happen? The fourth.

If you want the longer version of that exercise, with the other seven things that produce the same symptom, it is in [why engineering teams get slower as they grow](/posts/2026/why-engineering-teams-get-slower).

---

## What does each kind of bottleneck need?

You will not be certain which row is yours until you have run the experiment further down, and the costs are worth knowing before you start, because two of these are cheap enough that you would not bother diagnosing carefully first.

| The kind | What it takes | Roughly how long |
| --- | --- | --- |
| Decisions | Write down who decides what, then stop deciding those things | An afternoon to write, a quarter to hold |
| Knowledge | Deliberate pairing, and someone else on call for that system | A quarter, and it cannot be rushed |
| Delivery | Take the hard tickets away, on purpose, including the fun ones | Immediate, and it will feel wrong for a month |
| Interface | Somebody else who is credible externally. Usually a hire. | Six to nine months |

The first row is the one worth dwelling on, because it is the cheapest and the most commonly botched. Writing down who decides what takes an afternoon. Holding to it takes a quarter, and the hard part is the CTO, who will keep being asked and will keep answering, because answering is faster than pointing at the document and it feels helpful. The fix does not stick until the answer to "quick question" becomes "ask Dana, she owns that now" about thirty times in a row.

And there is a version of the third row that people avoid. If your CTO is still taking the hardest tickets, taking them away is a real loss, and pretending otherwise makes the conversation dishonest. They are good at it, it is where their confidence lives, and the management work they would do instead has a much slower feedback loop. Say that out loud rather than around it.

---

## How do you raise it with your CTO?

This is the part people ask me about most and the part almost nobody writes down.

Two things make this conversation go badly. Leading with the org chart, and leading with impact. If you open by saying you are thinking about bringing in a VP, they will hear a demotion before they hear anything else, and everything after that is negotiation. If you open with how much this is costing the company, they will hear an accusation, and the reasonable response to an accusation is a defence.

Open with the week instead.

If you hired them, the sentence is roughly:

*I want to look at what your week is actually made of, because I think we have been asking you to do four jobs and I only ever hired you for two of them.*

If they are your co-founder, that sentence is a landmine and you must not use it. The word *hired* is the only word they will hear, and the next hour is about being reclassified as staff by the person they started this with. The true version between founders is different, because nobody hired anybody and the job was never designed:

*Neither of us ever decided that this should all go through you. It just ended up that way when we were six people, and I do not think either of us has looked at it since.*

Both versions do the same work. They put the arrangement on the table rather than the person, and they are true. From there the useful questions are concrete. What did you do last week that only you could have done? What did you do that somebody else could have done if we had set it up differently? What did not get done at all?

That last question is the one that usually opens it up, because every stretched CTO has a list of things they have quietly stopped doing, and hiring is nearly always on it. It is the first thing to go and the one with the longest tail.

A few things not to do.

**Do not go to their reports first.** You will find out things, and you will also have permanently changed the relationship, and the team will know you did it before you finish doing it. If they came to you, which is a different thing, say so early rather than carrying it.

**Do not add process as a substitute for the conversation.** More standups and a stricter review policy make a structural problem reliable rather than smaller.

**Do not open a search before you have said anything.** They will find out. They always find out, usually from a recruiter or a candidate who mentions it, and the damage lands on whether anything you say afterwards is believed.

The failure mode here is rarely a bad decision. It is two competent people quietly contesting the same ground for six months while everybody below them learns to ask both and act on neither.

---

## How do you test whether they really are the bottleneck?

There is a cheap test and almost nobody runs it deliberately, which is a shame, because it produces better evidence than any amount of discussion.

**Send them away for a week.** Actual holiday, laptop closed, phone off, no "just ping me if it's urgent." One week.

This comes after the conversation above, not before it, and that ordering is the whole thing. **The experiment happens with your CTO's knowledge and agreement, never behind their back.** It has to. Run covertly it is surveillance, it will be understood as surveillance within about a day, and the cost of that is permanent. Run openly it is a genuinely interesting question that most stretched CTOs want the answer to as much as you do, because the suspicion that everything routes through them is usually sitting in their head too.

Once you have agreed to it:

1. **Write down what is in flight.** Everything moving, and what each thing is waiting on today.
2. **Tell the team what the week is for**, honestly. It tests the arrangement rather than any person in it. If people think they are being assessed, they will heroically cover the gaps and you will learn nothing.
3. **Agree in advance that nobody pre-clears the runway.** Your CTO will want to, out of conscientiousness rather than anything else, and a week of decisions made in advance produces a lovely quiet week that tells you nothing at all. This is much easier to ask for having already agreed on what the week is for.
4. **Somebody other than the CTO holds the pen**, and the CTO knows who. One line each time something stopped, and what it stopped for.
5. **Read it together on the Monday they are back.**

Point four is the one that needs care in a small company, because nobody writes down that they were waiting on the person compiling the list, and at twenty engineers everyone who can see what stopped reports to the CTO. That is exactly why this has to be agreed rather than arranged quietly. A note-taker the CTO chose and knows about is doing an honest job. The same person doing the same job without the CTO knowing is an informant, and the day that comes out is the day you stop being able to fix any of this.

What comes out of that week is unusually honest, because nobody is arguing in the abstract any more. If the list is short and boring, you do not have this problem, whatever it has felt like, and you have saved yourself an expensive hire. If half of it is decisions nobody felt authorised to make, you have the first kind, and that one is fixable in weeks.

---

## If the CTO is your co-founder

Most of what is written about this quietly assumes an employee. If you are reading it about the person you started the company with, the advice is not wrong so much as unusable. Three things change.

**You cannot reassign their work.** Half the fixes above assume a reporting line. Taking the hard tickets away, changing what someone owns, deciding who is credible on enterprise calls: with a co-founder every one of those is a negotiation between equals, not a decision. So do not arrive with a plan. Arrive with the week and the question, and build the plan together, which is slower and is the only version that holds.

**There is a board on the other side of it.** If this ends anywhere near a title change or somebody senior coming in above them, that is a conversation with your investors, your cap table, and possibly a lawyer, and your co-founder finds out how you handled that part too. Decide early whether you are telling the board before or after you tell them. There is only one defensible answer and it is after.

**The downside is not hurt feelings.** A co-founder who feels managed out does not simply leave. They leave with institutional knowledge, some of the team, and a version of the story that your investors will eventually hear. That is the actual risk, it is much larger than the delivery problem you started with, and it is the reason to move slowly here even though everything about the situation feels urgent.

Underneath all three is the same thing: two people who set an arrangement when the company was small and never went back to renegotiate it, and who now both have too much invested to raise it lightly. That part shows up on no org chart, and it is [the half of these situations that decides how they go](/posts/2026/people-first-company-second).

And there is a real limit to what an outsider can do here, which I would rather say than sell around. Between founders there is no neutral party. If you bring somebody in to deliver the uncomfortable version, your co-founder may reasonably read it as you outsourcing a conversation you owed them yourself, and that is a worse injury than saying it badly in person. Say the first one yourself. Bring somebody in for what comes after.

---

## When the bottleneck is not the CTO

I should say this plainly because it costs me work to say it, and because I have watched it be true more than once.

Sometimes the queue behind the CTO is a symptom, and the cause is upstream.

If the roadmap changes every three weeks, everything looks like it is waiting on engineering, because half-built work sits there visibly. No amount of delegation inside engineering fixes that. If nobody has decided what matters this quarter, the CTO becomes the place where the ambiguity gets resolved, one decision at a time, and it is not because they enjoy it.

There is also a version where the founder is the bottleneck and the CTO is the buffer. Decisions wait because the CTO cannot get a straight answer either, and they are absorbing that rather than escalating it. From the outside these look identical. The test is simple enough: of the things that waited, how many were waiting on a technical judgement, and how many were waiting on somebody to say which thing mattered more.

If it is mostly the second, the fix sits outside engineering, and hiring a senior engineering leader is an expensive way to find that out.

---

## When it is actually a departure conversation

Occasionally it is, and I would rather name it than let it sit unspoken through an article about org design.

Some founding CTOs are extraordinary up to about twenty people and genuinely do not want the job on the other side of that. That is not a failing, and it is a much better outcome when everybody says it early. The versions that go badly are the ones where everyone knows for a year and nobody says it, and the person finds out by being slowly routed around.

If you are heading there, the honest sequence is to say what the job is becoming, ask whether they want it, and mean the question. Sometimes the answer is a relieved no and a much better arrangement, where they keep the technical direction and somebody else takes the organisation. Between co-founders that arrangement is a negotiation rather than something the two of you settle over coffee, and it still has to survive the board conversation from earlier, so do not mistake the relief for the end of it. And sometimes it is a yes, and they surprise you, which is the outcome you should be hoping for anyway.

---

## Do this first

Whatever else you do, do not start with a job description. Start with a fortnight of notes.

Take last week and write down every decision that waited, every task that fell between two people, and everything that shipped later than someone promised. Do not analyse it. Do it again next week. If the same name is on most of the lines, you have a bottleneck and you now know which of the four kinds it is, and three of the four are fixable without hiring anyone.

One exception, and it applies to a lot of people reading this. If you did not notice the problem yourself, if your CTO's own engineers came to you, then the notes do not come first. The conversation does, for the reason at the top of this article, and the fortnight is what you take into that conversation rather than what you arrive holding. Getting that order wrong is the one move here that costs you the year.

If the lines are scattered and most of them have no owner at all, you are looking at a different problem, and [when a startup actually needs a VP R&D](/posts/2026/when-to-hire-vp-rnd) is the piece for that one.

And if you want somebody outside the company to run that fortnight and then say plainly which of these you have, that is what an [R&D health check](/services/fractional-vp-rnd#health-check) is. The part that is genuinely hard to do yourself is not the diagnosis. It is being the person who says the uncomfortable version of it to somebody you work with every day and would rather not upset. That is most of what you are paying an outsider for, and it is worth being honest that the two weeks of notes, you can do without me.
