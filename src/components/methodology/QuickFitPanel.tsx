import { formatMethodologyText } from "@/lib/methodology/formatMethodologyText";
import { cn } from "@/lib/utils";

interface QuickFitPanelProps {
  title?: string;
  summary: string;
  className?: string;
}

export function QuickFitPanel({ title, summary, className }: QuickFitPanelProps) {
  return (
    <div
      className={cn(
        "rounded-[1.85rem] border border-dark bg-dark px-5 py-5 lg:px-6",
        className
      )}
    >
      <div className="space-y-2">
        {title ? <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#f8c893]">{title}</p> : null}
        <p className="text-[1rem] leading-7 text-[#f3e8dc]">{formatMethodologyText(summary)}</p>
      </div>
    </div>
  );
}
