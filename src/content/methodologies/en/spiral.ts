import type { MethodologyContent } from "@/types/methodology";

export const spiralMethodologyContent: MethodologyContent = {
  id: "spiral",
  title: "Spiral",
  shortLabel: "Spiral",
  typeLabel: "Risk-driven",
  overview: {
    summary:
      "A risk-driven iterative model in which each cycle is shaped by the most important uncertainties, not by a fixed stage chain or a standard sprint cadence.",
    entries: [
      {
        id: "whatIs",
        title: "What Spiral is",
        description:
          "Spiral is a risk-driven iterative development model in which the project advances through repeated cycles of planning, risk analysis, engineering work, and evaluation. It was proposed to address weaknesses of purely sequential lifecycles by making risk the central organizing force of the process. The core logic is not 'iterate because iteration is fashionable,' but 'iterate in order to reduce the most important uncertainties before committing further.'"
      },
      {
        id: "coreIdea",
        title: "Core idea",
        description:
          "Instead of assuming that requirements are fully stable from the beginning or that a fixed sprint rhythm is enough, Spiral organizes progress around the identification and reduction of risk. Each cycle refines the product, but also clarifies whether the current direction is technically, operationally, or economically viable."
      },
      {
        id: "whyItMatters",
        title: "Why it matters",
        description:
          "Spiral is important because it represents a distinct strategy that none of the other supported methodologies fully replaces. Waterfall is plan-driven, Scrum is timeboxed and adaptive, Kanban is flow-based, RUP is disciplined and architecture-centered, but Spiral is the clearest representative of development where uncertainty and risk reduction dominate process structure."
      }
    ],
    signalTags: [
      { id: "riskDrivenIteration", label: "Risk-driven iteration" },
      { id: "prototypingAndEvaluation", label: "Prototyping and evaluation" },
      { id: "uncertaintyReduction", label: "Uncertainty reduction" },
      { id: "progressiveCommitment", label: "Progressive commitment" }
    ]
  },
  quickFit: {
    title: "Quick fit",
    summary:
      "Best for technically uncertain, high-risk, or innovation-heavy projects where the most dangerous issues must be explored before full-scale commitment."
  },
  firstSteps: {
    title: "How to start applying Spiral",
    intro:
      "Start by making the dominant risks explicit and designing the first cycle around them instead of around feature volume.",
    mode: "sequence",
    steps: [
      {
        id: "identifyObjectivesAndConstraints",
        title: "Identify the main project objectives and constraints",
        description:
          "Clarify what the project is trying to achieve, which constraints matter, and what would make the effort fail. Spiral starts from objectives and alternatives, not from blind execution."
      },
      {
        id: "surfaceMajorRisks",
        title: "Surface the major risks early",
        description:
          "List the most critical uncertainties: technical feasibility, integration risk, safety concerns, performance limits, stakeholder misalignment, regulatory or cost threats. Do not treat all risks equally; identify the few that can invalidate the project direction."
      },
      {
        id: "chooseRiskFocusedCycle",
        title: "Choose a cycle focused on the highest-risk issues",
        description:
          "Define the next Spiral cycle so it addresses the most dangerous questions first. This may involve prototyping, simulation, architectural trials, feasibility studies, or controlled experiments rather than full production development."
      },
      {
        id: "buildSmallestUsefulResult",
        title: "Build the smallest useful engineering result",
        description:
          "Produce an artifact that actually tests the risk: prototype, validated design option, experimental component, model, or partial implementation. The point is learning with evidence, not producing documents for their own sake."
      },
      {
        id: "evaluateWithStakeholders",
        title: "Evaluate the results with stakeholders",
        description:
          "Inspect whether the cycle reduced uncertainty, exposed new risks, or changed the project direction. Spiral depends on explicit evaluation before deeper commitment."
      },
      {
        id: "planNextCycle",
        title: "Plan the next cycle based on what was learned",
        description:
          "Use the evaluation to decide whether to continue, redirect, narrow scope, strengthen architecture, or reconsider viability. Commitment should grow only as key risks become better understood.",
        emphasis: "final"
      }
    ],
    callout: {
      id: "practicalNote",
      label: "Practical note",
      description:
        "Spiral works only when the team is willing to treat uncertainty as something to manage explicitly. If a project keeps the name but skips real risk analysis, it usually degrades into vague iteration with weak decision logic."
    }
  },
  coreElements: {
    title: "Risk cycles, evaluation, and progressive commitment",
    intro:
      "Spiral is built around recurring cycles. Each cycle combines objectives, alternatives, risk analysis, engineering action, and stakeholder evaluation. Its defining feature is that risk decides what should happen next.",
    groups: [
      {
        id: "riskCycle",
        label: "Risk cycle",
        items: [
          {
            id: "objectivesAndAlternatives",
            title: "Objectives and alternatives",
            description:
              "Each cycle begins by clarifying what is being pursued and what options exist. The process is not a blind continuation of the previous step; it is a deliberate choice about where to focus next."
          },
          {
            id: "riskAnalysis",
            title: "Risk analysis",
            description:
              "The central activity is examining what could invalidate success. This includes technical, operational, schedule, cost, integration, usability, and safety-related uncertainties."
          },
          {
            id: "engineeringResponse",
            title: "Engineering response",
            description:
              "The team performs the work needed to reduce or understand the selected risks. This may be design work, prototyping, architecture experiments, modeling, or targeted implementation."
          },
          {
            id: "evaluationAndPlanning",
            title: "Evaluation and next-cycle planning",
            description:
              "The cycle ends with review and decision. The team uses what it learned to determine whether and how the next cycle should proceed."
          }
        ]
      },
      {
        id: "prototyping",
        label: "Prototyping",
        items: [
          {
            id: "prototypeAsLearningTool",
            title: "Prototype as a learning tool",
            description:
              "In Spiral, prototypes are not only demonstrations. They are a mechanism for resolving uncertainty before expensive downstream commitment."
          },
          {
            id: "competingAlternatives",
            title: "Competing alternatives",
            description:
              "Different solution paths can be explored and compared when early certainty is not justified."
          },
          {
            id: "earlyFailureDetection",
            title: "Early failure detection",
            description:
              "The process aims to discover problems while they are still manageable, before they become late-stage redesign crises."
          }
        ]
      },
      {
        id: "progressiveCommitment",
        label: "Progressive commitment",
        items: [
          {
            id: "incrementalConfidenceBuilding",
            title: "Incremental confidence building",
            description:
              "The project should not commit full resources until key risks are better understood."
          },
          {
            id: "scopeRefinement",
            title: "Scope refinement",
            description:
              "As risks are reduced, the system definition and plan become more stable."
          },
          {
            id: "fallbackThinking",
            title: "Fallback thinking",
            description:
              "Spiral assumes that preserving strategic flexibility early is often better than overcommitting to one path too soon."
          }
        ]
      }
    ]
  },
  teamNeeds: {
    title: "What Spiral needs from the team and organization",
    items: [
      { id: "riskIdentification", text: "Ability to identify and discuss risk explicitly." },
      { id: "technicalLeadership", text: "Technical leadership strong enough to design exploratory cycles." },
      { id: "stakeholderTolerance", text: "Stakeholder tolerance for early learning work that may not look like full feature delivery." },
      { id: "prototypeWillingness", text: "Willingness to prototype or experiment before full commitment." },
      { id: "decisionDiscipline", text: "Decision discipline to evaluate results honestly after each cycle." },
      { id: "organizationalRedirection", text: "Enough organizational maturity to redirect based on evidence." },
      { id: "balanceProgressAndUncertainty", text: "Capacity to balance engineering progress with uncertainty reduction." }
    ],
    callout: {
      id: "practicalNote",
      label: "Practical note",
      description:
        "Spiral is demanding because it requires real judgement. It is not a simple ritual framework. Teams and managers must be comfortable with uncertainty, controlled exploration, and evidence-based redirection."
    }
  },
  commonMistakes: {
    title: "What usually goes wrong",
    items: [
      { id: "genericIteration", text: "Calling any iterative work 'Spiral' without real risk analysis." },
      { id: "paperworkRiskDiscussion", text: "Treating risk discussion as a paperwork formality." },
      { id: "prototypeWithoutGoals", text: "Prototyping without clear learning goals." },
      { id: "activityWithoutEvidence", text: "Running cycles that generate activity but not decision-quality evidence." },
      { id: "prematureCommitment", text: "Escalating commitment before the major risks are understood." },
      { id: "useInRoutineProjects", text: "Using Spiral in low-uncertainty routine projects where the added overhead is unnecessary." },
      { id: "openEndedExperimentation", text: "Confusing open-ended experimentation with disciplined risk-driven progress." },
      { id: "wrongStakeholders", text: "Failing to involve the right stakeholders in cycle evaluation." },
      { id: "tooManyRisks", text: "Identifying too many risks without prioritizing the dominant ones." }
    ],
    callout: {
      id: "whyTheseMistakesMatter",
      label: "Why these mistakes matter",
      description:
        "Spiral does not fail because iteration is weak. It fails when teams keep the looping structure but remove the risk logic. Once that happens, the method loses the reason it exists and becomes an expensive imitation of generic iterative development."
    }
  },
  applicability: {
    title: "Where Spiral fits best",
    goodFit: [
      { id: "highTechnicalUncertainty", text: "Technical uncertainty is high." },
      { id: "innovationOrRnD", text: "The project contains strong innovation or R&D elements." },
      { id: "unclearFeasibility", text: "Early architecture or feasibility is unclear." },
      { id: "riskReductionPriority", text: "Risk reduction matters more than immediate feature throughput." },
      { id: "highLateFailureCost", text: "The cost of late failure would be high." },
      { id: "exploreAlternativePaths", text: "Alternative solution paths need to be explored." },
      { id: "progressiveCommitmentStakeholders", text: "Stakeholders can support progressive commitment instead of demanding full certainty from the start." }
    ],
    weakerFit: [
      { id: "stableRequirements", text: "Requirements are already stable and well understood." },
      { id: "routineStructuredDelivery", text: "The project is routine enough for simpler structured delivery." },
      { id: "continuousServiceFlow", text: "Continuous service flow is a better description of the work than project cycles." },
      { id: "weakRiskMaturity", text: "The organization lacks the maturity to manage risk explicitly." },
      { id: "fixedLightweightFramework", text: "Stakeholders want a fixed lightweight framework with simple cadence." },
      { id: "formalStagedGovernance", text: "The context is dominated by formal staged governance rather than exploratory uncertainty reduction." },
      { id: "unjustifiedOverhead", text: "The added analytical overhead is not justified by the risk profile." }
    ],
    callout: {
      id: "practicalNote",
      label: "Practical note",
      description:
        "Spiral is strongest when uncertainty is not a side issue but the core issue. It becomes weaker when the project is sufficiently predictable that simpler plan-driven or iteration-driven approaches can deliver with less overhead."
    }
  },
  notCoveredHere: {
    title: "What this page does not cover",
    items: [
      { id: "lifecycleHistoryDebate", text: "Full historical debate around software lifecycle models." },
      { id: "quantitativeRiskAnalysis", text: "Detailed quantitative risk analysis techniques." },
      { id: "contractManagement", text: "Formal contract management in high-risk procurement settings." },
      { id: "advancedLifecycleCombinations", text: "Advanced combinations of Spiral with other lifecycles." },
      { id: "domainPrototypingMethods", text: "Detailed prototyping methods by domain." },
      { id: "enterpriseGovernanceTailoring", text: "Enterprise governance tailoring for Spiral-based programs." }
    ]
  },
  studyNext: {
    title: "Suggested future learning path",
    items: [
      { id: "riskDrivenDevelopment", text: "Study the original logic of risk-driven software development." },
      { id: "prioritizeDominantRisks", text: "Learn how to identify and prioritize dominant project risks." },
      { id: "compareWithWaterfall", text: "Compare Spiral with Waterfall in uncertain environments." },
      { id: "compareWithRup", text: "Compare Spiral with RUP in architecture-heavy but less exploratory contexts." },
      { id: "prototypingTechnique", text: "Explore prototyping as a risk-reduction technique." },
      { id: "decisionMakingUnderUncertainty", text: "Study decision-making under uncertainty in software engineering." }
    ]
  }
};
