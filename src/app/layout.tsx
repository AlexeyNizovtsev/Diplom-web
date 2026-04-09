import type { Metadata } from "next";
import { Manrope } from "next/font/google";

import { AppHeader } from "@/components/layout/AppHeader";
import { LocaleProvider } from "@/features/i18n/LocaleProvider";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { getLocale } from "@/lib/i18n/getLocale";

import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Methodology Match",
  description: "Rule-based methodology selection for software project context"
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const dictionary = getDictionary(locale);

  return (
    <html lang={locale}>
      <body className={manrope.variable}>
        <LocaleProvider locale={locale}>
          <div className="min-h-screen">
            <AppHeader nav={dictionary.nav} />
            <main>{children}</main>
          </div>
        </LocaleProvider>
      </body>
    </html>
  );
}

