import { PlaceholderPageView } from "@/features/shared/PlaceholderPageView";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { getLocale } from "@/lib/i18n/getLocale";

export default async function AssessmentPage() {
  const locale = await getLocale();
  const dictionary = getDictionary(locale);

  return (
    <PlaceholderPageView
      content={dictionary.placeholders.assessment}
      primaryActionLabel={dictionary.placeholders.primaryAction}
      returnHomeLabel={dictionary.placeholders.returnHome}
    />
  );
}

