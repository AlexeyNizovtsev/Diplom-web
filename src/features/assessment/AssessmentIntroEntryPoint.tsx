"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { AssessmentIntroCard } from "@/components/assessment/AssessmentIntroCard";
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
  const [startHref, setStartHref] = useState(defaultStartHref);
  const [primaryCtaLabel, setPrimaryCtaLabel] = useState(content.introCard.primaryCta);
  const [resumeHint, setResumeHint] = useState<string | undefined>(undefined);
  const [showRestartAction, setShowRestartAction] = useState(false);

  useEffect(() => {
    const savedProgress = loadAssessmentProgress(questionnaireConfig);

    if (!savedProgress) {
      setShowRestartAction(false);
      return;
    }

    const savedBlockLabel = content.questionnaire.blockOrderLabels[savedProgress.currentBlockId];

    setStartHref(buildAssessmentBlockRoute(savedProgress.currentBlockId));
    setPrimaryCtaLabel(content.introCard.resumeCta);
    setResumeHint(content.introCard.resumeHint.replace("{blockLabel}", savedBlockLabel));
    setShowRestartAction(true);
  }, [content]);

  const handleRestart = () => {
    clearAssessmentProgress();
    router.push(buildAssessmentBlockRoute(firstAssessmentBlockId));
  };

  return (
    <AssessmentIntroCard
      content={content}
      startHref={startHref}
      primaryCtaLabel={primaryCtaLabel}
      helperNote={resumeHint}
      restartActionLabel={showRestartAction ? content.introCard.primaryCta : undefined}
      onRestart={showRestartAction ? handleRestart : undefined}
    />
  );
}
