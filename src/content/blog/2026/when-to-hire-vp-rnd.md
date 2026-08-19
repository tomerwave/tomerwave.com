---
title: "When Should a Startup Hire a VP R&D?"
pubDatetime: 2026-06-24T09:00:00+03:00
description: "The signals that a startup needs a VP R&D, the ones that only look like it, and the difference between a VP, an engineering manager and a CTO who is stretched."
tags:
  - leadership
  - startup
  - hiring
  - engineering-management
featured: false
draft: false
---

Most founders ask this question about a year after the answer stopped being obvious.

By then the pattern is already set. The CTO is in every technical conversation because the CTO has always been in every technical conversation. Nobody decided that. It just never stopped being true, and now there are fourteen engineers instead of four, and the thing that worked beautifully at four is quietly costing you a week a month.

I have been the person who let that happen, and I have been the person hired to unwind it. It looks the same from both sides. Nobody is doing anything wrong. That is what makes it hard to see.

At LayerX I watched us form new squads while the ownership map stayed exactly where it had been when we were small. Every squad had a lead. Most decisions still ended up in the same two calendars, because that was where they had always ended up and nobody had said otherwise. It took months before anyone framed that as a problem rather than as those two people being busy.

---

## The reasons people give, and the reasons that count

The reasons founders usually give me are headcount, funding, and somebody else's org chart.

We just closed a round, so we should hire a VP. We are at fifteen engineers and everyone says fifteen is the number. Our investor asked who owns delivery and I did not have a good answer.

None of those are wrong exactly. They are just not evidence. Headcount is a proxy for load, and a bad one, because a team of eight shipping into one product with one customer type carries less management weight than a team of six split across three products, two time zones and a customer who calls at midnight.

The evidence is in what happens when the CTO is away.

Take a real week. Look at what waited. Not what broke, what waited. If a design decision sat for four days because the only person who could approve it was in customer meetings, that is your answer and it has nothing to do with headcount. If nothing waited, you probably do not need a VP R&D yet, no matter what your board deck says. One caveat, and it is the uncomfortable one: nothing waiting can also mean people stopped bringing you things. Check which of the two you are looking at before you relax.

---

## Which signals actually mean you need one?

Here is what I look for, roughly in the order that they show up.

**Decisions queue behind one person.** Not big decisions. Small ones. Which library, whether this needs a migration, is this ready to merge. When those pile up in one inbox, the team's speed is capped by that person's calendar, and it does not matter how good they are.

**Nobody can say who owns a thing.** Ask three engineers who owns billing. If you get three answers, or worse, three shrugs and a name of someone who left, the problem is structural. Ownership that lives in people's heads stops surviving somewhere around the point where the team no longer fits in one conversation.

**Delivery is inconsistent rather than slow.** Slow is fine. Slow is predictable, and you can plan around predictable. Inconsistent is the expensive one, because you stop being able to promise anything to anyone, and the whole company starts padding estimates to protect themselves from you.

**Hiring is happening, and it is going badly.** The sourcing is usually fine. It is the deciding that has gone. Interviews that end in a shrug, offers that take two weeks to go out, a bar that moves depending on who is in the room and how tired everyone is that month. Hiring is the first thing a stretched CTO quietly deprioritises, and it is the one with the longest tail.

**The founder is doing engineering management by accident.** This one shows up in the calendar. If the CEO is having one to one conversations with engineers about their growth, something has gone wrong upstream and everyone is being polite about it.

**People have stopped raising things.** The most expensive signal and the last one to appear. Someone notices a problem, decides it is not worth the conversation, and works around it instead. You will not see that in any metric. You will see it eighteen months later in what everybody apparently knew.

If you want the longer version of how to tell these apart, I wrote one: [why engineering teams get slower as they grow](/posts/2026/why-engineering-teams-get-slower).

One or two of these on their own is just a startup. Most of them at once usually means the cause sits underneath all of them, and that cause is almost always that nobody has been given the job of building the organisation, only the job of building the product.

---

## What is the difference between a VP R&D, an engineering manager and a CTO?

These get used interchangeably and they should not be.

A **CTO** at this stage is usually the technical founder. Their job is technical direction, the calls that are hard to undo, and being credible to customers and investors about how the thing actually works. In a company of twenty, a good chunk of the CTO's week should be on what is coming in six months rather than on what is merging today. Not most of it. A chunk, reliably, that does not get eaten first when the week goes wrong.

An **engineering manager** runs a team. One to ones, growth, delivery for that team, the day to day of five to eight people. Most of that job is unglamorous and compounding: [getting someone useful in their first month](/posts/2024/mastering-employee-onboarding), and [growing juniors](/posts/2023/effective-mentoring-junior-developers) to the point where your seniors are not the only people who can ship.

A **VP R&D** owns the system that produces engineering output. In this market the title usually carries QA, DevOps and platform with it, and sits closer to product than a VP Engineering typically does, which is worth pinning down before you write the job description rather than after. That is a different job from either. Structure, ownership, hiring, how work moves from an idea to something a customer can use, and the standards that survive a bad quarter. A VP R&D is who you hire when the problem is not one team and not the technology, but the shape of the thing.

The usual failure is hiring an EM when you needed a VP, because an EM is cheaper and easier to find and the pain shows up first inside one team. That buys you about six months. Then you have two teams with the same problem and now it is politics as well.

The other failure is the reverse. Hiring a VP when what you actually needed was one good EM so the CTO could get out of daily delivery. That one is expensive in a different way, because a VP with nothing to organise will organise anyway, and you get process nobody asked for.

---

## When is it too early to hire a VP R&D?

I have talked founders out of this hire more often than into it.

If you have fewer than about six engineers, one product, and one clear customer, you almost certainly do not need this. What you need is for the CTO to stop doing the thing they are best at for two days a week and write down who owns what. That is not a hire. It is a fortnight of uncomfortable conversations with people who will hear the first draft as a demotion, and it is still cheaper than the alternative.

If your delivery problem is that the roadmap changes every three weeks, a VP R&D will not fix it. No hire inside engineering will fix it. That is a product and founder problem wearing an engineering costume, and hiring a senior person into it is an expensive way to find that out.

And if you cannot articulate what you want this person to change in their first ninety days, you are not ready to interview them. You will end up hiring for seniority and vibes, and then being surprised when they organise things you did not want organised.

If you are ready, that sentence is also your interview. Give the candidate your actual situation, unedited, and ask what they would look at in the first month. The good ones ask you questions back and are noticeably reluctant to promise anything before they have seen the team. Be suspicious of anyone who arrives with a plan. They are describing their last company, not yours.

---

## What happens to you

This is the part nobody writes down, and it is the reason a lot of these hires fail.

If you are the CTO, hiring a VP R&D changes your job, and if you have not agreed how before the person starts, you will find out by friction. Who owns architecture now. Do the engineering managers report to them or to you. When they decide something you would have decided differently, whose call is it, and does the answer change if you are in the room.

The failure mode is not a bad hire. It is two competent people quietly contesting the same decisions for six months while everyone underneath them learns to ask both and act on neither.

Write down the split before you interview, not after they accept. A useful version is that the VP owns how the organisation works and you own where the technology is going, with a named list of the three or four decisions you are keeping. If you cannot write that list, that is worth knowing now, because it usually means you are not actually ready to hand anything over, and no candidate can fix that.

---

## Should you promote from inside or hire externally?

Almost every company at this size has someone internal who might grow into it. Usually a tech lead who has quietly been doing half the job already.

Promoting is faster, cheaper, and lands better with the team, and they already know where the bodies are buried. The risk is that they have only ever seen your company, so they will reproduce it. If your problem is that the way you work does not scale, the person who learned to work that way is not obviously the one to change it.

Hiring externally buys you someone who has seen it work differently somewhere else. It costs more, takes three to six months to find, and another three before they are useful, and they arrive without any of the trust that makes hard changes possible.

The rough rule I use: if the problem is execution, promote. If the problem is that nobody in the building knows what good looks like at the next size, hire.

One thing to watch if you hire. Most available candidates with the title have done the job at companies far larger than yours, where the job was mostly running an existing machine. That is a different skill from building one out of eleven people and a mess, and the interview rarely surfaces the difference. Ask what they built when there was nothing, not what they ran when there was. And if you promote, get them a coach or someone external to talk to, because you have just asked a first time manager to do a job you could not do yourself while stretched, which is a lot to ask of someone with nobody to compare notes with.

Worth being blunt about cost while we are here. This person is roughly two senior engineers. Six to nine months from starting the search to being useful. Both numbers should be in the conversation, and the second one is the argument for starting earlier rather than later, because the signals are showing now and the help arrives two quarters after you commit.

---

## The awkward middle

There is a real gap between too early and ready, and most companies I work with live in it for longer than they expect.

You know you need more than you have. You are not sure the role is a full time one yet, and a senior hire is hard to undo.

Fractional leadership fits here, and not as a cheaper VP. It is a way of finding out what the job is before you write the job description. Somebody who has done it comes in, does the work, and either builds the thing that means you do not need the hire for another year, or hands you a very specific description of the person you should be looking for.

I have done it both ways. Sometimes the honest answer at the end is hire this person, here is the profile, here is what to test for in the interview. Sometimes it is you do not have a leadership gap, you have a prioritisation gap, and no hire is going to close it.

---

## What to do this week

Do not start with the job description. Start with the week.

Take last week and write down every decision that waited on one person, every task that fell between two people, and everything that shipped later than someone promised. Do not analyse it. Just write it down. Then do it again next week.

One catch, and it is worth taking seriously. If you are the CTO, you cannot reliably keep this list about yourself. Nobody writes down that they were waiting on you, least of all to you. Have someone else keep it, or collect it from the tools rather than from people.

Two weeks of that tells you more than any framework will, and it costs you an hour. If the same name is on most of the lines, you have a bottleneck and you can fix it without hiring anyone. If the lines are scattered and none of them have an owner at all, that is the org shape problem, and that is the one a VP R&D is actually for.

If you want somebody to do that with you and tell you plainly which one you have, that is what an [R&D health check](/services/fractional-vp-rnd#health-check) is. A couple of weeks, and you come out of it knowing whether this is a hire, a structure change, or a conversation nobody has been willing to have.

The worst version of this is deciding by feel, at the end of a quarter that went badly, with a title in mind and no idea what the person is actually supposed to fix.
