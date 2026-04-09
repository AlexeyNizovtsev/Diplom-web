import { MethodologyCalloutCard } from "@/components/methodology/MethodologyCalloutCard";
import { WorkflowStepCard } from "@/components/diagrams/WorkflowStepCard";
import { formatMethodologyText } from "@/lib/methodology/formatMethodologyText";
import type { MethodologyFirstSteps } from "@/types/methodology";

interface FirstStepsSequenceProps {
  eyebrow: string;
  title: string;
  intro?: string;
  content: MethodologyFirstSteps;
  stepLabelPrefix: string;
}

export function FirstStepsSequence({
  eyebrow,
  title,
  intro,
  content,
  stepLabelPrefix
}: FirstStepsSequenceProps) {
  return (
    <div className="rounded-[2rem] border border-[#dccdbe] bg-card-secondary px-6 py-6 shadow-none lg:px-8 lg:py-7">
      <div className="space-y-7">
        <div className="space-y-3">
          <p className="text-xs font-bold uppercase tracking-[0.26em] text-accent">{eyebrow}</p>
          <div className="space-y-3">
            <h3 className="max-w-4xl text-3xl font-bold tracking-tight text-text-primary lg:text-[2.15rem]">
              {formatMethodologyText(content.title ?? title)}
            </h3>
            {intro ? (
              <p className="max-w-4xl text-base leading-7 text-text-secondary lg:text-[1.05rem]">
                {formatMethodologyText(intro)}
              </p>
            ) : null}
          </div>
        </div>

        {content.mode === "sequence" ? (
          <div className="grid gap-4 xl:grid-cols-2">
            {content.steps.map((step, index) => (
              <WorkflowStepCard
                key={step.id}
                index={index + 1}
                title={step.title}
                meta={step.description ?? ""}
                stepLabelPrefix={stepLabelPrefix}
                className="relative min-h-[14.5rem] rounded-[1.9rem] border-[#dccdbe] px-6 pt-5 pb-4 shadow-none"
                contentClassName="mt-3 space-y-2"
                titleClassName="min-h-[4rem] text-[1.62rem] leading-8"
                metaClassName="text-[0.97rem] leading-7"
              />
            ))}
          </div>
        ) : (
          <div className="grid gap-4">
            {content.steps.map((step, index) => (
              <WorkflowStepCard
                key={step.id}
                index={index + 1}
                title={step.title}
                meta={step.description ?? ""}
                stepLabelPrefix={stepLabelPrefix}
                className="rounded-[1.9rem] border-[#dccdbe] px-6 pt-5 pb-4 shadow-none"
                contentClassName="mt-3 space-y-2"
                titleClassName="min-h-[4rem] text-[1.56rem] leading-8"
                metaClassName="text-[0.97rem] leading-7"
              />
            ))}
          </div>
        )}

        {content.callout ? <MethodologyCalloutCard callout={content.callout} /> : null}
      </div>
    </div>
  );
}
