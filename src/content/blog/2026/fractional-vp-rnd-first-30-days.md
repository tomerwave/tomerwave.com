---
title: "What a Fractional VP R&D Actually Does in the First 30 Days"
pubDatetime: 2026-08-18T09:00:00+03:00
description: "What the first month actually looks like, what deliberately does not happen in it, and how to run most of it yourself before hiring anybody."
tags:
  - leadership
  - fractional
  - engineering-management
  - startup
featured: false
draft: false
---

The hardest part of deciding whether to bring in a fractional VP R&D is that nobody will tell you what actually happens.

You get outcomes. Clarity, velocity, a healthy engineering organisation. What you do not get is the boring version: who they talk to in week one, what they are writing down, what they hand you at the end, and what they deliberately do not touch. Which makes it very hard to tell the difference between someone who is going to change something and someone who is going to run four workshops and leave you with a slide deck.

So here is the boring version, as I actually run it. Then, at the end, how to do most of it yourself, because a fair number of people who read this should do that instead.

---

## Week one is only listening

Nothing changes in the first week. That is deliberate and it is the part clients find hardest, because they are paying and nothing appears to be happening.

**Every engineer, one to one, thirty to forty-five minutes.** At ten engineers that is ten conversations. At twenty-five I split it and take a proper sample across every team and every seniority level, plus everyone who has been there less than three months, because new people can still see the things everyone else has stopped noticing.

**Product, and whoever owns the roadmap.** Usually a different story from the engineering one, and the gap between the two stories is often the whole finding.

**The CTO or whoever holds the technical calls.** Longer, and more than once.

**Reading the code**, which means trying to make a small change rather than reviewing anybody's work, because the fastest way to find out what it is like to work somewhere is to try to work there. How long does it take to get set up. How long do the tests run. How many people did I have to ask.

**Watching the work move without saying anything.** Standups, planning, whatever the review process is. I keep quiet in these for the first two weeks, which sounds like an affectation and is not. The second I start contributing, the meeting starts performing, and I lose the thing I came to see.

The questions I ask are the same everywhere, and there is nothing secret about them. You can ask them yourself this week.

### What did you work on last week, and what slowed it down?

The most useful question on this list. Specific and recent, so people answer it from memory rather than from opinion. Nobody has a prepared position on last Tuesday.

### If you needed a decision made today, who makes it?

Ask about a real area, not in general. Then ask the same about three different areas, of three different people. When the answers disagree, or when they are all the same name, you have found something.

### What is the thing everyone knows and nobody says?

Roughly half of people deflect this. The other half have been waiting for somebody to ask.

### What would you fix if you could, and what has stopped you?

The second half of that question matters more than the first. Almost everybody knows what is broken. Why nobody fixed it is where the actual structure shows up.

### What did you stop bringing to people?

This is the expensive one. When somebody notices a problem, decides it is not worth the conversation, and works around it instead, that never appears in any metric you have. It appears eighteen months later in what everybody apparently knew.

### Where do you want to be in two years, and does this job get you there?

This is a delivery question, whatever it sounds like. Retention risk in your senior half, and it is the one that is invisible until the notice period starts.

---

## Week two is the map

By now the same three or four things have come up from unrelated people, and my job is to stop believing them for a moment and go and check.

I write down four things, all of them boring and all of them things the company usually does not have written anywhere.

**Who owns what**, as practised rather than as intended. Every part of the system, a name against it, and explicitly marked where the answers disagreed. The disagreements are the useful part.

**How work moves**, from somebody having an idea to a customer using it. Every stage, and how long each one actually took for the last ten things, not how long it is supposed to take.

**Where it stops.** Every point in that path where something waited, and what it was waiting for. This is essentially the same fortnight of note-taking I describe in [why engineering teams get slower as they grow](/posts/2026/why-engineering-teams-get-slower), run by someone who has no stake in the answer.

**What people believe that is not true.** There is always a set of these, held sincerely and in good faith, and usually inherited from a version of the company that no longer exists. Everyone thinks releases are risky because of an incident two years ago. Everyone thinks a system is fragile because one person said so once. These are cheap to fix and nobody fixes them, because nobody knows they are beliefs rather than facts.

---

## Week three is the short list and the first change

Now I have a ranked list of what is wrong, and the discipline is to not act on most of it.

The first change is deliberately small, and it is nearly always one of three things: writing down ownership for the two or three areas nobody could name, removing a process step that everybody hates and nobody can defend, or fixing whatever makes the test suite slow. Small, visible, unarguable, and it tells the team something more important than the change itself, which is that things around here can move.

It is also the first real test of whether I have understood anything. If I propose something and the room goes politely quiet, I have got it wrong, and week three is a much better time to find that out than month three.

---

## Week four is the written thing

At the end of the month there is a document, and I will tell you exactly what is in it because it is the same every time.

1. **What is working, and worth protecting.** This section is first on purpose. Every organisation has things that are genuinely good and quietly holding a great deal up, and the fastest way to damage a company is to change one of those without noticing it was there.
2. **The three or four things that are actually costing you**, with the cause rather than the symptom, and what each one is costing in delivery, reliability, or people.
3. **What to fix in what order**, with the reasoning for the order, because the order is the part people disagree with.
4. **Thirty, sixty, ninety.** What changes in the next month, what changes after that, and what is explicitly not being touched this year.
5. **What I could not find out**, and what it would take to find out. Every one of these has a section like this if it is honest.

Then we sit down and argue about it, which is the point. A document nobody argues with was too vague.

---

## What deliberately does not happen in the first 30 days

This list matters as much as the other one, and it is where I would be suspicious of somebody who tells you otherwise.

**No reorg.** Team structure is the most expensive thing to get wrong and the most tempting thing to change early, because it is the most visible. A month is not long enough to know why the current shape exists. Some of it will turn out to be an accident and some of it will turn out to be load-bearing, and from the outside those look identical in week two.

**No new process.** Adding process is what someone does when they need to look like they are doing something. In the first month I am much more likely to remove one.

**No architecture decision.** I will have opinions by week two and I will keep most of them to myself, because opinions formed in two weeks about a system somebody has lived in for three years are usually about half right, and the half that is wrong is expensive.

**No hiring plan.** Almost every company I walk into has an open role that is the wrong role. Working out which one takes longer than a month.

**No tooling change.** Tooling is rarely the cause and always the first suspect, so it is the thing most likely to get changed in month one for the sake of visible motion. There are real exceptions, and a workflow with eleven states that nobody can push a ticket through is one of them. But that is a five minute fix in week three, not a project, and if the tool genuinely is the problem you will find that out from the ownership map anyway.

---

## How to tell two candidates apart

If you are interviewing for this and both people sounded the same, they probably said the same words. Clarity, velocity, healthy engineering culture. Those words are free. Here are four questions where the answers actually diverge, and what you are listening for.

### What will you change in the first month?

The answer you want is close to nothing, with reasons. Somebody promising a restructure, a new process, or a tooling migration in month one is describing their last company, because they have not seen yours. Be especially wary of anyone who arrives with a framework named after itself.

But the answer you will actually get is smoother than that, and it passes this test as written. "The first phase is discovery" sounds exactly like close to nothing with reasons and contains nothing at all. So have the follow-up ready: close to nothing, and then what specifically would make you change that by week three? Somebody who has done this will name a thing, usually something small and unglamorous, and will say what would have to be true for them to touch it. Somebody who has not will restate the phase.

### Who will you talk to, and how many of them?

You want a number, and you want it to be most of your team, individually, not a workshop. If the plan is two group sessions and a survey, you are buying a report rather than a diagnosis.

Then ask the question that actually separates people: what do you do differently when somebody is guarded? Everyone can promise interviews. Only somebody who has sat through a lot of them has a real answer to this, and the real answers are specific and slightly odd. Going second with something of their own. Asking about last Tuesday rather than about the company. Saying plainly what they will and will not repeat, before the question that needs it.

### What will you hand me at the end, and can I see the shape of one?

They should be able to describe the sections without hesitating, because they have written it many times. Ask specifically whether it contains a list of things they could not find out. Everybody's does, and only the honest ones say so before you ask.

### What would make you tell me not to hire you?

They should have a real list, and it should come quickly, because they have turned work down. If they cannot name a situation where they are the wrong purchase, they are selling rather than diagnosing.

One more thing to check, and it decides more than the answers do.

Notice whether they ask you questions back. The good ones are reluctant to commit to anything before they have seen the team, and slightly more interested in your problem than in their method. It is the only item here you can score from memory of a call you have already had.

And one caveat about all five, which usually goes unsaid. These questions are on the open internet, so assume any candidate who prepared properly has read them and arrives with answers ready. That is not a reason to drop them, it is a reason to know what survives preparation, and it is not the questions. It is the follow-ups: what specifically would make you change that by week three, and what do you do differently when somebody is guarded. Neither of those is scripted, and both need the person to have done the work rather than read about it. The last thing on this page survives outright, because it is not a question at all.

---

## What your engineers should be told

I interview everybody and then write a document you read, which is an obvious problem if nobody has thought about it, and your engineers will have thought about it within ten seconds of the first invitation landing.

So agree the terms before the first conversation, and have them said out loud to the team rather than left to be assumed. The arrangement I would want, and which you should insist on from anybody you hire for this:

**Themes are attributed, individuals are not.** The document says three people described the same problem. It does not say which three, and it does not quote anyone in a way that identifies them.

At your size that is not enough on its own, and it is worth saying so. If the document says three people on a five person platform team said the same thing, you have narrowed it to five and probably named them over lunch. So below about twenty-five people some findings have to be blurred further, attributed to the whole engineering group, or left out of the written document and raised only in conversation. The consultant should be the one deciding which, not you, and you should want it that way, because the alternative is a team that works out very quickly what happens to what they say.

**Some things are never repeated at all.** People will tell you things in confidence that are theirs to raise or not. Those inform what gets looked at and do not appear anywhere.

**Anything about a specific person's performance goes back to that person**, not into a document for the founder. If that is what you actually want, you are commissioning something else and should say so.

**Everyone is told all of this before their conversation, by you**, not by the consultant on the day.

Without that, the best question on the list, the one about what everybody knows and nobody says, is a question no sensible employee should answer. And they will not, politely, and you will get a clean set of notes that tells you nothing.

---

## Where I would tell you not to do this

Four situations where a fractional VP R&D is the wrong purchase, and I have talked people out of this more often than into it.

**You already know the answer.** Some founders can describe the problem, the cause and the fix accurately in the first ten minutes of a call. If that is you, you do not need a diagnosis, you need either the time or the permission to act on what you already know, and paying somebody to confirm it is an expensive way to buy confidence.

**The problem is the roadmap.** If what actually happens is that priorities change every three weeks and work gets half-built and shelved, no hire inside engineering will fix that, fractional or otherwise. The cause sits with the founders and the roadmap, and putting a senior engineering person underneath it produces a well-organised team building the wrong things faster.

**You need somebody there every day.** Fractional means two days a week, sometimes three. That is enough to change how an organisation works and it is not enough to be in every conversation, hold every relationship, or be the person somebody finds at six in the evening when something has gone wrong. If the honest need is presence, hire full-time, even though it is slower and harder.

**Your CTO has not actually agreed.** This decides more than anything else on this page, and it gets its own section below.

---

## The conversation with your CTO

If your CTO has not genuinely agreed to this, it will not work. Nobody sabotages anything. It fails for a duller reason: everything I recommend needs somebody internal to carry it after I leave, and that somebody is them.

The difficulty is that you will almost certainly get a yes, and yes is not the same as agreement. Real agreement asks questions. What will they look at, will they talk to my team, what happens to my ownership of the architecture, what do I do with the document afterwards. Defeated agreement is smooth, brief, and slightly generous: sounds good, whatever you think is best, you do not need my permission. If the response costs them nothing, it means nothing. And if you get the second kind, the useful move is to say exactly that out loud, because naming it is the only thing that reliably converts it into a real conversation.

What to say, roughly, and it has to come from you rather than from a consultant:

*Delivery has been unpredictable for months and I do not understand why. I want somebody from outside to spend a month working it out, and I want it to be somebody you would take seriously. You should meet the candidates and you get a veto.*

Three things are doing the work in that script. It names your own ignorance rather than their failure, it gives them the veto, which costs you very little and changes the entire meaning of the exercise, and it makes it about the situation rather than about their performance. If you cannot give the veto honestly, then this is a performance conversation wearing a consulting costume, and you should have the performance conversation instead.

Their first question will be why it is not them, and you should have the answer ready rather than improvising it, because improvising it sounds like an excuse. The answer is not that they could not do it. It is that they cannot, and neither can you, because you are both inside the thing being measured. Nobody writes down that they were waiting on the CTO in a list the CTO is holding, and nobody tells the founder the whole truth in a room with the founder in it. That is a statement about the position rather than about either of you, and most good CTOs recognise it immediately, because they have already noticed that they stopped hearing things a while ago.

And decide in advance what you will do if the veto gets used on everybody, because in exactly the situation this section is written for, that is a likely outcome. Two vetoes is not obstruction and you should not treat it as such. It is information, and what it usually means is that the yes you got was the defeated kind and the real conversation has not happened yet. So go back and have that one, rather than looking for a third candidate. If you find yourself hunting for somebody your CTO cannot object to, you have quietly started managing them instead of working with them.

If what actually brought you here is that [your CTO has become the bottleneck](/posts/2026/cto-becoming-a-bottleneck), that is a different piece and a different conversation, and it comes first.

---

## What it costs you, in money and in hours

Two things I would want to know before emailing anybody, so here they are.

**There is no list price, and I would be suspicious of one.** A health check at eight engineers and at thirty are different pieces of work. What I can tell you is the shape: it is a fixed fee agreed before anything starts, not an hourly meter, and it is scoped to one to two weeks of my time. Send me your team size and what is hurting and I will give you a number before you commit to anything.

**It costs your team more than you expect.** Thirty to forty minutes per engineer, so ten to fifteen hours across a team of twenty, plus your own time, plus a few hours from your CTO and your product lead. That is real, it lands mostly in one week, and it is worth putting in the calendar rather than discovering.

**On what happens on day thirty-one.** Sometimes it ends there, with the document, and that is a normal outcome rather than a failed sale. Some people take it and run it themselves. Most ask me to stay for the parts that are hardest to do alone, which usually means the hiring, the reorganising, and the architecture decision underneath both. What matters is that you decide that after you have read the document, not before, and that nothing in the assessment depends on which way you go.

---

## Do the first month yourself

Most of what I have described above does not require me, and I would rather say so than pretend the value is in the method.

1. **Book thirty minutes with every engineer.** A conversation rather than a survey, with the six questions above, and take the notes in the meeting rather than after it.
2. **Pick three parts of your system and ask three different people who owns each.** Write down the disagreements.
3. **Take the last ten things you delivered** and, for each, write down where it waited and what it waited for.
4. **Try to make a one line change yourself**, or watch a new joiner do it, and time it from written to live.
5. **Write the four sections.** What is working. What is costing you. In what order. Thirty, sixty, ninety.
6. **Show it to the team before you show it to the board.** Every fact in it is something one of them told you.

That is a fortnight of your attention and it will get you most of the way. If you want the fuller version of when this becomes a hiring question rather than a fixing question, that is [when should a startup hire a VP R&D](/posts/2026/when-to-hire-vp-rnd).

One thing in that list will not work as well for you as it does for an outsider, and rather than leave you with that, here is what to do about it. Nobody tells the founder the whole truth in a one to one with the founder. So do not run them all yourself.

Split it. Take half the conversations, and have somebody who is not in the reporting line take the other half: your head of people if you have one, a board member with an operating background, or a founder you trust from another company doing it as a favour. Compare the two sets of notes and pay attention to what appears only in theirs. That gap is the most informative output of the whole exercise, and you cannot get it from a set of interviews you ran alone.

For the questions people find hardest to answer to your face, particularly the one about what they have stopped bringing to people, an anonymous written form gets you further than a meeting will. Fewer words, more truth.

And the other thing, which no arrangement fixes and which is the honest limit of doing this yourself: you will not know what you missed. Not the specific things, which is obvious, but the fact of them. Your notes will look complete, because the gaps in them are exactly the shape of what people decided not to say to you.

If you want somebody to run the month rather than running it yourself, that is what an [R&D health check](/services/fractional-vp-rnd#health-check) is, and the terms are set out above.
