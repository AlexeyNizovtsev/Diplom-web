# Codex Task — Add Recommendation Mode Interpretation Layer to Results Page

Implement a lightweight recommendation interpretation layer on top of the existing ranking output.

## Use these files as source of truth

- `AGENTS.md`
- `docs/frontend-architecture.md`
- `docs/result-object-schema.md`
- `docs/results-page-spec.md`
- `docs/recommendation-mode-mini-spec.md`

Also use the existing ranking pipeline and real results page implementation already present in the repository.

## Goal

Improve results-page explainability without changing the ranking model itself.

Add a post-ranking interpretation layer that classifies the result into one of three recommendation modes:

- `single_fit`
- `composite_strategy`
- `close_fit`

Also support the optional interpretation flag:
- `architecture_supporting_option`

This should help the results page explain cases where top-1 is correct, but top-2 remains strategically important for a different reason.

Do **not** change the existing ranking order.

---

## Critical rules

- Recommendation mode must be computed **after** ranking.
- Do not reorder methodologies.
- Do not replace the existing ranking logic.
- Keep route files thin.
- Keep interpretation logic outside page JSX.
- Preserve existing results-page design as much as possible.
- This task is about explainability, not scoring redesign.

---

## Required implementation areas

### 1. Add interpretation utility layer
Create a small post-ranking utility such as:

- `src/lib/result/detectRecommendationMode.ts`
- `src/lib/result/buildRecommendationInterpretation.ts`

This logic must:
- read the final dimension levels
- read the ranked methodology list
- assign one of the supported modes
- assign any applicable support flags
- assign methodology-level interpretation labels if needed

### 2. Implement supported modes
Support exactly:
- `single_fit`
- `composite_strategy`
- `close_fit`

Use the logic from `recommendation-mode-mini-spec.md`.

### 3. Implement support flag
Support:
- `architecture_supporting_option`

### 4. Extend result object or result-view model
Make the interpretation available to the results page in a clean structured form.

This can be added either:
- directly to the result object, or
- to a derived results page view model

Choose the cleaner architecture based on the current codebase.

### 5. Update results page rendering
Update the results page so that it can render:

#### For `single_fit`
- heading like `Primary recommendation`

#### For `composite_strategy`
- heading like `Composite strategy case`
- top-1 explained as dominant constraint match
- top-2 explained as critical complementary strategy

#### For `close_fit`
- heading like `Close alternative case`
- top-1 and top-2 explained as close alternatives with different emphasis

### 6. Add support-flag messaging
If `architecture_supporting_option` is active and `RUP` is in top-3:
- add a compact explanation that RUP remains relevant as an architecture-supporting option

This must not visually overpower top-1 or top-2.

---

## Important content behavior

Use interpretation to improve explanation wording such as:
- why top-1 ranks first
- why top-2 still matters
- whether the case should be read as single-fit, composite, or close-fit

Do not:
- present every case as hybrid
- weaken clear single-fit outputs
- turn close-fit into composite unless explicitly triggered

---

## Suggested UI adjustments

Keep visual changes limited and clean.

Possible additions:
- small interpretation heading near the top of the results page
- short interpretation summary block
- refined labels in ranked list items
- optional architecture-support note for RUP

Do not redesign the whole page.

---

## What not to do

- do not change methodology scores
- do not change ranking order
- do not redesign questionnaire logic
- do not implement export changes
- do not add many new modes
- do not add uncontrolled hybrid recommendation logic

---

## Deliverables

When done, report:
1. files created or changed
2. where recommendation mode logic lives
3. how interpretation is attached to result rendering
4. what UI text/sections changed
5. example of each mode if possible
6. any TODOs for future refinement
