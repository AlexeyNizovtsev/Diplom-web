# Kanban Methodology Content Draft

## Methodology ID
`kanban`

## Overview

### What Kanban is
Kanban is a flow-based method for managing work through visualization, explicit work policies, and limits on work in progress. In software engineering, it is especially associated with continuous delivery contexts, maintenance-heavy environments, and situations where incoming work is variable and cannot be cleanly packaged into fixed iterations.

### Core idea
Instead of organizing delivery around timeboxed sprints, Kanban organizes work as a continuous flow. New work is usually pulled only when capacity becomes available. This makes Kanban particularly suitable where priorities shift frequently and teams must respond continuously rather than wait for the next iteration boundary.

### Why it matters
Kanban gives teams a lightweight but disciplined way to see bottlenecks, reduce overload, stabilize throughput, and improve lead time. In the project’s decision model, Kanban is the clearest representative of a continuous-flow process with WIP-limited delivery.

### Signal tags
- Continuous flow
- WIP limits
- Pull-based delivery
- Explicit workflow policies

### Quick fit summary
Best for continuous service flow, support work, and changing priorities where visual control and WIP discipline matter more than sprint cadence.

---

## First steps

### Suggested title
How to start applying Kanban

### Step 1 — Visualize the current workflow
Map the real stages that work passes through now, for example request intake, analysis, development, testing, and release. Start from the actual process, not an idealized future process.

### Step 2 — Create the first Kanban board
Represent the workflow visually using columns and work items. Make sure the board reflects real handoffs and queues rather than generic labels.

### Step 3 — Set initial WIP limits
Define simple limits for the busiest stages so the team cannot overload itself with too many parallel tasks. Start conservatively and refine later.

### Step 4 — Make movement rules explicit
Agree on when a work item can enter a stage, leave a stage, or be considered done. These rules should be visible and shared by the team.

### Step 5 — Track flow metrics
Measure lead time, cycle time, throughput, and blockers. Do not turn metrics into bureaucracy; use them to understand where flow breaks down.

### Step 6 — Improve bottlenecks continuously
Use the board and metrics to identify queues, blocked work, and unstable stages. Improve the weakest points first instead of redesigning everything at once.

### Practical note
Kanban works best when the team starts with the current process and evolves it. It does not need a dramatic rollout, but it does require discipline in visualization, pull logic, and WIP control.

---

## Core elements

### Suggested title
Principles, board structure, and flow control

### Intro
Kanban is not defined by ceremonies in the Scrum sense. Its strength comes from how work is visualized, limited, measured, and continuously improved.

### Group 1 — Principles

#### Visualize workflow
The board makes the actual flow of work visible so the team can see progress, queues, and blockers.

#### Limit work in progress
WIP limits reduce overload and force attention on finishing work instead of starting too much in parallel.

#### Manage flow
The team monitors how work moves across the system, especially delays, blocked items, and unstable throughput.

#### Make policies explicit
Rules for pulling work, moving cards, and defining completion should be visible and understood by everyone.

#### Improve continuously
Kanban encourages incremental process improvement rather than one-time process redesign.

### Group 2 — Board structure

#### Workflow columns
Columns represent real process states, not abstract placeholders. Typical examples include analysis, development, testing, and deployment.

#### Work items
Cards represent pieces of work that move through the system. They should be understandable and granular enough to track clearly.

#### Queues and blockers
Waiting states and blocked work must be visible, because hidden queues destroy flow and mask problems.

### Group 3 — WIP limits and pull logic

#### Pull-based start of work
Teams should start new work when capacity is available rather than pushing tasks into overloaded stages.

#### Stage-level WIP control
Limits should be placed where overload is likely. If a stage is full, upstream work must pause or help resolve the bottleneck.

#### Finishing over starting
Kanban rewards completion and stable flow more than keeping everyone busy with many half-finished tasks.

### Group 4 — Flow metrics

#### Lead time
Total time from request to delivery.

#### Cycle time
Time from work start to work completion.

#### Throughput
Amount of work finished over a period.

#### Flow efficiency and bottlenecks
The team should observe where work waits, not only where work is being actively done.

---

## Team needs

### Suggested title
What Kanban needs from the team and organization

- Willingness to visualize real work instead of hiding queues
- Discipline to respect WIP limits even under pressure
- Shared understanding of pull-based work management
- Transparency about blockers and wait states
- Readiness to improve the process incrementally
- Enough operational maturity to use metrics as learning tools, not as punishment
- Stakeholder acceptance that priorities can be re-ordered continuously

### Practical note
Kanban does not require the same formal role structure as Scrum, but it still needs behavioral discipline. Without that, the board becomes decorative and WIP limits become fiction.

---

## Common mistakes

### Suggested title
What usually goes wrong

- Treating the board as a passive status display instead of an active control tool
- Ignoring WIP limits when pressure increases
- Visualizing tasks without visualizing queues and blockers
- Keeping work items too large or too vague
- Measuring flow but not acting on bottlenecks
- Believing Kanban means “no process” or “just do tickets”
- Using Kanban where major architectural coordination is needed but never planned
- Reprioritizing work so frequently that flow becomes chaotic
- Mixing support work and strategic feature work without explicit policies

### Why these mistakes matter
Kanban looks simple, which makes it easy to under-engineer. When teams keep the board but ignore pull logic, limits, and bottleneck management, they preserve the appearance of flow without getting the actual benefits.

---

## Applicability

### Good fit when
- Work arrives continuously rather than in clean sprint batches
- Priorities can change often during execution
- The team handles support, operations, maintenance, or defect flow
- Tasks vary in size and urgency
- Shorter lead time matters more than fixed iteration cadence
- The organization wants an evolutionary change approach rather than full process replacement
- Delivery benefits from strong visibility of queues, blockers, and stage capacity

### Weaker fit when
- The project depends on strict timeboxed iteration rhythm
- A stable sprint commitment is required by governance or management
- Work must be coordinated around large architecture milestones
- Formal staged acceptance dominates delivery
- The team lacks enough discipline to enforce WIP policies
- Stakeholders expect long-range predictability from fixed iteration plans rather than flow-based adaptation
- The process needs explicit framework roles and recurring ceremonies to function well

### Practical note
Kanban is strongest where work behaves like a service flow. It becomes weaker when the main delivery challenge is not throughput stability but architecture-heavy staged coordination or strict formal governance.

---

## Not covered here

### Suggested title
What this page does not cover

- Advanced service class design and prioritization policies
- Detailed cumulative flow diagram interpretation
- Portfolio-level Kanban design
- Scrumban variants and hybrid process design
- Large-scale Kanban implementations across many teams
- Formal quantitative flow forecasting methods

---

## Study next

### Suggested title
Suggested future learning path

1. Learn the difference between lead time, cycle time, and throughput
2. Study how to set and refine WIP limits in real teams
3. Practice identifying bottlenecks and blocked work systematically
4. Compare Kanban and Scrum in mixed product/support environments
5. Explore cumulative flow diagrams and other flow analytics
6. Study evolutionary process change rather than one-time framework rollout

---

## Notes for UI mapping

### Best-fit rationale style
Use Kanban when the project context points toward continuous work arrival, shifting priorities, and the need for pull-based delivery control rather than sprint cadence.

### Expected dimension pattern in the current decision model
- Governance Formalisation: low to moderate
- Requirements Stability: low to moderate
- Risk & Innovation Orientation: usually low to moderate
- Iteration Structure: highest signal, continuous flow
- Organisational Discipline: moderate
- System & Integration Complexity: low to moderate, but can vary by context

### Key contrast with Scrum
- Scrum organizes work through timeboxed sprints and recurring events
- Kanban organizes work through continuous flow and WIP-limited pull
