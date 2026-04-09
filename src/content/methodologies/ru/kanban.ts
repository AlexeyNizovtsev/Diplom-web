import type { MethodologyContent } from "@/types/methodology";

export const kanbanMethodologyContentRu: MethodologyContent = {
  id: "kanban",
  title: "Kanban",
  shortLabel: "Kanban",
  typeLabel: "Потоковая гибкая",
  overview: {
    summary:
      "Потоковый метод, который делает работу видимой, ограничивает WIP и улучшает поставку через pull-правила и наблюдаемое поведение потока",
    entries: [
      {
        id: "whatIs",
        title: "Что такое Kanban",
        description:
          "Kanban — это потоковый метод управления работой через визуализацию, явные правила движения задач и ограничения work in progress. В программной инженерии он особенно связан с continuous delivery-контекстами, средами с тяжелым сопровождением и ситуациями, где входящая работа изменчива и плохо упаковывается в фиксированные итерации"
      },
      {
        id: "coreIdea",
        title: "Ключевая идея",
        description:
          "Вместо организации поставки вокруг timeboxed sprints Kanban строит работу как непрерывный поток. Новая работа обычно берется только тогда, когда освобождается capacity. Поэтому подход особенно уместен там, где приоритеты часто меняются и команде нужно реагировать непрерывно, а не ждать границы следующей итерации"
      },
      {
        id: "whyItMatters",
        title: "Почему это важно",
        description:
          "Kanban дает командам легкий, но дисциплинированный способ видеть bottlenecks, снижать перегрузку, стабилизировать throughput и улучшать lead time. В модели проекта это самый явный представитель continuous-flow процесса с WIP-limited delivery"
      }
    ],
    signalTags: [
      { id: "continuousFlow", label: "Непрерывный поток" },
      { id: "wipLimits", label: "WIP-лимиты" },
      { id: "pullBasedDelivery", label: "Pull-based delivery" },
      { id: "explicitWorkflowPolicies", label: "Явные правила workflow" }
    ]
  },
  quickFit: {
    title: "Быстрый ориентир",
    summary:
      "Лучше всего подходит для непрерывного сервисного потока, support-работы и меняющихся приоритетов, где визуальный контроль и WIP-дисциплина важнее спринтового ритма"
  },
  firstSteps: {
    title: "С чего начать применение Kanban",
    intro:
      "Сначала опишите реальный workflow, а затем сделайте поток видимым и управляемым, прежде чем пытаться ускорить систему",
    mode: "sequence",
    steps: [
      { id: "visualizeCurrentWorkflow", title: "Визуализировать текущий workflow", description: "Опишите реальные стадии прохождения работы: intake, analysis, development, testing, release. Отталкивайтесь от фактического процесса, а не от идеализированной схемы" },
      { id: "createFirstBoard", title: "Создать первую Kanban-board", description: "Представьте workflow визуально через колонки и work items. Важно, чтобы доска отражала реальные handoffs и очереди, а не набор абстрактных подписей" },
      { id: "setInitialWipLimits", title: "Задать первоначальные WIP-лимиты", description: "Определите простые ограничения для самых загруженных стадий, чтобы команда не перегружала себя чрезмерным параллелизмом. Начинайте осторожно и уточняйте позже" },
      { id: "makeMovementRulesExplicit", title: "Сделать явными правила движения", description: "Согласуйте, когда элемент может войти в стадию, покинуть ее или считаться done. Эти правила должны быть видимыми и общими для команды" },
      { id: "trackFlowMetrics", title: "Отслеживать flow metrics", description: "Измеряйте lead time, cycle time, throughput и blockers. Не превращайте метрики в бюрократию — используйте их, чтобы понимать, где поток ломается" },
      { id: "improveBottlenecksContinuously", title: "Непрерывно улучшать bottlenecks", description: "Используйте доску и метрики, чтобы находить очереди, блокировки и нестабильные стадии. Улучшайте сначала самые слабые места, а не переделывайте систему целиком", emphasis: "final" }
    ],
    callout: {
      id: "practicalNote",
      label: "Практическая заметка",
      description:
        "Kanban лучше всего работает тогда, когда команда начинает с текущего процесса и эволюционно улучшает его. Подход не требует драматического запуска, но требует дисциплины в визуализации, pull-логике и контроле WIP"
    }
  },
  coreElements: {
    title: "Принципы, структура доски и управление потоком",
    intro:
      "Kanban не определяется набором церемоний в духе Scrum. Его сила в том, как работа визуализируется, ограничивается, измеряется и постепенно улучшается",
    groups: [
      {
        id: "principles",
        label: "Принципы",
        items: [
          { id: "visualizeWorkflow", title: "Визуализировать workflow", description: "Доска делает фактический поток работы видимым, чтобы команда могла замечать прогресс, очереди и blockers" },
          { id: "limitWorkInProgress", title: "Ограничивать work in progress", description: "WIP-лимиты снижают перегрузку и заставляют завершать работу вместо бесконечного старта новых задач" },
          { id: "manageFlow", title: "Управлять потоком", description: "Команда отслеживает, как работа проходит по системе, особенно задержки, блокировки и нестабильный throughput" },
          { id: "makePoliciesExplicit", title: "Делать правила явными", description: "Правила взятия работы, перемещения карточек и определения done должны быть видимыми и понятными всем" },
          { id: "improveContinuously", title: "Непрерывно улучшать", description: "Kanban поддерживает постепенное улучшение процесса вместо одноразовой тотальной перестройки" }
        ]
      },
      {
        id: "boardStructure",
        label: "Структура доски",
        items: [
          { id: "workflowColumns", title: "Колонки workflow", description: "Колонки отражают реальные состояния процесса, а не абстрактные заглушки. Типичные примеры: analysis, development, testing, deployment" },
          { id: "workItems", title: "Work items", description: "Карточки представляют части работы, которые перемещаются через систему. Они должны быть достаточно понятными и достаточно небольшими для прозрачного отслеживания" },
          { id: "queuesAndBlockers", title: "Очереди и blockers", description: "Ожидание и заблокированная работа должны быть видны, потому что скрытые очереди разрушают поток и маскируют реальные проблемы" }
        ]
      },
      {
        id: "wipLimitsAndPullLogic",
        label: "WIP-лимиты и pull-логика",
        items: [
          { id: "pullBasedStartOfWork", title: "Pull-based start of work", description: "Команда должна начинать новую работу тогда, когда есть реальная capacity, а не продавливать задачи в уже перегруженные стадии" },
          { id: "stageLevelWipControl", title: "Контроль WIP по стадиям", description: "Ограничения нужно ставить там, где вероятна перегрузка. Если стадия переполнена, upstream-работа должна остановиться или помочь устранить bottleneck" },
          { id: "finishingOverStarting", title: "Завершение важнее старта", description: "Kanban поощряет завершение и стабильный поток сильнее, чем видимую занятость множеством незавершенных задач" }
        ]
      },
      {
        id: "flowMetrics",
        label: "Flow metrics",
        items: [
          { id: "leadTime", title: "Lead time", description: "Полное время от запроса до поставки" },
          { id: "cycleTime", title: "Cycle time", description: "Время от начала работы до завершения" },
          { id: "throughput", title: "Throughput", description: "Объем завершенной работы за период" },
          { id: "flowEfficiencyAndBottlenecks", title: "Эффективность потока и bottlenecks", description: "Команда должна наблюдать, где работа ждет, а не только где она активно выполняется" }
        ]
      }
    ]
  },
  teamNeeds: {
    title: "Что Kanban требует от команды и организации",
    items: [
      { id: "visualizeRealWork", text: "Готовность показывать реальную работу, а не скрывать очереди" },
      { id: "respectWipLimits", text: "Дисциплина соблюдать WIP-лимиты даже под давлением" },
      { id: "sharedPullUnderstanding", text: "Общее понимание pull-based управления работой" },
      { id: "blockerTransparency", text: "Прозрачность по blockers и waiting states" },
      { id: "incrementalImprovement", text: "Готовность улучшать процесс постепенно" },
      { id: "metricsAsLearningTools", text: "Достаточная зрелость, чтобы использовать метрики как инструменты обучения, а не наказания" },
      { id: "continuousReorderingAcceptance", text: "Готовность стейкхолдеров принимать постоянную перестановку приоритетов" }
    ],
    callout: {
      id: "practicalNote",
      label: "Практическая заметка",
      description:
        "Kanban не требует такой формальной role-структуры, как Scrum, но все равно требует поведенческой дисциплины. Без нее доска становится декоративной, а WIP-лимиты — фикцией"
    }
  },
  commonMistakes: {
    title: "Что обычно идет не так",
    items: [
      { id: "passiveStatusBoard", text: "Использовать доску как пассивный status display вместо активного инструмента управления" },
      { id: "ignoreWipUnderPressure", text: "Игнорировать WIP-лимиты при росте давления" },
      { id: "hideQueuesAndBlockers", text: "Визуализировать задачи, но не показывать очереди и blockers" },
      { id: "oversizedWorkItems", text: "Делать work items слишком большими или слишком расплывчатыми" },
      { id: "measureWithoutAction", text: "Измерять поток, но ничего не делать с bottlenecks" },
      { id: "noProcessMyth", text: "Верить, что Kanban — это «никакого процесса» или «просто тикеты»" },
      { id: "architectureCoordinationGap", text: "Использовать Kanban там, где нужна серьезная архитектурная координация, но ее никто явно не планирует" },
      { id: "chaoticReprioritization", text: "Переприоритизировать работу так часто, что поток превращается в хаос" },
      { id: "mixedWorkWithoutPolicies", text: "Смешивать support-работу и стратегические фичи без явных правил" }
    ],
    callout: {
      id: "whyTheseMistakesMatter",
      label: "Почему это важно",
      description:
        "Kanban выглядит простой, поэтому ее легко недоинженерить. Когда команда сохраняет только доску, но игнорирует pull-логику, лимиты и управление bottlenecks, она воспроизводит видимость потока без реальных выгод"
    }
  },
  applicability: {
    title: "Где Kanban подходит лучше всего",
    goodFit: [
      { id: "continuousArrival", text: "Работа приходит непрерывно, а не чистыми спринтовыми пачками" },
      { id: "frequentPriorityChanges", text: "Приоритеты действительно могут часто меняться во время исполнения" },
      { id: "supportOpsMaintenanceFlow", text: "Команда ведет support, operations, maintenance или defect flow" },
      { id: "varyingTaskSizeAndUrgency", text: "Задачи заметно различаются по размеру и срочности" },
      { id: "leadTimeOverIterationCadence", text: "Сокращение lead time важнее фиксированного iteration cadence" },
      { id: "evolutionaryChangeApproach", text: "Организации подходит эволюционный change approach, а не полная смена процесса" },
      { id: "visibilityOfQueuesAndCapacity", text: "Поставка выигрывает от сильной видимости очередей, blockers и capacity по стадиям" }
    ],
    weakerFit: [
      { id: "strictTimeboxedRhythm", text: "Проект зависит от жесткого timeboxed iteration rhythm" },
      { id: "stableSprintCommitment", text: "Governance или management требуют стабильного sprint commitment" },
      { id: "largeArchitectureMilestones", text: "Работа должна координироваться вокруг крупных архитектурных milestone" },
      { id: "formalStagedAcceptance", text: "Поставкой доминирует формальная стадийная приемка" },
      { id: "insufficientWipDiscipline", text: "Команда не способна поддерживать достаточную дисциплину вокруг WIP-policy" },
      { id: "longRangePredictabilityExpectation", text: "Стейкхолдеры ожидают дальнюю предсказуемость от фиксированных iteration plans, а не flow-based adaptation" },
      { id: "frameworkRolesAndCeremoniesNeeded", text: "Процессу для нормальной работы нужны явные framework roles и повторяющиеся ceremonies" }
    ],
    callout: {
      id: "practicalNote",
      label: "Практическая заметка",
      description:
        "Kanban особенно сильна там, где работа действительно ведет себя как service flow. Она слабеет, когда основная сложность поставки связана не со стабильностью throughput, а с тяжелой архитектурной координацией или жестким формальным управлением"
    }
  },
  notCoveredHere: {
    title: "Что эта страница не покрывает",
    items: [
      { id: "serviceClassesAndPolicies", text: "Продвинутый дизайн service classes и приоритетных политик" },
      { id: "cumulativeFlowInterpretation", text: "Детальную интерпретацию cumulative flow diagram" },
      { id: "portfolioKanban", text: "Portfolio-level Kanban" },
      { id: "scrumbanAndHybrids", text: "Варианты Scrumban и гибридный process design" },
      { id: "largeScaleKanban", text: "Крупномасштабные Kanban-реализации на множество команд" },
      { id: "quantitativeForecasting", text: "Формальные количественные методы flow-forecasting" }
    ]
  },
  studyNext: {
    title: "Что изучать дальше",
    items: [
      { id: "leadTimeCycleTimeThroughput", text: "Разобраться в различии между lead time, cycle time и throughput" },
      { id: "setAndRefineWipLimits", text: "Изучить, как задавать и уточнять WIP-лимиты в реальных командах" },
      { id: "identifyBottlenecks", text: "Практиковать системное выявление bottlenecks и blocked work" },
      { id: "compareWithScrum", text: "Сравнить Kanban и Scrum в смешанных product/support-средах" },
      { id: "exploreFlowAnalytics", text: "Изучить cumulative flow diagrams и другие flow-аналитики" },
      { id: "evolutionaryChange", text: "Разобраться в эволюционном изменении процесса вместо одноразового framework rollout" }
    ]
  }
};
