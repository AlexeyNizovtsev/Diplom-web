import type { MethodologyContent } from "@/types/methodology";

export const rupMethodologyContent: MethodologyContent = {
  id: "rup",
  title: "RUP",
  shortLabel: "RUP",
  typeLabel: "Disciplined iterative",
  overview: {
    summary:
      "A disciplined iterative process for complex systems that combines lifecycle phases, architectural focus, managed requirements, and controlled change.",
    entries: [
      {
        id: "whatIs",
        title: "What RUP is",
        description:
          "Rational Unified Process (RUP) is a disciplined iterative software engineering process that structures development around phases, iterations, architecture, requirements management, quality control, and change management. It is not a lightweight team ritual framework. It is a broader process approach intended to organize complex development in a controlled and traceable way."
      },
      {
        id: "coreIdea",
        title: "Core idea",
        description:
          "RUP combines iterative delivery with strong process discipline. Instead of assuming that all requirements are fixed upfront, it uses iterations to progressively refine understanding and implementation. At the same time, it places strong emphasis on architecture, defined artifacts, managed change, and predictable coordination."
      },
      {
        id: "whyItMatters",
        title: "Why it matters",
        description:
          "RUP is useful when a project needs more structure than Scrum or Kanban, but still benefits from iterative development rather than a purely linear lifecycle. In the project's decision model, RUP is the clearest representative of disciplined iterative development for architecture-heavy and integration-heavy systems."
      }
    ],
    signalTags: [
      { id: "disciplinedIterations", label: "Disciplined iterations" },
      { id: "architectureFirstThinking", label: "Architecture-first thinking" },
      { id: "managedRequirements", label: "Managed requirements" },
      { id: "controlledChange", label: "Controlled change" }
    ]
  },
  quickFit: {
    title: "Quick fit",
    summary:
      "Best for architecture-heavy systems, disciplined teams, and projects that need iterative delivery without losing process structure and documentation control."
  },
  firstSteps: {
    title: "How to start applying RUP",
    intro:
      "Start by stabilizing scope, architecture direction, and change discipline before scaling feature delivery.",
    mode: "sequence",
    steps: [
      {
        id: "defineScopeAndRisks",
        title: "Define project scope and key risks",
        description:
          "Clarify the business objectives, major constraints, and main technical or organizational risks. Do not begin with detailed full-scale execution; begin by understanding what must be stabilized first."
      },
      {
        id: "establishArchitectureDirection",
        title: "Establish the core architecture direction",
        description:
          "Identify the architectural backbone of the system early. Define the major components, integration boundaries, and technical decisions that will shape later iterations."
      },
      {
        id: "organizeFirstPhasePlan",
        title: "Organize the first phase plan",
        description:
          "Structure the work around RUP phases and short internal iterations. Make clear what the team is trying to validate in the early cycle, especially feasibility, requirements understanding, and architecture."
      },
      {
        id: "setRequirementsAndChangeManagement",
        title: "Set up requirements and change management",
        description:
          "Decide how requirements will be captured, refined, traced, and changed. RUP depends on disciplined handling of requirements and controlled evolution rather than informal backlog drift."
      },
      {
        id: "defineArtifactsAndResponsibilities",
        title: "Define essential artifacts and responsibilities",
        description:
          "Select the minimum useful set of artifacts, models, and roles for the project. Do not try to use every possible RUP artifact, but do make responsibilities explicit."
      },
      {
        id: "iterateWithValidation",
        title: "Iterate with validation, not just activity",
        description:
          "Run iterations that produce validated progress: clarified requirements, executable architecture, tested functionality, and controlled decisions. Iterations should reduce uncertainty, not merely consume time.",
        emphasis: "final"
      }
    ],
    callout: {
      id: "practicalNote",
      label: "Practical note",
      description:
        "RUP works best when adapted intelligently. The common mistake is either making it too heavy and bureaucratic or stripping away so much discipline that only the name remains."
    }
  },
  coreElements: {
    title: "Phases, iterations, practices, and artifacts",
    intro:
      "RUP combines a time structure with a disciplined static structure. Its value comes from how phases, iterations, architecture, artifacts, and management practices work together.",
    groups: [
      {
        id: "phases",
        label: "Phases",
        items: [
          { id: "inception", title: "Inception", description: "Clarifies project goals, scope, business case, major risks, and overall direction. This is not full detailed design; it is early framing and feasibility." },
          { id: "elaboration", title: "Elaboration", description: "Stabilizes the architecture and reduces the most important risks. This phase is critical in RUP because it determines whether the project is truly ready for full-scale construction." },
          { id: "construction", title: "Construction", description: "Builds the system through iterative implementation and validation. The focus shifts toward producing working functionality on top of the established architectural base." },
          { id: "transition", title: "Transition", description: "Moves the system toward operational use through deployment, correction, user readiness, and release stabilization." }
        ]
      },
      {
        id: "iterations",
        label: "Iterations",
        items: [
          { id: "iterativeDevelopment", title: "Iterative development", description: "RUP is not linear execution with a few checkpoints. Each phase can contain iterations, and each iteration should produce concrete, reviewable progress." },
          { id: "riskReductionThroughIterations", title: "Risk reduction through iterations", description: "Iterations are used to address uncertainty early rather than postponing difficult issues until late delivery stages." },
          { id: "controlledLearning", title: "Controlled learning", description: "Iterations help the team refine understanding, but within a managed process rather than through ad hoc improvisation." }
        ]
      },
      {
        id: "corePractices",
        label: "Core practices",
        items: [
          { id: "manageRequirements", title: "Manage requirements", description: "Requirements are captured, organized, and traced so that design, implementation, and testing stay connected." },
          { id: "architectureCentricDevelopment", title: "Architecture-centric development", description: "A robust executable architecture is treated as a central organizing principle of the project." },
          { id: "verifyQualityContinuously", title: "Verify quality continuously", description: "Quality is not postponed to the end. Testing and validation are part of the lifecycle, not an afterthought." },
          { id: "controlChanges", title: "Control changes", description: "Configuration and change management are treated as essential, especially in larger or longer-running projects." },
          { id: "visualModeling", title: "Visual modeling", description: "RUP has historically emphasized modeling as a communication and design tool, especially for complex systems." }
        ]
      },
      {
        id: "artifacts",
        label: "Artifacts",
        items: [
          { id: "useCaseAndRequirementsArtifacts", title: "Use-case and requirements artifacts", description: "These help structure functional understanding and connect project intent to design and validation." },
          { id: "architectureAndDesignArtifacts", title: "Architecture and design artifacts", description: "These express the structural solution and major technical decisions." },
          { id: "testArtifacts", title: "Test artifacts", description: "These support quality verification across iterations." },
          { id: "managementArtifacts", title: "Management artifacts", description: "These help coordinate scope, progress, change, and project control." }
        ]
      }
    ]
  },
  teamNeeds: {
    title: "What RUP needs from the team and organization",
    items: [
      { id: "processMaturity", text: "Enough process maturity to sustain defined responsibilities and artifacts." },
      { id: "architecturalOwnership", text: "Strong architectural ownership early in the project." },
      { id: "requirementsManagement", text: "Willingness to manage requirements explicitly instead of informally." },
      { id: "iterationPlanningDiscipline", text: "Discipline in iteration planning and review." },
      { id: "documentationForCoordination", text: "Readiness to maintain documentation where it adds coordination value." },
      { id: "configurationControl", text: "Capacity to control changes and configurations systematically." },
      { id: "acceptArchitectureFocusedIterations", text: "Stakeholder acceptance that early iterations may focus on architecture and risk reduction rather than visible feature volume." }
    ],
    callout: {
      id: "practicalNote",
      label: "Practical note",
      description:
        "RUP depends less on ritual cadence than Scrum and more on process discipline. If the team cannot sustain structured responsibility, artifact maintenance, and controlled iteration goals, RUP quickly degrades into either paperwork or confusion."
    }
  },
  commonMistakes: {
    title: "What usually goes wrong",
    items: [
      { id: "miniWaterfall", text: "Treating RUP like a mini-waterfall with documentation after each stage." },
      { id: "fullProcessProduct", text: "Trying to implement the full process product without adaptation." },
      { id: "ignoreElaborationArchitecture", text: "Ignoring the architectural focus of Elaboration." },
      { id: "activityWithoutLearning", text: "Running iterations that produce activity but not validated learning." },
      { id: "tooManyArtifacts", text: "Maintaining too many artifacts with no real decision value." },
      { id: "weakTraceability", text: "Letting requirements grow without disciplined traceability." },
      { id: "informalChangeManagement", text: "Using RUP language but managing change informally." },
      { id: "optionalDiscipline", text: "Assuming that 'iterative' means process discipline is optional." },
      { id: "heavyProcessCollapse", text: "Making the process so heavy that delivery speed collapses." }
    ],
    callout: {
      id: "whyTheseMistakesMatter",
      label: "Why these mistakes matter",
      description:
        "RUP is often criticized not because its core logic is weak, but because teams either over-implement it mechanically or under-implement it selectively. In both cases, the balance between discipline and iterative learning is lost."
    }
  },
  applicability: {
    title: "Where RUP fits best",
    goodFit: [
      { id: "architectureHeavy", text: "The system is architecture-heavy or integration-heavy." },
      { id: "iterativeWithGovernance", text: "The project needs iterative delivery but with stronger governance than lightweight agile frameworks provide." },
      { id: "managedChangingRequirements", text: "Requirements are not fully stable, but must still be managed carefully." },
      { id: "reduceTechnicalRiskEarly", text: "Technical risk needs to be reduced before full-scale construction." },
      { id: "commonProcessLanguage", text: "Multiple roles or teams need a common process language." },
      { id: "documentationHasCoordinationValue", text: "Documentation and traceability have real coordination value." },
      { id: "controlledChangeDiscipline", text: "The organization can sustain controlled change and process discipline." }
    ],
    weakerFit: [
      { id: "smallFastMovingProject", text: "The project is small and fast-moving with little architecture pressure." },
      { id: "continuousServiceFlow", text: "Work behaves more like continuous service flow than project-based delivery." },
      { id: "cannotSustainStructure", text: "The team cannot sustain explicit process structure." },
      { id: "strictFormalStaging", text: "Governance is so strict that a staged formal model is more appropriate." },
      { id: "lightweightAdaptiveIteration", text: "The context strongly favors lightweight adaptive iteration with minimal artifacts." },
      { id: "featureThroughputPriority", text: "The organization wants immediate feature throughput over architectural stabilization." },
      { id: "insufficientScale", text: "The project lacks the scale or complexity needed to justify the added process overhead." }
    ],
    callout: {
      id: "practicalNote",
      label: "Practical note",
      description:
        "RUP is strongest in the middle ground between strict staged governance and lightweight agile flow. It fits when iterative development is needed, but so are architecture, controlled change, and process discipline."
    }
  },
  notCoveredHere: {
    title: "What this page does not cover",
    items: [
      { id: "unifiedProcessHistory", text: "Full historical evolution of the Unified Process family." },
      { id: "umlModelingPractice", text: "Detailed UML modeling practice." },
      { id: "fullArtifactCatalog", text: "Full artifact catalog and tailoring options." },
      { id: "enterpriseCustomization", text: "Enterprise process customization at scale." },
      { id: "toolSpecificImplementations", text: "Toolchain-specific RUP implementations." },
      { id: "variantComparison", text: "Formal comparison of RUP variants and later process descendants." }
    ]
  },
  studyNext: {
    title: "Suggested future learning path",
    items: [
      { id: "fourPhasesPurpose", text: "Learn the purpose of the four RUP phases and how they differ." },
      { id: "architectureCentricProjects", text: "Study architecture-centric development in iterative projects." },
      { id: "traceabilityAndChange", text: "Understand requirements traceability and controlled change management." },
      { id: "artifactTailoring", text: "Explore how RUP tailors artifacts to project size and risk." },
      { id: "compareWithWaterfall", text: "Compare RUP with Waterfall for structured governance contexts." },
      { id: "compareWithScrum", text: "Compare RUP with Scrum for disciplined iterative delivery contexts." }
    ]
  }
};
