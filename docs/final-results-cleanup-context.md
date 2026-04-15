# Final Results Cleanup Context

## Purpose

This document provides the minimum necessary context for the next Codex task.

The SDLC selection model is now in a relatively stable state at the level of:
- main ranking logic,
- role-based interpretation,
- false-composite suppression in obvious flow-heavy cases,
- and top-1 selection in the core stress cases.

The next step is **not** to redesign the model again.

The next step is to clean up the remaining inconsistency between:
- ranking,
- recommendation mode,
- badges,
- strongest-area ownership,
- and lower-fit explanation wording.

---

## Current model status

### Stable enough
The following areas are now considered sufficiently stable for this iteration:
- main ranking logic for classic Scrum cases
- main ranking logic for pure Kanban cases
- reduced governance over-dominance
- improved Spiral over Scrum behavior in high-risk composite cases
- removal of most false composite readings in flow-heavy cases

### Still under refinement
The following areas are still inconsistent and must be refined:
- recommendation mode label consistency
- composite-aware badge wording
- ownership of `Iteration Structure = 3` in the explanation layer
- overly strong lower-fit outcome texts
- alternative-card signal leakage
- explanation strength for RUP and GOST in composite cases

---

## Core diagnosis

The current issue is no longer primarily:
- selecting the wrong top methodology

The current issue is now primarily:
- explanation-layer leakage
- UI wording inconsistency
- and over-strong alternative messaging

In other words:
- the model often picks the correct winner,
- but the results page does not always read coherently with the internal interpretation logic.

---

# Case summary

## Case A — Complex regulated / high-risk / high-complexity case (IoMT-like)

### Current result
1. Spiral
2. RUP
3. Scrum
4. GOST 34
5. Kanban
6. Waterfall

### What is now correct
- Spiral above Scrum is correct
- RUP second is correct
- GOST 34 no longer wrongly dominates
- the case is correctly treated as not a simple single-fit case

### What is still wrong
- UI header still says `Primary recommendation`
- interpretation text says composite
- top-1 card still uses single-fit wording
- RUP is under-described as a complement
- governance is under-explained as an environmental constraint

### Required reading of the case
- Spiral → dominant risk-driven development role
- RUP → critical architecture and integration-control complement
- GOST 34 → governance / compliance environment constraint
- Scrum → weaker adaptive delivery alternative

---

## Case B — Flow-heavy SaaS / continuous-delivery case

### Current result
1. Kanban
2. Scrum
3. Spiral
4. RUP
5. GOST 34
6. Waterfall

### What is now correct
- Kanban first is correct
- single-fit mode is correct
- Scrum second as a weaker alternative is acceptable
- false composite is no longer triggered

### What is still wrong
- Scrum still inherits too much from `Iteration Structure = 3`
- Spiral still inherits too much from `Iteration Structure = 3`
- lower-fit outcomes still sound too strong

---

## Case C — Pure support / operations / pure Kanban case

### Current result
1. Kanban
2. Scrum
3. Spiral
4. RUP
5. GOST 34
6. Waterfall

### What is now correct
- single-fit Kanban is correct
- false composite is gone
- Scrum is only a secondary alternative

### What is still wrong
- Scrum still receives a strongest-area feel from `Iteration Structure = 3`
- Spiral still receives a strongest-area feel from `Iteration Structure = 3`
- lower-fit text remains too generic and too forceful

---

## Case D — Classic Scrum case

### Current result
1. Scrum
2. Kanban
3. RUP
4. Spiral
5. GOST 34
6. Waterfall

### What is now correct
- Scrum first is correct
- single-fit mode is correct
- Kanban second is correct
- no false composite appears

### What is still slightly wrong
- canonical Scrum scenarios still sometimes use a weaker-than-ideal control interpretation
- lower-fit outcome texts for Kanban and RUP are still too strong

---

# Required cleanup priorities

## Priority 1 — Recommendation mode labels must be consistent
Never mix:
- `Primary recommendation`
with
- composite explanatory text

### Required behavior
- for single-fit cases: `Primary recommendation`
- for composite cases: `Composite strategy case` or equivalent composite-aware heading

---

## Priority 2 — Composite-aware badges
In composite cases, top-1 must not use pure single-fit badge language.

### Replace labels like
- `Primary recommendation`

### With composite-aware options such as
- `Dominant process driver`
- `Lead methodology in composite case`
- `Lead role match`

---

## Priority 3 — Flow exclusivity in explanation layer
`Iteration Structure = 3` means:
- continuous flow
- pull
- WIP control
- on-demand delivery

It must strengthen:
- Kanban

It must **not** strengthen by default:
- Scrum
- Spiral

---

## Priority 4 — Lower-fit outcomes must be softened
Lower-fit cards should stop sounding like direct instructions.

### Avoid
- `Use ...`
- `Adopt ...`

### Prefer
- `Consider ... if ...`
- `This fit strengthens when ...`
- `A risk-driven approach becomes more relevant when ...`

---

## Priority 5 — Alternative explanations must remain role-specific
Alternative cards must explain:
- why this method is lower here
- why it is not the dominant fit
- which exact role it would cover if the context changed

Do not use generic methodology summaries as lower-fit explanation text.

---

## Priority 6 — Governance must remain visible in regulated composite cases
When governance is strong:
- it does not have to dominate the ranking
- but it must stay visible in explanation

In regulated composite cases, GOST 34 may be described as:
- governance / compliance environment constraint
even when it is not top-1.

---

# What not to do

- do not redesign the whole ranking model
- do not add new recommendation modes
- do not reintroduce pair-specific composite hacks
- do not make lower-fit alternatives sound as strong as the winner
- do not break already-correct Scrum and Kanban single-fit cases

---

# Desired outcome of the next task

After the next cleanup pass:
- the winner should remain correct
- the recommendation mode should read consistently
- composite cases should look composite in both header and badges
- flow cases should no longer leak flow ownership into Scrum and Spiral explanations
- lower-fit cards should sound weaker and conditional
- the results page should read as coherently as the internal model now behaves
