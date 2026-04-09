import { supportedMethodologyOrder } from "@/config/methodologies";
import { methodologyIds, type MethodologyId } from "@/types/methodology";

export function isMethodologyId(value: string | undefined): value is MethodologyId {
  return Boolean(value && methodologyIds.includes(value as MethodologyId));
}

export function resolveMethodologyId(value: string | undefined): MethodologyId {
  return isMethodologyId(value) ? value : supportedMethodologyOrder[0];
}
