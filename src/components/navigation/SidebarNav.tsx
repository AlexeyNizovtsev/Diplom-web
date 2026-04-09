"use client";

import { useEffect, useState } from "react";

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
  const [activeId, setActiveId] = useState(items[0]?.id);

  useEffect(() => {
    const syncHash = () => {
      const hash = window.location.hash.slice(1);

      if (hash && items.some((item) => item.id === hash)) {
        setActiveId(hash);
      }
    };

    syncHash();
    window.addEventListener("hashchange", syncHash);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);

        if (!visibleEntries.length) {
          return;
        }

        const nextActive = visibleEntries
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0]
          ?.target.id;

        if (nextActive) {
          setActiveId(nextActive);
        }
      },
      {
        rootMargin: "-25% 0px -55% 0px",
        threshold: [0.2, 0.45, 0.7]
      }
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);

      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", syncHash);
    };
  }, [items]);

  return (
    <nav aria-label={ariaLabel} className="space-y-2">
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          onClick={() => setActiveId(item.id)}
          className={cn(
            "block rounded-[24px] border px-4 py-3 text-sm font-semibold transition",
            activeId === item.id
              ? "border-dark bg-dark text-text-on-dark"
              : "border-border bg-card text-text-primary hover:border-[#b59e8b] hover:bg-card-secondary"
          )}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}
