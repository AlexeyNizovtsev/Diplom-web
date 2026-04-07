import Link from "next/link";
import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

import { secondaryButtonClasses } from "@/components/controls/buttonStyles";
import { cn } from "@/lib/utils";

interface SecondaryButtonProps extends PropsWithChildren, ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  className?: string;
}

export function SecondaryButton({ children, href, className, type = "button", ...props }: SecondaryButtonProps) {
  if (href) {
    return (
      <Link href={href} className={cn(secondaryButtonClasses, className)}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={cn(secondaryButtonClasses, className)} {...props}>
      {children}
    </button>
  );
}

