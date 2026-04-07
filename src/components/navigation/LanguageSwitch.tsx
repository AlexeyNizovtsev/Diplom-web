"use client";

import { startTransition, useState } from "react";
import { useRouter } from "next/navigation";

import { localeCookieName } from "@/lib/i18n/constants";
import { cn } from "@/lib/utils";
import { useLocale } from "@/hooks/useLocale";
import type { NavigationDictionary } from "@/types/common";

interface LanguageSwitchProps {
  nav: NavigationDictionary;
}

export function LanguageSwitch({ nav }: LanguageSwitchProps) {
  const router = useRouter();
  const { locale } = useLocale();
  const [isPending, setIsPending] = useState(false);

  const setLocale = (nextLocale: "en" | "ru") => {
    if (nextLocale === locale) {
      return;
    }

    setIsPending(true);
    document.cookie = `${localeCookieName}=${nextLocale}; path=/; max-age=31536000; SameSite=Lax`;

    startTransition(() => {
      router.refresh();
      setIsPending(false);
    });
  };

  return (
    <div
      className="inline-flex items-center gap-2 rounded-full border border-border bg-page p-1"
      aria-label={nav.languageSwitchLabel}
    >
      {(["en", "ru"] as const).map((item) => {
        const isActive = item === locale;

        return (
          <button
            key={item}
            type="button"
            onClick={() => setLocale(item)}
            className={cn(
              "rounded-full px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
              isActive ? "bg-dark text-text-on-dark" : "text-text-secondary hover:bg-card-secondary"
            )}
            aria-pressed={isActive}
            disabled={isPending}
          >
            {nav.languages[item]}
          </button>
        );
      })}
    </div>
  );
}
