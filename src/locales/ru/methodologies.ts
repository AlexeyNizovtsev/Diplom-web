import type { MethodologiesDictionary } from "@/types/common";

const goodFitTitle = "Подходит, когда";
const weakerFitTitle = "Слабее подходит, когда";

export const methodologies: MethodologiesDictionary = {
  pageIntro: {
    title: "Справочник по методологиям",
    description:
      "Используйте эту страницу как практический reference после рекомендации: что это за метод, с чего начать, что он требует и где подходит."
  },
  tabsLabel: "Вкладки методологий",
  sidebarLabel: "Разделы методологии",
  coreElementsLabel: "Группы базовых элементов",
  firstStepLabelPrefix: "Шаг",
  sections: {
    overview: "Обзор",
    firstSteps: "Первые шаги",
    coreElements: "Базовые элементы",
    teamNeeds: "Что нужно команде",
    commonMistakes: "Типичные ошибки",
    applicability: "Применимость",
    notCoveredHere: "Что не покрыто",
    studyNext: "Что изучать дальше"
  },
  content: {
    waterfall: {
      id: "waterfall",
      title: "Waterfall",
      overview: {
        description: "Поэтапная модель с фиксированными переходами между фазами, formal review points и контролем изменений.",
        signalTags: [
          { id: "staged", label: "Поэтапная поставка" },
          { id: "stable", label: "Стабильный scope" },
          { id: "reviews", label: "Формальные review" }
        ]
      },
      firstSteps: {
        mode: "sequence",
        intro: "Сначала зафиксируйте базовый scope и phase gates, и только потом переходите к детальной поставке.",
        steps: [
          { id: "scope", title: "Определить базовый scope", description: "Согласовать цели, ограничения и критерии приемки." },
          { id: "plan", title: "Разбить работу на фазы", description: "Задать порядок analysis, design, build и test." },
          { id: "gates", title: "Проводить gate review", description: "Переходить дальше только после приемки ключевых результатов.", emphasis: "final" }
        ]
      },
      coreElements: {
        intro: "Waterfall работает лучше всего, когда фазы, документы и gate criteria остаются явными.",
        groups: [
          {
            id: "stages",
            label: "Фазы",
            items: [
              { id: "analysis", title: "Requirements и analysis", description: "Сначала проясняются scope и ожидания по решению." },
              { id: "delivery", title: "Build и test", description: "Работа идет крупными плановыми этапами поставки." }
            ]
          },
          {
            id: "controlGates",
            label: "Контрольные gates",
            items: [
              { id: "exit", title: "Exit criteria", description: "У каждой фазы должно быть четкое определение завершения." },
              { id: "approvals", title: "Approval logic", description: "Стейкхолдеры review выходы фазы до старта следующей." }
            ]
          }
        ]
      },
      teamNeeds: {
        items: [
          { id: "docs", text: "Сильная дисциплина по документации и approvals." },
          { id: "roles", text: "Ясное ownership для requirements, design и sign-off." }
        ]
      },
      commonMistakes: {
        items: [
          { id: "fakeDocs", text: "Считать документы формальностью, а не control tools." },
          { id: "lateChanges", text: "Допускать крупные поздние изменения без formal change control." }
        ]
      },
      applicability: {
        goodFitTitle,
        weakerFitTitle,
        goodFit: [
          { id: "regulated", text: "Требования стабильны и важна traceability." },
          { id: "formal", text: "Formal approvals являются ключевым ограничением поставки." }
        ],
        weakerFit: [
          { id: "volatile", text: "Требования часто меняются по ходу delivery." },
          { id: "discovery", text: "Работа зависит от быстрых experiments и learning loops." }
        ]
      },
      notCoveredHere: {
        items: [
          { id: "portfolio", text: "Дизайн portfolio governance." },
          { id: "hybrids", text: "Подробный hybrid stage-gate tailoring." }
        ]
      },
      studyNext: {
        items: [
          { id: "changeControl", text: "Дизайн change control." },
          { id: "traceability", text: "Практики requirements traceability." }
        ]
      },
      quickFit: {
        summary: "Лучше всего подходит для контекстов со стабильным scope, формальным governance и поэтапной приемкой."
      }
    },
    spiral: {
      id: "spiral",
      title: "Spiral",
      overview: {
        description: "Risk-driven итеративная модель, которая использует learning loops, evaluation и prototypes для снижения неопределенности.",
        signalTags: [
          { id: "risk", label: "Risk-driven циклы" },
          { id: "prototype", label: "Обучение через prototypes" },
          { id: "uncertainty", label: "Высокая неопределенность" }
        ]
      },
      firstSteps: {
        mode: "sequence",
        intro: "Стройте первый loop вокруг самых больших risks, а не вокруг объема features.",
        steps: [
          { id: "risks", title: "Выявить главные risks", description: "Зафиксировать техническую, операционную и stakeholder uncertainty." },
          { id: "loops", title: "Определить цели loops", description: "Понять, что каждый цикл должен проверить или снизить." },
          { id: "review", title: "Оценить и перепланировать", description: "Review, что изменилось, и спроектировать следующий loop.", emphasis: "final" }
        ]
      },
      coreElements: {
        intro: "Spiral держится на явной работе с рисками и оценке каждого loop.",
        groups: [
          {
            id: "riskCycle",
            label: "Цикл рисков",
            items: [
              { id: "identify", title: "Идентификация risks", description: "Каждый loop начинается с главных unknowns." },
              { id: "mitigation", title: "Снижение risks", description: "Работа выбирается так, чтобы уменьшить uncertainty до масштабирования delivery." }
            ]
          },
          {
            id: "evaluationLoop",
            label: "Контур оценки",
            items: [
              { id: "review", title: "Stakeholder review", description: "Каждый loop должен поддерживать конкретное решение." },
              { id: "next", title: "Планирование next loop", description: "Scope переосмысляется после каждой оценки." }
            ]
          }
        ]
      },
      teamNeeds: {
        items: [
          { id: "riskCulture", text: "Команда, которая может открыто обсуждать risk." },
          { id: "expertise", text: "Достаточная глубина для полезных prototypes и experiments." }
        ]
      },
      commonMistakes: {
        items: [
          { id: "generic", text: "Называть любую iteration Spiral без реального risk focus." },
          { id: "skipReview", text: "Пропускать evaluation и двигаться дальше только на intuition." }
        ]
      },
      applicability: {
        goodFitTitle,
        weakerFitTitle,
        goodFit: [
          { id: "uncertain", text: "Техническая или операционная uncertainty высока." },
          { id: "critical", text: "Проект не может позволить себе наивный линейный план." }
        ],
        weakerFit: [
          { id: "routine", text: "Работа рутинная, а uncertainty уже низкая." },
          { id: "rigid", text: "С самого начала обязателен fixed phase plan." }
        ]
      },
      notCoveredHere: {
        items: [
          { id: "safety", text: "Детальная safety-case engineering." },
          { id: "hybrid", text: "Hybrid Spiral governance models." }
        ]
      },
      studyNext: {
        items: [
          { id: "riskReview", text: "Фасилитация risk review." },
          { id: "prototypeStrategy", text: "Стратегия prototypes и design experiments." }
        ]
      },
      quickFit: {
        summary: "Лучше всего подходит для high-risk work, где снижение uncertainty важнее ранней фиксации полного плана."
      }
    },
    gost34: {
      id: "gost34",
      title: "GOST 34",
      overview: {
        description: "Структурированное семейство подходов для system delivery, основанное на stages, formal documentation и acceptance logic.",
        signalTags: [
          { id: "docs", label: "Формальная документация" },
          { id: "acceptance", label: "Контроль приемки" },
          { id: "governed", label: "Управляемая поставка" }
        ]
      },
      firstSteps: {
        mode: "sequence",
        intro: "С самого начала согласуйте границы stages, ownership документов и ожидания по acceptance.",
        steps: [
          { id: "scope", title: "Определить границы системы", description: "Понять, какая система строится и какие formal constraints действуют." },
          { id: "documents", title: "Назначить owners документов", description: "Разложить review и approval responsibility по artifacts." },
          { id: "acceptance", title: "Спланировать путь acceptance", description: "Задать evidence и checkpoints для приемки.", emphasis: "final" }
        ]
      },
      coreElements: {
        intro: "Подход держится на progression по stages, discipline документации и evidence для acceptance.",
        groups: [
          {
            id: "stages",
            label: "Stages",
            items: [
              { id: "early", title: "Ранние stages", description: "Формируют baseline системы и ожидания проекта." },
              { id: "later", title: "Implementation stages", description: "Переводят утвержденную концепцию в реальную delivery и rollout." }
            ]
          },
          {
            id: "acceptance",
            label: "Acceptance logic",
            items: [
              { id: "tests", title: "Acceptance-oriented testing", description: "Tests производят evidence для formal acceptance." },
              { id: "commissioning", title: "Готовность к вводу", description: "Operational readiness важна не меньше, чем completion build." }
            ]
          }
        ]
      },
      teamNeeds: {
        items: [
          { id: "culture", text: "Сильная культура документации и records." },
          { id: "traceability", text: "Способность поддерживать traceability между requirements, outputs и tests." }
        ]
      },
      commonMistakes: {
        items: [
          { id: "surface", text: "Копировать форму документов и игнорировать control logic." },
          { id: "lateAcceptance", text: "Думать о приемке только ближе к концу проекта." }
        ]
      },
      applicability: {
        goodFitTitle,
        weakerFitTitle,
        goodFit: [
          { id: "regulated", text: "Mandatory formal governance и evidence для acceptance." },
          { id: "enterprise", text: "Проект живет в controlled enterprise или public context." }
        ],
        weakerFit: [
          { id: "fast", text: "Команде нужен lightweight discovery и быстрые изменения." },
          { id: "minimalDocs", text: "Организация не может выдерживать discipline по документации." }
        ]
      },
      notCoveredHere: {
        items: [
          { id: "legal", text: "Юридическая интерпретация standard." },
          { id: "templates", text: "Полная библиотека artifact templates." }
        ]
      },
      studyNext: {
        items: [
          { id: "tailoring", text: "Стратегия document tailoring." },
          { id: "acceptancePlanning", text: "Планирование acceptance и commissioning." }
        ]
      },
      quickFit: {
        summary: "Лучше всего подходит для highly governed system work, где критичны formal documentation и контроль приемки."
      }
    },
    rup: {
      id: "rup",
      title: "RUP",
      overview: {
        description: "Итеративная модель, которая соединяет lifecycle phases, architecture focus и явные disciplines для сложных систем.",
        signalTags: [
          { id: "architecture", label: "Architecture-first" },
          { id: "disciplined", label: "Disciplined iterations" },
          { id: "complex", label: "Сложные системы" }
        ]
      },
      firstSteps: {
        mode: "sequence",
        intro: "Сначала задайте lifecycle и architecture plan, а уже потом расширяйте feature delivery.",
        steps: [
          { id: "vision", title: "Зафиксировать vision и use cases", description: "Понять scope и ключевое поведение системы." },
          { id: "phases", title: "Определить lifecycle phases", description: "Задать ожидания для inception, elaboration, construction и transition." },
          { id: "architecture", title: "Рано стабилизировать architecture", description: "Снизить architecture risk до full construction.", emphasis: "final" }
        ]
      },
      coreElements: {
        intro: "RUP получает ценность из architecture-centric lifecycle discipline, а не просто из iteration.",
        groups: [
          {
            id: "phases",
            label: "Фазы",
            items: [
              { id: "early", title: "Inception и elaboration", description: "Формируют business case и architecture baseline." },
              { id: "later", title: "Construction и transition", description: "Масштабируют delivery и готовят controlled rollout." }
            ]
          },
          {
            id: "practices",
            label: "Практики",
            items: [
              { id: "architecture", title: "Architecture-centric planning", description: "Architecture рассматривается как delivery driver." },
              { id: "artifacts", title: "Discipline по artifacts", description: "Ключевые artifacts синхронизируют analysis, design, build и test." }
            ]
          }
        ]
      },
      teamNeeds: {
        items: [
          { id: "leadership", text: "Сильное architecture и technical leadership." },
          { id: "discipline", text: "Команды, способные держать iterations структурированными." }
        ]
      },
      commonMistakes: {
        items: [
          { id: "heavy", text: "Сохранять все возможные artifacts вместо tailoring процесса." },
          { id: "lateArchitecture", text: "Слишком поздно работать с architecture risk." }
        ]
      },
      applicability: {
        goodFitTitle,
        weakerFitTitle,
        goodFit: [
          { id: "architectureRisk", text: "Architecture complexity нужно снижать рано." },
          { id: "structuredIteration", text: "Организации нужна iteration с более сильной структурой." }
        ],
        weakerFit: [
          { id: "small", text: "Команда слишком маленькая для такого process overhead." },
          { id: "simple", text: "Система достаточно проста для более легкого метода." }
        ]
      },
      notCoveredHere: {
        items: [
          { id: "catalog", text: "Полный каталог artifacts." },
          { id: "tooling", text: "Tool-specific implementation guidance." }
        ]
      },
      studyNext: {
        items: [
          { id: "reviews", text: "Практики architecture review." },
          { id: "iterationPlanning", text: "Планирование iterations и milestones." }
        ]
      },
      quickFit: {
        summary: "Лучше всего подходит для сложных систем, где нужна iterative delivery с сильной architecture и lifecycle discipline."
      }
    },
    scrum: {
      id: "scrum",
      title: "Scrum",
      overview: {
        description: "Timeboxed adaptive framework с sprint cadence, явными roles и регулярной inspection.",
        signalTags: [
          { id: "sprints", label: "Timeboxed sprints" },
          { id: "feedback", label: "Регулярная обратная связь" },
          { id: "adaptive", label: "Adaptive planning" }
        ]
      },
      firstSteps: {
        mode: "sequence",
        intro: "Начинайте с roles, backlog discipline и sprint rhythm, который команда реально выдержит.",
        steps: [
          { id: "roles", title: "Назначить core roles", description: "Прояснить product ownership, delivery responsibility и facilitation." },
          { id: "backlog", title: "Собрать usable backlog", description: "Создать ordered backlog с видимыми priorities." },
          { id: "loop", title: "Запустить inspect-and-adapt loops", description: "Использовать sprint review и retrospective для улучшения следующего цикла.", emphasis: "final" }
        ]
      },
      coreElements: {
        intro: "Scrum остается целостным, когда roles, events и artifacts усиливают один operating loop.",
        groups: [
          {
            id: "roles",
            label: "Roles",
            items: [
              { id: "owner", title: "Product Owner", description: "Отвечает за ordering backlog и value decisions." },
              { id: "team", title: "Scrum Team", description: "Поставляет increments и улучшает способ работы." }
            ]
          },
          {
            id: "events",
            label: "Events и artifacts",
            items: [
              { id: "planning", title: "Planning и review", description: "Связывают sprint goals с stakeholder feedback." },
              { id: "backlog", title: "Backlog и increment", description: "Делают work видимой, а outcomes inspectable." }
            ]
          }
        ]
      },
      teamNeeds: {
        items: [
          { id: "ownership", text: "Настоящее product ownership и authority над backlog." },
          { id: "cadence", text: "Команда, способная держать надежный sprint rhythm." }
        ]
      },
      commonMistakes: {
        items: [
          { id: "fakeScrum", text: "Сохранять ceremonies, но убрать реальные roles." },
          { id: "retro", text: "Проводить retrospective без изменения поведения команды." }
        ]
      },
      applicability: {
        goodFitTitle,
        weakerFitTitle,
        goodFit: [
          { id: "adaptive", text: "Требования развиваются, а частый feedback реально улучшает направление." },
          { id: "crossFunctional", text: "Cross-functional команда может поставлять usable increments." }
        ],
        weakerFit: [
          { id: "interrupts", text: "Команда не может защитить sprint commitments от постоянных interrupts." },
          { id: "formal", text: "Formal approvals доминируют на каждом шаге поставки." }
        ]
      },
      notCoveredHere: {
        items: [
          { id: "scaled", text: "Scaled Scrum frameworks." },
          { id: "transformation", text: "Организационная agile transformation." }
        ]
      },
      studyNext: {
        items: [
          { id: "refinement", text: "Практики backlog refinement." },
          { id: "goals", text: "Дизайн sprint goals." }
        ]
      },
      quickFit: {
        summary: "Лучше всего подходит для adaptive product work с короткими структурированными inspect-and-adapt cycles."
      }
    },
    kanban: {
      id: "kanban",
      title: "Kanban",
      overview: {
        description: "Flow-oriented подход, который визуализирует work, ограничивает WIP и улучшает систему через flow metrics.",
        signalTags: [
          { id: "flow", label: "Непрерывный flow" },
          { id: "wip", label: "WIP limits" },
          { id: "service", label: "Service-oriented delivery" }
        ]
      },
      firstSteps: {
        mode: "sequence",
        intro: "Сделайте workflow видимым и возьмите под контроль work-in-progress до попыток ускорить все сразу.",
        steps: [
          { id: "map", title: "Смоделировать workflow", description: "Показать реальные стадии work на общей board." },
          { id: "limits", title: "Настроить WIP limits", description: "Ограничить объем work in progress." },
          { id: "metrics", title: "Смотреть flow metrics", description: "Использовать aging work и cycle time для улучшения системы.", emphasis: "final" }
        ]
      },
      coreElements: {
        intro: "Kanban — это больше, чем board. Сила подхода в flow policies и измеримом поведении системы.",
        groups: [
          {
            id: "boardStructure",
            label: "Структура board",
            items: [
              { id: "states", title: "Workflow states", description: "Колонки должны отражать meaningful states of work." },
              { id: "policies", title: "Pull policies", description: "Правила определяют, когда work может двигаться и что значит done." }
            ]
          },
          {
            id: "flowMetrics",
            label: "Управление flow",
            items: [
              { id: "wip", title: "WIP limits", description: "WIP limits подсвечивают overload и заставляют приоритизировать." },
              { id: "metrics", title: "Cycle time и aging", description: "Метрики показывают, где flow застревает." }
            ]
          }
        ]
      },
      teamNeeds: {
        items: [
          { id: "visibility", text: "Готовность показывать реальные workflow problems." },
          { id: "discipline", text: "Дисциплина соблюдать pull rules и WIP limits." }
        ]
      },
      commonMistakes: {
        items: [
          { id: "boardOnly", text: "Использовать board без изменения work policies." },
          { id: "ignoreMetrics", text: "Говорить о flow без измерения bottlenecks." }
        ]
      },
      applicability: {
        goodFitTitle,
        weakerFitTitle,
        goodFit: [
          { id: "serviceFlow", text: "Work приходит непрерывно, а priorities могут часто меняться." },
          { id: "support", text: "Service, maintenance или platform work требуют видимого контроля flow." }
        ],
        weakerFit: [
          { id: "timebox", text: "Организации нужны жесткие sprint-style timeboxes." },
          { id: "hidden", text: "Команда не готова показывать реальные workflow stages и overload." }
        ]
      },
      notCoveredHere: {
        items: [
          { id: "portfolio", text: "Дизайн Portfolio Kanban." },
          { id: "forecasting", text: "Advanced probabilistic forecasting." }
        ]
      },
      studyNext: {
        items: [
          { id: "wipDesign", text: "Дизайн WIP policies." },
          { id: "flowReview", text: "Фасилитация flow review." }
        ]
      },
      quickFit: {
        summary: "Лучше всего подходит для continuous work systems, которым нужны visible flow, WIP control и устойчивое improvement."
      }
    }
  }
};
