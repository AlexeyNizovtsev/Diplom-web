"use client";

import { useEffect, useMemo, useState } from "react";

import { cn } from "@/lib/utils";

interface SidebarNavItem {
  id: string;
  label: string;
}

interface SidebarNavProps {
  items: SidebarNavItem[];
  ariaLabel: string;
}

export function SidebarNav({ items, ariaLabel }: SidebarNavProps) {
  const firstItemId = items[0]?.id;
  const [activeId, setActiveId] = useState(firstItemId);

  const itemIds = useMemo(() => items.map((item) => item.id), [items]);

  useEffect(() => {
    if (!items.length) return;

    const updateHashSelection = () => {
      const hash = window.location.hash.slice(1);

      if (hash && itemIds.includes(hash)) {
        setActiveId((prev) => (prev === hash ? prev : hash));
      }
    };

    updateHashSelection();
    window.addEventListener("hashchange", updateHashSelection);

    const sections = itemIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (!sections.length) {
      return () => {
        window.removeEventListener("hashchange", updateHashSelection);
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);

        if (!visible.length) return;

        const bestMatch = visible.reduce((best, current) => {
          if (!best) return current;
          return current.intersectionRatio > best.intersectionRatio
            ? current
            : best;
        });

        const nextId = bestMatch.target.id;

        setActiveId((prev) => (prev === nextId ? prev : nextId));
      },
      {
        root: null,
        rootMargin: "-18% 0px -55% 0px",
        threshold: [0, 0.15, 0.3, 0.45, 0.6, 0.75],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", updateHashSelection);
    };
  }, [itemIds, items.length]);

  return (
    <nav aria-label={ariaLabel} className="space-y-1.5">
      {items.map((item) => {
        const isActive = activeId === item.id;

        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={() => {
              setActiveId((prev) => (prev === item.id ? prev : item.id));
            }}
            className={cn(
              "block rounded-[1rem] px-3 py-2 text-sm font-semibold transition-colors lg:px-3.5 lg:text-[0.98rem]",
              isActive
                ? "border-l-2 border-accent text-text-primary"
                : "border-l-2 border-transparent text-text-secondary hover:border-[#c58b3a] hover:text-text-primary",
            )}
            aria-current={isActive ? "true" : undefined}
          >
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}
