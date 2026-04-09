"use client";

import { useEffect, useState } from "react";

import { InfoCard } from "@/components/cards/InfoCard";
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
    <div className="space-y-5">
      <div className="flex flex-wrap gap-3" role="tablist" aria-label={ariaLabel}>
        {groups.map((group) => (
          <button
            key={group.id}
            type="button"
            role="tab"
            aria-selected={group.id === activeGroup.id}
            onClick={() => setActiveGroupId(group.id)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-bold transition",
              group.id === activeGroup.id
                ? "border-dark bg-dark text-text-on-dark"
                : "border-border bg-card text-text-primary hover:border-[#b59e8b] hover:bg-card-secondary"
            )}
          >
            {group.label}
          </button>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {activeGroup.items.map((item) => (
          <InfoCard key={item.id} className="h-full">
            <div className="space-y-2">
              <h4 className="text-lg font-bold text-text-primary">{item.title}</h4>
              <p className="text-sm leading-6 text-text-secondary">{item.description}</p>
              {item.note ? <p className="text-sm font-medium text-accent">{item.note}</p> : null}
            </div>
          </InfoCard>
        ))}
      </div>
    </div>
  );
}
