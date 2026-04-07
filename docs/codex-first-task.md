# Codex First Task

## Goal

Set up the initial frontend project for Methodology Match and implement the first two pages using the existing handoff documents.

This is the first real implementation task. It should establish the app shell, project structure, shared UI foundation, and two static pages that validate the architecture.

## Stack requirements

Use:

- Next.js
- React
- TypeScript
- Tailwind CSS
- App Router

Do not introduce heavy UI frameworks unless truly necessary.

## Project name

Use a project name such as:

- `methodology-match`
or
- `methodology-match-frontend`

## Main implementation objective

Create the initial frontend application structure and implement:

1. Home page
2. How it works page

using the existing specification files as the source of truth.

## Source-of-truth documents

Use these files as the implementation contract:

- `README.md`
- `sitemap.md`
- `design-system.md`
- `home-page-spec.md`
- `how-it-works-spec.md`
- `frontend-architecture.md`

Respect these documents over your own assumptions.

## General implementation rules

1. Keep route files thin.
2. Build reusable shared components.
3. Do not hardcode long content directly in page components.
4. Use translation dictionaries or structured content files for visible copy.
5. Follow the desktop-first visual hierarchy.
6. Accuracy is more important than creative reinterpretation.
7. Do not invent missing business logic. If something is not defined, leave a clear TODO.

## Required setup work

## 1. Initialize project

Create a new Next.js app with:

- TypeScript
- App Router
- Tailwind CSS
- `src/` directory structure if appropriate

## 2. Create base folder structure

Create the foundational folders described in `frontend-architecture.md`, at least:

```txt
src/
  app/
  components/
  config/
  locales/
  lib/
  types/
```

You do not need to fully populate every folder yet, but create the core structure.

## 3. Create app shell

Implement:

- root layout
- shared page container
- header/navigation shell
- language switch placeholder or basic locale switch structure

The shell should be reusable across future pages.

## 4. Create initial i18n structure

Create a simple but scalable localization setup for:

- English
- Russian

It is acceptable for the first implementation to use a lightweight dictionary-loading strategy instead of a full i18n framework if the structure remains clean and extensible.

At minimum, create locale files for:

- navigation
- home
- how it works

## 5. Create shared UI components

Build the first reusable components needed by both pages.

Minimum expected components:

- `PageContainer`
- `AppHeader`
- `PrimaryButton`
- `SecondaryButton`
- `SectionHeading`
- `InfoCard`
- `MethodologyPreviewCard`
- `WorkflowStepCard`
- `DimensionCard`
- `UtilityBanner`

These do not need final polish, but should already follow the visual system described in `design-system.md`.

## Page implementation scope

## A. Home page

Implement the Home page according to:

- `home-page-spec.md`

### Must include
- header
- hero section
- primary CTA
- secondary CTA
- summary card on desktop
- saved result section
- supported methodologies grid with 6 cards
- bottom utility banner

### Behavior expectations
- CTA buttons navigate to appropriate placeholder routes
- methodology cards are clickable
- saved-result section has an input and action button
- no actual result-restore logic is required yet

### Content rule
All user-facing copy should come from locale files or structured content objects.

## B. How it works page

Implement the How it works page according to:

- `how-it-works-spec.md`

### Must include
- header
- page title and intro
- 4-step workflow section
- 6 dimension cards
- rule application section
- explainability block

### Behavior expectations
- page is mostly static
- layout reflects desktop-first design
- content should be cleanly structured and reusable

### Content rule
All user-facing copy should come from locale files or structured content objects.

## Routing requirements

At minimum, create these routes:

- `/`
- `/how-it-works`
- `/assessment`
- `/methodologies`
- `/about-model`
- `/results`

The pages other than Home and How it works can initially be placeholders, but they should exist so navigation is not broken.

## Placeholder page rule

For routes not yet implemented in full, create minimal placeholder pages with:

- page title
- short “coming next” style placeholder text
- shared shell and header

Do not leave broken links.

## Styling requirements

Follow the visual direction in `design-system.md`.

Important styling rules:
- warm neutral page background
- light rounded card surfaces
- dark emphasis used selectively
- strong type hierarchy
- large card radii
- subtle borders instead of heavy shadows
- desktop-first spacing

Do not overcomplicate the styling system in the first pass.
Do not introduce one-off styles for every section.

## Technical quality requirements

## Keep components reusable
Do not build Home and How it works entirely as monolithic page files.

## Keep content separate
Avoid large hardcoded text blocks inside JSX.

## Keep page files thin
Compose pages from sections and shared components.

## Keep route navigation working
Even placeholder routes must resolve correctly.

## Keep naming readable
Use explicit component and folder names.

## Allowed simplifications for first pass

These are acceptable in the first implementation:

- locale handling can be simple
- language switch can be basic or placeholder-backed
- no real restore-by-code logic yet
- no real exports
- no questionnaire logic yet
- no final accessibility audit yet
- no final responsive polishing yet

## Not allowed in first pass

Do not:
- ignore the provided spec documents
- hardcode long copy directly into page JSX
- collapse everything into one file per page
- invent a different visual style
- skip placeholder routes
- use a completely different folder structure than the agreed architecture without strong reason

## Expected deliverables

At the end of this first task, the project should contain:

1. a running Next.js frontend app
2. shared layout and header
3. basic locale structure
4. Home page implemented
5. How it works page implemented
6. placeholder pages for the remaining top-level routes
7. reusable shared components that can support the next implementation steps

## Suggested output format for Codex

When completing the task, provide:

1. a summary of what was created
2. the folder structure
3. the main routes added
4. the reusable components added
5. any TODOs that remain before implementing assessment and results

## What comes next after this task

The next likely implementation task will be:

- assessment flow
- questionnaire config integration
- result object rendering
- Methodologies page from structured content

So the current work should make those next steps easier, not harder.
