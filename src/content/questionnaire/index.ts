import { enQuestionnaireContent } from "@/content/questionnaire/en";
import { ruQuestionnaireContent } from "@/content/questionnaire/ru";
import type { Locale } from "@/types/common";

export function getQuestionnaireContent(locale: Locale) {
  return locale === "ru" ? ruQuestionnaireContent : enQuestionnaireContent;
}
