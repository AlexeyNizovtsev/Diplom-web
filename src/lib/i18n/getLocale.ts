import { cookies } from "next/headers";

import { localeCookieName } from "@/lib/i18n/constants";
import { resolveLocale } from "@/lib/i18n/resolveLocale";
import type { Locale } from "@/types/common";

export async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  return resolveLocale(cookieStore.get(localeCookieName)?.value);
}

