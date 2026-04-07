# Home Page Specification

## Page ID

`home`

## Route

`/`

## Purpose

The Home page is the main entry point to the product.

It must do four things clearly:

1. explain what the product is in one screen
2. direct the user into the assessment
3. provide access to a saved result by code
4. expose the supporting informational sections without distracting from the main action

This page should feel like a product homepage, not a marketing landing page and not an academic portal.

## Primary user intent

The main user intent on this page is:

- start the assessment

All other actions are secondary.

## Secondary user intents

Secondary intents are:

- understand how the system works
- open a previously saved result
- browse supported methodologies
- open About model from header

## Main CTA

**Primary CTA:** Start assessment

This should be the visually strongest button on the page.

## Secondary CTA

**Secondary CTA:** Learn how it works

This should be clearly visible, but visually weaker than the primary CTA.

## Content order

The page should follow this order from top to bottom:

1. Header
2. Hero section
3. Saved result section
4. Supported methodologies section
5. Bottom utility banner or final orientation section

This order is already aligned with the current design direction and should not be rearranged unless there is a strong product reason.

## Section-by-section specification

## 1. Header

### Purpose
Global navigation and language switching.

### Contains
- logo / product name
- navigation links
- language switch

### Navigation links
- Methodologies
- How it works
- About model

### Behavior
- clicking the logo returns to Home
- language switch is always available
- links should be normal page navigation, not modal behavior

### Visual notes
- rounded light container
- aligned with main page container width
- compact but prominent
- should not visually overpower the hero

## 2. Hero section

### Purpose
Explain the product in one clear value statement and move the user toward the assessment.

### Required content
- large title
- short supporting description
- primary CTA
- secondary CTA
- right-side summary card on desktop

### Hero title intent
The title should communicate methodology selection, not generic project management.

### Hero description intent
The supporting text should communicate:
- project-context-based selection
- ranked recommendation
- explanation of the result
- next steps after selection

The copy should not be too long.
Maximum target: about two concise lines of description on desktop.

### Hero CTAs
- Start assessment
- Learn how it works

### Right-side summary card
This card should act as a compact reinforcement block.

#### Suggested content
- “6 methodologies”
- short list or short descriptor of supported methods
- small emphasis pills such as:
  - Explainable ranking
  - Actionable next steps

### Layout notes
Desktop layout should be two-column:
- left: hero copy and CTAs
- right: summary card

### Spacing notes
- hero should have strong top-level visual priority
- there should be enough space between title, description, and CTA row
- CTA row should not sit too close to the body text

## 3. Saved result section

### Purpose
Support returning users without forcing them back through the questionnaire.

### Required content
- section title
- short explanatory text
- one input field
- one action button

### Section title
Suggested intent:
- Open a saved result

### Supporting text intent
Explain that a previously copied result code can reopen an earlier recommendation.

### Controls
- input placeholder: result code
- button: Open result

### Behavior
- user enters a code
- clicking the button navigates to the result page
- validation behavior can initially be stubbed / mocked if backend logic is not implemented yet

### Layout notes
- input and button should align on one row on desktop
- button should be visually strong, but still secondary to the hero CTA
- this section should feel practical and calm, not promotional

### Implementation note
This block should later support:
- validation messages
- disabled state
- restore-by-code logic
without redesigning the layout

## 4. Supported methodologies section

### Purpose
Preview the six supported methodologies and signal that the system covers a structured range of process types.

### Required content
- section title
- short supporting description
- six methodology preview cards

### Section title intent
- Supported methodologies

### Supporting description intent
Explain that the tool compares six approaches spanning plan-driven, iterative, regulated, risk-driven, and flow-based contexts.

### Card count
Exactly 6 cards:
1. Waterfall
2. Spiral
3. GOST 34
4. RUP
5. Scrum
6. Kanban

### Card content
Each card should contain:
- methodology title
- one short descriptor or two-line summary
- optional directional cue indicating clickability

### Card interaction
Cards should be clickable and navigate to the Methodologies reference page.

The first implementation may route all cards to the shared methodology page, with later enhancement for:
- tab preselection
- anchor or query state for the selected methodology

### Visual notes
- cards should be visually consistent
- cards should feel like reference entry points, not marketing tiles
- do not overload cards with too much copy
- subtle arrow or directional icon is enough to signal clickability

### Grid behavior
On desktop, use a 3-by-2 grid.

## 5. Bottom utility banner

### Purpose
Provide final orientation and reinforce the intended usage flow.

### Required content
- one short strong sentence
- one supporting sentence

### Content intent
This block should reinforce the preferred user journey:
- start with assessment
- read the ranked result
- open explanation or methodology guidance if needed

### Visual notes
- dark emphasis surface is appropriate here
- should feel like a final orientation banner, not a second hero section
- keep it shorter and lighter than the hero in semantic weight

### Warning
Do not let this block overpower the methodology cards above it.

If visual balance becomes an issue, reduce:
- height
- body text size
- padding
before changing the overall structure

## Layout behavior

## Desktop
Primary reference layout.

Expected structure:
- large hero with two columns
- full-width saved result section
- methodology card grid
- bottom orientation banner

## Tablet / smaller desktop
Should still preserve:
- hero hierarchy
- clear CTA order
- saved result usability
- methodology card readability

## Mobile
Mobile behavior can be implemented later, but the page should not be built in a way that blocks responsive adaptation.

## Components required

The page should preferably be assembled from reusable components.

Suggested components:
- `Header`
- `PageContainer`
- `HeroSection`
- `PrimaryButton`
- `SecondaryButton`
- `InfoCard`
- `SectionHeading`
- `ResultCodeInput`
- `MethodologyPreviewCard`
- `UtilityBanner`

## State and logic

## Required immediate logic
- CTA navigation
- basic input capture for saved result code
- card click navigation
- language switch integration

## Deferred logic allowed
These can be stubbed initially:
- actual result code validation
- real restore-by-code behavior
- preselected methodology state on reference page

## Copy and i18n

All text must come from translation dictionaries.

No user-facing text should be hardcoded inside React components except temporary scaffolding that is clearly marked and removed later.

Suggested i18n groups:
- `home.hero`
- `home.savedResult`
- `home.methodologies`
- `home.banner`
- `nav`

## Accessibility notes

- primary and secondary CTAs must have clear labels
- clickable cards must be keyboard accessible
- input must have label or accessible name
- contrast must remain readable on dark banner
- language switch must be operable by keyboard

## Visual priority rules

The page must visually communicate this order of importance:

1. Start assessment
2. Understand what the product does
3. Open saved result
4. Browse methodologies
5. Explore informational sections

If the page starts treating all actions equally, the hierarchy is wrong.

## Common implementation mistakes to avoid

Do not:
- give equal button weight to primary and secondary CTAs
- make the methodology cards too text-heavy
- let the bottom banner compete with the hero
- place saved-result input above the hero
- turn the page into a dense documentation index
- hardcode methodology card text directly in component files

## Definition of done for first implementation

The Home page is considered ready for the first pass when:

- layout matches the approved information hierarchy
- hero communicates the value proposition clearly
- Start assessment is the strongest action
- saved result section is usable and visually stable
- six methodology cards are present and clickable
- the page uses shared design-system components
- all copy comes from i18n dictionaries or structured content sources
