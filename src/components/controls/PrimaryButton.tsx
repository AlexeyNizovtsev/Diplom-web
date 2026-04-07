import Link from "next/link";
import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

import { primaryButtonClasses } from "@/components/controls/buttonStyles";
import { cn } from "@/lib/utils";

interface PrimaryButtonProps extends PropsWithChildren, ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  className?: string;
}

export function PrimaryButton({ children, href, className, type = "button", ...props }: PrimaryButtonProps) {
  if (href) {
    return (
      <Link href={href} className={cn(primaryButtonClasses, className)}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={cn(primaryButtonClasses, className)} {...props}>
      {children}
    </button>
  );
}

