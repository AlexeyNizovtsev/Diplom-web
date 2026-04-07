# Assessment Page Specification

## Page ID

`assessment`

## Routes

Recommended route structure:

- `/assessment`
- `/assessment/block/[blockId]`

Possible simplified first implementation:
- `/assessment` with internal block state

## Purpose

The Assessment page is the input layer of the product.

Its job is to collect structured signals about the project context and translate them into the six aggregated decision dimensions used by the recommendation model.

The page must feel focused, calm, and task-oriented.
It is not a survey platform and not a form-heavy enterprise wizard.

## Primary user intent

The main user intent on this page is:

- answer the questionnaire efficiently and confidently

## Secondary user intents

Secondary intents are:

- understand what each block is about
- preserve progress automatically
- move backward safely without losing answers
- complete the assessment without confusion

## Core flow rule

The assessment progresses **by block**, not by individual question count.

The primary progress indicator should therefore reflect:

- Block 1 of 6
- Block 2 of 6
- etc.

The UI may later show internal question count within a block if useful, but block progress is the main truth.

## Structure model

The questionnaire is organized into:

- 6 blocks
- multiple questions per block
- optional conditional subquestions shown below certain answers

Each block corresponds to one aggregated decision dimension.

## The six blocks

1. Governance Formalisation
2. Requirements Stability
3. Risk & Innovation Orientation
4. Iteration Structure
5. Organisational Discipline
6. System & Integration Complexity

## General page structure

The page should follow this order from top to bottom:

1. Header
2. Page title / small introduction
3. Progress area
4. Block title and helper text
5. Main questions and answers
6. Conditional subquestions where triggered
7. Navigation controls
8. Small autosave note

This structure should remain stable across all six blocks.

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
- if the user leaves the page, local assessment progress should remain preserved if autosave is active

## 2. Page title / introduction

### Purpose
Orient the user without repeating the full intro page.

### Required content
- small page-level title or context line
- short supporting line

### Intent
The user should understand:
- this is the active assessment flow
- answers are grouped into blocks
- the current block evaluates one type of project signal

### Tone
Short, confident, non-academic.

## 3. Progress area

### Purpose
Show where the user is in the assessment.

### Required content
- progress bar
- block label such as “Block 2 of 6”

### Recommended behavior
The block label should be explicit and always visible near the top of the content area.

### Optional future enhancement
A small secondary line may show internal block position, such as:
- 2 of 3 questions in this block

This is optional and should not replace block-level progress.

## 4. Block title and helper text

### Purpose
Introduce the current decision dimension.

### Required content
- block label
- block title
- one short helper explanation

### Example intent
For Governance Formalisation:
- this block evaluates how formal, regulated, and approval-driven the project context is

### Important copy rule
Helper text should help the user answer.
It should not expose the internal scoring logic in a technical way.

Bad helper text:
- “This is the strongest signal inside governance and dominates the score.”

Good helper text:
- “Consider regulatory standards, mandatory documentation, and formal acceptance procedures.”

## 5. Main questions and answers

### Purpose
Collect structured answers for the current dimension.

### Required content
Each block contains multiple main questions.

Each main question contains:
- question title
- optional helper line
- answer options

### Answer style
Use **option cards**, not radio lists and not tiny chips.

Each answer option should feel intentional and easy to compare.

### Option card content
Each option card may contain:
- short title
- short descriptor / explanation
- selected state

### Selection behavior
- one answer per question
- selected state must be visually clear
- selection should update local state immediately

### Question grouping rule
Questions belonging to the same block should appear grouped visually but remain individually distinguishable.

## 6. Conditional subquestions

### Purpose
Resolve ambiguity in borderline or context-sensitive situations.

### Behavior
Conditional subquestions should appear **inline below the relevant main question** after a trigger answer is selected.

They should not open in a modal and should not become a separate page by default.

### Rendering rules
- subquestions should be visually nested
- indentation or grouped background may be used
- they must still feel part of the main block

### Important rule
Conditional subquestions are optional and contextual.
The base flow must remain understandable without them.

## 7. Navigation controls

### Purpose
Let the user move safely through the assessment.

### Required controls
- Back
- Next block
or
- Finish assessment on the last block

### Behavior
#### Back
- returns to previous block
- must preserve all entered answers

#### Next block
- moves to next block
- should be disabled if required answers are missing
or
- allow navigation with inline validation if that approach is chosen

#### Finish assessment
- appears on the last block
- completes the flow and navigates to Results

### Important first-block rule
On the first block:
- Back may be disabled
or
- Back may return to Assessment Intro

This behavior must be chosen explicitly and documented in implementation.

## 8. Autosave note

### Purpose
Reassure the user that progress is being preserved.

### Content intent
Examples:
- Responses are saved automatically
- Progress is saved locally as you move through the assessment

### Visual rule
This note should be visible but low-emphasis.
It must not visually compete with navigation controls.

## Page-level behavior

## Autosave

### Required behavior
The assessment must save progress locally as the user answers questions.

This means:
- selected answers persist on refresh
- selected answers persist after browser close if local storage or equivalent is available
- moving between blocks never wipes answers

### Expected implementation
Local persistence is acceptable for the initial product version.

## Resume behavior

If saved assessment progress exists:
- reopening the assessment should restore the latest block and selected answers
or
- restore block state from local data

This behavior should be supported even if a separate “resume assessment” UI is not added immediately.

## Validation behavior

### Required rule
The user should not finish the assessment with missing required answers.

### Preferred approach
Use block-level validation:
- current block must be complete before moving to the next one

### Validation style
Validation should be calm and clear.
Do not use aggressive error styling unless needed.

## Data structure expectations

The page should be renderable from structured questionnaire configuration.

Each block config should support:

- `id`
- `title`
- `helperText`
- `questions`

Each question should support at least:

- `id`
- `title`
- `helperText`
- `options`
- `required`
- `conditionalQuestions` (optional)

Each option should support at least:

- `id`
- `label`
- `description`
- `scoreSignal` or structured mapping reference

The UI must not hardcode all questions directly inside page JSX.

## Copy and i18n

All user-facing text must come from translation dictionaries or structured question config files.

Suggested i18n groups:
- `assessment.page`
- `assessment.blocks`
- `assessment.questions`
- `assessment.actions`
- `nav`

## Layout behavior

## Desktop
Primary reference layout.

Expected visual structure:
- compact header
- clear title / progress area
- one main block content panel
- grouped question cards
- bottom navigation row

### Important rule
The page should feel focused and narrower than Home or How it works.
Too much width makes answering harder.

## Tablet / smaller desktop
Should preserve:
- block readability
- option-card scanability
- strong selected state
- clear navigation row

## Mobile
Can be implemented later, but the component system should not depend on impossible desktop-only widths.

## Components required

Suggested reusable components:
- `Header`
- `PageContainer`
- `SectionHeading`
- `ProgressBar`
- `BlockHeader`
- `QuestionCard`
- `AnswerOptionCard`
- `ConditionalQuestionGroup`
- `AssessmentNav`
- `AutosaveNote`

## Accessibility notes

- option cards must be keyboard accessible
- selected state must not rely on color alone
- progress must be understandable by screen readers
- validation messages must be announced properly
- navigation controls must have clear labels

## Visual priority rules

The page must visually communicate this order:

1. current block identity
2. questions and answers
3. navigation controls
4. autosave reassurance

If the page starts feeling like a decorative landing page instead of a focused input screen, the hierarchy is wrong.

## Common implementation mistakes to avoid

Do not:
- show progress by question only and hide block structure
- use tiny radio buttons instead of answer cards
- move conditional questions to a separate modal
- hardcode question copy in components
- fail to persist answers across refresh
- make helper text explain scoring internals instead of helping the user answer
- let the Back button silently lose data

## Definition of done for first implementation

The Assessment page is considered ready for the first pass when:

- block-based progress is visible
- one block can render multiple questions from config
- answer option cards support selected state
- conditional subquestions can appear inline
- Back / Next / Finish navigation exists
- answers persist locally
- the last block can route to Results
- page uses shared design-system components
- all copy comes from i18n dictionaries or structured question config
