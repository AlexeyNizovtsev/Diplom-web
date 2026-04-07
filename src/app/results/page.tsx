import { PlaceholderPageView } from "@/features/shared/PlaceholderPageView";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { getLocale } from "@/lib/i18n/getLocale";

interface ResultsPageProps {
  searchParams?: {
    code?: string;
  };
}

export default function ResultsPage({ searchParams }: ResultsPageProps) {
  const locale = getLocale();
  const dictionary = getDictionary(locale);

  return (
    <PlaceholderPageView
      content={dictionary.placeholders.results}
      primaryActionLabel={dictionary.placeholders.primaryAction}
      returnHomeLabel={dictionary.placeholders.returnHome}
      metadataLabel={searchParams?.code ? dictionary.placeholders.resultCodeLabel : undefined}
      metadataValue={searchParams?.code}
    />
  );
}
