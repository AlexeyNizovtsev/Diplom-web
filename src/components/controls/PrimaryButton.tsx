import Link from "next/link";
import type { ButtonHTMLAttributes, PropsWithChildren, ReactNode } from "react";

import { primaryButtonClasses } from "@/components/controls/buttonStyles";
import { cn } from "@/lib/utils";

interface PrimaryButtonProps extends PropsWithChildren, ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  className?: string;
  trailingIcon?: ReactNode;
}

export function PrimaryButton({
  children,
  href,
  className,
  trailingIcon,
  type = "button",
  ...props
}: PrimaryButtonProps) {
  const content = trailingIcon ? (
    <span className="flex min-w-0 w-full items-center justify-between gap-4">
      <span className="min-w-0 break-words text-left">{children}</span>
      <span className="shrink-0" aria-hidden="true">
        {trailingIcon}
      </span>
    </span>
  ) : (
    children
  );

  if (href) {
    return (
      <Link href={href} className={cn(primaryButtonClasses, className)}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} className={cn(primaryButtonClasses, className)} {...props}>
      {content}
    </button>
  );
}

