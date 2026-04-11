import { firstAssessmentBlockId } from "@/config/questionnaire";
import type {
  AssessmentBlockId,
  AssessmentProgress,
  AssessmentStoredAnswer,
  QuestionnaireBlockConfig,
  QuestionnaireConfig
} from "@/types/questionnaire";

export function createEmptyAssessmentProgress(
  questionnaireVersion: string,
  currentBlockId: AssessmentBlockId = firstAssessmentBlockId
): AssessmentProgress {
  return {
    questionnaireVersion,
    currentBlockId,
    answers: {}
  };
}

export function getSelectedOptionIds(answers: AssessmentProgress["answers"]) {
  return Object.fromEntries(
    Object.entries(answers).map(([questionId, answer]) => [questionId, answer.selectedOptionId])
  );
}

export function getMissingRequiredQuestionIds(
  block: QuestionnaireBlockConfig,
  answers: AssessmentProgress["answers"]
) {
  return block.questions.flatMap((question) => {
    if (!question.required || answers[question.id]) {
      return [];
    }

    return [question.id];
  });
}

export function getQuestionOption(
  questionnaire: QuestionnaireConfig,
  questionId: string,
  optionId: string
) {
  for (const block of questionnaire.blocks) {
    const question = block.questions.find((item) => item.id === questionId);

    if (!question) {
      continue;
    }

    return question.options.find((option) => option.id === optionId);
  }

  return undefined;
}

export function normalizeStoredAnswer(
  questionnaire: QuestionnaireConfig,
  answer: unknown
): AssessmentStoredAnswer | null {
  if (!answer || typeof answer !== "object") {
    return null;
  }

  const candidate = answer as Partial<AssessmentStoredAnswer>;

  if (
    typeof candidate.questionId !== "string" ||
    typeof candidate.selectedOptionId !== "string"
  ) {
    return null;
  }

  const matchedOption = getQuestionOption(
    questionnaire,
    candidate.questionId,
    candidate.selectedOptionId
  );

  if (!matchedOption) {
    return null;
  }

  return {
    questionId: candidate.questionId,
    selectedOptionId: matchedOption.id,
    resolvedSignalMapping: matchedOption.signalMapping
  };
}

export function normalizeStoredAnswers(
  questionnaire: QuestionnaireConfig,
  answers: unknown
): AssessmentProgress["answers"] | null {
  if (!answers || typeof answers !== "object") {
    return null;
  }

  const nextAnswers: AssessmentProgress["answers"] = {};

  for (const [questionId, answer] of Object.entries(answers)) {
    const normalizedAnswer = normalizeStoredAnswer(questionnaire, answer);

    if (!normalizedAnswer || normalizedAnswer.questionId !== questionId) {
      continue;
    }

    nextAnswers[questionId] = normalizedAnswer;
  }

  return nextAnswers;
}
