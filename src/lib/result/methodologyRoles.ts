import type { MethodologyId } from "@/types/methodology";
import type { MethodologyRole } from "@/types/result";

export const methodologyRoles: Record<MethodologyId, MethodologyRole> = {
  gost34: "governance",
  waterfall: "sequential_delivery",
  spiral: "risk_driven",
  rup: "architecture_control",
  scrum: "adaptive_iterations",
  kanban: "flow_control",
};

export function getMethodologyRole(
  methodologyId: MethodologyId,
): MethodologyRole {
  return methodologyRoles[methodologyId];
}
