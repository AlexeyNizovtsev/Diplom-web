import type { MethodologyContent } from "@/types/methodology";

export const kanbanMethodologyContent: MethodologyContent = {
  id: "kanban",
  title: "Kanban",
  shortLabel: "Kanban",
  typeLabel: "Flow-based Agile",
  overview: {
    summary:
      "A flow-based method that visualizes work, limits WIP, and improves delivery through pull policies and observable flow behavior",
    entries: [
      {
        id: "whatIs",
        title: "What Kanban is",
        description:
          "Kanban is a flow-based method for managing work through visualization, explicit work policies, and limits on work in progress. In software engineering, it is especially associated with continuous delivery contexts, maintenance-heavy environments, and situations where incoming work is variable and cannot be cleanly packaged into fixed iterations"
      },
      {
        id: "coreIdea",
        title: "Core idea",
        description:
          "Instead of organizing delivery around timeboxed sprints, Kanban organizes work as a continuous flow. New work is usually pulled only when capacity becomes available. This makes Kanban particularly suitable where priorities shift frequently and teams must respond continuously rather than wait for the next iteration boundary"
      },
      {
        id: "whyItMatters",
        title: "Why it matters",
        description:
          "Kanban gives teams a lightweight but disciplined way to see bottlenecks, reduce overload, stabilize throughput, and improve lead time. In the project's decision model, Kanban is the clearest representative of a continuous-flow process with WIP-limited delivery"
      }
    ],
    signalTags: [
      { id: "continuousFlow", label: "Continuous flow" },
      { id: "wipLimits", label: "WIP limits" },
      { id: "pullBasedDelivery", label: "Pull-based delivery" },
      { id: "explicitWorkflowPolicies", label: "Explicit workflow policies" }
    ]
  },
  quickFit: {
    title: "Quick fit",
    summary:
      "Best for continuous service flow, support work, and changing priorities where visual control and WIP discipline matter more than sprint cadence"
  },
  firstSteps: {
    title: "How to start applying Kanban",
    intro:
      "Start with the real workflow, then make flow visible and controlled before trying to optimize speed",
    mode: "sequence",
    steps: [
      { id: "visualizeCurrentWorkflow", title: "Visualize the current workflow", description: "Map the real stages that work passes through now, for example request intake, analysis, development, testing, and release. Start from the actual process, not an idealized future process" },
      { id: "createFirstBoard", title: "Create the first Kanban board", description: "Represent the workflow visually using columns and work items. Make sure the board reflects real handoffs and queues rather than generic labels" },
      { id: "setInitialWipLimits", title: "Set initial WIP limits", description: "Define simple limits for the busiest stages so the team cannot overload itself with too many parallel tasks. Start conservatively and refine later" },
      { id: "makeMovementRulesExplicit", title: "Make movement rules explicit", description: "Agree on when a work item can enter a stage, leave a stage, or be considered done. These rules should be visible and shared by the team" },
      { id: "trackFlowMetrics", title: "Track flow metrics", description: "Measure lead time, cycle time, throughput, and blockers. Do not turn metrics into bureaucracy; use them to understand where flow breaks down" },
      { id: "improveBottlenecksContinuously", title: "Improve bottlenecks continuously", description: "Use the board and metrics to identify queues, blocked work, and unstable stages. Improve the weakest points first instead of redesigning everything at once", emphasis: "final" }
    ],
    callout: {
      id: "practicalNote",
      label: "Practical note",
      description:
        "Kanban works best when the team starts with the current process and evolves it. It does not need a dramatic rollout, but it does require discipline in visualization, pull logic, and WIP control"
    }
  },
  coreElements: {
    title: "Principles, board structure, and flow control",
    intro:
      "Kanban is not defined by ceremonies in the Scrum sense. Its strength comes from how work is visualized, limited, measured, and continuously improved",
    groups: [
      {
        id: "principles",
        label: "Principles",
        items: [
          { id: "visualizeWorkflow", title: "Visualize workflow", description: "The board makes the actual flow of work visible so the team can see progress, queues, and blockers" },
          { id: "limitWorkInProgress", title: "Limit work in progress", description: "WIP limits reduce overload and force attention on finishing work instead of starting too much in parallel" },
          { id: "manageFlow", title: "Manage flow", description: "The team monitors how work moves across the system, especially delays, blocked items, and unstable throughput" },
          { id: "makePoliciesExplicit", title: "Make policies explicit", description: "Rules for pulling work, moving cards, and defining completion should be visible and understood by everyone" },
          { id: "improveContinuously", title: "Improve continuously", description: "Kanban encourages incremental process improvement rather than one-time process redesign" }
        ]
      },
      {
        id: "boardStructure",
        label: "Board structure",
        items: [
          { id: "workflowColumns", title: "Workflow columns", description: "Columns represent real process states, not abstract placeholders. Typical examples include analysis, development, testing, and deployment" },
          { id: "workItems", title: "Work items", description: "Cards represent pieces of work that move through the system. They should be understandable and granular enough to track clearly" },
          { id: "queuesAndBlockers", title: "Queues and blockers", description: "Waiting states and blocked work must be visible, because hidden queues destroy flow and mask problems" }
        ]
      },
      {
        id: "wipLimitsAndPullLogic",
        label: "WIP limits and pull logic",
        items: [
          { id: "pullBasedStartOfWork", title: "Pull-based start of work", description: "Teams should start new work when capacity is available rather than pushing tasks into overloaded stages" },
          { id: "stageLevelWipControl", title: "Stage-level WIP control", description: "Limits should be placed where overload is likely. If a stage is full, upstream work must pause or help resolve the bottleneck" },
          { id: "finishingOverStarting", title: "Finishing over starting", description: "Kanban rewards completion and stable flow more than keeping everyone busy with many half-finished tasks" }
        ]
      },
      {
        id: "flowMetrics",
        label: "Flow metrics",
        items: [
          { id: "leadTime", title: "Lead time", description: "Total time from request to delivery" },
          { id: "cycleTime", title: "Cycle time", description: "Time from work start to work completion" },
          { id: "throughput", title: "Throughput", description: "Amount of work finished over a period" },
          { id: "flowEfficiencyAndBottlenecks", title: "Flow efficiency and bottlenecks", description: "The team should observe where work waits, not only where work is being actively done" }
        ]
      }
    ]
  },
  teamNeeds: {
    title: "What Kanban needs from the team and organization",
    items: [
      { id: "visualizeRealWork", text: "Willingness to visualize real work instead of hiding queues" },
      { id: "respectWipLimits", text: "Discipline to respect WIP limits even under pressure" },
      { id: "sharedPullUnderstanding", text: "Shared understanding of pull-based work management" },
      { id: "blockerTransparency", text: "Transparency about blockers and wait states" },
      { id: "incrementalImprovement", text: "Readiness to improve the process incrementally" },
      { id: "metricsAsLearningTools", text: "Enough operational maturity to use metrics as learning tools, not as punishment" },
      { id: "continuousReorderingAcceptance", text: "Stakeholder acceptance that priorities can be re-ordered continuously" }
    ],
    callout: {
      id: "practicalNote",
      label: "Practical note",
      description:
        "Kanban does not require the same formal role structure as Scrum, but it still needs behavioral discipline. Without that, the board becomes decorative and WIP limits become fiction"
    }
  },
  commonMistakes: {
    title: "What usually goes wrong",
    items: [
      { id: "passiveStatusBoard", text: "Treating the board as a passive status display instead of an active control tool" },
      { id: "ignoreWipUnderPressure", text: "Ignoring WIP limits when pressure increases" },
      { id: "hideQueuesAndBlockers", text: "Visualizing tasks without visualizing queues and blockers" },
      { id: "oversizedWorkItems", text: "Keeping work items too large or too vague" },
      { id: "measureWithoutAction", text: "Measuring flow but not acting on bottlenecks" },
      { id: "noProcessMyth", text: "Believing Kanban means 'no process' or 'just do tickets'" },
      { id: "architectureCoordinationGap", text: "Using Kanban where major architectural coordination is needed but never planned" },
      { id: "chaoticReprioritization", text: "Reprioritizing work so frequently that flow becomes chaotic" },
      { id: "mixedWorkWithoutPolicies", text: "Mixing support work and strategic feature work without explicit policies" }
    ],
    callout: {
      id: "whyTheseMistakesMatter",
      label: "Why these mistakes matter",
      description:
        "Kanban looks simple, which makes it easy to under-engineer. When teams keep the board but ignore pull logic, limits, and bottleneck management, they preserve the appearance of flow without getting the actual benefits"
    }
  },
  applicability: {
    title: "Where Kanban fits best",
    goodFit: [
      { id: "continuousArrival", text: "Work arrives continuously rather than in clean sprint batches" },
      { id: "frequentPriorityChanges", text: "Priorities can change often during execution" },
      { id: "supportOpsMaintenanceFlow", text: "The team handles support, operations, maintenance, or defect flow" },
      { id: "varyingTaskSizeAndUrgency", text: "Tasks vary in size and urgency" },
      { id: "leadTimeOverIterationCadence", text: "Shorter lead time matters more than fixed iteration cadence" },
      { id: "evolutionaryChangeApproach", text: "The organization wants an evolutionary change approach rather than full process replacement" },
      { id: "visibilityOfQueuesAndCapacity", text: "Delivery benefits from strong visibility of queues, blockers, and stage capacity" }
    ],
    weakerFit: [
      { id: "strictTimeboxedRhythm", text: "The project depends on strict timeboxed iteration rhythm" },
      { id: "stableSprintCommitment", text: "A stable sprint commitment is required by governance or management" },
      { id: "largeArchitectureMilestones", text: "Work must be coordinated around large architecture milestones" },
      { id: "formalStagedAcceptance", text: "Formal staged acceptance dominates delivery" },
      { id: "insufficientWipDiscipline", text: "The team lacks enough discipline to enforce WIP policies" },
      { id: "longRangePredictabilityExpectation", text: "Stakeholders expect long-range predictability from fixed iteration plans rather than flow-based adaptation" },
      { id: "frameworkRolesAndCeremoniesNeeded", text: "The process needs explicit framework roles and recurring ceremonies to function well" }
    ],
    callout: {
      id: "practicalNote",
      label: "Practical note",
      description:
        "Kanban is strongest where work behaves like a service flow. It becomes weaker when the main delivery challenge is not throughput stability but architecture-heavy staged coordination or strict formal governance"
    }
  },
  notCoveredHere: {
    title: "What this page does not cover",
    items: [
      { id: "serviceClassesAndPolicies", text: "Advanced service class design and prioritization policies" },
      { id: "cumulativeFlowInterpretation", text: "Detailed cumulative flow diagram interpretation" },
      { id: "portfolioKanban", text: "Portfolio-level Kanban design" },
      { id: "scrumbanAndHybrids", text: "Scrumban variants and hybrid process design" },
      { id: "largeScaleKanban", text: "Large-scale Kanban implementations across many teams" },
      { id: "quantitativeForecasting", text: "Formal quantitative flow forecasting methods" }
    ]
  },
  studyNext: {
    title: "Suggested future learning path",
    items: [
      { id: "leadTimeCycleTimeThroughput", text: "Learn the difference between lead time, cycle time, and throughput" },
      { id: "setAndRefineWipLimits", text: "Study how to set and refine WIP limits in real teams" },
      { id: "identifyBottlenecks", text: "Practice identifying bottlenecks and blocked work systematically" },
      { id: "compareWithScrum", text: "Compare Kanban and Scrum in mixed product/support environments" },
      { id: "exploreFlowAnalytics", text: "Explore cumulative flow diagrams and other flow analytics" },
      { id: "evolutionaryChange", text: "Study evolutionary process change rather than one-time framework rollout" }
    ]
  }
};
