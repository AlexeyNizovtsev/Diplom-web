# Recommendation Mode Mini-Spec

## Purpose

This document defines a lightweight interpretation layer for the SDLC selection model.

Its job is **not** to replace the existing rule-based ranking model.
Its job is to **interpret the ranked result more accurately** in cases where a plain top-1 reading is incomplete or misleading.

This is especially important for complex project profiles where:
- multiple high-signal dimensions are active at once,
- the top-ranked methodology covers the dominant constraint,
- another top-ranked methodology covers a different critical process role.

The interpretation layer should therefore sit **after ranking**, not before it.

---

## Core principle

The recommendation mode layer must:
- preserve the ranked methodology list,
- preserve the existing scoring / rule-based mapping logic,
- add a small number of interpretation modes,
- improve explainability of complex cases,
- avoid turning every result into a hybrid recommendation.

The model already outputs a **ranked list**, not a binary answer, and the explainability layer is already expected to show activated dimensions, key drivers, trade-offs, and risks of alternatives. This mini-spec refines that layer rather than replacing the model.

---

## What recommendation mode is not

Recommendation mode is **not**:
- a second ranking engine,
- a replacement for methodology scoring,
- a free-form hybrid generator,
- a justification to avoid making a primary recommendation.

It must not recompute or silently override the ranking order.

---

# Supported recommendation modes

The system should support only these three modes:

1. `single_fit`
2. `composite_strategy`
3. `close_fit`

This is intentionally limited.
Do not introduce additional modes unless there is a very strong model-level justification.

---

# Mode 1 — `single_fit`

## Meaning
One methodology clearly matches the dominant project pattern.

## When to use
Use `single_fit` when:
- one methodology clearly dominates the interpretation,
- top-2 does not represent a separate critical process role,
- no special composite condition is triggered,
- no close-fit condition is triggered.

## UI meaning
This is the default mode.

### Suggested heading
**Primary recommendation**

### Suggested explanation pattern
- explain why top-1 fits the dominant project pattern
- mention top-2 only as an alternative, not as a required complement

---

# Mode 2 — `composite_strategy`

## Meaning
The ranked result must be interpreted as a **combined process strategy case**, not as a simple “winner vs weaker alternatives” case.

In this mode:
- top-1 still remains top-1,
- top-2 remains below top-1 in ranking,
- but top-2 is interpreted as a **critical complementary strategy**, not merely a weaker alternative.

## Why this mode exists
Some project profiles combine:
- a strong governance / compliance constraint,
- a strong uncertainty / risk constraint,
- and often strong architecture / integration pressure.

In such cases, a purely single-method interpretation can be misleading.

### Example
A regulated high-risk medical or government system may require:
- `GOST 34` for governance, compliance, staged control, and acceptance,
- `Spiral` for risk-driven technical exploration and uncertainty reduction.

These are not equivalent roles.
Therefore, the result should be interpreted as a composite case.

## Trigger rule
Trigger `composite_strategy` when all of the following hold:

### Condition A
`Governance Formalisation >= 3`

### Condition B
`Risk & Innovation Orientation >= 3`

### Condition C
`Spiral` appears in the top-2 results

## Interpretation effect
When `composite_strategy` is active:

- top-1 keeps its ranking position
- top-1 label becomes:
  - `dominant_constraint_match`
- top-2 label becomes:
  - `critical_complementary_strategy`

## Suggested UI heading
**Composite strategy case**

## Suggested explanation structure
1. Explain why top-1 ranks first
2. Explicitly explain why top-2 still matters critically
3. State that this result should not be interpreted as a pure single-method case

### Suggested text pattern
- Top-1 matches the dominant governance / formalisation constraint
- Top-2 remains strategically important because the project also requires risk-driven execution logic
- The project should therefore be interpreted as governance-led but not governance-only

---

# Mode 3 — `close_fit`

## Meaning
Two methodologies are both plausible, and the final preference depends on secondary priorities rather than one dominant hard constraint.

## When to use
Use `close_fit` when:
- `composite_strategy` is not active,
- there is no strong override condition,
- top-1 and top-2 are meaningfully close in ranking strength.

## Scoring rule
If the ranking engine exposes raw or intermediate suitability values:
- trigger `close_fit` when the gap between top-1 and top-2 is below a chosen threshold.

If no stable numeric gap is available yet:
- use a temporary rule based on near-equal rule activation or a documented weak-gap heuristic.

This threshold logic must remain explicit and reviewable.
Do not hide it in arbitrary UI code.

## Interpretation effect
When `close_fit` is active:

- top-1 label becomes:
  - `best_current_fit`
- top-2 label becomes:
  - `close_alternative`

## Suggested UI heading
**Close alternative case**

## Suggested explanation pattern
- explain why top-1 is currently preferred
- explain what secondary priority makes top-2 still plausible
- do not describe this as a hybrid case unless another rule explicitly requires it

---

# Support flags

Support flags are not modes.
They enrich interpretation inside an existing mode.

The system should support the following flag:

## `architecture_supporting_option`

### Meaning
A methodology, typically `RUP`, is relevant as a supporting architecture / coordination option even if it is not top-1 or top-2.

### Trigger rule
Add `architecture_supporting_option` when all of the following hold:

- `System & Integration Complexity >= 3`
- `Organisational Discipline >= 2`
- `Iteration Structure >= 2`
- `RUP` appears in the top-3 results

### UI effect
`RUP` may receive a secondary interpretation label such as:
- `Architecture-supporting option`

### Interpretation purpose
This helps distinguish:
- governance / compliance role
- risk / uncertainty role
- architecture / coordination role

without turning the output into a fully hybrid recommendation.

---

# Labels

These labels are for structured interpretation, not raw UI exposure.

## Mode labels
- `single_fit`
- `composite_strategy`
- `close_fit`

## Result interpretation labels
- `primary_recommendation`
- `dominant_constraint_match`
- `critical_complementary_strategy`
- `best_current_fit`
- `close_alternative`
- `architecture_supporting_option`

The UI may translate or rephrase these for users.
Do not expose internal labels directly unless they are converted into readable text.

---

# Important constraints

## Constraint 1 — Ranking must remain unchanged
Recommendation mode must never reorder methodologies.

## Constraint 2 — `single_fit` must remain the default
Most ordinary cases should still be interpreted as `single_fit`.

## Constraint 3 — `composite_strategy` must be rare
It should be triggered only by strong, explicit conditions.
Do not use it as a generic way to soften uncertain model output.

## Constraint 4 — `close_fit` is not a hybrid mode
It means the decision is close, not that both methodologies must be used together.

---

# Recommended implementation order

1. Keep existing ranking output unchanged
2. Add recommendation mode detection as a post-ranking utility
3. Add support flag detection
4. Extend results page rendering to show the correct interpretation heading
5. Extend top-1 / top-2 explanation blocks to reflect the detected mode

---

# Suggested utility shape

```ts
type RecommendationMode = "single_fit" | "composite_strategy" | "close_fit"

type RecommendationSupportFlag = "architecture_supporting_option"

type RecommendationInterpretation = {
  mode: RecommendationMode
  supportFlags: RecommendationSupportFlag[]
  methodologyLabels: Partial<Record<MethodologyId, string[]>>
}
```

---

# Suggested interpretation algorithm

```ts
if (governance >= 3 && risk >= 3 && top2 === "spiral") {
  mode = "composite_strategy"
} else if (isCloseFit(top1, top2)) {
  mode = "close_fit"
} else {
  mode = "single_fit"
}

if (
  complexity >= 3 &&
  discipline >= 2 &&
  iteration >= 2 &&
  top3.includes("rup")
) {
  addFlag("architecture_supporting_option")
}
```

This is illustrative logic only.
The actual implementation may check whether `Spiral` is anywhere in top-2 rather than exactly second, depending on the ranking structure.

---

# Example interpretation

## Example input profile
- Governance = 3
- Requirements Stability = 1–2
- Risk & Innovation = 3
- Iteration Structure = 2
- Organisational Discipline = 2–3
- System Complexity = 3

## Example ranking
1. GOST 34
2. Spiral
3. RUP

## Expected interpretation
- mode = `composite_strategy`
- GOST 34 label = `dominant_constraint_match`
- Spiral label = `critical_complementary_strategy`
- RUP may also receive `architecture_supporting_option`

## Expected explanation
- GOST 34 ranks first due to governance, compliance, staged approval, and formal acceptance needs
- Spiral remains critically important because the project is also uncertainty-heavy and risk-driven
- RUP supports architecture and integration discipline

---

# Definition of done

This mini-spec is implemented correctly when:
- ranking remains unchanged
- one of the three modes is always assigned
- `single_fit` is the default
- `composite_strategy` is triggered only by strong explicit conditions
- `close_fit` is triggered by close ranking logic
- support flags can enrich interpretation without changing ranking
- the results page explains top-1 and top-2 more accurately in complex cases
