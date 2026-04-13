import type { MethodologyRole, RoleFamily } from "@/types/result";

const roleFamilies: Record<MethodologyRole, RoleFamily> = {
  governance: "formal_control",
  sequential_delivery: "formal_control",
  risk_driven: "risk_architecture",
  architecture_control: "risk_architecture",
  adaptive_iterations: "iterative_delivery",
  flow_control: "flow_delivery",
};

function isDeliveryFamily(family: RoleFamily) {
  return family === "iterative_delivery" || family === "flow_delivery";
}

export function getRoleFamily(role: MethodologyRole): RoleFamily {
  return roleFamilies[role];
}

export function areRolesInSameOperationalFamily(
  leftRole: MethodologyRole,
  rightRole: MethodologyRole,
) {
  return getRoleFamily(leftRole) === getRoleFamily(rightRole);
}

export function areRolesOperationalNeighbors(
  leftRole: MethodologyRole,
  rightRole: MethodologyRole,
) {
  const leftFamily = getRoleFamily(leftRole);
  const rightFamily = getRoleFamily(rightRole);

  return leftFamily === rightFamily || (isDeliveryFamily(leftFamily) && isDeliveryFamily(rightFamily));
}
