import Link from "next/link";

import { buildMethodologyRoute } from "@/lib/routing/routes";
import { cn } from "@/lib/utils";
import type { MethodologyContentMap, MethodologyId } from "@/types/methodology";

interface MethodologyTabsProps {
  items: MethodologyContentMap;
  order: MethodologyId[];
  selectedId: MethodologyId;
  ariaLabel: string;
}

export function MethodologyTabs({ items, order, selectedId, ariaLabel }: MethodologyTabsProps) {
  return (
    <nav aria-label={ariaLabel} className="overflow-x-auto pb-1">
      <div className="flex min-w-max gap-3">
        {order.map((methodologyId) => {
          const item = items[methodologyId];
          const isActive = methodologyId === selectedId;

          return (
            <Link
              key={methodologyId}
              href={buildMethodologyRoute(methodologyId)}
              className={cn(
                "rounded-full border px-5 py-3 text-sm font-bold transition",
                isActive
                  ? "border-dark bg-dark text-text-on-dark"
                  : "border-border bg-card text-text-primary hover:border-[#b59e8b] hover:bg-card-secondary"
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
