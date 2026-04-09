import { questionnaireBlocks } from "@/config/questionnaire/blocks";
import type { AssessmentBlockId, QuestionnaireConfig } from "@/types/questionnaire";

export const questionnaireConfig: QuestionnaireConfig = {
  version: "1.0.0",
  blocks: questionnaireBlocks
};

export const assessmentBlockOrder = questionnaireConfig.blocks.map((block) => block.id);

export const firstAssessmentBlockId = assessmentBlockOrder[0];

export function isAssessmentBlockId(value: string): value is AssessmentBlockId {
  return assessmentBlockOrder.includes(value as AssessmentBlockId);
}

export function getQuestionnaireBlockById(blockId: AssessmentBlockId) {
  return questionnaireConfig.blocks.find((block) => block.id === blockId);
}
