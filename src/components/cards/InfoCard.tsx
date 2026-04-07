import type { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

interface InfoCardProps extends PropsWithChildren {
  className?: string;
}

export function InfoCard({ children, className }: InfoCardProps) {
  return (
    <div className={cn("rounded-4xl border border-border bg-card p-6 shadow-soft lg:p-7", className)}>{children}</div>
  );
}

