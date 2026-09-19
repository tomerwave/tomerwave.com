import type { Service } from "./services";

export const NONPROFIT_SERVICE: Service = {
  slug: "technology-advisor",
  shortName: "For nonprofits",
  letterDay: "Tuesday",
  documentTitle: "Ongoing Technology Consulting for Nonprofits",
  pageHeading: "Technology consulting for nonprofits",
  eyebrow: "Nonprofit teams",
  description:
    "Technology consulting for nonprofits, from understanding daily work to building improvements, managing vendors and supporting the people using the systems.",
  lede: "Your team has people to support, volunteers to coordinate and services to deliver. I help find where the work gets stuck and stay involved in making it easier.",
  routerProblem: "Your people need more time for the work that needs them.",
  routerBody:
    "We map the work, choose what matters most, and make improvements people can feel in their day. I build, coordinate vendors, and stay involved as your needs change.",
  who: "Nonprofit CEOs, COOs and the people responsible for technology, whether it is their official role or something they took on because someone had to. I work alongside your existing technical person, or help you establish that ownership.",
  triggers: [
    "A report means collecting the same information from several spreadsheets.",
    "Registrations, volunteers or requests move between systems by hand.",
    "One person knows how everything works, and everyone has to ask them.",
    "Leadership and staff see different problems, and priorities are hard to agree on.",
    "A vendor proposal needs someone on your side who can assess and manage the work.",
    "People are concerned about a change, and you want to understand what would help them use it.",
  ],
  onePager: {
    triggerIndexes: [0, 1, 4],
    deliverableIndexes: [0, 1, 2, 3],
  },
  help: {
    heading: "Understand it. Improve it. Stay involved.",
    body: [
      "First I speak with leadership about goals and constraints, then watch how the team works in practice. I bring back a map of the processes, the gaps and the reasons behind them. We agree on priorities with the person leading the work internally.",
      "We run useful small improvements alongside deeper work on a more acute problem. At each step, we look for a practical improvement the team can use. We track results, ask the people affected and adjust as we learn.",
      "I implement suitable work myself. For larger projects, I help select vendors and manage delivery on the nonprofit's behalf. You contract with and pay them directly. We decide where automation helps, where a person must stay involved and what to do when something goes wrong.",
    ],
    opinion: "A change has to work for the people using it. Their concerns are part of the work.",
  },
  offer: {
    anchor: "technology-assessment",
    name: "Map the work together",
    heading: "Start with what happens in a normal week.",
    intro:
      "We talk to leadership and staff, look at the systems and handoffs, and choose the first improvements together. This gives the ongoing work a clear starting point.",
    looksAtLabel: "What we look at",
    looksAt: [
      "Leadership goals and the practical constraints on the team",
      "Daily processes, repeated work and the reasons things get stuck",
      "Existing tools, data quality, access and vendor responsibilities",
      "Staff concerns and the places where human contact matters",
      "The combined value of small improvements and the deeper problem to work on",
      "Who will use, monitor and maintain each solution",
    ],
    deliverable: [
      "A process and gap map, grounded in conversations and observed work.",
      "Priorities agreed with your internal lead, including quick improvements and deeper work.",
      "An incremental plan with a baseline, a measure of success and clear ownership.",
      "A handover and responsibility map: people, access, instructions and a practical check that someone can use the solution.",
    ],
    duration: "Scoped together within ongoing support",
    pricingNote:
      "An agreed bank of hours based on your needs, usually within a year-long engagement aligned with the nonprofit's planning cycle. We agree on scope, availability and response times before starting.",
  },
  next: {
    body: "We keep working through the priorities, with a weekly check-in and contact between meetings. I work remotely or on site when useful. We measure use and results, hear from the team, and decide what comes next. The aim is to keep improving everyday work throughout the engagement.",
    note: "Knowledge stays with the nonprofit too: clear instructions, simple tools and an internal person who can operate the solution and recognize when help is needed.",
  },
  writing: [
    {
      postId: "2026/people-first-company-second",
      why: "On the people affected by a technology decision.",
    },
    {
      postId: "2023/future-of-work-automation-ai",
      why: "On how automation changes work.",
    },
  ],
  siblings: ["ai-automation", "fractional-cto"],
  sitemapPriority: 0.9,
  serviceType: "Ongoing technology consulting for nonprofits",
};
