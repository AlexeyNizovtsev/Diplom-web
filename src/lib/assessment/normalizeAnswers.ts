import type {
  AssessmentBlockId,
  AssessmentProgress,
  QuestionnaireConfig,
  SignalMapping
} from "@/types/questionnaire";

export interface NormalizedAssessmentAnswer {
  blockId: AssessmentBlockId;
  questionId: string;
  selectedOptionId: string;
  signalMappings: SignalMapping[];
}

export interface NormalizedAssessmentAnswers {
  questionnaireVersion: string;
  answers: NormalizedAssessmentAnswer[];
  answersByQuestionId: Record<string, NormalizedAssessmentAnswer>;
  missingRequiredQuestionIds: string[];
  missingRequiredBlockIds: AssessmentBlockId[];
  isComplete: boolean;
}

function getQuestionOption(
  questionnaire: QuestionnaireConfig,
  questionId: string,
  optionId: string
) {
  for (const block of questionnaire.blocks) {
    const question = block.questions.find((candidate) => candidate.id === questionId);

    if (!question) {
      continue;
    }

    return {
      blockId: block.id,
      option: question.options.find((candidate) => candidate.id === optionId)
    };
  }

  return null;
}

export function normalizeAnswers(
  questionnaire: QuestionnaireConfig,
  answers: AssessmentProgress["answers"]
): NormalizedAssessmentAnswers {
  const normalizedAnswers: NormalizedAssessmentAnswer[] = [];
  const answersByQuestionId: Record<string, NormalizedAssessmentAnswer> = {};
  const missingRequiredQuestionIds: string[] = [];
  const missingRequiredBlockIds: AssessmentBlockId[] = [];

  for (const block of questionnaire.blocks) {
    let blockHasMissingAnswers = false;

    for (const question of block.questions) {
      const storedAnswer = answers[question.id];

      if (!storedAnswer) {
        if (question.required) {
          missingRequiredQuestionIds.push(question.id);
          blockHasMissingAnswers = true;
        }

        continue;
      }

      const matchedOption = getQuestionOption(
        questionnaire,
        storedAnswer.questionId,
        storedAnswer.selectedOptionId
      );

      if (!matchedOption?.option || storedAnswer.questionId !== question.id) {
        if (question.required) {
          missingRequiredQuestionIds.push(question.id);
          blockHasMissingAnswers = true;
        }

        continue;
      }

      const normalizedAnswer: NormalizedAssessmentAnswer = {
        blockId: matchedOption.blockId,
        questionId: question.id,
        selectedOptionId: matchedOption.option.id,
        signalMappings: matchedOption.option.signalMapping
      };

      normalizedAnswers.push(normalizedAnswer);
      answersByQuestionId[question.id] = normalizedAnswer;
    }

    if (blockHasMissingAnswers) {
      missingRequiredBlockIds.push(block.id);
    }
  }

  return {
    questionnaireVersion: questionnaire.version,
    answers: normalizedAnswers,
    answersByQuestionId,
    missingRequiredQuestionIds,
    missingRequiredBlockIds,
    isComplete: missingRequiredQuestionIds.length === 0
  };
}
