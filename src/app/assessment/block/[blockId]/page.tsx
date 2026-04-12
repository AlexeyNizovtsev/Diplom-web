import { questionnaireConfig } from "@/config/questionnaire";
import { getQuestionnaireContent } from "@/content/questionnaire";
import { AssessmentPageView } from "@/features/assessment/AssessmentPageView";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { getLocale } from "@/lib/i18n/getLocale";
import { notFound } from "next/navigation";

import type { AssessmentBlockId } from "@/types/questionnaire";

interface AssessmentBlockPageProps {
  params: Promise<{
    blockId: string;
  }>;
  searchParams?: Promise<{
    returnTo?: string | string[];
  }>;
}

export default async function AssessmentBlockPage({
  params,
  searchParams,
}: AssessmentBlockPageProps) {
  const locale = await getLocale();
  const dictionary = getDictionary(locale);
  const { blockId } = await params;
  const resolvedSearchParams = await searchParams;
  const typedBlockId = blockId as AssessmentBlockId;
  const hasMatchingBlock = questionnaireConfig.blocks.some((block) => block.id === typedBlockId);
  const returnToReview =
    typeof resolvedSearchParams?.returnTo === "string" &&
    resolvedSearchParams.returnTo === "review";

  if (!hasMatchingBlock) {
    notFound();
  }

  return (
    <AssessmentPageView
      currentBlockId={typedBlockId}
      questionnaire={questionnaireConfig}
      content={getQuestionnaireContent(locale)}
      ui={dictionary.assessment.questionnaire}
      returnToReview={returnToReview}
    />
  );
}
