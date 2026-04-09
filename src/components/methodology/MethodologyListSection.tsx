import { InfoCard } from "@/components/cards/InfoCard";
import type { MethodologyListSection as MethodologyListSectionContent } from "@/types/methodology";

interface MethodologyListSectionProps {
  title: string;
  content: MethodologyListSectionContent;
}

export function MethodologyListSection({ title, content }: MethodologyListSectionProps) {
  return (
    <InfoCard>
      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold tracking-tight text-text-primary">{title}</h3>
          {content.intro ? <p className="text-sm leading-6 text-text-secondary">{content.intro}</p> : null}
        </div>
        <ul className="space-y-3">
          {content.items.map((item) => (
            <li key={item.id} className="rounded-[22px] border border-border bg-page px-4 py-4 text-sm leading-6 text-text-secondary">
              {item.text}
            </li>
          ))}
        </ul>
      </div>
    </InfoCard>
  );
}
