import { MetaStatCard } from "@/components/assessment/MetaStatCard";
import { InfoPanel } from "@/components/assessment/InfoPanel";
import { InfoCard } from "@/components/cards/InfoCard";
import { BackButton } from "@/components/controls/BackButton";
import { PrimaryButton } from "@/components/controls/PrimaryButton";
import { ArrowRightIcon } from "@/components/icons/ArrowRightIcon";
import { routes } from "@/lib/routing/routes";
import type { AssessmentDictionary } from "@/types/common";

interface AssessmentIntroCardProps {
  content: AssessmentDictionary;
  startHref: string;
}

export function AssessmentIntroCard({ content, startHref }: AssessmentIntroCardProps) {
  return (
    <InfoCard className="rounded-[40px] border-white/30 bg-card/54 px-6 py-7 shadow-[0_18px_48px_rgba(17,19,24,0.08)] lg:min-h-[36rem] lg:px-12 lg:py-9">
      <div className="flex h-full flex-col gap-7 lg:gap-8">
        <div className="space-y-7">
          <div className="max-w-[60rem] space-y-4">
            <h2 className="text-balance text-[2rem] font-extrabold leading-[0.98] tracking-[-0.045em] text-text-primary lg:text-[2.85rem]">
              {content.introCard.title}
            </h2>
            <div className="space-y-3">
              {content.introCard.description.map((line) => (
                <p
                  key={line}
                  className="max-w-[49rem] text-[1rem] leading-[1.55] text-text-secondary lg:text-[1.16rem] lg:leading-[1.42]"
                >
                  {line}
                </p>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <MetaStatCard
              label={content.introCard.stats.format.label}
              value={content.introCard.stats.format.value}
            />
            <MetaStatCard
              label={content.introCard.stats.duration.label}
              value={content.introCard.stats.duration.value}
            />
          </div>

          <InfoPanel
            title={content.introCard.beforeYouStartTitle}
            items={content.introCard.beforeYouStartItems}
          />
        </div>

        <div className="flex items-end justify-between gap-4 pt-1 lg:mt-auto">
          <BackButton
            label={content.backPageLabel}
            fallbackHref={routes.home}
            iconOnly
            className="shrink-0 self-end"
          />
          <PrimaryButton
            href={startHref}
            className="w-full justify-between px-6 py-4 text-base lg:w-[18rem] lg:rounded-[28px] lg:px-7 lg:text-[1.05rem]"
            trailingIcon={<ArrowRightIcon className="h-5 w-5" />}
          >
            {content.introCard.primaryCta}
          </PrimaryButton>
        </div>
      </div>
    </InfoCard>
  );
}
