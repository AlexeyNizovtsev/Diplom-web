"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { routes } from "@/lib/routing/routes";
import type { NavigationDictionary } from "@/types/common";

interface NavLinksProps {
  nav: NavigationDictionary;
}

const navItems = [
  { href: routes.methodologies, key: "methodologies" },
  { href: routes.howItWorks, key: "howItWorks" },
  { href: routes.aboutModel, key: "aboutModel" },
] as const;

export function NavLinks({ nav }: NavLinksProps) {
  const pathname = usePathname();

  return (
    <div className="flex min-w-0 items-center gap-6 lg:gap-10">
      <Link
        href={routes.home}
        className="flex shrink-0 items-center gap-3 text-[1.35rem] font-extrabold tracking-[-0.03em] text-text-primary"
      >
        <span className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-dark text-text-on-dark">
          <span className="h-3.5 w-3.5 rounded-full bg-text-on-dark/90" />
          <span className="absolute bottom-2 right-2 h-2.5 w-2.5 rounded-full bg-accent" />
        </span>
        <span>{nav.productName}</span>
      </Link>

      <nav
        aria-label={nav.primaryNavigationLabel}
        className="flex flex-wrap items-center gap-2"
      >
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-full px-4 py-2 text-[15px] font-bold tracking-[-0.01em] transition",
                isActive
                  ? "bg-dark text-text-on-dark"
                  : "text-[#4f4a43] hover:bg-white/70",
              )}
            >
              {nav.links[item.key]}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
