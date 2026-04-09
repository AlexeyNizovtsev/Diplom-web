import type { MethodologiesDictionary } from "@/types/common";

export const methodologies: MethodologiesDictionary = {
  pageIntro: {
    title: "Methodology reference",
    description:
      "Use this page as a practical reference after the recommendation: what the method is, how to begin, what it requires, and where it fits."
  },
  tabsLabel: "Methodology tabs",
  sidebarLabel: "Methodology sections",
  coreElementsLabel: "Core element groups",
  firstStepLabelPrefix: "Step",
  applicabilityLabels: {
    goodFit: "Good fit when",
    weakerFit: "Weaker fit when"
  },
  sections: {
    overview: "Overview",
    firstSteps: "First steps",
    coreElements: "Core elements",
    teamNeeds: "Team needs",
    commonMistakes: "Common mistakes",
    applicability: "Applicability",
    notCoveredHere: "Not covered here",
    studyNext: "Study next"
  }
};
