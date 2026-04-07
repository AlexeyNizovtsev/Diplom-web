# Design System Specification

## Goal

This document defines the baseline visual system for Methodology Match so that implementation stays consistent across pages and components.

The goal is not pixel-perfect design token engineering yet. The goal is to provide enough structure for reliable frontend implementation without visual drift.

## Design direction

The interface should feel:

- modern
- clean
- structured
- calm
- analytical, but not cold
- product-oriented rather than academic

The design should avoid:

- flat, lifeless admin-panel aesthetics
- overly playful startup visuals
- harsh contrast overload
- dense enterprise dashboard clutter
- decorative effects that do not support hierarchy

## Layout principles

### Desktop-first
The current design direction is desktop-first.

The primary reference layout assumes a large desktop canvas. Mobile responsiveness should be supported later, but desktop is the main design truth during the first implementation phase.

### Spatial character
The layout should feel spacious, but not empty.

Use:
- clear section separation
- large card radii
- readable spacing between sections
- strong top-level hierarchy
- compact inner grouping where information belongs together

### Containers
Use a centered main content area with generous side margins on desktop.

General principle:
- pages should not stretch content edge-to-edge
- cards should be visually grouped inside a stable page container
- header width should align with the main page grid

## Visual language

### Base mood
Use a soft neutral background with darker primary surfaces and warm accent tones.

This helps the product feel:
- serious enough for decision support
- softer than a typical enterprise tool
- readable during long sessions

### Primary surface behavior
There are three main visual layers:

1. **page background**
2. **light cards / panels**
3. **dark emphasis elements**

Dark emphasis should be used selectively for:
- active tabs
- strong CTAs
- best-fit markers
- emphasis banners
- highlighted applicability blocks

Do not use dark panels everywhere. They should remain meaningful.

## Color roles

These are semantic roles, not final hardcoded hex requirements. Exact values may be adjusted during implementation if the visual feel remains consistent.

### 1. Page background
Soft warm neutral.

Used for:
- overall app background

Desired feel:
- calm
- low glare
- not pure white

### 2. Primary card background
Very light neutral.

Used for:
- standard cards
- panels
- header container
- section surfaces

### 3. Secondary card background
Slightly darker warm neutral.

Used for:
- grouped subareas
- process strips
- quick-fit notes
- first-step diagram background
- low-emphasis grouping surfaces

### 4. Primary text
Very dark neutral, near-black.

Used for:
- headings
- important labels
- active tab text on light surfaces

### 5. Secondary text
Muted cool or neutral gray.

Used for:
- explanations
- descriptive body text
- helper text
- supporting labels

### 6. Accent
Warm amber / orange family.

Used for:
- small labels
- process step labels
- arrows in workflow diagrams
- highlighted micro-emphasis

Accent is not the main CTA fill color by default. It is a signal color.

### 7. Dark emphasis surface
Very dark neutral.

Used for:
- primary CTA buttons
- active pill tabs
- best-fit badges
- strong banners
- highlighted result sections

### 8. Light-on-dark text
Soft off-white, not pure white.

Used on:
- dark buttons
- dark cards
- dark applicability / highlight sections

### 9. Border color
Soft light neutral-gray border.

Used for:
- card outlines
- secondary buttons
- inactive pills
- grouped sections

Borders should stay subtle.

## Suggested token naming

Implementation can use names like:

- `bg-page`
- `bg-card`
- `bg-card-secondary`
- `bg-dark`
- `text-primary`
- `text-secondary`
- `text-on-dark`
- `border-subtle`
- `accent-primary`

Do not hardcode visual meaning into page components if a token can express it centrally.

## Typography

### General principle
Typography should be clean, modern, and highly readable.

A sans-serif family similar to Inter works well.

### Type hierarchy
The UI should use a clear hierarchy with a limited number of text styles.

Recommended tiers:

#### Display
Used for:
- hero titles
- top-level page titles

Character:
- large
- bold
- strong visual anchor

#### H1
Used for:
- main page section titles on internal pages

#### H2
Used for:
- major section headings inside pages

#### H3
Used for:
- card titles
- methodology titles
- sub-block titles

#### Body Large
Used for:
- important explanatory text
- overview paragraphs
- intro copy

#### Body
Used for:
- standard descriptions
- list items
- explanatory content

#### Small / Label
Used for:
- eyebrow labels
- chips
- status text
- metadata
- process step labels

### Weight usage
Use boldness to express hierarchy, but do not use too many weights.

Recommended pattern:
- 800 for display emphasis
- 700 for strong headings and active labels
- 600 for tab labels / medium emphasis
- 500 for body-support text
- 400 only if truly needed

### Readability rules
- avoid long line lengths on explanatory text
- prefer 2–4 line chunks over long dense paragraphs
- keep helper text visibly lighter than titles
- maintain generous line-height for body copy

## Border radius

Rounded corners are an important part of the visual style.

Suggested radius scale:

- small radius for pills, chips, small badges
- medium radius for buttons and compact controls
- large radius for cards
- extra-large radius for major panels or grouped blocks

General feel:
- modern and soft
- not sharp
- not cartoonishly round

## Shadows and borders

### Borders first
The current system relies more on subtle borders than heavy shadows.

Use:
- soft borders on most cards
- minimal shadowing
- shadow only where a real elevation cue is helpful

### Shadow usage
If used, shadows should be:
- soft
- diffused
- subtle
- never glossy or dramatic

## Components

## Header

### Purpose
Persistent top navigation across the product.

### Contains
- product mark / name
- navigation links
- language switch

### Behavior
- logo returns to Home
- navigation links go to major informational pages
- language switch is always accessible

### Visual rules
- rounded container
- light panel background
- subtle border
- compact but prominent
- should visually align with page container

## Buttons

There should be at least three button types.

### 1. Primary button
Used for:
- Start assessment
- Open result
- strongest CTA on page

Style:
- dark fill
- light text
- medium-large radius
- high contrast
- strong visual priority

### 2. Secondary button
Used for:
- informational navigation actions
- secondary next-step actions

Style:
- light surface
- border
- dark text

### 3. Utility action
Used for:
- export actions
- copy code
- supporting controls

Style:
- can be lighter and smaller than primary/secondary buttons
- should still match card/button radius language

## Pills / tabs / chips

### Pills
Used for:
- methodology tabs
- section tabs
- compact state switching
- active/inactive selections

Active state:
- dark background
- light text

Inactive state:
- light background
- subtle border
- dark text

### Chips
Used for:
- key traits
- quick-fit signals
- metadata fragments
- tag-like descriptors

Chips should remain compact and scannable.

## Cards

Cards are the core structural unit of the interface.

### Standard card
Used for:
- methodology preview blocks
- explanation cards
- content blocks
- questionnaire groups

### Highlight card
Used for:
- best fit recommendation
- first-step diagram block
- quick-fit note
- strong grouped content block

### Card rules
- rounded
- bordered
- generous internal padding
- strong title / body hierarchy
- avoid overcrowding
- one clear information purpose per card

## Sidebar navigation

Used on methodology reference pages.

### Purpose
Switch between major content blocks inside the selected methodology.

### Style
- stacked rounded items
- active item filled dark
- inactive items light with border
- stable spacing between items

### Rule
Nested subsection tabs such as Roles / Events / Artifacts should remain inside the main content area, not become full top-level sidebar items unless clearly necessary.

## Progress indicators

Used in assessment flow.

### Progress bar
Should indicate movement by block, not by individual question.

### Visual style
- clean horizontal bar
- subtle background track
- darker or accented active progress segment

Optional supporting text:
- Block X of 6

## Diagram blocks

Used for:
- first steps
- process explanation
- workflow strips

### Rules
- should be visually scannable left-to-right
- arrows should be clear but not oversized
- step cards should have consistent size and rhythm
- final step may be highlighted if the flow is cyclical or outcome-defining

## Explanation blocks

Because the product is an explainable DSS, explanation content needs a consistent visual treatment.

### Explanation content should appear as:
- ranked reasoning
- dimension-based explanation
- applicability notes
- practical notes
- trade-off hints

### Good explanation UI characteristics
- concise
- grouped
- clearly labeled
- easy to scan after reading a recommendation
- not buried in long paragraphs

This aligns with the project’s explainability layer and trust-oriented design goals.

## Page-specific style notes

## Home
Should feel welcoming but serious.
Primary goal: start the assessment.

Use:
- strong hero title
- one primary CTA
- one or two secondary actions
- compact methodology previews
- clear saved-result entry block

## Assessment Intro
Should feel simple and reassuring.

Use:
- short explanation
- duration and format indicators
- one main CTA
- minimal clutter

## Assessment Block
Should feel focused and task-oriented.

Use:
- progress by block
- clear question grouping
- strong selected-state feedback
- calm navigation controls

## Results
Should feel analytical, but rewarding.

Use:
- visible ranked list
- strong best-fit emphasis
- expandable depth
- compact explanation blocks
- visible save/export area

## How it works
Should feel transparent and structured.

Use:
- process strip
- dimension cards
- mapping logic summary
- explanation logic notes

## Methodologies
Should feel like a reference system, not a blog page.

Use:
- top methodology tabs
- left section navigation
- content grouped into practical blocks
- compact reference tabs inside core elements
- visual first steps where useful

## About model
Should feel trustworthy and explicit.

Use:
- model scope
- dimension logic
- limitations
- explainability framing
- no excessive academic density

## Interaction guidelines

### Hover / active states
Interactive elements should show a clear but calm state change.

Use:
- mild background shift
- slightly stronger border
- text contrast shift
- avoid flashy animation

### Focus states
All interactive elements should have accessible keyboard focus styles.

### Motion
Keep motion minimal.
Use only where it improves orientation:
- subtle tab switching
- light hover transitions
- no decorative animation noise

## Accessibility notes

Even though the current design is visually stylized, implementation should preserve:

- readable contrast
- clear text hierarchy
- keyboard navigation
- visible focus states
- non-color-only selected states

## Content/UI separation note

Where possible:
- keep copy in dictionaries or content files
- keep shared visual logic in reusable components
- keep per-methodology content in structured data
- keep page layout separate from content configuration

This is essential for bilingual support and for scaling methodology reference pages without rebuilding the UI.

## Implementation recommendation

Build a shared component layer before building full pages.

Suggested base components:
- `PageContainer`
- `Header`
- `SectionHeading`
- `PrimaryButton`
- `SecondaryButton`
- `Card`
- `PillTab`
- `Chip`
- `SidebarNav`
- `ProgressBar`
- `WorkflowStepCard`
- `HighlightBanner`
- `ExportActionGroup`

## Do not do this

Avoid these implementation mistakes:

- hardcoded text inside reusable layout components
- page-specific colors directly inside page files
- separate bespoke button styles for every page
- overly detailed shadow systems
- absolute-positioned layout imitation from design tools where flexible layout is enough
- using one-off components where a shared pattern already exists

## Status

This document is intentionally practical and not yet a final token contract.

It should be enough to guide initial frontend implementation and keep the visual system coherent while more detailed tokenization is added later.
