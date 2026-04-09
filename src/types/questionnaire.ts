export type AssessmentBlockId =
  | "governance"
  | "requirements"
  | "risk"
  | "iteration"
  | "discipline"
  | "complexity";

export type DimensionKey =
  | "governanceFormalisation"
  | "requirementsStability"
  | "riskInnovationOrientation"
  | "iterationStructure"
  | "organisationalDiscipline"
  | "systemIntegrationComplexity";

export interface SignalMapping {
  target: DimensionKey;
  signalKey: string;
  value: 0 | 1 | 2 | 3;
}

export interface QuestionnaireOptionConfig {
  id: string;
  labelKey: string;
  descriptionKey?: string;
  signalMapping: SignalMapping[];
  triggersConditionalQuestionIds?: string[];
}

export interface ConditionalVisibilityRule {
  parentOptionIds: string[];
}

export interface ConditionalQuestionConfig {
  id: string;
  parentQuestionId: string;
  titleKey: string;
  helperTextKey?: string;
  required: boolean;
  options: QuestionnaireOptionConfig[];
  visibleWhen: ConditionalVisibilityRule;
}

export interface QuestionnaireQuestionConfig {
  id: string;
  titleKey: string;
  helperTextKey?: string;
  required: boolean;
  options: QuestionnaireOptionConfig[];
  conditionalQuestions?: ConditionalQuestionConfig[];
}

export interface QuestionnaireBlockConfig {
  id: AssessmentBlockId;
  dimensionKey: DimensionKey;
  titleKey: string;
  helperTextKey: string;
  shortLabelKey: string;
  questions: QuestionnaireQuestionConfig[];
}

export interface QuestionnaireConfig {
  version: string;
  blocks: QuestionnaireBlockConfig[];
}

export interface AssessmentStoredAnswer {
  questionId: string;
  selectedOptionId: string;
  resolvedSignalMapping: SignalMapping[];
}

export interface AssessmentProgress {
  questionnaireVersion: string;
  currentBlockId: AssessmentBlockId;
  answers: Record<string, AssessmentStoredAnswer>;
}

export interface LocalizedQuestionnaireOption {
  label: string;
  description: string;
}

export interface LocalizedQuestionnaireQuestion {
  title: string;
  helperText?: string;
  options: Record<string, LocalizedQuestionnaireOption>;
}

export interface LocalizedQuestionnaireBlock {
  shortLabel: string;
  title: string;
  helperText: string;
  questions: Record<string, LocalizedQuestionnaireQuestion>;
}

export interface LocalizedQuestionnaireContent {
  blocks: Record<AssessmentBlockId, LocalizedQuestionnaireBlock>;
}
