export type AssessmentBlockId =
  | "governance-formalisation"
  | "requirements-stability"
  | "risk-and-innovation-orientation"
  | "iteration-structure"
  | "organisational-discipline"
  | "system-and-integration-complexity";

export interface QuestionnaireBlockSummary {
  id: AssessmentBlockId;
  title: string;
  questionCount: number;
}

// TODO: align with docs/questionnaire-config-spec.md when the assessment flow is implemented.
