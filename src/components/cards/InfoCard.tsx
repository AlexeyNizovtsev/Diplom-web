import type { PropsWithChildren } from "react";

import { glassPanelSurfaceClasses } from "@/components/surfaces/glassSurface";
import { cn } from "@/lib/utils";

interface InfoCardProps extends PropsWithChildren {
  className?: string;
}

export function InfoCard({ children, className }: InfoCardProps) {
  return (
    <div className={cn("rounded-4xl p-6 lg:p-7", glassPanelSurfaceClasses, className)}>
      {children}
    </div>
  );
}

