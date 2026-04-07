# Methodology Match

Methodology Match is a web-based decision-support system for selecting an appropriate software development methodology based on structured project context.

The product is being designed as part of a bachelor thesis focused on organizing the choice of a software development methodology depending on project characteristics and the object of informatization. The system does not try to predict project success statistically. Instead, it uses an explainable rule-based model that maps project signals to a ranked list of methodologies.

## Purpose

Teams often choose a development methodology because of habit, familiarity, or organizational precedent. This project aims to support a more structured choice.

The system helps a user:

- assess project context through a short structured questionnaire
- receive a ranked list of suitable methodologies
- understand why the top recommendation fits
- compare close alternatives
- review first steps for applying the selected methodology

## Supported methodologies

The current version of the model supports six methodologies:

1. Waterfall
2. Spiral
3. GOST 34
4. RUP
5. Scrum
6. Kanban

These six approaches were selected to cover plan-driven, risk-driven, iterative, regulated, and flow-based delivery contexts.

## Core product flow

The main user flow is:

1. Open the home page
2. Start the assessment
3. Complete the questionnaire block by block
4. Receive a ranked result with explanation
5. Open the methodology reference page for deeper guidance
6. Save the result code or export the result

Secondary flows include:

- opening a previously saved result from the home page
- reading the methodology reference without taking the assessment
- opening the “How it works” and “About model” pages from navigation

## Decision model

The recommendation engine is based on a hierarchical rule-based model.

### Questionnaire layer

The user answers structured questions grouped into six blocks.

### Aggregated dimensions

Answers are transformed into six decision dimensions on an ordinal 0–3 scale:

1. Governance Formalisation
2. Requirements Stability
3. Risk & Innovation Orientation
4. Iteration Structure
5. Organisational Discipline
6. System & Integration Complexity

### Mapping layer

The system maps dimension profiles to methodology fit using explicit rules.

High-level mapping principles include:

- strict regulatory governance -> GOST 34
- stable requirements + linear structure -> Waterfall
- risk-driven iteration -> Spiral
- architecture + disciplined iteration -> RUP
- timeboxed adaptive cycles -> Scrum
- continuous flow + WIP limits -> Kanban

### Output layer

The system returns:

- a ranked list of methodologies
- a highlighted top recommendation
- explanation of the strongest decision signals
- close alternatives and trade-offs
- next-step guidance for the selected methodology

## Product principles

The product is being designed around the following principles:

- explainable recommendations instead of black-box output
- ranked results instead of one binary answer
- practical guidance after selection, not just classification
- lightweight questionnaire flow
- desktop-first interface
- bilingual support from the start
- reusable content structure for all methodology reference pages

## Current page set

The current design scope includes these pages:

- Home
- Assessment Intro
- Assessment Block
- Results
- How it works
- Methodologies
- About model

## Design direction

The current interface direction is:

- desktop-first
- clean modern UI
- soft neutral background
- dark accent elements
- rounded cards and controls
- inline explanations and compact reference blocks
- always-available language switch in the header

## Internationalization

All user-facing text should be stored in translation dictionaries and not hardcoded inside components.

Planned languages:

- English
- Russian

## Technical goals

The frontend should be built so that:

- pages are component-based and reusable
- content structure is separated from UI logic where possible
- methodology reference pages follow a shared template
- questionnaire state can be saved locally
- results can be reopened from a saved result code
- export formats can be added without redesigning the page structure

## Project status

At the current stage, the product has:

- a stable high-level information architecture
- key page layouts designed
- a methodology reference pattern defined
- a rule-based recommendation concept defined
- a clear next step toward implementation handoff

## Repository goals

This repository should eventually contain:

- frontend application code
- shared UI components
- page specifications
- design handoff documents
- questionnaire configuration
- methodology content configuration
- ranking logic implementation
- export utilities
- localization files

## Suggested development order

A practical implementation order is:

1. project foundation and layout
2. shared design system components
3. static informational pages
4. assessment flow UI
5. result page UI
6. questionnaire state handling
7. recommendation engine integration
8. result save/restore and export features

## Notes

This project is not intended to prescribe one universally best methodology. Its purpose is to provide structured, transparent, context-sensitive guidance.

The final recommendation should always be interpreted as decision support, not as an automatic replacement for expert judgement.
