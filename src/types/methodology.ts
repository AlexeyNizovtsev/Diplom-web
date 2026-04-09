export const methodologyIds = [
  "waterfall",
  "spiral",
  "gost34",
  "rup",
  "scrum",
  "kanban"
] as const;

export type MethodologyId = (typeof methodologyIds)[number];

export type MethodologySectionId =
  | "overview"
  | "firstSteps"
  | "coreElements"
  | "teamNeeds"
  | "commonMistakes"
  | "applicability"
  | "notCoveredHere"
  | "studyNext";

export interface MethodologyPreviewContent {
  title: string;
  description: string;
  action: string;
}

export interface MethodologyTag {
  id: string;
  label: string;
}

export interface MethodologyOverview {
  title?: string;
  description: string;
  signalTags: MethodologyTag[];
  fitBadge?: string;
}

export interface MethodologyStep {
  id: string;
  title: string;
  description?: string;
  emphasis?: "normal" | "final";
}

export interface MethodologyFirstSteps {
  title?: string;
  intro?: string;
  mode: "sequence" | "list";
  steps: MethodologyStep[];
}

export interface CoreElementItem {
  id: string;
  title: string;
  description: string;
  note?: string;
}

export interface CoreElementsGroup {
  id: string;
  label: string;
  items: CoreElementItem[];
}

export interface MethodologyCoreElements {
  title?: string;
  intro?: string;
  groups: CoreElementsGroup[];
}

export interface MethodologyListItem {
  id: string;
  text: string;
}

export interface MethodologyListSection {
  title?: string;
  intro?: string;
  items: MethodologyListItem[];
}

export interface MethodologyApplicability {
  title?: string;
  goodFitTitle: string;
  weakerFitTitle: string;
  goodFit: MethodologyListItem[];
  weakerFit: MethodologyListItem[];
}

export interface MethodologyQuickFit {
  title?: string;
  summary: string;
}

export interface MethodologyContent {
  id: MethodologyId;
  title: string;
  shortLabel?: string;
  overview: MethodologyOverview;
  firstSteps: MethodologyFirstSteps;
  coreElements: MethodologyCoreElements;
  teamNeeds: MethodologyListSection;
  commonMistakes: MethodologyListSection;
  applicability: MethodologyApplicability;
  notCoveredHere: MethodologyListSection;
  studyNext: MethodologyListSection;
  quickFit?: MethodologyQuickFit;
}

export type MethodologyContentMap = Record<MethodologyId, MethodologyContent>;

