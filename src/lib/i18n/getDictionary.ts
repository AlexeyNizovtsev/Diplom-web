import { enDictionary } from "@/locales/en";
import { ruDictionary } from "@/locales/ru";
import type { AppDictionary, Locale } from "@/types/common";

const dictionaries: Record<Locale, AppDictionary> = {
  en: enDictionary,
  ru: ruDictionary
};

export function getDictionary(locale: Locale): AppDictionary {
  return dictionaries[locale];
}

