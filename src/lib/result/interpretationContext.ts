import type { AggregatedDimensionSignals } from "@/lib/assessment/computeDimensionSignals";
import type { DimensionKey } from "@/types/questionnaire";
import type { DimensionResult } from "@/types/result";

type DimensionSource =
  | Pick<AggregatedDimensionSignals, "dimensionKey" | "level">
  | Pick<DimensionResult, "dimensionKey" | "level">;

export type DimensionLevelMap = Record<DimensionKey, 0 | 1 | 2 | 3>;

const defaultDimensionLevels: DimensionLevelMap = {
  governanceFormalisation: 0,
  requirementsStability: 0,
  riskInnovationOrientation: 0,
  iterationStructure: 0,
  organisationalDiscipline: 0,
  systemIntegrationComplexity: 0,
};

export function getDimensionLevels(
  dimensions: DimensionSource[],
): DimensionLevelMap {
  return dimensions.reduce<DimensionLevelMap>(
    (levels, dimension) => ({
      ...levels,
      [dimension.dimensionKey]: dimension.level,
    }),
    defaultDimensionLevels,
  );
}

export function isFlowExclusiveSignal(levels: DimensionLevelMap) {
  return levels.iterationStructure === 3;
}

export function isStructuredIterationSignal(levels: DimensionLevelMap) {
  return levels.iterationStructure === 2;
}

export function preferRiskDrivenOverAdaptiveIterations(
  levels: DimensionLevelMap,
) {
  return (
    levels.riskInnovationOrientation >= 3 &&
    levels.systemIntegrationComplexity >= 3 &&
    levels.governanceFormalisation >= 3 &&
    levels.iterationStructure === 2
  );
}

export function hasStrongGovernanceEnvironment(levels: DimensionLevelMap) {
  return levels.governanceFormalisation >= 3;
}
