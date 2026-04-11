import type { ResultsDictionary } from "@/types/common";

export const results: ResultsDictionary = {
  pageIntro: {
    title: "Your assessment result",
    description:
      "The model returns a ranked shortlist rather than one absolute truth. Review the strongest fit, the alternatives, and the signal pattern behind the recommendation."
  },
  rankedList: {
    title: "Ranked methodology summary",
    description:
      "Start with the full order first, then inspect the strongest recommendation and the nearby alternatives."
  },
  fitLabels: {
    bestFit: "Best fit",
    strongAlternative: "Strong alternative",
    moderateFit: "Moderate fit",
    lowerFit: "Lower fit"
  },
  fitStrengthLabels: {
    strong: "Strong",
    medium: "Medium",
    borderline: "Borderline"
  },
  bestFit: {
    badge: "Best fit",
    keySignalsLabel: "Key signals",
    dimensionsLabel: "Model dimensions",
    outcomeLabel: "Outcome",
    fitStrengthLabel: "Fit strength",
    closestAlternativeLabel: "Closest alternative",
    mostSensitiveDimensionLabel: "Sensitive dimension",
    pointsLabel: "points",
    actionLabel: "Learn more about the methodology and next steps to apply it"
  },
  alternatives: {
    title: "Other viable methodologies",
    description:
      "These options still match part of the project profile, but they sit below the top recommendation once the full signal mix is considered.",
    topDimensionsLabel: "Strongest areas"
  },
  topActions: {
    download: "Download",
    copyLink: "Copy link",
    copiedLink: "Copied",
    retakeAssessment: "Retake assessment",
    pdfAction: "Download PDF",
    jsonAction: "Download JSON",
    placeholderNote: "PDF and JSON export are placeholders in this pass."
  },
  emptyState: {
    title: "No saved result is available",
    description:
      "Complete the assessment first or reopen a locally saved result code from this device.",
    requestedCodeLabel: "Requested result code",
    openAssessment: "Start assessment",
    returnHome: "Return home"
  },
  saveSection: {
    title: "Save this result",
    description:
      "Keep the result code for local restore later or use the export actions once file export is enabled.",
    resultCodeLabel: "Result code",
    exportLabel: "Available export actions"
  },
  narrative: {
    fitLabelKeyPrefix: "results.fit",
    shortRationaleTemplate: "Best aligned with {reasons}.",
    topOverviewTemplate: "{methodology} ranks first because it matches {reasons}.",
    alternativeOverviewTemplate:
      "{methodology} remains relevant because it still matches {reasons}.",
    topTradeoffTemplate:
      "{alternative} stays close, but {methodology} matches the full signal mix more directly.",
    alternativeTradeoffTemplate:
      "It remains plausible, but {topMethodology} matches the current signal mix more directly.",
    sensitivityTemplate:
      "The ranking becomes more sensitive if the project shifts on {dimension}.",
    reasonPhrases: {
      strictGovernance: "strict governance pressure",
      formalAcceptance: "formal acceptance and sign-off needs",
      regulatedEnvironment: "regulated documentation and staged control",
      stableRequirements: "stable requirements",
      changeControlledScope: "controlled scope changes",
      adaptiveScope: "changing scope and adaptive planning",
      linearDelivery: "linear delivery structure",
      milestonePlanning: "milestone-based coordination",
      structuredIterations: "structured iteration rhythm",
      regularFeedback: "regular review and feedback loops",
      continuousFlow: "continuous flow delivery",
      wipLimitedDelivery: "WIP-limited pull management",
      highRiskExploration: "high technical risk and uncertainty",
      prototypingFocus: "risk reduction through prototyping",
      architectureHeavy: "architecture-heavy system structure",
      integrationComplexity: "meaningful integration complexity",
      disciplinedTeam: "enough organisational discipline",
      lowGovernancePressure: "lighter governance pressure"
    },
    outcomeTexts: {
      waterfall:
        "Use a plan-driven stage sequence with strong upfront definition and controlled handoffs between major phases.",
      spiral:
        "Organize the next cycle around the highest-risk questions and use prototypes or exploratory work before deeper commitment.",
      gost34:
        "Use a formally staged process with explicit documentation, technical assignment discipline, and structured acceptance checkpoints.",
      rup:
        "Use disciplined iterations with early architectural stabilization, managed requirements, and stronger process control than lightweight agile methods.",
      scrum:
        "Use structured sprint-based cycles with explicit review, planning, and team accountabilities around a repeatable delivery rhythm.",
      kanban:
        "Use a flow-based system with visible work, WIP limits, and continuous reprioritization instead of fixed iteration commitments."
    }
  },
  dimensions: {
    governanceFormalisation: {
      summaries: {
        0: "Governance pressure is light, so heavy stage control is not required.",
        1: "Some governance exists, but it does not dominate the delivery model.",
        2: "Governance and approval needs are material and should shape delivery structure.",
        3: "Strict governance and formal acceptance strongly shape the process."
      }
    },
    requirementsStability: {
      summaries: {
        0: "Requirements are highly adaptive and likely to keep changing during delivery.",
        1: "Requirements have only partial stability, so adaptive planning stays important.",
        2: "Requirements are fairly stable and can support stronger upfront coordination.",
        3: "Requirements look highly stable and support a more predictive process."
      }
    },
    riskInnovationOrientation: {
      summaries: {
        0: "Technical risk and experimentation are limited in this project context.",
        1: "Some uncertainty exists, but risk does not dominate the process choice.",
        2: "Risk and innovation matter enough to influence planning and control.",
        3: "Technical uncertainty and risk reduction should strongly influence the lifecycle."
      }
    },
    iterationStructure: {
      summaries: {
        0: "The project leans toward linear progression rather than iterative delivery.",
        1: "The rhythm is more milestone-based than strongly iterative.",
        2: "The project benefits from a repeatable structured iteration rhythm.",
        3: "The work strongly favors fast iterative or flow-based delivery cycles."
      }
    },
    organisationalDiscipline: {
      summaries: {
        0: "Process discipline is light, so heavy method overhead would be hard to sustain.",
        1: "Some structure exists, but the team still needs a relatively light process load.",
        2: "The team appears disciplined enough to sustain defined roles and recurring control points.",
        3: "Strong discipline and traceability can support a more formal delivery structure."
      }
    },
    systemIntegrationComplexity: {
      summaries: {
        0: "System and integration complexity are limited, so heavyweight coordination is less necessary.",
        1: "Complexity is present but still manageable without a heavy process layer.",
        2: "Architecture and integration complexity should influence how work is coordinated.",
        3: "High system complexity favors methods that can manage architecture and integration explicitly."
      }
    }
  }
};
