"use client";

import { useRouter } from "next/navigation";

import { AssessmentBlockHeader } from "@/components/assessment/AssessmentBlockHeader";
import { AssessmentNav } from "@/components/assessment/AssessmentNav";
import { AssessmentProgressBar } from "@/components/assessment/AssessmentProgressBar";
import { AnswerOptionCard } from "@/components/assessment/AnswerOptionCard";
import { QuestionCard } from "@/components/assessment/QuestionCard";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { assessmentBlockOrder } from "@/config/questionnaire";
import { useAssessmentState } from "@/hooks/useAssessmentState";
import { buildAssessmentBlockRoute, buildResultsRoute, routes } from "@/lib/routing/routes";
import type { AssessmentDictionary } from "@/types/common";
import type {
  AssessmentBlockId,
  LocalizedQuestionnaireContent,
  QuestionnaireConfig
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
  ui
}: AssessmentPageViewProps) {
  const router = useRouter();
  const currentBlockIndex = assessmentBlockOrder.findIndex((blockId) => blockId === currentBlockId);
  const currentBlock = questionnaire.blocks[currentBlockIndex];
  const currentBlockContent = content.blocks[currentBlock.id];
  const previousBlockId = assessmentBlockOrder[currentBlockIndex - 1];
  const nextBlockId = assessmentBlockOrder[currentBlockIndex + 1];
  const { selectedOptionIds, isCurrentBlockComplete, selectAnswer } = useAssessmentState({
    questionnaire,
    currentBlock
  });

  const progressLabel = ui.progressLabel
    .replace("{current}", String(currentBlockIndex + 1))
    .replace("{total}", String(assessmentBlockOrder.length));

  const nextActionLabel = nextBlockId ? ui.actions.nextBlock : ui.actions.finishAssessment;

  const handleBack = () => {
    if (previousBlockId) {
      router.push(buildAssessmentBlockRoute(previousBlockId));
      return;
    }

    router.push(routes.assessment);
  };

  const handleNext = () => {
    if (!isCurrentBlockComplete) {
      return;
    }

    if (nextBlockId) {
      router.push(buildAssessmentBlockRoute(nextBlockId));
      return;
    }

    router.push(buildResultsRoute());
  };

  return (
    <div className="relative overflow-hidden pb-12 pt-8 lg:pb-20 lg:pt-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-9rem] top-[-10rem] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,_rgba(246,217,188,0.58)_0%,_rgba(246,217,188,0)_70%)]"
      />

      <PageContainer className="relative z-10">
        <div className="space-y-6">
          <SectionHeading
            eyebrow={ui.eyebrow}
            as="h1"
            title={ui.title}
            description={ui.description}
            titleClassName="text-[2.4rem] leading-[0.98] tracking-[-0.05em] lg:text-[3.5rem]"
            descriptionClassName="max-w-[44rem] text-[1.05rem] leading-8"
          />

          <div className="overflow-hidden rounded-[40px] border border-[#e7d1bf] bg-[#f4eee8]">
            <div className="border-b border-[#ead8c9] px-5 py-5 lg:px-8 lg:py-6">
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
                  const questionContent = currentBlockContent.questions[question.id];

                  return (
                    <QuestionCard
                      key={question.id}
                      label={`${ui.questionLabel} ${index + 1}`}
                      title={questionContent.title}
                      helperText={questionContent.helperText}
                    >
                      <div
                        role="radiogroup"
                        aria-label={questionContent.title}
                        className="grid gap-3 lg:grid-cols-4"
                      >
                        {question.options.map((option) => {
                          const optionContent = questionContent.options[option.id];

                          return (
                            <AnswerOptionCard
                              key={option.id}
                              label={optionContent.label}
                              description={optionContent.description}
                              selectedLabel={ui.selectionLabel}
                              isSelected={selectedOptionIds[question.id] === option.id}
                              onSelect={() => selectAnswer(question.id, option)}
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
                isNextDisabled={!isCurrentBlockComplete}
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
