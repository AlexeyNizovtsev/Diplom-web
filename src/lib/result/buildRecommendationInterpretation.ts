import type { AssessmentResult } from "@/types/result";
import type {
  MethodologyId
} from "@/types/methodology";
import type {
  RecommendationInterpretation,
  RecommendationInterpretationLabel
} from "@/types/result";

import { detectRecommendationMode } from "@/lib/result/detectRecommendationMode";

function addMethodologyLabel(
  methodologyLabels: RecommendationInterpretation["methodologyLabels"],
  methodologyId: MethodologyId | undefined,
  label: RecommendationInterpretationLabel,
) {
  if (!methodologyId) {
    return;
  }

  const existingLabels = methodologyLabels[methodologyId] ?? [];

  if (!existingLabels.includes(label)) {
    methodologyLabels[methodologyId] = [...existingLabels, label];
  }
}

function hasDominantInterpretationLabel(
  methodologyLabels: RecommendationInterpretation["methodologyLabels"],
  methodologyId: MethodologyId | undefined,
) {
  if (!methodologyId) {
    return false;
  }

  return (methodologyLabels[methodologyId] ?? []).some(
    (label) =>
      label === "primary_recommendation" ||
      label === "dominant_constraint_match" ||
      label === "critical_complementary_strategy" ||
      label === "best_current_fit",
  );
}

export function buildRecommendationInterpretation(
  result: Pick<AssessmentResult, "dimensions" | "ranking">
): RecommendationInterpretation {
  const {
    activeRoles,
    mode,
    secondMethodologyRole,
    supportFlags,
    topMethodologyRole
  } = detectRecommendationMode(
    result.dimensions,
    result.ranking
  );
  const methodologyLabels: RecommendationInterpretation["methodologyLabels"] = {};
  const topMethodologyId = result.ranking[0]?.methodologyId;
  const secondMethodologyId = result.ranking[1]?.methodologyId;
  const architectureSupportMethodologyId = result.ranking
    .slice(0, 3)
    .find((item) => item.methodologyId === "rup")?.methodologyId;
  const riskSupportMethodologyId = result.ranking
    .slice(0, 3)
    .find((item) => item.methodologyId === "spiral")?.methodologyId;

  if (mode === "composite_strategy") {
    addMethodologyLabel(
      methodologyLabels,
      topMethodologyId,
      "dominant_constraint_match"
    );
    addMethodologyLabel(
      methodologyLabels,
      secondMethodologyId,
      "critical_complementary_strategy"
    );
  } else if (mode === "close_fit") {
    addMethodologyLabel(methodologyLabels, topMethodologyId, "best_current_fit");
    addMethodologyLabel(methodologyLabels, secondMethodologyId, "close_alternative");
  } else {
    addMethodologyLabel(methodologyLabels, topMethodologyId, "primary_recommendation");
  }

  if (
    supportFlags.includes("architecture_supporting_option") &&
    architectureSupportMethodologyId !== topMethodologyId &&
    !hasDominantInterpretationLabel(
      methodologyLabels,
      architectureSupportMethodologyId,
    )
  ) {
    addMethodologyLabel(
      methodologyLabels,
      architectureSupportMethodologyId,
      "architecture_supporting_option"
    );
  }

  if (
    supportFlags.includes("risk_supporting_option") &&
    riskSupportMethodologyId !== topMethodologyId &&
    !hasDominantInterpretationLabel(methodologyLabels, riskSupportMethodologyId)
  ) {
    addMethodologyLabel(
      methodologyLabels,
      riskSupportMethodologyId,
      "risk_supporting_option"
    );
  }

  return {
    activeRoles,
    mode,
    topMethodologyRole,
    secondMethodologyRole,
    supportFlags,
    methodologyLabels
  };
}
