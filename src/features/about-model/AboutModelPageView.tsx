import { DimensionCard } from "@/components/cards/DimensionCard";
import { InfoCard } from "@/components/cards/InfoCard";
import { PrimaryButton } from "@/components/controls/PrimaryButton";
import { SecondaryButton } from "@/components/controls/SecondaryButton";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { UtilityBanner } from "@/components/sections/UtilityBanner";
import { aboutModelDimensionOrder } from "@/config/pages/aboutModel";
import { routes } from "@/lib/routing/routes";
import type { AboutModelDictionary } from "@/types/common";

interface AboutModelPageViewProps {
  content: AboutModelDictionary;
}

export function AboutModelPageView({ content }: AboutModelPageViewProps) {
  return (
    <PageContainer className="space-y-14 py-12 lg:space-y-16 lg:py-16">
      <section>
        <SectionHeading as="h1" title={content.pageIntro.title} description={content.pageIntro.description} />
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_320px]">
        <InfoCard className="bg-card-secondary">
          <div className="space-y-6">
            <SectionHeading
              as="h2"
              title={content.overview.title}
              description={content.overview.description}
              titleClassName="text-3xl lg:text-[2.35rem]"
              descriptionClassName="max-w-3xl text-base lg:text-lg"
            />
            <ul className="grid gap-3 lg:grid-cols-3">
              {content.overview.items.map((item) => (
                <li key={item} className="rounded-[24px] border border-border bg-card px-4 py-4 text-sm leading-6 text-text-secondary">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </InfoCard>

        <InfoCard className="h-full">
          <div className="space-y-4">
            <p className="text-sm leading-7 text-text-secondary">{content.dimensions.scaleNote}</p>
          </div>
        </InfoCard>
      </section>

      <section className="space-y-6">
        <SectionHeading as="h2" title={content.dimensions.title} description={content.dimensions.description} />
        <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
          {aboutModelDimensionOrder.map((dimensionId) => {
            const item = content.dimensions.items[dimensionId];

            return (
              <DimensionCard
                key={dimensionId}
                label={item.label}
                title={item.title}
                description={item.description}
              />
            );
          })}
        </div>
      </section>

      <UtilityBanner
        title={content.rankedOutput.title}
        description={content.rankedOutput.description}
        items={content.rankedOutput.items}
      />

      <section className="space-y-6">
        <SectionHeading as="h2" title={content.explainability.title} description={content.explainability.description} />
        <div className="grid gap-4 lg:grid-cols-2">
          {Object.values(content.explainability.themes).map((theme) => (
            <InfoCard key={theme.title} className="h-full">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold tracking-tight text-text-primary">{theme.title}</h3>
                  <p className="text-sm leading-6 text-text-secondary">{theme.description}</p>
                </div>
                <ul className="space-y-3">
                  {theme.items.map((item) => (
                    <li key={item} className="rounded-[22px] border border-border bg-page px-4 py-4 text-sm leading-6 text-text-secondary">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </InfoCard>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeading as="h2" title={content.limitations.title} description={content.limitations.description} />
        <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {content.limitations.items.map((item) => (
            <InfoCard key={item} className="h-full">
              <p className="text-sm leading-6 text-text-secondary">{item}</p>
            </InfoCard>
          ))}
        </div>
      </section>

      <section>
        <InfoCard className="bg-card-secondary">
          <div className="space-y-6">
            <SectionHeading
              as="h2"
              title={content.closing.title}
              description={content.closing.description}
              titleClassName="text-3xl lg:text-[2.25rem]"
              descriptionClassName="max-w-3xl text-base lg:text-lg"
            />
            <div className="flex flex-wrap gap-3">
              <PrimaryButton href={routes.assessment}>{content.closing.actions.assessment}</PrimaryButton>
              <SecondaryButton href={routes.howItWorks}>{content.closing.actions.howItWorks}</SecondaryButton>
              <SecondaryButton href={routes.methodologies}>{content.closing.actions.methodologies}</SecondaryButton>
            </div>
          </div>
        </InfoCard>
      </section>
    </PageContainer>
  );
}
