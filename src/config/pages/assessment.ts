import type { AssessmentBlockId } from "@/types/questionnaire";

export const assessmentBlockOrder: readonly AssessmentBlockId[] = [
  "governance-formalisation",
  "requirements-stability",
  "risk-and-innovation-orientation",
  "iteration-structure",
  "organisational-discipline",
  "system-and-integration-complexity"
];

export const firstAssessmentBlockId = assessmentBlockOrder[0];

// TODO: replace this lightweight page config with questionnaire block config wiring.
