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
  "coreElements",
  "firstSteps",
  "teamNeeds",
  "commonMistakes",
  "applicability",
  "notCoveredHere",
  "studyNext"
];
