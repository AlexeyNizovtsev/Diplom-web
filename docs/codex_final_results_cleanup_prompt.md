# Codex Task — Final Results Cleanup: Mode Labels, Flow Exclusivity, and Softer Lower-Fit Messaging

Implement the next cleanup pass for the SDLC selection results layer.

## Use these files as source of truth

- `AGENTS.md`
- `docs/frontend-architecture.md`
- `docs/result-object-schema.md`
- `docs/results-page-spec.md`
- `docs/final-results-cleanup-context.md`

Also use the current ranking pipeline and results-page implementation already present in the repository.

## Goal

Refine the results layer so that the UI wording and explanation behavior match the internal ranking and interpretation logic.

This task is **not** a redesign of the model.

This task is a cleanup pass focused on:
1. recommendation mode label consistency
2. composite-aware badge wording
3. flow exclusivity in the explanation layer
4. softer lower-fit wording
5. role-specific alternative explanation behavior
6. governance visibility in regulated composite cases

The core ranking architecture should remain intact.

---

## Critical rules

- Do not redesign the questionnaire.
- Do not replace the role-based interpretation architecture.
- Do not introduce new recommendation modes.
- Do not significantly rework core ranking unless absolutely required for one of the listed cleanup goals.
- Keep already-correct Scrum and Kanban single-fit behavior intact.
- Keep interpretation logic outside page JSX.
- Keep route files thin.

---

## Required implementation areas

### 1. Fix recommendation mode label consistency

Ensure the results page never mixes:
- a single-fit heading like `Primary recommendation`
with
- composite explanatory text

### Required behavior
- for single-fit cases: use `Primary recommendation`
- for composite cases: use `Composite strategy case` or an equivalent composite-aware heading
- the heading, summary block, and card badges must agree semantically

This is required especially for the current IoMT-like composite case.

---

### 2. Add composite-aware top-card badge wording

Current problem:
- composite cases still sometimes use top-1 badge language that belongs to single-fit cases

Replace single-fit top-1 badge wording in composite cases with composite-aware alternatives such as:
- `Dominant process driver`
- `Lead methodology in composite case`
- `Lead role match`

Choose the cleanest wording that fits the existing design and content style.

Do not use the same badge wording for both single-fit and composite top-1 cards.

---

### 3. Enforce flow exclusivity in the explanation layer

Refine explanation ownership so that:

```ts
IterationStructure == 3
```

means:
- continuous flow
- pull-based movement
- WIP control
- on-demand delivery

This should strengthen:
- Kanban

This should **not** strengthen by default:
- Scrum
- Spiral

Required effect:
- in flow-heavy SaaS and pure support cases, Scrum must not inherit full strength from `Iteration = 3`
- Spiral must not inherit full strength from `Iteration = 3`
- strongest-area messaging and explanation phrasing must reflect this exclusivity

If needed, implement this in explanation-building or strongest-area assignment rather than broad ranking changes.

---

### 4. Soften lower-fit outcome texts

Current problem:
- lower-fit cards still sound too imperative and operationally recommended

Required style change:
- replace direct action language with weaker, conditional language

Prefer patterns like:
- `Consider ... if ...`
- `This fit strengthens when ...`
- `A risk-driven approach becomes more relevant when ...`

Avoid patterns like:
- `Use ...`
- `Adopt ...`

This must apply especially to:
- Scrum and Spiral in Kanban-dominant flow cases
- Kanban and RUP in canonical Scrum cases
- non-leading methods in composite cases

---

### 5. Keep alternative explanations role-specific

Alternative-card explanations must explain:
- why the method is lower in the current case
- why it is not the dominant fit here
- which exact role it would become more relevant for if the context changed

Do not rely on generic methodology summaries as lower-fit text.

At minimum, keep clear separation between:
- Kanban = flow / pull / WIP / on-demand delivery
- Scrum = sprint cadence / review loop / backlog discipline
- Spiral = uncertainty reduction / prototyping / technical risk
- RUP = architecture-first coordination / disciplined iterations / integration control
- GOST 34 = governance / compliance / staged approval
- Waterfall = stable scope / linear progression / controlled change

---

### 6. Preserve governance visibility in regulated composite cases

When:

```ts
GovernanceFormalisation >= 3
```

and the case is composite,
ensure the explanation layer still clearly mentions:
- governance pressure
- compliance environment
- staged approval / formal acceptance context

This should remain visible even when governance is not the dominant development-process driver.

In other words:
- governance should no longer automatically dominate ranking
- but it also must not disappear from explanation

This is required especially for the regulated high-risk composite case.

---

## Validation against current key cases

Your changes must preserve or improve the following readings:

### Case A — IoMT-like complex regulated / high-risk / high-complexity case
Current acceptable ranking:
- Spiral
- RUP
- Scrum
- GOST 34
- ...

Required interpretation:
- composite-aware heading and badges
- Spiral = dominant process driver
- RUP = critical architecture / integration complement
- GOST 34 = governance / compliance environment constraint
- no single-fit wording on the top card

### Case B — Flow-heavy SaaS case
Current acceptable ranking:
- Kanban
- Scrum
- Spiral
- ...

Required interpretation:
- single-fit remains correct
- Kanban clearly owns the flow signal
- Scrum remains a weaker nearby alternative
- Spiral does not inherit flow ownership
- lower-fit texts become more conditional

### Case C — Pure support / operations case
Current acceptable ranking:
- Kanban
- Scrum
- Spiral
- ...

Required interpretation:
- single-fit remains correct
- Kanban clearly first
- Scrum weaker only
- Spiral not boosted by flow
- lower-fit cards sound clearly secondary

### Case D — Classic Scrum case
Current acceptable ranking:
- Scrum
- Kanban
- RUP
- ...

Required interpretation:
- single-fit remains correct
- Scrum stays clearly first
- Kanban and RUP remain weaker and conditionally framed

---

## Suggested file areas

If useful, refine or extend files such as:
- `src/lib/result/buildRecommendationInterpretation.ts`
- `src/lib/result/detectRecommendationMode.ts`
- `src/lib/result/explanationTemplates.ts`
- `src/lib/result/resultsPresentation.ts`
- `src/lib/result/labelAssignment.ts`
- `src/features/results/ResultsPageView.tsx`

Use project naming conventions if they differ.

---

## What not to do

- do not redesign the whole ranking model
- do not add new recommendation modes
- do not reintroduce pair-specific composite hacks
- do not make lower-fit alternatives sound equal to the winner
- do not break already-correct Scrum and Kanban single-fit cases
- do not include export or persistence changes in this task

---

## Deliverables

When done, report:
1. files created or changed
2. how recommendation-mode label consistency is enforced
3. how composite-aware badge wording is assigned
4. how flow exclusivity is enforced in explanation ownership
5. how lower-fit texts are softened
6. how role-specific alternative explanations are preserved
7. how governance visibility is maintained in regulated composite cases
8. any TODOs for later refinement
