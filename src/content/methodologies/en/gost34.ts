import type { MethodologyContent } from "@/types/methodology";

export const gost34MethodologyContent: MethodologyContent = {
  id: "gost34",
  title: "GOST 34",
  shortLabel: "GOST 34",
  typeLabel: "Standards-based",
  overview: {
    summary:
      "A standards-based staged approach for automated systems where formal requirements, technical assignment, documentation, commissioning, and acceptance are central to delivery control",
    entries: [
      {
        id: "whatIs",
        title: "What GOST 34 is",
        description:
          "GOST 34 is a standards-based staged approach for creating automated systems, centered on formal requirements, documented lifecycle stages, technical assignment, project documentation, commissioning, and acceptance. In this project, it represents the most governance-heavy and regulation-oriented methodology in the supported set"
      },
      {
        id: "coreIdea",
        title: "Core idea",
        description:
          "Instead of optimizing primarily for speed, sprint rhythm, or lightweight flow, GOST 34 organizes development through formalized stages, defined deliverables, and controlled acceptance. The process is especially relevant where regulation, procurement rules, contractual documentation, or institutional accountability are dominant"
      },
      {
        id: "whyItMatters",
        title: "Why it matters",
        description:
          "GOST 34 is important because it captures a delivery context that the other methodologies do not fully represent: projects where documentation, stage approval, and formal acceptance are not optional overhead, but core requirements of the environment"
      }
    ],
    signalTags: [
      { id: "formalTechnicalAssignment", label: "Formal technical assignment" },
      { id: "stageBasedDelivery", label: "Stage-based delivery" },
      { id: "regulatedGovernance", label: "Regulated governance" },
      { id: "acceptanceDrivenProcess", label: "Acceptance-driven process" }
    ]
  },
  quickFit: {
    title: "Quick fit",
    summary:
      "Best for regulated, formalized, or contract-heavy projects where documentation, staged control, and acceptance procedures are central"
  },
  firstSteps: {
    title: "How to start applying GOST 34",
    intro:
      "Start by clarifying the automation object, formal requirements, and acceptance path before detailed delivery begins",
    mode: "sequence",
    steps: [
      {
        id: "examineAutomationObject",
        title: "Examine the object of automation and formal need",
        description:
          "Study the target organization or system context and justify why an automated system is needed. In the classic staged logic, this precedes detailed design work and frames the creation effort"
      },
      {
        id: "formRequirementsAndConcept",
        title: "Form user requirements and concept",
        description:
          "Gather the user's formal requirements, study the object, and develop the system concept. This stage is meant to establish what kind of system is being created and on what basis"
      },
      {
        id: "prepareTechnicalAssignment",
        title: "Prepare and approve the technical assignment",
        description:
          "Develop the formal technical assignment (TA), which becomes the main document defining the requirements and creation procedure for the automated system"
      },
      {
        id: "developDocumentationByStage",
        title: "Develop project documentation by stage",
        description:
          "Prepare the necessary design documentation for the relevant project stages, such as preliminary decisions, technical project materials, and working documentation, depending on how the implementation is structured"
      },
      {
        id: "prepareCommissioningContext",
        title: "Prepare the object and personnel for commissioning",
        description:
          "Before the system is considered operational, the organization, environment, equipment, and personnel must be prepared for introduction into use. Commissioning is not treated as a casual final step"
      },
      {
        id: "conductTestingAndAcceptance",
        title: "Conduct testing, trial use, and formal acceptance",
        description:
          "Run preliminary tests, trial operation where required, and formal acceptance activities. GOST-style delivery logic depends heavily on explicit verification and acceptance before the system is considered introduced",
        emphasis: "final"
      }
    ],
    callout: {
      id: "practicalNote",
      label: "Practical note",
      description:
        "GOST 34 should not be presented as just 'more documents.' Its real logic is that system creation is governed through formal artifacts, stage outputs, and acceptance readiness, because the organizational environment requires that level of control"
    }
  },
  coreElements: {
    title: "Stages, technical assignment, and acceptance logic",
    intro:
      "GOST 34 is built around a staged system-creation process. The method's meaning comes from formal stages, technical assignment, project documentation, commissioning, and acceptance, not from lightweight team routines",
    groups: [
      {
        id: "stages",
        label: "Stages",
        items: [
          { id: "formationOfRequirements", title: "Formation of requirements", description: "The process starts with examining the object of automation, justifying the need for the system, and forming user requirements" },
          { id: "developmentOfConcept", title: "Development of concept", description: "The future system concept is studied and elaborated before deeper project work proceeds" },
          { id: "technicalAssignment", title: "Technical assignment", description: "The technical assignment formalizes the system requirements and creation procedure and acts as a controlling baseline" },
          { id: "projectDocumentationStages", title: "Project documentation stages", description: "The classic staged structure includes design-oriented stages such as preliminary project decisions, technical project, and working documentation, with adaptation possible depending on the case" },
          { id: "commissioningAndSupport", title: "Commissioning and support", description: "The lifecycle includes preparation for operation, testing, trial use, acceptance, and later support obligations" }
        ]
      },
      {
        id: "technicalAssignmentAndDocuments",
        label: "Technical assignment and documents",
        items: [
          { id: "technicalAssignmentDocument", title: "Technical assignment (TA)", description: "The core governing document that defines what is being created, why, and under what requirements and procedures" },
          { id: "designAndWorkingDocumentation", title: "Design and working documentation", description: "Documentation is not supplemental decoration. It is part of how the system is defined, transferred, checked, and accepted" },
          { id: "supportingMaterials", title: "Supporting materials for related parts", description: "The standards-based logic allows linked documentation for components, software parts, technical means, and associated project work" }
        ]
      },
      {
        id: "testingAndAcceptance",
        label: "Testing and acceptance",
        items: [
          { id: "preliminaryTesting", title: "Preliminary testing", description: "The system is checked before broader operational introduction" },
          { id: "trialOperation", title: "Trial operation", description: "Where relevant, the system is run in an operationally realistic mode before final acceptance" },
          { id: "acceptanceTesting", title: "Acceptance testing", description: "Formal acceptance is a major control point, not a symbolic closure step" },
          { id: "postAcceptanceSupport", title: "Post-acceptance support", description: "Support obligations continue after introduction into operation" }
        ]
      }
    ]
  },
  teamNeeds: {
    title: "What GOST 34 needs from the team and organization",
    items: [
      { id: "formalRequirementsWork", text: "Ability to work with formal requirements and approved baselines" },
      { id: "documentationDiscipline", text: "Documentation discipline strong enough for stage-based control" },
      { id: "formalStakeholderStructure", text: "Stakeholder structure that supports formal reviews and approvals" },
      { id: "acceptanceGovernanceReadiness", text: "Readiness to treat testing and acceptance as explicit governance mechanisms" },
      { id: "participantCoordination", text: "Coordination between business, technical, and organizational participants" },
      { id: "operationalPreparationCapacity", text: "Capacity to prepare the operational environment and personnel before rollout" },
      { id: "traceabilityNeed", text: "Organizational need for traceability, accountability, and contractual clarity" }
    ],
    callout: {
      id: "practicalNote",
      label: "Practical note",
      description:
        "GOST 34 is not well suited to teams that want informal, lightweight process control. It assumes that formality is part of delivery value because the surrounding institutional context requires it"
    }
  },
  commonMistakes: {
    title: "What usually goes wrong",
    items: [
      { id: "justMorePaperwork", text: 'Treating GOST 34 as just "Waterfall with more paperwork"' },
      { id: "copyStageNames", text: "Copying stage names without respecting the acceptance logic behind them" },
      { id: "mechanicalDocumentation", text: "Producing documentation mechanically without using it to control decisions" },
      { id: "weakTechnicalAssignment", text: "Weak technical assignment that does not truly define scope and requirements" },
      { id: "underestimatePreparation", text: "Underestimating preparation of the object of automation and personnel" },
      { id: "forceExploratoryWork", text: "Trying to force highly volatile exploratory product work into a rigid formal structure" },
      { id: "delayOperationalReadiness", text: "Delaying operational readiness issues until the end" },
      { id: "ceremonialAcceptance", text: "Reducing acceptance to a ceremonial sign-off instead of a real control milestone" },
      { id: "ignoreGovernanceContext", text: "Ignoring that regulation and governance, not team preference, justify the method" }
    ],
    callout: {
      id: "whyTheseMistakesMatter",
      label: "Why these mistakes matter",
      description:
        "When teams keep only the visible bureaucracy and lose the governance logic, GOST 34 becomes expensive without becoming useful. Its value depends on formal coordination, controlled requirements, and acceptance discipline"
    }
  },
  applicability: {
    title: "Where GOST 34 fits best",
    goodFit: [
      { id: "formalRegulation", text: "The project operates under formal regulation or institutional standards" },
      { id: "mandatoryDocumentation", text: "Documentation and approval are mandatory, not optional" },
      { id: "formalTechnicalAssignment", text: "The customer requires a formal technical assignment and stage-based delivery" },
      { id: "centralAcceptanceProcedures", text: "Acceptance procedures are central to the project" },
      { id: "formalizedEnvironment", text: "The system is part of an enterprise, public-sector, defense, industrial, or other formalized environment" },
      { id: "traceabilityOverAdaptation", text: "Traceability and accountability matter more than lightweight adaptation" },
      { id: "structuredLifecycleCoordination", text: "The organization can sustain structured coordination across lifecycle stages" }
    ],
    weakerFit: [
      { id: "rapidlyEvolvingRequirements", text: "Requirements are expected to evolve rapidly during delivery" },
      { id: "frequentReprioritization", text: "The project depends on frequent reprioritization and short adaptive cycles" },
      { id: "lightweightExperimentation", text: "The team needs lightweight experimentation over formal staged control" },
      { id: "continuousServiceOrMaintenance", text: "Work behaves like continuous service flow or product maintenance" },
      { id: "noFormalizationNeed", text: "The environment does not actually require strong formalization" },
      { id: "weakDocumentDiscipline", text: "The organization cannot sustain document and approval discipline" },
      { id: "innovationDominates", text: "Innovation risk and discovery dominate more than regulated execution" }
    ],
    callout: {
      id: "practicalNote",
      label: "Practical note",
      description:
        "GOST 34 is strongest when formalization is externally justified by governance, regulation, or contract structure. Without that context, its overhead can outweigh its benefits"
    }
  },
  notCoveredHere: {
    title: "What this page does not cover",
    items: [
      { id: "legalProcurementContext", text: "Full legal and procurement context around every GOST-related project type" },
      { id: "detailedDocumentTemplates", text: "Detailed templates for every required document" },
      { id: "modernAdaptations", text: "Modern organizational adaptations of GOST-based delivery" },
      { id: "adjacentStandardsComparison", text: "Comparison with all adjacent standards and state-sector regulations" },
      { id: "postSovietStandardsEcosystem", text: "Full post-Soviet standards ecosystem beyond the core GOST 34 focus" },
      { id: "tailoringRulesBySystemType", text: "Detailed tailoring rules for every type of automated system" }
    ]
  },
  studyNext: {
    title: "Suggested future learning path",
    items: [
      { id: "study601", text: "Study the staged creation logic in GOST 34.601" },
      { id: "study602", text: "Learn the role and structure of the technical assignment in GOST 34.602" },
      { id: "formalAcceptanceImpact", text: "Understand how formal acceptance changes project control" },
      { id: "compareWithWaterfall", text: "Compare GOST 34 and Waterfall in stable but non-regulated environments" },
      { id: "compareWithRup", text: "Compare GOST 34 and RUP where discipline is needed but regulation is weaker" },
      { id: "formalMethodsAndModernPractice", text: "Explore how formalized methodologies interact with modern software engineering practice" }
    ]
  }
};
