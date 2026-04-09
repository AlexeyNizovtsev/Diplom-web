import type {
  MethodologyId,
  MethodologyPreviewContent,
  MethodologySectionId
} from "@/types/methodology";

export type Locale = "en" | "ru";

export interface NavigationDictionary {
  productName: string;
  primaryNavigationLabel: string;
  links: {
    methodologies: string;
    howItWorks: string;
    aboutModel: string;
  };
  languages: Record<Locale, string>;
  languageSwitchLabel: string;
}

export interface HomeDictionary {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
  };
  summaryCard: {
    title: string;
    description: string;
    methodologyCountLabel: string;
    methodologyNames: string[];
    pills: string[];
  };
  savedResult: {
    title: string;
    description: string;
    label: string;
    placeholder: string;
    action: string;
    helper: string;
  };
  methodologies: {
    title: string;
    description: string;
    items: Record<MethodologyId, MethodologyPreviewContent>;
  };
  banner: {
    title: string;
    description: string;
  };
}

export interface WorkflowStepContent {
  title: string;
  meta: string;
}

export interface DimensionContent {
  label: string;
  title: string;
  description: string;
}

export interface RuleContent {
  title: string;
  description: string;
}

export interface HowItWorksDictionary {
  pageIntro: {
    title: string;
    description: string;
  };
  workflow: {
    title: string;
    description: string;
    summaryTitle: string;
    stepLabelPrefix: string;
    summaryItems: string[];
    steps: Record<string, WorkflowStepContent>;
  };
  dimensions: {
    title: string;
    description: string;
    items: Record<string, DimensionContent>;
  };
  rules: {
    title: string;
    description: string;
    items: Record<string, RuleContent>;
  };
  explainability: {
    title: string;
    description: string;
    items: string[];
  };
}

export interface PlaceholderPageContent {
  title: string;
  description: string;
  helper: string;
}

export interface AboutModelDimensionContent {
  label: string;
  title: string;
  description: string;
}

export interface AboutModelDictionary {
  pageIntro: {
    title: string;
    description: string;
  };
  overview: {
    title: string;
    description: string;
    items: string[];
  };
  dimensions: {
    title: string;
    description: string;
    scaleNote: string;
    items: Record<string, AboutModelDimensionContent>;
  };
  rankedOutput: {
    title: string;
    description: string;
    items: string[];
  };
  explainability: {
    title: string;
    description: string;
    themes: {
      explainability: {
        title: string;
        description: string;
        items: string[];
      };
      sensitivity: {
        title: string;
        description: string;
        items: string[];
      };
    };
  };
  limitations: {
    title: string;
    description: string;
    items: string[];
  };
  closing: {
    title: string;
    description: string;
    actions: {
      assessment: string;
      howItWorks: string;
      methodologies: string;
    };
  };
}

export interface MethodologiesDictionary {
  pageIntro: {
    title: string;
    description: string;
  };
  tabsLabel: string;
  sidebarLabel: string;
  coreElementsLabel: string;
  firstStepLabelPrefix: string;
  applicabilityLabels: {
    goodFit: string;
    weakerFit: string;
  };
  sections: Record<MethodologySectionId, string>;
}

export interface PlaceholdersDictionary {
  assessment: PlaceholderPageContent;
  methodologies: PlaceholderPageContent;
  aboutModel: PlaceholderPageContent;
  results: PlaceholderPageContent;
  selectedMethodologyLabel: string;
  resultCodeLabel: string;
  returnHome: string;
  primaryAction: string;
}

export interface AppDictionary {
  nav: NavigationDictionary;
  home: HomeDictionary;
  howItWorks: HowItWorksDictionary;
  aboutModel: AboutModelDictionary;
  methodologies: MethodologiesDictionary;
  placeholders: PlaceholdersDictionary;
}
