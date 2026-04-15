import type { Locale } from "@/types/common";
import type { MethodologyId } from "@/types/methodology";
import type { RecommendationMode } from "@/types/result";

import type { DimensionLevelMap } from "@/lib/result/interpretationContext";
import {
  isFlowExclusiveSignal,
  isStructuredIterationSignal,
  preferRiskDrivenOverAdaptiveIterations,
} from "@/lib/result/interpretationContext";

type LocalizedText = Record<Locale, string>;

type AlternativeContext =
  | "default"
  | "flow_dominant"
  | "cadence_dominant"
  | "risk_dominant"
  | "architecture_dominant"
  | "governance_dominant"
  | "sequential_dominant";

function replaceTemplate(
  template: string,
  values: Record<string, string | undefined>,
) {
  return Object.entries(values).reduce(
    (result, [key, value]) => result.replaceAll(`{${key}}`, value ?? ""),
    template,
  );
}

const governanceEnvironmentNote: LocalizedText = {
  en: "Formal governance, compliance pressure, and staged approval remain strong environmental constraints even when they are not the only driver of the delivery model.",
  ru: "Формальное управление, комплаенс-требования и поэтапная приемка остаются сильными ограничениями среды, даже когда они не являются единственным драйвером модели поставки.",
};

const gostGovernanceEnvironmentNote: LocalizedText = {
  en: "GOST 34 remains relevant here as the governance, compliance, and staged-approval environment layer even though it is not the dominant development-process driver.",
  ru: "GOST 34 остается здесь релевантной как слой управления, комплаенса и поэтапной приемки, даже если она не является доминирующим драйвером процесса разработки.",
};

const riskArchitectureCompositeSummary: LocalizedText = {
  en: "This is a composite case: governance is strong, but architecture and technical risk shape the execution model more than sprint cadence alone.",
  ru: "Это составной кейс: формальное управление здесь сильное, но модель исполнения в большей степени определяется архитектурой и техническим риском, чем одним лишь спринтовым ритмом.",
};

const riskArchitecturePrimaryByTopMethodology: Partial<
  Record<MethodologyId, LocalizedText>
> = {
  gost34: {
    en: "{topMethodology} stays first because compliance, formal governance, and staged acceptance are real constraints in the environment. At the same time, the development process is being shaped by architecture and technical risk, not by sprint cadence alone.",
    ru: "{topMethodology} остается на первом месте, потому что комплаенс, формальное управление и поэтапная приемка действительно ограничивают среду проекта. При этом сам процесс разработки определяется не только ритмом спринтов, а также архитектурой и техническим риском.",
  },
  rup: {
    en: "{topMethodology} ranks first because the system needs disciplined architecture and integration control, while high risk keeps the process from collapsing into a simple cadence-based model.",
    ru: "{topMethodology} выходит на первое место, потому что системе нужен дисциплинированный архитектурный и интеграционный контроль, а высокий риск не дает свести процесс к простой cadence-модели.",
  },
  spiral: {
    en: "{topMethodology} ranks first because explicit uncertainty reduction, prototyping, and risk-driven cycles shape execution more strongly than a standard sprint rhythm.",
    ru: "{topMethodology} выходит на первое место, потому что явное снижение неопределенности, прототипирование и риск-ориентированные циклы сильнее определяют исполнение, чем стандартный ритм спринтов.",
  },
};

const primaryByTopMethodology: Partial<Record<MethodologyId, LocalizedText>> = {
  scrum: {
    en: "{topMethodology} leads because the project needs a repeatable sprint cadence, backlog-managed reprioritisation, and regular review loops rather than ad hoc change handling.",
    ru: "{topMethodology} лидирует, потому что проекту нужен повторяемый ритм спринтов, управление изменениями через backlog и регулярные review-циклы, а не реакция на изменения в режиме ad hoc.",
  },
  kanban: {
    en: "{topMethodology} leads because the work behaves like continuous incoming flow and benefits more from pull-based WIP control than from timeboxed sprint commitment.",
    ru: "{topMethodology} лидирует, потому что работа ведет себя как непрерывный входящий поток и больше выигрывает от pull-логики с WIP-лимитами, чем от таймбоксированных обязательств спринта.",
  },
};

const secondaryByMethodology: Partial<Record<MethodologyId, Partial<Record<AlternativeContext, LocalizedText>>>> =
  {
    spiral: {
      risk_dominant: {
        en: "{secondMethodology} stays above Scrum here because structured iterations mainly serve risk reduction, prototyping, and uncertainty control rather than a sprint-based backlog cadence.",
        ru: "{secondMethodology} здесь остается выше Scrum, потому что структурированные итерации в первую очередь служат снижению риска, прототипированию и контролю неопределенности, а не спринтовой работе через backlog.",
      },
    },
    scrum: {
      flow_dominant: {
        en: "{secondMethodology} remains nearby because some work still benefits from cadence and backlog discipline, but the case still behaves more like continuous pull flow than a true sprint commitment.",
        ru: "{secondMethodology} остается рядом, потому что части работы все еще полезны cadence и backlog-дисциплина, но в целом кейс по-прежнему больше похож на непрерывный pull-поток, чем на настоящий спринтовый режим.",
      },
    },
    kanban: {
      cadence_dominant: {
        en: "{secondMethodology} remains relevant because some work still benefits from flow visibility, but the dominant need here is a repeatable sprint cadence and backlog discipline.",
        ru: "{secondMethodology} остается релевантной, потому что части работы все еще полезна видимость потока, но доминирующая потребность здесь — повторяемый ритм спринтов и дисциплина backlog.",
      },
    },
  };

const alternativeOverviewTemplates: Record<
  MethodologyId,
  Partial<Record<AlternativeContext, LocalizedText>>
> = {
  kanban: {
    default: {
      en: "Kanban stays relevant because the case still shows some demand for visible flow, pull-based coordination, or tighter control of work in progress.",
      ru: "Kanban остается релевантной, потому что в кейсе все еще заметна потребность в видимом потоке, pull-координации или более жестком контроле незавершенной работы.",
    },
  },
  scrum: {
    default: {
      en: "Scrum stays relevant because the team still benefits from repeatable planning, backlog discipline, and regular review points.",
      ru: "Scrum остается релевантной, потому что команде все еще полезны повторяемое планирование, дисциплина backlog и регулярные точки review.",
    },
  },
  spiral: {
    default: {
      en: "Spiral stays relevant because uncertainty, prototyping, or technical risk are still visible in the case.",
      ru: "Spiral остается релевантной, потому что в кейсе все еще заметны неопределенность, прототипирование или технический риск.",
    },
  },
  rup: {
    default: {
      en: "RUP stays relevant because architecture, integration structure, and disciplined coordination still matter here.",
      ru: "RUP остается релевантной, потому что здесь все еще важны архитектура, структура интеграций и дисциплинированная координация.",
    },
  },
  gost34: {
    default: {
      en: "GOST 34 stays relevant because compliance, documentation, and staged approval still shape the environment.",
      ru: "GOST 34 остается релевантной, потому что комплаенс, документация и поэтапное согласование все еще формируют среду проекта.",
    },
  },
  waterfall: {
    default: {
      en: "Waterfall stays relevant because some scope stability and stage-based coordination are still present in the project profile.",
      ru: "Waterfall остается релевантной, потому что в профиле проекта все еще заметны определенная стабильность объема и стадийная координация.",
    },
  },
};

const alternativeTradeoffTemplates: Record<
  MethodologyId,
  Partial<Record<AlternativeContext, LocalizedText>>
> = {
  kanban: {
    cadence_dominant: {
      en: "It stays below {topMethodology} here because the project needs a clearer sprint cadence, backlog commitment, and review loop than pure pull flow can provide.",
      ru: "Она остается ниже {topMethodology}, потому что проекту нужны более явный ритм спринтов, обязательства по backlog и review-цикл, чем может дать чистый pull-flow.",
    },
    architecture_dominant: {
      en: "It stays below {topMethodology} because architecture coordination and disciplined integration matter more here than throughput flow alone.",
      ru: "Она остается ниже {topMethodology}, потому что здесь архитектурная координация и дисциплинированная интеграция важнее, чем один лишь устойчивый throughput потока.",
    },
    governance_dominant: {
      en: "It stays below {topMethodology} because staged approval and formal control matter more here than lightweight pull flow.",
      ru: "Она остается ниже {topMethodology}, потому что здесь поэтапная приемка и формальный контроль важнее, чем легкий pull-поток.",
    },
    default: {
      en: "It stays below {topMethodology} because the case needs more structure than continuous pull flow alone.",
      ru: "Она остается ниже {topMethodology}, потому что кейсу нужна более выраженная структура, чем может дать один лишь непрерывный pull-поток.",
    },
  },
  scrum: {
    flow_dominant: {
      en: "It stays below {topMethodology} because the work behaves more like continuous incoming flow than a true sprint-shaped backlog commitment.",
      ru: "Она остается ниже {topMethodology}, потому что работа больше похожа на непрерывный входящий поток, чем на настоящий спринтовый режим с обязательствами по backlog.",
    },
    risk_dominant: {
      en: "It stays below {topMethodology} because structured iterations here mainly serve risk reduction, prototyping, and uncertainty control rather than sprint cadence.",
      ru: "Она остается ниже {topMethodology}, потому что структурированные итерации здесь в основном нужны для снижения риска, прототипирования и контроля неопределенности, а не для ритма спринтов.",
    },
    governance_dominant: {
      en: "It stays below {topMethodology} because formal governance and staged acceptance constrain execution more strongly than lightweight sprint delivery.",
      ru: "Она остается ниже {topMethodology}, потому что формальное управление и поэтапная приемка сильнее ограничивают исполнение, чем легкая спринтовая поставка.",
    },
    default: {
      en: "It stays below {topMethodology} because another method matches the dominant process pressure more directly in this case.",
      ru: "Она остается ниже {topMethodology}, потому что в этом кейсе другой метод точнее отражает доминирующее процессное давление.",
    },
  },
  spiral: {
    flow_dominant: {
      en: "It stays below {topMethodology} because the work is primarily about stabilising flow and service throughput, not organising delivery around risk-driven cycles.",
      ru: "Она остается ниже {topMethodology}, потому что работа в первую очередь направлена на стабилизацию потока и сервисного throughput, а не на организацию поставки вокруг риск-ориентированных циклов.",
    },
    cadence_dominant: {
      en: "It stays below {topMethodology} because the project needs a disciplined sprint rhythm more than explicit risk-first experimentation.",
      ru: "Она остается ниже {topMethodology}, потому что проекту нужнее дисциплинированный ритм спринтов, чем явная риск-ориентированная экспериментальная работа.",
    },
    default: {
      en: "It stays below {topMethodology} because technical uncertainty is present, but it does not dominate the whole execution model strongly enough.",
      ru: "Она остается ниже {topMethodology}, потому что техническая неопределенность присутствует, но недостаточно доминирует над всей моделью исполнения.",
    },
  },
  rup: {
    cadence_dominant: {
      en: "It stays below {topMethodology} because the project is adaptive, but not architecture-heavy enough for RUP's stronger process overhead to lead.",
      ru: "Она остается ниже {topMethodology}, потому что проект адаптивный, но недостаточно архитектурно тяжелый, чтобы вперед вышла более тяжелая процессная нагрузка RUP.",
    },
    flow_dominant: {
      en: "It stays below {topMethodology} because the main pressure is operational flow rather than architecture-first coordination.",
      ru: "Она остается ниже {topMethodology}, потому что главное давление исходит от операционного потока, а не от архитектурной координации.",
    },
    governance_dominant: {
      en: "It stays below {topMethodology} because formal governance dominates more strongly than iterative architecture control in this case.",
      ru: "Она остается ниже {topMethodology}, потому что в этом кейсе формальное управление сильнее доминирует, чем итеративный архитектурный контроль.",
    },
    default: {
      en: "It stays below {topMethodology} because architecture control matters, but it is not the main process driver here.",
      ru: "Она остается ниже {topMethodology}, потому что архитектурный контроль важен, но не является здесь главным драйвером процесса.",
    },
  },
  gost34: {
    default: {
      en: "It stays below {topMethodology} because governance is important here, but it does not dominate day-to-day execution strongly enough to become the main fit.",
      ru: "Она остается ниже {topMethodology}, потому что управление здесь важно, но недостаточно доминирует над ежедневным исполнением, чтобы стать главным совпадением.",
    },
  },
  waterfall: {
    default: {
      en: "It stays below {topMethodology} because the project still needs more adaptation, feedback, or uncertainty handling than a linear sequence allows.",
      ru: "Она остается ниже {topMethodology}, потому что проекту все еще нужно больше адаптации, обратной связи или работы с неопределенностью, чем допускает линейная последовательность.",
    },
  },
};

const alternativeOutcomeTemplates: Record<
  MethodologyId,
  Partial<Record<AlternativeContext, LocalizedText>>
> = {
  kanban: {
    cadence_dominant: {
      en: "Consider Kanban if the work later becomes less sprint-shaped and more continuous, with pull rules and WIP control overtaking timeboxed commitment.",
      ru: "Рассматривайте Kanban, если работа позже станет меньше похожей на спринтовый режим и больше на непрерывный поток, где pull-правила и WIP-контроль важнее таймбоксированных обязательств.",
    },
    architecture_dominant: {
      en: "Consider Kanban if operational flow becomes the main coordination problem and architecture-heavy milestone control becomes less central.",
      ru: "Рассматривайте Kanban, если главным координационным вызовом станет операционный поток, а архитектурно тяжелая координация по вехам перестанет быть центральной.",
    },
    governance_dominant: {
      en: "Consider Kanban if formal stage pressure relaxes enough for flow visibility, pull-based movement, and WIP control to become the main execution needs.",
      ru: "Рассматривайте Kanban, если формальное стадийное давление ослабнет настолько, что главными потребностями исполнения станут видимость потока, pull-логика и WIP-контроль.",
    },
    default: {
      en: "Consider Kanban if continuous incoming work, on-demand delivery, and WIP-limited pull become more important than the current delivery structure.",
      ru: "Рассматривайте Kanban, если непрерывный входящий поток работы, поставка по запросу и WIP-ограниченный pull станут важнее текущей структуры поставки.",
    },
  },
  scrum: {
    flow_dominant: {
      en: "Consider Scrum if the team later needs firmer sprint cadence, backlog commitment, and regular review checkpoints instead of continuous pull flow.",
      ru: "Рассматривайте Scrum, если команде позже понадобится более жесткий ритм спринтов, обязательства по backlog и регулярные точки review вместо непрерывного pull-потока.",
    },
    risk_dominant: {
      en: "Consider Scrum if uncertainty drops enough that the work can shift from risk-driven cycles toward a steadier sprint rhythm and backlog-managed reprioritisation.",
      ru: "Рассматривайте Scrum, если уровень неопределенности снизится настолько, что работа сможет сместиться от риск-ориентированных циклов к более устойчивому ритму спринтов и управлению изменениями через backlog.",
    },
    governance_dominant: {
      en: "Consider Scrum if formal stage pressure eases and a lighter cadence-based delivery model becomes operationally feasible.",
      ru: "Рассматривайте Scrum, если давление формального стадийного управления ослабнет и более легкая cadence-модель поставки станет операционно возможной.",
    },
    default: {
      en: "Consider Scrum if the project needs a clearer sprint cadence, review loop, and backlog discipline than the current leader provides.",
      ru: "Рассматривайте Scrum, если проекту понадобится более явный ритм спринтов, review-цикл и дисциплина backlog, чем дает текущий лидер.",
    },
  },
  spiral: {
    flow_dominant: {
      en: "A risk-driven approach becomes more relevant if technical uncertainty, prototyping demand, or failure consequences start to dominate over service flow.",
      ru: "Риск-ориентированный подход становится более релевантным, если техническая неопределенность, потребность в прототипировании или цена ошибки начнут доминировать над сервисным потоком.",
    },
    cadence_dominant: {
      en: "Consider Spiral if the project stops being mainly sprint-shaped and instead needs explicit uncertainty reduction, prototyping, and technical-risk cycles.",
      ru: "Рассматривайте Spiral, если проект перестанет быть в основном sprint-shaped и вместо этого потребует явного снижения неопределенности, прототипирования и циклов работы с техническим риском.",
    },
    default: {
      en: "A risk-driven approach becomes more relevant when uncertainty reduction and prototype-based learning matter more than the current process pattern.",
      ru: "Риск-ориентированный подход становится более релевантным, когда снижение неопределенности и обучение через прототипы становятся важнее текущего процессного паттерна.",
    },
  },
  rup: {
    cadence_dominant: {
      en: "Consider RUP if architecture and integration coordination become heavy enough to require more disciplined iterative control than Scrum currently needs.",
      ru: "Рассматривайте RUP, если архитектурная и интеграционная координация станет настолько тяжелой, что потребуется более дисциплинированный итеративный контроль, чем сейчас нужен Scrum.",
    },
    flow_dominant: {
      en: "Consider RUP if architecture-first coordination and controlled integration start to matter more than throughput flow and pull-based movement.",
      ru: "Рассматривайте RUP, если координация от архитектуры и управляемая интеграция начнут значить больше, чем throughput потока и pull-движение работы.",
    },
    default: {
      en: "Consider RUP as the architecture and integration-control layer if disciplined iterations, traceability, and structural coordination need to increase.",
      ru: "Рассматривайте RUP как слой архитектурного и интеграционного контроля, если понадобится усилить дисциплинированные итерации, трассируемость и структурную координацию.",
    },
  },
  gost34: {
    default: {
      en: "Consider GOST 34 as the governance and compliance layer if formal acceptance, staged approval, and technical-assignment discipline must be carried explicitly.",
      ru: "Рассматривайте GOST 34 как слой управления и комплаенса, если формальная приемка, поэтапное согласование и дисциплина технического задания должны быть выражены явно.",
    },
  },
  waterfall: {
    default: {
      en: "Consider Waterfall if scope stabilises enough that linear progression, phase gates, and controlled change matter more than ongoing adaptation.",
      ru: "Рассматривайте Waterfall, если объем стабилизируется настолько, что линейное продвижение, фазовые переходы и управляемые изменения станут важнее постоянной адаптации.",
    },
  },
};

function getAlternativeContext(
  topMethodologyId: MethodologyId,
  levels: DimensionLevelMap,
): AlternativeContext {
  if (preferRiskDrivenOverAdaptiveIterations(levels) || topMethodologyId === "spiral") {
    return "risk_dominant";
  }

  if (topMethodologyId === "kanban" || isFlowExclusiveSignal(levels)) {
    return "flow_dominant";
  }

  if (topMethodologyId === "scrum" || isStructuredIterationSignal(levels)) {
    return "cadence_dominant";
  }

  if (
    topMethodologyId === "rup" ||
    levels.systemIntegrationComplexity >= 3
  ) {
    return "architecture_dominant";
  }

  if (topMethodologyId === "gost34" || levels.governanceFormalisation >= 3) {
    return "governance_dominant";
  }

  if (topMethodologyId === "waterfall") {
    return "sequential_dominant";
  }

  return "default";
}

function resolveLocalizedTemplate(
  templates: Partial<Record<AlternativeContext, LocalizedText>> | undefined,
  locale: Locale,
  context: AlternativeContext,
) {
  return templates?.[context]?.[locale] ?? templates?.default?.[locale];
}

export function getMethodologyExplanationContext(
  topMethodologyId: MethodologyId,
  levels: DimensionLevelMap,
) {
  return getAlternativeContext(topMethodologyId, levels);
}

export function getDimensionHighlightOwnershipAdjustment({
  methodologyId,
  dimensionKey,
  levels,
}: {
  methodologyId: MethodologyId;
  dimensionKey: keyof DimensionLevelMap;
  levels: DimensionLevelMap;
}) {
  if (dimensionKey !== "iterationStructure") {
    return 0;
  }

  if (levels.iterationStructure === 3) {
    if (methodologyId === "kanban") {
      return 1.5;
    }

    if (methodologyId === "scrum" || methodologyId === "spiral") {
      return -2.5;
    }

    return -1.5;
  }

  return 0;
}

export function buildMethodologyAlternativeNarrative({
  locale,
  methodologyId,
  topMethodologyId,
  topMethodologyTitle,
  levels,
}: {
  locale: Locale;
  methodologyId: MethodologyId;
  topMethodologyId: MethodologyId;
  topMethodologyTitle: string;
  levels: DimensionLevelMap;
}) {
  const context = getAlternativeContext(topMethodologyId, levels);

  return {
    overviewText: resolveLocalizedTemplate(
      alternativeOverviewTemplates[methodologyId],
      locale,
      context,
    ),
    tradeoffText: resolveLocalizedTemplate(
      alternativeTradeoffTemplates[methodologyId],
      locale,
      context,
    )
      ? replaceTemplate(
          resolveLocalizedTemplate(
            alternativeTradeoffTemplates[methodologyId],
            locale,
            context,
          )!,
          {
            topMethodology: topMethodologyTitle,
          },
        )
      : undefined,
  };
}

export function buildMethodologyConditionalOutcome({
  locale,
  methodologyId,
  topMethodologyId,
  levels,
}: {
  locale: Locale;
  methodologyId: MethodologyId;
  topMethodologyId: MethodologyId;
  levels: DimensionLevelMap;
}) {
  const context = getAlternativeContext(topMethodologyId, levels);

  return resolveLocalizedTemplate(
    alternativeOutcomeTemplates[methodologyId],
    locale,
    context,
  );
}

export function buildInterpretationOverrides({
  locale,
  topMethodologyId,
  topMethodologyTitle,
  secondMethodologyId,
  secondMethodologyTitle,
  mode,
  rankingMethodologyIds,
  levels,
}: {
  locale: Locale;
  topMethodologyId?: MethodologyId;
  topMethodologyTitle?: string;
  secondMethodologyId?: MethodologyId;
  secondMethodologyTitle?: string;
  mode?: RecommendationMode;
  rankingMethodologyIds?: MethodologyId[];
  levels: DimensionLevelMap;
}) {
  const context = topMethodologyId
    ? getAlternativeContext(topMethodologyId, levels)
    : "default";
  const supportNotes: string[] = [];

  if (levels.governanceFormalisation >= 3) {
    supportNotes.push(governanceEnvironmentNote[locale]);
  }

  if (
    mode === "composite_strategy" &&
    topMethodologyId !== "gost34" &&
    rankingMethodologyIds?.includes("gost34")
  ) {
    supportNotes.push(gostGovernanceEnvironmentNote[locale]);
  }

  const result: {
    summary?: string;
    primaryExplanation?: string;
    secondaryExplanation?: string;
    supportNotes: string[];
  } = {
    supportNotes,
  };

  if (
    topMethodologyId &&
    topMethodologyTitle &&
    preferRiskDrivenOverAdaptiveIterations(levels)
  ) {
    result.summary = riskArchitectureCompositeSummary[locale];

    const primaryTemplate =
      riskArchitecturePrimaryByTopMethodology[topMethodologyId];

    if (primaryTemplate) {
      result.primaryExplanation = replaceTemplate(primaryTemplate[locale], {
        topMethodology: topMethodologyTitle,
      });
    }
  } else if (topMethodologyId && topMethodologyTitle) {
    const primaryTemplate = primaryByTopMethodology[topMethodologyId];

    if (primaryTemplate) {
      result.primaryExplanation = replaceTemplate(primaryTemplate[locale], {
        topMethodology: topMethodologyTitle,
      });
    }
  }

  if (secondMethodologyId && secondMethodologyTitle) {
    const secondaryTemplate = resolveLocalizedTemplate(
      secondaryByMethodology[secondMethodologyId],
      locale,
      context,
    );

    if (secondaryTemplate) {
      result.secondaryExplanation = replaceTemplate(secondaryTemplate, {
        secondMethodology: secondMethodologyTitle,
      });
    }
  }

  return result;
}
