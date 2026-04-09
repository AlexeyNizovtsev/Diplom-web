import { QuickFitPanel } from "@/components/methodology/QuickFitPanel";
import { glassPanelSurfaceClasses } from "@/components/surfaces/glassSurface";
import { formatMethodologyText } from "@/lib/methodology/formatMethodologyText";
import { cn } from "@/lib/utils";
import type { MethodologyOverview, MethodologyQuickFit } from "@/types/methodology";

interface MethodologyOverviewCardProps {
  eyebrow: string;
  title: string;
  typeLabel: string;
  overview: MethodologyOverview;
  quickFit?: MethodologyQuickFit;
  className?: string;
}

export function MethodologyOverviewCard({
  eyebrow,
  title,
  typeLabel,
  overview,
  quickFit,
  className
}: MethodologyOverviewCardProps) {
  return (
    <div
      className={cn(
        `rounded-[2rem] px-6 py-6 lg:px-8 lg:py-7 ${glassPanelSurfaceClasses}`,
        className
      )}
    >
      <div className="space-y-6">
        <div className="space-y-5">
          <p className="text-xs font-bold uppercase tracking-[0.26em] text-accent">{eyebrow}</p>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-5xl space-y-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
                <h2 className="text-4xl font-extrabold tracking-tight text-text-primary lg:text-[3.5rem]">
                  {title}
                </h2>
                {overview.fitBadge ? (
                  <span className="inline-flex w-fit rounded-full border border-dark bg-dark px-4 py-2 text-sm font-semibold text-text-on-dark">
                    {overview.fitBadge}
                  </span>
                ) : null}
              </div>
              <p className="max-w-[52rem] text-base leading-8 text-text-secondary lg:text-[1.08rem]">
                {formatMethodologyText(overview.summary)}
              </p>
            </div>
            <div className="flex justify-end lg:min-w-[14rem]">
              <span className="inline-flex w-fit rounded-full border border-dark bg-dark px-4 py-2 text-sm font-bold text-text-on-dark shadow-none">
                {typeLabel}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          {overview.signalTags.map((tag) => (
            <span
              key={tag.id}
              className="rounded-[1.1rem] border border-border/12 bg-card/80 px-4 py-2 text-sm font-semibold text-text-primary backdrop-blur-xl lg:text-[0.95rem]"
            >
              {tag.label}
            </span>
          ))}
        </div>

        <div className="space-y-4">
          {overview.entries.map((entry) => (
            <div key={entry.id} className="rounded-[1.6rem] border border-border/12 bg-card/80 px-5 py-5 backdrop-blur-xl">
              <div className="flex flex-col gap-2 lg:flex-row lg:items-start lg:gap-4">
                <h3 className="w-full max-w-[12.5rem] shrink-0 text-xl font-bold tracking-tight text-text-primary">
                  {formatMethodologyText(entry.title)}
                </h3>
                <p className="text-[0.98rem] leading-7 text-text-secondary">{formatMethodologyText(entry.description)}</p>
              </div>
            </div>
          ))}
        </div>

        {quickFit ? <QuickFitPanel title={quickFit.title} summary={quickFit.summary} /> : null}
      </div>
    </div>
  );
}
