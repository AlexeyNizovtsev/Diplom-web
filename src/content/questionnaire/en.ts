import type { LocalizedQuestionnaireContent } from "@/types/questionnaire";

export const enQuestionnaireContent: LocalizedQuestionnaireContent = {
  blocks: {
    governance: {
      shortLabel: "Governance",
      title: "Governance Formalisation",
      helperText:
        "Consider regulatory standards, mandatory documentation, and formal acceptance procedures across the project lifecycle.",
      questions: {
        regulatoryCompliance: {
          title: "How strong are the project's regulatory or compliance requirements?",
          helperText:
            "Consider mandatory regulatory standards, certification, audit pressure, or external compliance obligations.",
          options: {
            low: { label: "Low", description: "No formal regulatory pressure" },
            moderate: { label: "Moderate", description: "Some audits or external controls" },
            high: { label: "High", description: "Formal compliance affects delivery" },
            strictRegulatory: {
              label: "Strict regulatory",
              description:
                "Mandatory standards, certification, or formal state / industry control"
            }
          }
        },
        stagedDocumentation: {
          title: "How mandatory is staged documentation throughout the project?",
          helperText:
            "Think about formal artifacts such as specifications, reports, approval documents, and stage packages.",
          options: {
            low: { label: "Low", description: "Documentation is lightweight" },
            moderate: { label: "Moderate", description: "Core stage documents are expected" },
            high: { label: "High", description: "Formal documents are needed at most stages" },
            veryHigh: {
              label: "Very high",
              description: "Heavy stage-gated documentation culture"
            }
          }
        },
        formalAcceptance: {
          title: "How formal are acceptance and approval procedures across project stages?",
          helperText:
            "This includes approval gates, sign-off packages, formal acts, and staged acceptance checkpoints.",
          options: {
            low: { label: "Low", description: "Informal approvals only" },
            moderate: {
              label: "Moderate",
              description: "Some stages require formal sign-off"
            },
            high: {
              label: "High",
              description: "Formal acceptance is expected repeatedly"
            },
            veryHigh: {
              label: "Very high",
              description: "Strict staged acceptance and formal acts"
            }
          }
        }
      }
    },
    requirements: {
      shortLabel: "Requirements",
      title: "Requirements Stability",
      helperText:
        "Focus on how stable the scope is expected to remain and how tightly requirement changes are controlled once delivery begins.",
      questions: {
        changeFrequency: {
          title: "How often are core requirements expected to change during delivery?",
          helperText:
            "Focus on business or stakeholder changes that affect scope, priorities, or key functionality.",
          options: {
            veryOften: {
              label: "Very often",
              description: "Requirements are expected to shift continuously"
            },
            sometimes: {
              label: "Sometimes",
              description: "Changes are common but manageable"
            },
            rarely: {
              label: "Rarely",
              description: "Most requirements should remain stable"
            },
            almostNever: {
              label: "Almost never",
              description: "Requirements are expected to stay fixed"
            }
          }
        },
        scopeFixity: {
          title: "How clearly is the main scope expected to be fixed before implementation begins?",
          helperText:
            "Think about whether the team is supposed to start with a defined baseline or discover the product shape during delivery.",
          options: {
            notFixed: {
              label: "Not fixed",
              description: "Scope will emerge during development"
            },
            partiallyFixed: {
              label: "Partially fixed",
              description: "A baseline exists, but major parts may evolve"
            },
            mostlyFixed: {
              label: "Mostly fixed",
              description: "Most of the scope should be known upfront"
            },
            fullyFixed: {
              label: "Fully fixed",
              description: "Scope is expected to be defined before implementation"
            }
          }
        },
        changeControl: {
          title: "How controlled is the process for changing requirements once work is underway?",
          helperText:
            "Consider whether changes are informal, loosely reviewed, or governed through a formal process.",
          options: {
            adHoc: { label: "Ad hoc", description: "Changes happen informally when needed" },
            lightControl: {
              label: "Light control",
              description: "Changes are discussed but loosely managed"
            },
            controlled: {
              label: "Controlled",
              description: "Changes follow a defined review process"
            },
            strictChangeControl: {
              label: "Strict change control",
              description: "Changes require strong formal approval"
            }
          }
        }
      }
    },
    risk: {
      shortLabel: "Risk",
      title: "Risk & Innovation Orientation",
      helperText:
        "Look at uncertainty, consequence of failure, and how much experimentation or R&D should shape the delivery approach.",
      questions: {
        technicalUncertainty: {
          title: "How high is the project's technical uncertainty?",
          helperText:
            "Consider new technology, unclear feasibility, architecture unknowns, or unproven engineering decisions.",
          options: {
            low: {
              label: "Low",
              description: "Technology and solution path are well understood"
            },
            moderate: {
              label: "Moderate",
              description: "Some technical uncertainty exists"
            },
            high: { label: "High", description: "Major technical questions remain open" },
            veryHigh: {
              label: "Very high",
              description: "The project is strongly uncertainty-driven"
            }
          }
        },
        failureCriticality: {
          title: "How critical are the consequences of major system failure or defect?",
          helperText: "Consider operational, financial, legal, safety, or mission impact.",
          options: {
            low: { label: "Low", description: "Failure is undesirable but not severe" },
            moderate: {
              label: "Moderate",
              description: "Failure would create meaningful disruption"
            },
            high: {
              label: "High",
              description: "Failure would create serious business or operational damage"
            },
            critical: {
              label: "Critical",
              description: "Failure has very high consequence or safety-critical impact"
            }
          }
        },
        rndCentrality: {
          title: "How central is experimentation, prototyping, or R&D to the project?",
          helperText:
            "Consider whether the project needs to learn what is feasible before committing to full-scale delivery.",
          options: {
            notCentral: {
              label: "Not central",
              description: "The project is mostly standard implementation"
            },
            limited: {
              label: "Limited",
              description: "Some experimental work is needed"
            },
            significant: {
              label: "Significant",
              description: "Prototyping or exploration matters substantially"
            },
            core: {
              label: "Core",
              description: "The project is strongly innovation- or research-driven"
            }
          }
        }
      }
    },
    iteration: {
      shortLabel: "Iteration",
      title: "Iteration Structure",
      helperText:
        "Choose the delivery rhythm that best fits how work moves: sequentially, by milestones, through planned iterations, or in continuous flow.",
      questions: {
        deliveryRhythm: {
          title: "What delivery rhythm best matches the project?",
          helperText: "Choose the pattern that best describes how work is expected to progress.",
          options: {
            linear: { label: "Linear", description: "Mostly sequential stage progression" },
            milestoneBased: {
              label: "Milestone-based",
              description: "Delivery is organized around major phases or milestones"
            },
            structuredIterations: {
              label: "Structured iterations",
              description: "Work proceeds through planned iteration cycles"
            },
            continuousFlow: {
              label: "Continuous flow",
              description: "Work moves continuously without fixed iteration boundaries"
            }
          }
        },
        reviewCadence: {
          title: "How frequently should usable results be delivered or reviewed?",
          helperText:
            "Think about the expected cadence of inspection, release, or stakeholder review.",
          options: {
            atTheEnd: {
              label: "At the end",
              description: "Main validation happens late in the lifecycle"
            },
            byPhase: {
              label: "By phase",
              description: "Review happens at major stage boundaries"
            },
            regularIncrements: {
              label: "Regular increments",
              description: "Usable results are expected on a repeating cadence"
            },
            continuousOnDemand: {
              label: "Continuous / on demand",
              description: "Work should be deliverable whenever ready"
            }
          }
        },
        workOrganisation: {
          title: "How should ongoing work be organized and controlled day to day?",
          helperText:
            "Consider whether work is managed through stage progression, iteration commitments, or active flow limits.",
          options: {
            generalPlan: {
              label: "No explicit WIP or cadence structure",
              description: "Work mostly follows the general plan"
            },
            batchedByMilestone: {
              label: "Batched by milestone or phase",
              description: "Work is grouped around larger planned chunks"
            },
            sprintStyleCommitment: {
              label: "Sprint-style commitment",
              description: "Work is organized around iteration goals"
            },
            wipLimitedPullFlow: {
              label: "WIP-limited pull flow",
              description:
                "Work starts when capacity is available and limits are respected"
            }
          }
        }
      }
    },
    discipline: {
      shortLabel: "Discipline",
      title: "Organisational Discipline",
      helperText:
        "Reflect on the team's process maturity, role clarity, and how consistently documentation and traceability are sustained.",
      questions: {
        processMaturity: {
          title: "How mature and repeatable are the team's working processes today?",
          helperText:
            "Consider whether the team already works through stable routines or mostly improvises.",
          options: {
            informal: { label: "Informal", description: "Work is largely ad hoc" },
            developing: {
              label: "Developing",
              description: "Some structure exists but is not consistent"
            },
            established: {
              label: "Established",
              description: "Processes are usually followed and repeatable"
            },
            highlyDisciplined: {
              label: "Highly disciplined",
              description: "Process discipline is strong and consistent"
            }
          }
        },
        roleClarity: {
          title: "How clearly defined are roles and responsibilities in the project environment?",
          helperText:
            "Think about product ownership, delivery responsibility, review authority, and process accountability.",
          options: {
            unclear: {
              label: "Unclear",
              description: "Roles are fluid or loosely understood"
            },
            partlyDefined: {
              label: "Partly defined",
              description: "Some responsibilities are clear, others are not"
            },
            clearlyDefined: {
              label: "Clearly defined",
              description: "Core roles and responsibilities are established"
            },
            stronglyFormalised: {
              label: "Strongly formalised",
              description: "Responsibilities are explicit and consistently enforced"
            }
          }
        },
        documentationCulture: {
          title: "How strong is the organisation's documentation and traceability culture?",
          helperText:
            "Consider whether teams are expected to maintain artifacts, rationale, and coordination records consistently.",
          options: {
            minimal: {
              label: "Minimal",
              description: "Documentation is sparse and mostly informal"
            },
            moderate: {
              label: "Moderate",
              description: "Important artifacts are recorded when needed"
            },
            strong: { label: "Strong", description: "Documentation is routinely maintained" },
            veryStrong: {
              label: "Very strong",
              description: "Traceability and documentation discipline are central"
            }
          }
        }
      }
    },
    complexity: {
      shortLabel: "Complexity",
      title: "System & Integration Complexity",
      helperText:
        "Assess architecture depth, number of integrations, and how strongly enterprise or institutional constraints shape delivery.",
      questions: {
        architectureComplexity: {
          title: "How complex is the target system from an architectural point of view?",
          helperText:
            "Consider number of major components, depth of architecture, and need for strong design coordination.",
          options: {
            simple: { label: "Simple", description: "Small or straightforward system" },
            moderate: {
              label: "Moderate",
              description: "Some architectural structure is required"
            },
            complex: {
              label: "Complex",
              description: "Multi-part architecture with substantial coordination"
            },
            veryComplex: {
              label: "Very complex",
              description: "Enterprise-scale or strongly architecture-heavy system"
            }
          }
        },
        externalIntegrationCount: {
          title:
            "How many external systems, services, or organisational environments must be integrated?",
          helperText:
            "Consider APIs, databases, enterprise systems, legacy systems, vendors, or cross-unit dependencies.",
          options: {
            fewOrNone: { label: "Few or none", description: "Mostly standalone" },
            some: {
              label: "Some",
              description: "Several manageable integrations"
            },
            many: {
              label: "Many",
              description: "Numerous integrations with meaningful coordination risk"
            },
            extensive: {
              label: "Extensive",
              description: "Large-scale multi-system environment"
            }
          }
        },
        enterpriseConstraintLevel: {
          title:
            "How constrained is the project by enterprise, institutional, or infrastructure context?",
          helperText:
            "Think about shared platforms, existing architecture standards, infrastructure limits, or organisational dependencies.",
          options: {
            lowConstraint: {
              label: "Low constraint",
              description: "The solution has high local autonomy"
            },
            moderateConstraint: {
              label: "Moderate constraint",
              description: "Some shared environment rules exist"
            },
            highConstraint: {
              label: "High constraint",
              description:
                "Enterprise or institutional context strongly affects design and delivery"
            },
            veryHighConstraint: {
              label: "Very high constraint",
              description:
                "The system is deeply embedded in a critical enterprise environment"
            }
          }
        }
      }
    }
  }
};
