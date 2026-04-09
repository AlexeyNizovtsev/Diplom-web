# Waterfall Methodology Content Draft

## Methodology ID
`waterfall`

## Overview

### What Waterfall is
Waterfall is a plan-driven sequential development approach in which work progresses through ordered stages such as requirements, design, implementation, testing, and deployment. Its logic assumes that the project can be structured upfront to a meaningful degree and that major downstream work should follow once upstream decisions are sufficiently defined.

### Core idea
Instead of organizing work around continuous reprioritization or lightweight adaptive cycles, Waterfall organizes delivery through staged progression. The method relies on upfront clarification, clear phase boundaries, and controlled advancement from one stage to the next.

### Why it matters
Waterfall remains important because many projects still need predictability, structured approvals, stable requirements, and explicit stage-based coordination. In the project’s decision model, Waterfall is the clearest representative of linear plan-driven delivery under relatively stable conditions.

### Signal tags
- Stable requirements
- Linear delivery
- Upfront planning
- Stage-based control

### Quick fit summary
Best for projects with stable requirements, stronger upfront definition, and a need for structured stage progression rather than continuous adaptation.

---

## First steps

### Suggested title
How to start applying Waterfall

### Step 1 — Define scope and requirements clearly
Document what the system is expected to do, what constraints exist, and what the delivery boundaries are. Waterfall depends on having a stable enough baseline before major downstream work begins.

### Step 2 — Establish phase boundaries and approvals
Decide what the main stages will be, what each stage must produce, and what conditions must be met before moving forward.

### Step 3 — Create the system and software design
Translate approved requirements into a structured design that guides implementation. This design should reduce ambiguity before coding starts.

### Step 4 — Plan implementation and testing work
Prepare the execution path for development and later verification. Testing should not be treated as an afterthought, even if it occurs later in the lifecycle.

### Step 5 — Build according to the agreed design
Implementation should follow the approved structure closely. The purpose of earlier stages is to reduce disruptive redesign during coding.

### Step 6 — Validate and deliver the completed system
Perform testing, correction, acceptance, and deployment in a controlled sequence. The later stages confirm whether the earlier specification and design were adequate.

### Practical note
Waterfall works only if the team truly protects the value of early definition. If requirements remain unstable while the project pretends to be linear, Waterfall becomes expensive and brittle.

---

## Core elements

### Suggested title
Stages, documents, and control points

### Intro
Waterfall is built around structured progression. Its strength comes from clear stages, explicit deliverables, and controlled transition from one phase to the next.

### Group 1 — Stages

#### Requirements analysis
Defines what the system must achieve, what constraints apply, and what the project is expected to deliver.

#### System and software design
Transforms requirements into a design structure that guides implementation and reduces ambiguity.

#### Implementation
Builds the software according to the defined design and requirements baseline.

#### Testing
Verifies that the built system behaves as expected and identifies defects or mismatches.

#### Deployment and maintenance
Moves the system into use and supports corrections or updates after delivery.

### Group 2 — Documents and baselines

#### Requirements specification
Acts as the reference point for what is to be built and verified.

#### Design documentation
Provides the structural basis for implementation decisions.

#### Test documentation
Defines how correctness and completeness will be checked.

#### Approved baselines
Waterfall depends on established reference points. Without them, phase sequencing loses much of its value.

### Group 3 — Control logic

#### Sequential progression
Later phases depend on sufficiently completed earlier phases.

#### Change control
Changes are possible, but they are more expensive after upstream decisions have already been translated into downstream work.

#### Stage reviews and approvals
Movement between stages is usually tied to explicit review or approval conditions.

---

## Team needs

### Suggested title
What Waterfall needs from the team and organization

- Ability to define requirements with reasonable clarity before implementation
- Willingness to commit to stage-based planning
- Enough discipline to maintain approved baselines
- Coordination between analysts, designers, developers, and testers
- Stakeholder readiness to review and approve outputs at defined points
- Documentation discipline where it supports control and traceability
- Organizational preference for predictability over frequent adaptive change

### Practical note
Waterfall does not just need documentation. It needs alignment. If stakeholders keep changing direction informally while the team is supposed to follow fixed stages, the method collapses into slow rework.

---

## Common mistakes

### Suggested title
What usually goes wrong

- Treating Waterfall as “write documents first and hope for the best”
- Freezing requirements that are not actually understood
- Assuming early documents eliminate the need for validation
- Postponing all meaningful feedback until late testing
- Letting design and implementation drift away from approved requirements
- Using Waterfall in contexts with highly volatile scope
- Ignoring the cost of late change while pretending phase order still holds
- Treating sequential stages as permission to isolate teams too strongly
- Equating predictability with the absence of uncertainty

### Why these mistakes matter
Waterfall fails most visibly when the project acts as if uncertainty can be ignored. The method can work under the right conditions, but it performs badly when stability is assumed rather than earned.

---

## Applicability

### Good fit when
- Requirements are relatively stable before implementation begins
- The project benefits from strong upfront clarification
- The organization needs stage-based planning and review
- Predictability and traceability matter more than rapid adaptation
- Formal acceptance or delivery checkpoints are important
- The system can be designed meaningfully before most coding starts
- Stakeholders can commit to clearer early decisions

### Weaker fit when
- Requirements are expected to evolve during delivery
- The project depends on rapid feedback and frequent reprioritization
- Technical uncertainty is high and early prototypes are essential
- Work behaves like continuous service flow rather than staged delivery
- The organization cannot sustain baseline discipline
- Product value depends on iterative discovery rather than upfront definition
- Change is constant enough that late-stage rework becomes likely

### Practical note
Waterfall is strongest when stability is real and early structure is valuable. It becomes weak when the environment demands continuous learning, frequent reprioritization, or risk-driven iteration.

---

## Not covered here

### Suggested title
What this page does not cover

- Full historical debate around the Waterfall model
- All later Waterfall variants and hybrid adaptations
- V-Model and other closely related plan-driven structures
- Formal procurement standards beyond the core lifecycle idea
- Detailed simulation or optimization of resource allocation by phase
- Large-scale compliance tailoring outside the scope of this reference page

---

## Study next

### Suggested title
Suggested future learning path

1. Study how requirements quality affects downstream development cost
2. Learn the difference between phase structure and real change control
3. Compare Waterfall and RUP for disciplined but non-agile delivery
4. Compare Waterfall and GOST 34 in formalized governance contexts
5. Explore why late testing can create expensive redesign loops
6. Study hybrid models used when some structure is needed but stability is incomplete

---

## Notes for UI mapping

### Best-fit rationale style
Use Waterfall when the project has sufficiently stable requirements, benefits from upfront structure, and needs linear stage-based delivery more than iterative adaptation.

### Expected dimension pattern in the current decision model
- Governance Formalisation: moderate to high
- Requirements Stability: high
- Risk & Innovation Orientation: low to moderate
- Iteration Structure: linear or milestone-based
- Organisational Discipline: moderate to high
- System & Integration Complexity: can vary, but often moderate

### Key contrast with RUP
- Waterfall is more linear and assumes stronger upfront stabilization
- RUP remains iterative and architecture-centered even under higher discipline

### Key contrast with GOST 34
- Waterfall is plan-driven but not inherently tied to strict regulatory standardization
- GOST 34 becomes stronger when regulation, formal documentation, and staged acceptance are dominant
