import type { HomeDictionary } from "@/types/common";

export const home: HomeDictionary = {
  hero: {
    eyebrow: "Decision support for software delivery planning",
    title: "Choose a development methodology from real project context",
    description:
      "A decision-support tool that matches project context to six SDLC methodologies, returns a ranked recommendation, explains the strongest drivers, and suggests what to do next",
    primaryCta: "Start with the assessment, then explore the explanation",
    secondaryCta: "Learn how it works now",
  },
  summaryCard: {
    title: "A structured shortlist, not a black-box label",
    description:
      "The model covers plan-driven, risk-driven, regulated, iterative, and flow-based delivery patterns in one explainable workflow",
    methodologyCountLabel: "6 methodologies",
    methodologyNames: [
      "Waterfall",
      "Spiral",
      "GOST 34",
      "RUP",
      "Scrum",
      "Kanban",
    ],
    pills: ["Explainable ranking", "Actionable next steps"],
  },
  savedResult: {
    title: "Open a saved result",
    description:
      "Paste a previously copied result code to reopen an existing recommendation",
    label: "Saved result code",
    placeholder: "Enter result code",
    action: "Open result",
    helper:
      "Result restore logic is still a placeholder in this first frontend pass",
  },
  methodologies: {
    title: "Supported methodologies",
    description:
      "The tool compares six approaches that cover plan-driven, iterative, and flow-based delivery contexts",
    items: {
      waterfall: {
        title: "Waterfall",
        description:
          "Best suited to stable requirements, upfront planning, and linear delivery",
        action: "Open reference",
      },
      spiral: {
        title: "Spiral",
        description:
          "Fits projects where technical risk and uncertainty dominate the process",
        action: "Open reference",
      },
      gost34: {
        title: "GOST 34",
        description:
          "Designed for strong governance, staged documents, and formal acceptance",
        action: "Open reference",
      },
      rup: {
        title: "RUP",
        description:
          "Works well for architecture-heavy systems with disciplined iterative development",
        action: "Open reference",
      },
      scrum: {
        title: "Scrum",
        description:
          "Optimized for adaptive work in structured timeboxed iterations",
        action: "Open reference",
      },
      kanban: {
        title: "Kanban",
        description:
          "Supports continuous flow, pull-based delivery, and WIP-limited work",
        action: "Open reference",
      },
    },
  },
  banner: {
    title:
      "Start with the assessment, then review the ranked result and dive deeper only where you need context",
    description:
      "The product is designed to move from project signals to explanation and reference guidance without forcing one universal answer",
  },
};
