# Result Object Schema Specification

## Purpose

This document defines the structured result object produced after the questionnaire is processed by the recommendation model.

Its job is to standardize the contract between:

- assessment processing logic
- ranking logic
- results page rendering
- save / restore behavior
- export generation
- later explanation and sensitivity features

This schema should make the result page renderable from structured data without hardcoding methodology-specific result content directly in UI components.

## Design principles

1. The result object must be self-contained enough to render the Results page.
2. The result object must preserve ranking order explicitly.
3. The result object must support explainability.
4. The result object must support save / restore by result code.
5. The result object must support export generation later.
6. The result object must not depend on UI text labels as logic identifiers.
7. The result object must be stable enough to version over time.

## Core output responsibilities

The result object must support these product behaviors:

- show the ranked list of methodologies
- identify the top recommendation
- show key signal tags for the top methodology
- show dimension-level explanation summaries
- show alternative methodologies
- show confidence / sensitivity hints
- expose a result code
- provide export-ready structured content

## Recommended file organization

Possible structure:

- `src/types/result.ts`
- `src/lib/result/schema.ts`
- `src/lib/result/normalizeResult.ts`

Optional:
- `src/lib/result/buildResultObject.ts`
- `src/lib/result/resultVersion.ts`

## Root type

```ts
type AssessmentResult = {
  version: string
  resultCode: string
  createdAt: string
  questionnaireVersion: string
  methodologyOrder: MethodologyId[]
  topMethodologyId: MethodologyId
  ranking: RankedMethodologyResult[]
  dimensions: DimensionResult[]
  summary: ResultSummary
  sensitivityHint?: SensitivityHint
  metadata?: ResultMetadata
}
```

## Field-by-field explanation

## 1. `version`

### Type
`string`

### Purpose
Identifies the result-object schema version.

### Why it matters
This is needed for:
- future migration of saved results
- safe restore behavior
- export compatibility

Example:
```ts
version: "1.0.0"
```

## 2. `resultCode`

### Type
`string`

### Purpose
Unique lightweight identifier used to reopen a saved result.

### Requirements
- stable enough for user copy/paste
- human-shareable if possible
- not dependent on UI labels

### Notes
Generation strategy can vary:
- local encoded payload
- local hash
- server-generated code in future
- serialized compact code

The first implementation may use a mock or simple local encoding strategy.

## 3. `createdAt`

### Type
`string` (ISO timestamp recommended)

### Purpose
Preserves result creation time for exports, restore behavior, and future tracking.

## 4. `questionnaireVersion`

### Type
`string`

### Purpose
Links the result to the questionnaire structure version used to create it.

### Why it matters
Restoring results from older questionnaire versions may require migration or limited compatibility logic.

## 5. `methodologyOrder`

### Type
`MethodologyId[]`

### Purpose
Preserves ranking order explicitly.

### Important rule
The ranking order should not be inferred only from score sorting in the UI.
It must be included directly in the result object.

### Example
```ts
methodologyOrder: ["scrum", "kanban", "rup", "waterfall", "spiral", "gost34"]
```

## 6. `topMethodologyId`

### Type
`MethodologyId`

### Purpose
Makes the top recommendation directly accessible without re-deriving it from array position.

### Why it matters
This simplifies:
- page rendering
- navigation to methodology reference
- export assembly

## 7. `ranking`

### Type
`RankedMethodologyResult[]`

### Purpose
Stores the per-methodology ranked results shown on the Results page.

This is the most important structured field for rendering the ranked list and detailed cards.

## RankedMethodologyResult type

```ts
type RankedMethodologyResult = {
  methodologyId: MethodologyId
  rank: number
  fitTier: FitTier
  fitLabelKey: string
  shortRationaleKey?: string
  shortRationaleText?: string
  signalTags: ResultTag[]
  overviewKey?: string
  overviewText?: string
  dimensionHighlights: MethodologyDimensionHighlight[]
  outcomeKey?: string
  outcomeText?: string
  tradeoffKey?: string
  tradeoffText?: string
  isTopFit: boolean
}
```

## Ranked field explanations

### `methodologyId`
Stable methodology identifier.

Recommended union:
```ts
type MethodologyId =
  | "waterfall"
  | "spiral"
  | "gost34"
  | "rup"
  | "scrum"
  | "kanban"
```

### `rank`
Explicit position in the ordered list.

### `fitTier`
Machine-readable fit strength category.

Recommended type:
```ts
type FitTier = "bestFit" | "strongAlternative" | "moderateFit" | "lowerFit"
```

### `fitLabelKey`
Translation key for the visible label.

### `shortRationaleKey` / `shortRationaleText`
Compact explanation used in the top ranked list summary.

Either keyed or resolved text may be used depending on implementation style.
Prefer keys if the explanation is standardized.
Prefer text if the explanation is assembled dynamically.

### `signalTags`
Short tags shown in the top methodology card and optionally in ranked summaries.

### `overviewKey` / `overviewText`
Short narrative explanation for why the method fits.

### `dimensionHighlights`
Subset of dimension-level summaries relevant to this methodology.

### `outcomeKey` / `outcomeText`
Short practical interpretation summary.

### `tradeoffKey` / `tradeoffText`
Optional short explanation of why this method is not ranked higher or what trade-off it implies.

### `isTopFit`
Convenience field for rendering logic.

## 8. `dimensions`

### Type
`DimensionResult[]`

### Purpose
Stores the aggregated dimension results computed from the questionnaire.

This field supports:
- result explanation
- confidence / sensitivity hints
- later exports
- debugging / traceability

## DimensionResult type

```ts
type DimensionResult = {
  dimensionKey: DimensionKey
  level: 0 | 1 | 2 | 3
  summaryKey?: string
  summaryText?: string
  contributingSignals: DimensionSignal[]
}
```

## DimensionResult field meanings

### `dimensionKey`
One of the six aggregated dimensions.

Use the same `DimensionKey` type defined in questionnaire config.

### `level`
Final ordinal level on the agreed 0–3 scale.

### `summaryKey` / `summaryText`
Compact human-readable interpretation used in result explanation.

### `contributingSignals`
Detailed trace of sub-signals that produced the dimension level.

This helps explainability and later debugging.

## DimensionSignal type

```ts
type DimensionSignal = {
  signalKey: string
  value: 0 | 1 | 2 | 3
}
```

### Example
```ts
{
  dimensionKey: "governanceFormalisation",
  level: 2,
  contributingSignals: [
    { signalKey: "regulatoryCompliance", value: 1 },
    { signalKey: "stageDocumentation", value: 2 },
    { signalKey: "formalAcceptance", value: 2 }
  ]
}
```

## 9. `summary`

### Type
`ResultSummary`

### Purpose
Stores compact top-level result explanation needed by the Results page.

## ResultSummary type

```ts
type ResultSummary = {
  titleKey?: string
  titleText?: string
  introKey?: string
  introText?: string
  topRecommendationKey?: string
  topRecommendationText?: string
}
```

### Notes
This section is optional but useful if the Results page needs page-level text already resolved from model processing.

It can hold:
- page intro
- main recommendation framing line
- top-level interpretation sentence

## 10. `sensitivityHint`

### Type
`SensitivityHint | undefined`

### Purpose
Provides a compact explanation of result stability and nearest alternatives.

This is especially useful for the best-fit card.

## SensitivityHint type

```ts
type SensitivityHint = {
  fitStrength: "strong" | "medium" | "borderline"
  closestAlternativeId?: MethodologyId
  mostSensitiveDimensionKey?: DimensionKey
  noteKey?: string
  noteText?: string
}
```

### Intent
Supports UI like:
- Fit strength: strong
- Closest alternative: Kanban
- Most sensitive dimension: Governance Formalisation

### Important rule
This should be page-level or top-fit-level information, not repeated independently for every methodology by default.

## 11. `metadata`

### Type
`ResultMetadata | undefined`

### Purpose
Stores non-visual supporting information.

## ResultMetadata type

```ts
type ResultMetadata = {
  generatedBy?: string
  locale?: string
  source?: "assessment" | "restored"
  debug?: Record<string, unknown>
}
```

### Notes
Keep this optional.
Do not let UI rendering depend on `debug` fields.

## Supporting shared types

## ResultTag

```ts
type ResultTag = {
  id: string
  labelKey: string
  labelText?: string
}
```

### Purpose
Short, scannable tags such as:
- Structured iterations
- Moderate governance
- Changing scope
- Continuous flow

## MethodologyDimensionHighlight

```ts
type MethodologyDimensionHighlight = {
  dimensionKey: DimensionKey
  level: 0 | 1 | 2 | 3
  explanationKey?: string
  explanationText?: string
}
```

### Purpose
A methodology-specific explanation of why a certain dimension supports or limits fit.

## Example minimal result object

```ts
const result: AssessmentResult = {
  version: "1.0.0",
  resultCode: "MM-8F2K-41QX",
  createdAt: "2026-04-07T12:00:00.000Z",
  questionnaireVersion: "1.0.0",
  methodologyOrder: ["scrum", "kanban", "rup", "waterfall", "spiral", "gost34"],
  topMethodologyId: "scrum",
  ranking: [
    {
      methodologyId: "scrum",
      rank: 1,
      fitTier: "bestFit",
      fitLabelKey: "results.fit.bestFit",
      shortRationaleText: "Adaptive work with structured iterations fits this project best.",
      signalTags: [
        { id: "structuredIterations", labelKey: "results.tags.structuredIterations" },
        { id: "changingScope", labelKey: "results.tags.changingScope" }
      ],
      overviewText: "Scrum ranks first because the project combines changing requirements with a need for structured iteration rhythm.",
      dimensionHighlights: [
        {
          dimensionKey: "iterationStructure",
          level: 2,
          explanationText: "The project benefits from timeboxed iterative delivery."
        }
      ],
      outcomeText: "Use a sprint-based adaptive process with clear review and planning rhythm.",
      tradeoffText: "Kanban remains plausible but provides less planning structure.",
      isTopFit: true
    }
  ],
  dimensions: [
    {
      dimensionKey: "iterationStructure",
      level: 2,
      summaryText: "Structured iterations are preferred over purely linear delivery.",
      contributingSignals: [
        { signalKey: "timeboxedIterations", value: 2 },
        { signalKey: "incrementalReleases", value: 2 }
      ]
    }
  ],
  summary: {
    titleText: "Your methodology ranking",
    introText: "The system recommends a ranked set of methods rather than one absolute answer.",
    topRecommendationText: "Scrum is the strongest fit for the current project context."
  },
  sensitivityHint: {
    fitStrength: "strong",
    closestAlternativeId: "kanban",
    mostSensitiveDimensionKey: "governanceFormalisation",
    noteText: "The top ranking remains stable unless governance demands increase significantly."
  },
  metadata: {
    source: "assessment",
    locale: "en"
  }
}
```

## Save / restore considerations

The result object should be serializable.

This means:
- avoid storing functions
- avoid storing circular references
- keep fields JSON-safe

### Recommended behavior
The saved result payload should preserve:
- ranking
- top methodology
- dimension levels
- result code
- versioning information

The page should not need to recompute the entire ranking after restore if the stored result object is already valid.

## Export considerations

This schema should support export generation.

### Minimum export-ready fields
Exports should be able to read:
- createdAt
- resultCode
- ranking
- topMethodologyId
- dimensions
- summary
- sensitivityHint

### Important rule
The export builder should consume the structured result object instead of rebuilding explanation content from scratch inside export code.

## Copy and i18n strategy

There are two viable approaches:

### Approach A: key-first
The result object stores translation keys plus structural values.

Pros:
- flexible for bilingual rendering
- keeps locale decisions in the UI layer

### Approach B: resolved-text result
The result object stores already assembled text for the current locale.

Pros:
- simpler export generation
- simpler restore rendering

### Recommended hybrid
Allow both:
- keys for reusable/static strings
- resolved text for assembled explanation fragments

This avoids overcomplicating the first implementation while preserving structure.

## Validation rules

The result object layer should validate:

- valid methodology IDs
- unique methodology IDs in ranking
- ranking count equals 6 in the current model
- `topMethodologyId` exists in ranking
- methodology order matches ranking order
- valid dimension keys
- dimension levels are within 0–3
- fit tiers use allowed values
- schema version exists

This can be handled via:
- TypeScript
- runtime schema validation
- custom validation helpers

## Relationship to other files

This specification should work together with:

- `results-page-spec.md`
- `questionnaire-config-spec.md`
- `methodology-content-schema.md`
- `design-system.md`

## What this schema should not do

This schema is for result data transport and rendering support.

It should **not** contain:
- raw page layout markup
- full methodology reference content
- visual style tokens
- questionnaire UI configuration
- implementation-specific React component state

## Definition of done

The result object contract is ready for first implementation when:

- the full ranking can be represented with stable identifiers
- the top methodology is directly accessible
- dimension-level explanation data can be carried
- signal tags and outcome summaries can be rendered from the object
- confidence / sensitivity hints can be carried
- the object can be serialized safely
- save / restore can rely on this structure without recomputing UI text from page components
