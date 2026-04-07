# How It Works Page Specification

## Page ID

`how-it-works`

## Route

`/how-it-works`

## Purpose

This page explains the internal logic of the product in a clear, compact, user-facing way.

It should help the user understand:

1. what happens between answering questions and receiving a recommendation
2. what the six decision dimensions are
3. why the result is explainable rather than arbitrary

This page is not a thesis chapter and not a technical documentation page. It is a trust-building page.

## Primary user intent

The main user intent on this page is:

- understand the recommendation workflow before or after taking the assessment

## Secondary user intents

Secondary intents are:

- review the six dimensions quickly
- understand high-level mapping rules
- gain confidence in the result format
- return to assessment or other pages

## Main CTA

This page does not require one dominant transactional CTA.

Acceptable supporting actions:
- return to Home
- start or continue the assessment
- open Methodologies
- open About model

These actions can be available through header links or small page-level links/buttons.

## Content order

The page should follow this order from top to bottom:

1. Header
2. Page title and introduction
3. Main workflow hero block
4. Six decision dimensions section
5. Rule application section
6. Explainability emphasis block

This order should remain stable.

## Section-by-section specification

## 1. Header

### Purpose
Provide global navigation and language switching.

### Contains
- logo / product name
- Methodologies
- How it works
- About model
- language switch

### Behavior
- logo returns to Home
- How it works appears as current page in navigation styling if active-state support exists

## 2. Page title and introduction

### Purpose
Introduce the page clearly and quickly.

### Required content
- page title
- one short supporting description

### Title intent
- How it works

### Supporting description intent
Explain that the product uses a simple, rule-based workflow to connect project context with methodology fit.

### Tone
- plain
- confident
- non-academic
- transparent

### Layout notes
This section should be visually lighter than the main workflow hero block below it.

## 3. Main workflow hero block

### Purpose
Show the full product logic from input to output in one structured visual.

### Required content
- section title
- short explanatory text
- visual workflow strip with four steps
- compact “What you get” summary card

### Main title intent
- From answers to recommendation

### Workflow steps
The workflow must present these four conceptual steps:

1. Answer
2. Score
3. Rank
4. Explain

### Expected labels
#### Step 1
- Answer
- 6 blocks

#### Step 2
- Score
- 6 dimensions

#### Step 3
- Rank
- 6 methods

#### Step 4
- Explain
- drivers + trade-offs

### Visual structure
Use a left-to-right workflow strip on desktop.

Arrows should connect the steps clearly.

The final step may be visually emphasized with a dark surface or otherwise stronger treatment.

### “What you get” summary card
This compact side block should explain the output format.

Suggested content intent:
- ranked recommendation
- key factors
- close alternatives
- next steps

### Layout notes
Desktop layout should visually balance:
- workflow strip
- output summary card

This block should feel like the conceptual center of the page.

## 4. Six decision dimensions section

### Purpose
Explain the six core dimensions used by the model without overwhelming the user.

### Required content
- section title
- short supporting line
- six cards, one per dimension

### Title intent
- The six decision dimensions

### Supporting text intent
Explain that each block captures one part of project context and together they form the selection profile.

### Required cards
Exactly six cards:

1. Governance Formalisation
2. Requirements Stability
3. Risk & Innovation Orientation
4. Iteration Structure
5. Organisational Discipline
6. System & Integration Complexity

### Card content
Each card should contain:
- small label such as “Dimension 1”
- dimension title
- one short explanatory description

### Description intent by dimension

#### Governance Formalisation
Regulation, staged documentation, formal approvals, compliance pressure.

#### Requirements Stability
How fixed requirements are and how controlled changes need to be.

#### Risk & Innovation Orientation
Technical uncertainty, criticality, and the role of experimentation or R&D.

#### Iteration Structure
Linear delivery, milestone phases, timeboxed iterations, or continuous flow.

#### Organisational Discipline
Process maturity, role clarity, and the ability to sustain structure.

#### System & Integration Complexity
Architecture scale, integrations, and enterprise-level constraints.

### Layout notes
On desktop, display as two rows of three cards.

Cards should be short, readable, and visually even.

Do not let card descriptions become long paragraphs.

## 5. Rule application section

### Purpose
Show how the system translates strong context signals into methodology fit.

### Required content
- section title
- one short introductory line
- six short mapping statements

### Title intent
- How the rules are applied

### Intro line intent
Explain that the model does not guess randomly; it maps context signals to methodology patterns.

### Required rule statements
The section should include all six high-level mapping principles:

- Strict governance -> GOST-like fit
- Stable requirements + linear flow -> Waterfall
- Risk-driven iteration -> Spiral
- Architecture-heavy systems + disciplined iteration -> RUP
- Structured adaptive cycles -> Scrum
- Continuous flow + WIP-limited delivery -> Kanban

### Visual treatment
These rules should appear as compact labeled blocks, chips, or short pills arranged in a structured grid.

This section should feel scannable, not essay-like.

### Important note
These are high-level orientation rules, not the full internal rule engine.

The page must not imply that the entire model is reducible to only six simplistic mappings.

## 6. Explainability emphasis block

### Purpose
Make it explicit why the result is understandable and not a black-box label.

### Required content
- title
- short explanation
- 2–3 compact emphasis items

### Title intent
- Why the result is explainable

### Body intent
Explain that the output highlights the strongest dimensions, shows close alternatives, and clarifies trade-offs rather than returning one unexplained label.

### Emphasis items
Good options include:
- Ranked output
- Drivers
- Trade-offs

### Visual notes
A dark card or strong emphasis block is appropriate here.

It should close the page with a clear message about trust and transparency.

## Layout behavior

## Desktop
Primary reference layout.

Expected flow:
- intro
- large workflow hero block
- dimensions grid
- rules and explainability sections

## Tablet / smaller desktop
Should preserve:
- workflow readability
- dimensions grid clarity
- scanning ability of rule statements

## Mobile
Can be implemented later, but the layout should avoid rigid assumptions that block stacking behavior later.

## Components required

Suggested reusable components:
- `Header`
- `PageContainer`
- `SectionHeading`
- `WorkflowStepCard`
- `ArrowConnector`
- `InfoCard`
- `DimensionCard`
- `RuleChip` or `RuleCard`
- `HighlightBanner` or `ExplainabilityCard`

## State and logic

This is mostly a static page.

### Required immediate logic
- navigation links
- language switching
- reusable content rendering

### Deferred logic
Optional later behavior:
- link from dimensions to About model
- CTA back into assessment flow
- anchors for sections

## Copy and i18n

All copy must come from translation dictionaries or structured content files.

Suggested i18n groups:
- `howItWorks.hero`
- `howItWorks.dimensions`
- `howItWorks.rules`
- `howItWorks.explainability`
- `nav`

## Accessibility notes

- workflow step titles must remain readable
- rule statements must not rely on color alone
- dimension cards must have clear headings
- emphasis blocks on dark surfaces must preserve contrast
- any decorative arrows must not be the only carrier of meaning

## Visual priority rules

The page must visually communicate this order:

1. Workflow overview
2. Six decision dimensions
3. Rule application logic
4. Explainability message

If the dimensions dominate the workflow hero, the page loses its main teaching arc.

## Common implementation mistakes to avoid

Do not:
- turn the page into a long academic explanation
- overload dimension cards with too much text
- style all sections with equal visual weight
- make the rules section look like a dense matrix
- imply statistical or machine-learning scoring if the model is rule-based
- hardcode text directly inside section components

## Definition of done for first implementation

The page is considered ready for the first pass when:

- the four-step workflow is clearly visible
- six dimension cards are present and readable
- all six high-level methodology mapping rules are represented
- explainability is explicitly communicated near the end of the page
- page content uses shared design-system components
- all copy comes from i18n dictionaries or structured content sources
