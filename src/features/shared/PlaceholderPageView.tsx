import { PageContainer } from "@/components/layout/PageContainer";
import { PrimaryButton } from "@/components/controls/PrimaryButton";
import { SecondaryButton } from "@/components/controls/SecondaryButton";
import { InfoCard } from "@/components/cards/InfoCard";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { routes } from "@/lib/routing/routes";
import type { PlaceholderPageContent } from "@/types/common";

interface PlaceholderPageViewProps {
  content: PlaceholderPageContent;
  primaryActionLabel: string;
  returnHomeLabel: string;
  metadataLabel?: string;
  metadataValue?: string;
}

export function PlaceholderPageView({
  content,
  primaryActionLabel,
  returnHomeLabel,
  metadataLabel,
  metadataValue
}: PlaceholderPageViewProps) {
  return (
    <PageContainer className="py-12 lg:py-16">
      <div className="space-y-10">
        <SectionHeading as="h1" title={content.title} description={content.description} />

        <InfoCard className="max-w-3xl bg-card-secondary">
          <div className="space-y-5">
            <p className="text-base leading-7 text-text-secondary">{content.helper}</p>
            {metadataLabel && metadataValue ? (
              <div className="rounded-3xl border border-border/80 bg-card px-4 py-4">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-accent">{metadataLabel}</p>
                <p className="mt-2 text-base font-semibold text-text-primary">{metadataValue}</p>
              </div>
            ) : null}
            <div className="flex flex-wrap gap-3">
              <PrimaryButton href={routes.assessment}>{primaryActionLabel}</PrimaryButton>
              <SecondaryButton href={routes.home}>{returnHomeLabel}</SecondaryButton>
            </div>
          </div>
        </InfoCard>
      </div>
    </PageContainer>
  );
}
