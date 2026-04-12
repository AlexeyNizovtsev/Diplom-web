"use client";

import { useEffect } from "react";

import { InfoCard } from "@/components/cards/InfoCard";
import { AssessmentAnswersSummary } from "@/components/assessment/AssessmentAnswersSummary";
import type { AssessmentReviewBlockItem } from "@/features/assessment/assessmentReview";

interface AssessmentAnswersDialogProps {
  ariaLabel: string;
  blocks: AssessmentReviewBlockItem[];
  answerLabel: string;
  onDismiss: () => void;
}

export function AssessmentAnswersDialog({
  ariaLabel,
  blocks,
  answerLabel,
  onDismiss,
}: AssessmentAnswersDialogProps) {
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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(17,19,24,0.42)] px-4 py-6 backdrop-blur-[6px]"
      role="presentation"
      onClick={onDismiss}
    >
      <div
        className="w-full max-w-[74rem]"
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        onClick={(event) => event.stopPropagation()}
      >
        <InfoCard className="max-h-[86vh] overflow-y-auto rounded-[32px] border-white/35 bg-card/96 p-4 shadow-[0_28px_80px_rgba(17,19,24,0.22)] lg:p-5">
          <AssessmentAnswersSummary
            blocks={blocks}
            answerLabel={answerLabel}
            density="compact"
          />
        </InfoCard>
      </div>
    </div>
  );
}
