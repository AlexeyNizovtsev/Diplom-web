import { HomePageView } from "@/features/home/HomePageView";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { getLocale } from "@/lib/i18n/getLocale";

export default function HomePage() {
  const locale = getLocale();
  const dictionary = getDictionary(locale);

  return <HomePageView content={dictionary.home} />;
}

