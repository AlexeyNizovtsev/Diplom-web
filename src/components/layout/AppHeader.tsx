import { NavLinks } from "@/components/navigation/NavLinks";
import { LanguageSwitch } from "@/components/navigation/LanguageSwitch";
import { PageContainer } from "@/components/layout/PageContainer";
import type { NavigationDictionary } from "@/types/common";

interface AppHeaderProps {
  nav: NavigationDictionary;
}

export function AppHeader({ nav }: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-20 pt-5">
      <PageContainer>
        <div className="flex items-center justify-between gap-8 rounded-[32px] border border-border/90 bg-card/95 px-5 py-4 shadow-soft backdrop-blur">
          <NavLinks nav={nav} />
          <LanguageSwitch nav={nav} />
        </div>
      </PageContainer>
    </header>
  );
}
