import type { MethodologyId } from "@/types/methodology";

export interface RankedMethodologyResult {
  methodologyId: MethodologyId;
  score: number;
}

export interface AssessmentResultSummary {
  code: string;
  generatedAt: string;
  ranking: RankedMethodologyResult[];
}

// TODO: align with docs/result-object-schema.md during results implementation.

