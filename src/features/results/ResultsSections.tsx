"use client";

import { useEffect, useState } from "react";

import { InfoCard } from "@/components/cards/InfoCard";
import { PrimaryButton } from "@/components/controls/PrimaryButton";
import { SecondaryButton } from "@/components/controls/SecondaryButton";
import { ArrowRightIcon } from "@/components/icons/ArrowRightIcon";
import { routes } from "@/lib/routing/routes";
import { cn } from "@/lib/utils";
import type { ResultsDictionary } from "@/types/common";
import type { MethodologyId } from "@/types/methodology";
import type { DimensionKey } from "@/types/questionnaire";
import type {
  AssessmentResult,
  DimensionResult,
  RankedMethodologyResult,
  RecommendationInterpretation,
} from "@/types/result";

import type { InterpretationPresentation } from "@/features/results/resultsPresentation";
import {
  getMethodologyInterpretationLabels,
  hasPriorityInterpretationLabel,
} from "@/features/results/resultsPresentation";
import {
  ActionIconButton,
  ChevronDownIcon,
  DimensionGrid,
  DownloadIcon,
  LinkIcon,
  MethodologyCardShell,
  MethodologyInterpretationTags,
  RankChip,
  ResetIcon,
  ResultCardLink,
  ScoreBar,
} from "@/features/results/resultsPrimitives";
import {
  flatLightSurfaceClasses,
  resultsCardBodyClass,
  resultsCardLabelClass,
  resultsSectionDescriptionClass,
  resultsSectionTitleClass,
  topMatchSurfaceClasses,
} from "@/features/results/resultsStyles";

function getSummaryCardSurface(
  item: RankedMethodologyResult,
  interpretation: RecommendationInterpretation,
) {
  return hasPriorityInterpretationLabel(item.methodologyId, interpretation)
    ? topMatchSurfaceClasses
    : flatLightSurfaceClasses;
}

function AlternativeDimensionsPanel({
  item,
  dimensionLabels,
}: {
  item: RankedMethodologyResult;
  dimensionLabels: Record<DimensionKey, string>;
}) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {item.dimensionHighlights.slice(0, 3).map((dimension) => (
        <div
          key={dimension.dimensionKey}
          className="space-y-2 rounded-[1.2rem] border border-[#e3d8cf] bg-white px-4 py-4"
        >
          <p className="text-sm font-bold text-[#666d76]">
            {dimensionLabels[dimension.dimensionKey] ?? dimension.dimensionKey}
          </p>
          <ScoreBar level={dimension.level} />
        </div>
      ))}
    </div>
  );
}

function AlternativeCollapsedPreview({
  item,
  content,
  interpretationLabels,
  isExpanded,
  onToggle,
}: {
  item: RankedMethodologyResult;
  content: ResultsDictionary;
  interpretationLabels: string[];
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={isExpanded}
      aria-label={content.alternatives.expandActionLabel}
      className="group flex w-full items-start justify-between gap-4 text-left transition duration-200"
    >
      <div className="min-w-0 flex-1 space-y-4">
        <div className="space-y-3">
          <h3 className="text-[1.55rem] font-bold tracking-[-0.04em] text-text-primary">
            {item.methodologyTitle ?? item.methodologyId}
          </h3>
          <MethodologyInterpretationTags labels={interpretationLabels} />
          <p className={resultsSectionDescriptionClass}>
            {item.shortRationaleText ?? item.overviewText}
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-start gap-3 pt-1">
        <RankChip label={content.fitLabels[item.fitTier]} />
        {item.signalTags[0] ? (
          <span className="rounded-full border border-[#ded5cb] bg-[#f6f1eb] px-4 py-2 text-sm font-bold text-[#5c626a]">
            {item.signalTags[0].labelText ?? item.signalTags[0].labelKey}
          </span>
        ) : null}
        <span className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full border border-[#ded5cb] bg-white text-[#5f6670] transition duration-200 group-hover:translate-x-1 group-hover:border-[#d59b63] group-hover:bg-[#fff8f1]">
          <ChevronDownIcon
            className={cn("transition-transform", isExpanded ? "rotate-180" : "")}
          />
        </span>
      </div>
    </button>
  );
}

export function ResultsEmptyState({
  content,
  requestedCode,
}: {
  content: ResultsDictionary;
  requestedCode?: string;
}) {
  return (
    <InfoCard className="max-w-4xl">
      <div className="space-y-6">
        <p className="max-w-3xl text-base leading-8 text-text-secondary lg:text-[1.05rem]">
          {content.emptyState.description}
        </p>

        {requestedCode ? (
          <div className="rounded-[1.7rem] border border-border/70 bg-[#fbfaf7] px-5 py-4">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent">
              {content.emptyState.requestedCodeLabel}
            </p>
            <p className="mt-2 text-lg font-bold text-text-primary">
              {requestedCode}
            </p>
          </div>
        ) : null}

        <div className="flex flex-wrap gap-3">
          <PrimaryButton href={routes.assessment}>
            {content.emptyState.openAssessment}
          </PrimaryButton>
          <SecondaryButton href={routes.home}>
            {content.emptyState.returnHome}
          </SecondaryButton>
        </div>
      </div>
    </InfoCard>
  );
}

export function TopActionBar({
  content,
  canViewAnswers,
  isAnswersOpen,
  isDownloadMenuOpen,
  isCopied,
  isExportingPdf,
  isExportingJson,
  onToggleAnswers,
  onToggleDownloadMenu,
  onCopyCode,
  onDownloadPdf,
  onDownloadJson,
  onRetakeAssessment,
}: {
  content: ResultsDictionary;
  canViewAnswers: boolean;
  isAnswersOpen: boolean;
  isDownloadMenuOpen: boolean;
  isCopied: boolean;
  isExportingPdf: boolean;
  isExportingJson: boolean;
  onToggleAnswers: () => void;
  onToggleDownloadMenu: () => void;
  onCopyCode: () => void;
  onDownloadPdf: () => void;
  onDownloadJson: () => void;
  onRetakeAssessment: () => void;
}) {
  const isExporting = isExportingPdf || isExportingJson;

  return (
    <div className="flex justify-end">
      <div className="relative flex flex-wrap items-center justify-end gap-3">
        {canViewAnswers ? (
          <SecondaryButton
            type="button"
            onClick={onToggleAnswers}
            className={cn(
              "rounded-full px-5 py-3 text-sm font-semibold",
              isAnswersOpen && "border-[#d96f16] bg-[#fff3e7] text-[#8d4d14]",
            )}
          >
            {content.topActions.viewAnswers}
          </SecondaryButton>
        ) : null}

        <div className="relative">
          <ActionIconButton
            label={content.topActions.download}
            icon={<DownloadIcon />}
            onClick={onToggleDownloadMenu}
            isActive={isDownloadMenuOpen}
          />

          {isDownloadMenuOpen ? (
            <div className="absolute right-0 top-[calc(100%+0.75rem)] z-20 w-[18rem] rounded-[1.6rem] border border-border/80 bg-white/95 p-3 shadow-[0_18px_48px_rgba(17,19,24,0.08)] backdrop-blur">
              <div className="space-y-2">
                <SecondaryButton
                  type="button"
                  className="w-full justify-start"
                  disabled={isExporting}
                  onClick={onDownloadPdf}
                >
                  {isExportingPdf
                    ? content.topActions.preparingPdfAction
                    : content.topActions.pdfAction}
                </SecondaryButton>
                <SecondaryButton
                  type="button"
                  className="w-full justify-start"
                  disabled={isExporting}
                  onClick={onDownloadJson}
                >
                  {isExportingJson
                    ? content.topActions.preparingJsonAction
                    : content.topActions.jsonAction}
                </SecondaryButton>
                <p className="px-2 pt-1 text-sm leading-6 text-text-secondary">
                  {content.topActions.placeholderNote}
                </p>
              </div>
            </div>
          ) : null}
        </div>

        <ActionIconButton
          label={isCopied ? content.topActions.copiedLink : content.topActions.copyLink}
          icon={<LinkIcon />}
          onClick={onCopyCode}
          isActive={isCopied}
        />

        <ActionIconButton
          label={content.topActions.retakeAssessment}
          icon={<ResetIcon />}
          onClick={onRetakeAssessment}
        />

        {isCopied ? (
          <div
            aria-live="polite"
            className="absolute right-0 top-[calc(100%+0.85rem)] z-20 rounded-[1.2rem] border border-[#efcaa7] bg-[#fff4e8] px-4 py-3 text-sm font-semibold text-[#8d4d14] shadow-[0_18px_40px_rgba(244,122,18,0.14)]"
          >
            {content.topActions.copySuccessMessage}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function RankedSummarySection({
  content,
  ranking,
  interpretation,
}: {
  content: ResultsDictionary;
  ranking: RankedMethodologyResult[];
  interpretation: RecommendationInterpretation;
}) {
  return (
    <section className="space-y-5">
      <div className="space-y-2">
        <h2 className={resultsSectionTitleClass}>{content.rankedList.title}</h2>
        <p className={resultsSectionDescriptionClass}>{content.rankedList.description}</p>
      </div>

      <div className="space-y-3">
        {ranking.map((item) => {
          const interpretationLabels = getMethodologyInterpretationLabels(
            item.methodologyId,
            interpretation,
            content,
          );

          return (
            <a
              key={item.methodologyId}
              href={`#result-methodology-${item.methodologyId}`}
              className={cn(
                "group block rounded-[1.8rem] border px-5 py-5 transition duration-200 hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(23,25,29,0.08)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                getSummaryCardSurface(item, interpretation),
              )}
            >
              <div className="flex items-start gap-5">
                <div className="flex items-start gap-4">
                  <div
                    className={cn(
                      "flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold",
                      item.isTopFit || hasPriorityInterpretationLabel(item.methodologyId, interpretation)
                        ? "bg-[#17191d] text-white"
                        : "bg-[#f6f1eb] text-[#5b6470]",
                    )}
                  >
                    {item.rank}
                  </div>

                  <div className="min-w-0 space-y-3">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-[1.35rem] font-bold tracking-[-0.03em] text-text-primary">
                        {item.methodologyTitle ?? item.methodologyId}
                      </h3>
                      <RankChip
                        label={content.fitLabels[item.fitTier]}
                        tone={
                          item.isTopFit || hasPriorityInterpretationLabel(item.methodologyId, interpretation)
                            ? "emphasis"
                            : "default"
                        }
                      />
                    </div>

                    <MethodologyInterpretationTags labels={interpretationLabels} />

                    <p className={resultsSectionDescriptionClass}>
                      {item.shortRationaleText ?? item.overviewText}
                    </p>
                  </div>
                </div>

                <div className="ml-auto flex h-full shrink-0 items-start">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#ded5cb] bg-white text-[#5f6670] transition duration-200 group-hover:translate-x-1 group-hover:border-[#d59b63] group-hover:bg-[#fff6ed]">
                    <ArrowRightIcon className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}

export function InterpretationSummarySection({
  content,
  presentation,
}: {
  content: ResultsDictionary;
  presentation: InterpretationPresentation;
}) {
  return (
    <section>
      <div className="rounded-[2rem] border border-[#ddd7cf] bg-[#fbf8f4] px-6 py-6 lg:px-7">
        <div className="space-y-6">
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-accent">
              {content.interpretation.eyebrow}
            </p>
            <h2 className="text-[2rem] font-bold tracking-[-0.05em] text-text-primary">
              {presentation.heading}
            </h2>
            <div className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#707780]">
                {content.interpretation.summaryLabel}
              </p>
              <p className={resultsCardBodyClass}>{presentation.summary}</p>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-[1.7rem] border border-[#e5d9cc] bg-white px-5 py-5">
              <div className="space-y-3">
                <p className={resultsCardLabelClass}>
                  {content.interpretation.primaryReasonLabel}
                </p>
                <p className={resultsCardBodyClass}>{presentation.primaryExplanation}</p>
              </div>
            </div>

            {presentation.secondaryExplanation ? (
              <div className="rounded-[1.7rem] border border-[#e5d9cc] bg-white px-5 py-5">
                <div className="space-y-3">
                  <p className={resultsCardLabelClass}>
                    {content.interpretation.secondaryReasonLabel}
                  </p>
                  <p className={resultsCardBodyClass}>{presentation.secondaryExplanation}</p>
                </div>
              </div>
            ) : null}
          </div>

          {presentation.supportNotes.length > 0 ? (
            <div className="rounded-[1.5rem] border border-[#e7ddd2] bg-[#f4efe8] px-5 py-4">
              <div className="space-y-2">
                <p className={resultsCardLabelClass}>
                  {content.interpretation.supportNoteLabel}
                </p>
                <div className="space-y-2">
                  {presentation.supportNotes.map((note) => (
                    <p key={note} className="text-sm leading-6 text-[#5f6670]">
                      {note}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export function BestFitSection({
  content,
  result,
  interpretation,
}: {
  content: ResultsDictionary;
  result: AssessmentResult;
  interpretation: RecommendationInterpretation;
}) {
  const topResult = result.ranking[0];
  const interpretationLabels = getMethodologyInterpretationLabels(
    topResult.methodologyId,
    interpretation,
    content,
  );

  return (
    <section id={`result-methodology-${topResult.methodologyId}`} className="scroll-mt-36">
      <MethodologyCardShell
        title={topResult.methodologyTitle ?? topResult.methodologyId}
        description={topResult.overviewText}
        signalTags={topResult.signalTags}
        interpretationLabels={interpretationLabels}
        badgeLabel={content.bestFit.badge}
        badgeTone="emphasis"
        className={topMatchSurfaceClasses}
      >
        <div className="rounded-[2rem] border border-[#e7d7ca] bg-[#f6f1eb] px-6 py-6">
          <div className="space-y-4">
            <p className={resultsCardLabelClass}>{content.bestFit.dimensionsLabel}</p>
            <DimensionGrid dimensions={result.dimensions} />
          </div>
        </div>

        <div className="rounded-[2rem] border border-[#ddd1c7] bg-[#f7f4f0] px-6 py-5">
          <div className="space-y-3">
            <p className={resultsCardLabelClass}>{content.bestFit.outcomeLabel}</p>
            <p className={resultsCardBodyClass}>{topResult.outcomeText}</p>
          </div>
        </div>

        <ResultCardLink
          label={content.bestFit.actionLabel}
          methodologyId={topResult.methodologyId}
        />
      </MethodologyCardShell>
    </section>
  );
}

export function CriticalComplementarySection({
  content,
  result,
  interpretation,
}: {
  content: ResultsDictionary;
  result: AssessmentResult;
  interpretation: RecommendationInterpretation;
}) {
  const item = result.ranking[1];

  if (!item) {
    return null;
  }

  const interpretationLabels = getMethodologyInterpretationLabels(
    item.methodologyId,
    interpretation,
    content,
  );

  return (
    <section id={`result-methodology-${item.methodologyId}`} className="scroll-mt-36">
      <MethodologyCardShell
        title={item.methodologyTitle ?? item.methodologyId}
        titleLevel="h3"
        summary={item.shortRationaleText}
        description={item.overviewText}
        supportingText={item.tradeoffText}
        signalTags={item.signalTags}
        interpretationLabels={interpretationLabels}
        badgeLabel={content.fitLabels[item.fitTier]}
        badgeTone="emphasis"
        className={topMatchSurfaceClasses}
      >
        <div className="rounded-[2rem] border border-[#e3c7a7] bg-[#fff8f1] px-6 py-6">
          <div className="space-y-4">
            <p className={resultsCardLabelClass}>{content.bestFit.dimensionsLabel}</p>
            <DimensionGrid dimensions={result.dimensions} />
          </div>
        </div>

        <div className="rounded-[2rem] border border-[#e3cfbd] bg-[#fffaf4] px-6 py-5">
          <div className="space-y-3">
            <p className={resultsCardLabelClass}>{content.bestFit.outcomeLabel}</p>
            <p className={resultsCardBodyClass}>{item.outcomeText}</p>
          </div>
        </div>

        <ResultCardLink
          label={content.bestFit.actionLabel}
          methodologyId={item.methodologyId}
        />
      </MethodologyCardShell>
    </section>
  );
}

export function CompositeRecommendationsSection({
  content,
  result,
  interpretation,
}: {
  content: ResultsDictionary;
  result: AssessmentResult;
  interpretation: RecommendationInterpretation;
}) {
  if (interpretation.mode !== "composite_strategy") {
    return null;
  }

  return (
    <section className="space-y-5">
      <BestFitSection content={content} result={result} interpretation={interpretation} />
      <CriticalComplementarySection
        content={content}
        result={result}
        interpretation={interpretation}
      />
    </section>
  );
}

export function BestFitMethodologySection({
  content,
  result,
  interpretation,
}: {
  content: ResultsDictionary;
  result: AssessmentResult;
  interpretation: RecommendationInterpretation;
}) {
  return (
    <section className="space-y-5">
      <div className="space-y-2">
        <h2 className={resultsSectionTitleClass}>{content.bestFit.sectionTitle}</h2>
        <p className="max-w-5xl text-base leading-7 text-text-secondary">
          {content.bestFit.sectionDescription}
        </p>
      </div>

      {interpretation.mode === "composite_strategy" ? (
        <CompositeRecommendationsSection
          content={content}
          result={result}
          interpretation={interpretation}
        />
      ) : (
        <BestFitSection content={content} result={result} interpretation={interpretation} />
      )}
    </section>
  );
}

export function AlternativesSection({
  content,
  ranking,
  dimensions,
  interpretation,
}: {
  content: ResultsDictionary;
  ranking: RankedMethodologyResult[];
  dimensions: DimensionResult[];
  interpretation: RecommendationInterpretation;
}) {
  const alternatives = ranking
    .slice(1)
    .filter(
      (item) =>
        !(
          interpretation.mode === "composite_strategy" &&
          item.methodologyId === ranking[1]?.methodologyId
        ),
    );
  const dimensionLabels = Object.fromEntries(
    dimensions.map((dimension) => [
      dimension.dimensionKey,
      dimension.labelText ?? dimension.dimensionKey,
    ]),
  ) as Record<DimensionKey, string>;
  const collapseFromIndex = Math.max(alternatives.length - 3, 0);
  const initialExpandedAlternativeIdsKey = alternatives
    .slice(0, collapseFromIndex)
    .map((item) => item.methodologyId)
    .join("|");
  const [expandedAlternativeIds, setExpandedAlternativeIds] = useState<MethodologyId[]>([]);

  useEffect(() => {
    setExpandedAlternativeIds(
      initialExpandedAlternativeIdsKey
        ? (initialExpandedAlternativeIdsKey.split("|") as MethodologyId[])
        : [],
    );
  }, [initialExpandedAlternativeIdsKey]);

  const toggleAlternative = (methodologyId: MethodologyId) => {
    setExpandedAlternativeIds((current) =>
      current.includes(methodologyId)
        ? current.filter((id) => id !== methodologyId)
        : [...current, methodologyId],
    );
  };

  return (
    <section className="space-y-5">
      <div className="space-y-2">
        <h2 className={resultsSectionTitleClass}>{content.alternatives.title}</h2>
        <p className={resultsSectionDescriptionClass}>{content.alternatives.description}</p>
      </div>

      <div className="space-y-4">
        {alternatives.map((item, index) => {
          const isCollapsible = index >= collapseFromIndex;
          const isExpanded = expandedAlternativeIds.includes(item.methodologyId);
          const interpretationLabels = getMethodologyInterpretationLabels(
            item.methodologyId,
            interpretation,
            content,
          );

          return (
            <div
              key={item.methodologyId}
              id={`result-methodology-${item.methodologyId}`}
              className="scroll-mt-36"
            >
              {isCollapsible && !isExpanded ? (
                <div
                  className={cn(
                    "rounded-[2rem] border px-6 py-6 transition duration-200 hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(23,25,29,0.08)]",
                    flatLightSurfaceClasses,
                  )}
                >
                  <AlternativeCollapsedPreview
                    item={item}
                    content={content}
                    interpretationLabels={interpretationLabels}
                    isExpanded={isExpanded}
                    onToggle={() => toggleAlternative(item.methodologyId)}
                  />
                </div>
              ) : (
                <div className="space-y-3">
                  <MethodologyCardShell
                    title={item.methodologyTitle ?? item.methodologyId}
                    titleLevel="h3"
                    summary={item.shortRationaleText}
                    description={item.overviewText}
                    supportingText={item.tradeoffText}
                    signalTags={item.signalTags}
                    interpretationLabels={interpretationLabels}
                    signalTagTone="muted"
                    badgeLabel={content.fitLabels[item.fitTier]}
                    headerActions={
                      isCollapsible ? (
                        <button
                          type="button"
                          onClick={() => toggleAlternative(item.methodologyId)}
                          aria-expanded={isExpanded}
                          aria-label={content.alternatives.collapseActionLabel}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#ded5cb] bg-white text-[#5f6670] transition hover:border-[#d59b63] hover:bg-[#fff8f1]"
                        >
                          <ChevronDownIcon className="rotate-180 transition-transform" />
                        </button>
                      ) : null
                    }
                    className={cn(
                      "transition duration-200 hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(23,25,29,0.08)]",
                      flatLightSurfaceClasses,
                    )}
                  >
                    <div className="rounded-[2rem] border border-[#e7d7ca] bg-[#f6f1eb] px-6 py-6">
                      <div className="space-y-4">
                        <p className={resultsCardLabelClass}>
                          {content.alternatives.topDimensionsLabel}
                        </p>
                        <AlternativeDimensionsPanel
                          item={item}
                          dimensionLabels={dimensionLabels}
                        />
                      </div>
                    </div>

                    <div className="rounded-[2rem] border border-[#ddd1c7] bg-[#f7f4f0] px-6 py-5">
                      <div className="space-y-3">
                        <p className={resultsCardLabelClass}>{content.bestFit.outcomeLabel}</p>
                        <p className={resultsCardBodyClass}>{item.outcomeText}</p>
                      </div>
                    </div>

                    <ResultCardLink
                      label={content.bestFit.actionLabel}
                      methodologyId={item.methodologyId}
                    />
                  </MethodologyCardShell>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function SaveResultsSection({
  content,
  resultCode,
  isCopied,
  isExportingPdf,
  isExportingJson,
  onCopyCode,
  onDownloadPdf,
  onDownloadJson,
}: {
  content: ResultsDictionary;
  resultCode: string;
  isCopied: boolean;
  isExportingPdf: boolean;
  isExportingJson: boolean;
  onCopyCode: () => void;
  onDownloadPdf: () => void;
  onDownloadJson: () => void;
}) {
  const isExporting = isExportingPdf || isExportingJson;

  return (
    <section>
      <InfoCard className="border-border/70 bg-white/88">
        <div className="space-y-4">
          <div className="space-y-2">
            <h2 className={resultsSectionTitleClass}>{content.saveSection.title}</h2>
            <p className="max-w-3xl text-base leading-7 text-text-secondary">
              {content.saveSection.description}
            </p>
          </div>

          <div className="flex flex-col gap-6 lg:flex-row">
            <div className="flex-1 rounded-[1.8rem] border border-[#ead9cc] bg-[#fbfaf7] px-5 py-5">
              <div className="space-y-3">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#7a8088]">
                  {content.saveSection.resultCodeLabel}
                </p>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xl font-bold tracking-[0.04em] text-text-primary">
                    {resultCode}
                  </p>
                  <PrimaryButton onClick={onCopyCode} className="sm:shrink-0">
                    {isCopied ? content.topActions.copiedLink : content.topActions.copyLink}
                  </PrimaryButton>
                </div>
              </div>
            </div>

            <div className="flex-1 rounded-[1.8rem] border border-[#ead9cc] bg-[#f8f4ee] px-5 py-5">
              <div className="space-y-3">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#7a8088]">
                  {content.saveSection.exportLabel}
                </p>
                <div className="flex flex-wrap gap-3">
                  <SecondaryButton
                    type="button"
                    disabled={isExporting}
                    onClick={onDownloadPdf}
                  >
                    {isExportingPdf
                      ? content.topActions.preparingPdfAction
                      : content.topActions.pdfAction}
                  </SecondaryButton>
                  <SecondaryButton
                    type="button"
                    disabled={isExporting}
                    onClick={onDownloadJson}
                  >
                    {isExportingJson
                      ? content.topActions.preparingJsonAction
                      : content.topActions.jsonAction}
                  </SecondaryButton>
                </div>
                <p className="text-sm leading-6 text-text-secondary">
                  {content.topActions.placeholderNote}
                </p>
              </div>
            </div>
          </div>
        </div>
      </InfoCard>
    </section>
  );
}
