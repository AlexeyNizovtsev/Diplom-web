import { HowItWorksPageView } from "@/features/how-it-works/HowItWorksPageView";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { getLocale } from "@/lib/i18n/getLocale";

export default async function HowItWorksPage() {
  const locale = await getLocale();
  const dictionary = getDictionary(locale);

  return <HowItWorksPageView content={dictionary.howItWorks} />;
}

