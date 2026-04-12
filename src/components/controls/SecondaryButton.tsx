import Link from "next/link";
import type { ButtonHTMLAttributes, PropsWithChildren, ReactNode } from "react";

import { secondaryButtonClasses } from "@/components/controls/buttonStyles";
import { cn } from "@/lib/utils";

interface SecondaryButtonProps
  extends PropsWithChildren, ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  className?: string;
  trailingIcon?: ReactNode;
}

export function SecondaryButton({
  children,
  href,
  className,
  trailingIcon,
  type = "button",
  ...props
}: SecondaryButtonProps) {
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
      <Link href={href} className={cn(secondaryButtonClasses, className)}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={cn(secondaryButtonClasses, className)}
      {...props}
    >
      {content}
    </button>
  );
}
