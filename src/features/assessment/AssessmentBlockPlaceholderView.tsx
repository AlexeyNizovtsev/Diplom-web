import { InfoCard } from "@/components/cards/InfoCard";
import { BackButton } from "@/components/controls/BackButton";
import { PrimaryButton } from "@/components/controls/PrimaryButton";
import { SecondaryButton } from "@/components/controls/SecondaryButton";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { routes } from "@/lib/routing/routes";
import type { AssessmentDictionary } from "@/types/common";

interface AssessmentBlockPlaceholderViewProps {
  content: AssessmentDictionary["blockPlaceholder"];
  blockId: string;
  backPageLabel: string;
  returnHomeLabel: string;
}

export function AssessmentBlockPlaceholderView({
  content,
  blockId,
  backPageLabel,
  returnHomeLabel
}: AssessmentBlockPlaceholderViewProps) {
  return (
    <PageContainer className="py-10 lg:py-14">
      <div className="space-y-8">
        <SectionHeading
          eyebrow={content.eyebrow}
          as="h1"
          title={content.title}
          description={content.description}
          titleClassName="max-w-[42rem] text-[2.55rem] leading-[1] tracking-[-0.05em] lg:text-[3.4rem]"
          descriptionClassName="max-w-[44rem] text-lg leading-8"
        />

        <InfoCard className="max-w-4xl bg-card-secondary">
          <div className="space-y-6">
            <div className="rounded-[28px] border border-border/80 bg-card px-5 py-5">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-accent">
                {content.blockIdLabel}
              </p>
              <p className="mt-3 break-words text-lg font-bold tracking-[-0.02em] text-text-primary lg:text-[1.35rem]">
                {blockId}
              </p>
            </div>

            <section className="space-y-4">
              <h2 className="text-xl font-extrabold tracking-[-0.03em] text-text-primary lg:text-[1.7rem]">
                {content.nextStepTitle}
              </h2>
              <ul className="space-y-3">
                {content.nextStepItems.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-base leading-7 text-text-secondary lg:text-lg">
                    <span
                      aria-hidden="true"
                      className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-accent/85"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <div className="flex items-end justify-between gap-4">
              <BackButton
                label={backPageLabel}
                fallbackHref={routes.assessment}
                iconOnly
                className="shrink-0 self-end"
              />
              <div className="flex flex-wrap justify-end gap-3">
                <PrimaryButton href={routes.assessment}>{content.returnToIntro}</PrimaryButton>
                <SecondaryButton href={routes.home}>{returnHomeLabel}</SecondaryButton>
              </div>
            </div>
          </div>
        </InfoCard>
      </div>
    </PageContainer>
  );
}
