import { AboutModelPageView } from "@/features/about-model/AboutModelPageView";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { getLocale } from "@/lib/i18n/getLocale";

export default async function AboutModelPage() {
  const locale = await getLocale();
  const dictionary = getDictionary(locale);

  return <AboutModelPageView content={dictionary.aboutModel} />;
}

