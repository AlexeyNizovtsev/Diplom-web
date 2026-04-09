import { AutosaveNote } from "@/components/assessment/AutosaveNote";
import { PrimaryButton } from "@/components/controls/PrimaryButton";
import { SecondaryButton } from "@/components/controls/SecondaryButton";

interface AssessmentNavProps {
  backLabel: string;
  nextLabel: string;
  autosaveLabel: string;
  validationMessage: string;
  isNextDisabled: boolean;
  onBack: () => void;
  onNext: () => void;
}

export function AssessmentNav({
  backLabel,
  nextLabel,
  autosaveLabel,
  validationMessage,
  isNextDisabled,
  onBack,
  onNext
}: AssessmentNavProps) {
  return (
    <div className="space-y-4 border-t border-[#ead8c9] pt-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <SecondaryButton type="button" onClick={onBack} className="min-w-[11rem] justify-center">
          {backLabel}
        </SecondaryButton>
        <div className="order-last lg:order-none">
          <AutosaveNote label={autosaveLabel} />
        </div>
        <PrimaryButton
          type="button"
          onClick={onNext}
          disabled={isNextDisabled}
          className="min-w-[13rem] justify-center"
        >
          {nextLabel}
        </PrimaryButton>
      </div>
      {isNextDisabled ? (
        <p className="text-sm leading-6 text-[#8b6a46] lg:text-[0.98rem]">{validationMessage}</p>
      ) : null}
    </div>
  );
}
