# Frontend Architecture Specification

## Purpose

This document defines the recommended frontend architecture for Methodology Match.

Its goal is to give implementation structure to the already defined page specs, data schemas, and design system so that development can begin without ad hoc folder growth and without mixing UI, content, and model logic in one place.

This architecture is designed for:

- Next.js
- TypeScript
- Tailwind CSS
- App Router
- config-driven content rendering
- bilingual support
- local-first state persistence in early versions

## Architectural goals

The frontend architecture should support:

1. clear separation between UI and content/config
2. reusable components across pages
3. route-level clarity
4. stable data contracts between questionnaire, result logic, and reference content
5. easy internationalization
6. ability to scale from static page rendering to real result processing
7. ability to add export logic and save/restore later without restructuring the app

## Recommended stack

### Core framework
- Next.js
- React
- TypeScript
- App Router

### Styling
- Tailwind CSS

### State
- local component state where sufficient
- shared hooks for assessment state
- local persistence through localStorage in early implementation

### Validation / typing
- TypeScript first
- optional runtime validation later using Zod or equivalent

### Icons / assets
- lightweight icon set if needed
- avoid large UI libraries unless truly necessary

## High-level architecture layers

The frontend should be organized into these layers:

1. **app routes**
2. **shared UI components**
3. **feature modules**
4. **structured config/content**
5. **localization**
6. **lib utilities and model helpers**
7. **types**

This separation is important.
Do not collapse all of these into a flat `components + pages + utils` mess.

## Recommended folder structure

```txt
src/
  app/
    layout.tsx
    page.tsx
    how-it-works/
      page.tsx
    about-model/
      page.tsx
    methodologies/
      page.tsx
    assessment/
      page.tsx
      block/
        [blockId]/
          page.tsx
    results/
      page.tsx
      [resultCode]/
        page.tsx

  components/
    layout/
    navigation/
    sections/
    cards/
    controls/
    feedback/
    diagrams/
    result/
    methodology/
    assessment/

  features/
    assessment/
    results/
    methodologies/
    i18n/

  config/
    questionnaire/
    methodologies/
    pages/

  locales/
    en/
    ru/

  lib/
    assessment/
    result/
    methodology/
    i18n/
    storage/
    routing/
    export/

  hooks/
    useAssessmentState.ts
    useLocale.ts
    useMethodologySelection.ts

  types/
    questionnaire.ts
    result.ts
    methodology.ts
    common.ts
```

## Folder responsibilities

## 1. `app/`

### Purpose
Holds route entry points and top-level page composition for Next.js App Router.

### Rules
- route files should stay thin
- page files should compose sections and fetch/load config
- page files should not contain large embedded content objects
- page files should not contain deep business logic

### Expected routes

```txt
/
 /how-it-works
 /about-model
 /methodologies
 /assessment
 /assessment/block/[blockId]
 /results
 /results/[resultCode]
```

### Notes
If the first implementation keeps assessment block state inside one page, `/assessment/block/[blockId]` may be deferred.
Still, architecture should leave room for it.

## 2. `components/`

### Purpose
Reusable UI building blocks.

### Organization recommendation

```txt
components/
  layout/
    PageContainer.tsx
    AppHeader.tsx
    PageShell.tsx

  navigation/
    NavLinks.tsx
    LanguageSwitch.tsx
    SidebarNav.tsx
    MethodologyTabs.tsx

  sections/
    SectionHeading.tsx
    HeroSection.tsx
    UtilityBanner.tsx

  cards/
    InfoCard.tsx
    HighlightCard.tsx
    MethodologyPreviewCard.tsx
    DimensionCard.tsx

  controls/
    PrimaryButton.tsx
    SecondaryButton.tsx
    PillTab.tsx
    AnswerOptionCard.tsx
    ResultCodeInput.tsx

  feedback/
    AutosaveNote.tsx
    ValidationMessage.tsx
    ConfidenceHint.tsx

  diagrams/
    WorkflowStepCard.tsx
    ArrowConnector.tsx
    FirstStepsSequence.tsx

  result/
    RankedList.tsx
    RankedListItem.tsx
    BestFitCard.tsx
    OutcomeBlock.tsx
    ExportActionGroup.tsx

  methodology/
    CoreElementsTabs.tsx
    ApplicabilityLists.tsx
    QuickFitPanel.tsx

  assessment/
    ProgressBar.tsx
    BlockHeader.tsx
    QuestionCard.tsx
    ConditionalQuestionGroup.tsx
    AssessmentNav.tsx
```

### Rules
- components should be reusable
- components should receive content through props
- components should not reach directly into locale files unless they are true app-shell components
- components should avoid business logic unless they are clearly feature-bound

## 3. `features/`

### Purpose
Feature-oriented composition layer for logic and view coordination.

### Why this layer matters
Some logic is bigger than a single component but should not live in raw `lib/` either.

### Suggested structure

```txt
features/
  assessment/
    AssessmentPageView.tsx
    AssessmentBlockView.tsx
    assessmentState.ts
    assessmentSelectors.ts

  results/
    ResultsPageView.tsx
    resultSelectors.ts

  methodologies/
    MethodologyPageView.tsx
    methodologySelectors.ts

  i18n/
    localeContext.tsx
    localeProvider.tsx
```

### Rules
- feature modules may compose multiple components
- feature modules may adapt config objects to view needs
- feature modules should not store large text directly

## 4. `config/`

### Purpose
Structured content/config that drives rendering.

### Suggested structure

```txt
config/
  questionnaire/
    index.ts
    types.ts
    blocks.ts

  methodologies/
    index.ts
    types.ts
    waterfall.ts
    spiral.ts
    gost34.ts
    rup.ts
    scrum.ts
    kanban.ts

  pages/
    home.ts
    howItWorks.ts
    aboutModel.ts
```

### Why this matters
This keeps:
- questionnaire structure
- methodology content structure
- static page structure
separate from UI components.

### Rules
- configs use stable IDs
- configs may use translation keys
- configs should stay JSON-safe when possible
- configs should not contain React nodes

## 5. `locales/`

### Purpose
Translation dictionaries.

### Suggested structure

```txt
locales/
  en/
    nav.ts
    home.ts
    howItWorks.ts
    aboutModel.ts
    assessment.ts
    results.ts
    methodologies.ts

  ru/
    nav.ts
    home.ts
    howItWorks.ts
    aboutModel.ts
    assessment.ts
    results.ts
    methodologies.ts
```

### Rules
- user-facing copy lives here or is referenced from schema content keys
- component logic must not depend on translated strings
- translation keys must remain stable
- avoid one giant locale file for the whole app if possible

## 6. `lib/`

### Purpose
Low-level utilities, model helpers, storage, routing, and export support.

### Suggested structure

```txt
lib/
  assessment/
    computeDimensionSignals.ts
    normalizeAnswers.ts
    validateAssessmentAnswers.ts

  result/
    buildResultObject.ts
    validateResultObject.ts
    rankMethodologies.ts

  methodology/
    getMethodologyContent.ts
    resolveMethodologyById.ts

  i18n/
    getDictionary.ts
    resolveLocale.ts

  storage/
    saveAssessmentProgress.ts
    loadAssessmentProgress.ts
    saveResultObject.ts
    loadResultObject.ts

  routing/
    buildMethodologyLink.ts
    buildResultLink.ts

  export/
    exportResultJson.ts
    exportResultPdf.ts
```

### Rules
- `lib/` should not contain page JSX
- `lib/` should contain deterministic helpers and adapters
- export code should consume structured result objects, not raw page markup
- result-building logic should not live inside page components

## 7. `hooks/`

### Purpose
Shared UI-oriented state access hooks.

### Suggested hooks
- `useAssessmentState`
- `useLocale`
- `useMethodologySelection`
- `useResultActions`

### Rules
- hooks should coordinate UI state
- hooks should not become an unstructured dumping ground
- if logic becomes cross-feature business logic, move it to `lib/` or `features/`

## 8. `types/`

### Purpose
Shared type contracts.

### Suggested files

```txt
types/
  questionnaire.ts
  result.ts
  methodology.ts
  common.ts
```

### Rules
- centralize shared interfaces used across config, features, and lib
- avoid redefining core types in multiple folders
- align these files with:
  - `questionnaire-config-spec.md`
  - `result-object-schema.md`
  - `methodology-content-schema.md`

## Route composition guidance

## Home route
`app/page.tsx`

Should:
- load Home content/config
- compose hero, saved result section, methodology preview, utility banner
- remain thin and declarative

## How it works route
`app/how-it-works/page.tsx`

Should:
- load page config or dictionary-backed content
- compose workflow block, dimension cards, rule section, explainability block

## About model route
`app/about-model/page.tsx`

Should:
- compose conceptual page sections from structured content or dictionaries
- avoid embedding long copy inside the page file

## Methodologies route
`app/methodologies/page.tsx`

Should:
- read selected methodology state
- render methodology tabs + sidebar + main content template
- consume methodology content schema

## Assessment route
`app/assessment/page.tsx`
or
`app/assessment/block/[blockId]/page.tsx`

Should:
- resolve questionnaire config
- read and update local answer state
- render current block from config
- navigate between blocks

## Results route
`app/results/page.tsx`
and optionally `app/results/[resultCode]/page.tsx`

Should:
- consume a structured `AssessmentResult`
- render ranking, best fit, alternatives, save/export area
- not rebuild result meaning in JSX

## State architecture

## Assessment state

### Recommendation
Keep assessment answers in a feature-level state module or hook.

Suggested responsibilities:
- current block ID
- selected answers
- conditional question visibility
- completion validation
- local save / restore

### Important rule
The assessment page should not derive everything directly from uncontrolled component state.
A stable feature state layer is needed.

## Result state

### Recommendation
The result view should consume a structured result object.
Avoid recomputing ranking logic in multiple places.

Possible result sources:
- freshly computed after assessment
- restored from result code
- mock result during early UI implementation

## Methodology selection state

### Recommendation
The selected methodology on the Methodologies page may be driven by:
- internal state
- query parameter
- link from Results page

Architecture should support all three eventually.

## Data flow recommendations

## Assessment flow
Questionnaire config
-> rendered questions
-> selected answers
-> normalized signal mappings
-> dimension aggregation
-> ranking logic
-> result object
-> Results page

## Methodology flow
Selected methodology ID
-> methodology content lookup
-> shared page template
-> internal section rendering

## Save / restore flow
AssessmentResult
-> serialize
-> result code / storage
-> restore
-> validate schema version
-> render Results page

## Internationalization flow

### Recommendation
Use a locale provider or route-level dictionary loading approach.

Basic flow:
- detect current locale
- load dictionaries
- pass translated strings or key resolvers to pages/components

### Important rule
Do not make business logic dependent on locale text.

## Styling architecture

### Recommendation
Use Tailwind utility classes for implementation speed, but stabilize visual patterns through shared components.

### Good pattern
- visual tokens reflected through component usage
- consistent spacing / radius / surface treatment
- thin page files

### Bad pattern
- each page manually invents its own card and button styling

## Persistence architecture

## Early version
Use localStorage or equivalent browser persistence for:
- assessment progress
- last result object

### Suggested storage keys
- `methodologyMatch.assessment.v1`
- `methodologyMatch.result.v1`

### Important rule
Storage logic belongs in `lib/storage/`, not directly in page files.

## Export architecture

### Recommendation
Export helpers should consume:
- `AssessmentResult`
- methodology content where needed
- locale data if text resolution is required

### Do not do this
Do not generate export content by scraping rendered DOM or rebuilding the result from page state manually.

## Testing implications

Even if tests are not added immediately, architecture should make them possible later.

### Areas that should be testable
- questionnaire config validation
- answer normalization
- result object creation
- methodology content lookup
- result restore validation
- route-level rendering with mock data

## Common mistakes to avoid

Do not:
- store all project logic directly in `app/page.tsx` files
- put methodology text directly inside components
- mix export logic with Results page JSX
- duplicate type definitions across folders
- tightly couple locale dictionaries to internal model logic
- build six separate methodology pages by copy-paste
- let localStorage keys and shapes drift without versioning

## Suggested implementation order

1. app shell and layout
2. shared components
3. locale structure
4. static page routes
5. questionnaire config and assessment feature state
6. result object builder and Results page rendering
7. methodology content schema integration
8. save / restore and export support

## Definition of done

The frontend architecture is ready for implementation when:

- routes are clearly defined
- folder responsibilities are explicit
- page files can stay thin
- content/config lives outside page JSX
- questionnaire and result contracts have clear homes
- methodology reference content has a shared rendering path
- local persistence and export logic have dedicated utility layers
- i18n structure is planned from the start
