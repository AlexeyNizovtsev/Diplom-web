import { cn } from "@/lib/utils";

interface AnswerOptionCardProps {
  label: string;
  description: string;
  isSelected: boolean;
  onSelect: () => void;
}

export function AnswerOptionCard({
  label,
  description,
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
          : "border-[#d9d5d0] bg-white/88 text-[#1c1f25] backdrop-blur-xl hover:border-[#c7b29e] hover:bg-[#fffaf5]"
      )}
    >
      <div className="flex w-full items-start justify-between gap-3">
        <span className="text-[1rem] font-extrabold leading-6 tracking-[-0.02em] lg:text-[1.1rem]">
          {label}
        </span>
        <span
          aria-hidden="true"
          className={cn(
            "inline-flex h-8 w-8 items-center justify-center rounded-full border transition-colors",
            isSelected
              ? "border-white/30 bg-white/12 text-white"
              : "border-[#e8ded4] bg-[#faf5ef] text-transparent"
          )}
        >
          <svg
            viewBox="0 0 16 16"
            className={cn("h-4 w-4", isSelected ? "opacity-100" : "opacity-0")}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.5 8.25L6.5 11.25L12.5 5.25"
              stroke="currentColor"
              strokeWidth="1.9"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
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
