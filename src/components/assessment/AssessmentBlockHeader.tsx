interface AssessmentBlockHeaderProps {
  badgeLabel: string;
  title: string;
  helperText: string;
}

export function AssessmentBlockHeader({
  badgeLabel,
  title,
  helperText
}: AssessmentBlockHeaderProps) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
      <div className="max-w-3xl space-y-3">
        <h2 className="text-[1.75rem] font-extrabold leading-[1.05] tracking-[-0.04em] text-[#16181d] lg:text-[2rem]">
          {title}
        </h2>
        <p className="max-w-[48rem] text-[1rem] leading-7 text-text-secondary lg:text-[1.05rem]">
          {helperText}
        </p>
      </div>
      <div className="inline-flex w-fit rounded-full bg-[#111318] px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-white lg:text-[0.95rem]">
        {badgeLabel}
      </div>
    </div>
  );
}
