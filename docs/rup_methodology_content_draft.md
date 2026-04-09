# RUP Methodology Content Draft

## Methodology ID
`rup`

## Overview

### What RUP is
Rational Unified Process (RUP) is a disciplined iterative software engineering process that structures development around phases, iterations, architecture, requirements management, quality control, and change management. It is not a lightweight team ritual framework. It is a broader process approach intended to organize complex development in a controlled and traceable way.

### Core idea
RUP combines iterative delivery with strong process discipline. Instead of assuming that all requirements are fixed upfront, it uses iterations to progressively refine understanding and implementation. At the same time, it places strong emphasis on architecture, defined artifacts, managed change, and predictable coordination.

### Why it matters
RUP is useful when a project needs more structure than Scrum or Kanban, but still benefits from iterative development rather than a purely linear lifecycle. In the project’s decision model, RUP is the clearest representative of disciplined iterative development for architecture-heavy and integration-heavy systems.

### Signal tags
- Disciplined iterations
- Architecture-first thinking
- Managed requirements
- Controlled change

### Quick fit summary
Best for architecture-heavy systems, disciplined teams, and projects that need iterative delivery without losing process structure and documentation control.

---

## First steps

### Suggested title
How to start applying RUP

### Step 1 — Define project scope and key risks
Clarify the business objectives, major constraints, and main technical or organizational risks. Do not begin with detailed full-scale execution; begin by understanding what must be stabilized first.

### Step 2 — Establish the core architecture direction
Identify the architectural backbone of the system early. Define the major components, integration boundaries, and technical decisions that will shape later iterations.

### Step 3 — Organize the first phase plan
Structure the work around RUP phases and short internal iterations. Make clear what the team is trying to validate in the early cycle, especially feasibility, requirements understanding, and architecture.

### Step 4 — Set up requirements and change management
Decide how requirements will be captured, refined, traced, and changed. RUP depends on disciplined handling of requirements and controlled evolution rather than informal backlog drift.

### Step 5 — Define essential artifacts and responsibilities
Select the minimum useful set of artifacts, models, and roles for the project. Do not try to use every possible RUP artifact, but do make responsibilities explicit.

### Step 6 — Iterate with validation, not just activity
Run iterations that produce validated progress: clarified requirements, executable architecture, tested functionality, and controlled decisions. Iterations should reduce uncertainty, not merely consume time.

### Practical note
RUP works best when adapted intelligently. The common mistake is either making it too heavy and bureaucratic or stripping away so much discipline that only the name remains.

---

## Core elements

### Suggested title
Phases, iterations, practices, and artifacts

### Intro
RUP combines a time structure with a disciplined static structure. Its value comes from how phases, iterations, architecture, artifacts, and management practices work together.

### Group 1 — Phases

#### Inception
Clarifies project goals, scope, business case, major risks, and overall direction. This is not full detailed design; it is early framing and feasibility.

#### Elaboration
Stabilizes the architecture and reduces the most important risks. This phase is critical in RUP because it determines whether the project is truly ready for full-scale construction.

#### Construction
Builds the system through iterative implementation and validation. The focus shifts toward producing working functionality on top of the established architectural base.

#### Transition
Moves the system toward operational use through deployment, correction, user readiness, and release stabilization.

### Group 2 — Iterations

#### Iterative development
RUP is not linear execution with a few checkpoints. Each phase can contain iterations, and each iteration should produce concrete, reviewable progress.

#### Risk reduction through iterations
Iterations are used to address uncertainty early rather than postponing difficult issues until late delivery stages.

#### Controlled learning
Iterations help the team refine understanding, but within a managed process rather than through ad hoc improvisation.

### Group 3 — Core practices

#### Manage requirements
Requirements are captured, organized, and traced so that design, implementation, and testing stay connected.

#### Architecture-centric development
A robust executable architecture is treated as a central organizing principle of the project.

#### Verify quality continuously
Quality is not postponed to the end. Testing and validation are part of the lifecycle, not an afterthought.

#### Control changes
Configuration and change management are treated as essential, especially in larger or longer-running projects.

#### Visual modeling
RUP has historically emphasized modeling as a communication and design tool, especially for complex systems.

### Group 4 — Artifacts

#### Use-case and requirements artifacts
These help structure functional understanding and connect project intent to design and validation.

#### Architecture and design artifacts
These express the structural solution and major technical decisions.

#### Test artifacts
These support quality verification across iterations.

#### Management artifacts
These help coordinate scope, progress, change, and project control.

---

## Team needs

### Suggested title
What RUP needs from the team and organization

- Enough process maturity to sustain defined responsibilities and artifacts
- Strong architectural ownership early in the project
- Willingness to manage requirements explicitly instead of informally
- Discipline in iteration planning and review
- Readiness to maintain documentation where it adds coordination value
- Capacity to control changes and configurations systematically
- Stakeholder acceptance that early iterations may focus on architecture and risk reduction rather than visible feature volume

### Practical note
RUP depends less on ritual cadence than Scrum and more on process discipline. If the team cannot sustain structured responsibility, artifact maintenance, and controlled iteration goals, RUP quickly degrades into either paperwork or confusion.

---

## Common mistakes

### Suggested title
What usually goes wrong

- Treating RUP like a mini-waterfall with documentation after each stage
- Trying to implement the full process product without adaptation
- Ignoring the architectural focus of Elaboration
- Running iterations that produce activity but not validated learning
- Maintaining too many artifacts with no real decision value
- Letting requirements grow without disciplined traceability
- Using RUP language but managing change informally
- Assuming that “iterative” means process discipline is optional
- Making the process so heavy that delivery speed collapses

### Why these mistakes matter
RUP is often criticized not because its core logic is weak, but because teams either over-implement it mechanically or under-implement it selectively. In both cases, the balance between discipline and iterative learning is lost.

---

## Applicability

### Good fit when
- The system is architecture-heavy or integration-heavy
- The project needs iterative delivery but with stronger governance than lightweight agile frameworks provide
- Requirements are not fully stable, but must still be managed carefully
- Technical risk needs to be reduced before full-scale construction
- Multiple roles or teams need a common process language
- Documentation and traceability have real coordination value
- The organization can sustain controlled change and process discipline

### Weaker fit when
- The project is small and fast-moving with little architecture pressure
- Work behaves more like continuous service flow than project-based delivery
- The team cannot sustain explicit process structure
- Governance is so strict that a staged formal model is more appropriate
- The context strongly favors lightweight adaptive iteration with minimal artifacts
- The organization wants immediate feature throughput over architectural stabilization
- The project lacks the scale or complexity needed to justify the added process overhead

### Practical note
RUP is strongest in the middle ground between strict staged governance and lightweight agile flow. It fits when iterative development is needed, but so are architecture, controlled change, and process discipline.

---

## Not covered here

### Suggested title
What this page does not cover

- Full historical evolution of the Unified Process family
- Detailed UML modeling practice
- Full artifact catalog and tailoring options
- Enterprise process customization at scale
- Toolchain-specific RUP implementations
- Formal comparison of RUP variants and later process descendants

---

## Study next

### Suggested title
Suggested future learning path

1. Learn the purpose of the four RUP phases and how they differ
2. Study architecture-centric development in iterative projects
3. Understand requirements traceability and controlled change management
4. Explore how RUP tailors artifacts to project size and risk
5. Compare RUP with Waterfall for structured governance contexts
6. Compare RUP with Scrum for disciplined iterative delivery contexts

---

## Notes for UI mapping

### Best-fit rationale style
Use RUP when the project requires iterative development, but architecture, traceability, and controlled change matter too much for a lightweight flow-first or sprint-first approach.

### Expected dimension pattern in the current decision model
- Governance Formalisation: moderate to high
- Requirements Stability: moderate
- Risk & Innovation Orientation: moderate
- Iteration Structure: structured iterations
- Organisational Discipline: high
- System & Integration Complexity: high

### Key contrast with Waterfall
- Waterfall assumes stronger linear stage progression and more stable upfront structure
- RUP keeps stronger discipline than Scrum, but remains iterative and architecture-centered

### Key contrast with Scrum
- Scrum is lighter, more cadence-centered, and less artifact-heavy
- RUP is more process-structured, architecture-driven, and documentation-aware
