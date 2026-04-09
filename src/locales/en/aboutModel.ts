import type { AboutModelDictionary } from "@/types/common";

export const aboutModel: AboutModelDictionary = {
  pageIntro: {
    title: "About the recommendation model",
    description:
      "Methodology Match uses a structured rule-based model that turns project context into a ranked methodology recommendation"
  },
  overview: {
    title: "What the model does",
    description:
      "The model is designed as transparent decision support for early methodology selection, not as a black-box predictor",
    items: [
      "Collects structured signals about governance, requirements, uncertainty, delivery rhythm, discipline, and system complexity",
      "Aggregates those signals into six dimensions that stay readable to the user",
      "Maps the dimension profile to methodology patterns and returns a ranked shortlist with rationale"
    ]
  },
  dimensions: {
    title: "The six evaluation dimensions",
    description:
      "The questionnaire groups project context into six dimensions that summarise the main drivers behind methodology fit",
    scaleNote: "Each dimension is interpreted on an ordinal 0-3 scale rather than as a false-precision score",
    items: {
      governanceFormalisation: {
        label: "Dimension 1",
        title: "Governance Formalisation",
        description: "Regulation, staged approvals, compliance pressure, and the need for formal documentation"
      },
      requirementsStability: {
        label: "Dimension 2",
        title: "Requirements Stability",
        description: "How fixed the requirements are before delivery and how tightly later changes must be controlled"
      },
      riskInnovationOrientation: {
        label: "Dimension 3",
        title: "Risk & Innovation Orientation",
        description: "Technical uncertainty, experimentation, novelty, and the project’s exposure to critical risk"
      },
      iterationStructure: {
        label: "Dimension 4",
        title: "Iteration Structure",
        description: "Whether the work fits linear phases, milestone loops, timeboxed iterations, or continuous flow"
      },
      organisationalDiscipline: {
        label: "Dimension 5",
        title: "Organisational Discipline",
        description: "Role clarity, process maturity, and the organisation’s ability to sustain agreed working rules"
      },
      systemIntegrationComplexity: {
        label: "Dimension 6",
        title: "System & Integration Complexity",
        description: "System scale, architectural coupling, integration load, and enterprise-style technical constraints"
      }
    }
  },
  rankedOutput: {
    title: "Why the result is ranked",
    description:
      "Methodology fit is contextual, so the system shows a ranking instead of pretending that one answer is universally correct for every project nuance",
    items: [
      "Multiple methods can be plausible in the same context",
      "Close alternatives reveal trade-offs instead of hiding them",
      "Ranking is more honest than forcing a rigid binary answer"
    ]
  },
  explainability: {
    title: "Explainability and sensitivity",
    description:
      "The output is meant to be interpreted, not merely accepted. The model exposes why a fit appears strong and where the recommendation may be sensitive",
    themes: {
      explainability: {
        title: "Explainability",
        description:
          "The recommendation can highlight the strongest dimensions, the signals that mattered most, and the alternatives that remained close",
        items: ["Strongest dimensions", "Relevant project signals", "Visible trade-offs"]
      },
      sensitivity: {
        title: "Sensitivity and stability",
        description:
          "Some rankings are robust, while others depend on a few high-impact assumptions. Small changes in key dimensions can shift a close result",
        items: [
          "Close-fit cases need interpretation",
          "Changing one key dimension can reorder the shortlist",
          "Stable fits tend to show clearer separation"
        ]
      }
    }
  },
  limitations: {
    title: "Scope and limitations",
    description:
      "The model has a clear purpose and equally clear boundaries. Those boundaries are part of the product design, not a weakness to hide",
    items: [
      "Supports early-stage methodology selection rather than ongoing project control",
      "Does not statistically predict project success",
      "Does not replace expert judgement or stakeholder negotiation",
      "Does not fully model every hybrid process variation",
      "Depends on the quality of structured user input",
      "Is intentionally limited to six methodologies in the current version"
    ]
  },
  closing: {
    title: "Use the model as orientation, then move to action",
    description:
      "After understanding the model, the next useful step is to run the assessment or open the reference pages for the supported methods",
    actions: {
      assessment: "Start assessment",
      howItWorks: "Read how it works",
      methodologies: "Browse methodologies"
    }
  }
};
