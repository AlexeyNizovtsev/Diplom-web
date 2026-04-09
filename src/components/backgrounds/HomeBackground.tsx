"use client";

import DarkVeil from "@/components/backgrounds/DarkVeil";
import { cn } from "@/lib/utils";

interface HomeBackgroundProps {
  className?: string;
}

export function HomeBackground({ className }: HomeBackgroundProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none fixed inset-0 z-0 overflow-hidden",
        className,
      )}
    >
      <DarkVeil
        className="absolute inset-0 h-full w-full"
        hueShift={205}
        noiseIntensity={0}
        scanlineIntensity={0}
        speed={0.8}
        scanlineFrequency={0}
        warpAmount={2}
        resolutionScale={1}
      />
    </div>
  );
}
