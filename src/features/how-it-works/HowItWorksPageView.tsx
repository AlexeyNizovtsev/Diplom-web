import { DimensionCard } from "@/components/cards/DimensionCard";
import { InfoCard } from "@/components/cards/InfoCard";
import { PageContainer } from "@/components/layout/PageContainer";
import { WorkflowStepCard } from "@/components/diagrams/WorkflowStepCard";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { UtilityBanner } from "@/components/sections/UtilityBanner";
import { dimensionOrder, ruleOrder, workflowStepOrder } from "@/config/pages/howItWorks";
import type { HowItWorksDictionary } from "@/types/common";

interface HowItWorksPageViewProps {
  content: HowItWorksDictionary;
}

export function HowItWorksPageView({ content }: HowItWorksPageViewProps) {
  return (
    <PageContainer className="space-y-14 py-12 lg:space-y-16 lg:py-16">
      <section>
        <SectionHeading as="h1" title={content.pageIntro.title} description={content.pageIntro.description} />
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_320px]">
        <InfoCard className="bg-card-secondary">
          <div className="space-y-8">
            <SectionHeading as="h2" title={content.workflow.title} description={content.workflow.description} />
            <div className="grid gap-4 xl:grid-cols-4">
              {workflowStepOrder.map((stepId, index) => {
                const step = content.workflow.steps[stepId];

                return (
                  <WorkflowStepCard
                    key={stepId}
                    index={index + 1}
                    title={step.title}
                    meta={step.meta}
                    stepLabelPrefix={content.workflow.stepLabelPrefix}
                    highlight={stepId === "explain"}
                  />
                );
              })}
            </div>
          </div>
        </InfoCard>

        <InfoCard className="h-full">
          <div className="space-y-5">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-accent">{content.workflow.summaryTitle}</p>
            <ul className="space-y-3">
              {content.workflow.summaryItems.map((item) => (
                <li key={item} className="rounded-[22px] border border-border bg-page px-4 py-4 text-sm text-text-primary">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </InfoCard>
      </section>

      <section className="space-y-6">
        <SectionHeading as="h2" title={content.dimensions.title} description={content.dimensions.description} />
        <div className="grid gap-5 lg:grid-cols-3">
          {dimensionOrder.map((dimensionId) => {
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

      <section className="space-y-6">
        <SectionHeading as="h2" title={content.rules.title} description={content.rules.description} />
        <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {ruleOrder.map((ruleId) => {
            const item = content.rules.items[ruleId];

            return (
              <InfoCard key={ruleId} className="h-full">
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-text-primary">{item.title}</h3>
                  <p className="text-sm leading-6 text-text-secondary">{item.description}</p>
                </div>
              </InfoCard>
            );
          })}
        </div>
      </section>

      <UtilityBanner
        title={content.explainability.title}
        description={content.explainability.description}
        items={content.explainability.items}
      />
    </PageContainer>
  );
}
