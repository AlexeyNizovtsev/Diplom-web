"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { PrimaryButton } from "@/components/controls/PrimaryButton";
import { ResultCodeInput } from "@/components/controls/ResultCodeInput";
import { buildResultsRoute } from "@/lib/routing/routes";

interface SavedResultFormProps {
  label: string;
  placeholder: string;
  action: string;
}

export function SavedResultForm({ label, placeholder, action }: SavedResultFormProps) {
  const router = useRouter();
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    router.push(buildResultsRoute(value.trim() || undefined));
  };

  return (
    <div className="space-y-3">
      <label htmlFor="saved-result-code" className="sr-only">
        {label}
      </label>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch">
        <ResultCodeInput
          id="saved-result-code"
          name="saved-result-code"
          placeholder={placeholder}
          className="h-16"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleSubmit();
            }
          }}
        />
        <PrimaryButton className="h-16 lg:min-w-[248px]" onClick={handleSubmit}>
          {action}
        </PrimaryButton>
      </div>
    </div>
  );
}
