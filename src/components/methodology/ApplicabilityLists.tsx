import { InfoCard } from "@/components/cards/InfoCard";
import type { MethodologyApplicability } from "@/types/methodology";

interface ApplicabilityListsProps {
  content: MethodologyApplicability;
}

export function ApplicabilityLists({ content }: ApplicabilityListsProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <InfoCard className="h-full bg-dark text-text-on-dark">
        <div className="space-y-4">
          <h4 className="text-lg font-bold">{content.goodFitTitle}</h4>
          <ul className="space-y-3">
            {content.goodFit.map((item) => (
              <li key={item.id} className="rounded-[22px] border border-white/10 bg-white/5 px-4 py-4 text-sm leading-6 text-[#efe4d8]">
                {item.text}
              </li>
            ))}
          </ul>
        </div>
      </InfoCard>

      <InfoCard className="h-full bg-card-secondary">
        <div className="space-y-4">
          <h4 className="text-lg font-bold text-text-primary">{content.weakerFitTitle}</h4>
          <ul className="space-y-3">
            {content.weakerFit.map((item) => (
              <li key={item.id} className="rounded-[22px] border border-border bg-card px-4 py-4 text-sm leading-6 text-text-secondary">
                {item.text}
              </li>
            ))}
          </ul>
        </div>
      </InfoCard>
    </div>
  );
}
