"use client";

import { useEffect, useState } from "react";

import { AssessmentIntroCard } from "@/components/assessment/AssessmentIntroCard";
import { buildAssessmentBlockRoute } from "@/lib/routing/routes";
import { loadAssessmentProgress } from "@/lib/storage/assessmentProgress";
import type { AssessmentDictionary } from "@/types/common";

interface AssessmentIntroEntryPointProps {
  content: AssessmentDictionary;
  defaultStartHref: string;
  questionnaireVersion: string;
}

export function AssessmentIntroEntryPoint({
  content,
  defaultStartHref,
  questionnaireVersion
}: AssessmentIntroEntryPointProps) {
  const [startHref, setStartHref] = useState(defaultStartHref);
  const [primaryCtaLabel, setPrimaryCtaLabel] = useState(content.introCard.primaryCta);
  const [resumeHint, setResumeHint] = useState<string | undefined>(undefined);

  useEffect(() => {
    const savedProgress = loadAssessmentProgress(questionnaireVersion);

    if (!savedProgress) {
      return;
    }

    const savedBlockLabel = content.questionnaire.blockOrderLabels[savedProgress.currentBlockId];

    setStartHref(buildAssessmentBlockRoute(savedProgress.currentBlockId));
    setPrimaryCtaLabel(content.introCard.resumeCta);
    setResumeHint(content.introCard.resumeHint.replace("{blockLabel}", savedBlockLabel));
  }, [content, questionnaireVersion]);

  return (
    <AssessmentIntroCard
      content={content}
      startHref={startHref}
      primaryCtaLabel={primaryCtaLabel}
      helperNote={resumeHint}
    />
  );
}
