# Role-Based Composite Detection — Consolidated Spec

## Purpose

This document consolidates the required fixes for the SDLC selection model interpretation layer.

Its purpose is to move the system from:
- handling a few individual stress cases,
to:
- using a more stable and general role-based interpretation logic.

This spec does **not** replace the existing ranking model.
It refines how ranked results should be interpreted.

---

## Core principle

The ranking remains unchanged.

The interpretation layer:
1. reads the final ranked methodologies,
2. reads the final aggregated dimension values,
3. detects active project roles,
4. decides whether the result is:
   - `single_fit`
   - `composite_strategy`
   - `close_fit`
5. generates more accurate explanation text.

It must never silently reorder methodologies.

---

## Why this layer is needed

The current model often ranks methodologies reasonably well, but interprets them too simplistically.

Main problems observed in testing:
- methodologies are treated as if they always compete directly,
- `top-1` is treated as the complete answer,
- composite cases are triggered too loosely,
- Scrum is overinterpreted in flow-heavy contexts,
- governance-heavy cases suppress risk and architecture roles,
- close alternatives are confused with complementary roles.

---

# Methodology roles

Each methodology is assigned one dominant process role.

```ts
type Role =
  | "governance"
  | "risk_driven"
  | "architecture_control"
  | "adaptive_iterations"
  | "flow_control"
  | "sequential_delivery"
```

## Role mapping

```ts
const methodologyRoles = {
  gost34: "governance",
  waterfall: "sequential_delivery",
  spiral: "risk_driven",
  rup: "architecture_control",
  scrum: "adaptive_iterations",
  kanban: "flow_control",
} as const
```

## Rationale

- `gost34` = governance, compliance, staged approval, formal acceptance
- `waterfall` = stable sequential delivery
- `spiral` = risk-driven technical exploration
- `rup` = architecture-first disciplined coordination
- `scrum` = structured adaptive iterations
- `kanban` = continuous flow control

---

# Role activation rules

The system must detect which roles are strongly active in the project profile.

```ts
type ActiveRole =
  | "governance"
  | "risk_driven"
  | "architecture_control"
  | "adaptive_iterations"
  | "flow_control"
  | "sequential_delivery"
```

## Activation rules

### governance
```ts
Governance >= 3
```

### risk_driven
```ts
Risk >= 3
```

### architecture_control
```ts
Complexity >= 3
&& Discipline >= 2
&& Iteration >= 1
```

### adaptive_iterations
```ts
Iteration >= 2
&& Iteration < 3
```

### flow_control
```ts
Iteration == 3
```

### sequential_delivery
```ts
Iteration <= 1
&& Stability >= 2
```

---

# Operational families

Roles are not always equal in interpretive function.
Some are closer to each other than others.

Operational families help distinguish:
- true composite cases
- close alternatives
- false composite readings

```ts
type RoleFamily =
  | "formal_control"
  | "risk_architecture"
  | "iterative_delivery"
  | "flow_delivery"
```

## Suggested mapping

```ts
const roleFamilies = {
  governance: "formal_control",
  sequential_delivery: "formal_control",
  risk_driven: "risk_architecture",
  architecture_control: "risk_architecture",
  adaptive_iterations: "iterative_delivery",
  flow_control: "flow_delivery",
} as const
```

## Interpretation use
- different strongly active roles across distinct families are more likely to justify `composite_strategy`
- nearby delivery families are more likely to justify `close_fit`
- this supports interpretation, but does not replace role logic

---

# Recommendation modes

The model supports exactly three recommendation modes.

```ts
type RecommendationMode =
  | "single_fit"
  | "composite_strategy"
  | "close_fit"
```

---

## Mode 1 — `single_fit`

### Meaning
One methodology clearly matches the dominant process pattern.
No second methodology represents a distinct mandatory role strongly enough to require composite interpretation.

### Typical examples
- classic Scrum case
- pure support / ops Kanban case
- ordinary stable Waterfall case

### UI heading
**Primary recommendation**

---

## Mode 2 — `composite_strategy`

### Meaning
Top-1 is still top-1, but top-2 is not just a weaker alternative.
It represents a distinct and necessary complementary process role.

### Trigger rule
Use `composite_strategy` when all are true:

```ts
top1.role !== top2.role
AND top1.role is strongly active
AND top2.role is strongly active
AND top2 represents a distinct necessary process role
```

### Important note
Composite must not be triggered simply because two strong signals exist.
It requires **different roles**, not just multiple strong dimensions.

### Typical examples
- GOST + Spiral
- GOST + RUP

### UI heading
**Composite strategy case**

---

## Mode 3 — `close_fit`

### Meaning
Top-1 and top-2 are both plausible, but the case does not justify a composite reading.

### Trigger rule
Use `close_fit` when all are true:

```ts
composite_strategy is false
AND top1 and top2 are close in ranking strength
AND (
  top1 and top2 belong to the same operational family
  OR top2 does not represent a separate mandatory role
)
```

### Important note
`close_fit` is not a hybrid recommendation.
It means the final preference depends on secondary priorities.

### Typical example
- Kanban vs Scrum in SaaS delivery with frequent change but no true sprint discipline dominance

### UI heading
**Close alternative case**

---

# Anti-false-composite rules

These rules prevent the system from reading nearby delivery alternatives as complementary strategies.

## Rule A — Flow-dominant suppression of adaptive composite reading

If:

```ts
flow_control is active
AND adaptive_iterations is not independently dominant
```

Then:
- `adaptive_iterations` must not trigger `composite_strategy`
- Scrum may appear only as:
  - `close_alternative`
  - or lower alternative
- Scrum must not be described as a critical complementary role in pure flow-heavy cases

## Rule B — Iteration-dominant suppression of flow composite reading

If:

```ts
adaptive_iterations is active
AND flow_control is not independently dominant
```

Then:
- `flow_control` must not trigger `composite_strategy`
- Kanban may appear as a close alternative
- Kanban must not be described as a critical complementary role in ordinary Scrum-like cases

## Rule C — Governance must not erase other roles

If:

```ts
governance is active
```

Then:
- governance may strongly support `gost34`
- but it must not automatically suppress:
  - `risk_driven`
  - `architecture_control`

This is especially important in:
- regulated high-risk systems
- regulated architecture-heavy systems

---

# Support flags

Support flags enrich interpretation without changing the main mode.

```ts
type SupportFlag =
  | "architecture_supporting_option"
  | "risk_supporting_option"
```

## architecture_supporting_option
Trigger when:

```ts
Complexity >= 3
&& Discipline >= 2
&& Iteration >= 1
&& top3.includes("rup")
```

Meaning:
- architecture and integration control remain important

## risk_supporting_option
Trigger when:

```ts
Risk >= 3
&& top3.includes("spiral")
```

Meaning:
- uncertainty and technical risk still require explicit attention

---

# Result labels

Internal labels may be attached to methodologies for rendering.

```ts
type MethodologyInterpretationLabel =
  | "primary_recommendation"
  | "dominant_constraint_match"
  | "critical_complementary_strategy"
  | "best_current_fit"
  | "close_alternative"
  | "architecture_supporting_option"
  | "risk_supporting_option"
```

## Suggested use

### in `single_fit`
- top-1 → `primary_recommendation`

### in `composite_strategy`
- top-1 → `dominant_constraint_match`
- top-2 → `critical_complementary_strategy`

### in `close_fit`
- top-1 → `best_current_fit`
- top-2 → `close_alternative`

### if support flags apply
- add corresponding supporting labels to `RUP` or `Spiral`

---

# Correct behavior matrix

| Case | Expected Mode | Expected Reading |
|---|---|---|
| IoMT | composite_strategy | GOST + Spiral, with RUP as support |
| FinTech | composite_strategy | GOST + RUP |
| SaaS continuous delivery | close_fit | Kanban vs Scrum |
| Classic Scrum | single_fit | Scrum |
| Support / Ops pure flow | single_fit | Kanban |

---

# Case expectations

## Case 1 — IoMT
Expected:
- governance active
- risk_driven active
- architecture_control active
- ranking may remain `GOST > Spiral > RUP`
- mode = `composite_strategy`

Interpretation:
- GOST = governance/compliance layer
- Spiral = critical complementary risk strategy
- RUP = architecture-supporting option

## Case 2 — FinTech
Expected:
- governance active
- architecture_control active
- risk_driven not dominant enough to displace RUP
- ranking may remain `GOST > RUP > ...`
- mode = `composite_strategy`

Interpretation:
- GOST = governance/compliance layer
- RUP = critical complementary architecture/control strategy

## Case 3 — SaaS continuous delivery
Expected:
- flow_control active
- adaptive_iterations may appear nearby but not as a mandatory complementary role
- mode = `close_fit`

Interpretation:
- Kanban = preferred
- Scrum = close alternative

## Case 4 — Classic Scrum
Expected:
- adaptive_iterations active
- flow_control not dominant
- mode = `single_fit`

Interpretation:
- Scrum = primary recommendation
- Kanban = nearby alternative at most

## Case 5 — Support / Ops pure flow
Expected:
- flow_control active
- low complexity and low risk
- mode = `single_fit`

Interpretation:
- Kanban = primary recommendation
- Scrum must not be interpreted as critical complementary strategy

---

# Constraints

## Constraint 1
Ranking order must remain unchanged.

## Constraint 2
`single_fit` remains the default mode.

## Constraint 3
`composite_strategy` requires distinct strongly active roles.

## Constraint 4
`close_fit` does not imply hybrid use.

## Constraint 5
Do not build the system around an expanding list of special methodology pairs.

---

# Suggested output shape

```ts
type RecommendationInterpretation = {
  mode: RecommendationMode
  activeRoles: ActiveRole[]
  supportFlags: SupportFlag[]
  topMethodologyRole: Role
  secondMethodologyRole?: Role
  methodologyLabels: Partial<Record<MethodologyId, MethodologyInterpretationLabel[]>>
}
```

---

# Recommended implementation order

1. Define methodology roles
2. Detect active roles from final dimensions
3. Add operational-family helper
4. Implement mode detection
5. Implement anti-false-composite rules
6. Add support flags
7. Attach interpretation to result object or derived view model
8. Refine results-page explanation rendering
9. Validate against all known test cases

---

# Definition of done

This spec is implemented correctly when:
- ranking remains unchanged
- the system assigns exactly one mode
- composite cases depend on distinct strongly active roles
- Scrum/Kanban false composite cases are suppressed
- governance-heavy cases no longer erase risk or architecture interpretation
- IoMT and FinTech become composite
- SaaS becomes close_fit
- Classic Scrum remains single_fit
- Support / Ops remains single_fit
