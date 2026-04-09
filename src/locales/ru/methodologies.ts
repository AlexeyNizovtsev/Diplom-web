import type { MethodologiesDictionary } from "@/types/common";

export const methodologies: MethodologiesDictionary = {
  pageIntro: {
    title: "Справочник методологий",
    description:
      "Используйте эту страницу как практический справочник после рекомендации: что это за метод, как начать, что он требует и где подходит лучше всего"
  },
  tabsLabel: "Вкладки методологий",
  sidebarLabel: "Разделы методологии",
  coreElementsLabel: "Группы ключевых элементов",
  firstStepLabelPrefix: "Шаг",
  applicabilityLabels: {
    goodFit: "Подходит, когда",
    weakerFit: "Слабее подходит, когда"
  },
  sections: {
    overview: "Обзор",
    firstSteps: "Первые шаги",
    coreElements: "Ключевые элементы",
    teamNeeds: "Что нужно команде",
    commonMistakes: "Частые ошибки",
    applicability: "Применимость",
    notCoveredHere: "Что не покрыто",
    studyNext: "Что изучать дальше"
  }
};
