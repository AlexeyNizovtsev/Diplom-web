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
import { buildAssessmentBlockRoute, buildMethodologyRoute, routes } from "@/lib/routing/routes";
import { clearAssessmentProgress } from "@/lib/storage/assessmentProgress";
import { cn } from "@/lib/utils";
import type { ResultsDictionary } from "@/types/common";
import type { MethodologyId } from "@/types/methodology";
import type { DimensionKey } from "@/types/questionnaire";
import type { AssessmentResult, DimensionResult, RankedMethodologyResult } from "@/types/result";

interface ResultsPageViewProps {
  content: ResultsDictionary;
  result: AssessmentResult | null;
  requestedCode?: string;
  isHydrated: boolean;
}

function RankChip({
  label,
  tone = "default"
}: {
  label: string;
  tone?: "default" | "emphasis";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.18em]",
        tone === "emphasis" ? "bg-[#17191d] text-white" : "bg-[#fff4e8] text-[#5d4630]"
      )}
    >
      {label}
    </span>
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
      <span className="min-w-[3rem] text-sm font-bold text-[#5a6069]">{level} / 3</span>
    </div>
  );
}

function ResultCardLink({
  label,
  methodologyId
}: {
  label: string;
  methodologyId: MethodologyId;
}) {
  return (
    <SecondaryButton
      href={buildMethodologyRoute(methodologyId)}
      className="w-full justify-between lg:w-auto"
      trailingIcon={<ArrowRightIcon />}
    >
      {label}
    </SecondaryButton>
  );
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 4v10" strokeLinecap="round" />
      <path d="m8 11 4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 18h14" strokeLinecap="round" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
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
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path
        d="M20 11a8 8 0 1 1-2.34-5.66"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M20 4v6h-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ActionIconButton({
  label,
  icon,
  onClick,
  isActive = false
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
        "inline-flex h-12 w-12 items-center justify-center rounded-full border transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        isActive
          ? "border-[#f0bf90] bg-[#fff2e5] text-[#8d4d14]"
          : "border-border/70 bg-white/82 text-text-primary shadow-soft backdrop-blur hover:-translate-y-0.5 hover:bg-white"
      )}
    >
      <span aria-hidden="true">{icon}</span>
    </button>
  );
}

function ResultsEmptyState({
  content,
  requestedCode
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
            <p className="mt-2 text-lg font-bold text-text-primary">{requestedCode}</p>
          </div>
        ) : null}

        <div className="flex flex-wrap gap-3">
          <PrimaryButton href={routes.assessment}>{content.emptyState.openAssessment}</PrimaryButton>
          <SecondaryButton href={routes.home}>{content.emptyState.returnHome}</SecondaryButton>
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
  onRetakeAssessment
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
                <SecondaryButton className="w-full justify-start opacity-70" disabled>
                  {content.topActions.pdfAction}
                </SecondaryButton>
                <SecondaryButton className="w-full justify-start opacity-70" disabled>
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
              <p className="text-sm font-bold text-[#666d76]">{dimension.labelText}</p>
              <ScoreBar level={dimension.level} />
            </div>
            <p className="text-sm leading-6 text-[#59606a]">{dimension.summaryText}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function BestFitSection({
  content,
  result
}: {
  content: ResultsDictionary;
  result: AssessmentResult;
}) {
  const topResult = result.ranking[0];

  return (
    <section id={`result-methodology-${topResult.methodologyId}`} className="scroll-mt-36">
      <InfoCard className="border-[#f3d4bb] bg-[#fff6ed]">
        <div className="space-y-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-4xl space-y-4">
              <h2 className="text-[2.35rem] font-bold tracking-[-0.05em] text-text-primary lg:text-[3rem]">
                {topResult.methodologyTitle}
              </h2>
              <p className="text-base leading-8 text-[#5a6069] lg:text-[1.05rem]">
                {topResult.overviewText}
              </p>
              <div className="flex flex-wrap gap-3">
                {topResult.signalTags.map((tag) => (
                  <span
                    key={tag.id}
                    className="rounded-full border border-[#f2b37a] bg-[#f47a12] px-4 py-2 text-sm font-bold text-white"
                  >
                    {tag.labelText}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex lg:justify-end">
              <RankChip label={content.bestFit.badge} tone="emphasis" />
            </div>
          </div>

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
        </div>
      </InfoCard>
    </section>
  );
}

function AlternativeDimensionsPanel({
  label,
  item,
  dimensionLabels
}: {
  label: string;
  item: RankedMethodologyResult;
  dimensionLabels: Record<DimensionKey, string>;
}) {
  return (
    <div className="rounded-[1.7rem] border border-[#efd7c0] bg-[#fff8f1] px-5 py-5">
      <div className="space-y-4">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#b96c1a]">{label}</p>
        <div className="space-y-4">
          {item.dimensionHighlights.slice(0, 3).map((dimension) => (
            <div
              key={dimension.dimensionKey}
              className="space-y-2 rounded-[1.2rem] border border-[#f3dcc6] bg-white px-4 py-4"
            >
              <p className="text-sm font-bold text-[#6a4a28]">
                {dimensionLabels[dimension.dimensionKey] ?? dimension.dimensionKey}
              </p>
              <ScoreBar level={dimension.level} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AlternativesSection({
  content,
  ranking,
  dimensions
}: {
  content: ResultsDictionary;
  ranking: RankedMethodologyResult[];
  dimensions: DimensionResult[];
}) {
  const alternatives = ranking.slice(1);
  const dimensionLabels = Object.fromEntries(
    dimensions.map((dimension) => [dimension.dimensionKey, dimension.labelText ?? dimension.dimensionKey])
  ) as Record<DimensionKey, string>;

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
        {alternatives.map((item) => (
          <InfoCard
            key={item.methodologyId}
            className="scroll-mt-36 border-border/70 bg-white/90"
          >
            <article id={`result-methodology-${item.methodologyId}`} className="space-y-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-4xl space-y-3">
                  <h3 className="text-[1.6rem] font-bold tracking-[-0.04em] text-text-primary">
                    {item.methodologyTitle}
                  </h3>
                  <p className="text-base leading-7 text-text-secondary">
                    {item.shortRationaleText}
                  </p>
                </div>

                <div className="flex lg:justify-end">
                  <RankChip label={content.fitLabels[item.fitTier]} />
                </div>
              </div>

              <div className="grid gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
                <div className="space-y-3">
                  <p className="text-base leading-7 text-[#575e68]">{item.overviewText}</p>
                  <p className="text-sm leading-6 text-[#6a7079]">{item.tradeoffText}</p>
                </div>

                <div className="space-y-4">
                  <AlternativeDimensionsPanel
                    label={content.bestFit.dimensionsLabel}
                    item={item}
                    dimensionLabels={dimensionLabels}
                  />
                  <div className="rounded-[1.7rem] border border-border/70 bg-[#fbfaf8] px-5 py-5">
                    <div className="space-y-3">
                      <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#7a8088]">
                        {content.bestFit.outcomeLabel}
                      </p>
                      <p className="text-sm leading-6 text-[#5f6670]">{item.outcomeText}</p>
                    </div>
                  </div>
                </div>
              </div>

              <ResultCardLink
                label={content.bestFit.actionLabel}
                methodologyId={item.methodologyId}
              />
            </article>
          </InfoCard>
        ))}
      </div>
    </section>
  );
}

function SaveResultsSection({
  content,
  resultCode,
  isCopied,
  onCopyCode
}: {
  content: ResultsDictionary;
  resultCode: string;
  isCopied: boolean;
  onCopyCode: () => void;
}) {
  return (
    <section>
      <InfoCard className="border-border/70 bg-white/88">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(18rem,0.95fr)] lg:items-start">
          <div className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-[1.8rem] font-bold tracking-[-0.04em] text-text-primary">
                {content.saveSection.title}
              </h2>
              <p className="max-w-3xl text-base leading-7 text-text-secondary">
                {content.saveSection.description}
              </p>
            </div>

            <div className="rounded-[1.8rem] border border-[#ead9cc] bg-[#fbfaf7] px-5 py-5">
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#7a8088]">
                  {content.saveSection.resultCodeLabel}
                </p>
                <p className="text-xl font-bold tracking-[0.04em] text-text-primary">
                  {resultCode}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[1.8rem] border border-[#ead9cc] bg-[#f8f4ee] px-5 py-5">
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
                <PrimaryButton onClick={onCopyCode}>
                  {isCopied ? content.topActions.copiedLink : content.topActions.copyLink}
                </PrimaryButton>
              </div>
              <p className="text-sm leading-6 text-text-secondary">
                {content.topActions.placeholderNote}
              </p>
            </div>
          </div>
        </div>
      </InfoCard>
    </section>
  );
}

export function ResultsPageView({
  content,
  result,
  requestedCode,
  isHydrated
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
  const description = result?.summary.introText ?? content.pageIntro.description;
  const resultCode = result?.resultCode ?? "";

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
    clearAssessmentProgress();
    setIsDownloadMenuOpen(false);
    router.push(buildAssessmentBlockRoute(firstAssessmentBlockId));
  };

  return (
    <div className="relative overflow-hidden pb-14 pt-12 lg:pb-20 lg:pt-16">
      <HomeBackground />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-7rem] top-[-5rem] z-[1] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,_rgba(244,122,18,0.16)_0%,_rgba(244,122,18,0)_72%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-10rem] top-[18%] z-[1] h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,_rgba(255,255,255,0.9)_0%,_rgba(255,255,255,0)_72%)]"
      />

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
                onToggleDownloadMenu={() => setIsDownloadMenuOpen((current) => !current)}
                onCopyCode={() => void copyCode()}
                onRetakeAssessment={retakeAssessment}
              />
            ) : null}
          </div>

          {!isHydrated ? (
            <InfoCard className="min-h-[18rem] animate-pulse bg-white/75" />
          ) : result ? (
            <>
              <BestFitSection content={content} result={result} />
              <AlternativesSection
                content={content}
                ranking={result.ranking}
                dimensions={result.dimensions}
              />
              <SaveResultsSection
                content={content}
                resultCode={result.resultCode}
                isCopied={isCopied}
                onCopyCode={copyCode}
              />
            </>
          ) : (
            <ResultsEmptyState content={content} requestedCode={requestedCode} />
          )}
        </div>
      </PageContainer>
    </div>
  );
}
