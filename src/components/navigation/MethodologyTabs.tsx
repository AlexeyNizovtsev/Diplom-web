"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { glassHeaderSurfaceClasses } from "@/components/surfaces/glassSurface";
import { buildMethodologyRoute } from "@/lib/routing/routes";
import { cn } from "@/lib/utils";
import type { MethodologyContentMap, MethodologyId } from "@/types/methodology";

interface MethodologyTabsProps {
  items: MethodologyContentMap;
  order: MethodologyId[];
  selectedId: MethodologyId;
  ariaLabel: string;
  className?: string;
}

export function MethodologyTabs({
  items,
  order,
  selectedId,
  ariaLabel,
  className,
}: MethodologyTabsProps) {
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const syncCompactState = () => {
      setIsCompact(window.scrollY > 180);
    };

    syncCompactState();
    window.addEventListener("scroll", syncCompactState, { passive: true });

    return () => {
      window.removeEventListener("scroll", syncCompactState);
    };
  }, []);

  return (
    <nav
      aria-label={ariaLabel}
      className={cn(
        `overflow-x-auto rounded-[2rem] transition-all duration-200 ${glassHeaderSurfaceClasses} bg-card-secondary/75`,
        isCompact
          ? "rounded-[1.2rem] px-1.5 py-1 lg:px-2.5"
          : "px-3 py-3 lg:px-4",
        className,
      )}
    >
      <div
        className={cn(
          "grid min-w-max grid-flow-col auto-cols-[minmax(8.5rem,1fr)] transition-all duration-200 lg:min-w-0 lg:grid-cols-6 lg:auto-cols-auto",
          isCompact ? "gap-2" : "gap-3",
        )}
      >
        {order.map((methodologyId) => {
          const item = items[methodologyId];
          const isActive = methodologyId === selectedId;

          return (
            <Link
              key={methodologyId}
              href={buildMethodologyRoute(methodologyId)}
              className={cn(
                "inline-flex w-full min-w-[8.5rem] items-center justify-center rounded-[1rem] border px-4 font-bold transition",
                isCompact
                  ? "min-h-[2.3rem] py-1.5 text-[0.82rem] lg:text-[0.88rem]"
                  : "min-h-[3.2rem] py-2.5 text-base lg:text-[1.08rem]",
                isActive
                  ? "border-dark bg-dark text-text-on-dark"
                  : "border-border/12 bg-card/80 text-text-primary backdrop-blur-xl hover:border-[#b59e8b] hover:bg-card/90",
              )}
            >
              {item.shortLabel ?? item.title}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
