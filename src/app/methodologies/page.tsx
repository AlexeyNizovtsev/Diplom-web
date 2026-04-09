import { MethodologiesPageView } from "@/features/methodologies/MethodologiesPageView";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { getLocale } from "@/lib/i18n/getLocale";
import { getMethodologyContentMap } from "@/lib/methodology/getMethodologyContent";
import { resolveMethodologyId } from "@/lib/methodology/resolveMethodologyId";

interface MethodologiesPageProps {
  searchParams?: Promise<{
    methodology?: string;
  }>;
}

export default async function MethodologiesPage({ searchParams }: MethodologiesPageProps) {
  const locale = await getLocale();
  const dictionary = getDictionary(locale);
  const methodologies = getMethodologyContentMap(locale);
  const resolvedSearchParams = await searchParams;
  const selectedMethodologyId = resolveMethodologyId(resolvedSearchParams?.methodology);

  return (
    <MethodologiesPageView
      labels={dictionary.methodologies}
      methodologies={methodologies}
      selectedMethodologyId={selectedMethodologyId}
    />
  );
}

