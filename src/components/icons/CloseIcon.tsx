import type { SVGProps } from "react";

import { cn } from "@/lib/utils";

interface CloseIconProps extends SVGProps<SVGSVGElement> {
  className?: string;
}

export function CloseIcon({ className, ...props }: CloseIconProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className={cn("h-4 w-4", className)}
      {...props}
    >
      <path
        d="M5 5L15 15M15 5L5 15"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
