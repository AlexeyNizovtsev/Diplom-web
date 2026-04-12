import { questionnaireConfig } from "@/config/questionnaire";
import { getQuestionnaireContent } from "@/content/questionnaire";
import { AssessmentReviewPageView } from "@/features/assessment/AssessmentReviewPageView";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { getLocale } from "@/lib/i18n/getLocale";

export default async function AssessmentReviewPage() {
  const locale = await getLocale();
  const dictionary = getDictionary(locale);

  return (
    <AssessmentReviewPageView
      questionnaire={questionnaireConfig}
      content={getQuestionnaireContent(locale)}
      ui={dictionary.assessment.questionnaire}
      resultsDictionary={dictionary.results}
    />
  );
}
