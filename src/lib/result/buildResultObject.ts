import type { ResultsDictionary } from "@/types/common";
import type { MethodologyContentMap, MethodologyId } from "@/types/methodology";
import type {
  AssessmentProgress,
  DimensionKey,
  QuestionnaireConfig
} from "@/types/questionnaire";
import type {
  AssessmentResult,
  DimensionResult,
  FitTier,
  ResultReasonId,
  SensitivityStrength
} from "@/types/result";

import { computeDimensionSignals } from "@/lib/assessment/computeDimensionSignals";
import { normalizeAnswers } from "@/lib/assessment/normalizeAnswers";
import { buildRecommendationInterpretation } from "@/lib/result/buildRecommendationInterpretation";
import {
  methodologyDimensionTargets,
  rankMethodologies
} from "@/lib/result/rankMethodologies";

const RESULT_SCHEMA_VERSION = "1.0.0";

interface BuildResultObjectOptions {
  questionnaire: QuestionnaireConfig;
  answers: AssessmentProgress["answers"];
  locale: "en" | "ru";
  resultsDictionary: ResultsDictionary;
  methodologyContentMap: MethodologyContentMap;
  dimensionLabels: Record<DimensionKey, string>;
}

function replaceTemplate(
  template: string,
  values: Record<string, string | undefined>
) {
  return Object.entries(values).reduce(
    (result, [key, value]) => result.replaceAll(`{${key}}`, value ?? ""),
    template
  );
}

function joinPhrases(locale: "en" | "ru", phrases: string[]) {
  if (phrases.length <= 1) {
    return phrases[0] ?? "";
  }

  if (phrases.length === 2) {
    return locale === "ru"
      ? `${phrases[0]} и ${phrases[1]}`
      : `${phrases[0]} and ${phrases[1]}`;
  }

  const lastPhrase = phrases[phrases.length - 1];
  const initialPhrases = phrases.slice(0, -1).join(", ");

  return locale === "ru"
    ? `${initialPhrases} и ${lastPhrase}`
    : `${initialPhrases}, and ${lastPhrase}`;
}

function createResultCode(seed: string, createdAt: string) {
  let hash = 0;

  for (const character of seed) {
    hash = (hash * 31 + character.charCodeAt(0)) >>> 0;
  }

  const timestampPart = Number(Date.parse(createdAt)).toString(36).slice(-6).toUpperCase();
  const hashPart = hash.toString(36).slice(0, 4).toUpperCase().padStart(4, "0");

  // TODO: replace this local-only code with a more durable share/restore strategy.
  return `MM-${timestampPart}-${hashPart}`;
}

function resolveReasons(
  reasonIds: ResultReasonId[],
  dictionary: ResultsDictionary,
  locale: "en" | "ru",
  limit: number
) {
  const phrases = reasonIds
    .slice(0, limit)
    .map((reasonId) => dictionary.narrative.reasonPhrases[reasonId]);

  return joinPhrases(locale, phrases);
}

function resolveFitLabelKey(prefix: string, fitTier: FitTier) {
  return `${prefix}.${fitTier}`;
}

function resolveSensitivityStrength(scoreGap: number): SensitivityStrength {
  if (scoreGap >= 4) {
    return "strong";
  }

  if (scoreGap >= 2) {
    return "medium";
  }

  return "borderline";
}

function resolveMostSensitiveDimensionKey(
  topMethodologyId: MethodologyId,
  closestAlternativeId: MethodologyId,
  dimensionAverages: Record<DimensionKey, number>
) {
  let strongestDifference: { key: DimensionKey; value: number } | null = null;

  for (const [dimensionKey, projectValue] of Object.entries(dimensionAverages) as Array<
    [DimensionKey, number]
  >) {
    const topDistance = Math.abs(
      projectValue - methodologyDimensionTargets[topMethodologyId][dimensionKey]
    );
    const alternativeDistance = Math.abs(
      projectValue - methodologyDimensionTargets[closestAlternativeId][dimensionKey]
    );
    const difference = Math.abs(alternativeDistance - topDistance);

    if (!strongestDifference || difference > strongestDifference.value) {
      strongestDifference = {
        key: dimensionKey,
        value: difference
      };
    }
  }

  return strongestDifference?.key;
}

function resolveTopDimensionHighlights(
  methodologyId: MethodologyId,
  dimensions: ReturnType<typeof computeDimensionSignals>,
  dimensionAverages: Record<DimensionKey, number>,
  resultsDictionary: ResultsDictionary
) {
  return dimensions
    .map((dimension) => {
      const targetValue = methodologyDimensionTargets[methodologyId][dimension.dimensionKey];
      const matchScore = 3 - Math.abs(dimensionAverages[dimension.dimensionKey] - targetValue);

      return {
        dimensionKey: dimension.dimensionKey,
        level: dimension.level,
        explanationText: resultsDictionary.dimensions[dimension.dimensionKey].summaries[dimension.level],
        matchScore
      };
    })
    .sort((left, right) => {
      if (right.matchScore !== left.matchScore) {
        return right.matchScore - left.matchScore;
      }

      return right.level - left.level;
    })
    .slice(0, 3)
    .map(({ matchScore: _matchScore, ...highlight }) => highlight);
}

export function buildResultObject({
  questionnaire,
  answers,
  locale,
  resultsDictionary,
  methodologyContentMap,
  dimensionLabels
}: BuildResultObjectOptions): AssessmentResult {
  const normalizedAnswers = normalizeAnswers(questionnaire, answers);

  if (!normalizedAnswers.isComplete) {
    throw new Error("Cannot build a result object from an incomplete assessment.");
  }

  const dimensions = computeDimensionSignals(
    questionnaire.blocks.map((block) => block.dimensionKey),
    normalizedAnswers.answers
  );
  const rankingEvaluations = rankMethodologies(normalizedAnswers, dimensions);
  const createdAt = new Date().toISOString();
  const dimensionAverages = Object.fromEntries(
    dimensions.map((dimension) => [dimension.dimensionKey, dimension.averageValue])
  ) as Record<DimensionKey, number>;
  const ranking: AssessmentResult["ranking"] = rankingEvaluations.map((evaluation) => {
    const methodologyContent = methodologyContentMap[evaluation.methodologyId];
    const fallbackReasonIds: ResultReasonId[] =
      evaluation.reasonIds.length > 0 ? evaluation.reasonIds : ["disciplinedTeam"];
    const shortReasons = resolveReasons(fallbackReasonIds, resultsDictionary, locale, 2);
    const overviewReasons = resolveReasons(fallbackReasonIds, resultsDictionary, locale, 3);

    return {
      methodologyId: evaluation.methodologyId,
      methodologyTitle: methodologyContent.title,
      rank: 0,
      score: evaluation.score,
      fitTier: evaluation.fitTier,
      fitLabelKey: resolveFitLabelKey(resultsDictionary.narrative.fitLabelKeyPrefix, evaluation.fitTier),
      shortRationaleText: replaceTemplate(resultsDictionary.narrative.shortRationaleTemplate, {
        reasons: shortReasons
      }),
      signalTags: methodologyContent.overview.signalTags.slice(0, 3).map((tag) => ({
        id: tag.id,
        labelKey: `methodology.${evaluation.methodologyId}.signalTags.${tag.id}`,
        labelText: tag.label
      })),
      overviewText: replaceTemplate(
        evaluation.isTopFit
          ? resultsDictionary.narrative.topOverviewTemplate
          : resultsDictionary.narrative.alternativeOverviewTemplate,
        {
          methodology: methodologyContent.title,
          reasons: overviewReasons
        }
      ),
      dimensionHighlights: resolveTopDimensionHighlights(
        evaluation.methodologyId,
        dimensions,
        dimensionAverages,
        resultsDictionary
      ),
      outcomeText: resultsDictionary.narrative.outcomeTexts[evaluation.methodologyId],
      tradeoffText: "",
      isTopFit: evaluation.isTopFit
    };
  });
  const topRanking = ranking[0];
  const closestAlternative = ranking[1];

  if (!topRanking) {
    throw new Error("Cannot build a result object without ranked methodologies.");
  }

  ranking.forEach((item, index) => {
    item.rank = index + 1;
    item.tradeoffText = item.isTopFit
      ? closestAlternative
        ? replaceTemplate(resultsDictionary.narrative.topTradeoffTemplate, {
            alternative: closestAlternative.methodologyTitle,
            methodology: item.methodologyTitle
          })
        : undefined
      : replaceTemplate(resultsDictionary.narrative.alternativeTradeoffTemplate, {
          topMethodology: topRanking.methodologyTitle
        });
  });

  const dimensionResults: DimensionResult[] = dimensions.map((dimension) => ({
    dimensionKey: dimension.dimensionKey,
    labelText: dimensionLabels[dimension.dimensionKey],
    level: dimension.level,
    summaryText: resultsDictionary.dimensions[dimension.dimensionKey].summaries[dimension.level],
    contributingSignals: dimension.contributingSignals
  }));
  const methodologyOrder = ranking.map((item) => item.methodologyId);
  const resultCode = createResultCode(
    JSON.stringify({
      methodologyOrder,
      dimensions: dimensionResults.map((dimension) => ({
        dimensionKey: dimension.dimensionKey,
        level: dimension.level
      }))
    }),
    createdAt
  );
  const closestAlternativeId = closestAlternative?.methodologyId;
  const closestAlternativeScoreGap =
    rankingEvaluations[0] && rankingEvaluations[1]
      ? rankingEvaluations[0].score - rankingEvaluations[1].score
      : 0;
  const mostSensitiveDimensionKey =
    topRanking && closestAlternativeId
      ? resolveMostSensitiveDimensionKey(
          topRanking.methodologyId,
          closestAlternativeId,
          dimensionAverages
        )
      : undefined;
  const interpretation = buildRecommendationInterpretation({
    ranking,
    dimensions: dimensionResults
  });

  return {
    version: RESULT_SCHEMA_VERSION,
    resultCode,
    createdAt,
    questionnaireVersion: questionnaire.version,
    answerSnapshot: answers,
    methodologyOrder,
    topMethodologyId: topRanking.methodologyId,
    ranking,
    dimensions: dimensionResults,
    summary: {
      titleText: resultsDictionary.pageIntro.title,
      introText: resultsDictionary.pageIntro.description,
      topRecommendationText:
        topRanking.overviewText ?? topRanking.shortRationaleText ?? topRanking.methodologyTitle ?? ""
    },
    interpretation,
    sensitivityHint: closestAlternative
      ? {
          fitStrength: resolveSensitivityStrength(closestAlternativeScoreGap),
          closestAlternativeId,
          closestAlternativeTitle: closestAlternative.methodologyTitle,
          mostSensitiveDimensionKey,
          mostSensitiveDimensionLabel: mostSensitiveDimensionKey
            ? dimensionLabels[mostSensitiveDimensionKey]
            : undefined,
          noteText: mostSensitiveDimensionKey
            ? replaceTemplate(resultsDictionary.narrative.sensitivityTemplate, {
                dimension: dimensionLabels[mostSensitiveDimensionKey]
              })
            : undefined
        }
      : undefined,
    metadata: {
      generatedBy: "assessment-result-builder",
      locale,
      source: "assessment",
      debug: {
        scores: Object.fromEntries(
          rankingEvaluations.map((evaluation) => [evaluation.methodologyId, evaluation.score])
        ),
        dimensionAverages
      }
    }
  };
}
