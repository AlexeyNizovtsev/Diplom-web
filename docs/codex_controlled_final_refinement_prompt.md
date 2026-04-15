# Codex Task — Controlled Final Refinement of Results Logic and Presentation

Implement the next controlled refinement pass for the SDLC selection results layer.

## Use these files as source of truth

- `AGENTS.md`
- `docs/frontend-architecture.md`
- `docs/result-object-schema.md`
- `docs/results-page-spec.md`
- `docs/current-case-context-for-codex.md`

Also use the current ranking pipeline and results-page implementation already present in the repository.

## Goal

Refine the current model without reopening broad redesign.

The model now already behaves like a real rule-based decision-support prototype.
This task must focus only on the remaining critical issues:

1. flow signal exclusivity
2. composite-mode wording consistency
3. separating critical complement from lower-fit visual treatment
4. recalibrating heavy Scrum vs RUP vs Spiral cases

Do not redesign the questionnaire.
Do not add new recommendation modes.
Do not undo already-correct pure methodology wins.

---

## Critical rules

- Keep ranking changes minimal and targeted.
- Preserve correct behavior for pure GOST, Waterfall, Scrum, and Kanban cases.
- Keep interpretation logic outside page JSX.
- Keep route files thin.
- Do not reintroduce pair-specific composite hacks as the main mechanism.
- Do not let lower-fit alternatives look equivalent to either a winner or a critical complement.

---

## Required implementation areas

### 1. Enforce flow signal exclusivity

Refine the logic so that:

```ts
IterationStructure == 3
```

means:
- continuous flow
- pull-based movement
- WIP control
- on-demand delivery

This must strengthen:
- Kanban

This must **not** automatically strengthen:
- Scrum
- Spiral

Refine the model and/or explanation ownership so that:
- Iteration = 2 strengthens Scrum
- Iteration = 2 may partially support RUP
- Iteration = 3 does not leak into Scrum or Spiral strongest-area messaging

This is still the most important remaining structural issue.

---

### 2. Fix composite-mode wording consistency

Ensure the UI never mixes:
- single-fit wording
with
- composite interpretation text

### Required behavior

#### Single-fit mode
Use wording like:
- `Primary recommendation`

#### Composite mode
Use wording like:
- `Composite strategy case`
- or `Composite recommendation`

The page header, summary text, and methodology badges must agree semantically.

Do not keep single-fit wording in composite cases.

---

### 3. Separate critical complement from lower fit

In composite cases, a methodology explicitly described as structurally important must not look like an ordinary weak alternative.

Introduce or refine composite-aware categories such as:
- `Lead role match`
- `Critical complement`
- `Supporting alternative`

Required effect:
- the second methodology in a composite case must not be visually degraded if the explanation says it is strategically essential
- lower-fit alternatives must remain clearly weaker than a true critical complement

This is both an interpretation and presentation consistency issue.

---

### 4. Recalibrate heavy Scrum vs RUP vs Spiral cases

This is the final meaningful ranking issue.

Refine the logic so that in very heavy cases with:
- very high complexity
- extensive integrations
- high risk
- strong uncertainty or experimentation
- structured iterations
- adequate organisational discipline

Scrum does not become top-1 too easily.

### Required direction

Reduce Scrum priority when all or most of the following are present:
- high risk
- very high complexity
- strong experimentation or technical uncertainty
- sufficient discipline for heavier process control

Increase RUP priority when:
- complexity is very high
- integrations are extensive
- discipline is established

Increase Spiral priority when:
- uncertainty is high
- failure consequences are critical
- prototyping or experimentation matters meaningfully

Do not implement this as an opaque one-off hack.
Keep the logic explicit and reviewable.

---

### 5. Keep methodology-family guidance aligned

Preserve the following role logic while refining results:

- GOST 34 = governance / compliance layer
- Waterfall = stable linear execution
- RUP = architecture and integration control
- Spiral = risk-driven development
- Scrum = adaptive structured iterations
- Kanban = flow control / pull delivery

Alternative explanations and strongest-area ownership must remain aligned with these roles.

---

## Validation against current case groups

Your implementation must preserve or improve the following:

### Pure GOST case
Expected:
- GOST remains first
- single-fit remains correct

### Pure Waterfall case
Expected:
- Waterfall remains first
- distinguishable from GOST

### Classic Scrum case
Expected:
- Scrum remains first
- Kanban remains second
- single-fit remains correct

### Kanban case
Expected:
- Kanban remains first
- Scrum remains second
- single-fit remains correct

### Complex regulated and high-risk case
Expected:
- composite interpretation remains correct
- governance remains visible but does not automatically dominate
- Spiral and/or RUP can lead appropriately depending on the internal scores
- UI wording must be composite-consistent

### Enterprise modernization boundary case
Expected:
- composite remains possible where appropriate
- RUP is not visually downplayed if it is a critical complement
- Scrum does not look excessively dominant when architecture complexity is extremely high

### Heavy RUP vs Spiral boundary case
Expected:
- Scrum should not too easily outrank both RUP and Spiral
- leadership should move toward RUP, Spiral, or a composite centered on them when heavy architecture and heavy risk coexist

---

## Suggested file areas

If useful, refine or extend files such as:
- `src/lib/result/interpretationContext.ts`
- `src/lib/result/rankMethodologies.ts`
- `src/lib/result/detectRecommendationMode.ts`
- `src/lib/result/buildRecommendationInterpretation.ts`
- `src/lib/result/resultsPresentation.ts`
- `src/lib/result/explanationTemplates.ts`
- `src/lib/result/labelAssignment.ts`
- `src/features/results/ResultsPageView.tsx`

Use project naming conventions if different.

---

## What not to do

- do not redesign the entire model
- do not add more recommendation modes
- do not break already-correct pure methodology cases
- do not use pair-specific hacks as the primary solution
- do not treat critical complements and weak alternatives as the same visual class
- do not include export or persistence changes in this task

---

## Deliverables

When done, report:
1. files created or changed
2. how flow exclusivity is enforced
3. how composite-mode wording consistency is enforced
4. how critical complement is separated from lower-fit treatment
5. how heavy Scrum vs RUP vs Spiral recalibration is implemented
6. how methodology-role alignment is preserved
7. any TODOs for future refinement
