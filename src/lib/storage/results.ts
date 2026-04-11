import { methodologyIds } from "@/types/methodology";
import type { AssessmentResult } from "@/types/result";

const LATEST_RESULT_STORAGE_KEY = "methodologyMatch.result.v1";
const RESULT_INDEX_STORAGE_KEY = "methodologyMatch.results.v1";

function isAssessmentResult(value: unknown): value is AssessmentResult {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Partial<AssessmentResult>;

  if (
    typeof candidate.version !== "string" ||
    typeof candidate.resultCode !== "string" ||
    typeof candidate.createdAt !== "string" ||
    typeof candidate.questionnaireVersion !== "string" ||
    !Array.isArray(candidate.methodologyOrder) ||
    typeof candidate.topMethodologyId !== "string" ||
    !Array.isArray(candidate.ranking) ||
    !Array.isArray(candidate.dimensions) ||
    !candidate.summary
  ) {
    return false;
  }

  if (!methodologyIds.includes(candidate.topMethodologyId)) {
    return false;
  }

  return candidate.methodologyOrder.every((methodologyId) => methodologyIds.includes(methodologyId));
}

function loadResultIndex(): Record<string, AssessmentResult> {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const storedIndex = window.localStorage.getItem(RESULT_INDEX_STORAGE_KEY);

    if (!storedIndex) {
      return {};
    }

    const parsedIndex = JSON.parse(storedIndex) as Record<string, unknown>;

    return Object.fromEntries(
      Object.entries(parsedIndex).filter(([, value]) => isAssessmentResult(value))
    ) as Record<string, AssessmentResult>;
  } catch {
    return {};
  }
}

function saveResultIndex(index: Record<string, AssessmentResult>) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(RESULT_INDEX_STORAGE_KEY, JSON.stringify(index));
  } catch {
    // Ignore local storage failures so the main flow still works.
  }
}

export function saveAssessmentResult(result: AssessmentResult) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(LATEST_RESULT_STORAGE_KEY, JSON.stringify(result));
  } catch {
    // Ignore local storage failures so the main flow still works.
  }

  const currentIndex = loadResultIndex();
  currentIndex[result.resultCode] = result;
  saveResultIndex(currentIndex);
}

export function loadLatestAssessmentResult() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const storedResult = window.localStorage.getItem(LATEST_RESULT_STORAGE_KEY);

    if (!storedResult) {
      return null;
    }

    const parsedResult = JSON.parse(storedResult) as unknown;

    if (!isAssessmentResult(parsedResult)) {
      window.localStorage.removeItem(LATEST_RESULT_STORAGE_KEY);
      return null;
    }

    return parsedResult;
  } catch {
    return null;
  }
}

export function loadAssessmentResultByCode(resultCode: string) {
  const resultIndex = loadResultIndex();

  return resultIndex[resultCode] ?? null;
}
