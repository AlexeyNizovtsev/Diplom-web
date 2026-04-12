import { glassFieldSurfaceClasses } from "@/components/surfaces/glassSurface";
import { cn } from "@/lib/utils";
import type { PropsWithChildren } from "react";

interface QuestionCardProps extends PropsWithChildren {
  id?: string;
  label: string;
  title: string;
  helperText?: string;
  className?: string;
}

export function QuestionCard({
  id,
  label,
  title,
  helperText,
  className,
  children
}: QuestionCardProps) {
  return (
    <section
      id={id}
      className={cn(
        "rounded-[32px] px-5 py-5 lg:px-8 lg:py-7",
        glassFieldSurfaceClasses,
        "border-[#e7d1bf]/70 bg-[#fbf8f5]/76",
        className
      )}
    >
      <div className="space-y-3">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#8b6a46] lg:text-[0.95rem]">
          {label}
        </p>
        <h3 className="max-w-[64rem] text-[1.5rem] font-extrabold leading-[1.15] tracking-[-0.03em] text-[#14171c] lg:text-[1.9rem]">
          {title}
        </h3>
        {helperText ? (
          <p className="max-w-[52rem] text-[0.98rem] leading-7 text-[#6a6e75] lg:text-[1.05rem]">
            {helperText}
          </p>
        ) : null}
      </div>
      <div className="mt-6">{children}</div>
    </section>
  );
}
