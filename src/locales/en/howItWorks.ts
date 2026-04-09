import type { HowItWorksDictionary } from "@/types/common";

export const howItWorks: HowItWorksDictionary = {
  pageIntro: {
    title: "How it works",
    description:
      "The recommendation follows a compact rule-based workflow that connects project context with methodology fit in a transparent way"
  },
  workflow: {
    title: "From answers to recommendation",
    description:
      "The model groups questionnaire input into six dimensions, maps the strongest signals to methodology patterns, and returns an explainable ranking",
    summaryTitle: "What you get",
    stepLabelPrefix: "Step",
    summaryItems: [
      "A ranked recommendation across all six methods",
      "The strongest context drivers behind the top fit",
      "Close alternatives and trade-offs",
      "Practical next-step guidance after selection"
    ],
    steps: {
      answer: {
        title: "Answer",
        meta: "6 blocks"
      },
      score: {
        title: "Score",
        meta: "6 dimensions"
      },
      rank: {
        title: "Rank",
        meta: "6 methods"
      },
      explain: {
        title: "Explain",
        meta: "drivers + trade-offs"
      }
    }
  },
  dimensions: {
    title: "The six decision dimensions",
    description:
      "Each dimension captures one part of project context. Together they form the profile used for selection",
    items: {
      governanceFormalisation: {
        label: "Dimension 1",
        title: "Governance Formalisation",
        description: "Regulation, staged documentation, formal approvals, and compliance pressure"
      },
      requirementsStability: {
        label: "Dimension 2",
        title: "Requirements Stability",
        description: "How fixed the requirements are and how controlled changes need to be"
      },
      riskInnovationOrientation: {
        label: "Dimension 3",
        title: "Risk & Innovation Orientation",
        description: "Technical uncertainty, criticality, and the role of experimentation or R&D"
      },
      iterationStructure: {
        label: "Dimension 4",
        title: "Iteration Structure",
        description: "Linear delivery, milestone phases, timeboxed iterations, or continuous flow"
      },
      organisationalDiscipline: {
        label: "Dimension 5",
        title: "Organisational Discipline",
        description: "Process maturity, role clarity, and the ability to sustain structure"
      },
      systemIntegrationComplexity: {
        label: "Dimension 6",
        title: "System & Integration Complexity",
        description: "Architecture scale, integrations, and enterprise-level technical constraints"
      }
    }
  },
  rules: {
    title: "How the rules are applied",
    description:
      "The system does not guess randomly. It maps strong context signals to methodology patterns at a high level",
    items: {
      gostLikeFit: {
        title: "Strict governance",
        description: "Leans toward GOST-like fit when formal approvals and regulation dominate"
      },
      waterfallFit: {
        title: "Stable requirements + linear flow",
        description: "Points toward Waterfall when staged delivery and change control are central"
      },
      spiralFit: {
        title: "Risk-driven iteration",
        description: "Supports Spiral when uncertainty, criticality, and experimentation are strong"
      },
      rupFit: {
        title: "Architecture-heavy systems + disciplined iteration",
        description: "Supports RUP for structured iterative work around complex enterprise systems"
      },
      scrumFit: {
        title: "Structured adaptive cycles",
        description: "Supports Scrum when team cadence and timeboxed learning loops are a good fit"
      },
      kanbanFit: {
        title: "Continuous flow + WIP-limited delivery",
        description: "Supports Kanban for evolving priorities, service work, and flow optimisation"
      }
    }
  },
  explainability: {
    title: "Why the result is explainable",
    description:
      "The output highlights the strongest dimensions, shows close alternatives, and makes trade-offs visible instead of returning one unexplained label",
    items: ["Ranked output", "Drivers", "Trade-offs"]
  }
};
