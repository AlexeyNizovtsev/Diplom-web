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
import {
  buildAssessmentBlockRoute,
  buildAssessmentReviewRoute,
  routes,
} from "@/lib/routing/routes";
import { cn } from "@/lib/utils";
import type { AssessmentDictionary } from "@/types/common";
import type {
  AssessmentBlockId,
  LocalizedQuestionnaireContent,
  QuestionnaireConfig,
} from "@/types/questionnaire";

interface AssessmentPageViewProps {
  currentBlockId: AssessmentBlockId;
  questionnaire: QuestionnaireConfig;
  content: LocalizedQuestionnaireContent;
  ui: AssessmentDictionary["questionnaire"];
  returnToReview?: boolean;
}

export function AssessmentPageView({
  currentBlockId,
  questionnaire,
  content,
  ui,
  returnToReview = false,
}: AssessmentPageViewProps) {
  const router = useRouter();
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
  const { selectedOptionIds, isCurrentBlockComplete, selectAnswer } =
    useAssessmentState({
      questionnaire,
      currentBlock,
    });

  const progressLabel = ui.progressLabel
    .replace("{current}", String(currentBlockIndex + 1))
    .replace("{total}", String(assessmentBlockOrder.length));

  const nextActionLabel = nextBlockId
    ? returnToReview
      ? ui.actions.saveAndReturn
      : ui.actions.nextBlock
    : returnToReview
      ? ui.actions.saveAndReturn
      : ui.actions.reviewAnswers;

  useEffect(() => {
    setShowValidationMessage(false);
  }, [currentBlockId, isCurrentBlockComplete, returnToReview]);

  const handleBack = () => {
    if (returnToReview) {
      router.push(buildAssessmentReviewRoute());
      return;
    }

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

    if (returnToReview) {
      router.push(buildAssessmentReviewRoute());
      return;
    }

    if (nextBlockId) {
      router.push(buildAssessmentBlockRoute(nextBlockId));
      return;
    }

    router.push(buildAssessmentReviewRoute());
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
                      id={question.id}
                      label={`${ui.questionLabel} ${questionOffset + index + 1}`}
                      title={questionContent.title}
                      helperText={questionContent.helperText}
                      className="scroll-mt-32"
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
                backLabel={returnToReview ? ui.actions.backToReview : ui.actions.back}
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
