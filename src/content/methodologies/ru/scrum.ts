import type { MethodologyContent } from "@/types/methodology";

export const scrumMethodologyContentRu: MethodologyContent = {
  id: "scrum",
  title: "Scrum",
  shortLabel: "Scrum",
  typeLabel: "Гибкая",
  overview: {
    summary:
      "Легкий адаптивный фреймворк, построенный вокруг коротких спринтов фиксированной длины, понятных зон ответственности и регулярной проверки продукта и процесса",
    entries: [
      {
        id: "whatIs",
        title: "Что такое Scrum",
        description:
          "Scrum — это легкий фреймворк для создания ценности через адаптивные решения сложных задач. Он организует работу вокруг коротких спринтов фиксированной длины, небольшой кросс-функциональной команды и регулярной проверки и адаптации как продукта, так и процесса"
      },
      {
        id: "coreIdea",
        title: "Ключевая идея",
        description:
          "Вместо предположения, что все можно полностью предсказать заранее, Scrum строит работу как повторяющийся цикл планирования, создания, обсуждения результата и улучшения. Он рассчитан на контексты, где требования меняются, важна обратная связь от стейкхолдеров и команда способна поддерживать устойчивый ритм поставки"
      },
      {
        id: "whyItMatters",
        title: "Почему это важно",
        description:
          "Scrum дает командам дисциплинированный способ совместить адаптивность и структуру. В модели проекта Scrum — наиболее явный представитель адаптивной разработки с фиксированным ритмом и регулярными циклами обсуждения результата"
      }
    ],
    signalTags: [
      { id: "timeboxedSprints", label: "Спринты фиксированной длины" },
      { id: "adaptivePlanning", label: "Адаптивное планирование" },
      { id: "regularStakeholderFeedback", label: "Регулярная обратная связь от стейкхолдеров" },
      { id: "empiricalProcessControl", label: "Эмпирический контроль процесса" }
    ]
  },
  quickFit: {
    title: "Быстрый ориентир",
    summary:
      "Лучше всего подходит для адаптивной работы с короткими структурированными итерациями, регулярной обратной связью и достаточной командной дисциплиной для устойчивого ритма спринтов"
  },
  firstSteps: {
    title: "С чего начать применение Scrum",
    intro:
      "Начните с понятных ролей и ответственности, рабочего бэклога и такого спринтового ритма, который команда действительно сможет удерживать",
    mode: "sequence",
    steps: [
      { id: "assignCoreAccountabilities", title: "Назначить ключевые роли и зоны ответственности", description: "Определите, кто будет Product Owner, Scrum Master и Developers. В Scrum именно эти три роли формируют Scrum Team" },
      { id: "createInitialProductBacklog", title: "Собрать первоначальный Product Backlog", description: "Зафиксируйте ключевые потребности продукта, ожидаемые результаты и первые элементы бэклога. Бэклог должен показывать, что продукту может понадобиться, а не замораживать все будущее в деталях" },
      { id: "setSprintLengthAndRhythm", title: "Определить длину Sprint и рабочий ритм", description: "Согласуйте длительность Sprint и повторяющийся цикл: Sprint Planning, Daily Scrum, Sprint Review и Sprint Retrospective внутри самого Sprint" },
      { id: "defineDefinitionOfDone", title: "Определить Definition of Done", description: "Согласуйте, что означает done, чтобы у команды был единый стандарт качества. Без реального Definition of Done Increment становится расплывчатым, а прозрачность — слабой" },
      { id: "prepareSprintPlanning", title: "Подготовить и провести Sprint Planning", description: "Выберите элементы бэклога для первого Sprint, задайте Sprint Goal и сформируйте первоначальный план его достижения. Sprint Goal придает выбранной работе внутреннюю связность" },
      { id: "runSprintAndInspect", title: "Провести Sprint и проинспектировать результат", description: "Исполните Sprint, ежедневно проверяйте прогресс, обсуждайте Increment со стейкхолдерами на Sprint Review и улучшайте способ работы команды на Sprint Retrospective", emphasis: "final" }
    ],
    callout: {
      id: "practicalNote",
      label: "Практическая заметка",
      description:
        "Цель не в том, чтобы сразу выучить всю терминологию Scrum. Реальная точка старта — повторяемый ритм с ясной ответственностью, видимыми приоритетами и полезным результатом в конце каждого цикла"
    }
  },
  coreElements: {
    title: "Роли, события и артефакты",
    intro:
      "Scrum определяет небольшой набор базовых элементов. Это не декоративные добавки, а минимальная структура, поддерживающая прозрачность, проверку и адаптацию",
    groups: [
      {
        id: "roles",
        label: "Roles",
        items: [
          { id: "productOwner", title: "Product Owner", description: "Отвечает за ценность продукта и порядок элементов в Product Backlog. Эта роль критична, потому что Scrum требует единого понятного направления того, что должно идти следующим" },
          { id: "scrumMaster", title: "Scrum Master", description: "Помогает команде и организации использовать Scrum эффективно. Scrum Master поддерживает процесс, устраняет препятствия для эффективности Scrum и развивает эмпирический способ работы" },
          { id: "developers", title: "Developers", description: "Создают полезный Increment в каждом Sprint и управляют ежедневным исполнением, которое нужно для достижения Sprint Goal. Scrum ожидает от Developers самоорганизации и коллективной ответственности за поставку" }
        ]
      },
      {
        id: "events",
        label: "Events",
        items: [
          { id: "sprint", title: "Sprint", description: "Timeboxed-контейнер для всей Scrum-работы. Каждый Sprint должен приводить к ценному Increment и повторять рабочий ритм Scrum" },
          { id: "sprintPlanning", title: "Sprint Planning", description: "Определяет, почему Sprint ценен, что можно сделать и как команда начнет это делать" },
          { id: "dailyScrum", title: "Daily Scrum", description: "Короткая ежедневная точка инспекции прогресса по отношению к Sprint Goal и адаптации плана на следующий день" },
          { id: "sprintReview", title: "Sprint Review", description: "Проверяет Increment вместе со стейкхолдерами и корректирует дальнейшее направление на основе результата и обратной связи" },
          { id: "sprintRetrospective", title: "Sprint Retrospective", description: "Анализирует, как команда работала, и определяет улучшения для следующего Sprint. Это главный встроенный механизм улучшения процесса в Scrum" }
        ]
      },
      {
        id: "artifacts",
        label: "Artifacts",
        items: [
          { id: "productBacklog", title: "Product Backlog", description: "Упорядоченный источник будущей продуктовой работы. Он отражает то, что Product Owner в данный момент считает наиболее ценным" },
          { id: "productGoal", title: "Product Goal", description: "Более долгосрочная цель продукта, задающая направление за пределами одного Sprint" },
          { id: "sprintBacklog", title: "Sprint Backlog", description: "Выбранная работа и план достижения Sprint Goal. Это рабочий вид текущего Sprint для команды" },
          { id: "sprintGoal", title: "Sprint Goal", description: "Единая цель, которая придает Sprint-работе внутреннюю связность и позволяет адаптироваться, не теряя направления" },
          { id: "increment", title: "Increment", description: "Полезный результат, создаваемый в ходе Sprint. Он должен быть пригоден для проверки и соответствовать Definition of Done" },
          { id: "definitionOfDone", title: "Definition of Done", description: "Общий стандарт качества, определяющий, когда работа действительно завершена. Он защищает прозрачность, потому что делает done конкретным" }
        ]
      }
    ]
  },
  teamNeeds: {
    title: "Что Scrum требует от команды и организации",
    items: [
      { id: "focusOnSprintGoals", text: "Фокус на целях Sprint вместо постоянного расползания объема работ" },
      { id: "clearBacklogOwnership", text: "Понятная ответственность за бэклог и реальная продуктовая приоритизация" },
      { id: "transparency", text: "Прозрачность по блокерам, прогрессу и качеству" },
      { id: "stakeholderInvolvement", text: "Регулярное участие стейкхолдеров в обсуждении результата и обратной связи" },
      { id: "sprintRhythmDiscipline", text: "Дисциплина, достаточная для поддержания ритма спринтов и качества артефактов" },
      { id: "inspectAndAdaptMindset", text: "Готовность проверять и адаптировать процесс вместо защиты текущего подхода любой ценой" },
      { id: "crossFunctionalCollaboration", text: "Кросс-функциональное сотрудничество, достаточное для создания реального Increment" }
    ],
    callout: {
      id: "practicalNote",
      label: "Практическая заметка",
      description:
        "Scrum — это не имитация занятости и не просто расписание митингов. Она опирается на работающий Increment, ясную ответственность, видимые приоритеты и способность команды учиться из цикла в цикл"
    }
  },
  commonMistakes: {
    title: "Что обычно идет не так",
    items: [
      { id: "fakeScrum", text: "Fake Scrum без реальных ролей" },
      { id: "ceremoniesWithoutAdaptation", text: "Ритуалы без реальной адаптации" },
      { id: "noUsableIncrement", text: "Отсутствие полезного Increment в конце Sprint" },
      { id: "supportFlowForcedIntoSprints", text: "Попытка насильно упаковать непрерывный поток поддержки в Sprint без структуры" },
      { id: "taskDumpBacklog", text: "Product Backlog как неструктурированная свалка задач" },
      { id: "missingSprintGoal", text: "Отсутствующий или игнорируемый Sprint Goal" },
      { id: "weakDefinitionOfDone", text: "Слишком слабый Definition of Done, который не защищает качество" },
      { id: "performanceTheaterReview", text: "Review как показательное мероприятие вместо реальной проверки" },
      { id: "symbolicRetrospective", text: "Retrospective как формальный или необязательный ритуал" }
    ],
    callout: {
      id: "whyTheseMistakesMatter",
      label: "Почему это важно",
      description:
        "Когда команда убирает или выхолащивает базовые элементы Scrum, она продолжает использовать то же имя, но теряет реальную ценность фреймворка. В итоге обычно возникают путаница, низкая прозрачность и поверхностные итерационные ритуалы"
    }
  },
  applicability: {
    title: "Где Scrum подходит лучше всего",
    goodFit: [
      { id: "evolvingRequirements", text: "Требования ожидаемо меняются по ходу поставки" },
      { id: "incrementalDelivery", text: "Продукт можно поставлять инкрементально" },
      { id: "shortStructuredIterations", text: "Команда может удерживать короткие структурированные итерации" },
      { id: "regularFeedback", text: "Регулярная обратная связь от стейкхолдеров действительно нужна" },
      { id: "empiricalControlUseful", text: "Работа достаточно сложная, чтобы эмпирический контроль процесса давал выгоду" },
      { id: "ownershipAndDiscipline", text: "Организация может поддержать ясную ответственность и командную дисциплину" },
      { id: "preferTimeboxedDelivery", text: "Модель поставки с фиксированным ритмом предпочтительнее чистого непрерывного потока" }
    ],
    weakerFit: [
      { id: "fullyFixedRequirements", text: "Требования должны быть полностью зафиксированы до начала реализации" },
      { id: "strictStagedGovernance", text: "Поставкой управляют жесткие стадийные правила или formal acceptance gates" },
      { id: "continuousSupportFlow", text: "Работа приходит как непрерывный поток поддержки, а не как результаты спринтов" },
      { id: "cannotMaintainAccountabilities", text: "Организация не может удерживать базовые Scrum-роли и ответственность" },
      { id: "cannotProduceIncrement", text: "Команда не способна выпускать полезный Increment в рамках одного Sprint" },
      { id: "formalPredictiveControl", text: "Среда требует в первую очередь формального прогнозного планирования и жесткого контроля" },
      { id: "riskFirstExperimentation", text: "Проект прежде всего определяется риск-ориентированным экспериментированием, а не Sprint-based increments" }
    ],
    callout: {
      id: "practicalNote",
      label: "Практическая заметка",
      description:
        "Scrum особенно сильна в адаптивной поставке, где регулярные review-циклы и дисциплина команды дают лучший результат, чем либо тяжелое формальное управление, либо чистый непрерывный поток задач"
    }
  },
  notCoveredHere: {
    title: "Что эта страница не покрывает",
    items: [
      { id: "advancedScaling", text: "Продвинутые модели масштабирования и крупные Scrum-конфигурации на несколько команд" },
      { id: "detailedBacklogEstimation", text: "Подробные техники оценки элементов бэклога" },
      { id: "hybridOperatingModels", text: "Гибридные модели работы Scrum-Kanban" },
      { id: "organizationWideTransformation", text: "Организационные паттерны agile-трансформации на уровне всей компании" },
      { id: "productDiscoveryOutsideScrum", text: "Подходы к исследованию продукта за пределами базовой логики Scrum" },
      { id: "deepImplementationTactics", text: "Глубокие тактики реализации за пределами базового каркаса фреймворка" }
    ]
  },
  studyNext: {
    title: "Что изучать дальше",
    items: [
      { id: "learnCoreFramework", text: "Изучить базовую структуру и словарь Scrum Guide" },
      { id: "usableIncrement", text: "Понять, как в каждом Sprint создается полезный Increment" },
      { id: "backlogAndSprintGoals", text: "Изучить управление бэклогом и проектирование Sprint Goal" },
      { id: "reviewsAndRetrospectives", text: "Разобраться, как Reviews и Retrospectives влияют на проверку результата и улучшение процесса" },
      { id: "compareWithKanban", text: "Сравнить Scrum и Kanban в смешанных продуктовых и сервисных контекстах" },
      { id: "deeperTacticsLater", text: "Переходить к более глубоким тактикам только после того, как базовая логика стабильно работает" }
    ]
  }
};
