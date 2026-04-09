import type { MethodologyContent } from "@/types/methodology";

export const scrumMethodologyContent: MethodologyContent = {
  id: "scrum",
  title: "Scrum",
  shortLabel: "Scrum",
  typeLabel: "Agile",
  overview: {
    summary:
      "A lightweight adaptive framework built around short timeboxed sprints, explicit accountabilities, and recurring inspection of both product and process.",
    entries: [
      {
        id: "whatIs",
        title: "What Scrum is",
        description:
          "Scrum is a lightweight framework for developing value through adaptive solutions to complex problems. It organizes work around short, timeboxed Sprints, a small cross-functional team, and recurring inspection and adaptation of both product and process."
      },
      {
        id: "coreIdea",
        title: "Core idea",
        description:
          "Instead of assuming that everything can be fully predicted in advance, Scrum structures work into repeatable cycles for planning, building, reviewing, and improving. It is designed for contexts where requirements evolve, stakeholder feedback matters, and the team can sustain a regular delivery rhythm."
      },
      {
        id: "whyItMatters",
        title: "Why it matters",
        description:
          "Scrum gives teams a disciplined way to combine adaptability with structure. In the project's decision model, Scrum is the clearest representative of timeboxed adaptive development with regular review loops and explicit team responsibilities."
      }
    ],
    signalTags: [
      { id: "timeboxedSprints", label: "Timeboxed Sprints" },
      { id: "adaptivePlanning", label: "Adaptive planning" },
      { id: "regularStakeholderFeedback", label: "Regular stakeholder feedback" },
      { id: "empiricalProcessControl", label: "Empirical process control" }
    ]
  },
  quickFit: {
    title: "Quick fit",
    summary:
      "Best for adaptive work with short structured iterations, regular feedback, and enough team discipline to sustain Sprint rhythm."
  },
  firstSteps: {
    title: "How to start applying Scrum",
    intro:
      "Start with clear accountabilities, a usable backlog, and a Sprint rhythm the team can actually sustain.",
    mode: "sequence",
    steps: [
      { id: "assignCoreAccountabilities", title: "Assign the core accountabilities", description: "Choose who will act as Product Owner, Scrum Master, and Developers. Scrum uses these three accountabilities inside one Scrum Team." },
      { id: "createInitialProductBacklog", title: "Create an initial Product Backlog", description: "Collect the main product needs, expected outcomes, and candidate backlog items. The backlog should express what the product may need, not attempt to freeze the whole future in detail." },
      { id: "setSprintLengthAndRhythm", title: "Set Sprint length and working rhythm", description: "Agree how long a Sprint will be and establish a repeatable cycle: Sprint Planning, Daily Scrum, Sprint Review, and Sprint Retrospective, all within the Sprint." },
      { id: "defineDefinitionOfDone", title: "Define Definition of Done", description: "Agree on what 'done' means so the team shares one quality standard. Without a real Definition of Done, the Increment becomes ambiguous and transparency suffers." },
      { id: "prepareSprintPlanning", title: "Prepare and run Sprint Planning", description: "Select backlog items for the first Sprint, define a Sprint Goal, and create an initial plan for delivering it. The Sprint Goal gives coherence to the work selected for the Sprint." },
      { id: "runSprintAndInspect", title: "Run the Sprint and inspect the result", description: "Execute the Sprint, inspect progress daily, review the Increment with stakeholders at Sprint Review, and improve the team's way of working during Sprint Retrospective.", emphasis: "final" }
    ],
    callout: {
      id: "practicalNote",
      label: "Practical note",
      description:
        "The goal is not to memorize all Scrum terminology at once. The real starting point is a repeatable rhythm with clear ownership, visible priorities, and a usable Increment at the end of each cycle."
    }
  },
  coreElements: {
    title: "Roles, events, and artifacts",
    intro:
      "Scrum defines a small set of core elements. These are not optional decorations: they are the minimal structure that supports transparency, inspection, and adaptation.",
    groups: [
      {
        id: "roles",
        label: "Roles",
        items: [
          { id: "productOwner", title: "Product Owner", description: "Owns product value and orders the Product Backlog. This accountability is central because Scrum needs one clear direction for what should come next." },
          { id: "scrumMaster", title: "Scrum Master", description: "Helps the team and organization use Scrum effectively. The Scrum Master supports the process, removes impediments to Scrum effectiveness, and fosters empirical working." },
          { id: "developers", title: "Developers", description: "Create a usable Increment every Sprint and manage the day-to-day execution needed to reach the Sprint Goal. Scrum expects Developers to be self-managing and collectively responsible for delivery." }
        ]
      },
      {
        id: "events",
        label: "Events",
        items: [
          { id: "sprint", title: "Sprint", description: "The timeboxed container for all Scrum work. Every Sprint aims to produce a valuable Increment and repeats the rhythm of Scrum." },
          { id: "sprintPlanning", title: "Sprint Planning", description: "Defines why the Sprint is valuable, what can be done, and how the team will start doing it." },
          { id: "dailyScrum", title: "Daily Scrum", description: "A short daily inspection point focused on progress toward the Sprint Goal and adaptation of the plan for the next day." },
          { id: "sprintReview", title: "Sprint Review", description: "Inspects the Increment with stakeholders and adapts future direction based on the outcome and feedback." },
          { id: "sprintRetrospective", title: "Sprint Retrospective", description: "Examines how the team worked and identifies improvements for the next Sprint. It is Scrum's core built-in mechanism for process improvement." }
        ]
      },
      {
        id: "artifacts",
        label: "Artifacts",
        items: [
          { id: "productBacklog", title: "Product Backlog", description: "The ordered source of future product work. It reflects what the Product Owner currently sees as most valuable." },
          { id: "productGoal", title: "Product Goal", description: "The longer-term objective for the product. It gives direction beyond one Sprint." },
          { id: "sprintBacklog", title: "Sprint Backlog", description: "The selected work and plan for achieving the Sprint Goal. It is the team's working view of the current Sprint." },
          { id: "sprintGoal", title: "Sprint Goal", description: "The single purpose that gives coherence to Sprint work and supports adaptation without losing direction." },
          { id: "increment", title: "Increment", description: "The usable result created during the Sprint. It must be inspectable and aligned with the Definition of Done." },
          { id: "definitionOfDone", title: "Definition of Done", description: "The shared quality standard that determines when work is complete. It protects transparency by ensuring that 'done' has a concrete meaning." }
        ]
      }
    ]
  },
  teamNeeds: {
    title: "What Scrum needs from the team and organization",
    items: [
      { id: "focusOnSprintGoals", text: "Focus on Sprint goals rather than constant scope scattering." },
      { id: "clearBacklogOwnership", text: "Clear backlog ownership and real product prioritization." },
      { id: "transparency", text: "Transparency about blockers, progress, and quality." },
      { id: "stakeholderInvolvement", text: "Regular stakeholder involvement in review and feedback." },
      { id: "sprintRhythmDiscipline", text: "Enough discipline to maintain Sprint rhythm and artifact quality." },
      { id: "inspectAndAdaptMindset", text: "Willingness to inspect and adapt instead of defending the current process." },
      { id: "crossFunctionalCollaboration", text: "Cross-functional collaboration strong enough to produce a real Increment." }
    ],
    callout: {
      id: "practicalNote",
      label: "Practical note",
      description:
        "Scrum is not busywork and not just a meeting schedule. It depends on a working Increment, clear ownership, visible priorities, and the team's ability to learn from each cycle."
    }
  },
  commonMistakes: {
    title: "What usually goes wrong",
    items: [
      { id: "fakeScrum", text: "Fake Scrum without real roles." },
      { id: "ceremoniesWithoutAdaptation", text: "Ceremonies without adaptation." },
      { id: "noUsableIncrement", text: "No usable Increment at Sprint end." },
      { id: "supportFlowForcedIntoSprints", text: "Continuous support flow forced into Sprints without structure." },
      { id: "taskDumpBacklog", text: "Product Backlog treated as an unstructured task dump." },
      { id: "missingSprintGoal", text: "Sprint Goal missing or ignored." },
      { id: "weakDefinitionOfDone", text: "Definition of Done too weak to protect quality." },
      { id: "performanceTheaterReview", text: "Review used as performance theater instead of inspection." },
      { id: "symbolicRetrospective", text: "Retrospective treated as optional or symbolic." }
    ],
    callout: {
      id: "whyTheseMistakesMatter",
      label: "Why these mistakes matter",
      description:
        "When teams remove or hollow out the core elements of Scrum, they still call it Scrum, but lose the framework's actual value. The result is usually confusion, low transparency, and shallow iteration rituals."
    }
  },
  applicability: {
    title: "Where Scrum fits best",
    goodFit: [
      { id: "evolvingRequirements", text: "Requirements are expected to evolve during delivery." },
      { id: "incrementalDelivery", text: "The product can be delivered incrementally." },
      { id: "shortStructuredIterations", text: "The team can sustain short, structured iterations." },
      { id: "regularFeedback", text: "Stakeholder feedback is needed regularly." },
      { id: "empiricalControlUseful", text: "The work is complex enough that empirical process control is useful." },
      { id: "ownershipAndDiscipline", text: "The organization can support clear ownership and team discipline." },
      { id: "preferTimeboxedDelivery", text: "A timeboxed delivery model is preferable to a pure continuous-flow model." }
    ],
    weakerFit: [
      { id: "fullyFixedRequirements", text: "Requirements must be fully fixed before implementation begins." },
      { id: "strictStagedGovernance", text: "Strict staged governance or formal acceptance gates dominate delivery." },
      { id: "continuousSupportFlow", text: "Work arrives as continuous support flow rather than Sprint-based increments." },
      { id: "cannotMaintainAccountabilities", text: "The organization cannot maintain the basic Scrum accountabilities." },
      { id: "cannotProduceIncrement", text: "The team cannot produce a usable Increment within a Sprint." },
      { id: "formalPredictiveControl", text: "The environment requires highly formal predictive planning as the main control mechanism." },
      { id: "riskFirstExperimentation", text: "The project is dominated by risk-first experimentation rather than Sprint-based product increments." }
    ],
    callout: {
      id: "practicalNote",
      label: "Practical note",
      description:
        "Scrum is strongest in adaptive delivery contexts where regular review loops and team discipline create better outcomes than either heavy formal governance or pure continuous task flow."
    }
  },
  notCoveredHere: {
    title: "What this page does not cover",
    items: [
      { id: "advancedScaling", text: "Advanced scaling frameworks and large multi-team Scrum structures." },
      { id: "detailedBacklogEstimation", text: "Detailed backlog estimation techniques." },
      { id: "hybridOperatingModels", text: "Hybrid Scrum-Kanban operating models." },
      { id: "organizationWideTransformation", text: "Organization-wide agile transformation patterns." },
      { id: "productDiscoveryOutsideScrum", text: "Product discovery methods outside the core Scrum framework." },
      { id: "deepImplementationTactics", text: "Deep implementation tactics beyond the basic framework logic." }
    ]
  },
  studyNext: {
    title: "Suggested future learning path",
    items: [
      { id: "learnCoreFramework", text: "Learn the core framework and vocabulary from the Scrum Guide." },
      { id: "usableIncrement", text: "Understand how a usable Increment is created each Sprint." },
      { id: "backlogAndSprintGoals", text: "Study backlog management and Sprint Goal design." },
      { id: "reviewsAndRetrospectives", text: "Learn how Reviews and Retrospectives affect inspection and process improvement." },
      { id: "compareWithKanban", text: "Compare Scrum with Kanban in mixed product/support environments." },
      { id: "deeperTacticsLater", text: "Explore deeper implementation tactics only after the core logic is stable." }
    ]
  }
};
