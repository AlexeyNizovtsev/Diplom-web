import { InfoCard } from "@/components/cards/InfoCard";
import { MethodologyPreviewCard } from "@/components/cards/MethodologyPreviewCard";
import { HomeBackground } from "@/components/backgrounds/HomeBackground";
import { PageContainer } from "@/components/layout/PageContainer";
import { PrimaryButton } from "@/components/controls/PrimaryButton";
import { SecondaryButton } from "@/components/controls/SecondaryButton";
import { ArrowRightIcon } from "@/components/icons/ArrowRightIcon";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { supportedMethodologyOrder } from "@/config/pages/home";
import { SavedResultForm } from "@/features/home/SavedResultForm";
import { buildMethodologyRoute, routes } from "@/lib/routing/routes";
import type { HomeDictionary } from "@/types/common";

interface HomePageViewProps {
  content: HomeDictionary;
}

export function HomePageView({ content }: HomePageViewProps) {
  return (
    <div className="relative pb-8 pt-12 lg:pb-28 lg:pt-16">
      <HomeBackground />
      <PageContainer className="relative z-10 space-y-10">
        <section className="space-y-8">
          <div className="space-y-10 pb-3 lg:pr-10">
            <SectionHeading
              as="h1"
              title={content.hero.title}
              description={content.hero.description}
              titleClassName="w-full text-5xl leading-[0.96] tracking-[-0.05em] sm:text-6xl lg:text-[4.4rem] lg:leading-[0.94]"
              descriptionClassName="max-w-[48rem] pt-4 text-xl leading-[1.35] lg:text-[1.75rem] lg:leading-[1.22]"
            />
            <div className="flex max-w-[600px] flex-col gap-4">
              <PrimaryButton
                className="w-full px-7 py-5 text-lg"
                href={routes.assessment}
                trailingIcon={<ArrowRightIcon />}
              >
                {content.hero.primaryCta}
              </PrimaryButton>
              <SecondaryButton
                className="w-full px-7 py-5 text-lg"
                href={routes.howItWorks}
                trailingIcon={<ArrowRightIcon />}
              >
                {content.hero.secondaryCta}
              </SecondaryButton>
            </div>
          </div>
        </section>

        <section>
          <InfoCard className="rounded-[36px] lg:pb-4 lg:pt-8 ">
            <div className="space-y-8">
              <SectionHeading
                as="h2"
                title={content.savedResult.title}
                description={content.savedResult.description}
                titleClassName=" text-[1.8rem] leading-[1.02] tracking-[-0.04em] lg:text-[2rem]"
                descriptionClassName=" text-lg leading-8 lg:text-[1.38rem] lg:leading-[1.24]"
              />
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
                  href={buildMethodologyRoute(methodologyId)}
                />
              );
            })}
          </div>
        </section>
      </PageContainer>
    </div>
  );
}
