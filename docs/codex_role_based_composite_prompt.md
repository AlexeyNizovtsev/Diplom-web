# Codex Task — Implement Role-Based Composite Detection in Results Interpretation

Implement a general role-based composite detection layer on top of the existing SDLC ranking output.

## Use these files as source of truth

- `AGENTS.md`
- `docs/frontend-architecture.md`
- `docs/result-object-schema.md`
- `docs/results-page-spec.md`
- `docs/role-based-composite-detection-spec.md`

Also use the existing ranking pipeline and current results page implementation already present in the repository.

## Goal

Replace pair-specific composite interpretation logic with a general role-based interpretation layer.

This task must:
1. preserve the existing ranking order
2. introduce methodology-role mapping
3. detect active project roles from final dimension values
4. assign a recommendation mode from those roles
5. improve results-page explainability for multi-role cases
6. keep the implementation clean, explicit, and reviewable

Do **not** redesign the scoring model.
Do **not** reorder methodologies.
Do **not** implement new questionnaire logic.

---

## Critical rules

- Ranking must remain unchanged.
- Interpretation must be computed **after** ranking.
- Do not hardcode composite behavior only for specific methodology pairs.
- Do not replace the current methodology mapping logic.
- Keep interpretation logic outside React page JSX.
- Keep route files thin.
- Preserve the current visual structure of the results page as much as possible.

---

## Required implementation areas

### 1. Add methodology-role definitions

Create a utility such as:

- `src/lib/result/methodologyRoles.ts`

Use the role mapping defined in the spec:

- `gost34 -> governance`
- `waterfall -> sequential_delivery`
- `spiral -> risk_driven`
- `rup -> architecture_control`
- `scrum -> adaptive_iterations`
- `kanban -> flow_control`

---

### 2. Add active-role detection from final dimensions

Create a utility such as:

- `src/lib/result/detectActiveRoles.ts`

Use the activation rules from `docs/role-based-composite-detection-spec.md`.

At minimum, support detection of:
- governance
- sequential_delivery
- risk_driven
- architecture_control
- adaptive_iterations
- flow_control

This logic must be explicit and testable.

---

### 3. Implement recommendation mode detection

Create a post-ranking utility such as:

- `src/lib/result/detectRecommendationMode.ts`
- `src/lib/result/buildRecommendationInterpretation.ts`

Support exactly these three modes:
- `single_fit`
- `composite_strategy`
- `close_fit`

Suggested behavior:
- `composite_strategy` when top-1 and top-2 have different methodology roles and both corresponding project roles are strongly active
- `close_fit` when composite is not active and top-1 and top-2 are close in ranking strength
- `single_fit` otherwise

Do not silently encode this logic inside UI conditions.

---

### 4. Add support flags

Support at least these flags:
- `architecture_supporting_option`
- `risk_supporting_option`

Suggested behavior:
- `architecture_supporting_option` when RUP is in top-3 and architecture-control conditions are active
- `risk_supporting_option` when Spiral is in top-3 and risk-driven conditions are active

These flags must enrich interpretation without changing the ranking.

---

### 5. Extend the result object or results view model

Expose interpretation in a structured form, such as:

- `mode`
- `activeRoles`
- `supportFlags`
- `topMethodologyRole`
- `secondMethodologyRole`
- `methodologyLabels`

Choose the cleanest architecture based on the current codebase:
- either extend the result object itself
- or derive a results-page view model

Do not bury this state in ad hoc component props if there is already a cleaner result pipeline.

---

### 6. Update results-page rendering

Update the results page so it can render readable interpretation states:

#### For `single_fit`
- heading like `Primary recommendation`

#### For `composite_strategy`
- heading like `Composite strategy case`
- top-1 explained as dominant constraint match
- top-2 explained as critical complementary strategy

#### For `close_fit`
- heading like `Close alternative case`
- top-1 and top-2 explained as near alternatives with different emphasis

If `architecture_supporting_option` is active and RUP is in top-3:
- add a compact explanation that architecture and integration control remain important

If `risk_supporting_option` is active and Spiral is in top-3:
- add a compact explanation that uncertainty and technical risk still require explicit attention

Do not let these support notes visually overpower top-1 or top-2.

---

## Important content behavior

Use the new interpretation layer to improve:
- why top-1 ranks first
- why top-2 still matters
- whether the case should be read as single-fit, composite, or close-fit

Do not:
- present every case as hybrid
- weaken clear single-fit outputs
- turn close-fit into composite unless the role logic supports it
- fall back to pair-specific hacks as the main mechanism

---

## Validation against known stress cases

Make sure the implementation handles these cases correctly:

### Case 1 — IoMT regulated high-risk system
Expected ranking may remain:
- `GOST 34 > Spiral > RUP`

Expected interpretation:
- `composite_strategy`

Expected reading:
- GOST 34 = governance/compliance layer
- Spiral = critical complementary risk-driven strategy
- RUP may appear as architecture-supporting option

### Case 2 — FinTech regulated complex platform
Expected ranking may remain:
- `GOST 34 > RUP > Waterfall ...`

Expected interpretation:
- `composite_strategy`

Expected reading:
- GOST 34 = governance/compliance layer
- RUP = critical complementary architecture/control strategy

### Case 3 — ordinary sprint-based adaptive product team
Expected interpretation:
- usually `single_fit`

### Case 4 — close Scrum/Kanban-like case
Expected interpretation:
- `close_fit` if ranking gap is small

---

## Suggested implementation structure

If useful, introduce or refine files like:
- `src/lib/result/methodologyRoles.ts`
- `src/lib/result/detectActiveRoles.ts`
- `src/lib/result/detectRecommendationMode.ts`
- `src/lib/result/buildRecommendationInterpretation.ts`
- `src/lib/result/resultInterpretationTypes.ts`

This is only a suggested structure. Keep naming consistent with the current project conventions.

---

## What not to do

- do not change methodology ranking order
- do not redesign questionnaire logic
- do not redesign results page layout from scratch
- do not introduce many new recommendation modes
- do not keep the old pair-specific logic as the primary system
- do not implement export or persistence changes in this task

---

## Deliverables

When done, report:
1. files created or changed
2. where methodology-role mapping lives
3. where active-role detection lives
4. how recommendation mode is determined
5. how interpretation is attached to results rendering
6. examples of `single_fit`, `composite_strategy`, and `close_fit`
7. any TODOs for future refinement
