import { HowItWorksPageView } from "@/features/how-it-works/HowItWorksPageView";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { getLocale } from "@/lib/i18n/getLocale";

export default function HowItWorksPage() {
  const locale = getLocale();
  const dictionary = getDictionary(locale);

  return <HowItWorksPageView content={dictionary.howItWorks} />;
}

