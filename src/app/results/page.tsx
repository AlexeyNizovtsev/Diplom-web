import { getDictionary } from "@/lib/i18n/getDictionary";
import { getLocale } from "@/lib/i18n/getLocale";
import { ResultsPageEntryPoint } from "@/features/results/ResultsPageEntryPoint";

interface ResultsPageProps {
  searchParams?: Promise<{
    code?: string;
  }>;
}

export default async function ResultsPage({ searchParams }: ResultsPageProps) {
  const locale = await getLocale();
  const dictionary = getDictionary(locale);
  const resolvedSearchParams = searchParams ? await searchParams : undefined;

  return (
    <ResultsPageEntryPoint content={dictionary.results} requestedCode={resolvedSearchParams?.code} />
  );
}
