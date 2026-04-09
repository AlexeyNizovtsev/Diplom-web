import type { SVGProps } from "react";

import { cn } from "@/lib/utils";

interface ArrowLeftIconProps extends SVGProps<SVGSVGElement> {
  className?: string;
}

export function ArrowLeftIcon({ className, ...props }: ArrowLeftIconProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-4 w-4", className)}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M15.8333 10H4.16667M4.16667 10L9.16667 15M4.16667 10L9.16667 5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
