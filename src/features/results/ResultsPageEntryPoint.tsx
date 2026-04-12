"use client";

import { useEffect, useState } from "react";

import { getQuestionnaireContent } from "@/content/questionnaire";
import { questionnaireConfig } from "@/config/questionnaire";
import { getMethodologyContentMap } from "@/lib/methodology/getMethodologyContent";
import { buildResultObject } from "@/lib/result/buildResultObject";
import {
  loadAssessmentResultByCode,
  loadLatestAssessmentResult,
} from "@/lib/storage/results";
import type { Locale, ResultsDictionary } from "@/types/common";
import type { DimensionKey } from "@/types/questionnaire";
import type { AssessmentResult } from "@/types/result";

import { ResultsPageView } from "@/features/results/ResultsPageView";

interface ResultsPageEntryPointProps {
  content: ResultsDictionary;
  locale: Locale;
  requestedCode?: string;
}

function localizeResult(
  result: AssessmentResult,
  locale: Locale,
  content: ResultsDictionary,
) {
  if (!result.answerSnapshot || result.metadata?.locale === locale) {
    return result;
  }

  const questionnaireContent = getQuestionnaireContent(locale);
  const dimensionLabels = Object.fromEntries(
    questionnaireConfig.blocks.map((block) => [
      block.dimensionKey,
      questionnaireContent.blocks[block.id].title,
    ]),
  ) as Record<DimensionKey, string>;
  const localizedResult = buildResultObject({
    questionnaire: questionnaireConfig,
    answers: result.answerSnapshot,
    locale,
    resultsDictionary: content,
    methodologyContentMap: getMethodologyContentMap(locale),
    dimensionLabels,
  });

  return {
    ...localizedResult,
    version: result.version,
    resultCode: result.resultCode,
    createdAt: result.createdAt,
    questionnaireVersion: result.questionnaireVersion,
    metadata: {
      ...result.metadata,
      ...localizedResult.metadata,
      locale,
      source: result.metadata?.source ?? localizedResult.metadata?.source,
    },
  };
}

export function ResultsPageEntryPoint({
  content,
  locale,
  requestedCode,
}: ResultsPageEntryPointProps) {
  const [hasHydrated, setHasHydrated] = useState(false);
  const [result, setResult] = useState<AssessmentResult | null>(null);

  useEffect(() => {
    const restoredResult = requestedCode
      ? loadAssessmentResultByCode(requestedCode)
      : loadLatestAssessmentResult();

    setResult(
      restoredResult ? localizeResult(restoredResult, locale, content) : null,
    );
    setHasHydrated(true);
  }, [content, locale, requestedCode]);

  return (
    <ResultsPageView
      content={content}
      result={result}
      requestedCode={requestedCode}
      isHydrated={hasHydrated}
    />
  );
}
