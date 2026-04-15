# Codex Task — Implement Re-run Case Corrections for Results Interpretation

Implement the targeted refinements identified after re-running the updated SDLC selection cases.

## Use these files as source of truth

- `AGENTS.md`
- `docs/frontend-architecture.md`
- `docs/result-object-schema.md`
- `docs/results-page-spec.md`
- `docs/re-run-case-corrections-spec.md`

Also use the existing ranking pipeline and results-page implementation already present in the repository.

## Goal

Refine the interpretation and explanation layer without redesigning the whole model.

This task must improve:
1. flow signal exclusivity
2. Scrum vs Spiral ordering in the regulated risk-heavy composite case
3. governance visibility in explanation
4. alternative explanation specificity
5. label consistency

The core ranking architecture should remain intact.

---

## Critical rules

- Do not redesign the questionnaire.
- Do not replace the role-based interpretation architecture.
- Do not introduce new recommendation modes.
- Keep ranking changes minimal and targeted.
- Preserve already-correct single-fit behavior in Scrum and Kanban cases.
- Keep interpretation logic outside page JSX.
- Keep route files thin.

---

## Required implementation areas

### 1. Enforce flow exclusivity

Refine the logic so that:

```ts
IterationStructure == 3
```

- strongly activates `flow_control`
- does not strengthen `adaptive_iterations` by default
- does not strengthen `risk_driven` by default

This must ensure that:
- Kanban is strengthened by pure flow
- Scrum is not inflated by flow
- Spiral is not inflated by flow

This is especially important for:
- support / ops cases
- SaaS flow-heavy cases

---

### 2. Refine structured-iteration handling

Refine the logic so that:

```ts
IterationStructure == 2
```

- strengthens `adaptive_iterations`
- moderately supports `architecture_control`
- strengthens `risk_driven` only when strong risk signals are present
- does not support `flow_control`

This should preserve:
- strong Scrum behavior in canonical sprint cases
- reasonable RUP support in disciplined iterative architecture cases
- no artificial Spiral boost without strong risk

---

### 3. Prefer Spiral over Scrum in the regulated high-risk architecture-heavy composite case

Implement an explicit calibration so that when all are true:

```ts
RiskInnovationOrientation >= 3
&& SystemIntegrationComplexity >= 3
&& GovernanceFormalisation >= 3
&& IterationStructure == 2
```

then:
- `risk_driven` is treated as stronger than `adaptive_iterations`
- Spiral should outrank Scrum when selecting the complementary method

This is required for the re-run IoMT-like case.

Do not implement this as an opaque one-off hack.
Keep it explicit and reviewable.

---

### 4. Preserve governance visibility in explanation

If:

```ts
GovernanceFormalisation >= 3
```

then the explanation layer must still mention:
- formal governance
- compliance pressure
- staged approval / acceptance context

This must remain true even when governance is not the dominant development-process driver.

Do not let governance disappear from narrative in heavily regulated cases.

---

### 5. Refine alternative explanations

Alternative methodology explanations must become role-specific and case-specific.

They must answer:
- why this method is lower here
- why it is not the main fit in this case

They must not remain generic summaries reused across incompatible contexts.

At minimum, sharpen alternative explanation logic for:
- Kanban
- Scrum
- Spiral
- RUP
- GOST 34
- Waterfall

Use the role-specific guidance in `docs/re-run-case-corrections-spec.md`.

---

### 6. Fix label collisions

Ensure that support-type labels:
- are never assigned to top-1 methodology
- are never shown on the primary recommendation card
- do not conflict with dominant labels on the same item

If useful, add a small validation layer or safer label-assignment logic.

---

## Validation against re-run cases

Your implementation must improve the following cases:

### Case A — IoMT / complex regulated-risk case
Current issue:
- Scrum is too high
- Spiral should outrank Scrum
- governance is underplayed in explanation

Expected:
- composite remains correct
- Spiral moves above Scrum
- explanation clearly states:
  - architecture + risk dominate process choice
  - governance remains strong in the environment

### Case B — Classic Scrum case
Expected:
- single-fit remains correct
- Scrum stays first
- Kanban remains second
- RUP becomes slightly weaker
- explanation better reflects backlog-managed change rather than weak informal change

### Case C — Support / Ops / pure Kanban case
Expected:
- Kanban remains first
- Scrum remains a weaker alternative only
- Spiral loses artificial flow-based support
- alternative explanations become more role-specific

### Case D — SaaS continuous-delivery / flow-heavy case
Expected:
- Kanban remains first
- no composite
- Scrum remains a weaker nearby alternative
- visual and textual interpretation should not imply near-equal methods
- Spiral does not gain from flow alone

---

## Suggested file areas

If useful, refine or extend files such as:
- `src/lib/result/detectActiveRoles.ts`
- `src/lib/result/detectRecommendationMode.ts`
- `src/lib/result/buildRecommendationInterpretation.ts`
- `src/lib/result/explanationTemplates.ts`
- `src/lib/result/labelAssignment.ts`

Use project conventions if naming differs.

---

## What not to do

- do not redesign the entire ranking model
- do not add new recommendation modes
- do not keep generic alternative explanations if more specific templates can be derived
- do not break the already-correct Kanban and Scrum single-fit cases
- do not add export or persistence changes in this task

---

## Deliverables

When done, report:
1. files created or changed
2. how flow exclusivity is implemented
3. how structured-iteration handling is refined
4. how Spiral is preferred over Scrum in the targeted composite case
5. how governance visibility is preserved in explanation
6. how alternative explanations are now differentiated
7. how label conflicts are prevented
8. any TODOs for later refinement
