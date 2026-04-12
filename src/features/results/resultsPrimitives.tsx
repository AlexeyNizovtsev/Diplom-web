"use client";

import type { ReactNode, SVGProps } from "react";

import { InfoCard } from "@/components/cards/InfoCard";
import { PrimaryButton } from "@/components/controls/PrimaryButton";
import { ArrowRightIcon } from "@/components/icons/ArrowRightIcon";
import { buildMethodologyRoute } from "@/lib/routing/routes";
import { cn } from "@/lib/utils";
import type { MethodologyId } from "@/types/methodology";
import type { DimensionResult, RankedMethodologyResult } from "@/types/result";

import {
  resultsCardBodyClass,
  resultsCardTitleClass,
  resultsMutedBodyClass,
} from "@/features/results/resultsStyles";

export function RankChip({
  label,
  tone = "default",
}: {
  label: string;
  tone?: "default" | "emphasis";
}) {
  return (
    <span
      className={cn(
        "inline-flex w-fit shrink-0 whitespace-nowrap items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.18em]",
        tone === "emphasis"
          ? "bg-[#17191d] text-white"
          : "bg-[#fff4e8] text-[#5d4630]",
      )}
    >
      {label}
    </span>
  );
}

export function ChevronDownIcon({ className }: { className?: string }) {
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

export function ScoreBar({ level }: { level: number }) {
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

export function MethodologySignalTags({
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

export function MethodologyInterpretationTags({ labels }: { labels: string[] }) {
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

export function ResultCardLink({
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

export function MethodologyCardShell({
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
          <div className="max-w-5xl space-y-4">
            <TitleTag
              className={cn(
                resultsCardTitleClass,
                titleLevel === "h2"
                  ? "text-[2.05rem] lg:text-[2.55rem]"
                  : "text-[1.7rem] lg:text-[2rem]",
              )}
            >
              {title}
            </TitleTag>
            <div className="space-y-3">
              {summary ? (
                <p className="text-sm font-semibold leading-6 text-[#646b74] lg:text-base">
                  {summary}
                </p>
              ) : null}
              {description ? <p className={resultsCardBodyClass}>{description}</p> : null}
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

export function DownloadIcon() {
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

export function LinkIcon() {
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

export function ResetIcon() {
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

export function ActionIconButton({
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

export function DimensionGrid({ dimensions }: { dimensions: DimensionResult[] }) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {dimensions.map((dimension) => (
        <div
          key={dimension.dimensionKey}
          className="rounded-[1.8rem] border border-[#ead9cc] bg-white px-5 py-5"
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-bold text-[#666d76]">
                {dimension.labelText}
              </p>
              <ScoreBar level={dimension.level} />
            </div>
            <p className={resultsMutedBodyClass}>{dimension.summaryText}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
