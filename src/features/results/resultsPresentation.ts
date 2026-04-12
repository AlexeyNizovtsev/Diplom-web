import { buildRecommendationInterpretation } from "@/lib/result/buildRecommendationInterpretation";
import type { ResultsDictionary } from "@/types/common";
import type { MethodologyId } from "@/types/methodology";
import type {
  AssessmentResult,
  RecommendationInterpretation,
} from "@/types/result";

export interface InterpretationPresentation {
  interpretation: RecommendationInterpretation;
  heading: string;
  summary: string;
  primaryExplanation: string;
  secondaryExplanation?: string;
  supportNote?: string;
}

function replaceTemplate(
  template: string,
  values: Record<string, string | undefined>,
) {
  return Object.entries(values).reduce(
    (result, [key, value]) => result.replaceAll(`{${key}}`, value ?? ""),
    template,
  );
}

export function getRecommendationInterpretation(result: AssessmentResult) {
  return result.interpretation ?? buildRecommendationInterpretation(result);
}

export function getMethodologyInterpretationIds(
  methodologyId: MethodologyId,
  interpretation: RecommendationInterpretation,
) {
  return interpretation.methodologyLabels[methodologyId] ?? [];
}

export function getMethodologyInterpretationLabels(
  methodologyId: MethodologyId,
  interpretation: RecommendationInterpretation,
  content: ResultsDictionary,
) {
  return getMethodologyInterpretationIds(methodologyId, interpretation).map(
    (label) => content.interpretation.methodologyLabels[label],
  );
}

export function hasPriorityInterpretationLabel(
  methodologyId: MethodologyId,
  interpretation: RecommendationInterpretation,
) {
  return getMethodologyInterpretationIds(methodologyId, interpretation).some(
    (label) =>
      label === "primary_recommendation" ||
      label === "dominant_constraint_match" ||
      label === "critical_complementary_strategy",
  );
}

export function buildInterpretationPresentation(
  result: AssessmentResult,
  content: ResultsDictionary,
): InterpretationPresentation {
  const interpretation = getRecommendationInterpretation(result);
  const topMethodology = result.ranking[0];
  const secondMethodology = result.ranking[1];
  const architectureSupportMethodology = result.ranking
    .slice(0, 3)
    .find((item) => item.methodologyId === "rup");

  return {
    interpretation,
    heading: content.interpretation.modeHeadings[interpretation.mode],
    summary: content.interpretation.modeSummaries[interpretation.mode],
    primaryExplanation: replaceTemplate(
      content.interpretation.primaryTemplates[interpretation.mode],
      {
        topMethodology:
          topMethodology?.methodologyTitle ?? topMethodology?.methodologyId,
      },
    ),
    secondaryExplanation: secondMethodology
      ? replaceTemplate(
          content.interpretation.secondaryTemplates[interpretation.mode],
          {
            secondMethodology:
              secondMethodology.methodologyTitle ??
              secondMethodology.methodologyId,
          },
        )
      : undefined,
    supportNote:
      interpretation.supportFlags.includes("architecture_supporting_option") &&
      architectureSupportMethodology
        ? replaceTemplate(
            content.interpretation.supportFlagTemplates
              .architecture_supporting_option,
            {
              methodology:
                architectureSupportMethodology.methodologyTitle ??
                architectureSupportMethodology.methodologyId,
            },
          )
        : undefined,
  };
}
