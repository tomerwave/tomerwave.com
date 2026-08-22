export interface ServiceWritingPick {
  postId: string;
  why: string;
}

export interface Service {
  slug: string;
  shortName: string;
  documentTitle: string;
  pageHeading: string;
  eyebrow: string;
  description: string;
  lede: string;
  routerProblem: string;
  routerBody: string;
  who: string;
  triggers: string[];
  onePager: {
    triggerIndexes: number[];
    deliverableIndexes: number[];
  };
  help: {
    heading: string;
    body: string[];
    opinion: string;
  };
  offer: {
    anchor: string;
    name: string;
    heading: string;
    intro: string;
    looksAtLabel: string;
    looksAt: string[];
    deliverable: string[];
    duration: string;
    pricingNote: string;
  };
  next: {
    body: string;
    note?: string;
  };
  writing: ServiceWritingPick[];
  siblings: string[];
  sitemapPriority: number;
  serviceType: string;
}

export const SERVICES: Service[] = [
  {
    slug: "fractional-vp-rnd",
    shortName: "R&D Advisory",
    documentTitle: "R&D Advisory & Fractional VP R&D",
    pageHeading: "R&D Advisory & Fractional VP R&D",
    eyebrow: "R&D Advisory",
    description:
      "Your engineering team grew, but delivery got slower. I help figure out why, what actually needs to change, and what can wait. As an advisor, or as an embedded fractional VP R&D.",
    lede: "Your engineering team grew, but delivery got slower. I help figure out why, what actually needs to change, and what can wait. Hire a fractional VP R&D for the months you need one, without the full-time hire.",
    routerProblem: "Your team grew, but delivery got slower.",
    routerBody:
      "More engineers, less predictable output. Ownership is fuzzy. You've become the bottleneck on decisions you never wanted to own. This is the work I've done longest: as a founding engineer, as a team lead, and as a part-time and fractional VP of R&D.",
    who: "Founders and CTOs at seed to Series A, usually somewhere between five and twenty-five engineers. Or earlier, when there's nobody senior enough to push back on the technical calls and a full-time VP doesn't make sense yet. I'm based in Israel and work with teams here and remotely across Europe and the US.",
    triggers: [
      "Engineering feels slower than it should, and nobody can say exactly why.",
      "The team grew quickly. The structure around it didn't.",
      "You're the bottleneck. Decisions wait for you.",
      "Delivery is inconsistent. Some quarters land, some don't.",
      "Ownership is unclear, and work falls between people.",
      "Technical debt has stopped being theoretical.",
      "You're starting to wonder whether it's time to hire a VP R&D.",
    ],
    onePager: {
      triggerIndexes: [0, 1, 2],
      deliverableIndexes: [0, 1, 2, 3],
    },
    help: {
      heading: "How I help",
      body: [
        "Two shapes, and most engagements move between them. **Advisory** is the lighter one: we talk regularly, you bring the hard calls, I help you make them and tell you when I think you're wrong.",
        "**Embedded** is the heavier one. I take the VP R&D seat part-time: strategy, architecture, hiring, delivery, and the day-to-day of a team that ships. Until you're ready to fill the seat properly, or until you decide you don't need to yet.",
      ],
      opinion:
        "Most teams don't need more process. They need clearer ownership and fewer people waiting on one person.",
    },
    offer: {
      anchor: "health-check",
      name: "R&D Health Check",
      heading: "Start with an R&D Health Check",
      intro:
        "A short, focused look at how engineering actually works here. Not an audit in the uncomfortable sense. I talk to people, read some code, watch how work moves, and tell you what I see.",
      looksAtLabel: "What I look at",
      looksAt: [
        "Team structure and who owns what",
        "How work moves from idea to production",
        "Delivery: what ships, what slips, and why",
        "Architecture at a high level",
        "Technical debt that's costing you now",
        "Tooling and the friction around it",
        "Hiring, seniority gaps, and what you're missing",
        "Engineering culture, as practiced rather than as written",
      ],
      deliverable: [
        "What's working, and worth protecting.",
        "The biggest problems, and why they're happening. The cause rather than the symptom.",
        "What to fix in what order.",
        "What to change over the next 30, 60, and 90 days.",
      ],
      duration: "One to two weeks",
      pricingNote:
        "No price listed, because the scope varies more than I'd like to pretend. Tell me your team size and what's hurting, and I'll give you a number.",
    },
    next: {
      body: "Some people take the assessment and run it themselves, which is a perfectly good outcome. Most ask me to stay for the parts that are hardest to do alone: the hiring, the reorganizing, and the architecture decision sitting underneath all of it.",
      note: "That usually turns into a fractional VP R&D arrangement, or standing advisory.",
    },
    writing: [
      {
        postId: "2026/people-first-company-second",
        why: "What culture actually means, once you stop writing it on a wall.",
      },
      {
        postId: "2024/mastering-employee-onboarding",
        why: "Hiring is the easy half. This is the other half.",
      },
      {
        postId: "2023/effective-mentoring-junior-developers",
        why: "On closing seniority gaps without slowing everyone down.",
      },
    ],
    siblings: ["architecture-review", "ai-automation"],
    sitemapPriority: 0.9,
    serviceType: "Engineering leadership and R&D advisory",
  },

  {
    slug: "architecture-review",
    shortName: "Architecture",
    documentTitle: "Architecture Review & Technical Strategy",
    pageHeading: "Architecture & Technical Strategy",
    eyebrow: "Architecture",
    description:
      "A technical decision is coming that's hard to undo. An architecture review tells you what to change, what to leave alone, and what to decide later, before it gets expensive.",
    lede: "A decision is coming that's hard to undo. It's much cheaper to think it through now than to find out in eight months.",
    routerProblem: "A decision is coming that's hard to undo.",
    routerBody:
      "Rewrite or refactor. Build or buy. What ships first, and what that locks you into. A rewrite is often the wrong first move, and it's cheaper to find that out before you start than after.",
    who: "Founders, CTOs, and engineering leads facing a decision they'll be living with for years. Often people who already have an instinct about the answer and want someone with no stake in it to check.",
    triggers: [
      "The system is struggling in ways that aren't obviously fixable.",
      "Technical debt has started costing real delivery time.",
      "A big architectural decision is coming up.",
      "Someone has proposed a rewrite.",
      "You're building a new product on top of the existing one.",
      "Growth is coming and you're not sure what breaks first.",
      "You want a second opinion from someone with nothing riding on the answer.",
    ],
    onePager: {
      triggerIndexes: [0, 1, 2],
      deliverableIndexes: [0, 1, 2, 3],
    },
    help: {
      heading: "How I help",
      body: [
        "I look at what you have, what you're planning, and what's likely to break between here and there. Then I tell you what I'd do, including the parts I'd leave alone, which is usually more of it than people expect.",
        "I've split monoliths without downtime, built systems handling tens of millions of events a second, and rebuilt a codebase by hand that should never have been generated in the first place. Most of what I've learned is about what not to touch.",
      ],
      opinion:
        "Most systems don't need to be replaced. They need two or three things fixed and one thing decided properly.",
    },
    offer: {
      anchor: "architecture-review",
      name: "Architecture Review",
      heading: "Start with an Architecture Review",
      intro:
        "I read the system and the plan, talk to the people who maintain it, and come back with an honest view of what's actually at risk.",
      looksAtLabel: "What I look at",
      looksAt: [
        "The architecture as it exists, not as documented",
        "Major components and how they depend on each other",
        "Data flows and where they get complicated",
        "Infrastructure and what it costs to run",
        "Scaling and reliability risk, specifically",
        "Technical debt worth paying down, and debt worth keeping",
        "The constraints your team actually works under",
        "What you're planning to build next",
      ],
      deliverable: [
        "Where you are now, described plainly.",
        "The real risks, separated from the theoretical ones.",
        "What should stay. What should change.",
        "A target architecture worth aiming at, and a migration plan that doesn't require stopping everything else.",
        "The decisions I think you should deliberately postpone, and what you'd need to know to make them later.",
      ],
      duration: "A few days to two weeks",
      pricingNote:
        "Depends on how much system there is. Send me a rough shape of it and I'll tell you what it takes.",
    },
    next: {
      body: "Usually one of three things. I help lead the migration, I stay on for the decisions as they come up, or you take the plan and do it yourselves. All three are fine, and the third one is not a failure.",
    },
    writing: [
      {
        postId: "2025/from-code-to-business-generics",
        why: "On building for a general case that never arrives.",
      },
      {
        postId: "2026/building-in-the-dark",
        why: "On deciding when you don't have enough information, and doing it anyway.",
      },
    ],
    siblings: ["fractional-vp-rnd", "ai-automation"],
    sitemapPriority: 0.8,
    serviceType: "Software architecture review and technical strategy",
  },

  {
    slug: "ai-automation",
    shortName: "AI & Automation",
    documentTitle: "AI & Automation",
    pageHeading: "AI & Automation",
    eyebrow: "AI & Automation",
    description:
      "Too much of the work is still manual. Not all of it should be automated. I help find the parts that should be, build them, and make them reliable enough to trust.",
    lede: "Too much of the work is still manual. Not all of it should be automated. I help find the parts that should be, then build them.",
    routerProblem: "Too much of the work is still manual.",
    routerBody:
      "People moving information between systems, answering the same question for the fortieth time, filling in the same form. Not every process should be automated. I help find the ones that should be, then build them.",
    who: "Companies and organizations with real repetitive work: operations, support, admin, reporting. Often teams already using AI tools inconsistently, with not much to show for it yet.",
    triggers: [
      "People spend hours moving information between systems.",
      "The same questions get answered by hand, over and over.",
      "Your team uses AI tools inconsistently, and nobody can point at the gain.",
      "You want agents but you're not sure what's actually worth building.",
      "Someone built an automation last year and now nobody quite trusts it.",
      "Leadership wants AI on the roadmap and nobody wants to own the maintenance.",
    ],
    onePager: {
      triggerIndexes: [0, 1, 2],
      deliverableIndexes: [0, 1, 2, 3],
    },
    help: {
      heading: "How I help",
      body: [
        "I start with the work, not the technology. Which workflows are expensive, repetitive, and stable enough to be worth automating. Then which of those are reliable enough to trust once they're running unattended.",
        "Then I build them, or lead the people building them. I do both halves on purpose. The plan is more honest when the person writing it has to build the thing afterwards.",
      ],
      opinion:
        "Anything that has to be right every single time is a bad first candidate. Start where being occasionally wrong is survivable, and where you can tell that it happened.",
    },
    offer: {
      anchor: "opportunity-audit",
      name: "AI & Automation Opportunity Audit",
      heading: "Start with an Opportunity Audit",
      intro:
        "I go through the work your people actually do, week by week, and find where a machine would genuinely do it better. Some of what I find won't be AI at all. That's usually a good sign.",
      looksAtLabel: "Where I look",
      looksAt: [
        "Operations and the handoffs between teams",
        "Support and the questions that repeat",
        "Sales and admin work",
        "Engineering workflows",
        "Reporting, and who assembles it by hand",
        "Internal knowledge nobody can find",
        "Decisions people repeat every week",
        "Data entry, and data moving between systems",
      ],
      deliverable: [
        "Usually around ten opportunities, written down with the hours each one actually costs today.",
        "Each scored on business impact, build complexity, how reliable it needs to be, security and privacy, running cost, and who maintains it when it breaks.",
        "The three I'd actually do, with the case for each and what it would take.",
        "The ones I'd leave alone, and why.",
      ],
      duration: "Scoped per audit",
      pricingNote:
        "Depends on how many workflows there are and how deep we go into them. A first conversation is usually enough to size it.",
    },
    next: {
      body: "Design the ones you pick, build them, wire them into the systems you already run, then measure whether they did what we said they would. Then either hand them over properly, or stay on to maintain them.",
      note: "Strategy and implementation from the same person. It's the main reason the estimates hold up.",
    },
    writing: [
      {
        postId: "2023/future-of-work-automation-ai",
        why: "Written before the hype cycle. Holds up better than it should.",
      },
      {
        postId: "2026/the-year-we-spent-convincing-ourselves",
        why: "On building something nobody asked for. The same failure mode kills automation projects.",
      },
      {
        postId: "2026/someone-else-built-it",
        why: "On watching a problem you understood get solved by someone else.",
      },
    ],
    siblings: ["fractional-vp-rnd", "technology-advisor"],
    sitemapPriority: 0.8,
    serviceType: "AI and workflow automation consulting",
  },

  {
    slug: "technology-advisor",
    shortName: "Technology Advisory",
    documentTitle: "Technology Advisor for Organizations Without a CTO",
    pageHeading: "Technology Advisor",
    eyebrow: "Technology Advisory",
    description:
      "You don't need a full-time CTO. You need someone technical you can trust when making expensive technology decisions. Reading the proposals, checking the quotes, and telling you plainly what's worth doing.",
    lede: "You don't need a full-time CTO. You need someone technical you can trust when making expensive technology decisions.",
    routerProblem: "You're spending on technology without anyone technical on your side.",
    routerBody:
      "Vendors, quotes, and projects nobody internally can fully evaluate. Staff time going into work a computer should be doing. You need someone technical in the room who works for you.",
    who: "Nonprofits, associations, education organizations, professional services firms, and family-run businesses. Organizations that depend on software and outside vendors, but have nobody internal whose job it is to evaluate either.",
    triggers: [
      "A vendor has quoted you for a project and you can't tell whether the number is fair.",
      "Someone is proposing software you don't fully understand.",
      "Staff spend hours every week on work a computer should be doing.",
      "Your systems don't talk to each other, and everyone has a workaround.",
      "You're being told you should be using AI, and nobody can say where it would actually help.",
      "A project is going badly and you can't tell whose fault it is.",
      "You need someone technical in the room who is working for you.",
    ],
    onePager: {
      triggerIndexes: [0, 1, 2],
      deliverableIndexes: [0, 1, 2, 3],
    },
    help: {
      heading: "How I help",
      body: [
        "I sit on your side of the table. I read the proposals, ask the vendor the questions you'd ask if you knew which ones to ask, and tell you plainly what I'd do.",
        "Sometimes that's \"this is a fair price and they know what they're doing.\" Sometimes it's \"you don't need this at all.\" Both are useful, and the second one is usually worth more.",
      ],
      opinion:
        "The cheapest technology project is the one you talk yourself out of. A good advisor saves you more by what they stop than by what they build.",
    },
    offer: {
      anchor: "technology-assessment",
      name: "Technology Assessment",
      heading: "Start with a Technology Assessment",
      intro:
        "I spend time understanding how your organization actually works, rather than how the org chart says it works. Then I answer one question: what should you improve, replace, automate, buy, build, or simply leave alone?",
      looksAtLabel: "What I look at",
      looksAt: [
        "How the work really gets done, day to day",
        "The tools and systems you already pay for",
        "What's still done by hand, and how long it takes",
        "Where the friction is, according to the people in it",
        "Projects coming up in the next year",
        "Your vendors and what they're delivering",
        "What you're currently spending, and on what",
      ],
      deliverable: [
        "A short roadmap in plain language. What's worth doing, in what order, and roughly what each one involves.",
        "Which tools to keep, which to drop, and which you're paying for twice.",
        "Where automation would genuinely give staff time back, with the hours attached.",
        "Where a vendor is worth the money, and where you'd be buying something you don't need.",
        "What I'd leave exactly as it is.",
      ],
      duration: "Scoped per organization",
      pricingNote:
        "It depends on the size of the organization and how many systems are involved. A first conversation costs nothing and usually makes the shape clear.",
    },
    next: {
      body: "Most organizations don't need a technical person full-time. They need one available. The usual continuation is a standing arrangement. You send me the vendor proposal, the quote, the contract, the question about whether AI would help with something. I answer within a day or two. No project, no minimum.",
      note: "I can also oversee a project you've already committed to, and hold the vendor to what they promised.",
    },
    writing: [
      {
        postId: "2023/future-of-work-automation-ai",
        why: "A practical look at what automation changes, and what it doesn't.",
      },
      {
        postId: "2026/people-first-company-second",
        why: "On the part of any technology decision that's really about people.",
      },
    ],
    siblings: ["ai-automation", "fractional-vp-rnd"],
    sitemapPriority: 0.8,
    serviceType: "Independent technology advisory",
  },
];

export const getService = (slug: string) => SERVICES.find((service) => service.slug === slug);

export const servicePath = (slug: string) => `/services/${slug}`;

export const onePagerPath = (slug: string) => `/one-pagers/${slug}.pdf`;
