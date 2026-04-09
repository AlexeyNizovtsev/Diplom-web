import Link from "next/link";

import { InfoCard } from "@/components/cards/InfoCard";
import { glassHeaderSurfaceClasses } from "@/components/surfaces/glassSurface";
import { cn } from "@/lib/utils";

interface MethodologyPreviewCardProps {
  title: string;
  description: string;
  action?: string;
  href: string;
  className?: string;
}

export function MethodologyPreviewCard({
  title,
  description,
  action = "",
  href,
  className,
}: MethodologyPreviewCardProps) {
  return (
    <Link
      href={href}
      className="group block h-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
    >
      <InfoCard
        className={cn(
          `${glassHeaderSurfaceClasses} flex h-full min-h-[200px] min-w-0 flex-col justify-between gap-8 rounded-[34px] p-7 transition duration-200 hover:-translate-y-1 hover:border-accent/35 hover:bg-card/68 lg:p-8`,
          className,
        )}
      >
        <div className="min-w-0 space-y-4">
          <h3 className="break-words text-[2rem] font-bold leading-[1.05] tracking-[-0.03em] text-text-primary">
            {title}
          </h3>
          <p className="break-words text-base leading-6 text-text-secondary">
            {description}
          </p>
        </div>
        <div className="flex items-end justify-between gap-4">
          <p className="break-words text-sm font-semibold text-text-primary">{action}</p>
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-dark bg-dark text-lg font-semibold text-text-on-dark shadow-soft transition group-hover:-translate-x-0.5 group-hover:bg-[#312b24]">
            &gt;
          </span>
        </div>
      </InfoCard>
    </Link>
  );
}
