import { HomeBackground } from "@/components/backgrounds/HomeBackground";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { AssessmentIntroEntryPoint } from "@/features/assessment/AssessmentIntroEntryPoint";
import type { AssessmentDictionary } from "@/types/common";

interface AssessmentIntroPageViewProps {
  content: AssessmentDictionary;
  startHref: string;
}

export function AssessmentIntroPageView({
  content,
  startHref,
}: AssessmentIntroPageViewProps) {
  return (
    <div className="relative overflow-hidden pb-10 pt-8 lg:pb-20 lg:pt-10">
      <HomeBackground />

      <PageContainer className="relative z-10">
        <div className="space-y-6 lg:space-y-8">
          <SectionHeading
            as="h1"
            title={content.pageTitle}
            titleClassName="text-[2rem] leading-[1] tracking-[-0.05em] lg:text-[2.55rem]"
          />
          <AssessmentIntroEntryPoint
            content={content}
            defaultStartHref={startHref}
          />
        </div>
      </PageContainer>
    </div>
  );
}
