import type { MethodologyContent } from "@/types/methodology";

export const waterfallMethodologyContent: MethodologyContent = {
  id: "waterfall",
  title: "Waterfall",
  shortLabel: "Waterfall",
  typeLabel: "Plan-driven",
  overview: {
    summary:
      "A sequential, plan-driven approach that relies on upfront clarification, clear phase boundaries, and controlled movement from one stage to the next",
    entries: [
      {
        id: "whatIs",
        title: "What Waterfall is",
        description:
          "Waterfall is a plan-driven sequential development approach in which work progresses through ordered stages such as requirements, design, implementation, testing, and deployment. Its logic assumes that the project can be structured upfront to a meaningful degree and that major downstream work should follow once upstream decisions are sufficiently defined"
      },
      {
        id: "coreIdea",
        title: "Core idea",
        description:
          "Instead of organizing work around continuous reprioritization or lightweight adaptive cycles, Waterfall organizes delivery through staged progression. The method relies on upfront clarification, clear phase boundaries, and controlled advancement from one stage to the next"
      },
      {
        id: "whyItMatters",
        title: "Why it matters",
        description:
          "Waterfall remains important because many projects still need predictability, structured approvals, stable requirements, and explicit stage-based coordination. In the project's decision model, Waterfall is the clearest representative of linear plan-driven delivery under relatively stable conditions"
      }
    ],
    signalTags: [
      { id: "stableRequirements", label: "Stable requirements" },
      { id: "linearDelivery", label: "Linear delivery" },
      { id: "upfrontPlanning", label: "Upfront planning" },
      { id: "stageBasedControl", label: "Stage-based control" }
    ]
  },
  quickFit: {
    title: "Quick fit",
    summary:
      "Best for projects with stable requirements, stronger upfront definition, and a need for structured stage progression rather than continuous adaptation"
  },
  firstSteps: {
    title: "How to start applying Waterfall",
    intro:
      "Start by establishing a real baseline for scope, phase boundaries, and approvals before downstream work accelerates",
    mode: "sequence",
    steps: [
      {
        id: "defineScopeAndRequirements",
        title: "Define scope and requirements clearly",
        description:
          "Document what the system is expected to do, what constraints exist, and what the delivery boundaries are. Waterfall depends on having a stable enough baseline before major downstream work begins"
      },
      {
        id: "establishPhaseBoundaries",
        title: "Establish phase boundaries and approvals",
        description:
          "Decide what the main stages will be, what each stage must produce, and what conditions must be met before moving forward"
      },
      {
        id: "createSystemDesign",
        title: "Create the system and software design",
        description:
          "Translate approved requirements into a structured design that guides implementation. This design should reduce ambiguity before coding starts"
      },
      {
        id: "planImplementationAndTesting",
        title: "Plan implementation and testing work",
        description:
          "Prepare the execution path for development and later verification. Testing should not be treated as an afterthought, even if it occurs later in the lifecycle"
      },
      {
        id: "buildAccordingToDesign",
        title: "Build according to the agreed design",
        description:
          "Implementation should follow the approved structure closely. The purpose of earlier stages is to reduce disruptive redesign during coding"
      },
      {
        id: "validateAndDeliver",
        title: "Validate and deliver the completed system",
        description:
          "Perform testing, correction, acceptance, and deployment in a controlled sequence. The later stages confirm whether the earlier specification and design were adequate",
        emphasis: "final"
      }
    ],
    callout: {
      id: "practicalNote",
      label: "Practical note",
      description:
        "Waterfall works only if the team truly protects the value of early definition. If requirements remain unstable while the project pretends to be linear, Waterfall becomes expensive and brittle"
    }
  },
  coreElements: {
    title: "Stages, documents, and control points",
    intro:
      "Waterfall is built around structured progression. Its strength comes from clear stages, explicit deliverables, and controlled transition from one phase to the next",
    groups: [
      {
        id: "stages",
        label: "Stages",
        items: [
          {
            id: "requirementsAnalysis",
            title: "Requirements analysis",
            description:
              "Defines what the system must achieve, what constraints apply, and what the project is expected to deliver"
          },
          {
            id: "systemAndSoftwareDesign",
            title: "System and software design",
            description:
              "Transforms requirements into a design structure that guides implementation and reduces ambiguity"
          },
          {
            id: "implementation",
            title: "Implementation",
            description:
              "Builds the software according to the defined design and requirements baseline"
          },
          {
            id: "testing",
            title: "Testing",
            description:
              "Verifies that the built system behaves as expected and identifies defects or mismatches"
          },
          {
            id: "deploymentAndMaintenance",
            title: "Deployment and maintenance",
            description:
              "Moves the system into use and supports corrections or updates after delivery"
          }
        ]
      },
      {
        id: "documents",
        label: "Documents",
        items: [
          {
            id: "requirementsSpecification",
            title: "Requirements specification",
            description:
              "Acts as the reference point for what is to be built and verified"
          },
          {
            id: "designDocumentation",
            title: "Design documentation",
            description:
              "Provides the structural basis for implementation decisions"
          },
          {
            id: "testDocumentation",
            title: "Test documentation",
            description:
              "Defines how correctness and completeness will be checked"
          },
          {
            id: "approvedBaselines",
            title: "Approved baselines",
            description:
              "Waterfall depends on established reference points. Without them, phase sequencing loses much of its value"
          }
        ]
      },
      {
        id: "controlLogic",
        label: "Control logic",
        items: [
          {
            id: "sequentialProgression",
            title: "Sequential progression",
            description:
              "Later phases depend on sufficiently completed earlier phases"
          },
          {
            id: "changeControl",
            title: "Change control",
            description:
              "Changes are possible, but they are more expensive after upstream decisions have already been translated into downstream work"
          },
          {
            id: "stageReviewsAndApprovals",
            title: "Stage reviews and approvals",
            description:
              "Movement between stages is usually tied to explicit review or approval conditions"
          }
        ]
      }
    ]
  },
  teamNeeds: {
    title: "What Waterfall needs from the team and organization",
    items: [
      { id: "requirementsClarity", text: "Ability to define requirements with reasonable clarity before implementation" },
      { id: "stagePlanningCommitment", text: "Willingness to commit to stage-based planning" },
      { id: "baselineDiscipline", text: "Enough discipline to maintain approved baselines" },
      { id: "crossPhaseCoordination", text: "Coordination between analysts, designers, developers, and testers" },
      { id: "stakeholderApprovals", text: "Stakeholder readiness to review and approve outputs at defined points" },
      { id: "documentationDiscipline", text: "Documentation discipline where it supports control and traceability" },
      { id: "predictabilityPreference", text: "Organizational preference for predictability over frequent adaptive change" }
    ],
    callout: {
      id: "practicalNote",
      label: "Practical note",
      description:
        "Waterfall does not just need documentation. It needs alignment. If stakeholders keep changing direction informally while the team is supposed to follow fixed stages, the method collapses into slow rework"
    }
  },
  commonMistakes: {
    title: "What usually goes wrong",
    items: [
      { id: "documentsFirst", text: 'Treating Waterfall as "write documents first and hope for the best"' },
      { id: "freezeUnknownRequirements", text: "Freezing requirements that are not actually understood" },
      { id: "skipValidation", text: "Assuming early documents eliminate the need for validation" },
      { id: "lateFeedback", text: "Postponing all meaningful feedback until late testing" },
      { id: "designDrift", text: "Letting design and implementation drift away from approved requirements" },
      { id: "volatileScopeUse", text: "Using Waterfall in contexts with highly volatile scope" },
      { id: "ignoreLateChangeCost", text: "Ignoring the cost of late change while pretending phase order still holds" },
      { id: "isolateTeams", text: "Treating sequential stages as permission to isolate teams too strongly" },
      { id: "equatePredictabilityWithCertainty", text: "Equating predictability with the absence of uncertainty" }
    ],
    callout: {
      id: "whyTheseMistakesMatter",
      label: "Why these mistakes matter",
      description:
        "Waterfall fails most visibly when the project acts as if uncertainty can be ignored. The method can work under the right conditions, but it performs badly when stability is assumed rather than earned"
    }
  },
  applicability: {
    title: "Where Waterfall fits best",
    goodFit: [
      { id: "stableRequirements", text: "Requirements are relatively stable before implementation begins" },
      { id: "upfrontClarification", text: "The project benefits from strong upfront clarification" },
      { id: "stagePlanningAndReview", text: "The organization needs stage-based planning and review" },
      { id: "predictabilityAndTraceability", text: "Predictability and traceability matter more than rapid adaptation" },
      { id: "formalCheckpoints", text: "Formal acceptance or delivery checkpoints are important" },
      { id: "designBeforeCoding", text: "The system can be designed meaningfully before most coding starts" },
      { id: "earlyStakeholderCommitment", text: "Stakeholders can commit to clearer early decisions" }
    ],
    weakerFit: [
      { id: "evolvingRequirements", text: "Requirements are expected to evolve during delivery" },
      { id: "frequentReprioritization", text: "The project depends on rapid feedback and frequent reprioritization" },
      { id: "highTechnicalUncertainty", text: "Technical uncertainty is high and early prototypes are essential" },
      { id: "continuousServiceFlow", text: "Work behaves like continuous service flow rather than staged delivery" },
      { id: "weakBaselineDiscipline", text: "The organization cannot sustain baseline discipline" },
      { id: "iterativeDiscoveryValue", text: "Product value depends on iterative discovery rather than upfront definition" },
      { id: "constantChange", text: "Change is constant enough that late-stage rework becomes likely" }
    ],
    callout: {
      id: "practicalNote",
      label: "Practical note",
      description:
        "Waterfall is strongest when stability is real and early structure is valuable. It becomes weak when the environment demands continuous learning, frequent reprioritization, or risk-driven iteration"
    }
  },
  notCoveredHere: {
    title: "What this page does not cover",
    items: [
      { id: "historicalDebate", text: "Full historical debate around the Waterfall model" },
      { id: "laterVariants", text: "All later Waterfall variants and hybrid adaptations" },
      { id: "vModel", text: "V-Model and other closely related plan-driven structures" },
      { id: "procurementStandards", text: "Formal procurement standards beyond the core lifecycle idea" },
      { id: "phaseResourceOptimization", text: "Detailed simulation or optimization of resource allocation by phase" },
      { id: "largeScaleComplianceTailoring", text: "Large-scale compliance tailoring outside the scope of this reference page" }
    ]
  },
  studyNext: {
    title: "Suggested future learning path",
    items: [
      { id: "requirementsQuality", text: "Study how requirements quality affects downstream development cost" },
      { id: "phaseStructureVsChangeControl", text: "Learn the difference between phase structure and real change control" },
      { id: "compareWithRup", text: "Compare Waterfall and RUP for disciplined but non-agile delivery" },
      { id: "compareWithGost34", text: "Compare Waterfall and GOST 34 in formalized governance contexts" },
      { id: "lateTestingEffects", text: "Explore why late testing can create expensive redesign loops" },
      { id: "hybridModels", text: "Study hybrid models used when some structure is needed but stability is incomplete" }
    ]
  }
};
