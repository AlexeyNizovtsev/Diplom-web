import { MethodologiesPageView } from "@/features/methodologies/MethodologiesPageView";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { getLocale } from "@/lib/i18n/getLocale";
import { resolveMethodologyId } from "@/lib/methodology/resolveMethodologyId";

interface MethodologiesPageProps {
  searchParams?: {
    methodology?: string;
  };
}

export default async function MethodologiesPage({ searchParams }: MethodologiesPageProps) {
  const locale = await getLocale();
  const dictionary = getDictionary(locale);
  const selectedMethodologyId = resolveMethodologyId(searchParams?.methodology);

  return (
    <MethodologiesPageView
      content={dictionary.methodologies}
      selectedMethodologyId={selectedMethodologyId}
    />
  );
}

