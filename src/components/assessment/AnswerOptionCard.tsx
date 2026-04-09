import { cn } from "@/lib/utils";

interface AnswerOptionCardProps {
  label: string;
  description: string;
  selectedLabel: string;
  isSelected: boolean;
  onSelect: () => void;
}

export function AnswerOptionCard({
  label,
  description,
  selectedLabel,
  isSelected,
  onSelect
}: AnswerOptionCardProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={isSelected}
      onClick={onSelect}
      className={cn(
        "flex min-h-[8.5rem] w-full flex-col items-start justify-between rounded-[26px] border px-5 py-4 text-left transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        isSelected
          ? "border-[#111318] bg-[#111318] text-white shadow-soft"
          : "border-[#d9d5d0] bg-white text-[#1c1f25] hover:border-[#c7b29e] hover:bg-[#fffaf5]"
      )}
    >
      <div className="flex w-full items-start justify-between gap-3">
        <span className="text-[1rem] font-extrabold leading-6 tracking-[-0.02em] lg:text-[1.1rem]">
          {label}
        </span>
        <span
          aria-hidden="true"
          className={cn(
            "inline-flex rounded-full border px-2.5 py-1 text-[0.72rem] font-bold uppercase tracking-[0.18em]",
            isSelected
              ? "border-white/25 bg-white/12 text-white"
              : "border-[#e8ded4] bg-[#faf5ef] text-transparent"
          )}
        >
          {isSelected ? selectedLabel : "\u00A0"}
        </span>
      </div>
      <span
        className={cn("pr-3 text-sm leading-6", isSelected ? "text-[#d8dce3]" : "text-[#6a6e75]")}
      >
        {description}
      </span>
    </button>
  );
}
