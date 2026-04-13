import { buildMethodologyRoute } from "@/lib/routing/routes";
import type { ResultsDictionary } from "@/types/common";
import type {
  AssessmentResult,
  ResultExportAnswerBlock,
  ResultExportDimensionItem,
  ResultExportDocument,
  ResultExportMetadataItem,
  ResultExportMethodologyCard,
} from "@/types/result";

import {
  buildInterpretationPresentation,
  getMethodologyInterpretationLabels,
} from "@/features/results/resultsPresentation";

interface ExportAnswerBlockInput {
  id: string;
  label: string;
  title: string;
  questions: Array<{
    questionId: string;
    questionTitle: string;
    answerLabel: string;
  }>;
}

interface BuildResultExportOptions {
  result: AssessmentResult;
  content: ResultsDictionary;
  answerBlocks: ExportAnswerBlockInput[];
  exportedAt?: string;
}

function formatDateTime(locale: "en" | "ru", value: string) {
  return new Intl.DateTimeFormat(locale === "ru" ? "ru-RU" : "en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function mapMetadata(
  result: AssessmentResult,
  content: ResultsDictionary,
  exportedAt: string,
) {
  const locale = result.metadata?.locale ?? "en";

  return [
    {
      id: "resultCode",
      label: content.saveSection.resultCodeLabel,
      value: result.resultCode,
    },
    {
      id: "createdAt",
      label: content.export.createdAtLabel,
      value: formatDateTime(locale, result.createdAt),
    },
    {
      id: "exportedAt",
      label: content.export.exportedAtLabel,
      value: formatDateTime(locale, exportedAt),
    },
    {
      id: "questionnaireVersion",
      label: content.export.questionnaireVersionLabel,
      value: result.questionnaireVersion,
    },
    {
      id: "locale",
      label: content.export.localeLabel,
      value: locale,
    },
  ] satisfies ResultExportMetadataItem[];
}

function mapProjectDimensions(
  result: AssessmentResult,
) {
  return result.dimensions.map(
    (dimension): ResultExportDimensionItem => ({
      dimensionKey: dimension.dimensionKey,
      label: dimension.labelText ?? dimension.dimensionKey,
      level: dimension.level,
      summary: dimension.summaryText,
    }),
  );
}

function mapMethodologyHighlights(
  result: AssessmentResult,
  methodologyId: AssessmentResult["ranking"][number]["methodologyId"],
) {
  const item = result.ranking.find((rankingItem) => rankingItem.methodologyId === methodologyId);

  if (!item) {
    return [];
  }

  return item.dimensionHighlights.map(
    (dimension): ResultExportDimensionItem => ({
      dimensionKey: dimension.dimensionKey,
      label:
        result.dimensions.find(
          (projectDimension) => projectDimension.dimensionKey === dimension.dimensionKey,
        )?.labelText ?? dimension.dimensionKey,
      level: dimension.level,
      summary: dimension.explanationText,
    }),
  );
}

function buildMethodologyCard(
  item: AssessmentResult["ranking"][number],
  content: ResultsDictionary,
  interpretationLabels: string[],
  options: {
    badgeLabel: string;
    summary?: string;
    description?: string;
    supportingText?: string;
    dimensionsTitle?: string;
    dimensions: ResultExportDimensionItem[];
    outcomeText?: string;
  },
) {
  return {
    methodologyId: item.methodologyId,
    title: item.methodologyTitle ?? item.methodologyId,
    fitTier: item.fitTier,
    badgeLabel: options.badgeLabel,
    fitLabel: content.fitLabels[item.fitTier],
    interpretationLabels,
    signalTags: item.signalTags.map((tag) => tag.labelText ?? tag.labelKey),
    summary: options.summary,
    description: options.description,
    supportingText: options.supportingText,
    dimensionsTitle: options.dimensionsTitle,
    dimensions: options.dimensions,
    outcomeLabel: content.bestFit.outcomeLabel,
    outcomeText: options.outcomeText,
    routeLabel: content.export.methodologyDetailsLabel,
    routeHref: buildMethodologyRoute(item.methodologyId),
  } satisfies ResultExportMethodologyCard;
}

function buildFeaturedCards(
  result: AssessmentResult,
  content: ResultsDictionary,
) {
  const interpretation = buildInterpretationPresentation(result, content).interpretation;
  const featuredItems = result.ranking[0] ? [result.ranking[0]] : [];

  if (interpretation.mode === "composite_strategy" && result.ranking[1]) {
    featuredItems.push(result.ranking[1]);
  }

  const projectDimensions = mapProjectDimensions(result);

  return featuredItems.map((item, index) =>
    buildMethodologyCard(
      item,
      content,
      getMethodologyInterpretationLabels(item.methodologyId, interpretation, content),
      {
        badgeLabel:
          index === 0 ? content.bestFit.badge : content.fitLabels[item.fitTier],
        summary: index === 0 ? undefined : item.shortRationaleText,
        description: item.overviewText,
        supportingText: index === 0 ? undefined : item.tradeoffText,
        dimensionsTitle: content.bestFit.dimensionsLabel,
        dimensions: projectDimensions,
        outcomeText: item.outcomeText,
      },
    ),
  );
}

function buildAlternativeCards(
  result: AssessmentResult,
  content: ResultsDictionary,
) {
  const interpretation = buildInterpretationPresentation(result, content).interpretation;
  const excludedMethodologyId =
    interpretation.mode === "composite_strategy"
      ? result.ranking[1]?.methodologyId
      : undefined;

  return result.ranking
    .slice(1)
    .filter((item) => item.methodologyId !== excludedMethodologyId)
    .map((item) =>
      buildMethodologyCard(
        item,
        content,
        getMethodologyInterpretationLabels(item.methodologyId, interpretation, content),
        {
          badgeLabel: content.fitLabels[item.fitTier],
          summary: item.shortRationaleText,
          description: item.overviewText,
          supportingText: item.tradeoffText,
          dimensionsTitle: content.alternatives.topDimensionsLabel,
          dimensions: mapMethodologyHighlights(result, item.methodologyId),
          outcomeText: item.outcomeText,
        },
      ),
    );
}

function mapAnswerBlocks(answerBlocks: ExportAnswerBlockInput[]) {
  return answerBlocks.map(
    (block): ResultExportAnswerBlock => ({
      id: block.id,
      label: block.label,
      title: block.title,
      questions: block.questions.map((question) => ({
        questionId: question.questionId,
        questionTitle: question.questionTitle,
        answerLabel: question.answerLabel,
      })),
    }),
  );
}

export function buildResultExport({
  result,
  content,
  answerBlocks,
  exportedAt = new Date().toISOString(),
}: BuildResultExportOptions): ResultExportDocument {
  const interpretationPresentation = buildInterpretationPresentation(result, content);
  const interpretation = interpretationPresentation.interpretation;

  return {
    title: content.pageIntro.title,
    description: content.pageIntro.description,
    metadata: mapMetadata(result, content, exportedAt),
    interpretation: {
      title: content.interpretation.eyebrow,
      heading: interpretationPresentation.heading,
      summaryLabel: content.interpretation.summaryLabel,
      summary: interpretationPresentation.summary,
      primaryReasonLabel: content.interpretation.primaryReasonLabel,
      primaryExplanation: interpretationPresentation.primaryExplanation,
      secondaryReasonLabel: content.interpretation.secondaryReasonLabel,
      secondaryExplanation: interpretationPresentation.secondaryExplanation,
      supportNoteLabel: content.interpretation.supportNoteLabel,
      supportNotes: interpretationPresentation.supportNotes,
    },
    rankingSection: {
      title: content.rankedList.title,
      description: content.rankedList.description,
      items: result.ranking.map((item) => ({
        rank: item.rank,
        methodologyId: item.methodologyId,
        title: item.methodologyTitle ?? item.methodologyId,
        fitTier: item.fitTier,
        fitLabel: content.fitLabels[item.fitTier],
        interpretationLabels: getMethodologyInterpretationLabels(
          item.methodologyId,
          interpretation,
          content,
        ),
        rationale: item.shortRationaleText ?? item.overviewText,
      })),
    },
    featuredSection: {
      title: content.bestFit.sectionTitle,
      description: content.bestFit.sectionDescription,
      items: buildFeaturedCards(result, content),
    },
    alternativesSection: {
      title: content.alternatives.title,
      description: content.alternatives.description,
      items: buildAlternativeCards(result, content),
    },
    answersSection: {
      title: content.export.answersSectionTitle,
      description: content.export.answersSectionDescription,
      items: mapAnswerBlocks(answerBlocks),
    },
  };
}
