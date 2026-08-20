---
title: Notes from tutoring LLMs after a day of Mule flows
slug: tutoring-llms-after-mule
travel_date: 2026-08-15
location: Grok
country: Philippines
cover: /assets/blog/086fde10-7e83-11f0-9e05-3dbec5559644.jpg
cover_focus: 76 100
excerpt: Two kinds of debugging. One pays in Jira tickets; the other pays in
  better questions.
card_title: AI Tutoring
tags:
  - Craft
  - showcase
showcase: true
published: false
---
# Notes From Tutoring LLMs After a Day of Mule Flows

After a full day of working on Mule flows, debugging integrations, checking logs, tracing payloads, and figuring out why something decided to return a 503 at exactly the wrong time, I sometimes switch gears completely.

Instead of debugging software, I start tutoring an LLM.

And I've noticed something interesting.

**There are two kinds of debugging.**

One pays in Jira tickets.

The other pays in better questions.

## The MuleSoft kind

When I'm debugging a Mule flow, the problem is usually somewhere in the chain.

A payload isn't what I expected.

A DataWeave transformation breaks.

An API returns something weird.

A connector throws an error.

A downstream system decides it doesn't want to cooperate.

So I trace.

Logs.

Payloads.

Variables.

Requests.

Responses.

Configurations.

Eventually, I find the thing that's wrong, fix it, test it, and move on to the next ticket.

There's usually a very concrete definition of "done."

**The flow works. The ticket closes.**

## Then I switch to tutoring an LLM

Tutoring an LLM feels completely different.

There isn't always a single broken line of code that you can point at.

Sometimes the answer is technically correct but completely misses the point.

Sometimes the reasoning looks convincing but contains a subtle mistake.

Sometimes the model needs to be guided toward recognizing an assumption it made without realizing it.

And sometimes the best feedback isn't:

> "This answer is wrong."

It's:

**"Why did you make that assumption?"**

That's where the second kind of debugging starts.

## The part I don't love: repetition

Of course, tutoring isn't always some deep conversation about artificial intelligence.

There are days when it can get **really repetitive**.

The same types of tasks.

The same evaluation patterns.

The same kind of corrections.

Going through response after response can start feeling less like teaching and more like running a very long quality-control checklist.

That's probably my biggest complaint about it.

After spending the day debugging Mule flows, the last thing I sometimes want to do is perform another repetitive task—just with an AI instead of an API.

But then there are the moments that make it genuinely fun.

## Sometimes I just throw bullshit questions at the AI

One of the unexpectedly enjoyable parts is being able to just talk to an AI.

Not every interaction has to be a carefully constructed tutoring task.

Sometimes I can throw a completely random question at it.

Something stupid.

Something oddly specific.

Something that probably has no practical purpose whatsoever.

Just:

*"Okay, but what if...?"*

And see what happens.

There's something genuinely entertaining about watching an AI try to make sense of a question that I came up with in five seconds.

Sometimes the answer is surprisingly good.

Sometimes it's completely ridiculous.

And sometimes I end up asking three more increasingly stupid questions just to see how far the conversation goes.

It's not necessarily productive.

But it's fun.

And after spending hours dealing with structured systems, APIs, requirements, and error logs, there's something refreshing about having a conversation where the only objective is:

**"Let's see where this goes."**

## Debugging the question, not the code

One thing working with LLMs has taught me is that a lot of bad answers start with bad questions.

Not necessarily *bad* questions in the obvious sense.

Sometimes the question is simply underspecified.

Sometimes there's missing context.

Sometimes two interpretations are possible.

Sometimes the desired outcome isn't clearly defined.

And sometimes the person asking the question already has an assumption baked into it.

An LLM can produce a beautifully structured answer to any of those.

That's what makes it interesting.

The answer can look completely reasonable while solving the wrong problem.

That's not something you fix with another `try` and `catch`.

You fix it by asking a better question.

## It's surprisingly similar to integration work

The more I do both, the more similarities I notice.

In integration development, garbage in can quickly become garbage out.

The same thing happens when working with LLMs.

If the input is ambiguous, the output can be technically impressive and still be useless.

If the context is incomplete, the model fills in the gaps.

If the requirements aren't clear, it has to guess what "correct" means.

And if you don't validate the result, you can end up trusting something that was never actually grounded in the right context.

So in both cases, I keep coming back to the same habit:

**Don't just look at the output. Understand the input.**

## One kind of debugging makes me faster

Mule debugging has taught me to be systematic.

Don't randomly change things.

Find where the behavior diverges from what you expected.

Check the evidence.

Reproduce the problem.

Isolate the component.

Make one change.

Test again.

That mindset carries over surprisingly well when evaluating an LLM response.

Instead of immediately rewriting the answer, I try to understand *why* it produced that answer in the first place.

What information did it have?

What information was missing?

What assumption did it make?

What instruction did it prioritize?

What would have made the desired answer more obvious?

## The other kind makes me think better

That's probably the bigger lesson.

Debugging Mule flows makes me better at solving technical problems.

Tutoring LLMs makes me more conscious of **how problems are framed in the first place.**

And that distinction matters.

You can become very good at solving the wrong problem.

You can write the perfect DataWeave transformation for a requirement nobody actually needed.

You can spend an hour fixing an LLM's response when the real issue was that the prompt never clearly defined the expected result.

Sometimes the most valuable debugging step is stopping before the debugging starts and asking:

**"What exactly are we trying to accomplish?"**

## Two kinds of debugging

After a day of Mule flows, switching over to tutoring LLMs feels less like changing jobs and more like looking at the same skill from another direction.

One teaches me to trace systems.

The other teaches me to trace assumptions.

One gives me Jira tickets.

The other gives me better questions.

And somewhere in between the repetitive evaluations, the random questions, and the occasional conversation where I'm basically throwing nonsense at an AI just to see what it does, I've realized something:

**I actually enjoy the weirdness of it.**

Because the best part isn't always getting the perfect answer.

Sometimes it's asking a ridiculous question and seeing whether the AI can keep up.

And honestly, that's another form of debugging too.

You're just debugging the limits of the conversation instead of the limits of the code.
