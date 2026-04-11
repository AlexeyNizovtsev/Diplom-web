import type { MethodologyId } from "@/types/methodology";
import type { DimensionKey } from "@/types/questionnaire";

export type DimensionLevel = 0 | 1 | 2 | 3;

export type FitTier = "bestFit" | "strongAlternative" | "moderateFit" | "lowerFit";

export type SensitivityStrength = "strong" | "medium" | "borderline";

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

export interface AssessmentResult {
  version: string;
  resultCode: string;
  createdAt: string;
  questionnaireVersion: string;
  methodologyOrder: MethodologyId[];
  topMethodologyId: MethodologyId;
  ranking: RankedMethodologyResult[];
  dimensions: DimensionResult[];
  summary: ResultSummary;
  sensitivityHint?: SensitivityHint;
  metadata?: ResultMetadata;
}
