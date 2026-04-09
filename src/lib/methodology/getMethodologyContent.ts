import { enMethodologyContent } from "@/content/methodologies/en";
import { ruMethodologyContent } from "@/content/methodologies/ru";
import type { Locale } from "@/types/common";
import type { MethodologyContent, MethodologyContentMap, MethodologyId } from "@/types/methodology";

const methodologyContentByLocale: Record<Locale, MethodologyContentMap> = {
  en: enMethodologyContent,
  ru: ruMethodologyContent
};

export function getMethodologyContentMap(locale: Locale): MethodologyContentMap {
  return methodologyContentByLocale[locale];
}

export function getMethodologyContent(locale: Locale, methodologyId: MethodologyId): MethodologyContent {
  return methodologyContentByLocale[locale][methodologyId];
}
