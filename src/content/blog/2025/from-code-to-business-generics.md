---
title: "From Code to Business: Why Generic Isn't Always the Answer"
pubDatetime: 2025-02-15T12:00:00+03:00
modDatetime: 2026-08-19T12:00:00+03:00
description: "The interface that unified four integrations, and the startup that served every industry, are the same mistake. How to spot premature abstraction early."
tags:
  - software-engineering
  - startup
  - code-quality
  - leadership
  - best-practices
heroImage: /assets/img/2025/from-code-to-business-generics/hero.jpg
heroImageAlt: "Team collaborating in an office environment"
---

When building software or starting a company, it's tempting to go broad, aiming for flexibility and universal solutions. While this approach feels efficient, it can often backfire, leading to complexity, inefficiency, and missed opportunities. Whether it's developers overusing generics in their code or startups failing to find a clear niche, the lesson remains the same: **"Keep it simple, stupid."** Focus on solving one problem well before expanding.

---

## Generics in Code: Flexibility or Flaw?

Generics in programming offer a powerful tool to make code reusable, scalable, and flexible. But there's a line where flexibility turns into over-engineering. Developers often fall into the trap of grouping unrelated behaviors or abstracting excessively in the name of "best practices."

### An Example: Overusing Generics for Integrations

Imagine you're working on a platform that connects to multiple integrations — each seemingly doing the same thing, such as processing payments. While they share the same goal, they achieve it in wildly different ways. To avoid duplicating code, you create a generic interface that attempts to unify all these integrations under one behavior.

```typescript
// Generic abstraction for integrations
interface Integration<T> {
  initialize(config: T): void;
  process(data: T): void;
  finalize(): void;
}

class PaymentIntegration implements Integration<PaymentData> {
  initialize(config: PaymentData) { /* ... */ }
  process(data: PaymentData) { /* ... */ }
  finalize() { /* ... */ }
}

class ShippingIntegration implements Integration<ShippingData> {
  initialize(config: ShippingData) { /* ... */ }
  process(data: ShippingData) { /* ... */ }
  finalize() { /* ... */ }
}
```

This might look elegant at first glance, but it forces integrations into a one-size-fits-all structure that doesn't fit. The result? Performance issues, unexpected behaviors, and hours of debugging.

### Rule to Avoid Abusing Generics in Code

- **Ask yourself:** Do these behaviors truly share the same purpose? Or are you just trying to save time?
- **Best Practice:** Keep code simple and specific to the task at hand. If integrations have unique behaviors, they deserve unique implementations.

> "Simplicity is the ultimate sophistication." — Leonardo da Vinci

---

## Startups and Niches: The Power of Focus

The same principle applies to startups. Early on, startups often spread themselves too thin, trying to appeal to everyone in an effort to maximize market potential. While it seems like a smart move, it leads to diluted focus and wasted resources.

![Museum gallery — focusing on one masterpiece](/assets/img/2025/from-code-to-business-generics/museum.jpg)

### An Example: Trying to Please Everyone

In one of my startups, we targeted every team across industries. From customer service to logistics, we aimed to build features for everyone. The result? We stretched ourselves too thin, never going deep enough into any one area to truly excel.

Once we pivoted to focus on a single niche — legal teams — we saw exponential growth. By understanding one audience deeply and solving their problems completely, we became the go-to solution in that field.

I have also been on the other side of that, spending a year building something broad enough that nobody recognised themselves in it. That one is written up in [the year we spent convincing ourselves](/posts/2026/the-year-we-spent-convincing-ourselves).

### The Parallel with Generics in Code

Both cases start from the same motivation: **maximizing impact with minimal effort.** But just like building wealth, the best approach is incremental. Start small, excel in one area, and expand gradually.

---

## When Generics Work: Knowing the Right Time

Generics aren't inherently bad. In both code and business, they shine when applied at the right stage. For instance:

- **Code:** Frameworks like React use generics brilliantly to handle reusable components.
- **Startups:** Amazon started with books before scaling to a marketplace for everything.

The key is timing. Build specificity first to ensure stability, then expand when the foundation is solid.

---

## Red Flags: How to Spot When You're Abusing Generics

### In Code

1. **Unrelated Behaviors in One Template:** Are you grouping things together simply because they share a category name?
2. **Decreased Performance:** Does your abstraction lead to runtime errors or inefficient processing?
3. **Hard-to-Read Code:** If new developers can't understand your implementation without a PhD in over-engineering, it's time to simplify. This one shows up fastest in [onboarding](/posts/2024/mastering-employee-onboarding) — a new hire is the only person on the team who cannot route around your abstraction out of habit.

### In Startups

1. **Unclear Audience:** Are you trying to cater to multiple customer types without solving any one problem deeply?
2. **Scattered Resources:** Is your team constantly shifting focus between different markets or features?
3. **Slow Growth:** Are you seeing mediocre traction because your offering isn't specialized enough?

---

## Conclusion: Specificity First, Generic Later

Whether you're a developer or an aspiring founder, the lesson is the same: **focus beats flexibility.** In code, prioritize clarity and maintainability over abstract elegance. In business, find a niche, dominate it, and only then consider expanding.

> "Do the simplest thing that could possibly work." — Kent Beck

---

## What to Do When It's Already Built

The advice above is easy while the abstraction is still a pull request. It is much harder two years in, when four teams depend on it and the person who wrote it has left.

At that point the question stops being whether it was a good idea and becomes narrower and more useful: is this costing you delivery time right now, is it costing you reliability, or is it just ugly? Those get very different answers, and only one of them is worth stopping the roadmap for. Ugly and stable can wait, sometimes for years.

Working out which one you actually have — and what the smallest change is that fixes it — is what an [architecture review](/services/architecture-review) is for.
