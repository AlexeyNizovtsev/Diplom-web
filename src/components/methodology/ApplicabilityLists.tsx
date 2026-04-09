import { MethodologyCalloutCard } from "@/components/methodology/MethodologyCalloutCard";
import { formatMethodologyText } from "@/lib/methodology/formatMethodologyText";
import type { MethodologyApplicability } from "@/types/methodology";

interface ApplicabilityListsProps {
  eyebrow: string;
  title: string;
  content: MethodologyApplicability;
  goodFitLabel: string;
  weakerFitLabel: string;
}

export function ApplicabilityLists({
  eyebrow,
  title,
  content,
  goodFitLabel,
  weakerFitLabel
}: ApplicabilityListsProps) {
  return (
    <div className="space-y-6 rounded-[2rem] border border-[#e4ddd5] bg-card px-6 py-6 shadow-none lg:px-8 lg:py-7">
      <div className="space-y-3">
        <p className="text-xs font-bold uppercase tracking-[0.26em] text-accent">{eyebrow}</p>
        <h3 className="text-3xl font-bold tracking-tight text-text-primary lg:text-[2.1rem]">
          {formatMethodologyText(title)}
        </h3>
      </div>

      <div className="rounded-[1.8rem] border border-dark bg-dark px-5 py-5 text-text-on-dark lg:px-6">
        <div className="space-y-4">
          <h4 className="text-[1.65rem] font-bold tracking-tight lg:text-[1.95rem]">{goodFitLabel}</h4>
          <ul>
            {content.goodFit.map((item, index) => (
              <li
                key={item.id}
                className={index === 0 ? "py-3 text-[0.98rem] leading-7 text-[#efe4d8]" : "border-t border-white/10 py-3 text-[0.98rem] leading-7 text-[#efe4d8]"}
              >
                {formatMethodologyText(item.text)}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="rounded-[1.8rem] border border-[#dccdbe] bg-card-secondary px-5 py-5 lg:px-6">
        <div className="space-y-4">
          <h4 className="text-[1.65rem] font-bold tracking-tight text-text-primary lg:text-[1.95rem]">
            {weakerFitLabel}
          </h4>
          <ul>
            {content.weakerFit.map((item, index) => (
              <li
                key={item.id}
                className={index === 0 ? "py-3 text-[0.98rem] leading-7 text-text-secondary" : "border-t border-[#dccdbe] py-3 text-[0.98rem] leading-7 text-text-secondary"}
              >
                {formatMethodologyText(item.text)}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {content.callout ? <MethodologyCalloutCard callout={content.callout} /> : null}
    </div>
  );
}
