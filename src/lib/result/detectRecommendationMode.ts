import type {
  DimensionResult,
  RankedMethodologyResult,
  RecommendationMode,
  RecommendationSupportFlag
} from "@/types/result";

const CLOSE_FIT_SCORE_GAP_THRESHOLD = 1;

function getDimensionLevel(
  dimensions: DimensionResult[],
  dimensionKey: DimensionResult["dimensionKey"]
) {
  return dimensions.find((dimension) => dimension.dimensionKey === dimensionKey)?.level ?? 0;
}

function isCompositeStrategyCase(
  dimensions: DimensionResult[],
  ranking: RankedMethodologyResult[]
) {
  const governanceLevel = getDimensionLevel(dimensions, "governanceFormalisation");
  const riskLevel = getDimensionLevel(dimensions, "riskInnovationOrientation");
  const secondMethodologyId = ranking[1]?.methodologyId;

  return (
    governanceLevel >= 3 &&
    riskLevel >= 3 &&
    secondMethodologyId === "spiral"
  );
}

function isCloseFitCase(ranking: RankedMethodologyResult[]) {
  const [topMethodology, secondMethodology] = ranking;

  if (!topMethodology || !secondMethodology) {
    return false;
  }

  return topMethodology.score - secondMethodology.score <= CLOSE_FIT_SCORE_GAP_THRESHOLD;
}

function detectSupportFlags(
  dimensions: DimensionResult[],
  ranking: RankedMethodologyResult[]
) {
  const supportFlags: RecommendationSupportFlag[] = [];
  const complexityLevel = getDimensionLevel(dimensions, "systemIntegrationComplexity");
  const disciplineLevel = getDimensionLevel(dimensions, "organisationalDiscipline");
  const iterationLevel = getDimensionLevel(dimensions, "iterationStructure");
  const topThreeMethodologyIds = ranking.slice(0, 3).map((item) => item.methodologyId);

  if (
    complexityLevel >= 3 &&
    disciplineLevel >= 2 &&
    iterationLevel >= 2 &&
    topThreeMethodologyIds.includes("rup")
  ) {
    supportFlags.push("architecture_supporting_option");
  }

  return supportFlags;
}

export function detectRecommendationMode(
  dimensions: DimensionResult[],
  ranking: RankedMethodologyResult[]
): {
  mode: RecommendationMode;
  supportFlags: RecommendationSupportFlag[];
} {
  const mode = isCompositeStrategyCase(dimensions, ranking)
    ? "composite_strategy"
    : isCloseFitCase(ranking)
      ? "close_fit"
      : "single_fit";

  return {
    mode,
    supportFlags: detectSupportFlags(dimensions, ranking)
  };
}

export { CLOSE_FIT_SCORE_GAP_THRESHOLD };
