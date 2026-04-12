import type { MethodologyId } from "@/types/methodology";
import type { AssessmentProgress, DimensionKey } from "@/types/questionnaire";

export type DimensionLevel = 0 | 1 | 2 | 3;

export type FitTier = "bestFit" | "strongAlternative" | "moderateFit" | "lowerFit";

export type SensitivityStrength = "strong" | "medium" | "borderline";

export type RecommendationMode =
  | "single_fit"
  | "composite_strategy"
  | "close_fit";

export type RecommendationSupportFlag = "architecture_supporting_option";

export type RecommendationInterpretationLabel =
  | "primary_recommendation"
  | "dominant_constraint_match"
  | "critical_complementary_strategy"
  | "best_current_fit"
  | "close_alternative"
  | "architecture_supporting_option";

export type ResultReasonId =
  | "strictGovernance"
  | "formalAcceptance"
  | "regulatedEnvironment"
  | "stableRequirements"
  | "changeControlledScope"
  | "adaptiveScope"
  | "linearDelivery"
  | "milestonePlanning"
  | "structuredIterations"
  | "regularFeedback"
  | "continuousFlow"
  | "wipLimitedDelivery"
  | "highRiskExploration"
  | "prototypingFocus"
  | "architectureHeavy"
  | "integrationComplexity"
  | "disciplinedTeam"
  | "lowGovernancePressure";

export interface ResultTag {
  id: string;
  labelKey: string;
  labelText?: string;
}

export interface DimensionSignal {
  signalKey: string;
  value: DimensionLevel;
}

export interface MethodologyDimensionHighlight {
  dimensionKey: DimensionKey;
  level: DimensionLevel;
  explanationKey?: string;
  explanationText?: string;
}

export interface RankedMethodologyResult {
  methodologyId: MethodologyId;
  methodologyTitle?: string;
  rank: number;
  score: number;
  fitTier: FitTier;
  fitLabelKey: string;
  shortRationaleKey?: string;
  shortRationaleText?: string;
  signalTags: ResultTag[];
  overviewKey?: string;
  overviewText?: string;
  dimensionHighlights: MethodologyDimensionHighlight[];
  outcomeKey?: string;
  outcomeText?: string;
  tradeoffKey?: string;
  tradeoffText?: string;
  isTopFit: boolean;
}

export interface DimensionResult {
  dimensionKey: DimensionKey;
  labelText?: string;
  level: DimensionLevel;
  summaryKey?: string;
  summaryText?: string;
  contributingSignals: DimensionSignal[];
}

export interface ResultSummary {
  titleKey?: string;
  titleText?: string;
  introKey?: string;
  introText?: string;
  topRecommendationKey?: string;
  topRecommendationText?: string;
}

export interface SensitivityHint {
  fitStrength: SensitivityStrength;
  closestAlternativeId?: MethodologyId;
  closestAlternativeTitle?: string;
  mostSensitiveDimensionKey?: DimensionKey;
  mostSensitiveDimensionLabel?: string;
  noteKey?: string;
  noteText?: string;
}

export interface ResultMetadata {
  generatedBy?: string;
  locale?: "en" | "ru";
  source?: "assessment" | "restored";
  debug?: Record<string, unknown>;
}

export interface RecommendationInterpretation {
  mode: RecommendationMode;
  supportFlags: RecommendationSupportFlag[];
  methodologyLabels: Partial<
    Record<MethodologyId, RecommendationInterpretationLabel[]>
  >;
}

export interface AssessmentResult {
  version: string;
  resultCode: string;
  createdAt: string;
  questionnaireVersion: string;
  answerSnapshot?: AssessmentProgress["answers"];
  methodologyOrder: MethodologyId[];
  topMethodologyId: MethodologyId;
  ranking: RankedMethodologyResult[];
  dimensions: DimensionResult[];
  summary: ResultSummary;
  sensitivityHint?: SensitivityHint;
  interpretation?: RecommendationInterpretation;
  metadata?: ResultMetadata;
}
