import type { ActiveRole, DimensionResult } from "@/types/result";

import {
  getDimensionLevels,
  isFlowExclusiveSignal,
  isStructuredIterationSignal,
} from "@/lib/result/interpretationContext";

export function getDimensionLevel(
  dimensions: DimensionResult[],
  dimensionKey: DimensionResult["dimensionKey"],
) {
  return (
    dimensions.find((dimension) => dimension.dimensionKey === dimensionKey)
      ?.level ?? 0
  );
}

export function detectActiveRoles(dimensions: DimensionResult[]): ActiveRole[] {
  const levels = getDimensionLevels(dimensions);
  const governanceLevel = getDimensionLevel(
    dimensions,
    "governanceFormalisation",
  );
  const stabilityLevel = getDimensionLevel(
    dimensions,
    "requirementsStability",
  );
  const riskLevel = getDimensionLevel(dimensions, "riskInnovationOrientation");
  const iterationLevel = getDimensionLevel(dimensions, "iterationStructure");
  const disciplineLevel = getDimensionLevel(
    dimensions,
    "organisationalDiscipline",
  );
  const complexityLevel = getDimensionLevel(
    dimensions,
    "systemIntegrationComplexity",
  );
  const activeRoles: ActiveRole[] = [];

  if (governanceLevel >= 3) {
    activeRoles.push("governance");
  }

  if (riskLevel >= 3) {
    activeRoles.push("risk_driven");
  }

  if (
    complexityLevel >= 3 &&
    disciplineLevel >= 2 &&
    iterationLevel >= 1
  ) {
    activeRoles.push("architecture_control");
  }

  if (isStructuredIterationSignal(levels)) {
    activeRoles.push("adaptive_iterations");
  }

  if (isFlowExclusiveSignal(levels)) {
    activeRoles.push("flow_control");
  }

  if (iterationLevel <= 1 && stabilityLevel >= 2) {
    activeRoles.push("sequential_delivery");
  }

  return activeRoles;
}
