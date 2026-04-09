"use client";

import { useRouter } from "next/navigation";

import { ArrowLeftIcon } from "@/components/icons/ArrowLeftIcon";
import { routes } from "@/lib/routing/routes";
import { cn } from "@/lib/utils";

interface BackButtonProps {
  label: string;
  fallbackHref?: string;
  className?: string;
  iconOnly?: boolean;
}

export function BackButton({
  label,
  fallbackHref = routes.home,
  className,
  iconOnly = false
}: BackButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (window.history.length > 1) {
      router.back();
      return;
    }

    router.push(fallbackHref);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={label}
      className={cn(
        iconOnly
          ? "inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#e4ddd5] bg-card text-text-primary shadow-none transition hover:border-[#d2c5b8] hover:bg-card-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          : "inline-flex items-center gap-2 rounded-full border border-[#e4ddd5] bg-card px-3 py-2 text-sm font-semibold text-text-primary shadow-none transition hover:border-[#d2c5b8] hover:bg-card-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent lg:text-[0.95rem]",
        className
      )}
    >
      <ArrowLeftIcon />
      {iconOnly ? null : <span>{label}</span>}
    </button>
  );
}
