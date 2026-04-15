import { methodologyIds, type MethodologyId } from "@/types/methodology";
import type { DimensionKey } from "@/types/questionnaire";
import type { FitTier, ResultReasonId } from "@/types/result";

import type { AggregatedDimensionSignals } from "@/lib/assessment/computeDimensionSignals";
import type { NormalizedAssessmentAnswers } from "@/lib/assessment/normalizeAnswers";
import {
  getDimensionLevels,
  isFlowExclusiveSignal,
  isStructuredIterationSignal,
  preferRiskDrivenOverAdaptiveIterations,
} from "@/lib/result/interpretationContext";

export interface MethodologyRankingEvaluation {
  methodologyId: MethodologyId;
  score: number;
  signatureScore: number;
  fitTier: FitTier;
  isTopFit: boolean;
  reasonIds: ResultReasonId[];
  highlightDimensionKeys: DimensionKey[];
}

type DimensionTargetProfile = Record<DimensionKey, number>;

interface RankingContext {
  selectedOptionIds: Record<string, string>;
  dimensionLevels: Record<DimensionKey, 0 | 1 | 2 | 3>;
  dimensionAverages: Record<DimensionKey, number>;
  linearVotes: number;
  milestoneVotes: number;
  structuredVotes: number;
  flowVotes: number;
  flowExclusive: boolean;
  structuredIterations: boolean;
  structuredIterationsWithStrongRisk: boolean;
  preferRiskDrivenComposite: boolean;
  strictGovernance: boolean;
  highGovernance: boolean;
  lowGovernance: boolean;
  stableRequirements: boolean;
  adaptiveRequirements: boolean;
  highRisk: boolean;
  lowRisk: boolean;
  disciplinedTeam: boolean;
  architectureHeavy: boolean;
  veryHighComplexity: boolean;
  integrationHeavy: boolean;
  strongExperimentation: boolean;
  criticalFailureImpact: boolean;
  heavyArchitectureRiskCase: boolean;
}

const methodologyDefaultOrder: MethodologyId[] = [
  "gost34",
  "waterfall",
  "spiral",
  "rup",
  "scrum",
  "kanban"
];

export const methodologyDimensionTargets: Record<MethodologyId, DimensionTargetProfile> = {
  waterfall: {
    governanceFormalisation: 2,
    requirementsStability: 3,
    riskInnovationOrientation: 0,
    iterationStructure: 0,
    organisationalDiscipline: 1,
    systemIntegrationComplexity: 1
  },
  spiral: {
    governanceFormalisation: 1,
    requirementsStability: 1,
    riskInnovationOrientation: 3,
    iterationStructure: 2,
    organisationalDiscipline: 1,
    systemIntegrationComplexity: 2
  },
  gost34: {
    governanceFormalisation: 3,
    requirementsStability: 2,
    riskInnovationOrientation: 1,
    iterationStructure: 0,
    organisationalDiscipline: 2,
    systemIntegrationComplexity: 2
  },
  rup: {
    governanceFormalisation: 2,
    requirementsStability: 2,
    riskInnovationOrientation: 2,
    iterationStructure: 2,
    organisationalDiscipline: 3,
    systemIntegrationComplexity: 3
  },
  scrum: {
    governanceFormalisation: 1,
    requirementsStability: 1,
    riskInnovationOrientation: 1,
    iterationStructure: 3,
    organisationalDiscipline: 2,
    systemIntegrationComplexity: 1
  },
  kanban: {
    governanceFormalisation: 0,
    requirementsStability: 1,
    riskInnovationOrientation: 1,
    iterationStructure: 3,
    organisationalDiscipline: 1,
    systemIntegrationComplexity: 1
  }
};

function countVotes(values: boolean[]) {
  return values.filter(Boolean).length;
}

function buildRankingContext(
  normalizedAnswers: NormalizedAssessmentAnswers,
  dimensions: AggregatedDimensionSignals[]
): RankingContext {
  const selectedOptionIds = Object.fromEntries(
    Object.values(normalizedAnswers.answersByQuestionId).map((answer) => [
      answer.questionId,
      answer.selectedOptionId
    ])
  );
  const dimensionAverages = Object.fromEntries(
    dimensions.map((dimension) => [dimension.dimensionKey, dimension.averageValue])
  ) as Record<DimensionKey, number>;
  const dimensionLevels = getDimensionLevels(dimensions);
  const linearVotes = countVotes([
    selectedOptionIds.deliveryRhythm === "linear",
    selectedOptionIds.reviewCadence === "atTheEnd",
    selectedOptionIds.workOrganisation === "generalPlan"
  ]);
  const milestoneVotes = countVotes([
    selectedOptionIds.deliveryRhythm === "milestoneBased",
    selectedOptionIds.reviewCadence === "byPhase",
    selectedOptionIds.workOrganisation === "batchedByMilestone"
  ]);
  const structuredVotes = countVotes([
    selectedOptionIds.deliveryRhythm === "structuredIterations",
    selectedOptionIds.reviewCadence === "regularIncrements",
    selectedOptionIds.workOrganisation === "sprintStyleCommitment"
  ]);
  const flowVotes = countVotes([
    selectedOptionIds.deliveryRhythm === "continuousFlow",
    selectedOptionIds.reviewCadence === "continuousOnDemand",
    selectedOptionIds.workOrganisation === "wipLimitedPullFlow"
  ]);

  return {
    selectedOptionIds,
    dimensionLevels,
    dimensionAverages,
    linearVotes,
    milestoneVotes,
    structuredVotes,
    flowVotes,
    flowExclusive: isFlowExclusiveSignal(dimensionLevels),
    structuredIterations: isStructuredIterationSignal(dimensionLevels),
    structuredIterationsWithStrongRisk:
      isStructuredIterationSignal(dimensionLevels) &&
      dimensionLevels.riskInnovationOrientation >= 3,
    preferRiskDrivenComposite:
      preferRiskDrivenOverAdaptiveIterations(dimensionLevels),
    strictGovernance:
      selectedOptionIds.regulatoryCompliance === "strictRegulatory" ||
      selectedOptionIds.stagedDocumentation === "veryHigh" ||
      selectedOptionIds.formalAcceptance === "veryHigh" ||
      dimensionAverages.governanceFormalisation >= 2.5,
    highGovernance: dimensionAverages.governanceFormalisation >= 2,
    lowGovernance: dimensionAverages.governanceFormalisation <= 1.25,
    stableRequirements: dimensionAverages.requirementsStability >= 2.1,
    adaptiveRequirements: dimensionAverages.requirementsStability <= 1.4,
    highRisk: dimensionAverages.riskInnovationOrientation >= 2.1,
    lowRisk: dimensionAverages.riskInnovationOrientation <= 1.25,
    disciplinedTeam: dimensionAverages.organisationalDiscipline >= 1.8,
    architectureHeavy:
      dimensionAverages.systemIntegrationComplexity >= 2 ||
      selectedOptionIds.architectureComplexity === "complex" ||
      selectedOptionIds.architectureComplexity === "veryComplex",
    veryHighComplexity:
      dimensionAverages.systemIntegrationComplexity >= 2.5 ||
      selectedOptionIds.architectureComplexity === "veryComplex",
    integrationHeavy: dimensionAverages.systemIntegrationComplexity >= 1.8,
    strongExperimentation:
      selectedOptionIds.technicalUncertainty === "high" ||
      selectedOptionIds.technicalUncertainty === "veryHigh" ||
      selectedOptionIds.rndCentrality === "significant" ||
      selectedOptionIds.rndCentrality === "core",
    criticalFailureImpact:
      selectedOptionIds.failureCriticality === "high" ||
      selectedOptionIds.failureCriticality === "critical",
    heavyArchitectureRiskCase:
      isStructuredIterationSignal(dimensionLevels) &&
      dimensionAverages.organisationalDiscipline >= 1.8 &&
      dimensionAverages.systemIntegrationComplexity >= 2.5 &&
      dimensionAverages.riskInnovationOrientation >= 2.4 &&
      (
        selectedOptionIds.technicalUncertainty === "high" ||
        selectedOptionIds.technicalUncertainty === "veryHigh" ||
        selectedOptionIds.rndCentrality === "significant" ||
        selectedOptionIds.rndCentrality === "core" ||
        selectedOptionIds.failureCriticality === "high" ||
        selectedOptionIds.failureCriticality === "critical"
      )
  };
}

function createAccumulator(methodologyId: MethodologyId) {
  return {
    methodologyId,
    score: 0,
    signatureScore: 0,
    reasonIds: [] as ResultReasonId[]
  };
}

function addReason(
  accumulator: ReturnType<typeof createAccumulator>,
  reasonId: ResultReasonId
) {
  if (!accumulator.reasonIds.includes(reasonId)) {
    accumulator.reasonIds.push(reasonId);
  }
}

function addPositive(
  accumulator: ReturnType<typeof createAccumulator>,
  points: number,
  reasonId?: ResultReasonId,
  options?: { signature?: number }
) {
  accumulator.score += points;
  accumulator.signatureScore += options?.signature ?? 0;

  if (reasonId) {
    addReason(accumulator, reasonId);
  }
}

function addPenalty(accumulator: ReturnType<typeof createAccumulator>, points: number) {
  accumulator.score -= points;
}

function evaluateMethodology(
  methodologyId: MethodologyId,
  context: RankingContext
) {
  const accumulator = createAccumulator(methodologyId);

  switch (methodologyId) {
    case "gost34":
      if (context.strictGovernance) {
        addPositive(accumulator, 7, "strictGovernance", { signature: 3 });
      }
      if (context.highGovernance) {
        addPositive(accumulator, 4, "regulatedEnvironment", { signature: 1 });
      }
      if (
        context.selectedOptionIds.formalAcceptance === "high" ||
        context.selectedOptionIds.formalAcceptance === "veryHigh"
      ) {
        addPositive(accumulator, 3, "formalAcceptance");
      }
      if (context.stableRequirements) {
        addPositive(accumulator, 2, "changeControlledScope");
      }
      if (context.disciplinedTeam) {
        addPositive(accumulator, 1, "disciplinedTeam");
      }
      if (context.flowVotes >= 2 || context.structuredVotes >= 2) {
        addPenalty(accumulator, 5);
      }
      if (context.adaptiveRequirements) {
        addPenalty(accumulator, 3);
      }
      break;

    case "waterfall":
      if (context.stableRequirements) {
        addPositive(accumulator, 6, "stableRequirements", { signature: 3 });
      }
      if (context.linearVotes >= 2) {
        addPositive(accumulator, 4, "linearDelivery", { signature: 2 });
      }
      if (context.milestoneVotes >= 2) {
        addPositive(accumulator, 3, "milestonePlanning");
      }
      if (context.highGovernance) {
        addPositive(accumulator, 2, "changeControlledScope");
      }
      if (context.lowRisk) {
        addPositive(accumulator, 1);
      }
      if (context.adaptiveRequirements) {
        addPenalty(accumulator, 5);
      }
      if (context.structuredVotes >= 2 || context.flowVotes >= 2) {
        addPenalty(accumulator, 4);
      }
      if (context.highRisk) {
        addPenalty(accumulator, 2);
      }
      break;

    case "spiral":
      if (context.highRisk) {
        addPositive(accumulator, 7, "highRiskExploration", { signature: 3 });
      }
      if (context.structuredIterationsWithStrongRisk) {
        addPositive(accumulator, 2, "highRiskExploration", { signature: 1 });
      }
      if (context.preferRiskDrivenComposite) {
        addPositive(accumulator, 4, "prototypingFocus", { signature: 2 });
      }
      if (context.strongExperimentation) {
        addPositive(accumulator, 3, "prototypingFocus", { signature: 1 });
      }
      if (context.criticalFailureImpact) {
        addPositive(accumulator, 2, "highRiskExploration", { signature: 1 });
      }
      if (context.heavyArchitectureRiskCase) {
        addPositive(accumulator, 3, "prototypingFocus", { signature: 1 });
      }
      if (context.integrationHeavy) {
        addPositive(accumulator, 1, "integrationComplexity");
      }
      if (context.stableRequirements && context.linearVotes >= 2) {
        addPenalty(accumulator, 3);
      }
      if (context.lowRisk) {
        addPenalty(accumulator, 3);
      }
      if (context.flowExclusive && !context.highRisk) {
        addPenalty(accumulator, 2);
      }
      break;

    case "rup":
      if (context.architectureHeavy) {
        addPositive(accumulator, 5, "architectureHeavy", { signature: 2 });
      }
      if (context.disciplinedTeam) {
        addPositive(accumulator, 4, "disciplinedTeam", { signature: 2 });
      }
      if (context.structuredIterations) {
        addPositive(accumulator, 1, "structuredIterations");
      } else if (context.milestoneVotes >= 2) {
        addPositive(accumulator, 2, "structuredIterations");
      }
      if (context.integrationHeavy) {
        addPositive(accumulator, 2, "integrationComplexity");
      }
      if (context.veryHighComplexity && context.disciplinedTeam) {
        addPositive(accumulator, 3, "architectureHeavy", { signature: 1 });
      }
      if (context.heavyArchitectureRiskCase) {
        addPositive(accumulator, 2, "integrationComplexity", { signature: 1 });
      }
      if (context.highGovernance && !context.strictGovernance) {
        addPositive(accumulator, 1, "changeControlledScope");
      }
      if (context.flowVotes >= 2) {
        addPenalty(accumulator, 2);
      }
      if (context.dimensionAverages.organisationalDiscipline < 1.2) {
        addPenalty(accumulator, 3);
      }
      break;

    case "scrum":
      if (context.structuredIterations) {
        addPositive(accumulator, 7, "structuredIterations", { signature: 3 });
      }
      if (context.adaptiveRequirements) {
        addPositive(accumulator, 5, "adaptiveScope", { signature: 2 });
      }
      if (context.disciplinedTeam) {
        addPositive(accumulator, 2, "disciplinedTeam");
      }
      if (context.selectedOptionIds.reviewCadence === "regularIncrements") {
        addPositive(accumulator, 2, "regularFeedback");
      }
      if (context.lowGovernance) {
        addPositive(accumulator, 2, "lowGovernancePressure");
      }
      if (context.strictGovernance) {
        addPenalty(accumulator, 5);
      }
      if (context.flowExclusive) {
        addPenalty(accumulator, 4);
      } else if (context.flowVotes >= 2) {
        addPenalty(accumulator, 2);
      }
      if (context.stableRequirements && context.linearVotes >= 2) {
        addPenalty(accumulator, 2);
      }
      if (context.preferRiskDrivenComposite) {
        addPenalty(accumulator, 4);
      }
      if (context.veryHighComplexity && context.disciplinedTeam) {
        addPenalty(accumulator, 3);
      }
      if (context.highRisk && context.strongExperimentation) {
        addPenalty(accumulator, 2);
      }
      if (context.heavyArchitectureRiskCase) {
        addPenalty(accumulator, 4);
      }
      break;

    case "kanban":
      if (context.flowExclusive) {
        addPositive(accumulator, 9, "continuousFlow", { signature: 4 });
      } else if (context.flowVotes >= 2) {
        addPositive(accumulator, 7, "continuousFlow", { signature: 3 });
      }
      if (context.selectedOptionIds.workOrganisation === "wipLimitedPullFlow") {
        addPositive(accumulator, 3, "wipLimitedDelivery", { signature: 1 });
      }
      if (context.adaptiveRequirements) {
        addPositive(accumulator, 4, "adaptiveScope", { signature: 1 });
      }
      if (context.lowGovernance) {
        addPositive(accumulator, 2, "lowGovernancePressure");
      }
      if (context.dimensionAverages.organisationalDiscipline >= 1.2) {
        addPositive(accumulator, 1, "disciplinedTeam");
      }
      if (context.strictGovernance) {
        addPenalty(accumulator, 5);
      }
      if (context.structuredVotes >= 2) {
        addPenalty(accumulator, 3);
      }
      if (context.architectureHeavy && context.highGovernance) {
        addPenalty(accumulator, 1);
      }
      break;
  }

  return accumulator;
}

function getHighlightDimensions(methodologyId: MethodologyId): DimensionKey[] {
  switch (methodologyId) {
    case "gost34":
      return [
        "governanceFormalisation",
        "requirementsStability",
        "organisationalDiscipline"
      ];
    case "waterfall":
      return [
        "requirementsStability",
        "iterationStructure",
        "governanceFormalisation"
      ];
    case "spiral":
      return [
        "riskInnovationOrientation",
        "systemIntegrationComplexity",
        "iterationStructure"
      ];
    case "rup":
      return [
        "systemIntegrationComplexity",
        "organisationalDiscipline",
        "iterationStructure"
      ];
    case "scrum":
      return [
        "iterationStructure",
        "requirementsStability",
        "organisationalDiscipline"
      ];
    case "kanban":
      return [
        "iterationStructure",
        "requirementsStability",
        "governanceFormalisation"
      ];
  }
}

function resolveFitTier(rank: number, scoreGapFromTop: number): FitTier {
  if (rank === 1) {
    return "bestFit";
  }

  if (scoreGapFromTop <= 2) {
    return "strongAlternative";
  }

  if (scoreGapFromTop <= 5) {
    return "moderateFit";
  }

  return "lowerFit";
}

export function rankMethodologies(
  normalizedAnswers: NormalizedAssessmentAnswers,
  dimensions: AggregatedDimensionSignals[]
): MethodologyRankingEvaluation[] {
  const context = buildRankingContext(normalizedAnswers, dimensions);
  const sortedEvaluations = methodologyIds
    .map((methodologyId) => evaluateMethodology(methodologyId, context))
    .sort((left, right) => {
      if (right.score !== left.score) {
        return right.score - left.score;
      }

      if (right.signatureScore !== left.signatureScore) {
        return right.signatureScore - left.signatureScore;
      }

      return (
        methodologyDefaultOrder.indexOf(left.methodologyId) -
        methodologyDefaultOrder.indexOf(right.methodologyId)
      );
    });
  const topScore = sortedEvaluations[0]?.score ?? 0;

  return sortedEvaluations.map((evaluation, index) => {
    const rank = index + 1;

    return {
      methodologyId: evaluation.methodologyId,
      score: evaluation.score,
      signatureScore: evaluation.signatureScore,
      fitTier: resolveFitTier(rank, topScore - evaluation.score),
      isTopFit: index === 0,
      reasonIds: evaluation.reasonIds,
      highlightDimensionKeys: getHighlightDimensions(evaluation.methodologyId)
    };
  });
}
