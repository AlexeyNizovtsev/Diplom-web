import { formatMethodologyText } from "@/lib/methodology/formatMethodologyText";
import { cn } from "@/lib/utils";
import type { MethodologyCallout } from "@/types/methodology";

interface MethodologyCalloutCardProps {
  callout: MethodologyCallout;
  tone?: "dark" | "warm";
  className?: string;
}

export function MethodologyCalloutCard({
  callout,
  tone = "dark",
  className
}: MethodologyCalloutCardProps) {
  return (
    <div
      className={cn(
        "rounded-[1.8rem] border px-5 py-5 lg:px-6",
        tone === "dark"
          ? "border-dark bg-dark text-text-on-dark"
          : "border-[#dccdbe] bg-card-secondary text-text-primary",
        className
      )}
    >
      <div className="space-y-2">
        <p
          className={cn(
            "text-xs font-bold uppercase tracking-[0.24em]",
            tone === "dark" ? "text-[#f8c893]" : "text-accent"
          )}
        >
          {callout.label}
        </p>
        {callout.title ? (
          <h4 className={cn("text-xl font-bold tracking-tight", tone === "dark" ? "text-text-on-dark" : "text-text-primary")}>
            {formatMethodologyText(callout.title)}
          </h4>
        ) : null}
        <p className={cn("text-[0.98rem] leading-7", tone === "dark" ? "text-[#efe4d8]" : "text-text-secondary")}>
          {formatMethodologyText(callout.description)}
        </p>
      </div>
    </div>
  );
}
