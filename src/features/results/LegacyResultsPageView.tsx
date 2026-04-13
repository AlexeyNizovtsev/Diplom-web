"use client";

import { useEffect, useState, type ReactNode } from "react";

import { useRouter } from "next/navigation";

import { HomeBackground } from "@/components/backgrounds/HomeBackground";
import { InfoCard } from "@/components/cards/InfoCard";
import { PrimaryButton } from "@/components/controls/PrimaryButton";
import { SecondaryButton } from "@/components/controls/SecondaryButton";
import { ArrowRightIcon } from "@/components/icons/ArrowRightIcon";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { firstAssessmentBlockId } from "@/config/questionnaire";
import { buildRecommendationInterpretation } from "@/lib/result/buildRecommendationInterpretation";
import {
  buildAssessmentBlockRoute,
  buildMethodologyRoute,
  routes,
} from "@/lib/routing/routes";
import { clearAssessmentProgress } from "@/lib/storage/assessmentProgress";
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

interface ResultsPageViewProps {
  content: ResultsDictionary;
  result: AssessmentResult | null;
  requestedCode?: string;
  isHydrated: boolean;
}

interface InterpretationPresentation {
  interpretation: RecommendationInterpretation;
  heading: string;
  summary: string;
  primaryExplanation: string;
  secondaryExplanation?: string;
  supportNote?: string;
}

function getTopMatchSurfaceClasses() {
  return "border-[#f3d4bb] bg-[#fff6ed]";
}

function getFlatLightSurfaceClasses() {
  return "border-[#e3d8cf] bg-white";
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

function getRecommendationInterpretation(result: AssessmentResult) {
  return result.interpretation ?? buildRecommendationInterpretation(result);
}

function getMethodologyInterpretationIds(
  methodologyId: MethodologyId,
  interpretation: RecommendationInterpretation,
) {
  return interpretation.methodologyLabels[methodologyId] ?? [];
}

function getMethodologyInterpretationLabels(
  methodologyId: MethodologyId,
  interpretation: RecommendationInterpretation,
  content: ResultsDictionary,
) {
  return getMethodologyInterpretationIds(methodologyId, interpretation).map(
    (label) => content.interpretation.methodologyLabels[label] ?? label,
  );
}

function getSummaryCardSurface(
  item: RankedMethodologyResult,
  interpretation: RecommendationInterpretation,
) {
  const hasAccentLabel = getMethodologyInterpretationIds(
    item.methodologyId,
    interpretation,
  ).some(
    (label) =>
      label === "dominant_constraint_match" ||
      label === "critical_complementary_strategy",
  );

  return hasAccentLabel
    ? "border-[#efc395] bg-[#fff1df]"
    : getFlatLightSurfaceClasses();
}

function buildInterpretationPresentation(
  result: AssessmentResult,
  content: ResultsDictionary,
): InterpretationPresentation {
  const interpretation = getRecommendationInterpretation(result);
  const topMethodology = result.ranking[0];
  const secondMethodology = result.ranking[1];
  const architectureSupportMethodology = result.ranking
    .slice(0, 3)
    .find((item) => item.methodologyId === "rup");
  const architectureSupportTemplate =
    content.interpretation.supportFlagTemplates.architecture_supporting_option;

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
      Boolean(architectureSupportTemplate) &&
      architectureSupportMethodology
        ? replaceTemplate(
            architectureSupportTemplate!,
            {
              methodology:
                architectureSupportMethodology.methodologyTitle ??
                architectureSupportMethodology.methodologyId,
            },
          )
        : undefined,
  };
}

function RankChip({
  label,
  tone = "default",
}: {
  label: string;
  tone?: "default" | "emphasis";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.18em]",
        tone === "emphasis"
          ? "bg-[#17191d] text-white"
          : "bg-[#fff4e8] text-[#5d4630]",
      )}
    >
      {label}
    </span>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("h-5 w-5", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ScoreBar({ level }: { level: number }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-[#eceef2]">
        <div
          className="h-full rounded-full bg-[#f47a12]"
          style={{ width: `${(level / 3) * 100}%` }}
        />
      </div>
      <span className="min-w-[3rem] text-sm font-bold text-[#5a6069]">
        {level} / 3
      </span>
    </div>
  );
}

function MethodologySignalTags({
  tags,
  tone = "accent",
}: {
  tags: RankedMethodologyResult["signalTags"];
  tone?: "accent" | "muted";
}) {
  if (!tags.length) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-3">
      {tags.map((tag) => (
        <span
          key={tag.id}
          className={cn(
            "rounded-full border px-4 py-2 text-sm font-bold",
            tone === "accent"
              ? "border-[#f2b37a] bg-[#f47a12] text-white"
              : "border-[#ded5cb] bg-[#f6f1eb] text-[#5c626a]",
          )}
        >
          {tag.labelText ?? tag.labelKey}
        </span>
      ))}
    </div>
  );
}

function MethodologyInterpretationTags({ labels }: { labels: string[] }) {
  if (!labels.length) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {labels.map((label) => (
        <span
          key={label}
          className="rounded-full border border-[#d8dce3] bg-[#f4f6f8] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-[#5b6470]"
        >
          {label}
        </span>
      ))}
    </div>
  );
}

function ResultCardLink({
  label,
  methodologyId,
}: {
  label: string;
  methodologyId: MethodologyId;
}) {
  return (
    <PrimaryButton
      href={buildMethodologyRoute(methodologyId)}
      className="w-full justify-between border border-[#17191d] bg-[#17191d] text-white shadow-[0_18px_40px_rgba(23,25,29,0.18)] hover:bg-[#2b2621] lg:w-auto"
      trailingIcon={<ArrowRightIcon />}
    >
      {label}
    </PrimaryButton>
  );
}

function MethodologyCardShell({
  title,
  titleLevel = "h2",
  summary,
  description,
  supportingText,
  signalTags,
  interpretationLabels = [],
  signalTagTone = "accent",
  badgeLabel,
  badgeTone = "default",
  headerActions,
  className,
  children,
}: {
  title: string;
  titleLevel?: "h2" | "h3";
  summary?: string;
  description?: string;
  supportingText?: string;
  signalTags: RankedMethodologyResult["signalTags"];
  interpretationLabels?: string[];
  signalTagTone?: "accent" | "muted";
  badgeLabel: string;
  badgeTone?: "default" | "emphasis";
  headerActions?: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  const TitleTag = titleLevel;

  return (
    <InfoCard className={className}>
      <div className="space-y-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-4xl space-y-4">
            <TitleTag className="text-[2.1rem] font-bold tracking-[-0.05em] text-text-primary lg:text-[2.7rem]">
              {title}
            </TitleTag>
            <div className="space-y-3">
              {summary ? (
                <p className="text-sm font-semibold leading-6 text-[#646b74] lg:text-base">
                  {summary}
                </p>
              ) : null}
              {description ? (
                <p className="text-base leading-8 text-[#5a6069] lg:text-[1.05rem]">
                  {description}
                </p>
              ) : null}
              {supportingText ? (
                <p className="text-sm leading-7 text-[#6a7079] lg:text-base">
                  {supportingText}
                </p>
              ) : null}
            </div>
            <MethodologyInterpretationTags labels={interpretationLabels} />
            <MethodologySignalTags tags={signalTags} tone={signalTagTone} />
          </div>

          <div className="flex items-start gap-3 lg:justify-end">
            {headerActions}
            <RankChip label={badgeLabel} tone={badgeTone} />
          </div>
        </div>

        {children}
      </div>
    </InfoCard>
  );
}

function DownloadIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M12 4v10" strokeLinecap="round" />
      <path d="m8 11 4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 18h14" strokeLinecap="round" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path
        d="M10.5 13.5 8.9 15.1a3 3 0 1 1-4.2-4.2l3.6-3.6a3 3 0 0 1 4.2 0"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.5 10.5 15.1 8.9a3 3 0 1 1 4.2 4.2l-3.6 3.6a3 3 0 0 1-4.2 0"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="m9 15 6-6" strokeLinecap="round" />
    </svg>
  );
}

function ResetIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M20 6v5h-5" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M20 11a8 8 0 1 1-2.05-5.36L20 6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ActionIconButton({
  label,
  icon,
  onClick,
  isActive = false,
}: {
  label: string;
  icon: ReactNode;
  onClick: () => void;
  isActive?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={cn(
        "inline-flex h-12 w-12 items-center justify-center rounded-full border shadow-[0_18px_38px_rgba(244,122,18,0.16)] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        isActive
          ? "border-[#d96f16] bg-[#1f1b17] text-white"
          : "border-[#efcaa7] bg-[#fff1e2] text-[#8d4d14] backdrop-blur hover:-translate-y-0.5 hover:border-[#e3b07f] hover:bg-[#fff6ee]",
      )}
    >
      <span aria-hidden="true">{icon}</span>
    </button>
  );
}

function ResultsEmptyState({
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

function TopActionBar({
  content,
  isDownloadMenuOpen,
  isCopied,
  onToggleDownloadMenu,
  onCopyCode,
  onRetakeAssessment,
}: {
  content: ResultsDictionary;
  isDownloadMenuOpen: boolean;
  isCopied: boolean;
  onToggleDownloadMenu: () => void;
  onCopyCode: () => void;
  onRetakeAssessment: () => void;
}) {
  return (
    <div className="flex justify-end">
      <div className="relative flex items-center gap-3">
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
                  className="w-full justify-start opacity-70"
                  disabled
                >
                  {content.topActions.pdfAction}
                </SecondaryButton>
                <SecondaryButton
                  className="w-full justify-start opacity-70"
                  disabled
                >
                  {content.topActions.jsonAction}
                </SecondaryButton>
                <p className="px-2 pt-1 text-sm leading-6 text-text-secondary">
                  {content.topActions.placeholderNote}
                </p>
              </div>
            </div>
          ) : null}
        </div>

        <ActionIconButton
          label={
            isCopied
              ? content.topActions.copiedLink
              : content.topActions.copyLink
          }
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

function DimensionGrid({ dimensions }: { dimensions: DimensionResult[] }) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {dimensions.map((dimension) => (
        <div
          key={dimension.dimensionKey}
          className="rounded-[1.8rem] border border-[#ead9cc] bg-white/90 px-5 py-5"
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-bold text-[#666d76]">
                {dimension.labelText}
              </p>
              <ScoreBar level={dimension.level} />
            </div>
            <p className="text-sm leading-6 text-[#59606a]">
              {dimension.summaryText}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function RankedSummarySection({
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
        <h2 className="text-[1.8rem] font-bold tracking-[-0.04em] text-text-primary">
          {content.rankedList.title}
        </h2>
        <p className="max-w-4xl text-base leading-7 text-text-secondary">
          {content.rankedList.description}
        </p>
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
              aria-label={`${content.rankedList.jumpLabel}: ${
                item.methodologyTitle ?? item.methodologyId
              }`}
              className={cn(
                "group block rounded-[1.8rem] border px-5 py-5 transition duration-200 hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(23,25,29,0.08)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                getSummaryCardSurface(item, interpretation),
              )}
            >
              <div className="flex min-h-[10.5rem] flex-col gap-5">
                <div className="flex items-start gap-4">
                  <div
                    className={cn(
                      "flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold",
                      item.isTopFit
                        ? "bg-[#17191d] text-white"
                        : "bg-[#f6f1eb] text-[#5b6470]",
                    )}
                  >
                    {item.rank}
                  </div>

                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-[1.35rem] font-bold tracking-[-0.03em] text-text-primary">
                        {item.methodologyTitle ?? item.methodologyId}
                      </h3>
                      <RankChip
                        label={content.fitLabels[item.fitTier]}
                        tone={item.isTopFit ? "emphasis" : "default"}
                      />
                    </div>

                    <MethodologyInterpretationTags
                      labels={interpretationLabels}
                    />

                    <p className="max-w-4xl text-sm leading-7 text-text-secondary lg:text-base">
                      {item.shortRationaleText ?? item.overviewText}
                    </p>
                  </div>
                </div>

                <div className="flex justify-end">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#dec9b1] bg-white text-[#3d434b] transition duration-200 group-hover:translate-x-1 group-hover:scale-[1.04] group-hover:border-[#d59b63] group-hover:bg-[#fff8f1]">
                    <ArrowRightIcon />
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

function InterpretationSummarySection({
  content,
  presentation,
}: {
  content: ResultsDictionary;
  presentation: InterpretationPresentation;
}) {
  return (
    <section>
      <InfoCard className="border-[#ddd7cf] bg-[#fbf8f4]">
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
              <p className="max-w-5xl text-base leading-8 text-text-secondary lg:text-[1.04rem]">
                {presentation.summary}
              </p>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-[1.7rem] border border-[#e5d9cc] bg-white/90 px-5 py-5">
              <div className="space-y-3">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#717780]">
                  {content.interpretation.primaryReasonLabel}
                </p>
                <p className="text-base leading-7 text-[#565c66]">
                  {presentation.primaryExplanation}
                </p>
              </div>
            </div>

            {presentation.secondaryExplanation ? (
              <div className="rounded-[1.7rem] border border-[#e5d9cc] bg-white/90 px-5 py-5">
                <div className="space-y-3">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#717780]">
                    {content.interpretation.secondaryReasonLabel}
                  </p>
                  <p className="text-base leading-7 text-[#565c66]">
                    {presentation.secondaryExplanation}
                  </p>
                </div>
              </div>
            ) : null}
          </div>

          {presentation.supportNote ? (
            <div className="rounded-[1.5rem] border border-[#e7ddd2] bg-[#f4efe8] px-5 py-4">
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#717780]">
                  {content.interpretation.supportNoteLabel}
                </p>
                <p className="text-sm leading-6 text-[#5f6670]">
                  {presentation.supportNote}
                </p>
              </div>
            </div>
          ) : null}
        </div>
      </InfoCard>
    </section>
  );
}

function BestFitSection({
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
    <section
      id={`result-methodology-${topResult.methodologyId}`}
      className="scroll-mt-36"
    >
      <MethodologyCardShell
        title={topResult.methodologyTitle ?? topResult.methodologyId}
        description={topResult.overviewText}
        signalTags={topResult.signalTags}
        interpretationLabels={interpretationLabels}
        badgeLabel={content.bestFit.badge}
        badgeTone="emphasis"
        className={getTopMatchSurfaceClasses()}
      >
        <div className="rounded-[2rem] border border-[#e7d7ca] bg-[#f6f1eb] px-6 py-6">
          <div className="space-y-4">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#717780]">
              {content.bestFit.dimensionsLabel}
            </p>
            <DimensionGrid dimensions={result.dimensions} />
          </div>
        </div>

        <div className="rounded-[2rem] border border-[#ddd1c7] bg-[#f7f4f0] px-6 py-5">
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#717780]">
              {content.bestFit.outcomeLabel}
            </p>
            <p className="text-base leading-8 text-[#565c66] lg:text-[1.05rem]">
              {topResult.outcomeText}
            </p>
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

function CriticalComplementarySection({
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
    <section
      id={`result-methodology-${item.methodologyId}`}
      className="scroll-mt-36"
    >
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
        headerActions={
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#17191d] text-sm font-bold text-white">
            {item.rank}
          </span>
        }
        className={getTopMatchSurfaceClasses()}
      >
        <div className="rounded-[2rem] border border-[#e3c7a7] bg-[#fff8f1] px-6 py-6">
          <div className="space-y-4">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#717780]">
              {content.bestFit.dimensionsLabel}
            </p>
            <DimensionGrid dimensions={result.dimensions} />
          </div>
        </div>

        <div className="rounded-[2rem] border border-[#e3cfbd] bg-[#fffaf4] px-6 py-5">
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#717780]">
              {content.bestFit.outcomeLabel}
            </p>
            <p className="text-base leading-8 text-[#565c66] lg:text-[1.05rem]">
              {item.outcomeText}
            </p>
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
      <div className="space-y-4">
        <div className="space-y-3">
          <h3 className="text-[1.55rem] font-bold tracking-[-0.04em] text-text-primary">
            {item.methodologyTitle ?? item.methodologyId}
          </h3>
          <MethodologyInterpretationTags labels={interpretationLabels} />
          <p className="max-w-3xl text-base leading-7 text-text-secondary">
            {item.shortRationaleText ?? item.overviewText}
          </p>
        </div>
      </div>

      <span className="flex shrink-0 items-start gap-3 pt-1">
        <RankChip label={content.fitLabels[item.fitTier]} />
        {item.signalTags[0] ? (
          <span className="rounded-full border border-[#ded5cb] bg-[#f6f1eb] px-4 py-2 text-sm font-bold text-[#5c626a]">
            {item.signalTags[0].labelText ?? item.signalTags[0].labelKey}
          </span>
        ) : null}
        <span className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full border border-[#ded5cb] bg-white text-[#5f6670] transition duration-200 group-hover:translate-x-1 group-hover:border-[#d59b63] group-hover:bg-[#fff8f1]">
          <ChevronDownIcon
            className={cn(
              "transition-transform",
              isExpanded ? "rotate-180" : "",
            )}
          />
        </span>
      </span>
    </button>
  );
}

function AlternativesSection({
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
  const [expandedAlternativeIds, setExpandedAlternativeIds] = useState<
    MethodologyId[]
  >([]);

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
        <h2 className="text-[1.8rem] font-bold tracking-[-0.04em] text-text-primary">
          {content.alternatives.title}
        </h2>
        <p className="max-w-4xl text-base leading-7 text-text-secondary">
          {content.alternatives.description}
        </p>
      </div>

      <div className="space-y-4">
        {alternatives.map((item, index) => {
          const isCollapsible = index >= collapseFromIndex;
          const isExpanded = expandedAlternativeIds.includes(
            item.methodologyId,
          );
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
                <InfoCard
                  className={cn(
                    "transition duration-200 hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(23,25,29,0.08)]",
                    getFlatLightSurfaceClasses(),
                  )}
                >
                  <AlternativeCollapsedPreview
                    item={item}
                    content={content}
                    interpretationLabels={interpretationLabels}
                    isExpanded={isExpanded}
                    onToggle={() => toggleAlternative(item.methodologyId)}
                  />
                </InfoCard>
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
                      getFlatLightSurfaceClasses(),
                    )}
                  >
                    <div className="rounded-[2rem] border border-[#e7d7ca] bg-[#f6f1eb] px-6 py-6">
                      <div className="space-y-4">
                        <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#717780]">
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
                        <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#717780]">
                          {content.bestFit.outcomeLabel}
                        </p>
                        <p className="text-base leading-8 text-[#565c66] lg:text-[1.05rem]">
                          {item.outcomeText}
                        </p>
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

function SaveResultsSection({
  content,
  resultCode,
  isCopied,
  onCopyCode,
}: {
  content: ResultsDictionary;
  resultCode: string;
  isCopied: boolean;
  onCopyCode: () => void;
}) {
  return (
    <section>
      <InfoCard className="border-border/70 bg-white/88">
        <div className="space-y-4">
          <div className="space-y-2">
            <h2 className="text-[1.8rem] font-bold tracking-[-0.04em] text-text-primary">
              {content.saveSection.title}
            </h2>
            <p className="max-w-3xl text-base leading-7 text-text-secondary">
              {content.saveSection.description}
            </p>
          </div>

          <div className="flex gap-6">
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
                    {isCopied
                      ? content.topActions.copiedLink
                      : content.topActions.copyLink}
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
                  <SecondaryButton className="opacity-70" disabled>
                    {content.topActions.pdfAction}
                  </SecondaryButton>
                  <SecondaryButton className="opacity-70" disabled>
                    {content.topActions.jsonAction}
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

function CompositeRecommendationsSection({
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
      <BestFitSection
        content={content}
        result={result}
        interpretation={interpretation}
      />
      <CriticalComplementarySection
        content={content}
        result={result}
        interpretation={interpretation}
      />
    </section>
  );
}

function BestFitMethodologySection({
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
        <h2 className="text-[1.8rem] font-bold tracking-[-0.04em] text-text-primary">
          {content.bestFit.sectionTitle}
        </h2>
        <p className="max-w-4xl text-base leading-7 text-text-secondary">
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
        <BestFitSection
          content={content}
          result={result}
          interpretation={interpretation}
        />
      )}
    </section>
  );
}

export function ResultsPageView({
  content,
  result,
  requestedCode,
  isHydrated,
}: ResultsPageViewProps) {
  const router = useRouter();
  const [isDownloadMenuOpen, setIsDownloadMenuOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (!isCopied) {
      return;
    }

    const timeoutId = window.setTimeout(() => setIsCopied(false), 1800);

    return () => window.clearTimeout(timeoutId);
  }, [isCopied]);

  const title = result?.summary.titleText ?? content.pageIntro.title;
  const description =
    result?.summary.introText ?? content.pageIntro.description;
  const resultCode = result?.resultCode ?? "";
  const interpretationPresentation = result
    ? buildInterpretationPresentation(result, content)
    : null;

  const copyCode = async () => {
    if (!resultCode) {
      return;
    }

    try {
      await navigator.clipboard.writeText(resultCode);
      setIsCopied(true);
      setIsDownloadMenuOpen(false);
    } catch {
      setIsCopied(false);
    }
  };

  const retakeAssessment = () => {
    const shouldRetake = window.confirm(content.topActions.resetConfirmation);

    if (!shouldRetake) {
      return;
    }

    clearAssessmentProgress();
    setIsDownloadMenuOpen(false);
    router.push(buildAssessmentBlockRoute(firstAssessmentBlockId));
  };

  return (
    <div className="relative overflow-hidden pb-14 pt-12 lg:pb-20 lg:pt-16">
      <HomeBackground />

      <PageContainer className="relative z-10 py-0">
        <div className="space-y-10 lg:space-y-12">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <SectionHeading
              as="h1"
              title={title}
              description={description}
              className="min-w-0 flex-1"
              titleClassName="lg:text-[4.2rem]"
              descriptionClassName="max-w-5xl text-lg leading-8 lg:text-[1.35rem]"
            />

            {result ? (
              <TopActionBar
                content={content}
                isDownloadMenuOpen={isDownloadMenuOpen}
                isCopied={isCopied}
                onToggleDownloadMenu={() =>
                  setIsDownloadMenuOpen((current) => !current)
                }
                onCopyCode={() => void copyCode()}
                onRetakeAssessment={retakeAssessment}
              />
            ) : null}
          </div>

          {!isHydrated ? (
            <InfoCard className="min-h-[18rem] animate-pulse bg-white/75" />
          ) : result ? (
            <>
              <InterpretationSummarySection
                content={content}
                presentation={interpretationPresentation!}
              />
              <RankedSummarySection
                content={content}
                ranking={result.ranking}
                interpretation={interpretationPresentation!.interpretation}
              />
              <BestFitMethodologySection
                content={content}
                result={result}
                interpretation={interpretationPresentation!.interpretation}
              />
              <AlternativesSection
                content={content}
                ranking={result.ranking}
                dimensions={result.dimensions}
                interpretation={interpretationPresentation!.interpretation}
              />
              <SaveResultsSection
                content={content}
                resultCode={result.resultCode}
                isCopied={isCopied}
                onCopyCode={copyCode}
              />
            </>
          ) : (
            <ResultsEmptyState
              content={content}
              requestedCode={requestedCode}
            />
          )}
        </div>
      </PageContainer>
    </div>
  );
}
