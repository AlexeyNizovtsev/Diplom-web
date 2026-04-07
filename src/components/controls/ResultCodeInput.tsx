import type { InputHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

interface ResultCodeInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export function ResultCodeInput({ className, ...props }: ResultCodeInputProps) {
  return (
    <input
      {...props}
      className={cn(
        "w-full rounded-[24px] border border-[#dccdbe] bg-page px-6 py-4 text-lg text-text-primary outline-none transition placeholder:text-text-secondary/70 focus:border-accent focus:ring-2 focus:ring-accent/20",
        className
      )}
    />
  );
}
