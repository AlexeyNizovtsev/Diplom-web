# Assessment Questionnaire Content Draft

## Purpose

This file defines the full content draft for the assessment questionnaire used in the SDLC methodology selection tool.

The questionnaire follows the agreed hierarchical model:
- 6 aggregated decision dimensions
- multiple sub-questions per dimension
- categorical answer options
- rule-based downstream mapping to methodology ranking

The six dimensions are:
1. Governance Formalisation
2. Requirements Stability
3. Risk & Innovation Orientation
4. Iteration Structure
5. Organisational Discipline
6. System & Integration Complexity

The dimension set and their sub-criteria are aligned with the agreed project model:
- Governance Formalisation includes regulatory compliance, mandatory documentation, and formal acceptance
- Requirements Stability includes change frequency, fixation of scope, and change control
- Risk & Innovation Orientation includes technical uncertainty, criticality, and R&D
- Iteration Structure includes linear stages, milestones, structured iterations, and continuous flow
- Organisational Discipline includes process maturity, role clarity, and documentation culture
- System & Integration Complexity includes integrations, architecture scale, and enterprise constraints

---

# Block 1 — Governance Formalisation

## Block intent
This block captures how strongly the project is shaped by regulation, mandatory documentation, stage approvals, and formal acceptance procedures.

## Question 1
**How strong are the project’s regulatory or compliance requirements?**

Helper text: Consider mandatory regulatory standards, certification, audit pressure, or external compliance obligations.

Options:
- **Low** — No formal regulatory pressure
- **Moderate** — Some audits or external controls
- **High** — Formal compliance affects delivery
- **Strict regulatory** — Mandatory standards, certification, or formal state / industry control

## Question 2
**How mandatory is staged documentation throughout the project?**

Helper text: Think about formal artifacts such as specifications, reports, approval documents, and stage packages.

Options:
- **Low** — Documentation is lightweight
- **Moderate** — Core stage documents are expected
- **High** — Formal documents are needed at most stages
- **Very high** — Heavy stage-gated documentation culture

## Question 3
**How formal are acceptance and approval procedures across project stages?**

Helper text: This includes approval gates, sign-off packages, formal acts, and staged acceptance checkpoints.

Options:
- **Low** — Informal approvals only
- **Moderate** — Some stages require formal sign-off
- **High** — Formal acceptance is expected repeatedly
- **Very high** — Strict staged acceptance and formal acts

---

# Block 2 — Requirements Stability

## Block intent
This block captures how fixed the requirements are before development and how controlled requirement changes must be during delivery.

## Question 1
**How often are core requirements expected to change during delivery?**

Helper text: Focus on business or stakeholder changes that affect scope, priorities, or key functionality.

Options:
- **Very often** — Requirements are expected to shift continuously
- **Sometimes** — Changes are common but manageable
- **Rarely** — Most requirements should remain stable
- **Almost never** — Requirements are expected to stay fixed

## Question 2
**How clearly is the main scope expected to be fixed before implementation begins?**

Helper text: Think about whether the team is supposed to start with a defined baseline or discover the product shape during delivery.

Options:
- **Not fixed** — Scope will emerge during development
- **Partially fixed** — A baseline exists, but major parts may evolve
- **Mostly fixed** — Most of the scope should be known upfront
- **Fully fixed** — Scope is expected to be defined before implementation

## Question 3
**How controlled is the process for changing requirements once work is underway?**

Helper text: Consider whether changes are informal, loosely reviewed, or governed through a formal process.

Options:
- **Ad hoc** — Changes happen informally when needed
- **Light control** — Changes are discussed but loosely managed
- **Controlled** — Changes follow a defined review process
- **Strict change control** — Changes require strong formal approval

---

# Block 3 — Risk & Innovation Orientation

## Block intent
This block captures whether uncertainty, innovation, experimentation, or high consequence risk should dominate process choice.

## Question 1
**How high is the project’s technical uncertainty?**

Helper text: Consider new technology, unclear feasibility, architecture unknowns, or unproven engineering decisions.

Options:
- **Low** — Technology and solution path are well understood
- **Moderate** — Some technical uncertainty exists
- **High** — Major technical questions remain open
- **Very high** — The project is strongly uncertainty-driven

## Question 2
**How critical are the consequences of major system failure or defect?**

Helper text: Consider operational, financial, legal, safety, or mission impact.

Options:
- **Low** — Failure is undesirable but not severe
- **Moderate** — Failure would create meaningful disruption
- **High** — Failure would create serious business or operational damage
- **Critical** — Failure has very high consequence or safety-critical impact

## Question 3
**How central is experimentation, prototyping, or R&D to the project?**

Helper text: Consider whether the project needs to learn what is feasible before committing to full-scale delivery.

Options:
- **Not central** — The project is mostly standard implementation
- **Limited** — Some experimental work is needed
- **Significant** — Prototyping or exploration matters substantially
- **Core** — The project is strongly innovation- or research-driven

---

# Block 4 — Iteration Structure

## Block intent
This block captures how work is expected to move: linearly, by milestones, through structured iterations, or as continuous flow.

## Question 1
**What delivery rhythm best matches the project?**

Helper text: Choose the pattern that best describes how work is expected to progress.

Options:
- **Linear** — Mostly sequential stage progression
- **Milestone-based** — Delivery is organized around major phases or milestones
- **Structured iterations** — Work proceeds through planned iteration cycles
- **Continuous flow** — Work moves continuously without fixed iteration boundaries

## Question 2
**How frequently should usable results be delivered or reviewed?**

Helper text: Think about the expected cadence of inspection, release, or stakeholder review.

Options:
- **At the end** — Main validation happens late in the lifecycle
- **By phase** — Review happens at major stage boundaries
- **Regular increments** — Usable results are expected on a repeating cadence
- **Continuous / on demand** — Work should be deliverable whenever ready

## Question 3
**How should ongoing work be organized and controlled day to day?**

Helper text: Consider whether work is managed through stage progression, iteration commitments, or active flow limits.

Options:
- **No explicit WIP or cadence structure** — Work mostly follows the general plan
- **Batched by milestone or phase** — Work is grouped around larger planned chunks
- **Sprint-style commitment** — Work is organized around iteration goals
- **WIP-limited pull flow** — Work starts when capacity is available and limits are respected

---

# Block 5 — Organisational Discipline

## Block intent
This block captures whether the team and organisation can sustain explicit roles, process discipline, documentation habits, and stable execution routines.

## Question 1
**How mature and repeatable are the team’s working processes today?**

Helper text: Consider whether the team already works through stable routines or mostly improvises.

Options:
- **Informal** — Work is largely ad hoc
- **Developing** — Some structure exists but is not consistent
- **Established** — Processes are usually followed and repeatable
- **Highly disciplined** — Process discipline is strong and consistent

## Question 2
**How clearly defined are roles and responsibilities in the project environment?**

Helper text: Think about product ownership, delivery responsibility, review authority, and process accountability.

Options:
- **Unclear** — Roles are fluid or loosely understood
- **Partly defined** — Some responsibilities are clear, others are not
- **Clearly defined** — Core roles and responsibilities are established
- **Strongly formalised** — Responsibilities are explicit and consistently enforced

## Question 3
**How strong is the organisation’s documentation and traceability culture?**

Helper text: Consider whether teams are expected to maintain artifacts, rationale, and coordination records consistently.

Options:
- **Minimal** — Documentation is sparse and mostly informal
- **Moderate** — Important artifacts are recorded when needed
- **Strong** — Documentation is routinely maintained
- **Very strong** — Traceability and documentation discipline are central

---

# Block 6 — System & Integration Complexity

## Block intent
This block captures the technical and organisational complexity of the system context, especially integrations, architecture, scale, and enterprise constraints.

## Question 1
**How complex is the target system from an architectural point of view?**

Helper text: Consider number of major components, depth of architecture, and need for strong design coordination.

Options:
- **Simple** — Small or straightforward system
- **Moderate** — Some architectural structure is required
- **Complex** — Multi-part architecture with substantial coordination
- **Very complex** — Enterprise-scale or strongly architecture-heavy system

## Question 2
**How many external systems, services, or organisational environments must be integrated?**

Helper text: Consider APIs, databases, enterprise systems, legacy systems, vendors, or cross-unit dependencies.

Options:
- **Few or none** — Mostly standalone
- **Some** — Several manageable integrations
- **Many** — Numerous integrations with meaningful coordination risk
- **Extensive** — Large-scale multi-system environment

## Question 3
**How constrained is the project by enterprise, institutional, or infrastructure context?**

Helper text: Think about shared platforms, existing architecture standards, infrastructure limits, or organisational dependencies.

Options:
- **Low constraint** — The solution has high local autonomy
- **Moderate constraint** — Some shared environment rules exist
- **High constraint** — Enterprise or institutional context strongly affects design and delivery
- **Very high constraint** — The system is deeply embedded in a critical enterprise environment

---

# General notes for implementation

## Required behavior
- One answer per question
- No “I’m not sure” option
- Assessment progresses by block
- Responses are saved automatically
- Conditional subquestions may be added later below relevant parent questions

## UI guidance
- Display one block per page
- Keep the visible label in the progress area as `Block X of 6`
- Each question should use answer cards, not radio lists
- Selected state must be visually explicit
- Block helper text should help the user answer, not explain internal scoring logic
