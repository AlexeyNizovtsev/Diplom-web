import { PlaceholderPageView } from "@/features/shared/PlaceholderPageView";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { getLocale } from "@/lib/i18n/getLocale";

export default function AboutModelPage() {
  const locale = getLocale();
  const dictionary = getDictionary(locale);

  return (
    <PlaceholderPageView
      content={dictionary.placeholders.aboutModel}
      primaryActionLabel={dictionary.placeholders.primaryAction}
      returnHomeLabel={dictionary.placeholders.returnHome}
    />
  );
}

