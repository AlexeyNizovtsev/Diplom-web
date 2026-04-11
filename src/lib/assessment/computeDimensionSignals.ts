import type { DimensionKey } from "@/types/questionnaire";
import type { DimensionLevel, DimensionSignal } from "@/types/result";

import type { NormalizedAssessmentAnswer } from "@/lib/assessment/normalizeAnswers";

interface AggregatedSignalValue {
  total: number;
  count: number;
}

export interface AggregatedDimensionSignals {
  dimensionKey: DimensionKey;
  averageValue: number;
  level: DimensionLevel;
  contributingSignals: DimensionSignal[];
  signalMap: Record<string, DimensionLevel>;
}

function toDimensionLevel(value: number): DimensionLevel {
  const roundedValue = Math.round(value);

  if (roundedValue <= 0) {
    return 0;
  }

  if (roundedValue >= 3) {
    return 3;
  }

  return roundedValue as DimensionLevel;
}

export function computeDimensionSignals(
  dimensionOrder: DimensionKey[],
  answers: NormalizedAssessmentAnswer[]
): AggregatedDimensionSignals[] {
  const byDimension = new Map<DimensionKey, Map<string, AggregatedSignalValue>>();

  for (const answer of answers) {
    for (const mapping of answer.signalMappings) {
      const dimensionSignals =
        byDimension.get(mapping.target) ?? new Map<string, AggregatedSignalValue>();
      const currentValue = dimensionSignals.get(mapping.signalKey) ?? { total: 0, count: 0 };

      currentValue.total += mapping.value;
      currentValue.count += 1;

      dimensionSignals.set(mapping.signalKey, currentValue);
      byDimension.set(mapping.target, dimensionSignals);
    }
  }

  return dimensionOrder.map((dimensionKey) => {
    const dimensionSignals =
      byDimension.get(dimensionKey) ?? new Map<string, AggregatedSignalValue>();
    const contributingSignals = Array.from(dimensionSignals.entries()).map(([signalKey, value]) => {
      const normalizedValue = toDimensionLevel(value.total / value.count);

      return {
        signalKey,
        value: normalizedValue
      };
    });
    const totalValue = contributingSignals.reduce((sum, signal) => sum + signal.value, 0);
    const averageValue =
      contributingSignals.length > 0
        ? Number((totalValue / contributingSignals.length).toFixed(2))
        : 0;

    return {
      dimensionKey,
      averageValue,
      level: toDimensionLevel(averageValue),
      contributingSignals,
      signalMap: Object.fromEntries(
        contributingSignals.map((signal) => [signal.signalKey, signal.value])
      )
    };
  });
}
