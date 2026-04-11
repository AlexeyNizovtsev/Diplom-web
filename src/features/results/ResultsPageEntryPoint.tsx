"use client";

import { useEffect, useState } from "react";

import { loadAssessmentResultByCode, loadLatestAssessmentResult } from "@/lib/storage/results";
import type { ResultsDictionary } from "@/types/common";
import type { AssessmentResult } from "@/types/result";

import { ResultsPageView } from "@/features/results/ResultsPageView";

interface ResultsPageEntryPointProps {
  content: ResultsDictionary;
  requestedCode?: string;
}

export function ResultsPageEntryPoint({
  content,
  requestedCode
}: ResultsPageEntryPointProps) {
  const [hasHydrated, setHasHydrated] = useState(false);
  const [result, setResult] = useState<AssessmentResult | null>(null);

  useEffect(() => {
    const restoredResult = requestedCode
      ? loadAssessmentResultByCode(requestedCode)
      : loadLatestAssessmentResult();

    setResult(restoredResult);
    setHasHydrated(true);
  }, [requestedCode]);

  return (
    <ResultsPageView
      content={content}
      result={result}
      requestedCode={requestedCode}
      isHydrated={hasHydrated}
    />
  );
}
