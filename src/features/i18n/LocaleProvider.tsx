"use client";

import { createContext, useMemo, type PropsWithChildren } from "react";

import type { Locale } from "@/types/common";

interface LocaleContextValue {
  locale: Locale;
}

export const LocaleContext = createContext<LocaleContextValue | null>(null);

interface LocaleProviderProps extends PropsWithChildren {
  locale: Locale;
}

export function LocaleProvider({ children, locale }: LocaleProviderProps) {
  const value = useMemo(() => ({ locale }), [locale]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

