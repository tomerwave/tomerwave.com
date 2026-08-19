---
title: "AI Agents vs Traditional Automation: Which Should You Use?"
pubDatetime: 2026-08-14T09:00:00+03:00
description: "You picked the workflow. Now someone wants to build it as an agent. How much of the control flow to hand over, and which actions it may take without a person."
tags:
  - ai
  - automation
  - architecture
  - decision-making
featured: false
draft: false
---

You have picked the workflow. That was the hard part and it is done.

Now somebody on your team wants to build it as an agent, and somebody else wants to build it as a script, and both of them have reasonable things to say. The agent person points out that the process has judgement in it and the rules will never cover every case. The script person points out that they will be able to tell you exactly what it will do on Tuesday, which the agent person cannot.

They are arguing about the wrong boundary. There is a third option in the middle that neither of them named, and it is the right answer more often than either.

---

## Three things, not two

**Rules.** A script, a scheduled job, a workflow tool with boxes and arrows. Deterministic. Same input, same output, every time. Fails loudly and identically. You can test it the way you test any other software.

**A model doing one job inside a fixed process.** The steps are written by you and they do not change. One of those steps is something a rule cannot do: read this email and tell me which of these six categories it is, pull the invoice number out of this PDF, write a first draft of the reply, summarise this call. The control flow is yours. Exactly one box is non-deterministic, and you know which one.

**An agent.** The model decides what to do next. It picks tools, it loops, it can take three steps or thirty, and the path is different each time. Non-deterministic in the flow as well as in the content.

The middle one is where most of the value in most companies actually is, and it is the least discussed of the three, because it is not exciting to say out loud. It is a normal piece of software with one clever step in it. That is also exactly why it works: everything you can predict stays predictable, and the unpredictable part is small, contained, and observable.

If you take one thing from this: **you are not choosing between AI and not AI. You are choosing how much of the control flow you hand over.** Hand over as little as the job requires.

Which means these three are points on a line rather than three boxes, and the most useful position is often between the last two. A constrained agent plans freely but can only act through tools you wrote, with the destructive ones simply absent from its list, hard guards in your own code on anything that writes to a system of record, and mandatory human approval on anything a customer sees. It gets the flexibility of an agent for the thinking and the predictability of rules at every point where it touches the real world.

That shape is common now and it is the one most "we want an agent" proposals should turn into. When somebody pitches you an agent, the productive question is not whether to allow it. It is which specific actions it is allowed to take without a person, and the good version of that answer is a short list.

---

## The question that sorts it

For each step in the workflow, ask: *could a competent person write down the rule for this?*

Not could they do it. Could they write down what they do, in a way somebody else could follow.

If yes, write the rule. This is the same argument I made about which processes are [worth automating in the first place](/posts/2026/processes-worth-automating-with-ai), and it applies just as hard one level down. A conditional is cheaper to build, cheaper to run, cheaper to fix, and it does the same thing every time. A large amount of what gets pitched as AI automation is a form and an if statement wearing a costume.

If no, because the judgement is real, that step is your model step. Wrap it as tightly as you can. Give it one job with a clearly shaped answer, and put the decision about what happens next back in your own code.

And if the answer is "we could write the rules but there would be about four hundred of them and they change every month," that is the genuinely interesting case, and it is the strongest argument for a model that exists. Not because the model is smarter, but because you were never going to maintain four hundred rules.

Now do the same for the flow. Does this process have a fixed set of steps, or does the number of steps depend on what you find along the way? A fixed set means you do not need an agent no matter how much judgement is in the individual steps. Variable, open-ended, "keep going until you have enough" is agent territory.

---

## What each one actually costs you

| Compared on | Rules | Model in one step | Agent |
| --- | --- | --- | --- |
| Same input, same output | Yes | Usually, not guaranteed | No |
| Compute cost per run | Effectively nothing | Small and predictable | Variable, sometimes by a lot |
| Cost to keep correct | The rules themselves, forever | Evaluation on every model change | Evaluation, and more of it |
| How it fails | Loudly, in the same place | Quietly, in the content | Quietly, in a different place each time |
| How you test it | Normal tests | Normal tests plus a scored set of real cases | Normal tests on the tools, plus a scored set for the behaviour |
| What breaks it later | You changing it | The model changing underneath you | The model changing underneath you, less predictably |
| Who can read it | Any engineer | Any engineer | Whoever built it |

A note on the two cost rows, because collapsing them into one is how this comparison usually gets rigged. Rules cost almost nothing to run and can cost a great deal to keep correct, which is the entire case for a model when there would be four hundred of them changing monthly. Splitting compute from maintenance is what stops the comparison being rigged in either direction.

And "usually, not guaranteed" in the top row is doing a lot of work, so here is the version that matters if you are in a regulated business. The same input will normally produce the same classification, and two nearly identical cases can occasionally land differently. If your business has to demonstrate that similar cases were treated similarly, that is not a rounding error, it is the thing your compliance officer will stop on. The fix is not to abandon the model. It is to make the model propose and your own code decide, using written criteria, so that the consistency lives somewhere you can show a regulator.

Two more rows are worth more attention than the rest.

**How it fails.** A script that breaks throws an error and somebody gets paged. A model that starts getting things subtly wrong produces plausible output that nobody questions, and the failure is measured in weeks before anybody notices. This single difference decides where in your business each one is allowed to live. Anything where being quietly wrong is expensive belongs in a rule, or belongs behind a human.

**What breaks it later.** Rules break when somebody changes them. Models change underneath you, on a schedule set by a vendor, and a change can be an improvement in general and a regression for your specific case. That is a real ongoing cost, it appears in no estimate, and it is why the last row matters too. An agent whose author has left is close to unmaintainable, because there is no code path to read. There is a prompt, a set of tools, and a great deal of behaviour that exists only at runtime.

Worth being precise about that last row, because as written it flatters rules. A ten year old rules engine that only one contractor understands is not debuggable by any engineer either, and every operations person reading this has met one. The real claim is narrower and still decisive: rules can be *read*. Somebody competent can sit down with the file and work out what it does, however unpleasant that afternoon is. With an agent there is nothing equivalent to read.

---

## What has to be true before you build an agent

Four tests, and they split into two kinds, which matters because these are positions on a line rather than three separate boxes. Two of them decide whether a full agent is the right position at all. The other two hold everywhere on the line, including for a single model step, and failing one of those moves you along the line rather than off it.

**The first two decide the position.**

**The number of steps genuinely varies.** If you can draw the flowchart, you do not need one. Try to draw the flowchart first, and notice whether you can.

**Being wrong is recoverable.** A bad path costs a wasted minute and a retry, rather than a customer record with the wrong number in it.

If that one fails, you have not been disqualified, you have been told where you sit on the line. The answer is the constrained shape above: the model may plan and propose freely, and your own code performs every write to a system of record, and a person approves anything a customer sees. That is the difference between "no agent" and "an agent that cannot reach the dangerous things," and almost every proposal that fails this test should become the second rather than be abandoned.

**The next two hold everywhere on the line**, whether you are building a single model step or a full agent.

**Somebody sees the output before it matters.** Certainly at the start, and for longer than most people plan for.

Cost that person. This is the step everyone treats as free and it is often the whole economics: if the thing drafts four hundred replies a day and a person reads every one, you have not saved anything, you have moved the work and added a handoff. Either the review is genuinely faster than doing the task, and you should measure that rather than assume it, or the confidence threshold below is doing the work, or the case does not hold.

**You are willing to build a scored test set.** This is the one that stops most agent projects that should have been stopped. You cannot test an agent by running it once and being pleased. You need thirty to fifty real cases from your business, with the right answer written down, and a way to run them and get a number.

Price this properly, because I have seen it waved through as a couple of days and it usually is not. If the right answer is obvious to anyone who reads the case, it genuinely is two or three days. If it needs an expert to decide, and two of your experts turn out to disagree about what the right answer even was, and legal has to approve real customer data going into a test harness, it is three or four weeks. That range is worth knowing before you commit, and the disagreement you uncover while building it is often more valuable than the automation.

If nobody will fund that work, do not build the thing. You will have no way of knowing whether the version you deploy in November is better or worse than the one that worked in August.

There is one mechanism that makes all of this cheaper and it belongs with the middle option as much as here. **Have the model return a confidence, and route anything below a threshold to a person instead of proceeding.** That is what makes "somebody sees the output" affordable at volume, because a person reviews only the cases the machine flags rather than all of them. What proportion that is depends entirely on your work and how the threshold is set, and you find out by running it, not by planning it. Set the threshold conservatively at the start and move it only when the scored set says you can.

---

## Where each one belongs

Rather than abstractions, here is roughly how I sort real work.

**Rules.** Moving data between two systems on a schedule. Anything triggered by a specific event with a specific response. Approvals with written criteria. Reporting where the numbers have to reconcile. Anything touching money, and I mean that fairly literally.

**A model inside a fixed process.** Classifying incoming email or tickets. Pulling structured fields out of unstructured documents. Drafting a first reply that a person sends. Summarising a call into notes on a record. Flagging the twenty things out of two thousand that a human should look at. This category is where I would put most first projects, and it is where most of the hours actually come back.

**An agent.** Research across sources where you do not know in advance how many you need. Investigation work, where each finding changes what you look at next. Multi-step operations against systems where a person would also have improvised. Anything where the honest description of the task starts with "it depends what you find."

**Neither.** A large amount of it, and this is the part vendors will not tell you. Some steps should be deleted rather than automated. Some reports have no reader. Some approvals approve nothing.

---

## What your compliance officer will ask

If you are in insurance, health, finance, education, or anywhere with a regulator, these questions arrive whether or not the project plan mentions them, and the time to answer them is before you build rather than during the audit.

**What is kept from each model call, and for how long?** The input, the output, the model version, and the timestamp, at minimum. If you are not recording the model version you cannot investigate anything later.

**Can you reproduce a decision from eighteen months ago?** Usually not exactly, because that model version may no longer be served. So the answer has to be that you kept the inputs, the output and the version, and can show what was decided and on what basis, rather than being able to re-run it. Say that out loud early. It is a perfectly acceptable answer and a terrible surprise.

**What data went to which vendor, under what terms?** Somebody should be able to answer this without reading a contract, and the answer should be narrower than "the whole record."

**Can you show similar cases were treated similarly?** This is where the model-proposes, code-decides shape earns its place, because the consistency lives in criteria you can print.

None of this makes a project impossible. All of it is much cheaper to build in at the start than to retrofit, and a compliance officer brought in during week one is an ally rather than an obstacle.

---

## The shape that usually wins

Almost every good system I have seen in this space looks the same from a distance. A deterministic skeleton with a model in the joints.

Your code decides the sequence, handles the retries, writes to the systems of record, and enforces the rules that must never be broken. The model does the two or three things in the middle that are genuinely judgement. Everything is logged, and the model's output goes somewhere a person can see before it becomes an action.

That shape is boring, and it is the one that is still running in eighteen months. The all-agent version demos beautifully and then spends its second year slowly losing everyone's trust, which is the outcome nobody plans for and quite a lot of companies are currently living in.

There is a related trap on the other side, which is building the general system when you only have one case. Solve the one workflow completely, in the least clever way that works, before you build the thing that handles all of them. That is [the argument I made about over-abstraction in code](/posts/2025/from-code-to-business-generics), and it arrives in this field looking exactly the same, just with more expensive infrastructure attached.

---

## If this is your first one, do not make it an agent

I would say this even if it cost me the more interesting project, which it sometimes does.

Your first automation should be the one where the shape is simplest and the failure is most visible. Take a workflow with a fixed set of steps, put a model in the one step that needs it, produce a draft rather than an action, and let it run for a month with somebody watching. You will learn more from that month than from any amount of design, and most of what you learn will be about how much messier the real inputs are than anyone remembered.

Then measure it against the number you used to justify it. Hours back per month, not adoption, not usage, not how many people tried it. If the hours did not come back, say so and turn it off. The willingness to turn things off is the difference between a company getting value out of this and a company with a graveyard of half-trusted scripts.

Everything I said about automation [back in 2023](/posts/2023/future-of-work-automation-ai) that has held up is about that discipline rather than about the technology, and the technology has changed a great deal more than the discipline has.

---

So: a line rather than two camps, and your job is to sit as far down it as the work requires and no further. Write the rule wherever a rule can be written. Put the model in the specific steps where judgement is real. If the number of steps genuinely varies, let it plan.

And when somebody proposes an agent, the question that settles it is not whether to allow one. It is which specific actions it may take without a person, and the good answer to that is a short list. Everything else it proposes, and your code decides. Then build the scored set, because otherwise you will never know whether the version running in November is the one that worked in August.

Most of what people come to me wanting to build as an agent turns out to be the middle option, and the middle option is a smaller, duller, more durable project than the one they arrived with.

If you want somebody to look at your actual workflows and tell you which of the three each one is, along with the ones worth leaving alone, that is what an [AI and automation opportunity audit](/services/ai-automation#opportunity-audit) is. I do the building as well as the assessment, on purpose, because the plan is more honest when the person writing it has to maintain the thing afterwards.
