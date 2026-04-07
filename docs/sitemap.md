# Sitemap and Navigation Map

## Goal

This document defines the page structure of Methodology Match, the purpose of each page, and the main navigation paths between them.

The structure should support three user intentions:

1. start the methodology assessment
2. understand how the recommendation is produced
3. review a methodology after receiving a result

## Primary pages

### 1. Home
**Purpose:** main entry point to the product

**Main actions:**
- start assessment
- open “How it works”
- open methodology reference
- open saved result by code

**Primary CTA:**
- Start assessment

**Secondary actions:**
- Learn how it works
- Open result by code
- Navigate through header links

---

### 2. Assessment Intro
**Purpose:** explain what the assessment does before the user starts answering questions

**Main actions:**
- start assessment flow
- return to home

**Primary CTA:**
- Start assessment

**Key content:**
- short explanation of what the tool does
- expected duration
- number of blocks
- note about autosave / saved progress
- note about result code / later reopening

---

### 3. Assessment Block
**Purpose:** collect questionnaire answers block by block

**Structure notes:**
- progress is shown by block, not by individual question
- one block contains multiple questions
- conditional subquestions may appear below a main answer
- answers are saved locally

**Main actions:**
- answer questions
- move to next block
- move to previous block

**Primary CTA:**
- Next block
or
- Finish assessment on the final block

**Important behavior:**
- preserve answers on refresh
- preserve answers after browser close if local state is available

---

### 4. Results
**Purpose:** present the ranked recommendation and explanation

**Main actions:**
- review top recommendation
- review alternative methodologies
- open methodology reference
- open next steps
- copy result code
- download PDF
- download JSON

**Primary CTA:**
- open methodology details / next steps for the top recommendation

**Key content:**
- ranked list of all six methodologies
- best-fit methodology card
- explanation of strongest signals
- alternative methodologies
- save results section

---

### 5. How it works
**Purpose:** explain the recommendation workflow in a compact, transparent way

**Main actions:**
- understand questionnaire -> dimensions -> ranking -> explanation flow
- review six decision dimensions
- understand methodology mapping logic at a high level

**Primary CTA:**
- optional return to assessment or home
- no heavy transactional CTA required

**Key content:**
- process overview
- six decision dimensions
- high-level mapping rules
- explanation / transparency logic

---

### 6. Methodologies
**Purpose:** provide a structured reference for supported methodologies

**Navigation model:**
- top tabs switch between methodologies
- left sidebar switches between sections inside the selected methodology

**Main actions:**
- switch methodology
- open section inside methodology
- read first steps
- review applicability and common mistakes

**Primary CTA:**
- no single global CTA
- this page acts as a reference layer

**Key content:**
- overview
- first steps
- core elements
- team / organisational needs
- common mistakes
- applicability
- not covered here
- study next

---

### 7. About model
**Purpose:** explain the conceptual basis and limitations of the recommendation model

**Main actions:**
- understand what the model is based on
- understand that output is decision support, not automatic truth
- review model scope and limitations

**Primary CTA:**
- optional link to assessment
- optional link to “How it works”

**Key content:**
- model purpose
- six aggregated dimensions
- ranked output logic
- explanation layer
- limitations and scope

## Header navigation

The header is visible across the site and should provide direct access to:

- Methodologies
- How it works
- About model
- Language switch

The logo / product name should return the user to Home.

## Main user flows

### Flow A: first-time user
Home
-> Assessment Intro
-> Assessment Block(s)
-> Results
-> Methodology Reference

### Flow B: user wants explanation before starting
Home
-> How it works
-> Assessment Intro
-> Assessment Block(s)
-> Results

### Flow C: user returns later with saved code
Home
-> Open saved result by code
-> Results
-> Methodology Reference

### Flow D: user browses without taking the test
Home
-> Methodologies
or
Home
-> About model
or
Home
-> How it works

## Page relationships

### Home links to:
- Assessment Intro
- How it works
- Methodologies
- Results (through saved result code)
- About model (through header)

### Assessment Intro links to:
- Assessment Block
- Home

### Assessment Block links to:
- previous Assessment Block
- next Assessment Block
- Results on completion

### Results links to:
- Methodologies
- specific methodology section
- save/export actions

### How it works links to:
- Home
- Assessment Intro
- Methodologies
- About model

### Methodologies links to:
- Home
- How it works
- About model
- internal methodology tabs and side sections

### About model links to:
- Home
- How it works
- Assessment Intro
- Methodologies

## Priority of pages

### Core functional pages
These pages are essential to the product workflow:
- Home
- Assessment Intro
- Assessment Block
- Results

### Trust and explanation pages
These pages support confidence and interpretation:
- How it works
- About model

### Reference page
This page supports post-result learning and implementation:
- Methodologies

## Routing suggestion

A possible route structure:

- /
- /assessment
- /assessment/block/[blockId]
- /results
- /how-it-works
- /methodologies
- /about-model

If saved results later require direct linking, possible route extension:

- /results/[resultCode]

## Notes for implementation

- The site should support direct navigation from header without breaking local assessment state.
- Results should be reachable both after completing the assessment and after restoring a saved result.
- Methodology pages should not require six completely separate route files if the content can be handled through shared templates and configuration.
- Navigation labels must come from translation dictionaries.
