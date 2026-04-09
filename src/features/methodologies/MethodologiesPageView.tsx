import { HomeBackground } from "@/components/backgrounds/HomeBackground";
import { InfoCard } from "@/components/cards/InfoCard";
import { PageContainer } from "@/components/layout/PageContainer";
import { CoreElementsTabs } from "@/components/methodology/CoreElementsTabs";
import { ApplicabilityLists } from "@/components/methodology/ApplicabilityLists";
import { FirstStepsSequence } from "@/components/methodology/FirstStepsSequence";
import { MethodologyOverviewCard } from "@/components/methodology/MethodologyOverviewCard";
import { MethodologyListSection } from "@/components/methodology/MethodologyListSection";
import { MethodologyTabs } from "@/components/navigation/MethodologyTabs";
import { SidebarNav } from "@/components/navigation/SidebarNav";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { supportedMethodologyOrder, methodologySectionOrder } from "@/config/methodologies";
import { formatMethodologyText } from "@/lib/methodology/formatMethodologyText";
import type { MethodologiesDictionary } from "@/types/common";
import type { MethodologyContentMap, MethodologyId } from "@/types/methodology";

interface MethodologiesPageViewProps {
  labels: MethodologiesDictionary;
  methodologies: MethodologyContentMap;
  selectedMethodologyId: MethodologyId;
}

export function MethodologiesPageView({
  labels,
  methodologies,
  selectedMethodologyId
}: MethodologiesPageViewProps) {
  const methodology = methodologies[selectedMethodologyId];
  const sidebarItems = methodologySectionOrder.map((sectionId) => ({
    id: sectionId,
    label: labels.sections[sectionId]
  }));

  return (
    <div className="relative pb-10 pt-12 lg:pb-20 lg:pt-16">
      <HomeBackground />
      <PageContainer className="relative z-10 py-0">
        <section className="space-y-10 lg:space-y-12">
          <SectionHeading
            as="h1"
            title={labels.pageIntro.title}
            description={labels.pageIntro.description}
            titleClassName="lg:text-[4.25rem]"
            descriptionClassName="max-w-4xl text-lg leading-8 lg:text-[1.6rem]"
          />

          <div className="lg:sticky lg:top-[var(--methodologies-sticky-top)] lg:z-10">
            <MethodologyTabs
              items={methodologies}
              order={supportedMethodologyOrder}
              selectedId={selectedMethodologyId}
              ariaLabel={labels.tabsLabel}
              className="mx-1"
            />
          </div>

          <div className="grid gap-0 lg:grid-cols-[0_minmax(0,1fr)]">
            <aside className="hidden lg:block lg:w-0 lg:self-start">
              <div
                className="lg:fixed lg:top-1/2 lg:z-[5] lg:w-[11rem] lg:-translate-y-1/2 xl:w-[11.5rem]"
                style={{ left: "max(1.25rem, calc(50vw - 680px - 12rem))" }}
              >
                <SidebarNav items={sidebarItems} ariaLabel={labels.sidebarLabel} />
              </div>
            </aside>

            <div className="min-w-0 space-y-6">
            <section id="overview" className="scroll-mt-[var(--methodology-scroll-offset)]">
              <MethodologyOverviewCard
                eyebrow={labels.sections.overview}
                title={methodology.title}
                typeLabel={methodology.typeLabel}
                overview={methodology.overview}
                quickFit={methodology.quickFit}
              />
            </section>

            <section id="coreElements" className="scroll-mt-[var(--methodology-scroll-offset)]">
              <InfoCard className="rounded-[2rem] border-[#e4ddd5] bg-card px-6 py-6 shadow-none backdrop-blur-0 lg:px-8 lg:py-7">
                <div className="space-y-6">
                  <div className="space-y-3">
                    <p className="text-xs font-bold uppercase tracking-[0.26em] text-accent">
                      {labels.sections.coreElements}
                    </p>
                    {methodology.coreElements.title &&
                    methodology.coreElements.title !== labels.sections.coreElements ? (
                      <h3 className="text-3xl font-bold tracking-tight text-text-primary lg:text-[2.1rem]">
                        {formatMethodologyText(methodology.coreElements.title)}
                      </h3>
                    ) : null}
                    {methodology.coreElements.intro ? (
                      <p className="max-w-5xl text-base leading-7 text-text-secondary lg:text-[1.05rem]">
                        {formatMethodologyText(methodology.coreElements.intro)}
                      </p>
                    ) : null}
                  </div>
                  <CoreElementsTabs groups={methodology.coreElements.groups} ariaLabel={labels.coreElementsLabel} />
                </div>
              </InfoCard>
            </section>

            <section id="firstSteps" className="scroll-mt-[var(--methodology-scroll-offset)]">
              <FirstStepsSequence
                eyebrow={labels.sections.firstSteps}
                title={labels.sections.firstSteps}
                intro={methodology.firstSteps.intro}
                content={methodology.firstSteps}
                stepLabelPrefix={labels.firstStepLabelPrefix}
              />
            </section>

            <section id="teamNeeds" className="scroll-mt-[var(--methodology-scroll-offset)]">
              <MethodologyListSection
                eyebrow={labels.sections.teamNeeds}
                title={labels.sections.teamNeeds}
                content={methodology.teamNeeds}
                tone="warm"
              />
            </section>

            <section id="commonMistakes" className="scroll-mt-[var(--methodology-scroll-offset)]">
              <MethodologyListSection
                eyebrow={labels.sections.commonMistakes}
                title={labels.sections.commonMistakes}
                content={methodology.commonMistakes}
              />
            </section>

            <section id="applicability" className="scroll-mt-[var(--methodology-scroll-offset)]">
              <ApplicabilityLists
                eyebrow={labels.sections.applicability}
                title={methodology.applicability.title ?? labels.sections.applicability}
                content={methodology.applicability}
                goodFitLabel={labels.applicabilityLabels.goodFit}
                weakerFitLabel={labels.applicabilityLabels.weakerFit}
              />
            </section>

            <section id="notCoveredHere" className="scroll-mt-[var(--methodology-scroll-offset)]">
              <MethodologyListSection
                eyebrow={labels.sections.notCoveredHere}
                title={labels.sections.notCoveredHere}
                content={methodology.notCoveredHere}
              />
            </section>

            <section id="studyNext" className="scroll-mt-[var(--methodology-scroll-offset)]">
              <MethodologyListSection
                eyebrow={labels.sections.studyNext}
                title={labels.sections.studyNext}
                content={methodology.studyNext}
                tone="warm"
                numbered
              />
            </section>
            </div>
          </div>
        </section>
      </PageContainer>
    </div>
  );
}
