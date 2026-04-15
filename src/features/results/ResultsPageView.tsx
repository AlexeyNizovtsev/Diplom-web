"use client";

import { useEffect, useMemo, useState } from "react";

import { useRouter } from "next/navigation";

import { AssessmentAnswersDialog } from "@/components/assessment/AssessmentAnswersDialog";
import { HomeBackground } from "@/components/backgrounds/HomeBackground";
import { InfoCard } from "@/components/cards/InfoCard";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeading } from "@/components/sections/SectionHeading";
import {
  firstAssessmentBlockId,
  questionnaireConfig,
} from "@/config/questionnaire";
import { getQuestionnaireContent } from "@/content/questionnaire";
import { buildAssessmentReviewBlocks } from "@/features/assessment/assessmentReview";
import { useLocale } from "@/hooks/useLocale";
import { buildResultExport } from "@/lib/export/buildResultExport";
import { downloadResultJson } from "@/lib/export/downloadResultJson";
import { downloadResultPdf } from "@/lib/export/downloadResultPdf";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { buildAssessmentBlockRoute } from "@/lib/routing/routes";
import { clearAssessmentProgress } from "@/lib/storage/assessmentProgress";
import type { ResultsDictionary } from "@/types/common";
import type { AssessmentResult } from "@/types/result";

import {
  AlternativesSection,
  BestFitMethodologySection,
  InterpretationSummarySection,
  ResultsEmptyState,
  RankedSummarySection,
  SaveResultsSection,
  TopActionBar,
} from "@/features/results/ResultsSections";
import { buildInterpretationPresentation } from "@/features/results/resultsPresentation";

interface ResultsPageViewProps {
  content: ResultsDictionary;
  result: AssessmentResult | null;
  requestedCode?: string;
  isHydrated: boolean;
}

export function ResultsPageView({
  content,
  result,
  requestedCode,
  isHydrated,
}: ResultsPageViewProps) {
  const router = useRouter();
  const { locale } = useLocale();
  const dictionary = getDictionary(locale);
  const [isDownloadMenuOpen, setIsDownloadMenuOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isAnswersDialogOpen, setIsAnswersDialogOpen] = useState(false);
  const [activeExportFormat, setActiveExportFormat] = useState<"pdf" | "json" | null>(null);

  const questionnaireContent = useMemo(
    () => getQuestionnaireContent(locale),
    [locale],
  );
  const answerBlocks = useMemo(
    () =>
      result?.answerSnapshot &&
      result.questionnaireVersion === questionnaireConfig.version
        ? buildAssessmentReviewBlocks(
            questionnaireConfig,
            questionnaireContent,
            result.answerSnapshot,
          )
        : [],
    [questionnaireContent, result],
  );
  const canViewAnswers = answerBlocks.length > 0;

  useEffect(() => {
    if (!isCopied) {
      return;
    }

    const timeoutId = window.setTimeout(() => setIsCopied(false), 1800);

    return () => window.clearTimeout(timeoutId);
  }, [isCopied]);

  useEffect(() => {
    if (result) {
      return;
    }

    setIsAnswersDialogOpen(false);
    setActiveExportFormat(null);
  }, [result]);

  useEffect(() => {
    if (canViewAnswers) {
      return;
    }

    setIsAnswersDialogOpen(false);
  }, [canViewAnswers]);

  const title = content.pageIntro.title;
  const description = content.pageIntro.description;
  const resultCode = result?.resultCode ?? "";
  const interpretationPresentation = result
    ? buildInterpretationPresentation(result, content)
    : null;
  const isExportingPdf = activeExportFormat === "pdf";
  const isExportingJson = activeExportFormat === "json";

  const buildExportDocument = (exportedAt: string) => {
    if (!result) {
      return null;
    }

    return buildResultExport({
      result,
      content,
      answerBlocks,
      exportedAt,
    });
  };

  const copyCode = async () => {
    if (!resultCode) {
      return;
    }

    try {
      await navigator.clipboard.writeText(resultCode);
      setIsCopied(true);
      setIsDownloadMenuOpen(false);
    } catch {
      setIsCopied(false);
    }
  };

  const retakeAssessment = () => {
    const shouldRetake = window.confirm(content.topActions.resetConfirmation);

    if (!shouldRetake) {
      return;
    }

    clearAssessmentProgress();
    setIsDownloadMenuOpen(false);
    setIsAnswersDialogOpen(false);
    router.push(buildAssessmentBlockRoute(firstAssessmentBlockId));
  };

  const handleDownloadJson = async () => {
    if (!result || activeExportFormat) {
      return;
    }

    setActiveExportFormat("json");

    try {
      const exportedAt = new Date().toISOString();
      const exportDocument = buildExportDocument(exportedAt);

      if (!exportDocument) {
        throw new Error("Cannot export without a result.");
      }

      downloadResultJson(result, exportDocument, exportedAt);
      setIsDownloadMenuOpen(false);
    } catch {
      window.alert(content.topActions.exportFailedMessage);
    } finally {
      setActiveExportFormat(null);
    }
  };

  const handleDownloadPdf = async () => {
    if (!result || activeExportFormat) {
      return;
    }

    setActiveExportFormat("pdf");

    try {
      const exportDocument = buildExportDocument(new Date().toISOString());

      if (!exportDocument) {
        throw new Error("Cannot export without a result.");
      }

      await downloadResultPdf(result, exportDocument, content);
      setIsDownloadMenuOpen(false);
    } catch {
      window.alert(content.topActions.exportFailedMessage);
    } finally {
      setActiveExportFormat(null);
    }
  };

  return (
    <div className="relative overflow-hidden pb-14 pt-12 lg:pb-20 lg:pt-16">
      <HomeBackground />

      <PageContainer className="relative z-10 py-0">
        <div className="space-y-10 lg:space-y-12">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <SectionHeading
              as="h1"
              title={title}
              description={description}
              className="min-w-0 flex-1"
              titleClassName="lg:text-[4.2rem]"
              descriptionClassName="max-w-5xl text-lg leading-8 lg:text-[1.35rem]"
            />

            {result ? (
              <TopActionBar
                content={content}
                canViewAnswers={canViewAnswers}
                isAnswersOpen={isAnswersDialogOpen}
                isDownloadMenuOpen={isDownloadMenuOpen}
                isCopied={isCopied}
                isExportingPdf={isExportingPdf}
                isExportingJson={isExportingJson}
                onToggleAnswers={() => {
                  setIsDownloadMenuOpen(false);
                  setIsAnswersDialogOpen((current) => !current);
                }}
                onToggleDownloadMenu={() => {
                  setIsAnswersDialogOpen(false);
                  setIsDownloadMenuOpen((current) => !current);
                }}
                onCopyCode={() => void copyCode()}
                onDownloadPdf={() => void handleDownloadPdf()}
                onDownloadJson={() => void handleDownloadJson()}
                onRetakeAssessment={retakeAssessment}
              />
            ) : null}
          </div>

          {!isHydrated ? (
            <InfoCard className="min-h-[18rem] animate-pulse bg-white/75" />
          ) : result ? (
            <>
              <InterpretationSummarySection
                content={content}
                presentation={interpretationPresentation!}
              />
              <RankedSummarySection
                content={content}
                ranking={result.ranking}
                interpretation={interpretationPresentation!.interpretation}
              />
              <BestFitMethodologySection
                content={content}
                result={result}
                interpretation={interpretationPresentation!.interpretation}
              />
              <AlternativesSection
                content={content}
                ranking={result.ranking}
                dimensions={result.dimensions}
                interpretation={interpretationPresentation!.interpretation}
              />
              <SaveResultsSection
                content={content}
                resultCode={result.resultCode}
                isCopied={isCopied}
                isExportingPdf={isExportingPdf}
                isExportingJson={isExportingJson}
                onCopyCode={copyCode}
                onDownloadPdf={() => void handleDownloadPdf()}
                onDownloadJson={() => void handleDownloadJson()}
              />
            </>
          ) : (
            <ResultsEmptyState
              content={content}
              requestedCode={requestedCode}
            />
          )}
        </div>
      </PageContainer>

      {result && isAnswersDialogOpen && canViewAnswers ? (
        <AssessmentAnswersDialog
          ariaLabel={content.topActions.viewAnswers}
          blocks={answerBlocks}
          answerLabel={dictionary.assessment.questionnaire.review.answerLabel}
          onDismiss={() => setIsAnswersDialogOpen(false)}
        />
      ) : null}
    </div>
  );
}
