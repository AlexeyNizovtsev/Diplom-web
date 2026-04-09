import { formatMethodologyText } from "@/lib/methodology/formatMethodologyText";
import { cn } from "@/lib/utils";

interface WorkflowStepCardProps {
  index: number;
  title: string;
  meta: string;
  stepLabelPrefix: string;
  highlight?: boolean;
  className?: string;
  contentClassName?: string;
  titleClassName?: string;
  metaClassName?: string;
}

export function WorkflowStepCard({
  index,
  title,
  meta,
  stepLabelPrefix,
  className,
  contentClassName,
  titleClassName,
  metaClassName
}: WorkflowStepCardProps) {
  return (
    <div
      className={cn(
        "min-w-[160px] rounded-[28px] border px-5 py-5",
        "border-border bg-card text-text-primary",
        className
      )}
    >
      <p className="text-xs font-bold uppercase tracking-[0.24em] text-accent">
        {stepLabelPrefix} {index}
      </p>
      <div className={cn("mt-2 space-y-1", contentClassName)}>
        <h3 className={cn("text-lg font-bold", titleClassName)}>{formatMethodologyText(title)}</h3>
        <p className={cn("text-sm text-text-secondary", metaClassName)}>{formatMethodologyText(meta)}</p>
      </div>
    </div>
  );
}
