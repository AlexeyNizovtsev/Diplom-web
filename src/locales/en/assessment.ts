import type { AssessmentDictionary } from "@/types/common";

export const assessment: AssessmentDictionary = {
  pageTitle: "Start assessment",
  backPageLabel: "Back",
  introCard: {
    title: "Find the best-fit development methodology",
    description: [
      "Answer a short structured assessment about your project context",
      "The system will rank six methodologies and explain why the top recommendation fits"
    ],
    stats: {
      format: {
        label: "Format",
        value: "6 blocks"
      },
      duration: {
        label: "Duration",
        value: "3-5 min"
      }
    },
    beforeYouStartTitle: "Before you start",
    beforeYouStartItems: [
      "Answer based on the project as it exists now, not as it ideally should be",
      "Responses are saved automatically while you move through the blocks",
      "You can revisit the result later using a saved result code"
    ],
    primaryCta: "Start assessment"
  },
  blockPlaceholder: {
    eyebrow: "Assessment block",
    title: "Questionnaire flow placeholder",
    description:
      "This route is reserved for the config-driven block flow on /assessment/block/[blockId]",
    blockIdLabel: "Requested block",
    nextStepTitle: "Next step",
    nextStepItems: [
      "Render each block from questionnaire configuration instead of placeholder content",
      "Add block progress, validation, and back or next navigation",
      "Persist answers locally and restore the latest block on reopen"
    ],
    returnToIntro: "Back to assessment intro"
  }
};
