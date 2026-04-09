import type { SVGProps } from "react";

import { cn } from "@/lib/utils";

interface ArrowRightIconProps extends SVGProps<SVGSVGElement> {
  className?: string;
}

export function ArrowRightIcon({ className, ...props }: ArrowRightIconProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-5 w-5", className)}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M4.16675 10H15.8334M15.8334 10L10.8334 5M15.8334 10L10.8334 15"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
