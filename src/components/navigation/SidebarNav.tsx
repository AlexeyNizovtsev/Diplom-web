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
    <nav aria-label={ariaLabel} className="space-y-1.5">
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          onClick={() => setActiveId(item.id)}
          className={cn(
            "block rounded-[1rem] px-3 py-2 text-sm font-semibold transition lg:px-3.5 lg:text-[0.98rem]",
            activeId === item.id
              ? "border-l-2 border-accent bg-transparent text-text-primary"
              : "border-l-2 border-transparent bg-transparent text-text-secondary hover:border-[#c58b3a] hover:text-text-primary"
          )}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}
