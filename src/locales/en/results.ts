import type { ResultsDictionary } from "@/types/common";

export const results: ResultsDictionary = {
  pageIntro: {
    title: "Your assessment result",
    description:
      "The model returns a ranked shortlist rather than one absolute truth. Review the strongest fit, the alternatives, and the signal pattern behind the recommendation.",
  },
  rankedList: {
    title: "Ranked methodology list",
    description:
      "Start with the full order first, then inspect the strongest recommendation and the nearby alternatives.",
    jumpLabel: "Jump to methodology section",
  },
  fitLabels: {
    bestFit: "Best fit",
    strongAlternative: "Strong alternative",
    moderateFit: "Moderate fit",
    lowerFit: "Lower fit",
  },
  fitStrengthLabels: {
    strong: "Strong",
    medium: "Medium",
    borderline: "Borderline",
  },
  bestFit: {
    sectionTitle: "Best-fit methodology",
    sectionDescription:
      "Start with the primary recommendation first. In composite cases, review the strongest supporting methodology right after it.",
    badge: "Best fit",
    keySignalsLabel: "Key signals",
    dimensionsLabel: "Model dimensions",
    outcomeLabel: "Outcome",
    fitStrengthLabel: "Fit strength",
    closestAlternativeLabel: "Closest alternative",
    mostSensitiveDimensionLabel: "Sensitive dimension",
    pointsLabel: "points",
    actionLabel: "Learn more about the methodology and next steps to apply it",
  },
  alternatives: {
    title: "Other viable methodologies",
    description:
      "These options still match part of the project profile, but they sit below the top recommendation once the full signal mix is considered.",
    topDimensionsLabel: "Strongest areas",
    expandActionLabel: "Expand methodology card",
    collapseActionLabel: "Collapse methodology card",
  },
  topActions: {
    download: "Download",
    viewAnswers: "View answers",
    copyLink: "Copy link",
    copiedLink: "Copied",
    retakeAssessment: "Retake assessment",
    pdfAction: "Download PDF",
    jsonAction: "Download JSON",
    preparingPdfAction: "Preparing PDF...",
    preparingJsonAction: "Preparing JSON...",
    placeholderNote:
      "PDF is generated from the current result view. JSON includes the structured result object and the answer summary.",
    exportFailedMessage:
      "The export could not be generated. Try again with the current result still open.",
    copySuccessMessage: "Copied successfully.",
    resetConfirmation:
      "Start the assessment again? Your current results will be lost if you do not save them first.",
  },
  emptyState: {
    title: "No saved result is available",
    description:
      "Complete the assessment first or reopen a locally saved result code from this device.",
    requestedCodeLabel: "Requested result code",
    openAssessment: "Start assessment",
    returnHome: "Return home",
  },
  saveSection: {
    title: "Save this result",
    description:
      "Keep the result code for local restore later, or download the current result as a file.",
    resultCodeLabel: "Result code",
    exportLabel: "Save as",
  },
  export: {
    createdAtLabel: "Created at",
    exportedAtLabel: "Exported at",
    questionnaireVersionLabel: "Questionnaire version",
    localeLabel: "Locale",
    methodologyDetailsLabel: "Methodology details",
    answersSectionTitle: "Assessment answers",
    answersSectionDescription:
      "These are the concise answers that produced the recommendation shown above.",
  },
  interpretation: {
    eyebrow: "Recommendation interpretation",
    summaryLabel: "How to read this result",
    primaryReasonLabel: "Why the top methodology leads",
    secondaryReasonLabel: "Why the next methodology still matters",
    supportNoteLabel: "Supporting note",
    modeHeadings: {
      single_fit: "Primary recommendation",
      composite_strategy: "Composite strategy case",
      close_fit: "Close alternative case",
    },
    modeSummaries: {
      single_fit:
        "This result is best read as a clear primary fit. The top methodology covers the dominant project pattern, while the next option stays secondary.",
      composite_strategy:
        "This result should be read as a combined process strategy case: the leader covers the dominant constraint, while the next method remains strategically important for a different role.",
      close_fit:
        "This result should be read as a close decision between two plausible options rather than a one-sided winner.",
    },
    primaryTemplates: {
      single_fit:
        "{topMethodology} is the clearest primary fit because it most directly matches the dominant {topRole} role in this project profile.",
      composite_strategy:
        "{topMethodology} ranks first because it covers the dominant {topRole} role that shapes the project most strongly.",
      close_fit:
        "{topMethodology} stays first because it aligns slightly more directly with the current signal mix and priorities.",
    },
    secondaryTemplates: {
      single_fit:
        "{secondMethodology} remains a relevant alternative, but its {secondRole} emphasis is not strong enough to change the primary reading of the result.",
      composite_strategy:
        "{secondMethodology} still matters because the project also shows a strongly active {secondRole} role that needs an explicit complementary strategy.",
      close_fit:
        "{secondMethodology} stays close because it emphasizes {secondRole}, so it remains a near alternative rather than a composite recommendation.",
    },
    supportFlagTemplates: {
      architecture_supporting_option:
        "{methodology} remains relevant as an architecture-supporting option because complexity, discipline, and iteration structure are all elevated.",
      risk_supporting_option:
        "{methodology} remains relevant as a risk-supporting option because uncertainty and technical risk still require explicit process attention.",
    },
    roleLabels: {
      governance: "governance and formal control",
      sequential_delivery: "sequential delivery",
      risk_driven: "risk-driven execution",
      architecture_control: "architecture and integration control",
      adaptive_iterations: "adaptive iterations",
      flow_control: "flow control",
    },
    methodologyLabels: {
      primary_recommendation: "Primary recommendation",
      dominant_constraint_match: "Dominant constraint match",
      critical_complementary_strategy: "Critical complementary strategy",
      best_current_fit: "Best current fit",
      close_alternative: "Close alternative",
      architecture_supporting_option: "Architecture-supporting option",
      risk_supporting_option: "Risk-supporting option",
    },
  },
  narrative: {
    fitLabelKeyPrefix: "results.fit",
    shortRationaleTemplate: "Best aligned with {reasons}.",
    topOverviewTemplate:
      "{methodology} ranks first because it matches {reasons}.",
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
      lowGovernancePressure: "lighter governance pressure",
    },
    outcomeTexts: {
      waterfall:
        "Use a plan-driven stage sequence when requirements are stable enough to justify strong upfront definition. Start by fixing scope, phase boundaries, and review points before implementation begins. This is strongest when predictability matters more than iterative discovery.",
      spiral:
        "Use a risk-driven iterative strategy when technical uncertainty, criticality, or experimentation shape the project. Start by identifying the highest-risk questions and structuring the next cycle around prototypes, feasibility checks, or architectural trials. This fit is strongest when reducing uncertainty is more important than locking the whole process upfront.",
      gost34:
        "Use a formally staged governance model when regulation, documentation, and acceptance procedures are central constraints. Start by defining the technical assignment, required stage outputs, and acceptance logic before delivery scales up. In composite cases, treat GOST 34 as the governance layer rather than the full technical execution strategy.",
      rup: "Use disciplined iterations when the system is architecture-heavy, integration-heavy, and still needs controlled change rather than purely linear execution. Start by stabilizing architectural direction early and defining the minimum useful artifact and control set. This fit is strongest when iterative development is needed but lightweight process alone is not enough.",
      scrum:
        "Use structured sprint-based delivery when the project benefits from short repeatable cycles, regular review, and explicit team accountabilities. Start by defining Sprint rhythm, backlog ownership, and a workable Definition of Done. This fit is strongest when adaptive delivery is needed but work still benefits from clear cadence and recurring inspection points.",
      kanban:
        "Use a continuous flow model when work arrives steadily, priorities shift often, and WIP control matters more than iteration cadence. Start by mapping the real workflow, setting initial WIP limits, and making pull rules explicit. This fit is strongest when throughput stability and flow visibility matter more than sprint commitments.",
    },
    outcomeCautionTexts: {
      waterfall:
        "This fit weakens when requirements keep changing, when feasibility must be discovered during delivery, or when late learning would trigger expensive rework.",
      spiral:
        "This fit weakens when the project becomes predictable enough for a simpler staged or cadence-based process, or when the organisation cannot sustain explicit risk analysis.",
      gost34:
        "This fit weakens when strong formalisation is not actually required by regulation, contract, or institutional governance, because the overhead can then outweigh the benefits.",
      rup: "This fit weakens when the project is either too lightweight for process overhead or too governance-heavy for iterative discipline alone to dominate the process choice.",
      scrum:
        "This fit weakens when work behaves more like continuous service flow, when the team cannot sustain a real Sprint rhythm, or when formal staged governance dominates execution.",
      kanban:
        "This fit weakens when the project requires fixed sprint commitments, architecture-heavy milestone coordination, or strong formal stage control and acceptance logic.",
    },
    nextStepTexts: {
      waterfall:
        "Define the approved scope baseline, phase deliverables, and review gates before detailed implementation begins.",
      spiral:
        "List the highest-risk questions first and design the next cycle to test them through prototypes, experiments, or architectural probes.",
      gost34:
        "Draft the technical assignment, required stage outputs, and acceptance checkpoints before scaling delivery work.",
      rup: "Stabilize the architectural backbone early and define the minimum artifact, review, and change-control set the team will actually maintain.",
      scrum:
        "Set Sprint length, confirm backlog ownership, and agree on a Definition of Done that can support a usable Increment every cycle.",
      kanban:
        "Map the real workflow, visualize blocked states, and set the first WIP limits before trying to optimize throughput.",
    },
    supportRoleTexts: {
      gost34:
        "Use GOST 34 as the governance, compliance, and acceptance layer when strict formalisation is required, especially in regulated or institutionally constrained environments.",
      spiral:
        "Use Spiral as the risk-driven execution layer when uncertainty remains high and the project needs explicit feasibility learning before deeper commitment.",
      rup: "Use RUP as the architecture and coordination support layer when complexity is high and disciplined iterative control is still needed.",
    },
    outcomeContrastTexts: {
      waterfall:
        "Compared with more iterative alternatives, Waterfall becomes stronger when stable requirements and predictable staged coordination matter more than ongoing adaptation.",
      spiral:
        "Compared with plan-driven alternatives, Spiral becomes stronger when technical uncertainty and failure consequences justify explicit risk-driven cycles.",
      gost34:
        "Compared with other formal methods, GOST 34 becomes stronger when regulation, technical assignment discipline, and staged acceptance are mandatory rather than optional.",
      rup: "Compared with Scrum, RUP becomes stronger when architecture, traceability, and controlled change matter more than lightweight cadence. Compared with Waterfall, it stays more adaptable because it remains iterative.",
      scrum:
        "Compared with Kanban, Scrum becomes stronger when the team needs a fixed review rhythm and explicit Sprint commitments rather than pure flow control.",
      kanban:
        "Compared with Scrum, Kanban becomes stronger when work arrives continuously, priorities shift often, and WIP-limited pull matters more than timeboxed planning.",
    },
  },
  dimensions: {
    governanceFormalisation: {
      summaries: {
        0: "Governance pressure is light, so heavy stage control is not required.",
        1: "Some governance exists, but it does not dominate the delivery model.",
        2: "Governance and approval needs are material and should shape delivery structure.",
        3: "Strict governance and formal acceptance strongly shape the process.",
      },
    },
    requirementsStability: {
      summaries: {
        0: "Requirements are highly adaptive and likely to keep changing during delivery.",
        1: "Requirements have only partial stability, so adaptive planning stays important.",
        2: "Requirements are fairly stable and can support stronger upfront coordination.",
        3: "Requirements look highly stable and support a more predictive process.",
      },
    },
    riskInnovationOrientation: {
      summaries: {
        0: "Technical risk and experimentation are limited in this project context.",
        1: "Some uncertainty exists, but risk does not dominate the process choice.",
        2: "Risk and innovation matter enough to influence planning and control.",
        3: "Technical uncertainty and risk reduction should strongly influence the lifecycle.",
      },
    },
    iterationStructure: {
      summaries: {
        0: "The project leans toward linear progression rather than iterative delivery.",
        1: "The rhythm is more milestone-based than strongly iterative.",
        2: "The project benefits from a repeatable structured iteration rhythm.",
        3: "The work strongly favors fast iterative or flow-based delivery cycles.",
      },
    },
    organisationalDiscipline: {
      summaries: {
        0: "Process discipline is light, so heavy method overhead would be hard to sustain.",
        1: "Some structure exists, but the team still needs a relatively light process load.",
        2: "The team appears disciplined enough to sustain defined roles and recurring control points.",
        3: "Strong discipline and traceability can support a more formal delivery structure.",
      },
    },
    systemIntegrationComplexity: {
      summaries: {
        0: "System and integration complexity are limited, so heavyweight coordination is less necessary.",
        1: "Complexity is present but still manageable without a heavy process layer.",
        2: "Architecture and integration complexity should influence how work is coordinated.",
        3: "High system complexity favors methods that can manage architecture and integration explicitly.",
      },
    },
  },
};
