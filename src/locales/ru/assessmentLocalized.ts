import type { AssessmentDictionary } from "@/types/common";

export const assessment: AssessmentDictionary = {
  pageTitle: "Начать оценку",
  backPageLabel: "Назад",
  introCard: {
    title: "Подберите наиболее подходящую методологию разработки",
    description: [
      "Ответьте на короткую структурированную оценку контекста вашего проекта",
      "Система ранжирует шесть методологий и объяснит, почему верхняя рекомендация подходит лучше всего"
    ],
    stats: {
      format: {
        label: "Формат",
        value: "6 блоков"
      },
      duration: {
        label: "Длительность",
        value: "3-5 мин"
      }
    },
    beforeYouStartTitle: "Перед началом",
    beforeYouStartItems: [
      "Отвечайте, исходя из проекта в его текущем состоянии, а не из идеального сценария",
      "Ответы сохраняются автоматически по мере прохождения блоков",
      "Позже вы сможете вернуться к результату по сохраненному коду результата"
    ],
    primaryCta: "Начать оценку",
    resumeCta: "Продолжить оценку",
    resumeHint: "Продолжить с {blockLabel}"
  },
  blockPlaceholder: {
    eyebrow: "Блок оценки",
    title: "Заглушка для потока анкеты",
    description:
      "Этот маршрут зарезервирован под конфигурируемый поток блоков на /assessment/block/[blockId]",
    blockIdLabel: "Запрошенный блок",
    nextStepTitle: "Следующий шаг",
    nextStepItems: [
      "Отрисовать каждый блок из конфигурации анкеты вместо временной заглушки",
      "Добавить прогресс по блокам, валидацию и навигацию назад или далее",
      "Сохранять ответы локально и восстанавливать последний блок при повторном открытии"
    ],
    returnToIntro: "Вернуться к введению"
  },
  questionnaire: {
    eyebrow: "Прохождение оценки",
    title: "Assessment",
    description:
      "Отвечайте по одному блоку за раз. Каждый блок фиксирует отдельный сигнал о проекте, который позже повлияет на рекомендацию.",
    progressLabel: "Блок {current} из {total}",
    questionLabel: "Вопрос",
    selectionLabel: "Выбрано",
    autosaveNote: "Ответы сохраняются автоматически",
    validationMessage: "Заполните все вопросы в текущем блоке, чтобы перейти дальше.",
    actions: {
      back: "Назад",
      nextBlock: "Следующий блок",
      finishAssessment: "Завершить оценку",
      returnToIntro: "Вернуться к введению"
    },
    blockOrderLabels: {
      governance: "Блок 1 из 6",
      requirements: "Блок 2 из 6",
      risk: "Блок 3 из 6",
      iteration: "Блок 4 из 6",
      discipline: "Блок 5 из 6",
      complexity: "Блок 6 из 6"
    }
  }
};
