# Methodology Content Schema Specification

## Purpose

This document defines the structured data format for methodology reference content.

Its job is to standardize how content for the six supported methodologies is stored so that the Methodologies page can render:

- overview
- first steps
- core elements
- team needs
- common mistakes
- applicability
- not covered here
- study next

without hardcoding methodology-specific text directly into UI components.

This schema should support:
- shared page template rendering
- methodology-specific internal structure
- bilingual content
- future content growth without page redesign
- linking from Results page to the relevant methodology

## Core design principles

1. Every methodology uses the same high-level section structure.
2. Internal structure inside **Core elements** may vary by methodology.
3. UI copy should come from translation keys or structured content sources.
4. The schema must support practical, skimmable content rather than essay-like text.
5. The schema must support both shared page layout and methodology-specific meaning.
6. The schema must remain implementation-friendly and JSON-safe.

## Supported methodologies

The schema must support exactly these methodology IDs in the current product version:

- `waterfall`
- `spiral`
- `gost34`
- `rup`
- `scrum`
- `kanban`

Recommended shared type:

```ts
type MethodologyId =
  | "waterfall"
  | "spiral"
  | "gost34"
  | "rup"
  | "scrum"
  | "kanban"
```

## Recommended file organization

Possible structure:

- `src/config/methodologies/types.ts`
- `src/config/methodologies/index.ts`
- `src/config/methodologies/waterfall.ts`
- `src/config/methodologies/spiral.ts`
- `src/config/methodologies/gost34.ts`
- `src/config/methodologies/rup.ts`
- `src/config/methodologies/scrum.ts`
- `src/config/methodologies/kanban.ts`

or

- one centralized `methodologies.ts` file
- separate locale files for text

Either structure is acceptable, but the content should not be embedded inside page JSX.

## Root schema

```ts
type MethodologyContentMap = Record<MethodologyId, MethodologyContent>
```

Each methodology must provide a `MethodologyContent` object.

## Main type

```ts
type MethodologyContent = {
  id: MethodologyId
  titleKey: string
  shortLabelKey?: string
  overview: MethodologyOverview
  firstSteps: MethodologyFirstSteps
  coreElements: MethodologyCoreElements
  teamNeeds: MethodologyListSection
  commonMistakes: MethodologyListSection
  applicability: MethodologyApplicability
  notCoveredHere: MethodologyListSection
  studyNext: MethodologyListSection
  quickFit?: MethodologyQuickFit
}
```

## Section-by-section schema

## 1. Overview

### Purpose
Introduce the methodology in a short, practical way.

### Type

```ts
type MethodologyOverview = {
  titleKey?: string
  descriptionKey: string
  signalTags: MethodologyTag[]
  fitBadgeKey?: string
}
```

### Field meaning

#### `descriptionKey`
Translation key for the overview paragraph.

#### `signalTags`
Short tags that summarize the methodology identity.

Examples:
- Timeboxed Sprints
- Adaptive planning
- Continuous flow
- WIP limits
- Stage documentation
- Risk-driven iteration

#### `fitBadgeKey`
Optional key for a contextual badge such as “Best fit” when opened from result state.

### Rule
Overview should stay short and scannable.

## 2. First steps

### Purpose
Show how to start applying the methodology.

### Type

```ts
type MethodologyFirstSteps = {
  titleKey?: string
  introKey?: string
  mode: "sequence" | "list"
  steps: MethodologyStep[]
}
```

### Step type

```ts
type MethodologyStep = {
  id: string
  titleKey: string
  descriptionKey?: string
  emphasis?: "normal" | "final"
}
```

### Field meaning

#### `mode`
Indicates the preferred rendering style.

- `sequence` -> visual step-by-step diagram / workflow strip
- `list` -> structured practical list

### Recommended usage by methodology
Likely defaults:

- Scrum -> `sequence`
- Kanban -> `sequence`
- RUP -> `sequence`
- GOST 34 -> `sequence`
- Waterfall -> `sequence` or `list`
- Spiral -> `sequence`

### Rule
Even when using `list`, content should remain action-oriented, not conceptual.

## 3. Core elements

### Purpose
Represent the inner structure of the methodology in a reference-friendly way.

### Type

```ts
type MethodologyCoreElements = {
  titleKey?: string
  introKey?: string
  groups: CoreElementsGroup[]
}
```

### Group type

```ts
type CoreElementsGroup = {
  id: string
  labelKey: string
  items: CoreElementItem[]
}
```

### Item type

```ts
type CoreElementItem = {
  id: string
  titleKey: string
  descriptionKey: string
  noteKey?: string
}
```

### Why groups matter
This structure allows each methodology to define different internal categories while preserving the same outer UI shell.

### Expected group structures by methodology

#### Scrum
Use groups such as:
- roles
- events
- artifacts

#### Kanban
Use groups such as:
- principles
- boardStructure
- wipLimits
- flowMetrics

#### RUP
Use groups such as:
- phases
- iterations
- practices
- artifacts

#### Waterfall
Use groups such as:
- stages
- documents
- controlGates

#### Spiral
Use groups such as:
- riskCycle
- prototyping
- evaluationLoop

#### GOST 34
Use groups such as:
- stages
- documentation
- acceptance

### Important rule
Do not force all methodologies into one identical `Roles / Events / Artifacts` structure.
That only works for Scrum and maybe a few fragments elsewhere.

## 4. Team needs

### Purpose
Explain what conditions the team or organization needs in order to use the methodology well.

### Type

```ts
type MethodologyListSection = {
  titleKey?: string
  introKey?: string
  items: MethodologyListItem[]
}
```

### List item type

```ts
type MethodologyListItem = {
  id: string
  textKey: string
}
```

### Usage
This type is reused across:
- teamNeeds
- commonMistakes
- notCoveredHere
- studyNext

### Rule
Keep items short and direct.
Avoid paragraph-length list items.

## 5. Common mistakes

Uses the shared `MethodologyListSection` type.

### Purpose
Show anti-patterns and implementation failures typical for the methodology.

### Rule
These should be practice-oriented mistakes, not generic platitudes.

Examples:
- Fake Scrum without real roles
- WIP limits ignored
- Stage gates without meaningful review
- Risk iteration claimed but not actually performed

## 6. Applicability

### Purpose
Show where the methodology fits well and where it becomes weaker.

### Type

```ts
type MethodologyApplicability = {
  titleKey?: string
  goodFitTitleKey?: string
  weakerFitTitleKey?: string
  goodFit: MethodologyListItem[]
  weakerFit: MethodologyListItem[]
}
```

### Rule
Applicability must support two explicit lists:
- Good fit when
- Weaker fit when

This should map directly to the preferred UI layout on the Methodologies page.

## 7. Not covered here

Uses the shared `MethodologyListSection` type.

### Purpose
State what this page does not fully teach.

### Rule
This section is about scope honesty, not about listing random advanced topics.

## 8. Study next

Uses the shared `MethodologyListSection` type.

### Purpose
Show the user where to go after reading the methodology page.

### Rule
Items should point to next learning themes, not to specific URLs inside the schema.

## 9. Quick fit (optional)

### Purpose
Provide a compact summary of where the methodology is strongest.

### Type

```ts
type MethodologyQuickFit = {
  titleKey?: string
  summaryKey: string
}
```

### Usage
Good for sidebar support or top-level orientation block.

### Example intent
- Best for adaptive work with short structured iterations
- Best for continuous service flow and WIP-limited delivery
- Best for strict governance and formal acceptance

## Shared supporting types

## MethodologyTag

```ts
type MethodologyTag = {
  id: string
  labelKey: string
}
```

### Purpose
Short overview tags used in the methodology header area.

## Translation strategy

There are two acceptable approaches.

## Approach A: key-based content objects
The methodology schema stores only:
- structure
- IDs
- translation keys

The actual text lives in locale dictionaries.

### Pros
- strong i18n separation
- easier language switching

### Cons
- more translation files to maintain

## Approach B: hybrid structure
The methodology schema stores:
- structure
- IDs
- keys for reusable labels
- resolved text for some method-specific blocks

### Pros
- simpler first implementation
- easier content authoring while the project is still evolving

### Recommended direction
Use key-based fields wherever feasible.
Allow resolved text only if implementation speed truly requires it.

## Example minimal methodology object

```ts
const scrumContent: MethodologyContent = {
  id: "scrum",
  titleKey: "methodologies.scrum.title",
  overview: {
    descriptionKey: "methodologies.scrum.overview.description",
    signalTags: [
      { id: "timeboxedSprints", labelKey: "methodologies.scrum.tags.timeboxedSprints" },
      { id: "adaptivePlanning", labelKey: "methodologies.scrum.tags.adaptivePlanning" },
      { id: "regularFeedback", labelKey: "methodologies.scrum.tags.regularFeedback" }
    ]
  },
  firstSteps: {
    mode: "sequence",
    steps: [
      {
        id: "assignRoles",
        titleKey: "methodologies.scrum.firstSteps.assignRoles.title",
        descriptionKey: "methodologies.scrum.firstSteps.assignRoles.description"
      },
      {
        id: "createBacklog",
        titleKey: "methodologies.scrum.firstSteps.createBacklog.title",
        descriptionKey: "methodologies.scrum.firstSteps.createBacklog.description"
      }
    ]
  },
  coreElements: {
    groups: [
      {
        id: "roles",
        labelKey: "methodologies.scrum.core.roles",
        items: [
          {
            id: "productOwner",
            titleKey: "methodologies.scrum.core.roles.productOwner.title",
            descriptionKey: "methodologies.scrum.core.roles.productOwner.description"
          }
        ]
      },
      {
        id: "events",
        labelKey: "methodologies.scrum.core.events",
        items: [
          {
            id: "sprintPlanning",
            titleKey: "methodologies.scrum.core.events.sprintPlanning.title",
            descriptionKey: "methodologies.scrum.core.events.sprintPlanning.description"
          }
        ]
      },
      {
        id: "artifacts",
        labelKey: "methodologies.scrum.core.artifacts",
        items: [
          {
            id: "productBacklog",
            titleKey: "methodologies.scrum.core.artifacts.productBacklog.title",
            descriptionKey: "methodologies.scrum.core.artifacts.productBacklog.description"
          }
        ]
      }
    ]
  },
  teamNeeds: {
    items: [
      { id: "goalFocus", textKey: "methodologies.scrum.teamNeeds.goalFocus" },
      { id: "backlogOwnership", textKey: "methodologies.scrum.teamNeeds.backlogOwnership" }
    ]
  },
  commonMistakes: {
    items: [
      { id: "fakeScrum", textKey: "methodologies.scrum.commonMistakes.fakeScrum" }
    ]
  },
  applicability: {
    goodFit: [
      { id: "changingRequirements", textKey: "methodologies.scrum.applicability.goodFit.changingRequirements" }
    ],
    weakerFit: [
      { id: "strictGovernance", textKey: "methodologies.scrum.applicability.weakerFit.strictGovernance" }
    ]
  },
  notCoveredHere: {
    items: [
      { id: "scaling", textKey: "methodologies.scrum.notCoveredHere.scaling" }
    ]
  },
  studyNext: {
    items: [
      { id: "backlogManagement", textKey: "methodologies.scrum.studyNext.backlogManagement" }
    ]
  },
  quickFit: {
    summaryKey: "methodologies.scrum.quickFit.summary"
  }
}
```

## Methodology-specific examples of group design

## Kanban example
```ts
coreElements.groups = [
  { id: "principles", ... },
  { id: "boardStructure", ... },
  { id: "wipLimits", ... },
  { id: "flowMetrics", ... }
]
```

## RUP example
```ts
coreElements.groups = [
  { id: "phases", ... },
  { id: "iterations", ... },
  { id: "practices", ... },
  { id: "artifacts", ... }
]
```

## GOST 34 example
```ts
coreElements.groups = [
  { id: "stages", ... },
  { id: "documentation", ... },
  { id: "acceptance", ... }
]
```

## Waterfall example
```ts
coreElements.groups = [
  { id: "stages", ... },
  { id: "documents", ... },
  { id: "controlGates", ... }
]
```

## Spiral example
```ts
coreElements.groups = [
  { id: "riskCycle", ... },
  { id: "prototyping", ... },
  { id: "evaluationLoop", ... }
]
```

## Validation rules

The methodology content layer should validate:

- every supported methodology ID exists
- every methodology provides all required top-level sections
- every group ID is unique within a methodology
- every item ID is unique within its group
- every applicability section contains both `goodFit` and `weakerFit`
- every list section contains stable IDs
- translation keys exist or resolved content is provided intentionally

Validation may be implemented through:
- TypeScript typing
- runtime schema validation
- custom content validation script

## Future-proofing rules

The schema should support future growth without redesign.

### Recommended protections
- keep methodology IDs stable
- keep group IDs stable
- avoid deriving logic from translated labels
- do not encode UI layout decisions too deeply into content
- prefer explicit structure over inferred structure

## Relationship to other files

This specification should work together with:

- `methodologies-page-spec.md`
- `results-page-spec.md`
- `design-system.md`
- `result-object-schema.md`

## What this schema should not do

This schema is for methodology reference content.

It should **not** contain:
- ranking logic
- questionnaire structure
- export layout markup
- page-specific React state
- visual style tokens

## Definition of done

The methodology content layer is ready for first implementation when:

- all 6 methodologies can be represented through one shared schema
- each methodology can define its own internal Core elements structure
- overview, first steps, applicability, and study-next sections can be rendered from data
- no methodology page copy is hardcoded into JSX page files
- bilingual support remains possible without redesigning the schema
