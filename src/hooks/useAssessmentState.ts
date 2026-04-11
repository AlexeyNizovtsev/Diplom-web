"use client";

import { useEffect, useMemo, useState } from "react";

import {
  createEmptyAssessmentProgress,
  getMissingRequiredQuestionIds,
  getSelectedOptionIds
} from "@/features/assessment/assessmentSelectors";
import { loadAssessmentProgress, saveAssessmentProgress } from "@/lib/storage/assessmentProgress";
import type {
  AssessmentProgress,
  QuestionnaireBlockConfig,
  QuestionnaireConfig,
  QuestionnaireOptionConfig
} from "@/types/questionnaire";

interface UseAssessmentStateProps {
  questionnaire: QuestionnaireConfig;
  currentBlock: QuestionnaireBlockConfig;
}

export function useAssessmentState({
  questionnaire,
  currentBlock
}: UseAssessmentStateProps) {
  const [progress, setProgress] = useState<AssessmentProgress>(
    createEmptyAssessmentProgress(questionnaire.version, currentBlock.id)
  );
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    const savedProgress = loadAssessmentProgress(questionnaire);
    const nextProgress = createEmptyAssessmentProgress(questionnaire.version, currentBlock.id);

    if (savedProgress && savedProgress.questionnaireVersion === questionnaire.version) {
      nextProgress.answers = savedProgress.answers ?? {};
    }

    setProgress(nextProgress);
    setHasHydrated(true);
  }, [currentBlock.id, questionnaire]);

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

  const selectedOptionIds = useMemo(
    () => getSelectedOptionIds(progress.answers),
    [progress.answers]
  );
  const missingRequiredQuestionIds = useMemo(
    () => getMissingRequiredQuestionIds(currentBlock, progress.answers),
    [currentBlock, progress.answers]
  );

  return {
    hasHydrated,
    progress,
    selectedOptionIds,
    missingRequiredQuestionIds,
    isCurrentBlockComplete: missingRequiredQuestionIds.length === 0,
    selectAnswer
  };
}
