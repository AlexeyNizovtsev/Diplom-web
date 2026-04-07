# About Model Page Specification

## Page ID

`about-model`

## Route

`/about-model`

## Purpose

The About model page explains the conceptual basis, scope, and limitations of the recommendation model.

Its job is not to show the full implementation or every internal rule. Its job is to help the user understand:

1. what kind of model this is
2. what inputs it uses
3. how recommendations are produced at a high level
4. why the result should be interpreted as decision support rather than absolute truth
5. what the model does not try to do

This page is the bridge between the product UI and the design-science logic behind it.

## Primary user intent

The main user intent on this page is:

- understand what the recommendation model is based on

## Secondary user intents

Secondary intents are:

- understand the six aggregated dimensions
- understand why the output is ranked rather than binary
- understand the model limitations
- gain trust in the product without reading a thesis chapter

## Main CTA

This page does not require one dominant transactional CTA.

Acceptable supporting actions:
- start the assessment
- open How it works
- open Methodologies
- return Home

These actions can be provided through header links and one light page-level CTA if needed.

## Content order

The page should follow this order from top to bottom:

1. Header
2. Page title and short framing text
3. What the model does
4. Six-dimension model structure
5. Why the output is ranked
6. Explainability and sensitivity section
7. Scope and limitations
8. Closing orientation / optional CTA

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
- About model may appear as active in navigation styling if supported

## 2. Page title and short framing text

### Purpose
Introduce the page clearly and set the right expectation.

### Required content
- page title
- one short supporting paragraph

### Title intent
- About the model
or
- About the recommendation model

### Framing text intent
Explain that the product uses a structured, rule-based model to transform project context into a ranked methodology recommendation.

### Tone
- transparent
- calm
- non-defensive
- not academic in phrasing

## 3. What the model does

### Purpose
Explain the model at the highest level before showing the internal structure.

### Required content
- short section title
- compact explanatory paragraph or grouped points

### Content intent
This section should explain that the model:
- collects structured project signals
- aggregates them into decision dimensions
- maps those dimensions to methodology fit
- returns a ranked list with explanation

### Important rule
This section must make clear that the model is:
- rule-based
- structured
- explainable

It must not imply:
- machine learning
- statistical prediction of project success
- universal truth generation

## 4. Six-dimension model structure

### Purpose
Explain the core conceptual structure of the model.

### Required content
- section title
- short framing line
- six structured dimension cards or rows

### Title intent
- The six evaluation dimensions
or
- The six aggregated dimensions

### Framing line intent
Explain that the questionnaire is grouped into six dimensions which summarize the main project signals used in methodology selection.

### Required dimensions
Exactly six:

1. Governance Formalisation
2. Requirements Stability
3. Risk & Innovation Orientation
4. Iteration Structure
5. Organisational Discipline
6. System & Integration Complexity

### Card content
Each dimension block should contain:
- dimension name
- one short practical description
- optional note that the model uses an ordinal 0–3 level per dimension

### Description intent by dimension

#### Governance Formalisation
How strongly the project is shaped by regulation, formal approvals, staged documentation, and compliance obligations.

#### Requirements Stability
How fixed requirements are before development and how controlled changes are during delivery.

#### Risk & Innovation Orientation
How much uncertainty, experimentation, technical novelty, or criticality shapes the process choice.

#### Iteration Structure
Whether the delivery rhythm is linear, milestone-based, timeboxed, or continuous-flow oriented.

#### Organisational Discipline
How much process maturity, role clarity, and documentation discipline the team and organisation can sustain.

#### System & Integration Complexity
How large, integrated, and architecturally demanding the system context is.

### Visual rule
This section should feel structured and reference-like, not essay-like.

## 5. Why the output is ranked

### Purpose
Explain why the system gives a ranked list instead of one absolute answer.

### Required content
- section title
- short explanatory paragraph
- optional compact comparison or emphasis block

### Title intent
- Why the result is ranked
or
- Why the system shows a ranking

### Content intent
This section should explain:
- methodology fit is contextual
- multiple methods may be plausible in the same project
- ranking is more honest than forcing one rigid binary answer
- close alternatives help the user understand trade-offs

### Important rule
This section should support the product’s trust model:
the system is helpful because it reveals structure and alternatives, not because it pretends certainty where there is none.

## 6. Explainability and sensitivity section

### Purpose
Explain how the model supports interpretation and robustness.

### Required content
- section title
- two subthemes:
  - explainability
  - sensitivity / stability

### Explainability intent
Explain that the output highlights:
- strongest dimensions
- most relevant signals
- alternative methodologies
- trade-offs

### Sensitivity intent
Explain that the model can later support or already conceptually includes sensitivity thinking:
- changing a key dimension may change the ranking
- close-fit cases should be interpreted carefully
- some recommendations are more stable than others

### Important rule
This section should make the product feel intellectually honest, not fragile.

## 7. Scope and limitations

### Purpose
State clearly what the model is designed to do and what it does not claim.

### Required content
- section title
- grouped list or compact cards with limitations

### Title intent
- Scope and limitations
or
- What the model does not claim

### Required limitation themes
This section should communicate that the model:
- supports early-stage methodology selection
- does not statistically predict project success
- does not replace expert judgement
- does not cover every possible hybrid process in full detail
- depends on structured user input quality
- is intentionally limited to six methodologies in the current version

### Tone
Direct and transparent.

Do not write this section apologetically.
Write it as normal scope definition.

## 8. Closing orientation / optional CTA

### Purpose
End the page with a useful next step.

### Acceptable closing directions
- Start the assessment
- Read How it works
- Browse Methodologies

### Visual rule
This closing area should be lighter than Home hero CTAs and lighter than the Results page emphasis.

## Layout behavior

## Desktop
Primary reference layout.

Expected structure:
- intro
- model overview block
- dimension grid
- ranking explanation section
- explainability / sensitivity block
- limitations block
- light closing orientation

## Tablet / smaller desktop
Should preserve:
- easy scanning of dimensions
- readable separation between “ranked output” and “limitations”
- no long unbroken text columns

## Mobile
Can be implemented later, but section structure should support vertical stacking cleanly.

## Components required

Suggested reusable components:
- `Header`
- `PageContainer`
- `SectionHeading`
- `InfoCard`
- `DimensionCard`
- `HighlightBanner`
- `TwoColumnInfoBlock`
- `ScopeNotice`
- `SecondaryCTAGroup`

## State and logic

This is mostly a static page.

### Required immediate logic
- navigation
- language switching
- rendering from structured copy

### Deferred logic
Optional later behavior:
- deep links to dimension explanations
- small CTA into assessment
- anchors for sections

## Copy and i18n

All copy must come from translation dictionaries or structured content sources.

Suggested i18n groups:
- `aboutModel.hero`
- `aboutModel.overview`
- `aboutModel.dimensions`
- `aboutModel.rankedOutput`
- `aboutModel.explainability`
- `aboutModel.limitations`
- `nav`

## Accessibility notes

- headings must preserve semantic structure
- dimension cards must be readable without relying on decorative layout only
- emphasis blocks on dark surfaces must keep readable contrast
- limitations should be presented as clear text, not hidden behind interactive controls by default

## Visual priority rules

The page must visually communicate this order:

1. what the model does
2. the six dimensions
3. why the output is ranked
4. explainability and sensitivity
5. scope and limitations

If the limitations dominate the page visually, the tone becomes defensive.
If the dimensions are hidden too deep, the page loses its value.

## Common implementation mistakes to avoid

Do not:
- write the page like a thesis literature review
- imply statistical validation if that is not part of the product
- use machine-learning language for a rule-based model
- hide the limitations completely
- overload dimension descriptions with technical scoring detail
- hardcode the six dimensions directly in the page component

## Definition of done for first implementation

The About model page is considered ready for the first pass when:

- the page clearly states that the model is structured and rule-based
- the six dimensions are visible and explained
- the ranked-output logic is explicitly justified
- explainability and sensitivity are acknowledged
- scope and limitations are clearly stated
- the page uses shared design-system components
- all copy comes from i18n dictionaries or structured content sources
