import { buildRecommendationInterpretation } from "@/lib/result/buildRecommendationInterpretation";
import { getMethodologyRole } from "@/lib/result/methodologyRoles";
import type { ResultsDictionary } from "@/types/common";
import type { MethodologyId } from "@/types/methodology";
import type {
  AssessmentResult,
  MethodologyRole,
  RecommendationInterpretation,
  RecommendationSupportFlag,
} from "@/types/result";

export interface InterpretationPresentation {
  interpretation: RecommendationInterpretation;
  heading: string;
  summary: string;
  primaryExplanation: string;
  secondaryExplanation?: string;
  supportNotes: string[];
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
    (label) => content.interpretation.methodologyLabels[label] ?? label,
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

function getRoleLabel(
  role: MethodologyRole | undefined,
  content: ResultsDictionary,
) {
  if (!role) {
    return "";
  }

  return content.interpretation.roleLabels?.[role] ?? role.replaceAll("_", " ");
}

function buildSupportNote(
  flag: RecommendationSupportFlag,
  result: AssessmentResult,
  content: ResultsDictionary,
) {
  const template = content.interpretation.supportFlagTemplates[flag];

  if (!template) {
    return undefined;
  }

  const methodologyId =
    flag === "architecture_supporting_option" ? "rup" : "spiral";
  const methodology = result.ranking
    .slice(0, 3)
    .find((item) => item.methodologyId === methodologyId);

  if (!methodology) {
    return undefined;
  }

  return replaceTemplate(template, {
    methodology: methodology.methodologyTitle ?? methodology.methodologyId,
  });
}

export function buildInterpretationPresentation(
  result: AssessmentResult,
  content: ResultsDictionary,
): InterpretationPresentation {
  const interpretation = getRecommendationInterpretation(result);
  const topMethodology = result.ranking[0];
  const secondMethodology = result.ranking[1];
  const topRole =
    interpretation.topMethodologyRole ??
    (topMethodology ? getMethodologyRole(topMethodology.methodologyId) : undefined);
  const secondRole =
    interpretation.secondMethodologyRole ??
    (secondMethodology
      ? getMethodologyRole(secondMethodology.methodologyId)
      : undefined);

  return {
    interpretation,
    heading: content.interpretation.modeHeadings[interpretation.mode],
    summary: content.interpretation.modeSummaries[interpretation.mode],
    primaryExplanation: replaceTemplate(
      content.interpretation.primaryTemplates[interpretation.mode],
      {
        topMethodology:
          topMethodology?.methodologyTitle ?? topMethodology?.methodologyId,
        topRole: getRoleLabel(topRole, content),
      },
    ),
    secondaryExplanation: secondMethodology
      ? replaceTemplate(
          content.interpretation.secondaryTemplates[interpretation.mode],
          {
            secondMethodology:
              secondMethodology.methodologyTitle ??
              secondMethodology.methodologyId,
            secondRole: getRoleLabel(secondRole, content),
          },
        )
      : undefined,
    supportNotes: interpretation.supportFlags
      .map((flag) => buildSupportNote(flag, result, content))
      .filter((note): note is string => Boolean(note)),
  };
}
