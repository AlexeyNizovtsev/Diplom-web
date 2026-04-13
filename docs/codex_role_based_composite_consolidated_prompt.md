# Codex Task — Implement Consolidated Role-Based Composite Detection Fixes

Implement the consolidated role-based interpretation fixes for the SDLC selection model results page.

## Use these files as source of truth

- `AGENTS.md`
- `docs/frontend-architecture.md`
- `docs/result-object-schema.md`
- `docs/results-page-spec.md`
- `docs/role-based-composite-detection-consolidated-spec.md`

Also use the existing ranking pipeline and current results page implementation already present in the repository.

## Goal

Upgrade the results interpretation layer so that it correctly distinguishes:
- true composite cases,
- close alternatives,
- and ordinary single-fit cases.

The ranking itself must remain unchanged.

This task must:
1. preserve the current methodology ranking order
2. implement role-based interpretation
3. suppress false composite readings
4. correctly separate Scrum/Kanban close-fit cases from true composite cases
5. improve results-page explanation quality

Do **not** redesign the ranking engine.
Do **not** change questionnaire logic.
Do **not** redesign the full results page layout.

---

## Critical rules

- Ranking must remain unchanged.
- Interpretation must happen **after** ranking.
- Do not keep pair-specific composite logic as the primary mechanism.
- Do not treat every two-signal case as composite.
- Do not allow Scrum/Kanban proximity to become automatic composite interpretation.
- Keep interpretation logic outside page JSX.
- Keep route files thin.

---

## Required implementation areas

### 1. Add or refine methodology-role mapping

Create or update a utility such as:
- `src/lib/result/methodologyRoles.ts`

Use the role mapping from the spec:
- `gost34 -> governance`
- `waterfall -> sequential_delivery`
- `spiral -> risk_driven`
- `rup -> architecture_control`
- `scrum -> adaptive_iterations`
- `kanban -> flow_control`

---

### 2. Add or refine active-role detection

Create or update a utility such as:
- `src/lib/result/detectActiveRoles.ts`

Use the activation rules from the consolidated spec.

At minimum, support:
- governance
- risk_driven
- architecture_control
- adaptive_iterations
- flow_control
- sequential_delivery

This logic must stay explicit and testable.

---

### 3. Add operational-family support

Create or update a helper such as:
- `src/lib/result/roleFamilies.ts`

This helper is used only to improve interpretation logic, especially for `close_fit`.

It must help distinguish:
- true distinct-role composite cases
- nearby delivery alternatives such as Scrum vs Kanban

---

### 4. Implement consolidated recommendation mode detection

Create or update utilities such as:
- `src/lib/result/detectRecommendationMode.ts`
- `src/lib/result/buildRecommendationInterpretation.ts`

Support exactly:
- `single_fit`
- `composite_strategy`
- `close_fit`

Required behavior:

#### `composite_strategy`
Use when:
- top-1 and top-2 have different roles
- both roles are strongly active
- top-2 represents a distinct necessary process role

#### `close_fit`
Use when:
- composite is false
- top-1 and top-2 are close in ranking strength
- and either:
  - they belong to the same operational family
  - or top-2 does not represent a separate mandatory role

#### `single_fit`
Use otherwise.

Do not hide these decisions inside UI conditionals.

---

### 5. Implement anti-false-composite rules

You must explicitly prevent the following errors:

#### Error A — false Scrum complement in pure flow cases
If flow-control is dominant, Scrum must not become a critical complementary strategy unless adaptive-iterations is independently dominant.

#### Error B — false Kanban complement in ordinary Scrum cases
If adaptive-iterations is dominant, Kanban may appear as a close alternative but not as a critical complementary strategy unless flow-control is independently dominant.

#### Error C — governance erasing risk/architecture roles
Governance may strongly support GOST 34, but must not automatically erase:
- risk-driven interpretation
- architecture-control interpretation

This is especially important for regulated high-risk and regulated architecture-heavy systems.

---

### 6. Add support flags

Support at least:
- `architecture_supporting_option`
- `risk_supporting_option`

Suggested behavior:
- `architecture_supporting_option` when RUP is in top-3 and architecture-control conditions are active
- `risk_supporting_option` when Spiral is in top-3 and risk-driven conditions are active

These flags must enrich interpretation without changing ranking.

---

### 7. Extend result object or derived results view model

Expose interpretation in structured form, such as:
- `mode`
- `activeRoles`
- `supportFlags`
- `topMethodologyRole`
- `secondMethodologyRole`
- `methodologyLabels`

Choose the cleaner architecture based on the current codebase.
Do not bury this logic inside page components.

---

### 8. Update results-page rendering

Update the page so it can render:

#### For `single_fit`
- heading like `Primary recommendation`

#### For `composite_strategy`
- heading like `Composite strategy case`
- top-1 explained as dominant constraint match
- top-2 explained as critical complementary strategy

#### For `close_fit`
- heading like `Close alternative case`
- top-1 explained as current preference
- top-2 explained as a close alternative with different emphasis

If support flags are active:
- add compact support messaging for RUP or Spiral
- do not let support notes overpower top-1 or top-2

---

## Validation against required test cases

Your implementation must correctly support the following:

### Case 1 — IoMT
Ranking may remain:
- `GOST 34 > Spiral > RUP`

Expected interpretation:
- `composite_strategy`

Expected reading:
- GOST = governance/compliance layer
- Spiral = critical complementary risk strategy
- RUP = architecture-supporting option

### Case 2 — FinTech
Ranking may remain:
- `GOST 34 > RUP > Waterfall ...`

Expected interpretation:
- `composite_strategy`

Expected reading:
- GOST = governance/compliance layer
- RUP = critical complementary architecture/control strategy

### Case 3 — SaaS continuous delivery
Expected interpretation:
- `close_fit`

Expected reading:
- Kanban preferred
- Scrum close alternative

### Case 4 — Classic Scrum
Expected interpretation:
- `single_fit`

Expected reading:
- Scrum primary recommendation

### Case 5 — Support / Ops pure flow
Expected interpretation:
- `single_fit`

Expected reading:
- Kanban primary recommendation
- Scrum must not be treated as critical complementary strategy

---

## Suggested file structure

If useful, create or refine files such as:
- `src/lib/result/methodologyRoles.ts`
- `src/lib/result/detectActiveRoles.ts`
- `src/lib/result/roleFamilies.ts`
- `src/lib/result/detectRecommendationMode.ts`
- `src/lib/result/buildRecommendationInterpretation.ts`
- `src/lib/result/resultInterpretationTypes.ts`

Use project naming conventions if different.

---

## What not to do

- do not change methodology ranking order
- do not redesign questionnaire logic
- do not redesign the entire results page
- do not add more recommendation modes
- do not keep old pair-specific logic as the main solution
- do not implement export or persistence changes in this task

---

## Deliverables

When done, report:
1. files created or changed
2. where methodology-role mapping lives
3. where active-role detection lives
4. where operational-family logic lives
5. how recommendation mode is determined
6. how anti-false-composite rules are implemented
7. how interpretation is attached to results rendering
8. examples of `single_fit`, `composite_strategy`, and `close_fit`
9. any TODOs for later refinement
