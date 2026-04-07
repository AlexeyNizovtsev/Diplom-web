import type { HomeDictionary } from "@/types/common";

export const home: HomeDictionary = {
  hero: {
    eyebrow: "Decision support for software delivery planning",
    title: "Choose a development methodology from real project context.",
    description:
      "Assess project signals, compare six methodologies, and get a ranked recommendation with the strongest drivers and practical next steps.",
    primaryCta: "Start assessment",
    secondaryCta: "Learn how it works"
  },
  summaryCard: {
    title: "A structured shortlist, not a black-box label",
    description:
      "The model covers plan-driven, risk-driven, regulated, iterative, and flow-based delivery patterns in one explainable workflow.",
    methodologyCountLabel: "6 methodologies",
    methodologyNames: ["Waterfall", "Spiral", "GOST 34", "RUP", "Scrum", "Kanban"],
    pills: ["Explainable ranking", "Actionable next steps"]
  },
  savedResult: {
    title: "Open a saved result",
    description:
      "Paste a previously copied result code to reopen an earlier recommendation without repeating the questionnaire.",
    label: "Saved result code",
    placeholder: "Enter result code",
    action: "Open result",
    helper: "Result restore logic is still a placeholder in this first frontend pass."
  },
  methodologies: {
    title: "Supported methodologies",
    description:
      "Compare six approaches spanning plan-driven, iterative, regulated, risk-driven, and flow-based project contexts.",
    items: {
      waterfall: {
        title: "Waterfall",
        description: "Sequential delivery for stable requirements and stage-based control.",
        action: "Open reference"
      },
      spiral: {
        title: "Spiral",
        description: "Risk-driven iteration for uncertainty, criticality, and learning loops.",
        action: "Open reference"
      },
      gost34: {
        title: "GOST 34",
        description: "Formal staged development for regulated environments and strict approvals.",
        action: "Open reference"
      },
      rup: {
        title: "RUP",
        description: "Disciplined iterative delivery for architecture-heavy enterprise systems.",
        action: "Open reference"
      },
      scrum: {
        title: "Scrum",
        description: "Structured adaptive cycles with timeboxed planning and team cadence.",
        action: "Open reference"
      },
      kanban: {
        title: "Kanban",
        description: "Continuous flow with WIP limits for evolving priorities and service work.",
        action: "Open reference"
      }
    }
  },
  banner: {
    title: "Start with the assessment, then review the ranked result and dive deeper only where you need context.",
    description:
      "The product is designed to move from project signals to explanation and reference guidance without forcing one universal answer."
  }
};

