import { cn } from "@/lib/utils";

interface WorkflowStepCardProps {
  index: number;
  title: string;
  meta: string;
  stepLabelPrefix: string;
  highlight?: boolean;
}

export function WorkflowStepCard({
  index,
  title,
  meta,
  stepLabelPrefix,
  highlight = false
}: WorkflowStepCardProps) {
  return (
    <div
      className={cn(
        "min-w-[160px] rounded-[28px] border px-5 py-5",
        highlight
          ? "border-transparent bg-dark text-text-on-dark"
          : "border-border bg-card text-text-primary"
      )}
    >
      <p className={cn("text-xs font-bold uppercase tracking-[0.24em]", highlight ? "text-[#f8d6b7]" : "text-accent")}>
        {stepLabelPrefix} {index}
      </p>
      <div className="mt-4 space-y-1">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className={cn("text-sm", highlight ? "text-[#eee5da]" : "text-text-secondary")}>{meta}</p>
      </div>
    </div>
  );
}
