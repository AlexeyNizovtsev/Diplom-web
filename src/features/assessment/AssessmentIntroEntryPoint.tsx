"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { AssessmentIntroCard } from "@/components/assessment/AssessmentIntroCard";
import { AssessmentRestartDialog } from "@/components/assessment/AssessmentRestartDialog";
import { firstAssessmentBlockId, questionnaireConfig } from "@/config/questionnaire";
import { buildAssessmentBlockRoute } from "@/lib/routing/routes";
import {
  clearAssessmentProgress,
  loadAssessmentProgress
} from "@/lib/storage/assessmentProgress";
import type { AssessmentDictionary } from "@/types/common";

interface AssessmentIntroEntryPointProps {
  content: AssessmentDictionary;
  defaultStartHref: string;
}

export function AssessmentIntroEntryPoint({
  content,
  defaultStartHref
}: AssessmentIntroEntryPointProps) {
  const router = useRouter();
  const [resumeHref, setResumeHref] = useState<string | undefined>(undefined);
  const [resumeHint, setResumeHint] = useState<string | undefined>(undefined);
  const [savedBlockLabel, setSavedBlockLabel] = useState<string | undefined>(undefined);
  const [isRestartDialogOpen, setIsRestartDialogOpen] = useState(false);

  useEffect(() => {
    const savedProgress = loadAssessmentProgress(questionnaireConfig);

    if (!savedProgress) {
      setResumeHref(undefined);
      setResumeHint(undefined);
      setSavedBlockLabel(undefined);
      setIsRestartDialogOpen(false);
      return;
    }

    const nextSavedBlockLabel =
      content.questionnaire.blockOrderLabels[savedProgress.currentBlockId];

    setResumeHref(buildAssessmentBlockRoute(savedProgress.currentBlockId));
    setSavedBlockLabel(nextSavedBlockLabel);
    setResumeHint(
      content.introCard.resumeHint.replace("{blockLabel}", nextSavedBlockLabel)
    );
  }, [content]);

  const handleStart = () => {
    if (resumeHref) {
      setIsRestartDialogOpen(true);
      return;
    }

    router.push(defaultStartHref);
  };

  const handleResume = () => {
    if (!resumeHref) {
      return;
    }

    router.push(resumeHref);
  };

  const handleRestart = () => {
    clearAssessmentProgress();
    setIsRestartDialogOpen(false);
    setResumeHref(undefined);
    setResumeHint(undefined);
    setSavedBlockLabel(undefined);
    router.push(buildAssessmentBlockRoute(firstAssessmentBlockId));
  };

  return (
    <>
      <AssessmentIntroCard
        content={content}
        onStart={handleStart}
        helperNote={resumeHint}
        resumeActionLabel={resumeHref ? content.introCard.resumeCta : undefined}
        onResume={resumeHref ? handleResume : undefined}
      />
      {isRestartDialogOpen && savedBlockLabel ? (
        <AssessmentRestartDialog
          title={content.introCard.restartModal.title}
          description={content.introCard.restartModal.description.replace(
            "{blockLabel}",
            savedBlockLabel
          )}
          primaryCtaLabel={content.introCard.primaryCta}
          resumeCtaLabel={content.introCard.resumeCta}
          dismissCtaLabel={content.introCard.restartModal.dismissCta}
          helperNote={resumeHint}
          onStartOver={handleRestart}
          onResume={handleResume}
          onDismiss={() => setIsRestartDialogOpen(false)}
        />
      ) : null}
    </>
  );
}
