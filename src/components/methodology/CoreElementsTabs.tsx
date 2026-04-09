"use client";

import { useEffect, useState } from "react";

import { InfoCard } from "@/components/cards/InfoCard";
import { formatMethodologyText } from "@/lib/methodology/formatMethodologyText";
import { cn } from "@/lib/utils";
import type { CoreElementsGroup } from "@/types/methodology";

interface CoreElementsTabsProps {
  groups: CoreElementsGroup[];
  ariaLabel: string;
}

export function CoreElementsTabs({ groups, ariaLabel }: CoreElementsTabsProps) {
  const [activeGroupId, setActiveGroupId] = useState(groups[0]?.id);

  useEffect(() => {
    setActiveGroupId(groups[0]?.id);
  }, [groups]);

  const activeGroup = groups.find((group) => group.id === activeGroupId) ?? groups[0];

  if (!activeGroup) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3" role="tablist" aria-label={ariaLabel}>
        {groups.map((group) => (
          <button
            key={group.id}
            type="button"
            role="tab"
            aria-selected={group.id === activeGroup.id}
            onClick={() => setActiveGroupId(group.id)}
            className={cn(
              "rounded-[1rem] border px-5 py-3 text-sm font-bold transition lg:text-base",
              group.id === activeGroup.id
                ? "border-dark bg-dark text-text-on-dark"
                : "border-[#dccdbe] bg-card text-text-primary hover:border-[#b59e8b] hover:bg-page"
            )}
          >
            {group.label}
          </button>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {activeGroup.items.map((item) => (
          <InfoCard
            key={item.id}
            className="h-full rounded-[1.7rem] border-[#dccdbe] bg-card px-5 py-5 shadow-none backdrop-blur-0"
          >
            <div className="space-y-3">
              <h4 className="text-xl font-bold text-text-primary">{formatMethodologyText(item.title)}</h4>
              <p className="text-[0.98rem] leading-7 text-text-secondary">
                {formatMethodologyText(item.description)}
              </p>
              {item.note ? <p className="text-sm font-medium text-accent">{formatMethodologyText(item.note)}</p> : null}
            </div>
          </InfoCard>
        ))}
      </div>
    </div>
  );
}
