import { firstAssessmentBlockId } from "@/config/pages/assessment";
import { AssessmentIntroPageView } from "@/features/assessment/AssessmentIntroPageView";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { getLocale } from "@/lib/i18n/getLocale";
import { buildAssessmentBlockRoute } from "@/lib/routing/routes";

export default async function AssessmentPage() {
  const locale = await getLocale();
  const dictionary = getDictionary(locale);

  return (
    <AssessmentIntroPageView
      content={dictionary.assessment}
      startHref={buildAssessmentBlockRoute(firstAssessmentBlockId)}
    />
  );
}

