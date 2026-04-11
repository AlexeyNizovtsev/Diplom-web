import { isAssessmentBlockId } from "@/config/questionnaire";
import { normalizeStoredAnswers } from "@/features/assessment/assessmentSelectors";
import type { AssessmentProgress, QuestionnaireConfig } from "@/types/questionnaire";

const ASSESSMENT_STORAGE_KEY = "methodologyMatch.assessment.v1";

function isSafeAssessmentProgress(
  value: unknown,
  questionnaire: QuestionnaireConfig
): value is AssessmentProgress {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as AssessmentProgress;

  if (candidate.questionnaireVersion !== questionnaire.version) {
    return false;
  }

  if (!isAssessmentBlockId(candidate.currentBlockId)) {
    return false;
  }

  return Boolean(normalizeStoredAnswers(questionnaire, candidate.answers));
}

export function loadAssessmentProgress(questionnaire: QuestionnaireConfig) {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const rawProgress = window.localStorage.getItem(ASSESSMENT_STORAGE_KEY);

    if (!rawProgress) {
      return null;
    }

    const parsedProgress = JSON.parse(rawProgress) as unknown;

    if (!isSafeAssessmentProgress(parsedProgress, questionnaire)) {
      window.localStorage.removeItem(ASSESSMENT_STORAGE_KEY);
      return null;
    }

    return {
      questionnaireVersion: parsedProgress.questionnaireVersion,
      currentBlockId: parsedProgress.currentBlockId,
      answers: normalizeStoredAnswers(questionnaire, parsedProgress.answers) ?? {}
    };
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
