import type { MethodologyId, MethodologySectionId } from "@/types/methodology";

export const supportedMethodologyOrder: MethodologyId[] = [
  "waterfall",
  "spiral",
  "gost34",
  "rup",
  "scrum",
  "kanban"
];

export const methodologySectionOrder: MethodologySectionId[] = [
  "overview",
  "firstSteps",
  "coreElements",
  "teamNeeds",
  "commonMistakes",
  "applicability",
  "notCoveredHere",
  "studyNext"
];
