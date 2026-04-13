# Role-Based Composite Detection Spec

## Purpose

This document defines a general interpretation layer for the SDLC selection model.

Its purpose is to improve explainability of ranked results in cases where:
- the ranking itself is reasonable,
- but a plain top-1 interpretation is incomplete,
- because top-1 and top-2 represent different strongly active process roles.

This layer must operate **after** the existing ranking logic.

It must not replace the scoring model, and it must not reorder methodologies.

---

## Why this spec exists

Earlier explainability fixes were trending toward pair-specific rules such as:
- GOST 34 + Spiral
- GOST 34 + RUP

That approach does not scale well.

The correct generalisation is to interpret results through **methodology roles** and **role activation**, not through a growing list of specific methodology pairs.

This makes the system:
- more explainable,
- more extensible,
- less brittle,
- and better aligned with the design-science goal of a transparent decision-support artefact.

---

## Non-goals

This spec does **not**:
- redesign the ranking engine,
- introduce weighted machine learning,
- replace the six-dimension model,
- claim to cover every real-world hybrid process,
- force every ambiguous case into a composite recommendation.

---

# Core principle

The ranking remains the source of truth.

The interpretation layer:
1. reads the final ranked methodologies,
2. reads the final aggregated dimension levels,
3. detects active project roles,
4. interprets top-1 and top-2 through those roles,
5. assigns one recommendation mode.

It must never silently override ranking order.

---

# Methodology roles

Each supported methodology is assigned one dominant process role.

```ts
type MethodologyRole =
  | "governance"
  | "sequential_delivery"
  | "risk_driven"
  | "architecture_control"
  | "adaptive_iterations"
  | "flow_control"
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

- **GOST 34** primarily represents governance, compliance, formal staged control, and acceptance.
- **Waterfall** primarily represents stable sequential delivery under relatively fixed requirements.
- **Spiral** primarily represents risk-driven iterative development.
- **RUP** primarily represents architecture-first disciplined iterative control.
- **Scrum** primarily represents adaptive timeboxed iterations.
- **Kanban** primarily represents continuous flow control through WIP limits and workflow visibility.

---

# Active project roles

The interpretation layer detects which process roles are strongly active in the project profile.

```ts
type ActiveRole =
  | "governance"
  | "sequential_delivery"
  | "risk_driven"
  | "architecture_control"
  | "adaptive_iterations"
  | "flow_control"
```

## Suggested activation rules

### 1. Governance role
Active when:

```ts
GovernanceFormalisation >= 3
```

Interpretation:
- regulatory strictness,
- mandatory formal approval,
- strong compliance-driven staged control.

---

### 2. Risk-driven role
Active when:

```ts
RiskInnovationOrientation >= 3
```

Interpretation:
- technical uncertainty is high,
- risk reduction must drive iteration priorities,
- experimentation or high criticality strongly shapes process logic.

---

### 3. Architecture-control role
Active when all are true:

```ts
SystemIntegrationComplexity >= 3
&& OrganisationalDiscipline >= 2
&& IterationStructure >= 1
```

Interpretation:
- architecture and integration are major concerns,
- the organisation can sustain disciplined coordination,
- the project is not purely ad hoc.

---

### 4. Adaptive-iterations role
Active when all are true:

```ts
IterationStructure >= 2
&& GovernanceFormalisation <= 2
```

Interpretation:
- structured short cycles matter,
- heavy formal governance is not dominant.

---

### 5. Flow-control role
Active when:

```ts
IterationStructure >= 3
```

Interpretation:
- work is better described as continuous flow than as sprinted cadence.

---

### 6. Sequential-delivery role
Active when all are true:

```ts
RequirementsStability >= 2
&& IterationStructure <= 1
```

Interpretation:
- requirements are sufficiently stable,
- work structure is primarily sequential or milestone-based.

---

# Recommendation modes

The system supports exactly three interpretation modes.

```ts
type RecommendationMode =
  | "single_fit"
  | "composite_strategy"
  | "close_fit"
```

These modes are interpretation modes only.
They do not affect the ranked list order.

---

## Mode 1 — `single_fit`

### Meaning
One methodology clearly best matches the dominant project pattern.

### When to use
Use `single_fit` when:
- no strong multi-role interpretation is needed,
- top-2 does not represent a separate strongly active role,
- the result is not a close-fit case.

### User-facing meaning
- this is the default mode,
- top-1 is presented as the primary recommendation.

### Suggested UI heading
**Primary recommendation**

---

## Mode 2 — `composite_strategy`

### Meaning
The project should not be interpreted as a pure single-method case.

Top-1 remains top-1, but top-2 is not just a weaker alternative.
Instead, it represents a distinct critical complementary process role.

### When to use
Use `composite_strategy` when all of the following are true:
1. `top1.role !== top2.role`
2. top-1 role is strongly active in the project profile
3. top-2 role is also strongly active in the project profile
4. top-2 is truly near the front of the ranked output, i.e. it is top-2, not a weak distant option

### User-facing meaning
- top-1 = dominant constraint match
- top-2 = critical complementary strategy

### Suggested UI heading
**Composite strategy case**

### Interpretation note
This mode is for strong multi-role cases.
It should remain relatively rare.

---

## Mode 3 — `close_fit`

### Meaning
Top-1 and top-2 are both plausible, and the final preference depends on secondary priorities rather than on separate mandatory roles.

### When to use
Use `close_fit` when:
- `composite_strategy` is not active,
- top-1 and top-2 are close in ranking strength,
- the case does not justify a hard composite reading.

### User-facing meaning
- top-1 = best current fit
- top-2 = close alternative

### Suggested UI heading
**Close alternative case**

---

# Support flags

Support flags enrich interpretation inside a mode.
They are not modes by themselves.

```ts
type RecommendationSupportFlag =
  | "architecture_supporting_option"
  | "risk_supporting_option"
```

---

## `architecture_supporting_option`

### Meaning
`RUP` remains relevant as an architecture and integration support strategy even if it is not top-1.

### Trigger rule
Active when all are true:

```ts
SystemIntegrationComplexity >= 3
&& OrganisationalDiscipline >= 2
&& IterationStructure >= 1
&& top3.includes("rup")
```

### UI meaning
Add a compact note that architecture and integration control remain important.

---

## `risk_supporting_option`

### Meaning
`Spiral` remains relevant as a risk-handling strategy even if it is not top-1.

### Trigger rule
Active when all are true:

```ts
RiskInnovationOrientation >= 3
&& top3.includes("spiral")
```

### UI meaning
Add a compact note that uncertainty and technical risk still require explicit process attention.

---

# Optional role families

Role families may help detect `close_fit` cases without hardcoding methodology pairs.

```ts
type RoleFamily =
  | "formal_plan_driven"
  | "iterative_adaptive"
  | "flow_oriented"
  | "risk_or_architecture"
```

## Suggested mapping

```ts
const roleFamilies = {
  governance: "formal_plan_driven",
  sequential_delivery: "formal_plan_driven",
  risk_driven: "risk_or_architecture",
  architecture_control: "risk_or_architecture",
  adaptive_iterations: "iterative_adaptive",
  flow_control: "flow_oriented",
} as const
```

## Intended use
- `close_fit` is more plausible when top-1 and top-2 belong to nearby or compatible families
- `composite_strategy` is more plausible when top-1 and top-2 belong to clearly different active roles

This is a support heuristic, not the primary decision mechanism.

---

# Mode detection algorithm

## Inputs
The interpretation layer reads:
- final ranked methodology list,
- final aggregated dimension values,
- optional ranking gap information if available,
- top-3 methodologies for support-flag detection.

## Required outputs

```ts
type RecommendationInterpretation = {
  mode: RecommendationMode
  activeRoles: ActiveRole[]
  supportFlags: RecommendationSupportFlag[]
  topMethodologyRole: MethodologyRole
  secondMethodologyRole?: MethodologyRole
  methodologyLabels: Partial<Record<MethodologyId, string[]>>
}
```

---

## Suggested algorithm

```ts
const top1 = ranked[0]
const top2 = ranked[1]
const top3 = ranked.slice(0, 3)

const top1Role = methodologyRoles[top1.id]
const top2Role = methodologyRoles[top2.id]

const activeRoles = detectActiveRoles(dimensions)

const top1RoleActive = activeRoles.includes(top1Role)
const top2RoleActive = activeRoles.includes(top2Role)

const composite =
  top1Role !== top2Role &&
  top1RoleActive &&
  top2RoleActive

if (composite) {
  mode = "composite_strategy"
} else if (isCloseFit(top1, top2)) {
  mode = "close_fit"
} else {
  mode = "single_fit"
}
```

### Notes
- `isCloseFit(top1, top2)` should be explicit and reviewable
- if raw ranking gap exists, use it
- if no numeric gap exists yet, use a documented heuristic
- do not hide this logic inside arbitrary UI components

---

# Methodology labels

Internal labels can be attached to methodologies for rendering explanation text.

## Suggested labels

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

## Recommended assignment

### In `single_fit`
- top-1 → `primary_recommendation`

### In `composite_strategy`
- top-1 → `dominant_constraint_match`
- top-2 → `critical_complementary_strategy`

### In `close_fit`
- top-1 → `best_current_fit`
- top-2 → `close_alternative`

### If support flags apply
- add corresponding support labels to `RUP` or `Spiral`

---

# UI interpretation rules

The UI should never expose raw internal state such as:
- `mode = composite_strategy`
- `label = dominant_constraint_match`

Convert them into readable user-facing text.

## Recommended headings

- `single_fit` → **Primary recommendation**
- `composite_strategy` → **Composite strategy case**
- `close_fit` → **Close alternative case**

## Recommended explanation behavior

### `single_fit`
Explain:
- why top-1 best matches the dominant project pattern,
- why top-2 is only a secondary alternative.

### `composite_strategy`
Explain:
- why top-1 ranks first,
- why top-2 still matters as a distinct role,
- that the case should not be read as a pure single-method recommendation.

### `close_fit`
Explain:
- why top-1 is currently preferred,
- what secondary trade-off keeps top-2 plausible.

---

# Example cases

## Case A — IoMT regulated high-risk system
Expected ranking can remain:

1. GOST 34
2. Spiral
3. RUP

Detected roles:
- governance
- risk_driven
- architecture_control

Expected interpretation:
- mode = `composite_strategy`
- GOST 34 = dominant governance/compliance role
- Spiral = critical complementary risk-driven strategy
- RUP may receive `architecture_supporting_option`

This aligns with the previously documented medical monitoring stress case.

---

## Case B — FinTech regulated complex platform
Expected ranking can remain:

1. GOST 34
2. RUP
3. Waterfall

Detected roles:
- governance
- architecture_control

Expected interpretation:
- mode = `composite_strategy`
- GOST 34 = dominant governance/compliance role
- RUP = critical complementary architecture/control role

This aligns with the previously documented FinTech stress case.

---

## Case C — Ordinary Scrum-like product team
Possible ranking:

1. Scrum
2. Kanban
3. RUP

Detected roles:
- adaptive_iterations

Expected interpretation:
- usually `single_fit`
- possibly `close_fit` if gap is small

---

## Case D — Continuous product support team
Possible ranking:

1. Kanban
2. Scrum
3. Waterfall

Detected roles:
- flow_control

Expected interpretation:
- usually `single_fit`

---

## Case E — Stable fixed-scope staged system
Possible ranking:

1. Waterfall
2. GOST 34
3. RUP

Detected roles:
- sequential_delivery
- possibly governance if regulation is high

Expected interpretation:
- `single_fit` in ordinary stable cases
- `close_fit` if governance is present but not strong enough for full composite reading

---

# Constraints

## Constraint 1
Ranking must remain unchanged.

## Constraint 2
`single_fit` must remain the default mode.

## Constraint 3
`composite_strategy` must stay relatively rare and require strong evidence of multiple active roles.

## Constraint 4
`close_fit` does not mean hybrid recommendation.

## Constraint 5
Do not hardcode the system around a growing set of methodology pairs.

---

# Recommended implementation order

1. Add methodology-role definitions
2. Add active-role detection
3. Add post-ranking interpretation builder
4. Add support-flag detection
5. Expose interpretation to results-page rendering
6. Refine results-page wording
7. Validate against known stress cases

---

# Definition of done

This spec is implemented correctly when:
- ranking order remains unchanged,
- methodology roles are explicitly defined,
- active project roles are computed from final dimensions,
- exactly one recommendation mode is assigned,
- `single_fit` remains the default,
- composite cases are detected through role interaction rather than pair-specific hacks,
- support flags enrich interpretation without changing ranking,
- the results page explains top-1 and top-2 more honestly in multi-role cases,
- the IoMT and FinTech stress cases are interpreted correctly.
