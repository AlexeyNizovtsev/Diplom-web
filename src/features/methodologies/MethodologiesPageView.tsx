import { InfoCard } from "@/components/cards/InfoCard";
import { WorkflowStepCard } from "@/components/diagrams/WorkflowStepCard";
import { PageContainer } from "@/components/layout/PageContainer";
import { CoreElementsTabs } from "@/components/methodology/CoreElementsTabs";
import { ApplicabilityLists } from "@/components/methodology/ApplicabilityLists";
import { MethodologyListSection } from "@/components/methodology/MethodologyListSection";
import { MethodologyTabs } from "@/components/navigation/MethodologyTabs";
import { SidebarNav } from "@/components/navigation/SidebarNav";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { supportedMethodologyOrder, methodologySectionOrder } from "@/config/methodologies";
import type { MethodologiesDictionary } from "@/types/common";
import type { MethodologyId } from "@/types/methodology";

interface MethodologiesPageViewProps {
  content: MethodologiesDictionary;
  selectedMethodologyId: MethodologyId;
}

export function MethodologiesPageView({
  content,
  selectedMethodologyId
}: MethodologiesPageViewProps) {
  const methodology = content.content[selectedMethodologyId];
  const sidebarItems = methodologySectionOrder.map((sectionId) => ({
    id: sectionId,
    label: content.sections[sectionId]
  }));

  return (
    <PageContainer className="space-y-8 py-12 lg:space-y-10 lg:py-16">
      <section className="space-y-6">
        <SectionHeading as="h1" title={content.pageIntro.title} description={content.pageIntro.description} />
        <MethodologyTabs
          items={content.content}
          order={supportedMethodologyOrder}
          selectedId={selectedMethodologyId}
          ariaLabel={content.tabsLabel}
        />
      </section>

      <div className="grid gap-8 lg:grid-cols-[250px_minmax(0,1fr)] xl:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
          {methodology.quickFit ? (
            <InfoCard className="bg-dark text-text-on-dark">
              <div className="space-y-3">
                <p className="text-base leading-7 text-[#efe4d8]">{methodology.quickFit.summary}</p>
              </div>
            </InfoCard>
          ) : null}
          <SidebarNav items={sidebarItems} ariaLabel={content.sidebarLabel} />
        </aside>

        <div className="space-y-6">
          <section id="overview" className="scroll-mt-32">
            <div className="grid gap-6 xl:grid-cols-[minmax(0,1.25fr)_300px]">
              <InfoCard className="bg-card-secondary">
                <div className="space-y-5">
                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-accent">
                      {content.sections.overview}
                    </p>
                    <h2 className="text-4xl font-extrabold tracking-tight text-text-primary lg:text-[2.85rem]">
                      {methodology.title}
                    </h2>
                    <p className="max-w-3xl text-base leading-7 text-text-secondary lg:text-lg">
                      {methodology.overview.description}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {methodology.overview.signalTags.map((tag) => (
                      <span
                        key={tag.id}
                        className="rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-text-primary"
                      >
                        {tag.label}
                      </span>
                    ))}
                  </div>
                </div>
              </InfoCard>
            </div>
          </section>

          <section id="firstSteps" className="scroll-mt-32">
            <InfoCard className="bg-card-secondary">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold tracking-tight text-text-primary lg:text-[2rem]">
                    {content.sections.firstSteps}
                  </h3>
                  {methodology.firstSteps.intro ? (
                    <p className="text-sm leading-6 text-text-secondary lg:text-base">{methodology.firstSteps.intro}</p>
                  ) : null}
                </div>

                {methodology.firstSteps.mode === "sequence" ? (
                  <div className="grid gap-4 xl:grid-cols-3">
                    {methodology.firstSteps.steps.map((step, index) => (
                      <WorkflowStepCard
                        key={step.id}
                        index={index + 1}
                        title={step.title}
                        meta={step.description ?? ""}
                        stepLabelPrefix={content.firstStepLabelPrefix}
                        highlight={step.emphasis === "final"}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="grid gap-3">
                    {methodology.firstSteps.steps.map((step, index) => (
                      <div key={step.id} className="rounded-[24px] border border-border bg-card px-5 py-4">
                        <p className="text-xs font-bold uppercase tracking-[0.24em] text-accent">
                          {content.firstStepLabelPrefix} {index + 1}
                        </p>
                        <h4 className="mt-3 text-lg font-bold text-text-primary">{step.title}</h4>
                        {step.description ? (
                          <p className="mt-2 text-sm leading-6 text-text-secondary">{step.description}</p>
                        ) : null}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </InfoCard>
          </section>

          <section id="coreElements" className="scroll-mt-32">
            <InfoCard>
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold tracking-tight text-text-primary lg:text-[2rem]">
                    {content.sections.coreElements}
                  </h3>
                  {methodology.coreElements.intro ? (
                    <p className="text-sm leading-6 text-text-secondary lg:text-base">{methodology.coreElements.intro}</p>
                  ) : null}
                </div>
                <CoreElementsTabs groups={methodology.coreElements.groups} ariaLabel={content.coreElementsLabel} />
              </div>
            </InfoCard>
          </section>

          <section id="teamNeeds" className="scroll-mt-32">
            <MethodologyListSection title={content.sections.teamNeeds} content={methodology.teamNeeds} />
          </section>

          <section id="commonMistakes" className="scroll-mt-32">
            <MethodologyListSection title={content.sections.commonMistakes} content={methodology.commonMistakes} />
          </section>

          <section id="applicability" className="scroll-mt-32 space-y-4">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold tracking-tight text-text-primary lg:text-[2rem]">
                {content.sections.applicability}
              </h3>
            </div>
            <ApplicabilityLists content={methodology.applicability} />
          </section>

          <section id="notCoveredHere" className="scroll-mt-32">
            <MethodologyListSection title={content.sections.notCoveredHere} content={methodology.notCoveredHere} />
          </section>

          <section id="studyNext" className="scroll-mt-32">
            <MethodologyListSection title={content.sections.studyNext} content={methodology.studyNext} />
          </section>
        </div>
      </div>
    </PageContainer>
  );
}
