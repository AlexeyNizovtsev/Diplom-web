# AGENTS.md

## Project overview

This repository contains the frontend for **Methodology Match**, a desktop-first bilingual web application that helps users choose a suitable software development methodology through a structured, explainable, rule-based decision-support flow.

The product is not a generic landing page and not a CMS. It is a focused product UI with:

- a questionnaire-driven assessment flow
- ranked methodology recommendations
- explanation of decision drivers
- methodology reference pages
- save / restore result behavior
- export-ready result structure

## Primary implementation priorities

When working in this repository, prioritize:

1. structural accuracy over creativity
2. reuse over duplication
3. config-driven rendering over hardcoded content
4. visual consistency over one-off styling
5. clear architecture over short-term hacks

## Source-of-truth order

When multiple sources exist, use this priority order:

### 1. Page spec files
These define page structure, behavior, hierarchy, and required sections.

Examples:
- `docs/home-page-spec.md`
- `docs/how-it-works-spec.md`
- `docs/results-page-spec.md`
- `docs/methodologies-page-spec.md`
- `docs/assessment-page-spec.md`
- `docs/about-model-spec.md`

### 2. Schema and architecture files
These define contracts for data, config, and folder structure.

Examples:
- `docs/frontend-architecture.md`
- `docs/questionnaire-config-spec.md`
- `docs/result-object-schema.md`
- `docs/methodology-content-schema.md`

### 3. Design system file
This defines visual rules and reusable UI behavior.

- `docs/design-system.md`

### 4. Design reference files
These are visual-matching references only.

Examples:
- `docs/design_refs/home_screen.md`
- `docs/design_refs/home_screen_css.md`

These files should help with:
- spacing
- typography
- visual hierarchy
- card proportions
- colors
- emphasis levels

They should **not** be copied literally into implementation if that would result in brittle layout.

## Critical rule about design references

Design reference files exported from SVG or CSS are **not** direct implementation instructions.

Do not recreate pages with:
- absolute-positioned full-screen layout
- fixed pixel coordinates everywhere
- exported vector wrappers treated as semantic UI
- one-off DOM structures that mirror design-export artifacts

Instead:
- preserve the visual composition
- preserve the relative hierarchy
- preserve the spacing rhythm
- preserve typography scale
- preserve the desktop-first layout
- implement using reusable React components and flex/grid layout where appropriate

## Technology stack

Unless explicitly changed by repository docs, use:

- Next.js
- React
- TypeScript
- Tailwind CSS
- App Router

Do not introduce heavy UI frameworks or large design systems unless clearly justified by the existing architecture.

## Architectural rules

### Keep route files thin
Files in `src/app/**/page.tsx` should compose page views and load data/config.
They should not contain large hardcoded content blocks or business logic.

### Keep content outside JSX
Do not hardcode long user-facing copy directly inside page components.

Use:
- locale dictionaries
- page config files
- methodology content config
- questionnaire config

### Keep shared contracts centralized
Use shared types from `src/types` and align them with the project docs.

### Build reusable components
If a pattern appears more than once, prefer a shared component.

Examples:
- cards
- tabs
- section headers
- workflow steps
- banners
- buttons
- result rows
- methodology reference blocks

### Do not duplicate methodology pages
The Methodologies area should render from shared template + structured content, not six duplicated page implementations.

### Do not duplicate questionnaire pages manually
Assessment blocks should render from questionnaire config rather than page-by-page hardcoded content.

## i18n rules

This app is bilingual from the start.

### Required languages
- English
- Russian

### Rules
- all user-facing text should come from locale dictionaries or structured content files
- do not use translated strings as logic identifiers
- keep translation keys stable
- do not hardcode large English text in JSX “for now” unless marked as a temporary scaffold with a clear TODO

## Visual rules

Follow `docs/design-system.md`.

Core visual direction:
- warm neutral background
- light rounded cards
- dark emphasis used selectively
- strong typography hierarchy
- subtle borders
- desktop-first spacious layout
- product UI, not academic flatness

### Important visual rule
Do not invent a new style direction per page.
New pages must feel part of the same product system.

## Assessment flow rules

When implementing the assessment:

- progress is by block, not by question only
- answers are stored in structured config-driven format
- conditional subquestions appear inline below parent question
- answers must persist locally
- navigation must preserve entered data

Do not implement the assessment as a generic survey library UI unless it clearly matches the required architecture.

## Results page rules

When implementing the results page:

- ranking must be visible near the top
- top methodology must be clearly emphasized
- alternatives must remain visible
- 0–3 dimension scale must be preserved
- save/export controls must be in a dedicated bottom section
- export behavior should consume structured result objects

Do not hide the main ranking behind tabs or deep expansion by default.

## Methodology reference rules

When implementing the Methodologies page:

- top tabs switch methodologies
- left sidebar switches sections within the selected methodology
- “First steps” must remain high in the page
- “Core elements” supports methodology-specific internal grouping
- “Applicability” should be shown as two lists:
  - good fit when
  - weaker fit when

Do not flatten all methodologies into the same internal subsection model if their structure differs.

## Persistence rules

Use local-first persistence in early versions where appropriate.

Examples:
- assessment progress
- saved result object

Keep storage helpers in dedicated utility files.
Do not scatter localStorage logic through page components.

## Export rules

When exports are added:
- build from structured result data
- do not scrape page DOM
- do not duplicate explanation logic inside export functions

## Placeholder rules

If a route is not fully implemented yet:
- create a working placeholder page
- keep shared shell and navigation intact
- do not leave broken links

## Working style for future tasks

When given a task:
1. read the relevant docs first
2. identify the smallest correct implementation unit
3. implement only the requested scope
4. avoid speculative extra features
5. report TODOs instead of inventing undefined behavior

## What to avoid

Do not:
- rewrite the architecture casually
- collapse multiple feature layers into page files
- copy design-export CSS literally
- hardcode content in JSX when config already exists
- introduce styling inconsistent with the agreed design system
- add business logic not defined in project docs
- silently rename stable IDs used by config or schemas

## Design refinement workflow

When a design reference exists for a specific page:

- treat the relevant page spec as the behavioral contract
- treat the design reference as the visual contract
- preserve structure from the page spec
- refine layout and styling toward the design reference
- implement with reusable components

If visual reference and page spec appear to conflict:
- preserve page-spec structure first
- then apply the design reference without breaking architecture
- leave a TODO note if a decision is ambiguous

## Preferred task granularity

Prefer implementing one of these scopes at a time:

- one page
- one feature shell
- one schema integration
- one reusable component set
- one refinement pass for one page

Avoid very broad tasks like:
- “build the whole site”
- “implement everything from all docs”

## Expected output from implementation tasks

When finishing a task, summarize:
- what files were added or changed
- what routes or components were implemented
- what docs were used as source of truth
- what remains TODO
- whether any assumptions were made

## Repository evolution

This repository will gradually move from:
- static pages
to
- config-driven questionnaire
to
- structured result rendering
to
- save/restore and export features

Code added now should make those next steps easier, not harder.
