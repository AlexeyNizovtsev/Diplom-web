import Link from "next/link";

import { InfoCard } from "@/components/cards/InfoCard";
import { cn } from "@/lib/utils";

interface MethodologyPreviewCardProps {
  title: string;
  description: string;
  action: string;
  href: string;
  className?: string;
}

export function MethodologyPreviewCard({
  title,
  description,
  action,
  href,
  className
}: MethodologyPreviewCardProps) {
  return (
    <Link
      href={href}
      className="group block h-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
    >
      <InfoCard
        className={cn(
          "flex h-full min-h-[228px] flex-col justify-between gap-8 rounded-[34px] p-7 transition duration-200 hover:-translate-y-1 hover:border-accent/60 hover:bg-card-secondary lg:p-8",
          className
        )}
      >
        <div className="space-y-4">
          <h3 className="text-[2rem] font-bold leading-[1.05] tracking-[-0.03em] text-text-primary">{title}</h3>
          <p className="max-w-[18rem] text-base leading-6 text-text-secondary">{description}</p>
        </div>
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm font-semibold text-text-primary">{action}</p>
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#d8d4cf] text-lg font-semibold text-text-primary transition group-hover:bg-dark group-hover:text-text-on-dark">
            &gt;
          </span>
        </div>
      </InfoCard>
    </Link>
  );
}
