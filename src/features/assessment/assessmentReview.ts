import { buildAssessmentQuestionEditRoute } from "@/lib/routing/routes";
import type { AssessmentProgress, LocalizedQuestionnaireContent, QuestionnaireConfig } from "@/types/questionnaire";

export interface AssessmentReviewQuestionItem {
  questionId: string;
  questionTitle: string;
  answerLabel: string;
  editHref: string;
}

export interface AssessmentReviewBlockItem {
  id: string;
  label: string;
  title: string;
  questions: AssessmentReviewQuestionItem[];
}

export function buildAssessmentReviewBlocks(
  questionnaire: QuestionnaireConfig,
  content: LocalizedQuestionnaireContent,
  answers: AssessmentProgress["answers"],
): AssessmentReviewBlockItem[] {
  return questionnaire.blocks.flatMap((block) => {
    const localizedBlock = content.blocks[block.id];
    const questions = block.questions.flatMap((question) => {
      const answer = answers[question.id];

      if (!answer) {
        return [];
      }

      const localizedQuestion = localizedBlock.questions[question.id];
      const localizedOption = localizedQuestion.options[answer.selectedOptionId];

      if (!localizedOption) {
        return [];
      }

      return [
        {
          questionId: question.id,
          questionTitle: localizedQuestion.title,
          answerLabel: localizedOption.label,
          editHref: buildAssessmentQuestionEditRoute(block.id, question.id),
        },
      ];
    });

    if (questions.length === 0) {
      return [];
    }

    return [
      {
        id: block.id,
        label: localizedBlock.shortLabel,
        title: localizedBlock.title,
        questions,
      },
    ];
  });
}
