import { cn } from "@/lib/utils";

interface AssessmentProgressBarProps {
  currentStep: number;
  totalSteps: number;
  label: string;
  className?: string;
}

export function AssessmentProgressBar({
  currentStep,
  totalSteps,
  label,
  className
}: AssessmentProgressBarProps) {
  const progressWidth = `${(currentStep / totalSteps) * 100}%`;

  return (
    <div className={cn("space-y-3", className)}>
      <div aria-hidden="true" className="h-[18px] overflow-hidden rounded-full bg-[#e7e4e0]">
        <div
          className="h-full rounded-full border border-[#a75806] bg-[#f28c22] transition-[width] duration-200"
          style={{ width: progressWidth }}
        />
      </div>
      <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#8b6a46] lg:text-[0.95rem]">
        {label}
      </p>
    </div>
  );
}
