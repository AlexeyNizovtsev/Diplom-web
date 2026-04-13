import { SecondaryButton } from "@/components/controls/SecondaryButton";
import { glassFieldSurfaceClasses } from "@/components/surfaces/glassSurface";
import type { AssessmentReviewBlockItem } from "@/features/assessment/assessmentReview";
import { cn } from "@/lib/utils";

interface AssessmentAnswersSummaryProps {
  blocks: AssessmentReviewBlockItem[];
  answerLabel: string;
  editLabel?: string;
  density?: "default" | "compact";
}

export function AssessmentAnswersSummary({
  blocks,
  answerLabel,
  editLabel,
  density = "default",
}: AssessmentAnswersSummaryProps) {
  const isCompact = density === "compact";

  return (
    <div className={cn("grid gap-4", !isCompact && "lg:grid-cols-2")}>
      {blocks.map((block) => (
        <section
          key={block.id}
          className={cn(
            "rounded-[32px] border-[#e7d1bf]/70 bg-[#fbf8f5]/76",
            glassFieldSurfaceClasses,
            isCompact ? "px-4 py-4 lg:px-5" : "px-5 py-5 lg:px-6",
          )}
        >
          <div
            className={cn(
              "space-y-1 border-b border-[#ead8c9]/80",
              isCompact ? "pb-3" : "pb-4",
            )}
          >
            <h2
              className={cn(
                "font-bold leading-tight text-[#14171c]",
                isCompact
                  ? "text-[1.05rem] lg:text-[1.15rem]"
                  : "text-[1.2rem] lg:text-[1.4rem]",
              )}
            >
              {block.title}
            </h2>
          </div>

          <div className={cn("divide-y divide-[#ead8c9]/70")}>
            {block.questions.map((question) => (
              <div
                key={question.questionId}
                className={cn(
                  "flex gap-3",
                  editLabel
                    ? "flex-col lg:flex-row lg:items-start lg:justify-between"
                    : "flex-col",
                  isCompact ? "py-3" : "py-4",
                )}
              >
                <div className="min-w-0 space-y-1">
                  <p
                    className={cn(
                      "leading-6 text-[#6a6e75]",
                      isCompact ? "text-[0.92rem]" : "text-sm",
                    )}
                  >
                    {question.questionTitle}
                  </p>

                  <p
                    className={cn(
                      "font-semibold leading-6 text-[#8b6a46]",
                      isCompact ? "text-[0.98rem]" : "text-base",
                    )}
                  >
                    {question.answerLabel}
                  </p>
                </div>

                {editLabel ? (
                  <SecondaryButton
                    href={question.editHref}
                    className="min-h-0 rounded-full px-4 py-2 text-sm"
                  >
                    {editLabel}
                  </SecondaryButton>
                ) : null}
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
