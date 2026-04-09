import { NavLinks } from "@/components/navigation/NavLinks";
import { LanguageSwitch } from "@/components/navigation/LanguageSwitch";
import { PageContainer } from "@/components/layout/PageContainer";
import { glassHeaderSurfaceClasses } from "@/components/surfaces/glassSurface";
import type { NavigationDictionary } from "@/types/common";

interface AppHeaderProps {
  nav: NavigationDictionary;
}

export function AppHeader({ nav }: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-20 pt-[var(--app-header-top-gap)]">
      <PageContainer>
        <div
          className={`flex min-h-[var(--app-header-surface-height)] items-center gap-4 rounded-[32px] px-5 py-4 lg:gap-6 ${glassHeaderSurfaceClasses}`}
        >
          <div className="min-w-0 flex-1">
            <NavLinks nav={nav} />
          </div>
          <div className="shrink-0">
            <LanguageSwitch nav={nav} />
          </div>
        </div>
      </PageContainer>
    </header>
  );
}
