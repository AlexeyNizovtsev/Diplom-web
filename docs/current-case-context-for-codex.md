# Current Case Context for Codex — Final Controlled Refinement

## Purpose

This file provides the current validated context for the next Codex task.

The SDLC selection model is no longer in a state of broad structural instability.
It now behaves as a usable rule-based decision-support prototype.

The next task must therefore focus on controlled refinement rather than redesign.

---

## Current high-level state

### What is already stable enough
The following parts are now considered stable enough and should not be broadly reworked:

- pure GOST wins
- pure Waterfall wins
- pure Scrum wins
- pure Kanban wins
- false composite in simple flow-heavy cases is mostly removed
- governance no longer automatically forces GOST 34 to top-1 in every heavy case
- Spiral remains visible in risk-heavy cases
- methodology roles are now meaningfully differentiated

### What still remains critical
Only a small number of issues remain truly important before freezing the model logic:

1. Flow exclusivity
2. Composite-mode wording consistency
3. Critical complement must not look like lower fit
4. Heavy-case recalibration for Scrum vs RUP vs Spiral

Everything else is now secondary polish.

---

# Validated case summary

## Case group A — Pure methodology wins now work

### Pure GOST case
Observed:
- GOST 34 first
- Waterfall second
- single-fit interpretation

Meaning:
- governance-heavy logic still works
- GOST was not broken by earlier anti-overweight adjustments

### Pure Waterfall case
Observed:
- Waterfall first
- GOST and RUP below
- single-fit interpretation

Meaning:
- Waterfall is now distinguishable from GOST
- stable linear execution is now recognized as its own pattern

### Classic Scrum case
Observed:
- Scrum first
- Kanban second
- single-fit interpretation

Meaning:
- sprint cadence, backlog discipline, and structured iteration rhythm are being recognized correctly

### Kanban case
Observed:
- Kanban first
- Scrum second
- single-fit interpretation

Meaning:
- incoming flow, WIP logic, pull-based work control, and on-demand delivery are being recognized correctly

---

## Case group B — Composite logic works better, but still needs care

### Complex regulated and high-risk case
Observed:
- Spiral and RUP rise to the top
- GOST remains relevant but no longer automatically dominates
- composite interpretation appears

Meaning:
- major improvement over the old governance-dominance behavior
- governance is now closer to an environmental constraint when appropriate

Remaining issue:
- UI wording still sometimes lags behind the actual composite reading

### Enterprise modernization boundary case
Observed:
- Scrum leads
- RUP is treated as critical complement
- GOST remains supporting

Meaning:
- composite mode is appropriate

Remaining issue:
- Scrum can still look too confidently dominant even when architecture and integration complexity are extremely high
- RUP is sometimes visually downplayed despite being strategically essential

### RUP vs Spiral heavy boundary case
Observed:
- Scrum may still appear first too easily
- RUP and Spiral remain visible but still secondary

Meaning:
- this is still one of the hardest unresolved areas
- the model now knows the case is composite, but not always which heavy role should lead

---

# Critical remaining issues

## Critical issue 1 — Flow signal exclusivity

### Problem
Iteration Structure = 3 still leaks into alternative methodology cards more than it should.

### Intended meaning
- Iteration = 2 -> structured iterations, cadence, sprint rhythm
- Iteration = 3 -> continuous flow, pull logic, WIP control, on-demand delivery

These are not interchangeable.

### Required rule
- Iteration = 3 must strengthen Kanban only
- Iteration = 2 must strengthen Scrum
- Iteration = 2 may partially strengthen RUP
- Iteration = 3 must not automatically strengthen Scrum or Spiral

### Why this matters
Without this, the model may slide back into:
- Scrum being too strong in flow-heavy cases
- Spiral receiving false support from flow
- explanation cards borrowing the leader’s signal instead of expressing their own role

---

## Critical issue 2 — Composite-mode wording consistency

### Problem
Some composite results still use wording inherited from single-fit mode.

Examples:
- header says Primary recommendation
- body says This is a composite case

### Required rule
Separate mode language cleanly:

#### Single-fit
- Primary recommendation

#### Composite
- Composite strategy case
- or Composite recommendation

Do not mix single-fit labels with composite interpretation text.

---

## Critical issue 3 — Critical complement must not look like lower fit

### Problem
In composite cases, a methodology may be described as a critical complement
but visually appear like a weak lower-fit alternative.

### Required rule
Introduce composite-aware rank labels or visual categories such as:
- Lead role match
- Critical complement
- Supporting alternative

In composite cases, the second methodology should not be visually degraded if it is explicitly described as structurally important.

---

## Critical issue 4 — Heavy-case recalibration for Scrum vs RUP vs Spiral

### Problem
In very heavy cases with:
- very high complexity
- extensive integrations
- high risk
- significant experimentation or uncertainty
- structured iterations
- adequate discipline

Scrum can still become top-1 too easily.

### Required direction
Reduce Scrum priority when all or most of the following are present:
- Risk is high
- Complexity is very high
- experimentation or technical uncertainty is strong
- organisational discipline is sufficient to sustain heavier process control

Increase RUP priority when:
- complexity is very high
- integrations are extensive
- discipline is established

Increase Spiral priority when:
- uncertainty is high
- consequences of failure are critical
- prototyping or experimentation matters meaningfully

---

# Methodology-specific guidance

## GOST 34
Keep:
- governance and compliance layer
- may remain supporting in composite cases

Avoid:
- governance alone automatically overriding architecture or risk-heavy execution needs

## Waterfall
Keep:
- wins in pure linear and stable cases
- distinguishable from GOST

Possible minor improvement:
- in predictable governance-shaped boundary cases without strong architecture pressure,
  GOST may need to rank above RUP more reliably

## RUP
Keep:
- appears near the top when architecture and integration complexity are real
- can function as a critical complement

Refine:
- should be visually downplayed less in composite cases
- should outrank Scrum more often in some heavy architecture cases

## Spiral
Keep:
- no longer disappears in heavy risk cases
- role explanation is more accurate now

Refine:
- should rise more decisively in very high uncertainty and criticality cases
- should not need cadence logic to justify itself

## Scrum
Keep:
- wins correctly in classic structured iteration cases
- better separated from Kanban

Refine:
- reduce dominance in very heavy RUP/Spiral cases
- do not let high complexity alone act as a native Scrum strength

## Kanban
Keep:
- wins correctly in flow-heavy and support-like cases
- no longer wrongly triggers composite mode in simple flow scenarios

Refine:
- requirement instability may support Kanban slightly more in some flow-heavy cases
- explanation can be even more explicit about throughput, interrupt-driven work, and flow visibility

---

# What not to do

- do not reopen broad redesign
- do not add new recommendation modes
- do not reintroduce pair-specific composite hacks
- do not weaken already-correct pure methodology wins
- do not make lower-fit alternatives sound as strong as structurally important complements

---

# Desired outcome of the next task

After the next Codex pass:
- pure methodology wins remain stable
- composite wording becomes consistent
- critical complement becomes visually and semantically distinct from lower fit
- flow ownership no longer leaks into Scrum and Spiral
- heavy RUP/Spiral cases become less Scrum-dominant where appropriate
- the interface reads as coherently as the internal model now behaves
