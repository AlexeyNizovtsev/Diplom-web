import { PlaceholderPageView } from "@/features/shared/PlaceholderPageView";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { getLocale } from "@/lib/i18n/getLocale";

interface MethodologiesPageProps {
  searchParams?: {
    methodology?: string;
  };
}

export default function MethodologiesPage({ searchParams }: MethodologiesPageProps) {
  const locale = getLocale();
  const dictionary = getDictionary(locale);

  return (
    <PlaceholderPageView
      content={dictionary.placeholders.methodologies}
      primaryActionLabel={dictionary.placeholders.primaryAction}
      returnHomeLabel={dictionary.placeholders.returnHome}
      metadataLabel={searchParams?.methodology ? dictionary.placeholders.selectedMethodologyLabel : undefined}
      metadataValue={searchParams?.methodology}
    />
  );
}

