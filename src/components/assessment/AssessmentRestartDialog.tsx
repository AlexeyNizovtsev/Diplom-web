"use client";

import { createPortal } from "react-dom";
import { useEffect } from "react";

import { InfoCard } from "@/components/cards/InfoCard";
import { CloseIcon } from "@/components/icons/CloseIcon";
import { PrimaryButton } from "@/components/controls/PrimaryButton";
import { SecondaryButton } from "@/components/controls/SecondaryButton";

interface AssessmentRestartDialogProps {
  title: string;
  description: string;
  primaryCtaLabel: string;
  resumeCtaLabel: string;
  dismissCtaLabel: string;
  helperNote?: string;
  onStartOver: () => void;
  onResume: () => void;
  onDismiss: () => void;
}

export function AssessmentRestartDialog({
  title,
  description,
  primaryCtaLabel,
  resumeCtaLabel,
  dismissCtaLabel,
  helperNote,
  onStartOver,
  onResume,
  onDismiss,
}: AssessmentRestartDialogProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onDismiss();
      }
    };

    const { overflow } = document.body.style;

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onDismiss]);

  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-[rgba(17,19,24,0.42)] px-4 py-6 backdrop-blur-[6px]"
      role="presentation"
      onClick={onDismiss}
    >
      <div
        className="w-full max-w-[34rem]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="assessment-restart-dialog-title"
        onClick={(event) => event.stopPropagation()}
      >
        <InfoCard className="rounded-[32px] border-white/35 bg-card/96 p-6 shadow-[0_28px_80px_rgba(17,19,24,0.22)] lg:p-8">
          <div className="space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-3">
                <h3
                  id="assessment-restart-dialog-title"
                  className="text-[1.45rem] font-extrabold leading-[1.02] tracking-[-0.04em] text-text-primary lg:text-[1.7rem]"
                >
                  {title}
                </h3>
                <p className="text-[0.98rem] leading-[1.55] text-text-secondary lg:text-[1.02rem]">
                  {description}
                </p>
              </div>
              <button
                type="button"
                onClick={onDismiss}
                aria-label={dismissCtaLabel}
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border/16 bg-white/55 text-text-secondary transition hover:bg-white/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <CloseIcon className="h-4 w-4" />
              </button>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <div className="w-full space-y-2 sm:w-[14.5rem]">
                {helperNote ? (
                  <p className="text-center text-sm font-semibold text-[#646973]">
                    {helperNote}
                  </p>
                ) : null}
                <SecondaryButton
                  onClick={onResume}
                  className="w-full px-6 py-4 text-base"
                >
                  {resumeCtaLabel}
                </SecondaryButton>
              </div>
              <div className="w-full content-end sm:w-[14.5rem]">
                <PrimaryButton
                  onClick={onStartOver}
                  className="w-full px-6 py-4 text-base"
                >
                  {primaryCtaLabel}
                </PrimaryButton>
              </div>
            </div>
          </div>
        </InfoCard>
      </div>
    </div>,
    document.body,
  );
}
