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
  className,
}: AssessmentProgressBarProps) {
  const progressWidth = `${(currentStep / totalSteps) * 100}%`;

  return (
    <div className={cn("space-y-3", className)}>
      <div
        role="progressbar"
        aria-label={label}
        aria-valuemin={1}
        aria-valuemax={totalSteps}
        aria-valuenow={currentStep}
        className="h-[18px] overflow-hidden rounded-full bg-[#e7e4e0]"
      >
        <div
          aria-hidden="true"
          className="h-full rounded-full border border-[#a75806] bg-[#f28c22] transition-[width] duration-200"
          style={{ width: progressWidth }}
        />
      </div>
    </div>
  );
}
