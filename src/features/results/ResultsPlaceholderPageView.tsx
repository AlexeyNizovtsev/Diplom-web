import { HomeBackground } from "@/components/backgrounds/HomeBackground";
import { InfoCard } from "@/components/cards/InfoCard";
import { PrimaryButton } from "@/components/controls/PrimaryButton";
import { SecondaryButton } from "@/components/controls/SecondaryButton";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { glassFieldSurfaceClasses } from "@/components/surfaces/glassSurface";
import { routes } from "@/lib/routing/routes";
import { cn } from "@/lib/utils";
import type { PlaceholderPageContent } from "@/types/common";

interface ResultsPlaceholderPageViewProps {
  content: PlaceholderPageContent;
  primaryActionLabel: string;
  returnHomeLabel: string;
  metadataLabel?: string;
  metadataValue?: string;
}

export function ResultsPlaceholderPageView({
  content,
  primaryActionLabel,
  returnHomeLabel,
  metadataLabel,
  metadataValue,
}: ResultsPlaceholderPageViewProps) {
  return (
    <div className="relative overflow-hidden pb-10 pt-12 lg:pb-20 lg:pt-16">
      <HomeBackground />

      <PageContainer className="relative z-10 py-0">
        <section className="space-y-10 lg:space-y-12">
          <SectionHeading
            as="h1"
            title={content.title}
            description={content.description}
            titleClassName="lg:text-[4.25rem]"
            descriptionClassName="max-w-4xl text-lg leading-8 lg:text-[1.6rem]"
          />

          <InfoCard className="max-w-4xl">
            <div className="space-y-6 lg:space-y-7">
              <p className="max-w-3xl text-base leading-8 text-text-secondary lg:text-[1.05rem]">
                {content.helper}
              </p>

              {metadataLabel && metadataValue ? (
                <div
                  className={cn(
                    "rounded-[1.6rem] px-5 py-5 lg:px-6",
                    glassFieldSurfaceClasses,
                    "border-border/16 bg-card/82",
                  )}
                >
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-accent">
                    {metadataLabel}
                  </p>
                  <p className="mt-3 text-lg font-bold tracking-[-0.02em] text-text-primary">
                    {metadataValue}
                  </p>
                </div>
              ) : null}

              <div className="flex flex-wrap gap-3">
                <PrimaryButton href={routes.assessment}>
                  {primaryActionLabel}
                </PrimaryButton>
                <SecondaryButton href={routes.home}>
                  {returnHomeLabel}
                </SecondaryButton>
              </div>
            </div>
          </InfoCard>
        </section>
      </PageContainer>
    </div>
  );
}
