import { InfoCard } from "@/components/cards/InfoCard";
import { MethodologyCalloutCard } from "@/components/methodology/MethodologyCalloutCard";
import { formatMethodologyText } from "@/lib/methodology/formatMethodologyText";
import type { MethodologyListSection as MethodologyListSectionContent } from "@/types/methodology";

interface MethodologyListSectionProps {
  eyebrow: string;
  title: string;
  content: MethodologyListSectionContent;
  tone?: "card" | "warm";
  numbered?: boolean;
}

export function MethodologyListSection({
  eyebrow,
  title,
  content,
  tone = "card",
  numbered = false
}: MethodologyListSectionProps) {
  return (
    <InfoCard
      className={
        tone === "warm"
          ? "rounded-[2rem] border-[#dccdbe] bg-card-secondary px-6 py-6 shadow-none backdrop-blur-0 lg:px-8 lg:py-7"
          : "rounded-[2rem] border-[#e4ddd5] bg-card px-6 py-6 shadow-none backdrop-blur-0 lg:px-8 lg:py-7"
      }
    >
      <div className="space-y-6">
        <div className="space-y-3">
          <p className="text-xs font-bold uppercase tracking-[0.26em] text-accent">{eyebrow}</p>
          <h3 className="text-3xl font-bold tracking-tight text-text-primary lg:text-[2.05rem]">
            {formatMethodologyText(content.title ?? title)}
          </h3>
          {content.intro ? (
            <p className="max-w-4xl text-base leading-7 text-text-secondary lg:text-[1.02rem]">
              {formatMethodologyText(content.intro)}
            </p>
          ) : null}
        </div>
        <ul>
          {content.items.map((item, index) => (
            <li
              key={item.id}
              className={index === 0 ? "py-3 text-[0.98rem] leading-7 text-text-secondary" : "border-t border-[#e4ddd5] py-3 text-[0.98rem] leading-7 text-text-secondary"}
            >
              {numbered ? (
                <div className="flex gap-3">
                  <span className="w-7 shrink-0 font-bold text-accent">{index + 1}.</span>
                  <span>{formatMethodologyText(item.text)}</span>
                </div>
              ) : (
                formatMethodologyText(item.text)
              )}
            </li>
          ))}
        </ul>
        {content.callout ? <MethodologyCalloutCard callout={content.callout} /> : null}
      </div>
    </InfoCard>
  );
}
