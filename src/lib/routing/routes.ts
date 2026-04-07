import type { MethodologyId } from "@/types/methodology";

export const routes = {
  home: "/",
  assessment: "/assessment",
  howItWorks: "/how-it-works",
  methodologies: "/methodologies",
  aboutModel: "/about-model",
  results: "/results"
} as const;

export function buildMethodologyRoute(methodologyId: MethodologyId) {
  return `${routes.methodologies}?methodology=${encodeURIComponent(methodologyId)}`;
}

export function buildResultsRoute(code?: string) {
  if (!code) {
    return routes.results;
  }

  return `${routes.results}?code=${encodeURIComponent(code)}`;
}

