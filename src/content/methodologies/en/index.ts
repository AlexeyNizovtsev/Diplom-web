import type { MethodologyContentMap } from "@/types/methodology";

import { gost34MethodologyContent } from "@/content/methodologies/en/gost34";
import { kanbanMethodologyContent } from "@/content/methodologies/en/kanban";
import { rupMethodologyContent } from "@/content/methodologies/en/rup";
import { scrumMethodologyContent } from "@/content/methodologies/en/scrum";
import { spiralMethodologyContent } from "@/content/methodologies/en/spiral";
import { waterfallMethodologyContent } from "@/content/methodologies/en/waterfall";

export const enMethodologyContent: MethodologyContentMap = {
  waterfall: waterfallMethodologyContent,
  spiral: spiralMethodologyContent,
  gost34: gost34MethodologyContent,
  rup: rupMethodologyContent,
  scrum: scrumMethodologyContent,
  kanban: kanbanMethodologyContent
};
