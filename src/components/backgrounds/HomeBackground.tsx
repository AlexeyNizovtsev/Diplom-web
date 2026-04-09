"use client";

import { DarkVeil } from "@/components/backgrounds/DarkVeil";
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
      <div className="absolute inset-0 bg-[#F3F1EE]" />
      <div className="absolute inset-x-[-4%] top-20 bottom-[-6%] opacity-[0.82] lg:top-24">
        <DarkVeil
          hueShift={28}
          noiseIntensity={0}
          scanlineIntensity={0}
          speed={0.34}
          scanlineFrequency={1.2}
          warpAmount={0}
          resolutionScale={0.72}
          edgeWhiteness={1}
          centerWarmth={0.4}
          centerColor={[0.91, 0.56, 0.24]}
        />
      </div>
    </div>
  );
}
