import type {
  MethodologyId,
  MethodologyPreviewContent,
  MethodologySectionId
} from "@/types/methodology";
import type {
  FitTier,
  RecommendationInterpretationLabel,
  RecommendationMode,
  ResultReasonId,
  SensitivityStrength
} from "@/types/result";
import type { AssessmentBlockId } from "@/types/questionnaire";

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

export interface AssessmentMetaStatContent {
  label: string;
  value: string;
}

export interface AssessmentDictionary {
  pageTitle: string;
  backPageLabel: string;
  introCard: {
    title: string;
    description: string[];
    stats: {
      format: AssessmentMetaStatContent;
      duration: AssessmentMetaStatContent;
    };
    beforeYouStartTitle: string;
    beforeYouStartItems: string[];
    primaryCta: string;
    resumeCta: string;
    resumeHint: string;
    restartModal: {
      title: string;
      description: string;
      dismissCta: string;
    };
  };
  blockPlaceholder: {
    eyebrow: string;
    title: string;
    description: string;
    blockIdLabel: string;
    nextStepTitle: string;
    nextStepItems: string[];
    returnToIntro: string;
  };
  questionnaire: {
    eyebrow: string;
    title: string;
    description: string;
    progressLabel: string;
    questionLabel: string;
    selectionLabel: string;
    autosaveNote: string;
    validationMessage: string;
    actions: {
      back: string;
      nextBlock: string;
      reviewAnswers: string;
      returnToIntro: string;
      backToReview: string;
      saveAndReturn: string;
      confirmAnswers: string;
    };
    review: {
      eyebrow: string;
      title: string;
      description: string;
      helper: string;
      answerLabel: string;
      editAction: string;
      loadingLabel: string;
      emptyTitle: string;
      emptyDescription: string;
    };
    blockOrderLabels: Record<AssessmentBlockId, string>;
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

export interface ResultsDictionary {
  pageIntro: {
    title: string;
    description: string;
  };
  rankedList: {
    title: string;
    description: string;
    jumpLabel: string;
  };
  fitLabels: Record<FitTier, string>;
  fitStrengthLabels: Record<SensitivityStrength, string>;
  bestFit: {
    sectionTitle: string;
    sectionDescription: string;
    badge: string;
    keySignalsLabel: string;
    dimensionsLabel: string;
    outcomeLabel: string;
    fitStrengthLabel: string;
    closestAlternativeLabel: string;
    mostSensitiveDimensionLabel: string;
    pointsLabel: string;
    actionLabel: string;
  };
  alternatives: {
    title: string;
    description: string;
    topDimensionsLabel: string;
    expandActionLabel: string;
    collapseActionLabel: string;
  };
  topActions: {
    download: string;
    viewAnswers: string;
    copyLink: string;
    copiedLink: string;
    retakeAssessment: string;
    pdfAction: string;
    jsonAction: string;
    placeholderNote: string;
    copySuccessMessage: string;
    resetConfirmation: string;
  };
  emptyState: {
    title: string;
    description: string;
    requestedCodeLabel: string;
    openAssessment: string;
    returnHome: string;
  };
  saveSection: {
    title: string;
    description: string;
    resultCodeLabel: string;
    exportLabel: string;
  };
  interpretation: {
    eyebrow: string;
    summaryLabel: string;
    primaryReasonLabel: string;
    secondaryReasonLabel: string;
    supportNoteLabel: string;
    modeHeadings: Record<RecommendationMode, string>;
    modeSummaries: Record<RecommendationMode, string>;
    primaryTemplates: Record<RecommendationMode, string>;
    secondaryTemplates: Record<RecommendationMode, string>;
    supportFlagTemplates: {
      architecture_supporting_option: string;
    };
    methodologyLabels: Record<RecommendationInterpretationLabel, string>;
  };
  narrative: {
    fitLabelKeyPrefix: string;
    shortRationaleTemplate: string;
    topOverviewTemplate: string;
    alternativeOverviewTemplate: string;
    topTradeoffTemplate: string;
    alternativeTradeoffTemplate: string;
    sensitivityTemplate: string;
    reasonPhrases: Record<ResultReasonId, string>;
    outcomeTexts: Record<MethodologyId, string>;
    outcomeCautionTexts: Record<MethodologyId, string>;
    nextStepTexts: Record<MethodologyId, string>;
    supportRoleTexts: Partial<Record<MethodologyId, string>>;
    outcomeContrastTexts: Partial<Record<MethodologyId, string>>;
  };
  dimensions: Record<
    string,
    {
      summaries: Record<0 | 1 | 2 | 3, string>;
    }
  >;
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
  assessment: AssessmentDictionary;
  aboutModel: AboutModelDictionary;
  methodologies: MethodologiesDictionary;
  results: ResultsDictionary;
  placeholders: PlaceholdersDictionary;
}
