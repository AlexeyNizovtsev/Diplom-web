import type {
  ActiveRole,
  DimensionResult,
  MethodologyRole,
  RankedMethodologyResult,
  RecommendationInterpretation,
  RecommendationSupportFlag,
} from "@/types/result";

import { detectActiveRoles } from "@/lib/result/detectActiveRoles";
import { getMethodologyRole } from "@/lib/result/methodologyRoles";
import {
  areRolesInSameOperationalFamily,
  areRolesOperationalNeighbors,
} from "@/lib/result/roleFamilies";

const CLOSE_FIT_SCORE_GAP_THRESHOLD = 1;

function isRoleActive(activeRoles: ActiveRole[], role: ActiveRole | undefined) {
  return role ? activeRoles.includes(role) : false;
}

function getTopRoles(ranking: RankedMethodologyResult[]) {
  return {
    topMethodologyRole: ranking[0]
      ? getMethodologyRole(ranking[0].methodologyId)
      : undefined,
    secondMethodologyRole: ranking[1]
      ? getMethodologyRole(ranking[1].methodologyId)
      : undefined,
  };
}

function hasDistinctNecessaryProcessRole(
  topMethodologyRole: MethodologyRole | undefined,
  secondMethodologyRole: MethodologyRole | undefined,
  activeRoles: ActiveRole[],
) {
  if (!topMethodologyRole || !secondMethodologyRole) {
    return false;
  }

  return (
    topMethodologyRole !== secondMethodologyRole &&
    isRoleActive(activeRoles, topMethodologyRole) &&
    isRoleActive(activeRoles, secondMethodologyRole) &&
    !areRolesOperationalNeighbors(topMethodologyRole, secondMethodologyRole) &&
    !areRolesInSameOperationalFamily(topMethodologyRole, secondMethodologyRole)
  );
}

function isRankingGapClose(ranking: RankedMethodologyResult[]) {
  const [topMethodology, secondMethodology] = ranking;

  if (!topMethodology || !secondMethodology) {
    return false;
  }

  return topMethodology.score - secondMethodology.score <= CLOSE_FIT_SCORE_GAP_THRESHOLD;
}

function isCompositeStrategyCase(
  topMethodologyRole: MethodologyRole | undefined,
  secondMethodologyRole: MethodologyRole | undefined,
  activeRoles: ActiveRole[],
) {
  return hasDistinctNecessaryProcessRole(
    topMethodologyRole,
    secondMethodologyRole,
    activeRoles,
  );
}

function isCloseFitCase(
  ranking: RankedMethodologyResult[],
  topMethodologyRole: MethodologyRole | undefined,
  secondMethodologyRole: MethodologyRole | undefined,
  activeRoles: ActiveRole[],
) {
  if (!isRankingGapClose(ranking)) {
    return false;
  }

  if (!topMethodologyRole || !secondMethodologyRole) {
    return false;
  }

  return (
    areRolesOperationalNeighbors(topMethodologyRole, secondMethodologyRole) ||
    !hasDistinctNecessaryProcessRole(
      topMethodologyRole,
      secondMethodologyRole,
      activeRoles,
    )
  );
}

function detectSupportFlags(
  activeRoles: ActiveRole[],
  ranking: RankedMethodologyResult[],
) {
  const supportFlags: RecommendationSupportFlag[] = [];
  const topThreeMethodologyIds = ranking.slice(0, 3).map((item) => item.methodologyId);

  if (
    activeRoles.includes("architecture_control") &&
    topThreeMethodologyIds.includes("rup")
  ) {
    supportFlags.push("architecture_supporting_option");
  }

  if (activeRoles.includes("risk_driven") && topThreeMethodologyIds.includes("spiral")) {
    supportFlags.push("risk_supporting_option");
  }

  return supportFlags;
}

export function detectRecommendationMode(
  dimensions: DimensionResult[],
  ranking: RankedMethodologyResult[],
): Pick<
  RecommendationInterpretation,
  | "activeRoles"
  | "mode"
  | "supportFlags"
  | "topMethodologyRole"
  | "secondMethodologyRole"
> {
  const activeRoles = detectActiveRoles(dimensions);
  const { topMethodologyRole, secondMethodologyRole } = getTopRoles(ranking);
  const mode = isCompositeStrategyCase(
    topMethodologyRole,
    secondMethodologyRole,
    activeRoles,
  )
    ? "composite_strategy"
    : isCloseFitCase(
        ranking,
        topMethodologyRole,
        secondMethodologyRole,
        activeRoles,
      )
      ? "close_fit"
      : "single_fit";

  return {
    activeRoles,
    mode,
    topMethodologyRole,
    secondMethodologyRole,
    supportFlags: detectSupportFlags(activeRoles, ranking),
  };
}

export { CLOSE_FIT_SCORE_GAP_THRESHOLD };
