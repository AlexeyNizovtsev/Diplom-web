# Methodologies Page Specification

## Page ID

`methodologies`

## Route

`/methodologies`

Possible future enhancements:
- `/methodologies/[methodologyId]`
- `/methodologies?method=scrum`
- `/methodologies?method=kanban§ion=first-steps`

The first implementation does not require separate route files per methodology if a shared template and config-based rendering are used.

## Purpose

The Methodologies page is the structured reference layer of the product.

Its job is not to replace books, standards, or official guides. Its job is to help a user:

1. understand what a methodology is in practical terms
2. see how to start applying it
3. review the main structural elements of the method
4. understand its limits and typical mistakes
5. know what to study next if deeper implementation is needed

This page is especially important after the user receives a result and wants to move from recommendation to action.

## Primary user intent

The main user intent on this page is:

- review the recommended methodology and understand what to do next

## Secondary user intents

Secondary intents are:

- compare methodologies at a high level
- browse another methodology manually
- review applicability and constraints
- use the page as a practical reference after receiving a result

## Main CTA

There is no single page-wide CTA.

This page behaves as a reference system, not a transactional landing page.

However, the most important local action is:

- review first steps for the selected methodology

## Navigation model

This page uses **two navigation layers**:

1. **top tabs** for switching between methodologies
2. **left sidebar navigation** for switching between sections inside the selected methodology

This structure is required for desktop-first usability and should be treated as the primary design truth.

## Top methodology tabs

### Purpose
Switch between the six supported methodologies quickly.

### Required tabs
Exactly six:

1. Waterfall
2. Spiral
3. GOST 34
4. RUP
5. Scrum
6. Kanban

### Behavior
- one tab is active at a time
- switching tabs changes the content in the main reference area
- the active tab should be visually clear
- tab switching should preserve the page layout structure

### Recommended implementation
Top-level methodology data should come from structured configuration, not six manually duplicated page files.

## Left sidebar navigation

### Purpose
Switch between content sections within the currently selected methodology.

### Required section items
Use this baseline section structure:

1. Overview
2. First steps
3. Core elements
4. Team needs
5. Common mistakes
6. Applicability
7. Not covered here
8. Study next

### Behavior
- one section appears active
- clicking a section scrolls to the relevant block or updates the visible content state
- sidebar should remain visually stable while the methodology changes
- section labels must come from i18n or config

### Important rule
Nested content such as Roles / Events / Artifacts should not become separate full sidebar items by default. Those belong inside the main content area as internal tabs or sub-navigation inside the “Core elements” section.

## Page content order

Inside the selected methodology, the content should follow this order:

1. Overview
2. First steps
3. Core elements
4. Team needs
5. Common mistakes
6. Applicability
7. Not covered here
8. Study next

This order is intentional and should not be rearranged casually.

It reflects the main post-result reading logic:
- what it is
- how to begin
- how it is structured
- what it requires
- what can go wrong
- where it fits
- what is outside the scope
- what to learn next

## Shared methodology content template

Every methodology should use the same high-level template, but the internal content of “Core elements” may differ by methodology.

### Shared sections
All six methodologies must support:

- Overview
- First steps
- Core elements
- Team needs
- Common mistakes
- Applicability
- Not covered here
- Study next

### Why this matters
This allows:
- consistent UI
- consistent mental model for users
- reusable implementation
- scalable content authoring
- easier bilingual support

## Section-by-section specification

## 1. Overview

### Purpose
Introduce the selected methodology in a compact and intelligible way.

### Required content
- methodology name
- optional fit badge if opened from result context
- short descriptive paragraph
- 2–4 compact signal tags

### Signal tag examples
These depend on methodology, but should summarize its core identity.

Examples:
- Timeboxed Sprints
- Adaptive planning
- Continuous flow
- WIP limits
- Stage documentation
- Risk-driven iteration

### Overview text rule
Should be concise and practical.
Do not turn it into a historical essay.

## 2. First steps

### Purpose
Give the user a usable starting sequence instead of forcing them to read the entire page before acting.

### Required content
- section title
- visual first-step structure
- 4–6 practical starting steps

### Preferred representation
A visual sequence / workflow diagram is preferred over a plain list if the methodology benefits from step-by-step setup.

This is especially useful for:
- Scrum
- Kanban
- RUP
- GOST 34

### Behavior
The “First steps” section should be visually prominent and easy to scan.

### Important rule
This section comes immediately after Overview because the main user scenario is post-result practical orientation.

## 3. Core elements

### Purpose
Provide a compact structural reference for the inner mechanics of the methodology.

### Required content
- section title
- one short framing line
- internal sub-navigation or tabs when needed
- structured cards or grouped explanations

### Important rule
This is the section where methodology-specific variation is expected.

The UI should support different internal structures per methodology while keeping the outer section structure stable.

### Methodology-specific internal structures

#### Scrum
Use internal tabs or grouped blocks such as:
- Roles
- Events
- Artifacts

#### Kanban
Use internal tabs or grouped blocks such as:
- Principles
- Board structure
- WIP limits
- Flow metrics

#### RUP
Use internal tabs or grouped blocks such as:
- Phases
- Iterations
- Core practices
- Key artifacts

#### Waterfall
Use internal tabs or grouped blocks such as:
- Stages
- Documents
- Control gates

#### Spiral
Use internal tabs or grouped blocks such as:
- Risk cycle
- Prototyping
- Evaluation loop

#### GOST 34
Use internal tabs or grouped blocks such as:
- Stages
- Required documentation
- Acceptance logic

### Rendering rule
The page should support methodology-specific subsection configs rather than one hardcoded internal structure for all methods.

## 4. Team needs

### Purpose
Explain what conditions the team or organization must satisfy for the methodology to work well.

### Required content
A compact list of requirements such as:
- discipline
- role clarity
- documentation culture
- stakeholder rhythm
- architecture ownership
- operational stability

### Tone
Practical, not moralizing.

## 5. Common mistakes

### Purpose
Help the user avoid obvious implementation failures.

### Required content
A compact list of mistakes or anti-patterns.

### Intent
This section should answer:
- what usually goes wrong when people say they are “using” this methodology
- what weakens or distorts the method in practice

### Tone
Concrete and experience-oriented.

## 6. Applicability

### Purpose
Clarify where the methodology fits well and where it becomes weaker.

### Required content
Use a two-column or two-list structure:

- Good fit when
- Weaker fit when

### Why this structure
This is easier to scan than long paragraphs and supports quick post-result interpretation.

### Important rule
Applicability should come after Common mistakes in this product.
The user has already likely arrived from a result and now wants action, structure, and constraints in that order.

## 7. Not covered here

### Purpose
Make the scope of the page explicit and prevent false completeness.

### Required content
A short list of important topics that are outside the page scope.

Examples:
- scaling
- advanced estimation
- detailed artifact tailoring
- audit specifics
- enterprise rollout patterns

### Why this matters
The page should be honest and useful, not pretend to be a full textbook.

## 8. Study next

### Purpose
Show the user how to go deeper after using the page as a practical reference.

### Required content
A short list of recommended next learning areas.

Examples:
- backlog management
- WIP policy design
- risk review techniques
- architecture governance
- official standards and guides

### Intent
The user should leave this section with a clear route for deeper study.

## Quick-fit panel (optional supporting block)

### Purpose
Provide a compact summary of the selected methodology’s strongest context match.

### Placement
Can appear in the sidebar or near the top of the content area.

### Content intent
Examples:
- Best for adaptive work with short structured iterations
- Best for continuous service flow and WIP-limited delivery
- Best for strict governance and formal acceptance

### Rule
This is a supporting orientation block, not a replacement for Applicability.

## Post-result integration behavior

This page should support arrival from the Results page.

### Expected behaviors
- selected methodology can be pre-opened from the result context
- if possible, the page may open with the recommended methodology already active
- later enhancements may support direct linking to a section like “first steps”

### Why this matters
This page is a continuation of the post-result journey, not an isolated documentation page.

## Layout behavior

## Desktop
Primary reference layout.

Expected structure:
- top methodology tabs
- left sidebar navigation
- main content panel
- optional quick-fit summary block

## Tablet / smaller desktop
Should preserve:
- methodology switching clarity
- section navigation clarity
- readable main content width

## Mobile
Can be implemented later, but the content architecture must not assume static fixed-position desktop-only behavior.

## Components required

Suggested reusable components:
- `Header`
- `PageContainer`
- `MethodologyTabs`
- `SidebarNav`
- `SectionHeading`
- `SignalTag`
- `WorkflowStepCard`
- `MethodologyOverviewCard`
- `CoreElementsTabs`
- `ReferenceInfoCard`
- `ApplicabilityLists`
- `ScopeNotice`
- `StudyNextList`

## State and logic

## Required immediate logic
- methodology tab switching
- section rendering or scroll navigation
- internal core-elements tab switching
- language switching
- preselected methodology support if route/query state is available

## Deferred logic allowed
These can be added later:
- deep links to sections
- persisted last-opened methodology
- compare mode
- print-friendly reference mode

## Data structure expectations

The page should be renderable from structured methodology content.

Each methodology config should support at least:

- `id`
- `title`
- `overview`
- `signalTags`
- `firstSteps`
- `coreElements`
- `teamNeeds`
- `commonMistakes`
- `applicability.goodFit`
- `applicability.weakerFit`
- `notCoveredHere`
- `studyNext`

The `coreElements` field must support different subsection schemas per methodology.

## Copy and i18n

All user-facing text must come from translation dictionaries or structured methodology content files.

Suggested i18n groups:
- `methodologies.page`
- `methodologies.sections`
- `methodologies.shared`
- `nav`

Method-specific content may come from structured content files keyed by methodology ID.

## Accessibility notes

- tab switching must be keyboard accessible
- sidebar navigation must be keyboard accessible
- section headings must have proper semantic hierarchy
- internal core-elements tabs must not rely on color alone
- workflow diagrams must retain meaning without visual arrows alone

## Visual priority rules

The page must visually communicate this order:

1. selected methodology identity
2. first steps
3. core elements
4. practical constraints and mistakes
5. applicability boundaries
6. further study

If Applicability dominates First steps visually, the page is working against the primary post-result user scenario.

## Common implementation mistakes to avoid

Do not:
- build six separate fully duplicated page layouts
- treat all methodologies as if they have the same internal structure
- move “First steps” too low on the page
- overload the page with long essay paragraphs
- make internal subsection tabs full top-level sidebar items
- hardcode methodology content inside JSX page files
- treat the page as a static blog article

## Definition of done for first implementation

The Methodologies page is considered ready for the first pass when:

- six top methodology tabs are present
- left sidebar section navigation is present
- one shared template renders the selected methodology
- “First steps” is visually prominent
- “Core elements” supports internal tabs or structured subsection switching
- Applicability is shown as two clear lists
- methodology content comes from structured data or dictionaries
- the page can be opened with at least one selected methodology state
