export type MethodologyId =
  | "waterfall"
  | "spiral"
  | "gost34"
  | "rup"
  | "scrum"
  | "kanban";

export interface MethodologyPreviewContent {
  title: string;
  description: string;
  action: string;
}

