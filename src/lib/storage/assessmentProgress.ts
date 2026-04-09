import { isAssessmentBlockId } from "@/config/questionnaire";
import type { AssessmentProgress } from "@/types/questionnaire";

const ASSESSMENT_STORAGE_KEY = "methodologyMatch.assessment.v1";

function isSafeAssessmentProgress(
  value: unknown,
  questionnaireVersion: string
): value is AssessmentProgress {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as AssessmentProgress;

  if (candidate.questionnaireVersion !== questionnaireVersion) {
    return false;
  }

  if (!isAssessmentBlockId(candidate.currentBlockId)) {
    return false;
  }

  if (!candidate.answers || typeof candidate.answers !== "object") {
    return false;
  }

  return Object.values(candidate.answers).every((answer) => {
    if (!answer || typeof answer !== "object") {
      return false;
    }

    return (
      typeof answer.questionId === "string" &&
      typeof answer.selectedOptionId === "string" &&
      Array.isArray(answer.resolvedSignalMapping)
    );
  });
}

export function loadAssessmentProgress(questionnaireVersion: string) {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const rawProgress = window.localStorage.getItem(ASSESSMENT_STORAGE_KEY);

    if (!rawProgress) {
      return null;
    }

    const parsedProgress = JSON.parse(rawProgress) as unknown;

    if (!isSafeAssessmentProgress(parsedProgress, questionnaireVersion)) {
      window.localStorage.removeItem(ASSESSMENT_STORAGE_KEY);
      return null;
    }

    return parsedProgress;
  } catch {
    return null;
  }
}

export function saveAssessmentProgress(progress: AssessmentProgress) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(ASSESSMENT_STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // Ignore storage failures so the questionnaire remains usable.
  }
}

export function clearAssessmentProgress() {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.removeItem(ASSESSMENT_STORAGE_KEY);
  } catch {
    // Ignore storage cleanup failures.
  }
}
