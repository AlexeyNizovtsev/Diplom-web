import type {
  DimensionKey,
  QuestionnaireBlockConfig,
  QuestionnaireOptionConfig
} from "@/types/questionnaire";

function scaleOptions(
  prefix: string,
  target: DimensionKey,
  signalKey: string,
  ids: [string, string, string, string]
): QuestionnaireOptionConfig[] {
  return ids.map((id, index) => ({
    id,
    labelKey: `${prefix}.options.${id}.label`,
    descriptionKey: `${prefix}.options.${id}.description`,
    signalMapping: [
      {
        target,
        signalKey,
        value: index as 0 | 1 | 2 | 3
      }
    ]
  }));
}

export const questionnaireBlocks: QuestionnaireBlockConfig[] = [
  {
    id: "governance",
    dimensionKey: "governanceFormalisation",
    titleKey: "questionnaire.blocks.governance.title",
    helperTextKey: "questionnaire.blocks.governance.helper",
    shortLabelKey: "questionnaire.blocks.governance.shortLabel",
    questions: [
      {
        id: "regulatoryCompliance",
        titleKey: "questionnaire.questions.regulatoryCompliance.title",
        helperTextKey: "questionnaire.questions.regulatoryCompliance.helper",
        required: true,
        options: scaleOptions(
          "questionnaire.questions.regulatoryCompliance",
          "governanceFormalisation",
          "regulatoryCompliance",
          ["low", "moderate", "high", "strictRegulatory"]
        )
      },
      {
        id: "stagedDocumentation",
        titleKey: "questionnaire.questions.stagedDocumentation.title",
        helperTextKey: "questionnaire.questions.stagedDocumentation.helper",
        required: true,
        options: scaleOptions(
          "questionnaire.questions.stagedDocumentation",
          "governanceFormalisation",
          "stagedDocumentation",
          ["low", "moderate", "high", "veryHigh"]
        )
      },
      {
        id: "formalAcceptance",
        titleKey: "questionnaire.questions.formalAcceptance.title",
        helperTextKey: "questionnaire.questions.formalAcceptance.helper",
        required: true,
        options: scaleOptions(
          "questionnaire.questions.formalAcceptance",
          "governanceFormalisation",
          "formalAcceptance",
          ["low", "moderate", "high", "veryHigh"]
        )
      }
    ]
  },
  {
    id: "requirements",
    dimensionKey: "requirementsStability",
    titleKey: "questionnaire.blocks.requirements.title",
    helperTextKey: "questionnaire.blocks.requirements.helper",
    shortLabelKey: "questionnaire.blocks.requirements.shortLabel",
    questions: [
      {
        id: "changeFrequency",
        titleKey: "questionnaire.questions.changeFrequency.title",
        helperTextKey: "questionnaire.questions.changeFrequency.helper",
        required: true,
        options: scaleOptions(
          "questionnaire.questions.changeFrequency",
          "requirementsStability",
          "changeFrequency",
          ["veryOften", "sometimes", "rarely", "almostNever"]
        )
      },
      {
        id: "scopeFixity",
        titleKey: "questionnaire.questions.scopeFixity.title",
        helperTextKey: "questionnaire.questions.scopeFixity.helper",
        required: true,
        options: scaleOptions(
          "questionnaire.questions.scopeFixity",
          "requirementsStability",
          "scopeFixity",
          ["notFixed", "partiallyFixed", "mostlyFixed", "fullyFixed"]
        )
      },
      {
        id: "changeControl",
        titleKey: "questionnaire.questions.changeControl.title",
        helperTextKey: "questionnaire.questions.changeControl.helper",
        required: true,
        options: scaleOptions(
          "questionnaire.questions.changeControl",
          "requirementsStability",
          "changeControl",
          ["adHoc", "lightControl", "controlled", "strictChangeControl"]
        )
      }
    ]
  },
  {
    id: "risk",
    dimensionKey: "riskInnovationOrientation",
    titleKey: "questionnaire.blocks.risk.title",
    helperTextKey: "questionnaire.blocks.risk.helper",
    shortLabelKey: "questionnaire.blocks.risk.shortLabel",
    questions: [
      {
        id: "technicalUncertainty",
        titleKey: "questionnaire.questions.technicalUncertainty.title",
        helperTextKey: "questionnaire.questions.technicalUncertainty.helper",
        required: true,
        options: scaleOptions(
          "questionnaire.questions.technicalUncertainty",
          "riskInnovationOrientation",
          "technicalUncertainty",
          ["low", "moderate", "high", "veryHigh"]
        )
      },
      {
        id: "failureCriticality",
        titleKey: "questionnaire.questions.failureCriticality.title",
        helperTextKey: "questionnaire.questions.failureCriticality.helper",
        required: true,
        options: scaleOptions(
          "questionnaire.questions.failureCriticality",
          "riskInnovationOrientation",
          "failureCriticality",
          ["low", "moderate", "high", "critical"]
        )
      },
      {
        id: "rndCentrality",
        titleKey: "questionnaire.questions.rndCentrality.title",
        helperTextKey: "questionnaire.questions.rndCentrality.helper",
        required: true,
        options: scaleOptions(
          "questionnaire.questions.rndCentrality",
          "riskInnovationOrientation",
          "rndCentrality",
          ["notCentral", "limited", "significant", "core"]
        )
      }
    ]
  },
  {
    id: "iteration",
    dimensionKey: "iterationStructure",
    titleKey: "questionnaire.blocks.iteration.title",
    helperTextKey: "questionnaire.blocks.iteration.helper",
    shortLabelKey: "questionnaire.blocks.iteration.shortLabel",
    questions: [
      {
        id: "deliveryRhythm",
        titleKey: "questionnaire.questions.deliveryRhythm.title",
        helperTextKey: "questionnaire.questions.deliveryRhythm.helper",
        required: true,
        options: scaleOptions(
          "questionnaire.questions.deliveryRhythm",
          "iterationStructure",
          "deliveryRhythm",
          ["linear", "milestoneBased", "structuredIterations", "continuousFlow"]
        )
      },
      {
        id: "reviewCadence",
        titleKey: "questionnaire.questions.reviewCadence.title",
        helperTextKey: "questionnaire.questions.reviewCadence.helper",
        required: true,
        options: scaleOptions(
          "questionnaire.questions.reviewCadence",
          "iterationStructure",
          "reviewCadence",
          ["atTheEnd", "byPhase", "regularIncrements", "continuousOnDemand"]
        )
      },
      {
        id: "workOrganisation",
        titleKey: "questionnaire.questions.workOrganisation.title",
        helperTextKey: "questionnaire.questions.workOrganisation.helper",
        required: true,
        options: scaleOptions(
          "questionnaire.questions.workOrganisation",
          "iterationStructure",
          "workOrganisation",
          ["generalPlan", "batchedByMilestone", "sprintStyleCommitment", "wipLimitedPullFlow"]
        )
      }
    ]
  },
  {
    id: "discipline",
    dimensionKey: "organisationalDiscipline",
    titleKey: "questionnaire.blocks.discipline.title",
    helperTextKey: "questionnaire.blocks.discipline.helper",
    shortLabelKey: "questionnaire.blocks.discipline.shortLabel",
    questions: [
      {
        id: "processMaturity",
        titleKey: "questionnaire.questions.processMaturity.title",
        helperTextKey: "questionnaire.questions.processMaturity.helper",
        required: true,
        options: scaleOptions(
          "questionnaire.questions.processMaturity",
          "organisationalDiscipline",
          "processMaturity",
          ["informal", "developing", "established", "highlyDisciplined"]
        )
      },
      {
        id: "roleClarity",
        titleKey: "questionnaire.questions.roleClarity.title",
        helperTextKey: "questionnaire.questions.roleClarity.helper",
        required: true,
        options: scaleOptions(
          "questionnaire.questions.roleClarity",
          "organisationalDiscipline",
          "roleClarity",
          ["unclear", "partlyDefined", "clearlyDefined", "stronglyFormalised"]
        )
      },
      {
        id: "documentationCulture",
        titleKey: "questionnaire.questions.documentationCulture.title",
        helperTextKey: "questionnaire.questions.documentationCulture.helper",
        required: true,
        options: scaleOptions(
          "questionnaire.questions.documentationCulture",
          "organisationalDiscipline",
          "documentationCulture",
          ["minimal", "moderate", "strong", "veryStrong"]
        )
      }
    ]
  },
  {
    id: "complexity",
    dimensionKey: "systemIntegrationComplexity",
    titleKey: "questionnaire.blocks.complexity.title",
    helperTextKey: "questionnaire.blocks.complexity.helper",
    shortLabelKey: "questionnaire.blocks.complexity.shortLabel",
    questions: [
      {
        id: "architectureComplexity",
        titleKey: "questionnaire.questions.architectureComplexity.title",
        helperTextKey: "questionnaire.questions.architectureComplexity.helper",
        required: true,
        options: scaleOptions(
          "questionnaire.questions.architectureComplexity",
          "systemIntegrationComplexity",
          "architectureComplexity",
          ["simple", "moderate", "complex", "veryComplex"]
        )
      },
      {
        id: "externalIntegrationCount",
        titleKey: "questionnaire.questions.externalIntegrationCount.title",
        helperTextKey: "questionnaire.questions.externalIntegrationCount.helper",
        required: true,
        options: scaleOptions(
          "questionnaire.questions.externalIntegrationCount",
          "systemIntegrationComplexity",
          "externalIntegrationCount",
          ["fewOrNone", "some", "many", "extensive"]
        )
      },
      {
        id: "enterpriseConstraintLevel",
        titleKey: "questionnaire.questions.enterpriseConstraintLevel.title",
        helperTextKey: "questionnaire.questions.enterpriseConstraintLevel.helper",
        required: true,
        options: scaleOptions(
          "questionnaire.questions.enterpriseConstraintLevel",
          "systemIntegrationComplexity",
          "enterpriseConstraintLevel",
          ["lowConstraint", "moderateConstraint", "highConstraint", "veryHighConstraint"]
        )
      }
    ]
  }
];
