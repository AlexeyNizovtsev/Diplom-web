"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { AssessmentBlockHeader } from "@/components/assessment/AssessmentBlockHeader";
import { AssessmentNav } from "@/components/assessment/AssessmentNav";
import { AssessmentProgressBar } from "@/components/assessment/AssessmentProgressBar";
import { AnswerOptionCard } from "@/components/assessment/AnswerOptionCard";
import { QuestionCard } from "@/components/assessment/QuestionCard";
import { HomeBackground } from "@/components/backgrounds/HomeBackground";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { glassPanelSurfaceClasses } from "@/components/surfaces/glassSurface";
import { assessmentBlockOrder } from "@/config/questionnaire";
import { useAssessmentState } from "@/hooks/useAssessmentState";
import { useLocale } from "@/hooks/useLocale";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { getMethodologyContentMap } from "@/lib/methodology/getMethodologyContent";
import { buildResultObject } from "@/lib/result/buildResultObject";
import {
  buildAssessmentBlockRoute,
  buildResultsRoute,
  routes,
} from "@/lib/routing/routes";
import { saveAssessmentResult } from "@/lib/storage/results";
import { cn } from "@/lib/utils";
import { normalizeAnswers } from "@/lib/assessment/normalizeAnswers";
import type { AssessmentDictionary } from "@/types/common";
import type {
  AssessmentBlockId,
  DimensionKey,
  LocalizedQuestionnaireContent,
  QuestionnaireConfig,
} from "@/types/questionnaire";

interface AssessmentPageViewProps {
  currentBlockId: AssessmentBlockId;
  questionnaire: QuestionnaireConfig;
  content: LocalizedQuestionnaireContent;
  ui: AssessmentDictionary["questionnaire"];
}

export function AssessmentPageView({
  currentBlockId,
  questionnaire,
  content,
  ui,
}: AssessmentPageViewProps) {
  const router = useRouter();
  const { locale } = useLocale();
  const dictionary = getDictionary(locale);
  const [showValidationMessage, setShowValidationMessage] = useState(false);
  const currentBlockIndex = assessmentBlockOrder.findIndex(
    (blockId) => blockId === currentBlockId,
  );
  const currentBlock = questionnaire.blocks[currentBlockIndex];
  const currentBlockContent = content.blocks[currentBlock.id];
  const previousBlockId = assessmentBlockOrder[currentBlockIndex - 1];
  const nextBlockId = assessmentBlockOrder[currentBlockIndex + 1];
  const questionOffset = questionnaire.blocks
    .slice(0, currentBlockIndex)
    .reduce((count, block) => count + block.questions.length, 0);
  const { progress, selectedOptionIds, isCurrentBlockComplete, selectAnswer } =
    useAssessmentState({
      questionnaire,
      currentBlock,
    });

  const progressLabel = ui.progressLabel
    .replace("{current}", String(currentBlockIndex + 1))
    .replace("{total}", String(assessmentBlockOrder.length));

  const nextActionLabel = nextBlockId
    ? ui.actions.nextBlock
    : ui.actions.finishAssessment;

  useEffect(() => {
    setShowValidationMessage(false);
  }, [currentBlockId, isCurrentBlockComplete]);

  const handleBack = () => {
    if (previousBlockId) {
      router.push(buildAssessmentBlockRoute(previousBlockId));
      return;
    }

    router.push(routes.assessment);
  };

  const handleNext = () => {
    if (!isCurrentBlockComplete) {
      setShowValidationMessage(true);
      return;
    }

    if (nextBlockId) {
      router.push(buildAssessmentBlockRoute(nextBlockId));
      return;
    }

    const normalizedAnswers = normalizeAnswers(questionnaire, progress.answers);

    if (!normalizedAnswers.isComplete) {
      const firstIncompleteBlockId = normalizedAnswers.missingRequiredBlockIds[0];

      if (firstIncompleteBlockId) {
        router.push(buildAssessmentBlockRoute(firstIncompleteBlockId));
        return;
      }

      setShowValidationMessage(true);
      return;
    }

    const dimensionLabels = Object.fromEntries(
      questionnaire.blocks.map((block) => [block.dimensionKey, content.blocks[block.id].title]),
    ) as Record<DimensionKey, string>;
    const result = buildResultObject({
      questionnaire,
      answers: progress.answers,
      locale,
      resultsDictionary: dictionary.results,
      methodologyContentMap: getMethodologyContentMap(locale),
      dimensionLabels,
    });

    saveAssessmentResult(result);
    router.push(buildResultsRoute(result.resultCode));
  };

  return (
    <div className="relative overflow-hidden pb-10 pt-12 lg:pb-20 lg:pt-16">
      <HomeBackground />
      <PageContainer className="relative z-10 py-0">
        <div className="space-y-10 lg:space-y-12">
          <SectionHeading
            as="h1"
            title={ui.title}
            description={ui.description}
            titleClassName="lg:text-[4.25rem]"
            descriptionClassName="max-w-4xl text-lg leading-8 lg:text-[1.6rem]"
          />

          <div
            className={cn(
              "overflow-hidden rounded-[40px]",
              glassPanelSurfaceClasses,
              "border-[#e7d1bf]/70 bg-[#f4eee8]/78",
            )}
          >
            <div className="border-b border-[#ead8c9]/80 ">
              <AssessmentProgressBar
                currentStep={currentBlockIndex + 1}
                totalSteps={assessmentBlockOrder.length}
                label={progressLabel}
              />
            </div>

            <div className="space-y-6 px-5 py-6 lg:px-8 lg:py-8">
              <AssessmentBlockHeader
                badgeLabel={ui.blockOrderLabels[currentBlock.id]}
                title={currentBlockContent.title}
                helperText={currentBlockContent.helperText}
              />

              <div className="space-y-5">
                {currentBlock.questions.map((question, index) => {
                  const questionContent =
                    currentBlockContent.questions[question.id];

                  return (
                    <QuestionCard
                      key={question.id}
                      label={`${ui.questionLabel} ${questionOffset + index + 1}`}
                      title={questionContent.title}
                      helperText={questionContent.helperText}
                    >
                      <div
                        role="radiogroup"
                        aria-label={questionContent.title}
                        className="grid gap-3 lg:grid-cols-4"
                      >
                        {question.options.map((option) => {
                          const optionContent =
                            questionContent.options[option.id];

                          return (
                            <AnswerOptionCard
                              key={option.id}
                              label={optionContent.label}
                              description={optionContent.description}
                              isSelected={
                                selectedOptionIds[question.id] === option.id
                              }
                              onSelect={() => {
                                selectAnswer(question.id, option);
                                setShowValidationMessage(false);
                              }}
                            />
                          );
                        })}
                      </div>
                    </QuestionCard>
                  );
                })}
              </div>

              <AssessmentNav
                backLabel={ui.actions.back}
                nextLabel={nextActionLabel}
                autosaveLabel={ui.autosaveNote}
                validationMessage={ui.validationMessage}
                showValidationMessage={showValidationMessage}
                onBack={handleBack}
                onNext={handleNext}
              />
            </div>
          </div>
        </div>
      </PageContainer>
    </div>
  );
}
