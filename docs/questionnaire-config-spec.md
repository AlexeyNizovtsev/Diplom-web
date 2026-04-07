# Questionnaire Configuration Specification

## Purpose

This document defines the data structure for the assessment questionnaire.

Its job is to standardize how questionnaire content is stored so that the frontend can render blocks, questions, options, and conditional subquestions without hardcoding them into page components.

This specification is intentionally implementation-oriented.

It should support:
- config-based rendering
- bilingual content
- local persistence of answers
- conditional follow-up questions
- mapping from answers to dimension-level signals
- later extension without changing page structure

## Core design principles

1. The questionnaire is rendered from structured config.
2. The questionnaire is grouped by **block**, not only by individual questions.
3. Each block corresponds to one aggregated dimension.
4. Questions use discrete categorical options.
5. Conditional subquestions are attached to a parent question and appear inline.
6. UI copy should come from translation keys, not hardcoded text.
7. Answer selection should map to structured model signals, not only raw labels.

## Six questionnaire blocks

The questionnaire contains exactly six top-level blocks:

1. Governance Formalisation
2. Requirements Stability
3. Risk & Innovation Orientation
4. Iteration Structure
5. Organisational Discipline
6. System & Integration Complexity

Each block maps to one aggregated dimension in the recommendation model.

## Recommended file organization

Possible structure:

- `src/config/questionnaire/blocks.ts`
- `src/config/questionnaire/types.ts`
- `src/config/questionnaire/en.ts`
- `src/config/questionnaire/ru.ts`

or

- `src/config/questionnaire.ts`
- `src/locales/en/questionnaire.ts`
- `src/locales/ru/questionnaire.ts`

The exact structure can vary, but:
- schema must be centralized
- content must not be duplicated inside UI components

## Type model overview

The questionnaire config should support these logical entities:

- QuestionnaireConfig
- QuestionnaireBlock
- Question
- AnswerOption
- ConditionalQuestion
- SignalMapping

## 1. QuestionnaireConfig

The full questionnaire object.

### Required fields

- `version`
- `blocks`

### Example shape

```ts
type QuestionnaireConfig = {
  version: string
  blocks: QuestionnaireBlock[]
}
```

### Notes
- `version` is important for future migrations of saved local answers
- changing question structure later should not silently break stored assessment state

## 2. QuestionnaireBlock

A top-level assessment block.

### Required fields

- `id`
- `dimensionKey`
- `titleKey`
- `helperTextKey`
- `questions`

### Optional fields

- `shortLabelKey`
- `progressLabelKey`
- `descriptionKey`

### Example shape

```ts
type QuestionnaireBlock = {
  id: string
  dimensionKey: DimensionKey
  titleKey: string
  helperTextKey: string
  questions: Question[]
  shortLabelKey?: string
  progressLabelKey?: string
  descriptionKey?: string
}
```

### Field meaning

#### `id`
Stable technical identifier for the block.

Examples:
- `governance`
- `requirements`
- `risk`
- `iteration`
- `discipline`
- `complexity`

#### `dimensionKey`
Connects the block to the aggregated dimension used by the model.

Recommended union type:
```ts
type DimensionKey =
  | "governanceFormalisation"
  | "requirementsStability"
  | "riskInnovationOrientation"
  | "iterationStructure"
  | "organisationalDiscipline"
  | "systemIntegrationComplexity"
```

#### `titleKey`
Translation key for the visible block title.

#### `helperTextKey`
Translation key for the short block-level explanation.

#### `questions`
Ordered list of questions inside the block.

## 3. Question

A main question displayed inside a block.

### Required fields

- `id`
- `titleKey`
- `options`
- `required`

### Optional fields

- `helperTextKey`
- `descriptionKey`
- `conditionalQuestions`
- `uiVariant`
- `layoutHint`

### Example shape

```ts
type Question = {
  id: string
  titleKey: string
  options: AnswerOption[]
  required: boolean
  helperTextKey?: string
  descriptionKey?: string
  conditionalQuestions?: ConditionalQuestion[]
  uiVariant?: "cards"
  layoutHint?: "default" | "compact"
}
```

### Rules

- `uiVariant` should default to card-based answers
- `required` should usually be `true` for the current model
- `conditionalQuestions` are tied to this question and triggered by parent-answer logic

## 4. AnswerOption

A selectable answer inside a question.

### Required fields

- `id`
- `labelKey`
- `signalMapping`

### Optional fields

- `descriptionKey`
- `tagKey`
- `triggersConditionalQuestionIds`
- `metadata`

### Example shape

```ts
type AnswerOption = {
  id: string
  labelKey: string
  signalMapping: SignalMapping[]
  descriptionKey?: string
  tagKey?: string
  triggersConditionalQuestionIds?: string[]
  metadata?: Record<string, unknown>
}
```

### Field meaning

#### `id`
Stable answer identifier.

Examples:
- `none`
- `moderate`
- `high`
- `strict`

#### `labelKey`
Translation key for the answer label.

#### `descriptionKey`
Optional translation key for the supporting explanation shown inside the answer card.

#### `signalMapping`
Structured model effect produced by selecting the answer.

#### `triggersConditionalQuestionIds`
List of conditional question IDs that become visible when this answer is selected.

## 5. ConditionalQuestion

A follow-up question shown inline when triggered.

### Required fields

- `id`
- `parentQuestionId`
- `titleKey`
- `options`
- `required`
- `visibleWhen`

### Optional fields

- `helperTextKey`
- `descriptionKey`

### Example shape

```ts
type ConditionalQuestion = {
  id: string
  parentQuestionId: string
  titleKey: string
  options: AnswerOption[]
  required: boolean
  visibleWhen: ConditionalVisibilityRule
  helperTextKey?: string
  descriptionKey?: string
}
```

### Visibility rule model

Recommended simple shape:

```ts
type ConditionalVisibilityRule = {
  parentOptionIds: string[]
}
```

This means the conditional question is shown when the selected answer of the parent question matches one of the listed option IDs.

### Important rule
Conditional questions must remain inside the same block and should not become separate top-level block items.

## 6. SignalMapping

Defines how an answer affects the model.

### Purpose

The UI should not only store a raw answer string. It should store structured model signals that can later be aggregated into dimension scores or used in the ranking logic.

### Recommended minimal shape

```ts
type SignalMapping = {
  target: DimensionKey
  signalKey: string
  value: 0 | 1 | 2 | 3
}
```

### Field meaning

#### `target`
The aggregated dimension affected by this answer.

#### `signalKey`
The sub-signal inside the dimension.

Examples:
- `regulatoryCompliance`
- `stageDocumentation`
- `formalAcceptance`
- `requirementsVolatility`
- `changeControl`
- `technicalUncertainty`
- `incrementalReleaseRhythm`
- `roleFormalisation`
- `integrationScale`

#### `value`
Ordinal level from 0 to 3.

### Why this matters
This structure lets the model:
- separate UI labels from model semantics
- support multiple sub-signals inside one block
- evolve logic later without redesigning the questionnaire page

## Recommended answer persistence shape

The frontend should store answers in a structured way.

### Recommended local state shape

```ts
type AssessmentAnswers = {
  questionnaireVersion: string
  currentBlockId: string
  answers: Record<string, SelectedAnswer>
}
```

Where:

```ts
type SelectedAnswer = {
  questionId: string
  selectedOptionId: string
  resolvedSignalMapping: SignalMapping[]
}
```

### Notes
- store resolved signal mappings at answer time if convenient
- alternatively resolve mappings dynamically from config
- keep question IDs stable across versions whenever possible

## Block order recommendation

The blocks should appear in this order:

1. `governance`
2. `requirements`
3. `risk`
4. `iteration`
5. `discipline`
6. `complexity`

This order is already aligned with the current assessment flow concept and should be treated as the default.

## Example minimal config fragment

```ts
const questionnaireConfig: QuestionnaireConfig = {
  version: "1.0.0",
  blocks: [
    {
      id: "governance",
      dimensionKey: "governanceFormalisation",
      titleKey: "assessment.blocks.governance.title",
      helperTextKey: "assessment.blocks.governance.helper",
      questions: [
        {
          id: "regulatoryCompliance",
          titleKey: "assessment.questions.regulatoryCompliance.title",
          helperTextKey: "assessment.questions.regulatoryCompliance.helper",
          required: true,
          uiVariant: "cards",
          options: [
            {
              id: "none",
              labelKey: "assessment.options.none.label",
              descriptionKey: "assessment.options.none.description",
              signalMapping: [
                {
                  target: "governanceFormalisation",
                  signalKey: "regulatoryCompliance",
                  value: 0
                }
              ]
            },
            {
              id: "strict",
              labelKey: "assessment.options.strict.label",
              descriptionKey: "assessment.options.strict.description",
              signalMapping: [
                {
                  target: "governanceFormalisation",
                  signalKey: "regulatoryCompliance",
                  value: 3
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
```

## Translation strategy

UI copy should not be stored directly in the config if the project uses i18n keys consistently.

### Recommended approach
The questionnaire config stores:
- identifiers
- structure
- translation keys
- signal mappings

Translation dictionaries store:
- block titles
- helper texts
- question texts
- option labels
- option descriptions

### Benefits
- easy bilingual support
- easier future extension
- clean separation between content and logic

## Validation rules

The questionnaire config system should support validation of:

- unique block IDs
- unique question IDs across the entire questionnaire
- unique option IDs within a question
- valid dimensionKey values
- valid conditional parent references
- valid translation key presence
- valid signal value range (0–3)

This validation can be implemented through:
- TypeScript typing
- runtime schema validation
- custom config validation scripts

## Future-proofing rules

The config should be designed so that later changes remain manageable.

### Recommended protections
- keep block IDs stable
- keep question IDs stable
- use `version` at the questionnaire root
- do not rely on translated text as business logic
- do not use option labels as identifiers
- do not hardcode model aggregation directly inside the UI layer

## What this config should not do

This config is for questionnaire content and signal mapping.

It should **not** directly contain:
- full ranking logic for all methodologies
- visual styling values
- export logic
- final explanation text assembly
- page layout markup

Those belong elsewhere.

## Relationship to other files

This specification should work together with:

- `assessment-page-spec.md`
- `result-object-schema.md`
- `methodology-content-schema.md`
- `design-system.md`

## Definition of done

The questionnaire config layer is ready for first implementation when:

- all 6 blocks can be represented in structured config
- each block can render questions from config
- answer options carry stable IDs and translation keys
- conditional subquestions can be triggered from parent answers
- answers can be persisted with stable technical identifiers
- signal mappings can be consumed by later scoring / ranking logic
- no questionnaire text is hardcoded into page components
