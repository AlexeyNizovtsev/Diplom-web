import type { PlaceholdersDictionary } from "@/types/common";

export const placeholders: PlaceholdersDictionary = {
  assessment: {
    title: "Assessment intro",
    description: "The questionnaire flow comes next. This route is already connected to the shared shell.",
    helper: "Next step: introduce block structure, autosave, and questionnaire config rendering."
  },
  methodologies: {
    title: "Methodologies reference",
    description: "The shared methodology reference page will be implemented on top of structured content.",
    helper: "Next step: connect top tabs, section navigation, and methodology content schema."
  },
  aboutModel: {
    title: "About model",
    description: "This page will explain scope, model logic, and limitations in a structured format.",
    helper: "Next step: turn the concept handoff into reusable content sections."
  },
  results: {
    title: "Results",
    description: "The ranked result view and restore flow will land here in the next implementation stage.",
    helper: "Next step: render result object data, explanation blocks, and save/export actions."
  },
  selectedMethodologyLabel: "Selected methodology",
  resultCodeLabel: "Requested result code",
  returnHome: "Return to home",
  primaryAction: "Start assessment"
};

