"use client";

import { useEffect, useMemo, useState } from "react";

import { useRouter } from "next/navigation";

import { AssessmentAnswersSummary } from "@/components/assessment/AssessmentAnswersSummary";
import { HomeBackground } from "@/components/backgrounds/HomeBackground";
import { PrimaryButton } from "@/components/controls/PrimaryButton";
import { SecondaryButton } from "@/components/controls/SecondaryButton";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeading } from "@/components/sections/SectionHeading";
import {
  glassFieldSurfaceClasses,
  glassPanelSurfaceClasses,
} from "@/components/surfaces/glassSurface";
import { buildAssessmentReviewBlocks } from "@/features/assessment/assessmentReview";
import { useLocale } from "@/hooks/useLocale";
import { getMethodologyContentMap } from "@/lib/methodology/getMethodologyContent";
import { buildResultObject } from "@/lib/result/buildResultObject";
import {
  buildAssessmentBlockRoute,
  buildResultsRoute,
  routes,
} from "@/lib/routing/routes";
import { normalizeAnswers } from "@/lib/assessment/normalizeAnswers";
import { loadAssessmentProgress } from "@/lib/storage/assessmentProgress";
import { saveAssessmentResult } from "@/lib/storage/results";
import { cn } from "@/lib/utils";
import type { AssessmentDictionary, ResultsDictionary } from "@/types/common";
import type {
  AssessmentProgress,
  DimensionKey,
  LocalizedQuestionnaireContent,
  QuestionnaireConfig,
} from "@/types/questionnaire";

interface AssessmentReviewPageViewProps {
  questionnaire: QuestionnaireConfig;
  content: LocalizedQuestionnaireContent;
  ui: AssessmentDictionary["questionnaire"];
  resultsDictionary: ResultsDictionary;
}

export function AssessmentReviewPageView({
  questionnaire,
  content,
  ui,
  resultsDictionary,
}: AssessmentReviewPageViewProps) {
  const router = useRouter();
  const { locale } = useLocale();
  const [progress, setProgress] = useState<AssessmentProgress | null>(null);

  useEffect(() => {
    const savedProgress = loadAssessmentProgress(questionnaire);

    if (!savedProgress) {
      router.replace(routes.assessment);
      return;
    }

    const normalizedAnswers = normalizeAnswers(
      questionnaire,
      savedProgress.answers,
    );
    const firstIncompleteBlockId = normalizedAnswers.missingRequiredBlockIds[0];

    if (!normalizedAnswers.isComplete) {
      router.replace(
        buildAssessmentBlockRoute(
          firstIncompleteBlockId ?? savedProgress.currentBlockId,
        ),
      );
      return;
    }

    setProgress(savedProgress);
  }, [questionnaire, router]);

  const reviewBlocks = useMemo(
    () =>
      progress
        ? buildAssessmentReviewBlocks(questionnaire, content, progress.answers)
        : [],
    [content, progress, questionnaire],
  );

  const handleConfirm = () => {
    if (!progress) {
      return;
    }

    const normalizedAnswers = normalizeAnswers(questionnaire, progress.answers);
    const firstIncompleteBlockId = normalizedAnswers.missingRequiredBlockIds[0];

    if (!normalizedAnswers.isComplete) {
      router.push(
        buildAssessmentBlockRoute(
          firstIncompleteBlockId ?? progress.currentBlockId,
        ),
      );
      return;
    }

    const dimensionLabels = Object.fromEntries(
      questionnaire.blocks.map((block) => [
        block.dimensionKey,
        content.blocks[block.id].title,
      ]),
    ) as Record<DimensionKey, string>;
    const result = buildResultObject({
      questionnaire,
      answers: progress.answers,
      locale,
      resultsDictionary,
      methodologyContentMap: getMethodologyContentMap(locale),
      dimensionLabels,
    });

    saveAssessmentResult(result);
    router.push(buildResultsRoute(result.resultCode));
  };

  if (!progress) {
    return (
      <div className="relative overflow-hidden pb-10 pt-12 lg:pb-20 lg:pt-16">
        <HomeBackground />
        <PageContainer className="relative z-10 py-0">
          <div
            className={cn(
              "rounded-[40px] px-6 py-10 text-center lg:px-10",
              glassPanelSurfaceClasses,
              "border-[#e7d1bf]/70 bg-[#f4eee8]/78",
            )}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#8b6a46]">
              {ui.review.loadingLabel}
            </p>
          </div>
        </PageContainer>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden pb-10 pt-12 lg:pb-20 lg:pt-16">
      <HomeBackground />
      <PageContainer className="relative z-10 py-0">
        <div className="space-y-10 lg:space-y-12">
          <SectionHeading
            as="h1"
            eyebrow={ui.review.eyebrow}
            title={ui.review.title}
            description={ui.review.description}
            titleClassName="lg:text-[4.25rem]"
            descriptionClassName="max-w-4xl text-lg leading-8 lg:text-[1.45rem]"
          />

          <div
            className={cn(
              "overflow-hidden rounded-[40px]",
              glassPanelSurfaceClasses,
              "border-[#e7d1bf]/70 bg-[#f4eee8]/78",
            )}
          >
            <div className="space-y-4 px-5 py-6 lg:px-8 lg:py-8">
              {reviewBlocks.length > 0 ? (
                <AssessmentAnswersSummary
                  blocks={reviewBlocks}
                  answerLabel={ui.review.answerLabel}
                  editLabel={ui.review.editAction}
                />
              ) : (
                <section
                  className={cn(
                    "rounded-[32px] px-5 py-8 text-center lg:px-8",
                    glassFieldSurfaceClasses,
                    "border-[#e7d1bf]/70 bg-[#fbf8f5]/76",
                  )}
                >
                  <h2 className="text-[1.4rem] font-bold leading-tight text-[#14171c]">
                    {ui.review.emptyTitle}
                  </h2>
                  <p className="mx-auto mt-3 max-w-2xl text-[0.98rem] leading-7 text-[#6a6e75]">
                    {ui.review.emptyDescription}
                  </p>
                </section>
              )}

              <div className="flex flex-col gap-4  pt-6 lg:flex-row lg:items-center lg:justify-between">
                <SecondaryButton
                  href={buildAssessmentBlockRoute(progress.currentBlockId)}
                  className="min-w-[14rem] justify-center"
                >
                  {ui.actions.back}
                </SecondaryButton>
                <PrimaryButton
                  type="button"
                  onClick={handleConfirm}
                  className="min-w-[16rem] justify-center"
                >
                  {ui.actions.confirmAnswers}
                </PrimaryButton>
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </div>
  );
}
