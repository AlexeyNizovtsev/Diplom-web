# Results Page Specification

## Page ID

`results`

## Route

`/results`

Possible future extension:
- `/results/[resultCode]`

## Purpose

The Results page is the core output page of the product.

It must do five things clearly:

1. present the ranked methodology recommendation
2. highlight the best-fit methodology
3. explain why the top result ranks first
4. show meaningful alternatives and trade-offs
5. let the user save or export the result

This page is the product payoff. It should feel analytical, understandable, and useful immediately after the assessment.

## Primary user intent

The main user intent on this page is:

- understand which methodology fits best and why

## Secondary user intents

Secondary intents are:

- compare close alternatives
- open methodology details
- review next steps for the top fit
- save the result for later use
- export the result in different formats

## Main CTA

The main CTA is:

- open methodology details / next steps for the top recommendation

This CTA may be implemented as:
- a clearly visible link row inside the best-fit card
- a button
- or a click target that scrolls or navigates to the methodology reference

The main action should support the scenario:
“I got the result. Now show me what to do with it.”

## Content order

The page should follow this order from top to bottom:

1. Header
2. Page title / intro
3. Ranked list summary
4. Best-fit methodology block
5. Alternative methodologies section
6. Save results section

This order should remain stable unless a very strong product reason appears.

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
- standard navigation works without destroying saved result view state unless absolutely necessary

## 2. Page title / intro

### Purpose
Introduce the page as the result of the assessment.

### Required content
- page title
- short supporting line

### Title intent
Examples of intent:
- Your assessment result
- Recommended methodologies
- Best-fit methodology result

### Supporting line intent
Explain that the system returns a ranked list rather than a single absolute truth.

The tone should reinforce:
- guidance
- transparency
- interpretability

## 3. Ranked list summary

### Purpose
Show the overall ranking immediately before diving into detailed explanation.

### Required content
- ranked list of all six methodologies
- fit-strength labels or fit tiers
- short one-line rationale for each item
- click behavior that connects the list to lower content

### Important rule
The ranked list must be visible near the top of the page.

The user should not need to scroll through the full best-fit explanation before seeing the total order.

### Recommended structure
A vertically stacked ranked summary where:
- position 1 is most visually prominent
- lower items are quieter
- the list is still easy to scan

### Ranking content per item
Each list item should contain:
- rank number
- methodology name
- fit label
- short compact rationale

### Fit label logic
Fit labels should express strength of fit only.

Examples:
- Best fit
- Strong alternative
- Moderate fit
- Lower fit

Avoid mixing:
- fit strength
with
- contextual type labels like “special case”

### Interaction
Each methodology item should be clickable.

Recommended behavior:
- clicking an item scrolls to or highlights the matching methodology section below
- if only the top methodology has a full expanded block at first implementation, clicking an alternative can later expand or navigate to its section

## 4. Best-fit methodology block

### Purpose
Provide the main explanation and practical interpretation of the top-ranked methodology.

### Required content
- methodology name
- best-fit badge
- short overview
- key signal tags
- dimension explanation area
- outcome summary
- confidence / sensitivity hint
- action row to learn more and review next steps

This is the visual and semantic center of the page.

## 4.1 Best-fit header area

### Required content
- methodology name
- best-fit marker
- 2–4 short signal tags

### Signal tag intent
These tags should quickly summarize why the method fits.

Examples of tag intent:
- Structured iterations
- Moderate governance
- Changing scope
- High feedback rhythm

Tags should be short and scannable.

## 4.2 Best-fit overview text

### Purpose
Provide a short narrative explanation of why this methodology ranks first.

### Requirements
- 2–4 lines on desktop
- plain language
- should not repeat the same information already shown in the tags

### Content intent
This paragraph should connect the main contextual drivers with the recommendation in one concise synthesis.

## 4.3 Dimension explanation area

### Purpose
Show how the decision dimensions support the recommendation.

### Required content
A set of dimension cards or rows, each containing:
- dimension name
- score on the 0–3 scale
- short explanation

### Score rule
The scale must be shown as **0–3**, not 0–4.

This is important because the agreed model uses ordinal values from 0 to 3 across the aggregated dimensions.

### Recommended dimensions shown
Not every dimension must be equally emphasized. The page can prioritize the most activated or most discriminative ones.

However, the UI should support showing multiple dimensions in a structured format.

### Explanation style
Each dimension explanation should answer:
- what the score means in this project context
- why that supports this methodology

### Readability rule
Dimension explanations should stay concise and easy to scan.

Avoid long paragraph-style descriptions inside each dimension card.

## 4.4 Outcome block

### Purpose
Summarize the practical conclusion of the recommendation in one clear statement.

### Required content
- section title such as “Outcome”
- short summary of what this result means in practice

### Intent
The user should be able to read this block and understand:
- what the recommendation implies
- what kind of process rhythm or structure is being recommended

This block should also be useful as a quotable summary in the thesis or demo.

## 4.5 Confidence / sensitivity hint

### Purpose
Show that the recommendation is explainable and not brittle.

### Required content
A compact hint row or micro-panel that may include:
- fit strength
- closest alternative
- most sensitive dimension

### Example intent
- Fit strength: strong
- Closest alternative: Kanban
- Most sensitive dimension: Governance

### Important note
This should appear once in the best-fit block, not repeated for every methodology.

## 4.6 Action row

### Purpose
Move the user from recommendation to interpretation and action.

### Required content
A row or compact action area with intent like:
- Learn more about the methodology and next steps to apply it

### Behavior
This should lead to the methodology reference page, ideally with the top methodology selected.

### Visual rule
This action can be presented as:
- a single line with icon / arrow
- a secondary CTA
- a compact navigation strip

It should not look heavier than the main result itself.

## 5. Alternative methodologies section

### Purpose
Show that the system considered multiple viable options and explain how they differ from the top choice.

### Required content
- section title
- list or stacked cards for alternative methodologies
- fit-strength labels
- short rationale
- outcome summary for each visible alternative
- action row for methodology details

### Intent
Alternative items should answer:
- why this method is still relevant
- why it ranked below the top fit
- when it might become more suitable

### Visual hierarchy
Alternatives must be clearly secondary to the best-fit block.

Do not give them the same visual dominance.

### Interaction
Alternatives may initially be implemented as:
- collapsed cards
- or lighter summary cards

Later enhancement may support:
- expansion
- tabbed switching
- jump to methodology reference

## 6. Save results section

### Purpose
Help the user preserve and reuse the result.

### Required content
- section title
- short explanation
- copy result code action
- download PDF action
- download JSON action

### Important rule
This should be a dedicated section at the bottom of the page.

The save/export functions should not be hidden inside a modal by default.

### Result code behavior
The result code should be visible and copyable.

It should be clear that:
- this code can be used later from the Home page
- it is different from file download actions

### Export design rule
The page structure should allow additional export formats later without redesigning the full Results page.

## Layout behavior

## Desktop
Primary reference layout.

Expected structure:
- ranked summary near top
- one large best-fit panel
- secondary alternatives below
- save/export section near bottom

## Tablet / smaller desktop
Should preserve:
- ranked summary visibility
- best-fit prominence
- export section clarity

## Mobile
Can be implemented later, but the page should not rely on impossible fixed-width assumptions.

## Components required

Suggested reusable components:
- `Header`
- `PageContainer`
- `SectionHeading`
- `RankedList`
- `RankedListItem`
- `BestFitCard`
- `SignalTag`
- `DimensionScoreCard`
- `OutcomeBlock`
- `ConfidenceHint`
- `AlternativeMethodologyCard`
- `ExportActionGroup`
- `ResultCodeCard`

## State and logic

## Required immediate logic
- render ranked methodologies
- identify top methodology
- render explanation blocks from structured data
- copy result code interaction
- basic export action placeholders if export logic is not implemented yet
- navigation to methodology reference

## Deferred logic allowed
These may be mocked initially:
- real PDF generation
- real JSON payload generation
- full result restoration by code
- alternative-card expansion logic
- sensitivity engine if not yet wired

## Data structure expectations

The Results page should be renderable from a structured result object.

At minimum, the result object should support:
- ordered methodologies
- top methodology identifier
- fit labels
- signal tags
- dimension summaries
- alternative summaries
- confidence / sensitivity summary
- result code

This page should not depend on hardcoded page-specific strings for methodology content.

## Copy and i18n

All page text must come from translation dictionaries or structured result content.

Suggested i18n groups:
- `results.header`
- `results.rankedList`
- `results.bestFit`
- `results.alternatives`
- `results.save`
- `nav`

## Accessibility notes

- ranked items must be keyboard accessible if clickable
- fit labels must not rely on color only
- score displays must be readable by screen readers
- copy-result action must announce success state
- export actions must have clear accessible names

## Visual priority rules

The page must visually communicate this order:

1. overall ranking
2. best-fit methodology
3. why it fits
4. alternatives and trade-offs
5. save/export actions

If alternatives compete visually with the best-fit block, the hierarchy is wrong.

## Common implementation mistakes to avoid

Do not:
- hide the ranking too far down the page
- show only one methodology without visible alternatives
- use 0–4 scores when the model is 0–3
- overload dimension explanations with dense text
- repeat confidence hints for every methodology
- hide save/export inside a modal by default
- hardcode methodology narrative copy in the page component

## Definition of done for first implementation

The Results page is considered ready for the first pass when:

- ranked list is visible near the top
- top recommendation is clearly emphasized
- multiple dimensions can be shown with 0–3 scores
- an outcome summary exists for the best fit
- at least one or more alternatives are rendered below
- save results section includes result code, PDF action, and JSON action
- page uses shared design-system components
- all copy comes from i18n dictionaries or structured result content
