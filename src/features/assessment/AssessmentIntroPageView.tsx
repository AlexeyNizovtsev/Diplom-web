import { HomeBackground } from "@/components/backgrounds/HomeBackground";
import { AssessmentIntroCard } from "@/components/assessment/AssessmentIntroCard";
import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeading } from "@/components/sections/SectionHeading";
import type { AssessmentDictionary } from "@/types/common";

interface AssessmentIntroPageViewProps {
  content: AssessmentDictionary;
  startHref: string;
}

export function AssessmentIntroPageView({
  content,
  startHref
}: AssessmentIntroPageViewProps) {
  return (
    <div className="relative overflow-hidden pb-10 pt-8 lg:pb-20 lg:pt-10">
      <HomeBackground />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-9rem] top-[-10rem] z-[1] h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,_rgba(243,227,209,0.62)_0%,_rgba(243,227,209,0)_68%)]"
      />

      <PageContainer className="relative z-10">
        <div className="space-y-6 lg:space-y-8">
          <SectionHeading
            as="h1"
            title={content.pageTitle}
            titleClassName="text-[2rem] leading-[1] tracking-[-0.05em] lg:text-[2.55rem]"
          />
          <AssessmentIntroCard
            content={content}
            startHref={startHref}
          />
        </div>
      </PageContainer>
    </div>
  );
}
