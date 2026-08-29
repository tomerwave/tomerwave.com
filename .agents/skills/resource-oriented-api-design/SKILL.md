---
name: resource-oriented-api-design
description: How to shape an HTTP or RPC endpoint around a resource noun and the standard verb set, instead of custom action methods.
---

# Resource-Oriented API Design

Source: Google AIP-121, ["Resource-oriented design"](https://google.aip.dev/121); [Google Cloud
API Design Guide](https://docs.cloud.google.com/apis/design).

## When to use it

When shaping a new HTTP or RPC endpoint, or a new group of them. Reach for this before writing
route/method names.

## The playbook

1. **Identify the noun first.** What resource does this endpoint act on — a user, an order, a
   subscription? Name the endpoint after that noun, not after the action a client happens to be
   taking right now.
2. **Reach for the standard verb set before inventing a custom one**: list, get, create,
   update, delete. Most CRUD-shaped needs fit one of these without a bespoke method name.
3. **Only add a custom method when a standard verb genuinely doesn't fit** — an action with no
   natural resource representation (e.g. "send," "cancel," "archive"). Even then, model it as a
   sub-resource or a POST to an action-shaped path, not a verb bolted onto the noun's URL.
4. **Nest resources under their parent when the child can't exist independently** (a comment
   under a post), and keep them flat when it can (a user isn't nested under an organization if
   it can exist without one).
5. **Keep the resource shape consistent across list/get/create/update responses.** A client
   that gets a resource from a `list` call and a `get` call should see the same shape, not two
   different subsets of fields.

## Why this matters

A resource-oriented API is predictable: once a caller learns the noun and the standard verbs,
they can guess the rest of the API's shape without reading every endpoint's docs. An API that
names endpoints after actions instead ("getUserOrders", "cancelUserOrder",
"reactivateUserOrder") forces a caller to learn each one individually, and makes consistent
tooling (generic clients, codegen) much harder to build against it.
