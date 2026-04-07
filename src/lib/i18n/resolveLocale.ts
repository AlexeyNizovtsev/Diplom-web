import { defaultLocale, supportedLocales } from "@/lib/i18n/constants";
import type { Locale } from "@/types/common";

export function isSupportedLocale(value: string | undefined | null): value is Locale {
  return supportedLocales.includes(value as Locale);
}

export function resolveLocale(value: string | undefined | null): Locale {
  return isSupportedLocale(value) ? value : defaultLocale;
}

