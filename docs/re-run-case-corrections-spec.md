# Re-run Case Corrections Spec

## Purpose

This document captures the next refinement step after re-running the updated SDLC selection cases.

The current model is no longer broadly broken.
Its main structure is now acceptable.

The remaining issues are mostly concentrated in:
- signal exclusivity,
- role calibration,
- complementary-method ordering in complex composite cases,
- explanation precision,
- and label consistency.

This spec focuses on those targeted refinements.

---

## Scope

This spec does **not** redesign:
- the questionnaire structure,
- the six aggregated dimensions,
- the ranking model as a whole,
- the role-based interpretation architecture.

It refines:
- how specific signals are interpreted,
- how certain methods are strengthened or suppressed,
- how alternative explanations are written,
- how labels are assigned on the results page.

---

# Main problems still observed

## Problem 1 — Flow signal leakage
`Iteration Structure = 3` still strengthens methodologies that should not gain from pure flow.

Observed effects:
- Scrum is still strengthened in pure flow cases
- Spiral is still strengthened in pure flow cases

This creates inflated alternatives in Kanban-dominant cases.

---

## Problem 2 — Scrum too high in regulated risk-heavy composite case
In the re-run IoMT-like case, Scrum still outranks Spiral.

This is wrong for cases where:
- risk is very high,
- uncertainty / experimentation are strong,
- complexity is very high,
- governance is very high,
- and iteration is structured but not flow-based.

In such cases, Spiral should outrank Scrum as the complementary method.

---

## Problem 3 — Governance now risks being underplayed in explanation
Earlier model versions overplayed governance and forced GOST too high.

The current model fixed that structural problem, but the explanation layer now risks swinging too far in the opposite direction:
- governance may no longer dominate ranking,
- but it still remains an important environmental constraint in heavily regulated cases.

This must remain visible in explanation.

---

## Problem 4 — Alternative explanations are still too generic
Alternative methodology texts are still too reusable across incompatible cases.

They often describe what a method generally is, instead of:
- why it is lower in this case,
- why it is not the dominant fit here,
- what specific role it still plays or fails to play.

---

## Problem 5 — Label collisions
Some results still show contradictory label combinations, such as:
- a top-1 methodology receiving a support-type label,
- or labels whose semantics conflict with their ranking position.

This weakens explanation trust.

---

# Required corrections

## Correction 1 — Flow exclusivity

### Rule
If:

```ts
IterationStructure == 3
```

Then:
- strongly activate `flow_control`
- do **not** strengthen `adaptive_iterations` by default
- do **not** strengthen `risk_driven` by default

### Interpretation
Pure continuous flow must be treated as a Kanban-type signal.
It must not act as a generic “iterative” bonus for Scrum or Spiral.

### Intended effect
In support / ops and SaaS flow-heavy cases:
- Kanban remains clearly first
- Scrum can remain a nearby alternative
- Spiral must not be inflated by flow alone

---

## Correction 2 — Structured-iteration conditionality

### Rule
If:

```ts
IterationStructure == 2
```

Then:
- strengthen `adaptive_iterations`
- moderately support `architecture_control`
- strengthen `risk_driven` only if strong risk signals are present
- do **not** support `flow_control`

### Interpretation
Structured iterations are not equivalent to either:
- continuous flow,
- or risk-driven cycles by themselves.

This signal must be conditional by role.

### Intended effect
- Scrum remains strong in canonical sprint cases
- RUP can benefit where disciplined iteration is relevant
- Spiral only benefits if risk actually drives the case

---

## Correction 3 — Spiral over Scrum in risk-heavy composite cases

### Rule
If all are true:

```ts
RiskInnovationOrientation >= 3
&& SystemIntegrationComplexity >= 3
&& GovernanceFormalisation >= 3
&& IterationStructure == 2
```

Then:
- `risk_driven` must be interpreted as stronger than `adaptive_iterations`
- Spiral should outrank Scrum when selecting the complementary method

### Interpretation
In these cases:
- architecture and risk dominate development-process choice
- Scrum remains a weaker adaptive delivery alternative
- Spiral better represents the uncertainty-handling logic

### Intended effect
In IoMT-like regulated, risky, architecture-heavy systems:
- RUP or GOST may remain high depending on ranking logic
- but Spiral must outrank Scrum as the complementary method

---

## Correction 4 — Governance visibility without governance dominance

### Rule
If:

```ts
GovernanceFormalisation >= 3
```

Then explanation must:
- explicitly mention governance / compliance / staged approval pressure
- even when governance is not the dominant development-process driver

### Interpretation
Governance should no longer erase architecture or risk.
But it also must not disappear from explanation in heavily regulated cases.

### Intended effect
Composite cases can read like:
- architecture + risk drive development-process choice
- governance remains a strong environmental constraint

---

## Correction 5 — Role-specific alternative explanations

Alternative explanations must be written from the perspective of:
- actual active role,
- actual missing role,
- actual reason the method is lower.

They must not rely on generic reusable summary text.

### Required explanation style

#### Kanban
Use when relevant:
- flow
- pull
- WIP
- unpredictable incoming work
- on-demand delivery

#### Scrum
Use when relevant:
- sprint cadence
- timeboxed commitment
- review loop
- backlog discipline

#### Spiral
Use when relevant:
- uncertainty reduction
- prototyping
- technical risk
- risk-driven cycles

#### RUP
Use when relevant:
- architecture-first control
- disciplined iterations
- integration structure

#### GOST 34
Use when relevant:
- formal governance
- technical assignment
- staged approval
- acceptance structure

#### Waterfall
Use when relevant:
- stable scope
- linear progression
- controlled change

### Negative framing requirement
Alternative explanations should answer:
- why this method is lower here
- why it is not the main fit in this case

not only:
- what this method generally does

---

## Correction 6 — Support label safety

### Rule
Support-type labels must never be assigned to:
- top-1 methodology
- primary recommendation card
- any methodology already carrying a dominant primary label

### Intended effect
No contradictions such as:
- top-1 + supporting option
- dominant match + support badge on the same item

---

# Case-level expected corrections

## Case A — IoMT / complex regulated-risk case
Expected:
- composite mode remains correct
- Scrum moves below Spiral
- explanation states:
  - architecture + risk dominate process choice
  - governance remains strong in the environment

Preferred reading:
- top role: architecture_control or governance depending on ranking
- complementary method: Spiral, not Scrum
- GOST remains visible as governance context

---

## Case B — Classic Scrum case
Expected:
- single-fit remains correct
- Scrum stays first
- Kanban remains second as a nearby alternative
- RUP weakens slightly
- change-control wording better reflects backlog-managed reprioritisation

---

## Case C — Support / Ops / pure Kanban case
Expected:
- single-fit remains correct
- Kanban clearly first
- Scrum remains only a secondary alternative
- Spiral no longer receives any artificial boost from flow
- alternative texts become more role-specific

---

## Case D — SaaS continuous-delivery / flow-heavy case
Expected:
- Kanban remains first
- no composite
- Scrum remains a weaker nearby alternative
- visual and textual interpretation should not imply near-equal methods
- Spiral does not gain from flow alone

---

# Suggested implementation notes

## 1. Signal exclusivity helpers
Introduce explicit helpers if useful, for example:
- `isFlowExclusiveSignal(iterationValue)`
- `isStructuredIterationSignal(iterationValue)`

## 2. Risk-vs-iteration priority helper
Introduce a utility if useful, for example:
- `preferRiskDrivenOverAdaptiveIterations(dimensions)`

This should be explicit and reviewable.

## 3. Explanation template split
Separate:
- primary outcome text
- alternative explanation text
- support-role explanation text

Do not drive all of them from the same generic text block.

## 4. Label validation
Add a simple post-processing check or assignment discipline so that contradictory label combinations cannot appear.

---

# Definition of done

This spec is implemented correctly when:
- `Iteration = 3` strengthens Kanban only
- Scrum and Spiral no longer inherit flow as a generic boost
- Spiral outranks Scrum in the regulated high-risk architecture-heavy composite case
- governance remains visible in explanation without dominating ranking by default
- alternative explanations are role-specific and case-specific
- support labels never appear on top-1 items
- all re-run cases read more plausibly without breaking the already-correct single-fit results
