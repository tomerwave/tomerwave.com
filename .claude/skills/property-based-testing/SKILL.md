---
name: property-based-testing
description: How to frame invariants and choose generators for property-based tests, rather than hand-picked examples.
---

# Property-Based Testing

Source: Claessen & Hughes, *QuickCheck: A Lightweight Tool for Random Testing of Haskell
Programs*; practical writeup: [nurkiewicz.com — "Property-based testing"](https://nurkiewicz.com/2021/09/property-based-testing.html).

## When to use it

When logic under test has a checkable invariant — round-trips (`decode(encode(x)) == x`),
idempotence (`f(f(x)) == f(x)`), commutativity, sort order, "output is always sorted/non-empty/
within bounds" — rather than a fixed handful of examples you'd otherwise hand-pick.

## The playbook

1. **Name the invariant in plain language first**, before writing any generator or assertion.
   "Parsing then serializing gives back the original input" is a property; "returns 5 for input
   3" is an example, not a property.
2. **Pick or write a generator for the input domain**, biased toward edge cases (empty,
   single-element, maximum size, boundary values) rather than uniformly random — most
   property-testing libraries let you weight this.
3. **Write the property as an assertion that holds for every generated input**, not just the
   ones you thought of. If the property is "this function never panics," the assertion is
   literally "no panic," not a specific return value.
4. **Run with shrinking enabled.** When a generated input fails, the library should shrink it to
   the smallest failing case automatically — a 200-element failing list is not debuggable, but
   the library's shrunk 2-element version usually is.
5. **Keep example-based tests too.** Property tests are additive, not a replacement — they're
   excellent at finding edge cases you didn't think of, and bad at documenting the specific
   behavior a reader expects a function to have for a representative input.

## Why this matters

Hand-picked examples only cover what the author already thought to worry about. A generator
that explores the input space finds the edge case nobody wrote down — an empty string, a
Unicode surrogate pair, an integer at exactly `i32::MAX` — before a user does.
