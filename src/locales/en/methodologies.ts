import type { MethodologiesDictionary } from "@/types/common";

const goodFitTitle = "Good fit when";
const weakerFitTitle = "Weaker fit when";

export const methodologies: MethodologiesDictionary = {
  pageIntro: {
    title: "Methodology reference",
    description:
      "Use this page as a practical reference after the recommendation: what the method is, how to begin, what it requires, and where it fits."
  },
  tabsLabel: "Methodology tabs",
  sidebarLabel: "Methodology sections",
  coreElementsLabel: "Core element groups",
  firstStepLabelPrefix: "Step",
  sections: {
    overview: "Overview",
    firstSteps: "First steps",
    coreElements: "Core elements",
    teamNeeds: "Team needs",
    commonMistakes: "Common mistakes",
    applicability: "Applicability",
    notCoveredHere: "Not covered here",
    studyNext: "Study next"
  },
  content: {
    waterfall: {
      id: "waterfall",
      title: "Waterfall",
      overview: {
        description: "A staged model built around fixed phase transitions, formal review points, and controlled change handling.",
        signalTags: [
          { id: "staged", label: "Stage-based delivery" },
          { id: "stable", label: "Stable scope" },
          { id: "reviews", label: "Formal reviews" }
        ]
      },
      firstSteps: {
        mode: "sequence",
        intro: "Fix the scope baseline and phase gates before detailed delivery starts.",
        steps: [
          { id: "scope", title: "Define scope baseline", description: "Agree goals, constraints, and acceptance targets." },
          { id: "plan", title: "Break work into phases", description: "Set the flow of analysis, design, build, and test." },
          { id: "gates", title: "Run gate reviews", description: "Move forward only after each major output is accepted.", emphasis: "final" }
        ]
      },
      coreElements: {
        intro: "Waterfall works when phases, documents, and gate criteria stay explicit.",
        groups: [
          {
            id: "stages",
            label: "Stages",
            items: [
              { id: "analysis", title: "Requirements and analysis", description: "Clarify scope before solution build begins." },
              { id: "delivery", title: "Build and test", description: "Execute work in large planned delivery stages." }
            ]
          },
          {
            id: "controlGates",
            label: "Control gates",
            items: [
              { id: "exit", title: "Exit criteria", description: "Each phase needs a clear definition of completion." },
              { id: "approvals", title: "Approval logic", description: "Stakeholders review outputs before the next phase starts." }
            ]
          }
        ]
      },
      teamNeeds: {
        items: [
          { id: "docs", text: "Strong documentation and approval discipline." },
          { id: "roles", text: "Clear ownership for requirements, design, and sign-off." }
        ]
      },
      commonMistakes: {
        items: [
          { id: "fakeDocs", text: "Treating documents as paperwork instead of control tools." },
          { id: "lateChanges", text: "Allowing major late changes without formal change control." }
        ]
      },
      applicability: {
        goodFitTitle,
        weakerFitTitle,
        goodFit: [
          { id: "regulated", text: "Requirements are stable and traceability matters." },
          { id: "formal", text: "Formal approvals are a central delivery constraint." }
        ],
        weakerFit: [
          { id: "volatile", text: "Requirements change frequently during delivery." },
          { id: "discovery", text: "The work depends on fast experimentation." }
        ]
      },
      notCoveredHere: {
        items: [
          { id: "portfolio", text: "Portfolio governance design." },
          { id: "hybrids", text: "Detailed hybrid stage-gate tailoring." }
        ]
      },
      studyNext: {
        items: [
          { id: "changeControl", text: "Change control design." },
          { id: "traceability", text: "Requirements traceability practices." }
        ]
      },
      quickFit: {
        summary: "Best for contexts with stable scope, formal governance, and staged acceptance."
      }
    },
    spiral: {
      id: "spiral",
      title: "Spiral",
      overview: {
        description: "A risk-driven iterative model that uses learning loops, evaluation, and prototypes to reduce uncertainty.",
        signalTags: [
          { id: "risk", label: "Risk-driven cycles" },
          { id: "prototype", label: "Prototype learning" },
          { id: "uncertainty", label: "High uncertainty" }
        ]
      },
      firstSteps: {
        mode: "sequence",
        intro: "Build the first loop around the highest risks instead of around feature volume.",
        steps: [
          { id: "risks", title: "List the main risks", description: "Capture technical, operational, and stakeholder uncertainty." },
          { id: "loops", title: "Design loop goals", description: "Choose what each cycle must validate or reduce." },
          { id: "review", title: "Evaluate and re-plan", description: "Review what changed and shape the next loop.", emphasis: "final" }
        ]
      },
      coreElements: {
        intro: "Spiral is held together by explicit risk handling and loop-by-loop evaluation.",
        groups: [
          {
            id: "riskCycle",
            label: "Risk cycle",
            items: [
              { id: "identify", title: "Risk identification", description: "Start each loop with the main unknowns." },
              { id: "mitigation", title: "Risk mitigation", description: "Choose work that reduces uncertainty before scaling delivery." }
            ]
          },
          {
            id: "evaluationLoop",
            label: "Evaluation loop",
            items: [
              { id: "review", title: "Stakeholder review", description: "Use each loop to support a concrete decision." },
              { id: "next", title: "Next-loop planning", description: "Reframe scope after every evaluation." }
            ]
          }
        ]
      },
      teamNeeds: {
        items: [
          { id: "riskCulture", text: "A team that can discuss risk openly." },
          { id: "expertise", text: "Enough depth to design useful prototypes and experiments." }
        ]
      },
      commonMistakes: {
        items: [
          { id: "generic", text: "Calling any iteration Spiral without real risk focus." },
          { id: "skipReview", text: "Skipping evaluation and moving forward on intuition alone." }
        ]
      },
      applicability: {
        goodFitTitle,
        weakerFitTitle,
        goodFit: [
          { id: "uncertain", text: "Technical or operational uncertainty is high." },
          { id: "critical", text: "The project cannot afford naive linear planning." }
        ],
        weakerFit: [
          { id: "routine", text: "The work is routine and uncertainty is already low." },
          { id: "rigid", text: "A fixed phase plan is mandatory from the start." }
        ]
      },
      notCoveredHere: {
        items: [
          { id: "safety", text: "Detailed safety-case engineering." },
          { id: "hybrid", text: "Hybrid Spiral governance models." }
        ]
      },
      studyNext: {
        items: [
          { id: "riskReview", text: "Risk review facilitation." },
          { id: "prototypeStrategy", text: "Prototype strategy and experiment design." }
        ]
      },
      quickFit: {
        summary: "Best for high-risk work where reducing uncertainty matters more than locking the full plan early."
      }
    },
    gost34: {
      id: "gost34",
      title: "GOST 34",
      overview: {
        description: "A structured systems-development family centred on staged work, formal documentation, and acceptance logic.",
        signalTags: [
          { id: "docs", label: "Formal documentation" },
          { id: "acceptance", label: "Acceptance control" },
          { id: "governed", label: "Governed delivery" }
        ]
      },
      firstSteps: {
        mode: "sequence",
        intro: "Align stage boundaries, document ownership, and acceptance expectations from the beginning.",
        steps: [
          { id: "scope", title: "Define system boundaries", description: "Clarify the system and the formal constraints around it." },
          { id: "documents", title: "Assign document owners", description: "Map review and approval responsibility for each artifact." },
          { id: "acceptance", title: "Plan acceptance path", description: "Define the evidence and checkpoints for acceptance.", emphasis: "final" }
        ]
      },
      coreElements: {
        intro: "The method is driven by stage progression, documentation discipline, and acceptance evidence.",
        groups: [
          {
            id: "stages",
            label: "Stages",
            items: [
              { id: "early", title: "Early stages", description: "Shape the system baseline and project expectations." },
              { id: "later", title: "Implementation stages", description: "Move the approved concept into working delivery and rollout." }
            ]
          },
          {
            id: "acceptance",
            label: "Acceptance logic",
            items: [
              { id: "tests", title: "Acceptance-oriented testing", description: "Testing produces evidence for formal acceptance." },
              { id: "commissioning", title: "Commissioning readiness", description: "Operational readiness matters alongside build completion." }
            ]
          }
        ]
      },
      teamNeeds: {
        items: [
          { id: "culture", text: "Strong document and records culture." },
          { id: "traceability", text: "Ability to keep traceability between requirements, outputs, and tests." }
        ]
      },
      commonMistakes: {
        items: [
          { id: "surface", text: "Copying the document form while ignoring the control logic." },
          { id: "lateAcceptance", text: "Thinking about acceptance only near the end." }
        ]
      },
      applicability: {
        goodFitTitle,
        weakerFitTitle,
        goodFit: [
          { id: "regulated", text: "Formal governance and acceptance evidence are mandatory." },
          { id: "enterprise", text: "The project sits inside a controlled enterprise or public environment." }
        ],
        weakerFit: [
          { id: "fast", text: "The team needs lightweight discovery and rapid change." },
          { id: "minimalDocs", text: "The organisation cannot sustain documentation discipline." }
        ]
      },
      notCoveredHere: {
        items: [
          { id: "legal", text: "Legal interpretation of the standards." },
          { id: "templates", text: "A full artifact template library." }
        ]
      },
      studyNext: {
        items: [
          { id: "tailoring", text: "Document tailoring strategy." },
          { id: "acceptancePlanning", text: "Acceptance and commissioning planning." }
        ]
      },
      quickFit: {
        summary: "Best for highly governed system work that depends on formal documentation and acceptance control."
      }
    },
    rup: {
      id: "rup",
      title: "RUP",
      overview: {
        description: "An iterative model that combines lifecycle phases, architecture focus, and explicit disciplines for complex systems.",
        signalTags: [
          { id: "architecture", label: "Architecture-first" },
          { id: "disciplined", label: "Disciplined iterations" },
          { id: "complex", label: "Complex systems" }
        ]
      },
      firstSteps: {
        mode: "sequence",
        intro: "Shape the lifecycle and architecture plan before expanding feature delivery.",
        steps: [
          { id: "vision", title: "Capture vision and use cases", description: "Clarify scope and the core system behaviours." },
          { id: "phases", title: "Define lifecycle phases", description: "Set expectations for inception, elaboration, construction, and transition." },
          { id: "architecture", title: "Stabilise architecture early", description: "Reduce architecture risk before full construction.", emphasis: "final" }
        ]
      },
      coreElements: {
        intro: "RUP gains value from architecture-centred lifecycle discipline, not from iteration alone.",
        groups: [
          {
            id: "phases",
            label: "Phases",
            items: [
              { id: "early", title: "Inception and elaboration", description: "Frame the business case and architecture baseline." },
              { id: "later", title: "Construction and transition", description: "Scale delivery and prepare controlled rollout." }
            ]
          },
          {
            id: "practices",
            label: "Practices",
            items: [
              { id: "architecture", title: "Architecture-centric planning", description: "Architecture is treated as a delivery driver." },
              { id: "artifacts", title: "Artifact discipline", description: "Key artifacts align analysis, design, build, and test." }
            ]
          }
        ]
      },
      teamNeeds: {
        items: [
          { id: "leadership", text: "Strong architecture and technical leadership." },
          { id: "discipline", text: "Teams able to keep iterations structured instead of ad hoc." }
        ]
      },
      commonMistakes: {
        items: [
          { id: "heavy", text: "Keeping every possible artifact instead of tailoring the process." },
          { id: "lateArchitecture", text: "Leaving architecture risk too late in the lifecycle." }
        ]
      },
      applicability: {
        goodFitTitle,
        weakerFitTitle,
        goodFit: [
          { id: "architectureRisk", text: "Architecture complexity must be reduced early." },
          { id: "structuredIteration", text: "The organisation wants iteration with stronger structure." }
        ],
        weakerFit: [
          { id: "small", text: "The team is too small to justify the process overhead." },
          { id: "simple", text: "The system is simple enough for a lighter method." }
        ]
      },
      notCoveredHere: {
        items: [
          { id: "catalog", text: "A full artifact catalog." },
          { id: "tooling", text: "Tool-specific implementation guidance." }
        ]
      },
      studyNext: {
        items: [
          { id: "reviews", text: "Architecture review practices." },
          { id: "iterationPlanning", text: "Iteration and milestone planning." }
        ]
      },
      quickFit: {
        summary: "Best for complex systems that need iterative delivery with stronger architecture and lifecycle discipline."
      }
    },
    scrum: {
      id: "scrum",
      title: "Scrum",
      overview: {
        description: "A timeboxed adaptive framework built around sprint cadence, explicit roles, and regular inspection.",
        signalTags: [
          { id: "sprints", label: "Timeboxed sprints" },
          { id: "feedback", label: "Regular feedback" },
          { id: "adaptive", label: "Adaptive planning" }
        ]
      },
      firstSteps: {
        mode: "sequence",
        intro: "Start with roles, backlog discipline, and a sprint rhythm that the team can actually keep.",
        steps: [
          { id: "roles", title: "Assign core roles", description: "Clarify product ownership, delivery responsibility, and facilitation." },
          { id: "backlog", title: "Create a usable backlog", description: "Build an ordered backlog with visible priorities." },
          { id: "loop", title: "Run inspect-and-adapt loops", description: "Use sprint review and retrospective outcomes to improve the next cycle.", emphasis: "final" }
        ]
      },
      coreElements: {
        intro: "Scrum stays coherent when roles, events, and artifacts reinforce one operating loop.",
        groups: [
          {
            id: "roles",
            label: "Roles",
            items: [
              { id: "owner", title: "Product Owner", description: "Owns backlog ordering and value decisions." },
              { id: "team", title: "Scrum Team", description: "Delivers increments and improves how the work gets done." }
            ]
          },
          {
            id: "events",
            label: "Events and artifacts",
            items: [
              { id: "planning", title: "Planning and review", description: "Connect sprint goals to stakeholder feedback." },
              { id: "backlog", title: "Backlog and increment", description: "Keep work visible and outcomes inspectable." }
            ]
          }
        ]
      },
      teamNeeds: {
        items: [
          { id: "ownership", text: "Real product ownership and backlog authority." },
          { id: "cadence", text: "A team able to maintain a reliable sprint rhythm." }
        ]
      },
      commonMistakes: {
        items: [
          { id: "fakeScrum", text: "Keeping the ceremonies while removing the real roles." },
          { id: "retro", text: "Running retrospectives without changing team behaviour." }
        ]
      },
      applicability: {
        goodFitTitle,
        weakerFitTitle,
        goodFit: [
          { id: "adaptive", text: "Requirements evolve and frequent feedback can improve direction." },
          { id: "crossFunctional", text: "A cross-functional team can deliver usable increments." }
        ],
        weakerFit: [
          { id: "interrupts", text: "The team cannot protect sprint commitments from constant interrupts." },
          { id: "formal", text: "Formal approvals dominate every delivery step." }
        ]
      },
      notCoveredHere: {
        items: [
          { id: "scaled", text: "Scaled Scrum frameworks." },
          { id: "transformation", text: "Organisation-wide agile transformation." }
        ]
      },
      studyNext: {
        items: [
          { id: "refinement", text: "Backlog refinement practices." },
          { id: "goals", text: "Sprint goal design." }
        ]
      },
      quickFit: {
        summary: "Best for adaptive product work that benefits from short, structured inspect-and-adapt cycles."
      }
    },
    kanban: {
      id: "kanban",
      title: "Kanban",
      overview: {
        description: "A flow-oriented approach that visualises work, limits WIP, and improves the system through flow metrics.",
        signalTags: [
          { id: "flow", label: "Continuous flow" },
          { id: "wip", label: "WIP limits" },
          { id: "service", label: "Service-oriented delivery" }
        ]
      },
      firstSteps: {
        mode: "sequence",
        intro: "Make the workflow visible and control work-in-progress before trying to speed everything up.",
        steps: [
          { id: "map", title: "Map the workflow", description: "Show the real stages of work on a shared board." },
          { id: "limits", title: "Set WIP limits", description: "Constrain how much work can be in progress at once." },
          { id: "metrics", title: "Review flow metrics", description: "Use aging work and cycle time to improve the system.", emphasis: "final" }
        ]
      },
      coreElements: {
        intro: "Kanban is more than a board. Its strength comes from flow policies and measurable system behaviour.",
        groups: [
          {
            id: "boardStructure",
            label: "Board structure",
            items: [
              { id: "states", title: "Workflow states", description: "Columns should reflect meaningful states of work." },
              { id: "policies", title: "Pull policies", description: "Rules define when work can move and what done means." }
            ]
          },
          {
            id: "flowMetrics",
            label: "Flow control",
            items: [
              { id: "wip", title: "WIP limits", description: "WIP limits surface overload and force prioritisation." },
              { id: "metrics", title: "Cycle time and aging", description: "Metrics reveal where flow gets stuck." }
            ]
          }
        ]
      },
      teamNeeds: {
        items: [
          { id: "visibility", text: "Willingness to expose real workflow problems." },
          { id: "discipline", text: "Discipline to respect pull rules and WIP limits." }
        ]
      },
      commonMistakes: {
        items: [
          { id: "boardOnly", text: "Using a board without changing work policies." },
          { id: "ignoreMetrics", text: "Talking about flow without measuring bottlenecks." }
        ]
      },
      applicability: {
        goodFitTitle,
        weakerFitTitle,
        goodFit: [
          { id: "serviceFlow", text: "Work arrives continuously and priorities can shift often." },
          { id: "support", text: "Service, maintenance, or platform work needs visible flow control." }
        ],
        weakerFit: [
          { id: "timebox", text: "The organisation requires strict sprint-style timeboxes." },
          { id: "hidden", text: "The team will not expose real workflow stages and overload." }
        ]
      },
      notCoveredHere: {
        items: [
          { id: "portfolio", text: "Portfolio Kanban design." },
          { id: "forecasting", text: "Advanced probabilistic forecasting." }
        ]
      },
      studyNext: {
        items: [
          { id: "wipDesign", text: "WIP policy design." },
          { id: "flowReview", text: "Flow review facilitation." }
        ]
      },
      quickFit: {
        summary: "Best for continuous work systems that need visible flow, WIP control, and steady improvement."
      }
    }
  }
};
