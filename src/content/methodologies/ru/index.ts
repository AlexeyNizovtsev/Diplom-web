import type { MethodologyContentMap } from "@/types/methodology";

import { gost34MethodologyContentRu } from "@/content/methodologies/ru/gost34";
import { kanbanMethodologyContentRu } from "@/content/methodologies/ru/kanban";
import { rupMethodologyContentRu } from "@/content/methodologies/ru/rup";
import { scrumMethodologyContentRu } from "@/content/methodologies/ru/scrum";
import { spiralMethodologyContentRu } from "@/content/methodologies/ru/spiral";
import { waterfallMethodologyContentRu } from "@/content/methodologies/ru/waterfall";

export const ruMethodologyContent: MethodologyContentMap = {
  waterfall: waterfallMethodologyContentRu,
  spiral: spiralMethodologyContentRu,
  gost34: gost34MethodologyContentRu,
  rup: rupMethodologyContentRu,
  scrum: scrumMethodologyContentRu,
  kanban: kanbanMethodologyContentRu
};
