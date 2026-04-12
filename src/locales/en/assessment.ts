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
    primaryCta: "Start assessment",
    resumeCta: "Resume assessment",
    resumeHint: "Continue from {blockLabel}",
    restartModal: {
      title: "You have an unfinished assessment",
      description:
        "Your saved progress is currently at {blockLabel}. Starting again will replace the unfinished assessment.",
      dismissCta: "Cancel"
    }
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
  },
  questionnaire: {
    eyebrow: "Assessment flow",
    title: "Assessment",
    description:
      "Answer one block at a time. Each block captures a different project signal that will later shape the recommendation.",
    progressLabel: "Block {current} of {total}",
    questionLabel: "Question",
    selectionLabel: "Selected",
    autosaveNote: "Responses are saved automatically",
    validationMessage: "Complete every question in this block before moving on.",
    actions: {
      back: "Back",
      nextBlock: "Next block",
      reviewAnswers: "Review answers",
      returnToIntro: "Return to intro",
      backToReview: "Back to answers",
      saveAndReturn: "Save and return",
      confirmAnswers: "Confirm and show result"
    },
    review: {
      eyebrow: "Answer review",
      title: "Your answers",
      description:
        "Check the questionnaire before the recommendation is generated. If needed, open any question, update the answer, and return here.",
      helper:
        "The review is intentionally compact: each row shows the question, your current answer, and a quick edit action.",
      answerLabel: "Answer",
      editAction: "Edit",
      loadingLabel: "Loading saved answers",
      emptyTitle: "No saved answers found",
      emptyDescription:
        "Complete the questionnaire first. Once every block is answered, this review screen will appear before the results page."
    },
    blockOrderLabels: {
      governance: "Block 1 of 6",
      requirements: "Block 2 of 6",
      risk: "Block 3 of 6",
      iteration: "Block 4 of 6",
      discipline: "Block 5 of 6",
      complexity: "Block 6 of 6"
    }
  }
};
