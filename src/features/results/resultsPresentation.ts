import { buildRecommendationInterpretation } from "@/lib/result/buildRecommendationInterpretation";
import { buildInterpretationOverrides } from "@/lib/result/explanationTemplates";
import { getDimensionLevels } from "@/lib/result/interpretationContext";
import { getMethodologyRole } from "@/lib/result/methodologyRoles";
import type { ResultsDictionary } from "@/types/common";
import type { MethodologyId } from "@/types/methodology";
import type {
  AssessmentResult,
  FitTier,
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

export function getBestFitSectionCopy(
  interpretation: RecommendationInterpretation,
  content: ResultsDictionary,
) {
  if (interpretation.mode === "composite_strategy") {
    return {
      title: content.bestFit.compositeSectionTitle,
      description: content.bestFit.compositeSectionDescription,
      leadBadge: content.bestFit.compositeLeadBadge,
      complementBadge: content.bestFit.compositeComplementBadge,
    };
  }

  if (interpretation.mode === "close_fit") {
    return {
      title: content.bestFit.sectionTitle,
      description: content.bestFit.closeFitSectionDescription,
      leadBadge: content.bestFit.closeFitBadge,
      complementBadge: content.fitLabels.strongAlternative,
    };
  }

  return {
    title: content.bestFit.sectionTitle,
    description: content.bestFit.sectionDescription,
    leadBadge: content.bestFit.badge,
    complementBadge: content.fitLabels.strongAlternative,
  };
}

export function getMethodologyBadgeLabel(
  methodologyId: MethodologyId,
  fitTier: FitTier,
  interpretation: RecommendationInterpretation,
  content: ResultsDictionary,
) {
  const labels = getMethodologyInterpretationIds(methodologyId, interpretation);

  if (labels.includes("dominant_constraint_match")) {
    return content.bestFit.compositeLeadBadge;
  }

  if (labels.includes("critical_complementary_strategy")) {
    return content.bestFit.compositeComplementBadge;
  }

  if (labels.includes("best_current_fit")) {
    return content.bestFit.closeFitBadge;
  }

  if (interpretation.mode === "composite_strategy" && fitTier === "strongAlternative") {
    return content.alternatives.supportingBadge;
  }

  return content.fitLabels[fitTier];
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
  const locale = result.metadata?.locale ?? "en";
  const overrides = buildInterpretationOverrides({
    locale,
    topMethodologyId: topMethodology?.methodologyId,
    topMethodologyTitle:
      topMethodology?.methodologyTitle ?? topMethodology?.methodologyId,
    secondMethodologyId: secondMethodology?.methodologyId,
    secondMethodologyTitle:
      secondMethodology?.methodologyTitle ?? secondMethodology?.methodologyId,
    mode: interpretation.mode,
    rankingMethodologyIds: result.ranking.map((item) => item.methodologyId),
    levels: getDimensionLevels(result.dimensions),
  });
  const supportNotes = [
    ...overrides.supportNotes,
    ...interpretation.supportFlags
      .map((flag) => buildSupportNote(flag, result, content))
      .filter((note): note is string => Boolean(note)),
  ];

  return {
    interpretation,
    heading: content.interpretation.modeHeadings[interpretation.mode],
    summary:
      overrides.summary ?? content.interpretation.modeSummaries[interpretation.mode],
    primaryExplanation:
      overrides.primaryExplanation ??
      replaceTemplate(content.interpretation.primaryTemplates[interpretation.mode], {
        topMethodology:
          topMethodology?.methodologyTitle ?? topMethodology?.methodologyId,
        topRole: getRoleLabel(topRole, content),
      }),
    secondaryExplanation: secondMethodology
      ? overrides.secondaryExplanation ??
        replaceTemplate(content.interpretation.secondaryTemplates[interpretation.mode], {
          secondMethodology:
            secondMethodology.methodologyTitle ??
            secondMethodology.methodologyId,
          secondRole: getRoleLabel(secondRole, content),
        })
      : undefined,
    supportNotes,
  };
}
