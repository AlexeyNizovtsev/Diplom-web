import { InfoCard } from "@/components/cards/InfoCard";
import { MethodologyPreviewCard } from "@/components/cards/MethodologyPreviewCard";
import { PageContainer } from "@/components/layout/PageContainer";
import { PrimaryButton } from "@/components/controls/PrimaryButton";
import { SecondaryButton } from "@/components/controls/SecondaryButton";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { UtilityBanner } from "@/components/sections/UtilityBanner";
import { supportedMethodologyOrder } from "@/config/pages/home";
import { SavedResultForm } from "@/features/home/SavedResultForm";
import { buildMethodologyRoute, routes } from "@/lib/routing/routes";
import type { HomeDictionary } from "@/types/common";

interface HomePageViewProps {
  content: HomeDictionary;
}

export function HomePageView({ content }: HomePageViewProps) {
  return (
    <div className="pb-20 pt-12 lg:pb-28 lg:pt-20">
      <PageContainer className="space-y-16 lg:space-y-20">
        <section className="space-y-8 border border-red-500">
          <div className="space-y-10 pb-3 lg:pr-10">
            <SectionHeading
              as="h1"
              eyebrow={content.hero.eyebrow}
              title={content.hero.title}
              description={content.hero.description}
              eyebrowClassName="text-[0.8rem] tracking-[0.22em]"
              titleClassName="max-w-[820px] text-5xl leading-[0.96] tracking-[-0.05em] sm:text-6xl lg:text-[5.15rem] lg:leading-[0.94]"
              descriptionClassName="max-w-[760px] text-xl leading-[1.35] lg:text-[1.75rem] lg:leading-[1.22]"
            />
            <div className="flex flex-wrap gap-4">
              <PrimaryButton className="min-w-[220px]" href={routes.assessment}>
                {content.hero.primaryCta}
              </PrimaryButton>
              <SecondaryButton
                className="min-w-[240px]"
                href={routes.howItWorks}
              >
                {content.hero.secondaryCta}
              </SecondaryButton>
            </div>
          </div>
        </section>

        <section>
          <InfoCard className="rounded-[36px] px-8 py-8 lg:px-10 lg:py-10">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(520px,620px)] lg:items-end">
              <div className="space-y-4">
                <SectionHeading
                  as="h2"
                  title={content.savedResult.title}
                  description={content.savedResult.description}
                  titleClassName="max-w-[14ch] text-[2.85rem] leading-[1.02] tracking-[-0.04em] lg:text-[3.1rem]"
                  descriptionClassName="max-w-[38rem] text-lg leading-8 lg:text-[1.38rem] lg:leading-[1.24]"
                />
                <p className="max-w-[34rem] text-sm leading-6 text-text-secondary">
                  {content.savedResult.helper}
                </p>
              </div>
              <SavedResultForm
                label={content.savedResult.label}
                placeholder={content.savedResult.placeholder}
                action={content.savedResult.action}
              />
            </div>
          </InfoCard>
        </section>

        <section className="space-y-8">
          <SectionHeading
            as="h2"
            title={content.methodologies.title}
            description={content.methodologies.description}
            titleClassName="text-[3rem] leading-[1.02] tracking-[-0.04em]"
            descriptionClassName="max-w-[48rem] text-lg leading-8 lg:text-[1.35rem] lg:leading-[1.24]"
          />
          <div className="grid gap-6 lg:grid-cols-3 lg:gap-7">
            {supportedMethodologyOrder.map((methodologyId) => {
              const item = content.methodologies.items[methodologyId];

              return (
                <MethodologyPreviewCard
                  key={methodologyId}
                  title={item.title}
                  description={item.description}
                  action={item.action}
                  href={buildMethodologyRoute(methodologyId)}
                />
              );
            })}
          </div>
        </section>

        <UtilityBanner
          title={content.banner.title}
          description={content.banner.description}
          className="rounded-[34px] px-8 py-8 lg:px-10 lg:py-8"
          titleClassName="max-w-[58rem] text-[2.15rem] leading-[1.08] tracking-[-0.03em]"
          descriptionClassName="max-w-[52rem] text-base leading-7"
        />
      </PageContainer>
    </div>
  );
}
