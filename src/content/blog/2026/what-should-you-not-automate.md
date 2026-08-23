---
title: "What Should You Not Automate?"
pubDatetime: 2026-08-23T09:00:00+03:00
description: "Six tests for what stays with a person. When an approval is theatre, when nobody notices a bad run, and what automation moves rather than removes."
tags:
  - ai
  - automation
  - operations
  - decision-making
featured: false
draft: false
---

There is a proposal in front of you, you do not like it, and you have no words for why.

The proposal is not wrong. The work is repetitive, the hours are real, somebody has costed it properly. So on Friday you either sign it, or you say something that comes out sounding like you are protecting headcount, which is the one objection nobody in that room can win.

Here are six tests that give you the words. None of them are about AI, and the oldest is from 1983.

---

## The six tests

Run a candidate through all six. Failing one does not kill the idea, it kills the version that was proposed, which is usually the version where the machine acts on its own.

### 1. Money leaves, access changes, or a customer gets told something

**The test:** if this runs wrong at two in the morning, what does fixing it look like on Monday? And what has already happened as a result that you cannot take back?

The second half is the one people skip, and it is where this rule earns its place. Ask it about a credit limit increase and the first half looks fine, because lowering a limit takes thirty seconds. The thing you cannot reverse is the shipment that went out against it. The action is cheap to undo. The consequence has already left the building.

**Why:** in these cases "undo" is not a rollback, it is a negotiation with somebody who is now annoyed. A payment can be clawed back and the relationship cannot.

Automating the action does not move who owns it, either. Air Canada tried that in front of a tribunal in 2024, after its chatbot invented a bereavement fare policy that did not exist, and suggested the chatbot was responsible for its own statements. The tribunal called that a remarkable submission and made the airline pay.

**Example:** a bot that drafts the refund and puts it in a queue passes. A bot that issues the refund does not.

### 2. The approval nobody has ever refused

**The test:** pull the last two hundred times this was approved. How many were rejected?

If the answer is zero, two things could be true and they call for opposite responses. Either the step is theatre, or something upstream is filtering so well that only clean cases arrive. They look identical in the data, so ask the approver when they last saw one they would have stopped. No answer means theatre.

A step that is theatre is not oversight, whatever the process document calls it. Under GDPR, a decision where a human rubber-stamps the machine's output without an independent assessment still counts as a solely automated decision, with all the obligations that brings. The regulator worked out some time ago that a signature is cheap.

**Why:** review requires three things, and most review steps are missing at least one. Time to actually look. Enough information to disagree. And the standing to say no without it becoming a career event. Take any of the three away and you have built a person-shaped delay in front of an automatic decision, plus somebody who will be named when it goes wrong.

**Example:** an ops lead approving forty flagged transactions a morning is not reviewing them, whatever the process document says. Ten a morning, with the reason for the flag on screen, might be.

### 3. The failure nobody would notice

**The test:** suppose it produced quiet nonsense last Tuesday. Nothing crashed, no alert fired, the output just was not right. Who finds out, and when?

If the honest answer is "the customer", or "at month end", or "eventually", then it is not ready to run unattended. Build the detection first and the autonomy second, in that order, because the other order is how companies end up with a script everyone half-trusts and nobody will turn off.

**Why:** loud failures are cheap. Something breaks, somebody fixes it, the damage is a bad afternoon. Quiet failures compound, and by the time anyone notices, the bad output is in six other systems and you are reconstructing four months.

**Example:** a nightly report that fails loudly is fine to automate. A nightly report that silently drops one region's data is the expensive kind. Fix it with a row count check rather than a person reading it every morning.

### 4. The work where people learn the domain

**The test:** name the last three people who got genuinely good at this part of the business. What were they doing while they got good?

If it is the thing you are about to automate, you are buying this year's hours with next year's seniors.

**Why:** Lisanne Bainbridge published this in 1983, about control rooms, and it has held up better than most things written about automation since. Automate the routine work and the human is left with the exceptions, which are the hardest part, arriving rarely, to be handled by somebody who no longer practises. She also noticed what it does to the job: boring and highly responsible at the same time, which is close to the worst combination you can hand a person. I made [a version of this argument in 2023](/posts/2023/future-of-work-automation-ai), before the current wave, and the part that held up was never about the technology.

**Example:** the support queue is where most people learn what the product actually does. Automate the top forty percent of tickets and the queue gets easier. Automate the next thirty and you have removed the training ground and kept the hard tickets.

### 5. The checking that lands on somebody else

**Before you build it:** name who receives the output, and ask them what they will do with it on the first day, before they have any reason to trust it. If the answer is that they will check it against the source, that checking is now part of the design and belongs in the business case. Ask when they expect to stop, too. "Once we are confident" means never, because nobody is ever handed a moment where confidence arrives.

**After it ships:** you will not find this by asking, because the new work is usually fifteen minutes across nine people and admitting to it sounds like complaining. Look for the receipts instead. A spreadsheet somebody built to check the output. A Slack channel where people post screenshots asking is this right. A step someone quietly added to their own morning. Count what those cost against the saved hours before anyone calls it a win.

**Why:** output somebody else has to verify does not remove work, it relocates it, downstream and out of sight of whoever approved the project. Research out of Stanford and BetterUp put a number on the AI version: forty one percent of workers had received something in the past month that looked finished and was not, at just under two hours each to sort out. The sender saved twenty minutes, somebody else spent two, and only one of those appears in the business case.

**Example:** a tool that drafts customer replies for one person to approve is fine. A tool where three teams each spot-check its output because nobody quite trusts it is worse than the manual process was.

### 6. The threshold somebody outside will learn

**The test:** if the rule became public tomorrow, who benefits from knowing exactly where the line sits? And what does four hundred of these look like, rather than one?

**Why:** every other test on this list asks what happens when the automation is wrong. This one asks what happens when it is right, repeatedly, in front of somebody who has worked out how it behaves. A published limit is an invitation to sit just underneath it, and nobody involved is doing anything dishonest. They are responding to a rule, which is what rules are for.

The aggregate half matters just as much. Rules one to five test a single run. Threshold automations fail in the total, where every individual case was fine.

**Example:** auto-approve credit increases under five thousand and each approval passes every other test on this list. Three requests of four thousand eight hundred over six weeks is fourteen thousand four hundred of exposure that never met a person. Lowering the threshold rarely helps, because somebody who wants more does not need to know where the line is. They just ask again. Cap the total per customer per quarter instead. The cap is the control, and it is the one that holds whether or not anyone has worked out how the thing behaves.

Varying the line is a second, narrower move, and only where there is no relationship on the other end. It works for fraud scoring. It is wrong for credit terms on a named account, because a limit that moves for no visible reason means your sales rep cannot tell that customer what to expect, and "it depends" from a rep sounds a lot like "we do not trust you."

---

### When several tests fail at once

Run all six regardless. Stopping at the first failure is how you miss the collections work in rule five, which is the one that finds you at quarter end. Precedence decides which verdict wins, not which tests you can skip.

| Failed test | Weight | Verdict | Gets worse with time? |
| --- | --- | --- | --- |
| 1. Hard to reverse | Veto | Draft only. A person acts. | No |
| 3. Silent failure | Veto | Not until detection exists. | Yes |
| 2. Approval is theatre | Tiebreaker | Voids any claim 1 is handled. | Yes |
| 6. Learnable threshold | Design | Cap the total exposure. | Yes |
| 4. Learning ground | Design | Automate less of it. | Slowly |
| 5. Checking moved | Design | Automate less of it. | Yes |

A veto is a gate, not a scoring input, and it beats a strong return on investment. But be precise about what it kills, because "no" is not the only way to satisfy one. **A veto means the machine may not act unbounded.** Two things clear it:

- **The machine drafts and a person acts.** Almost every proposal has this version inside it.
- **The machine acts inside a hard ceiling**, low enough that the worst total it can reach is one you can absorb.

The second route is why rule six still matters for something that already failed rule one. Credit increases fail rule one, because the shipment that went out against the limit does not come back. They can still be automated under a quarterly exposure cap, because the cap is what makes the worst case survivable. What you cannot do is automate them with no ceiling and call each approval small. If you cannot name the ceiling, you have not cleared the veto, you have just not looked for the number.

Rule two is not a veto of its own. It answers the argument you will actually have, which is somebody insisting rule one is handled because there is an approval step. Check the rejection rate.

Two, three, five and six are the ones that rot. A review step that was real at twenty items a day becomes theatre at eighty without anybody changing anything or noticing. Verification work spreads one cautious team at a time. Neither shows up against the original saving, because nobody is still looking at that spreadsheet.

Three is also the one that stays expensive to retrofit. Detection is cheap while you are building and awful afterwards, because by then you have to define what normal looked like using data the thing has already polluted.

---

## The distinction most teams get backwards

Everybody says human in the loop. Most of what gets built is the inverse, and the two are not the same system.

**Human in the loop** means the machine does the work and a person checks it. Attention is the scarce resource, so the design question is what to escalate, and the failure mode is rule two.

**AI in the loop** means the person does the work and the machine assists: gathering, summarising, drafting, flagging. Slower, and much harder to erode.

The second is the right shape for anything that failed test one, and it is what most people meant anyway. Plenty of it does get built, and every drafting assistant on the market is that shape. What it does not do is produce a headcount number, which is why it rarely turns up in an internal proposal.

If you do build the first, order matters. When people are shown the machine's answer before forming their own, their accuracy drops, including on cases they would have got right unassisted. Let them look at the case, then show them what the model thought. The other way round and you have automated their judgement while keeping their name on it.

---

## How to run a candidate through this, in an afternoon

Nothing here needs a consultant and all of it needs somebody to actually do it.

1. **Write down what the process is for**, in one sentence, without naming any tool. If the sentence needs an "and", it is two processes, and they will not have the same answers below.
2. **Sit with the person who runs it today.** Watch a real one, not a description of one. The gap between the documented process and the actual process is where the whole answer lives.
3. **Ask them what they have caught here in the last six months.** This is the question that gets skipped, and it is the highest yield one on the list. Steps that look like pure delay are often where somebody notices the duplicate invoice or the supplier whose bank details changed last week. That is not written down anywhere. It is just what she does while the batch is open. Remove the wait and you remove the catch, and nobody will connect the two for a year.
4. **Run the six tests and write the answers down.** Not in your head. The value is that somebody can disagree with a specific line later.
5. **Decide what the machine may do without a person.** Draft, propose, flag, or act. That is a shorter list than people arrive expecting, and the argument about where it ends is the real design conversation. I went through that boundary in more detail in [agents versus traditional automation](/posts/2026/ai-agents-vs-traditional-automation).
6. **Before you build, write the detection.** How you will know it went wrong, who gets told, and how fast. If nobody can answer that, you are not ready, and rule three says so.
7. **On the last day, name the number.** Hours back per month, and a date in the calendar to check it. Then check it, and turn it off if the hours did not appear. Willingness to turn things off is most of the difference between a company getting value from this and a company with six half-trusted scripts nobody will touch.

---

## Where I would tell you not to do this at all

**When the process is about to change anyway.** Automating a workflow two months before a system migration is paying to preserve something you are replacing.

**When the honest reason is a headcount target.** Klarna is the public example. It replaced the equivalent of seven hundred agents with an assistant, reported very good numbers for a year, then reversed and started hiring people back, because the answers were generic and the hard cases went badly. Its CEO said it plainly: cost became the driver and quality went. The lesson is about letting a savings number choose the scope, not about whether support can be automated at all.

**When nobody will own it.** Every automation is a small system with a maintenance cost, an owner, and a day it breaks. If the answer to "who fixes this in March" is a shrug, you are not deciding whether to build it, you are deciding who gets ambushed.

**When one person is objecting and cannot articulate why.** That is usually rule three or rule four arriving without vocabulary. It is worth an hour before it is worth overruling.

---

## What about the one you already have and cannot kill

Most people reading this are not holding a proposal. They are living with something built two years ago that half works, that fails three of these tests, and that nobody will turn off.

Step seven above says turn it off if the hours did not appear, which is easy to write and assumes turning it off is a decision. Eighteen months in it is a project, because four other things now read its output and two of them are in Finance.

So do not start there. Start here, and expect the whole thing to take a fortnight rather than a quarter.

1. **List what depends on it.** Every downstream reader, report, and person. This takes an afternoon and surprises everybody, including the person who built it. Until you have this list you cannot cost anything, and the fear of the unknown dependency is most of why nobody has touched it.
2. **List what it currently does unattended.** Actions only, not steps. Usually between three and eight, and usually shorter than anyone expects, because most of what it does is move things around and only a few actions have consequences.
3. **Run the six tests against each action separately, not against the system.** This is the move. "Is the invoice bot safe" has no answer. "Should the invoice bot be paying anything without a person" has an obvious one.
4. **Claw back the actions that fail a veto, one at a time.** Turn each into a draft that goes in a queue. Small change, individually deployable, and nobody has to defend a decommissioning in front of the person who approved it.
5. **Add the detection you never built** for whatever is still running unattended after step four. Rule three, retrofitted, which is expensive and still cheaper than the alternative.
6. **Leave the rest alone and say so out loud.** Most of it is fine. Naming what you are not changing is what stops this becoming a project that gets scheduled forever.

Most of the risk sits in two or three actions, not in the whole thing, so you can usually get the exposure down to something reasonable without anyone having to admit the original project was a mistake. That is not cynicism. It is the difference between a fix that happens and a fix that stays on a roadmap.

---

Most of what people bring me is worth automating. Worth saying, because six reasons not to can read as an argument for doing nothing, and it is not one. Which processes are worth it in the first place is a [separate question I answered separately](/posts/2026/processes-worth-automating-with-ai). This list is about the ones that pass that test and should still not be built the way they were proposed.

What gets missed is who pays when it goes wrong. Rarely the person who approved it. Usually the person who now checks a bot's output every morning, in a job more responsible and less interesting than the one she had before, and who will not raise it because the project was announced as a success. If your automation created that job, you have not finished.

If you want somebody to go through the work your people actually do and come back with what is worth building, along with what to leave alone and why, that is what an [AI and automation opportunity audit](/services/ai-automation#opportunity-audit) is. Around ten candidates, the three I would do, the ones I would not, and the hours each costs you today written next to it. I build them as well as assess them, which keeps the estimates honest, because I have to live with the ones I recommend.
