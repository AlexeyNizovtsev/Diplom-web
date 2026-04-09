"use client";

import { useEffect, useState } from "react";

import { loadAssessmentProgress, saveAssessmentProgress } from "@/lib/storage/assessmentProgress";
import type {
  AssessmentBlockId,
  AssessmentProgress,
  QuestionnaireBlockConfig,
  QuestionnaireConfig,
  QuestionnaireOptionConfig
} from "@/types/questionnaire";

interface UseAssessmentStateProps {
  questionnaire: QuestionnaireConfig;
  currentBlock: QuestionnaireBlockConfig;
}

function createEmptyProgress(
  questionnaireVersion: string,
  currentBlockId: AssessmentBlockId
): AssessmentProgress {
  return {
    questionnaireVersion,
    currentBlockId,
    answers: {}
  };
}

export function useAssessmentState({
  questionnaire,
  currentBlock
}: UseAssessmentStateProps) {
  const [progress, setProgress] = useState<AssessmentProgress>(
    createEmptyProgress(questionnaire.version, currentBlock.id)
  );
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    const savedProgress = loadAssessmentProgress(questionnaire.version);
    const nextProgress = createEmptyProgress(questionnaire.version, currentBlock.id);

    if (savedProgress && savedProgress.questionnaireVersion === questionnaire.version) {
      nextProgress.answers = savedProgress.answers ?? {};
    }

    setProgress(nextProgress);
    setHasHydrated(true);
  }, [currentBlock.id, questionnaire.version]);

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    saveAssessmentProgress(progress);
  }, [hasHydrated, progress]);

  const selectAnswer = (questionId: string, option: QuestionnaireOptionConfig) => {
    setProgress((currentProgress) => ({
      questionnaireVersion: questionnaire.version,
      currentBlockId: currentBlock.id,
      answers: {
        ...currentProgress.answers,
        [questionId]: {
          questionId,
          selectedOptionId: option.id,
          resolvedSignalMapping: option.signalMapping
        }
      }
    }));
  };

  const selectedOptionIds = Object.fromEntries(
    Object.entries(progress.answers).map(([questionId, answer]) => [questionId, answer.selectedOptionId])
  );

  const isCurrentBlockComplete = currentBlock.questions.every((question) => {
    if (!question.required) {
      return true;
    }

    return Boolean(progress.answers[question.id]);
  });

  return {
    selectedOptionIds,
    isCurrentBlockComplete,
    selectAnswer
  };
}
