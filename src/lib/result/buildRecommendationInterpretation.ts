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
  label: RecommendationInterpretationLabel
) {
  if (!methodologyId) {
    return;
  }

  const existingLabels = methodologyLabels[methodologyId] ?? [];

  if (!existingLabels.includes(label)) {
    methodologyLabels[methodologyId] = [...existingLabels, label];
  }
}

export function buildRecommendationInterpretation(
  result: Pick<AssessmentResult, "dimensions" | "ranking">
): RecommendationInterpretation {
  const { mode, supportFlags } = detectRecommendationMode(
    result.dimensions,
    result.ranking
  );
  const methodologyLabels: RecommendationInterpretation["methodologyLabels"] = {};
  const topMethodologyId = result.ranking[0]?.methodologyId;
  const secondMethodologyId = result.ranking[1]?.methodologyId;
  const architectureSupportMethodologyId = result.ranking
    .slice(0, 3)
    .find((item) => item.methodologyId === "rup")?.methodologyId;

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

  if (supportFlags.includes("architecture_supporting_option")) {
    addMethodologyLabel(
      methodologyLabels,
      architectureSupportMethodologyId,
      "architecture_supporting_option"
    );
  }

  return {
    mode,
    supportFlags,
    methodologyLabels
  };
}
