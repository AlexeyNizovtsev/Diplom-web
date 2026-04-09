import { AssessmentBlockPlaceholderView } from "@/features/assessment/AssessmentBlockPlaceholderView";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { getLocale } from "@/lib/i18n/getLocale";

interface AssessmentBlockPageProps {
  params: Promise<{
    blockId: string;
  }>;
}

export default async function AssessmentBlockPage({ params }: AssessmentBlockPageProps) {
  const locale = await getLocale();
  const dictionary = getDictionary(locale);
  const { blockId } = await params;

  // TODO: replace this placeholder with config-driven block rendering and persisted assessment state.
  return (
    <AssessmentBlockPlaceholderView
      content={dictionary.assessment.blockPlaceholder}
      blockId={blockId}
      backPageLabel={dictionary.assessment.backPageLabel}
      returnHomeLabel={dictionary.placeholders.returnHome}
    />
  );
}
