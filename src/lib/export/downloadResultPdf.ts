import { questionnaireConfig } from "@/config/questionnaire";
import { getQuestionnaireContent } from "@/content/questionnaire";
import { getRecommendationInterpretation } from "@/features/results/resultsPresentation";
import { downloadBlob } from "@/lib/export/downloadBlob";
import { getResultExportFilename } from "@/lib/export/downloadResultJson";
import { methodologyDimensionTargets } from "@/lib/result/rankMethodologies";
import { getMethodologyRole } from "@/lib/result/methodologyRoles";
import type { Locale, ResultsDictionary } from "@/types/common";
import type { DimensionKey } from "@/types/questionnaire";
import type {
  AssessmentResult,
  FitTier,
  ResultExportDocument,
} from "@/types/result";

const PAGE_WIDTH = 1240;
const PAGE_HEIGHT = 1754;
const PAGE_MARGIN_X = 68;
const PAGE_MARGIN_TOP = 64;
const PAGE_MARGIN_BOTTOM = 56;
const CONTENT_WIDTH = PAGE_WIDTH - PAGE_MARGIN_X * 2;

const GRID_GAP = 24;
const CARD_PADDING = 24;
const CARD_RADIUS = 14;
const SECTION_GAP = 28;
const TABLE_ROW_GAP = 12;

const COLORS = {
  page: "#f7f3ee",
  surface: "#fffdfa",
  panel: "#f2ece6",
  line: "#d8d0c7",
  text: "#1b1f24",
  muted: "#5f6670",
  accent: "#8d5b2a",
  dark: "#17202a",
  soft: "#e7dfd6",
  softBlue: "#d7e3ef",
};

interface Page {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
}

interface TextStyle {
  size: number;
  lineHeight: number;
  weight?: 400 | 500 | 600 | 700;
  color?: string;
  maxLines?: number;
  minSize?: number;
  shrinkToFit?: boolean;
}

interface MeasuredText {
  lines: string[];
  size: number;
  lineHeight: number;
  width: number;
  height: number;
}

interface MeasuredBadge {
  text: MeasuredText;
  width: number;
  height: number;
}

interface MetadataCardMeasure {
  label: MeasuredText;
  value: MeasuredText;
  height: number;
}

interface ChipMeasure {
  label: string;
  width: number;
  height: number;
  text: MeasuredText;
}

interface ChipPlacement extends ChipMeasure {
  x: number;
  y: number;
}

interface ChipRowsMeasure {
  chips: ChipPlacement[];
  height: number;
}

interface ColumnCard {
  measure: (ctx: CanvasRenderingContext2D, width: number) => number;
  draw: (
    page: Page,
    x: number,
    y: number,
    width: number,
    height: number,
  ) => void;
}

interface DimensionDecisionEffect {
  currentSignal: string;
  supportingMethodology: string;
  decisionWeight: string;
  explanation: string;
}

interface QuestionnaireLookupEntry {
  blockTitle: string;
  questionTitle: string;
  optionLabel?: string;
  optionDescription?: string;
}

function createPage(): Page {
  const canvas = window.document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Canvas 2D context is unavailable.");
  }

  canvas.width = PAGE_WIDTH;
  canvas.height = PAGE_HEIGHT;
  ctx.fillStyle = COLORS.page;
  ctx.fillRect(0, 0, PAGE_WIDTH, PAGE_HEIGHT);
  ctx.textBaseline = "top";

  return { canvas, ctx };
}

function normalizeText(text?: string) {
  return text?.replace(/\s+/g, " ").trim() ?? "";
}

function setFont(
  ctx: CanvasRenderingContext2D,
  size: number,
  weight: 400 | 500 | 600 | 700 = 400,
) {
  ctx.font = `${weight} ${size}px Arial, "Segoe UI", sans-serif`;
}

function splitLongToken(
  ctx: CanvasRenderingContext2D,
  token: string,
  maxWidth: number,
  size: number,
  weight: 400 | 500 | 600 | 700,
) {
  setFont(ctx, size, weight);

  if (ctx.measureText(token).width <= maxWidth) {
    return [token];
  }

  const chunks: string[] = [];
  let current = "";

  for (const character of token) {
    const candidate = `${current}${character}`;

    if (current && ctx.measureText(candidate).width > maxWidth) {
      chunks.push(current);
      current = character;
      continue;
    }

    current = candidate;
  }

  if (current) {
    chunks.push(current);
  }

  return chunks;
}

function trimLineToWidth(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  size: number,
  weight: 400 | 500 | 600 | 700,
) {
  setFont(ctx, size, weight);
  const ellipsis = "...";

  if (ctx.measureText(`${text}${ellipsis}`).width <= maxWidth) {
    return `${text}${ellipsis}`;
  }

  let trimmed = text;

  while (trimmed.length > 0) {
    trimmed = trimmed.slice(0, -1).trimEnd();

    if (ctx.measureText(`${trimmed}${ellipsis}`).width <= maxWidth) {
      return `${trimmed}${ellipsis}`;
    }
  }

  return ellipsis;
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  size: number,
  weight: 400 | 500 | 600 | 700 = 400,
) {
  const normalized = normalizeText(text);

  if (!normalized) {
    return [];
  }

  const words = normalized
    .split(" ")
    .flatMap((word) => splitLongToken(ctx, word, maxWidth, size, weight));

  setFont(ctx, size, weight);

  const lines: string[] = [];
  let current = "";

  words.forEach((word) => {
    const candidate = current ? `${current} ${word}` : word;

    if (!current || ctx.measureText(candidate).width <= maxWidth) {
      current = candidate;
      return;
    }

    lines.push(current);
    current = word;
  });

  if (current) {
    lines.push(current);
  }

  return lines;
}

function clampLines(
  ctx: CanvasRenderingContext2D,
  lines: string[],
  maxWidth: number,
  size: number,
  weight: 400 | 500 | 600 | 700,
  maxLines?: number,
) {
  if (!maxLines || lines.length <= maxLines) {
    return lines;
  }

  const clamped = lines.slice(0, maxLines);
  clamped[maxLines - 1] = trimLineToWidth(
    ctx,
    clamped[maxLines - 1] ?? "",
    maxWidth,
    size,
    weight,
  );

  return clamped;
}

function measureTextBlock(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  style: TextStyle,
): MeasuredText {
  const normalized = normalizeText(text);

  if (!normalized || maxWidth <= 0) {
    return {
      lines: [],
      size: style.size,
      lineHeight: style.lineHeight,
      width: 0,
      height: 0,
    };
  }

  let size = style.size;
  let lineHeight = style.lineHeight;
  const weight = style.weight ?? 400;
  const minSize = style.minSize ?? style.size;
  let lines = wrapText(ctx, normalized, maxWidth, size, weight);

  if (style.shrinkToFit) {
    while (size > minSize && style.maxLines && lines.length > style.maxLines) {
      size -= 1;
      lineHeight = Math.max(size + 4, lineHeight - 1);
      lines = wrapText(ctx, normalized, maxWidth, size, weight);
    }
  }

  const finalLines = clampLines(
    ctx,
    lines,
    maxWidth,
    size,
    weight,
    style.maxLines,
  );

  setFont(ctx, size, weight);

  return {
    lines: finalLines,
    size,
    lineHeight,
    width: finalLines.reduce(
      (max, line) => Math.max(max, ctx.measureText(line).width),
      0,
    ),
    height: finalLines.length * lineHeight,
  };
}

function drawMeasuredText(
  ctx: CanvasRenderingContext2D,
  measured: MeasuredText,
  x: number,
  y: number,
  color = COLORS.text,
) {
  setFont(ctx, measured.size, 400);
  ctx.fillStyle = color;
  measured.lines.forEach((line, index) => {
    ctx.fillText(line, x, y + index * measured.lineHeight);
  });

  return measured.height;
}

function drawText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  style: TextStyle,
) {
  const measured = measureTextBlock(ctx, text, maxWidth, style);

  setFont(ctx, measured.size, style.weight);
  ctx.fillStyle = style.color ?? COLORS.text;
  measured.lines.forEach((line, index) => {
    ctx.fillText(line, x, y + index * measured.lineHeight);
  });

  return measured.height;
}

function roundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius = CARD_RADIUS,
) {
  const safeRadius = Math.min(radius, width / 2, height / 2);

  ctx.beginPath();
  ctx.moveTo(x + safeRadius, y);
  ctx.lineTo(x + width - safeRadius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + safeRadius);
  ctx.lineTo(x + width, y + height - safeRadius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - safeRadius, y + height);
  ctx.lineTo(x + safeRadius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - safeRadius);
  ctx.lineTo(x, y + safeRadius);
  ctx.quadraticCurveTo(x, y, x + safeRadius, y);
  ctx.closePath();
}

function drawBox(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  fill = COLORS.surface,
  stroke = COLORS.line,
  radius = CARD_RADIUS,
) {
  roundedRect(ctx, x, y, width, height, radius);
  ctx.fillStyle = fill;
  ctx.fill();
  ctx.strokeStyle = stroke;
  ctx.lineWidth = 1.5;
  ctx.stroke();
}

function drawRule(ctx: CanvasRenderingContext2D, x: number, y: number, width: number) {
  ctx.strokeStyle = COLORS.line;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + width, y);
  ctx.stroke();
}

function measureBadge(
  ctx: CanvasRenderingContext2D,
  label: string,
  maxWidth = 240,
) {
  const text = measureTextBlock(ctx, label, maxWidth - 24, {
    size: 11,
    lineHeight: 13,
    weight: 700,
    maxLines: 2,
    minSize: 10,
    shrinkToFit: true,
  });

  return {
    text,
    width: Math.max(72, Math.min(maxWidth, text.width + 24)),
    height: Math.max(30, text.height + 12),
  } satisfies MeasuredBadge;
}

function drawBadge(
  ctx: CanvasRenderingContext2D,
  label: string,
  x: number,
  y: number,
  fill: string,
  color: string,
  maxWidth = 240,
) {
  const badge = measureBadge(ctx, label, maxWidth);

  drawBox(ctx, x, y, badge.width, badge.height, fill, fill, 999);

  setFont(ctx, badge.text.size, 700);
  ctx.fillStyle = color;
  badge.text.lines.forEach((line, index) => {
    const lineWidth = ctx.measureText(line).width;
    ctx.fillText(
      line,
      x + (badge.width - lineWidth) / 2,
      y + (badge.height - badge.text.height) / 2 + index * badge.text.lineHeight,
    );
  });

  return badge;
}

function fitPalette(fitTier: FitTier) {
  if (fitTier === "bestFit") {
    return { fill: COLORS.dark, color: "#ffffff" };
  }

  if (fitTier === "strongAlternative") {
    return { fill: COLORS.softBlue, color: "#203040" };
  }

  if (fitTier === "moderateFit") {
    return { fill: "#ece8e2", color: "#4f5863" };
  }

  return { fill: "#f0ece6", color: "#646c75" };
}

function roleLabel(
  role: ReturnType<typeof getMethodologyRole>,
  content: ResultsDictionary,
) {
  return content.interpretation.roleLabels?.[role] ?? role.replaceAll("_", " ");
}

function strongestDimensions(
  result: AssessmentResult,
  methodologyId: string,
  count = 2,
) {
  const item = result.ranking.find((entry) => entry.methodologyId === methodologyId);

  return (
    item?.dimensionHighlights
      .slice(0, count)
      .map(
        (dimension) =>
          result.dimensions.find(
            (entry) => entry.dimensionKey === dimension.dimensionKey,
          )?.labelText ?? dimension.dimensionKey,
      ) ?? []
  );
}

function topDrivers(result: AssessmentResult) {
  const top = result.ranking[0];

  if (!top) {
    return [];
  }

  return [
    ...top.signalTags.map((tag) => tag.labelText ?? tag.labelKey),
    ...strongestDimensions(result, top.methodologyId, 2),
  ].slice(0, 5);
}

function prettifyKey(value: string) {
  return value
    .replaceAll(".", " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^./, (letter) => letter.toUpperCase());
}

function getResultLocale(result: AssessmentResult): Locale {
  return result.metadata?.locale ?? "en";
}

function getQuestionnaireLookup(
  result: AssessmentResult,
): Record<string, QuestionnaireLookupEntry> {
  const questionnaireContent = getQuestionnaireContent(getResultLocale(result));
  const lookup: Record<string, QuestionnaireLookupEntry> = {};

  questionnaireConfig.blocks.forEach((block) => {
    const localizedBlock = questionnaireContent.blocks[block.id];

    block.questions.forEach((question) => {
      const localizedQuestion = localizedBlock.questions[question.id];

      question.options.forEach((option) => {
        const localizedOption = localizedQuestion.options[option.id];

        lookup[`${question.id}:${option.id}`] = {
          blockTitle: localizedBlock.title,
          questionTitle: localizedQuestion.title,
          optionLabel: localizedOption.label,
          optionDescription: localizedOption.description,
        };
      });

      if (!lookup[question.id]) {
        lookup[question.id] = {
          blockTitle: localizedBlock.title,
          questionTitle: localizedQuestion.title,
        };
      }
    });
  });

  return lookup;
}

function getFitLabel(fitTier: FitTier, content: ResultsDictionary) {
  return content.fitLabels[fitTier];
}

function getReadableSignalLabel(result: AssessmentResult, signalKey: string) {
  const lookup = getQuestionnaireLookup(result);
  const question = lookup[signalKey];

  return question?.questionTitle ?? prettifyKey(signalKey);
}

function getTraceabilityText(result: AssessmentResult, questionId: string) {
  const answer = result.answerSnapshot?.[questionId];

  if (!answer) {
    return "";
  }

  const lookup = getQuestionnaireLookup(result);
  const selectedEntry = lookup[`${questionId}:${answer.selectedOptionId}`];

  return answer.resolvedSignalMapping
    .map((mapping) => {
      const dimensionLabel =
        result.dimensions.find(
          (dimension) => dimension.dimensionKey === mapping.target,
        )?.labelText ?? prettifyKey(mapping.target);
      const readableSignal =
        selectedEntry?.optionDescription ??
        selectedEntry?.optionLabel ??
        getReadableSignalLabel(result, mapping.signalKey);

      return `${dimensionLabel}: ${mapping.value}/3 - ${readableSignal}`;
    })
    .join(" / ");
}

function getSupportingMethodology(
  result: AssessmentResult,
  dimensionKey: DimensionKey,
) {
  const actual =
    result.dimensions.find((entry) => entry.dimensionKey === dimensionKey)?.level ?? 0;
  const rankedByDistance = result.ranking
    .map((item) => {
      const targets = methodologyDimensionTargets[item.methodologyId] as Record<
        DimensionKey,
        number
      >;

      return {
        item,
        distance: Math.abs(targets[dimensionKey] - actual),
      };
    })
    .sort((left, right) => left.distance - right.distance || left.item.rank - right.item.rank);

  return {
    winner: rankedByDistance[0],
    runnerUp: rankedByDistance[1],
  };
}

function getDecisionWeightLabel(
  gap: number,
  content: ResultsDictionary,
) {
  if (gap >= 2) {
    return content.export.report.decisiveLabel;
  }

  if (gap === 1) {
    return content.export.report.supportiveLabel;
  }

  return content.export.report.neutralLabel;
}

function getDimensionDecisionEffect(
  result: AssessmentResult,
  dimension: AssessmentResult["dimensions"][number],
  content: ResultsDictionary,
): DimensionDecisionEffect {
  const top = result.ranking[0];
  const { winner, runnerUp } = getSupportingMethodology(
    result,
    dimension.dimensionKey,
  );
  const gap = Math.max(0, (runnerUp?.distance ?? winner?.distance ?? 0) - (winner?.distance ?? 0));
  const supportingMethodology =
    winner?.item.methodologyTitle ?? winner?.item.methodologyId ?? "";
  const topMethodology = top?.methodologyTitle ?? top?.methodologyId ?? "";
  const weight = getDecisionWeightLabel(gap, content);
  const explanation =
    supportingMethodology === topMethodology
      ? `${supportingMethodology} aligns most directly with this current level.`
      : `${supportingMethodology} would strengthen if this dimension became more dominant than the current top-fit pattern.`;

  return {
    currentSignal:
      dimension.summaryText ??
      `${dimension.labelText ?? dimension.dimensionKey} is currently assessed at ${dimension.level}/3.`,
    supportingMethodology,
    decisionWeight: weight,
    explanation,
  };
}

function getDimensionShiftText(
  result: AssessmentResult,
  methodologyId: AssessmentResult["ranking"][number]["methodologyId"],
) {
  const actualLevels = Object.fromEntries(
    result.dimensions.map((dimension) => [dimension.dimensionKey, dimension.level]),
  ) as Record<DimensionKey, number>;
  const targets = methodologyDimensionTargets[methodologyId] as Record<
    DimensionKey,
    number
  >;
  const shifts = result.dimensions
    .map((dimension) => ({
      label: dimension.labelText ?? dimension.dimensionKey,
      target: targets[dimension.dimensionKey],
      current: actualLevels[dimension.dimensionKey],
      distance: Math.abs(targets[dimension.dimensionKey] - actualLevels[dimension.dimensionKey]),
    }))
    .filter((entry) => entry.distance > 0)
    .sort((left, right) => right.distance - left.distance)
    .slice(0, 2);

  if (shifts.length === 0) {
    return "The current dimension profile already closely matches this methodology.";
  }

  return `It rises if ${shifts
    .map((entry) => `${entry.label} shifts toward ${entry.target}/3`)
    .join(" and ")}.`;
}

function buildComparisonInsight(
  result: AssessmentResult,
  item: AssessmentResult["ranking"][number],
  content: ResultsDictionary,
) {
  const role = roleLabel(getMethodologyRole(item.methodologyId), content);
  const strongest = strongestDimensions(result, item.methodologyId, 2).join(" / ");

  return `${item.methodologyTitle ?? item.methodologyId} emphasizes ${role} and is most aligned on ${strongest}.`;
}

function getLowestFitPattern(
  result: AssessmentResult,
  content: ResultsDictionary,
) {
  const item = result.ranking[result.ranking.length - 1];

  if (!item) {
    return "";
  }

  return `${item.methodologyTitle ?? item.methodologyId}: ${
    item.tradeoffText ?? content.narrative.outcomeCautionTexts[item.methodologyId]
  }`;
}

function answerTrace(result: AssessmentResult, questionId: string) {
  return getTraceabilityText(result, questionId);
}

function measureMetadataCard(
  ctx: CanvasRenderingContext2D,
  label: string,
  value: string,
  width: number,
) {
  const labelMeasure = measureTextBlock(ctx, label, width - 28, {
    size: 11,
    lineHeight: 14,
    weight: 700,
    color: COLORS.muted,
    maxLines: 2,
    minSize: 10,
    shrinkToFit: true,
  });
  const valueMeasure = measureTextBlock(ctx, value, width - 28, {
    size: 13,
    lineHeight: 17,
    weight: 600,
    maxLines: 3,
    minSize: 11,
    shrinkToFit: true,
  });

  return {
    label: labelMeasure,
    value: valueMeasure,
    height: 14 + labelMeasure.height + 8 + valueMeasure.height + 14,
  } satisfies MetadataCardMeasure;
}

function drawMetadataCard(
  page: Page,
  item: ResultExportDocument["metadata"][number],
  x: number,
  y: number,
  width: number,
  height: number,
) {
  const measure = measureMetadataCard(page.ctx, item.label, item.value, width);

  drawBox(page.ctx, x, y, width, height, COLORS.surface, COLORS.line, 12);
  drawMeasuredText(page.ctx, measure.label, x + 14, y + 14, COLORS.muted);
  drawMeasuredText(
    page.ctx,
    measure.value,
    x + 14,
    y + 14 + measure.label.height + 8,
    COLORS.text,
  );
}

function measureSectionLead(
  ctx: CanvasRenderingContext2D,
  title: string,
  description: string,
  width: number,
) {
  const titleMeasure = measureTextBlock(ctx, title, width, {
    size: 28,
    lineHeight: 34,
    weight: 700,
    maxLines: 3,
    minSize: 24,
    shrinkToFit: true,
  });
  const descriptionMeasure = measureTextBlock(ctx, description, width, {
    size: 15,
    lineHeight: 22,
    color: COLORS.muted,
    maxLines: 4,
    minSize: 13,
    shrinkToFit: true,
  });

  return {
    title: titleMeasure,
    description: descriptionMeasure,
    height:
      titleMeasure.height +
      (descriptionMeasure.height > 0 ? 12 + descriptionMeasure.height : 0),
  };
}

function drawSectionLead(
  page: Page,
  title: string,
  description: string,
  y = PAGE_MARGIN_TOP,
) {
  const measure = measureSectionLead(page.ctx, title, description, CONTENT_WIDTH);

  drawMeasuredText(page.ctx, measure.title, PAGE_MARGIN_X, y, COLORS.text);

  if (measure.description.height > 0) {
    drawMeasuredText(
      page.ctx,
      measure.description,
      PAGE_MARGIN_X,
      y + measure.title.height + 12,
      COLORS.muted,
    );
  }

  return y + measure.height + SECTION_GAP;
}

function measureBoxSectionHeader(
  ctx: CanvasRenderingContext2D,
  width: number,
  label: string,
  title?: string,
) {
  const labelMeasure = measureTextBlock(ctx, label, width, {
    size: 12,
    lineHeight: 16,
    weight: 700,
    color: COLORS.accent,
    maxLines: 2,
    minSize: 10,
    shrinkToFit: true,
  });
  const titleMeasure = title
    ? measureTextBlock(ctx, title, width, {
        size: 20,
        lineHeight: 25,
        weight: 700,
        maxLines: 3,
        minSize: 16,
        shrinkToFit: true,
      })
    : undefined;

  return {
    label: labelMeasure,
    title: titleMeasure,
    height:
      labelMeasure.height +
      (titleMeasure ? 8 + titleMeasure.height : 0),
  };
}

function drawBoxSectionHeader(
  page: Page,
  x: number,
  y: number,
  width: number,
  label: string,
  title?: string,
) {
  const measure = measureBoxSectionHeader(page.ctx, width, label, title);

  drawMeasuredText(page.ctx, measure.label, x, y, COLORS.accent);

  if (measure.title) {
    drawMeasuredText(
      page.ctx,
      measure.title,
      x,
      y + measure.label.height + 8,
      COLORS.text,
    );
  }

  return measure.height;
}

function measureInsightCard(
  ctx: CanvasRenderingContext2D,
  width: number,
  label: string,
  title: string,
  body: string,
) {
  const header = measureBoxSectionHeader(ctx, width - CARD_PADDING * 2, label, title);
  const copy = measureTextBlock(ctx, body, width - CARD_PADDING * 2, {
    size: 14,
    lineHeight: 20,
    color: COLORS.muted,
    maxLines: 7,
    minSize: 12,
    shrinkToFit: true,
  });

  return {
    header,
    copy,
    height: CARD_PADDING + header.height + 12 + copy.height + CARD_PADDING,
  };
}

function drawInsightCard(
  page: Page,
  x: number,
  y: number,
  width: number,
  label: string,
  title: string,
  body: string,
  fill = COLORS.surface,
) {
  const measure = measureInsightCard(page.ctx, width, label, title, body);

  drawBox(page.ctx, x, y, width, measure.height, fill, COLORS.line);
  let cursorY = y + CARD_PADDING;
  cursorY += drawBoxSectionHeader(
    page,
    x + CARD_PADDING,
    cursorY,
    width - CARD_PADDING * 2,
    label,
    title,
  );
  cursorY += 12;
  drawMeasuredText(page.ctx, measure.copy, x + CARD_PADDING, cursorY, COLORS.muted);

  return measure.height;
}

function measureBulletList(
  ctx: CanvasRenderingContext2D,
  items: string[],
  width: number,
  style: TextStyle,
) {
  const bulletWidth = 18;
  const gap = 10;
  const measures = items.map((item) =>
    measureTextBlock(ctx, item, width - bulletWidth, style),
  );

  return {
    items: measures,
    bulletWidth,
    gap,
    height: measures.reduce(
      (sum, item, index) => sum + item.height + (index === 0 ? 0 : gap),
      0,
    ),
  };
}

function drawBulletList(
  page: Page,
  items: string[],
  x: number,
  y: number,
  width: number,
  style: TextStyle,
) {
  const measure = measureBulletList(page.ctx, items, width, style);
  let currentY = y;

  measure.items.forEach((item, index) => {
    drawText(page.ctx, "•", x, currentY, measure.bulletWidth, {
      size: style.size,
      lineHeight: style.lineHeight,
      weight: 700,
      color: COLORS.accent,
    });
    drawMeasuredText(
      page.ctx,
      item,
      x + measure.bulletWidth,
      currentY,
      style.color ?? COLORS.text,
    );
    currentY += item.height + (index === measure.items.length - 1 ? 0 : measure.gap);
  });

  return measure.height;
}

function measureChip(
  ctx: CanvasRenderingContext2D,
  label: string,
  maxWidth: number,
) {
  const text = measureTextBlock(ctx, label, maxWidth - 20, {
    size: 11,
    lineHeight: 13,
    weight: 600,
    maxLines: 2,
    minSize: 10,
    shrinkToFit: true,
  });

  return {
    label,
    text,
    width: Math.min(maxWidth, Math.max(74, text.width + 20)),
    height: Math.max(28, text.height + 10),
  } satisfies ChipMeasure;
}

function measureChipRows(
  ctx: CanvasRenderingContext2D,
  labels: string[],
  width: number,
  maxChipWidth: number,
) {
  const chips: ChipPlacement[] = [];
  const gap = 8;
  const rowGap = 8;
  let cursorX = 0;
  let cursorY = 0;
  let rowHeight = 0;

  labels.forEach((label) => {
    const chip = measureChip(ctx, label, maxChipWidth);

    if (cursorX > 0 && cursorX + chip.width > width) {
      cursorX = 0;
      cursorY += rowHeight + rowGap;
      rowHeight = 0;
    }

    chips.push({
      ...chip,
      x: cursorX,
      y: cursorY,
    });
    cursorX += chip.width + gap;
    rowHeight = Math.max(rowHeight, chip.height);
  });

  return {
    chips,
    height: chips.length === 0 ? 0 : cursorY + rowHeight,
  } satisfies ChipRowsMeasure;
}

function drawChipRows(
  page: Page,
  labels: string[],
  x: number,
  y: number,
  width: number,
  fill = COLORS.soft,
) {
  const measure = measureChipRows(page.ctx, labels, width, 230);

  measure.chips.forEach((chip) => {
    drawBox(
      page.ctx,
      x + chip.x,
      y + chip.y,
      chip.width,
      chip.height,
      fill,
      fill,
      999,
    );
    setFont(page.ctx, chip.text.size, 600);
    page.ctx.fillStyle = COLORS.text;
    chip.text.lines.forEach((line, index) => {
      const lineWidth = page.ctx.measureText(line).width;
      page.ctx.fillText(
        line,
        x + chip.x + (chip.width - lineWidth) / 2,
        y + chip.y + (chip.height - chip.text.height) / 2 + index * chip.text.lineHeight,
      );
    });
  });

  return measure.height;
}

function drawLevelBar(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  level: number,
) {
  const segmentGap = 6;
  const segmentWidth = (width - segmentGap * 3) / 4;

  for (let index = 0; index < 4; index += 1) {
    drawBox(
      ctx,
      x + index * (segmentWidth + segmentGap),
      y,
      segmentWidth,
      12,
      index <= level ? COLORS.accent : COLORS.soft,
      index <= level ? COLORS.accent : COLORS.soft,
      999,
    );
  }
}

function sumHeights(heights: number[], gap: number) {
  return heights.reduce(
    (sum, value, index) => sum + value + (index === 0 ? 0 : gap),
    0,
  );
}

function paginateCardsIntoColumns(
  ctx: CanvasRenderingContext2D,
  cards: ColumnCard[],
  columnCount: number,
  columnWidth: number,
  availableHeight: number,
  gap = GRID_GAP,
) {
  const pages: ColumnCard[][][] = [];
  let currentColumns = Array.from({ length: columnCount }, () => [] as ColumnCard[]);
  let heights = Array.from({ length: columnCount }, () => 0);

  cards.forEach((card) => {
    const height = card.measure(ctx, columnWidth);
    let target = heights.indexOf(Math.min(...heights));
    const additionalHeight = heights[target] === 0 ? height : height + gap;

    if (
      heights[target] + additionalHeight > availableHeight &&
      currentColumns.some((column) => column.length > 0)
    ) {
      pages.push(currentColumns.map((column) => [...column]));
      currentColumns = Array.from({ length: columnCount }, () => [] as ColumnCard[]);
      heights = Array.from({ length: columnCount }, () => 0);
      target = 0;
    }

    currentColumns[target].push(card);
    heights[target] += heights[target] === 0 ? height : height + gap;
  });

  if (currentColumns.some((column) => column.length > 0)) {
    pages.push(currentColumns);
  }

  return pages;
}

function drawColumnCardLayout(
  page: Page,
  startY: number,
  columnCards: ColumnCard[][],
  gap = GRID_GAP,
) {
  const columnCount = columnCards.length;
  const columnWidth =
    (CONTENT_WIDTH - gap * (columnCount - 1)) / columnCount;

  columnCards.forEach((cards, columnIndex) => {
    let y = startY;
    const x = PAGE_MARGIN_X + columnIndex * (columnWidth + gap);

    cards.forEach((card) => {
      const height = card.measure(page.ctx, columnWidth);
      card.draw(page, x, y, columnWidth, height);
      y += height + gap;
    });
  });
}

function drawFooter(page: Page, pageIndex: number, pageCount: number) {
  const label = `${pageIndex + 1} / ${pageCount}`;

  setFont(page.ctx, 14, 600);
  page.ctx.fillStyle = COLORS.muted;
  page.ctx.fillText(
    label,
    PAGE_WIDTH - PAGE_MARGIN_X - page.ctx.measureText(label).width,
    PAGE_HEIGHT - 32,
  );
}

function measurePreviewRow(
  ctx: CanvasRenderingContext2D,
  result: AssessmentResult,
  item: AssessmentResult["ranking"][number],
  content: ResultsDictionary,
  widths: {
    methodology: number;
    fit: number;
    dimensions: number;
    rationale: number;
  },
) {
  const title = measureTextBlock(ctx, item.methodologyTitle ?? item.methodologyId, widths.methodology, {
    size: 17,
    lineHeight: 21,
    weight: 700,
    maxLines: 2,
    minSize: 15,
    shrinkToFit: true,
  });
  const fit = measureBadge(ctx, getFitLabel(item.fitTier, content), widths.fit);
  const dimensions = measureTextBlock(
    ctx,
    strongestDimensions(result, item.methodologyId, 2).join(" · "),
    widths.dimensions,
    {
      size: 13,
      lineHeight: 18,
      color: COLORS.muted,
      maxLines: 3,
      minSize: 12,
      shrinkToFit: true,
    },
  );
  const rationale = measureTextBlock(
    ctx,
    item.shortRationaleText ?? item.overviewText ?? "",
    widths.rationale,
    {
      size: 13,
      lineHeight: 18,
      color: COLORS.muted,
      maxLines: 3,
      minSize: 12,
      shrinkToFit: true,
    },
  );

  return {
    title,
    fit,
    dimensions,
    rationale,
    height:
      Math.max(title.height, fit.height, dimensions.height, rationale.height) + 20,
  };
}

function drawPreviewRow(
  page: Page,
  result: AssessmentResult,
  item: AssessmentResult["ranking"][number],
  content: ResultsDictionary,
  x: number,
  y: number,
  width: number,
) {
  const innerX = x + 18;
  const innerWidth = width - 36;
  const widths = {
    methodology: 212,
    fit: 150,
    dimensions: 210,
    rationale: innerWidth - 32 - 212 - 150 - 210 - 60,
  };
  const measure = measurePreviewRow(page.ctx, result, item, content, widths);
  const palette = fitPalette(item.fitTier);

  drawBox(page.ctx, x, y, width, measure.height, COLORS.surface, COLORS.soft, 12);
  drawText(page.ctx, String(item.rank), innerX, y + 12, 34, {
    size: 18,
    lineHeight: 20,
    weight: 700,
  });
  drawMeasuredText(page.ctx, measure.title, innerX + 44, y + 12, COLORS.text);
  drawBadge(
    page.ctx,
    getFitLabel(item.fitTier, content),
    innerX + 44 + widths.methodology + 12,
    y + (measure.height - measure.fit.height) / 2,
    palette.fill,
    palette.color,
    widths.fit,
  );
  drawMeasuredText(
    page.ctx,
    measure.dimensions,
    innerX + 44 + widths.methodology + widths.fit + 32,
    y + 12,
    COLORS.muted,
  );
  drawMeasuredText(
    page.ctx,
    measure.rationale,
    innerX + 44 + widths.methodology + widths.fit + widths.dimensions + 52,
    y + 12,
    COLORS.muted,
  );

  return measure.height;
}

function drawExecutiveSummaryPage(
  page: Page,
  result: AssessmentResult,
  document: ResultExportDocument,
  content: ResultsDictionary,
) {
  const top = result.ranking[0];
  const second = result.ranking[1];

  if (!top) {
    return;
  }

  const interpretation = getRecommendationInterpretation(result);
  const nextMove = content.narrative.nextStepTexts[top.methodologyId];
  const signalSummary = [
    ...top.signalTags.map((tag) => tag.labelText ?? prettifyKey(tag.labelKey)),
    ...strongestDimensions(result, top.methodologyId, 2),
  ].slice(0, 6);
  const meta = document.metadata.filter(
    (item) =>
      item.id === "resultCode" || item.id === "createdAt" || item.id === "exportedAt",
  );
  let y = drawSectionLead(page, document.title, document.description);

  const metaWidth = (CONTENT_WIDTH - GRID_GAP * (meta.length - 1)) / meta.length;
  const metaHeight = Math.max(
    ...meta.map((item) =>
      measureMetadataCard(page.ctx, item.label, item.value, metaWidth).height,
    ),
  );

  meta.forEach((item, index) => {
    drawMetadataCard(
      page,
      item,
      PAGE_MARGIN_X + index * (metaWidth + GRID_GAP),
      y,
      metaWidth,
      metaHeight,
    );
  });

  y += metaHeight + GRID_GAP;

  const leftWidth = 642;
  const rightWidth = CONTENT_WIDTH - leftWidth - GRID_GAP;
  const heroHeader = measureBoxSectionHeader(
    page.ctx,
    leftWidth - CARD_PADDING * 2,
    content.export.report.primaryRecommendationLabel,
    top.methodologyTitle ?? top.methodologyId,
  );
  const roleMeasure = measureTextBlock(
    page.ctx,
    `${content.export.report.coreRoleLabel}: ${roleLabel(getMethodologyRole(top.methodologyId), content)}`,
    leftWidth - CARD_PADDING * 2,
    {
      size: 15,
      lineHeight: 20,
      weight: 600,
      color: COLORS.muted,
      maxLines: 3,
      minSize: 13,
      shrinkToFit: true,
    },
  );
  const fitBadge = measureBadge(page.ctx, content.fitLabels[top.fitTier], 200);
  const explanationMeasure = measureTextBlock(
    page.ctx,
    document.interpretation.primaryExplanation,
    leftWidth - CARD_PADDING * 2,
    {
      size: 15,
      lineHeight: 22,
      maxLines: 6,
      minSize: 14,
      shrinkToFit: true,
    },
  );
  const moveHeader = measureTextBlock(
    page.ctx,
    content.export.report.recommendedFirstMoveLabel,
    leftWidth - CARD_PADDING * 2,
    {
      size: 12,
      lineHeight: 16,
      weight: 700,
      color: COLORS.accent,
      maxLines: 2,
      minSize: 10,
      shrinkToFit: true,
    },
  );
  const moveMeasure = measureTextBlock(
    page.ctx,
    nextMove,
    leftWidth - CARD_PADDING * 2,
    {
      size: 14,
      lineHeight: 20,
      color: COLORS.muted,
      maxLines: 4,
      minSize: 12,
      shrinkToFit: true,
    },
  );
  const leftHeight =
    CARD_PADDING +
    heroHeader.height +
    14 +
    fitBadge.height +
    12 +
    roleMeasure.height +
    14 +
    explanationMeasure.height +
    18 +
    moveHeader.height +
    8 +
    moveMeasure.height +
    CARD_PADDING;

  const analysisHeader = measureBoxSectionHeader(
    page.ctx,
    rightWidth - CARD_PADDING * 2,
    content.export.report.recommendationModeLabel,
    document.interpretation.heading,
  );
  const summaryMeasure = measureTextBlock(
    page.ctx,
    document.interpretation.summary,
    rightWidth - CARD_PADDING * 2,
    {
      size: 15,
      lineHeight: 22,
      color: COLORS.muted,
      maxLines: 4,
      minSize: 13,
      shrinkToFit: true,
    },
  );
  const summaryLabelMeasure = measureTextBlock(
    page.ctx,
    content.export.report.readingGuidanceLabel,
    rightWidth - CARD_PADDING * 2,
    {
      size: 12,
      lineHeight: 16,
      weight: 700,
      color: COLORS.accent,
      maxLines: 2,
      minSize: 10,
      shrinkToFit: true,
    },
  );
  const drivers = topDrivers(result);
  const driversMeasure = measureBulletList(
    page.ctx,
    drivers,
    rightWidth - CARD_PADDING * 2,
    {
      size: 15,
      lineHeight: 21,
      maxLines: 3,
      minSize: 13,
      shrinkToFit: true,
    },
  );
  const signalHeader = measureTextBlock(
    page.ctx,
    content.export.report.signalSummaryLabel,
    rightWidth - CARD_PADDING * 2,
    {
      size: 12,
      lineHeight: 16,
      weight: 700,
      color: COLORS.accent,
      maxLines: 2,
      minSize: 10,
      shrinkToFit: true,
    },
  );
  const signalChips = measureChipRows(
    page.ctx,
    signalSummary,
    rightWidth - CARD_PADDING * 2,
    190,
  );
  const complementLabelMeasure = second
    ? measureTextBlock(
        page.ctx,
        content.export.report.complementaryRecommendationLabel,
        rightWidth - CARD_PADDING * 2,
        {
          size: 12,
          lineHeight: 16,
          weight: 700,
          color: COLORS.accent,
          maxLines: 2,
          minSize: 10,
          shrinkToFit: true,
        },
      )
    : undefined;
  const complementMeasure = second
    ? measureTextBlock(
        page.ctx,
        interpretation.mode === "composite_strategy"
          ? `${top.methodologyTitle ?? top.methodologyId} + ${second.methodologyTitle ?? second.methodologyId}`
          : second.methodologyTitle ?? second.methodologyId,
        rightWidth - CARD_PADDING * 2,
        {
          size: 18,
          lineHeight: 24,
          weight: 700,
          maxLines: 3,
          minSize: 15,
          shrinkToFit: true,
        },
      )
    : undefined;
  const rightHeight =
    CARD_PADDING +
    analysisHeader.height +
    12 +
    summaryLabelMeasure.height +
    8 +
    summaryMeasure.height +
    18 +
    signalHeader.height +
    10 +
    signalChips.height +
    18 +
    driversMeasure.height +
    (complementMeasure && complementLabelMeasure
      ? 18 + complementLabelMeasure.height + 8 + complementMeasure.height
      : 0) +
    CARD_PADDING;
  const pairHeight = Math.max(leftHeight, rightHeight);

  drawBox(page.ctx, PAGE_MARGIN_X, y, leftWidth, pairHeight, COLORS.surface, COLORS.line);
  let cardY = y + CARD_PADDING;
  cardY += drawBoxSectionHeader(
    page,
    PAGE_MARGIN_X + CARD_PADDING,
    cardY,
    leftWidth - CARD_PADDING * 2,
    content.export.report.primaryRecommendationLabel,
    top.methodologyTitle ?? top.methodologyId,
  );
  const fitPaletteValue = fitPalette(top.fitTier);
  drawBadge(
    page.ctx,
    content.fitLabels[top.fitTier],
    PAGE_MARGIN_X + CARD_PADDING,
    cardY + 14,
    fitPaletteValue.fill,
    fitPaletteValue.color,
    210,
  );
  cardY += 14 + fitBadge.height + 12;
  drawMeasuredText(
    page.ctx,
    roleMeasure,
    PAGE_MARGIN_X + CARD_PADDING,
    cardY,
    COLORS.muted,
  );
  cardY += roleMeasure.height + 14;
  drawMeasuredText(
    page.ctx,
    explanationMeasure,
    PAGE_MARGIN_X + CARD_PADDING,
    cardY,
    COLORS.text,
  );
  cardY += explanationMeasure.height + 18;
  drawMeasuredText(
    page.ctx,
    moveHeader,
    PAGE_MARGIN_X + CARD_PADDING,
    cardY,
    COLORS.accent,
  );
  drawMeasuredText(
    page.ctx,
    moveMeasure,
    PAGE_MARGIN_X + CARD_PADDING,
    cardY + moveHeader.height + 8,
    COLORS.muted,
  );

  drawBox(
    page.ctx,
    PAGE_MARGIN_X + leftWidth + GRID_GAP,
    y,
    rightWidth,
    pairHeight,
    COLORS.panel,
    COLORS.line,
  );
  cardY = y + CARD_PADDING;
  const rightX = PAGE_MARGIN_X + leftWidth + GRID_GAP + CARD_PADDING;
  cardY += drawBoxSectionHeader(
    page,
    rightX,
    cardY,
    rightWidth - CARD_PADDING * 2,
    content.export.report.recommendationModeLabel,
    document.interpretation.heading,
  );
  cardY += 12;
  drawMeasuredText(page.ctx, summaryLabelMeasure, rightX, cardY, COLORS.accent);
  cardY += summaryLabelMeasure.height + 8;
  drawMeasuredText(
    page.ctx,
    summaryMeasure,
    rightX,
    cardY,
    COLORS.muted,
  );
  cardY += summaryMeasure.height + 18;
  drawMeasuredText(page.ctx, signalHeader, rightX, cardY, COLORS.accent);
  cardY += signalHeader.height + 10;
  drawChipRows(
    page,
    signalSummary,
    rightX,
    cardY,
    rightWidth - CARD_PADDING * 2,
    COLORS.surface,
  );
  cardY += signalChips.height + 18;
  cardY += drawBoxSectionHeader(
    page,
    rightX,
    cardY,
    rightWidth - CARD_PADDING * 2,
    content.export.report.keyDriversLabel,
  );
  cardY += 10;
  drawBulletList(
    page,
    drivers,
    rightX,
    cardY,
    rightWidth - CARD_PADDING * 2,
    {
      size: 15,
      lineHeight: 21,
      color: COLORS.text,
      maxLines: 3,
      minSize: 13,
      shrinkToFit: true,
    },
  );
  cardY += driversMeasure.height;

  if (complementLabelMeasure && complementMeasure) {
    cardY += 18;
    drawRule(page.ctx, rightX, cardY, rightWidth - CARD_PADDING * 2);
    cardY += 12;
    drawMeasuredText(
      page.ctx,
      complementLabelMeasure,
      rightX,
      cardY,
      COLORS.accent,
    );
    drawMeasuredText(
      page.ctx,
      complementMeasure,
      rightX,
      cardY + complementLabelMeasure.height + 8,
      COLORS.text,
    );
  }

  y += pairHeight + GRID_GAP;

  const rankingHeader = measureBoxSectionHeader(
    page.ctx,
    CONTENT_WIDTH - CARD_PADDING * 2,
    content.export.report.rankingPreviewLabel,
  );
  const rowWidth = CONTENT_WIDTH - CARD_PADDING * 2;
  const previewRowHeights = result.ranking.map((item) =>
    measurePreviewRow(page.ctx, result, item, content, {
      methodology: 212,
      fit: 150,
      dimensions: 210,
      rationale: rowWidth - 32 - 212 - 150 - 210 - 60,
    }).height,
  );
  const rankingHeight =
    CARD_PADDING +
    rankingHeader.height +
    18 +
    sumHeights(previewRowHeights, TABLE_ROW_GAP) +
    CARD_PADDING;

  drawBox(page.ctx, PAGE_MARGIN_X, y, CONTENT_WIDTH, rankingHeight, COLORS.surface, COLORS.line);
  let rankingY = y + CARD_PADDING;
  rankingY += drawBoxSectionHeader(
    page,
    PAGE_MARGIN_X + CARD_PADDING,
    rankingY,
    CONTENT_WIDTH - CARD_PADDING * 2,
    content.export.report.rankingPreviewLabel,
  );
  rankingY += 18;
  result.ranking.forEach((item) => {
    const rowHeight = drawPreviewRow(
      page,
      result,
      item,
      content,
      PAGE_MARGIN_X + CARD_PADDING,
      rankingY,
      CONTENT_WIDTH - CARD_PADDING * 2,
    );
    rankingY += rowHeight + TABLE_ROW_GAP;
  });
}

function measureComparisonRow(
  ctx: CanvasRenderingContext2D,
  result: AssessmentResult,
  item: AssessmentResult["ranking"][number],
  content: ResultsDictionary,
  widths: {
    methodology: number;
    fit: number;
    role: number;
    dimensions: number;
    rationale: number;
  },
) {
  const labels = item.signalTags
    .map((tag) => tag.labelText ?? tag.labelKey)
    .slice(0, 2)
    .join(" · ");
  const title = measureTextBlock(ctx, item.methodologyTitle ?? item.methodologyId, widths.methodology, {
    size: 18,
    lineHeight: 22,
    weight: 700,
    maxLines: 2,
    minSize: 16,
    shrinkToFit: true,
  });
  const labelsMeasure = measureTextBlock(ctx, labels, widths.methodology, {
    size: 12,
    lineHeight: 16,
    color: COLORS.muted,
    maxLines: 3,
    minSize: 11,
    shrinkToFit: true,
  });
  const fit = measureBadge(ctx, content.fitLabels[item.fitTier], widths.fit);
  const score = measureTextBlock(ctx, `${item.score} ${content.bestFit.pointsLabel}`, widths.fit, {
    size: 12,
    lineHeight: 16,
    weight: 600,
    color: COLORS.muted,
    maxLines: 2,
    minSize: 11,
    shrinkToFit: true,
  });
  const role = measureTextBlock(
    ctx,
    roleLabel(getMethodologyRole(item.methodologyId), content),
    widths.role,
    {
      size: 14,
      lineHeight: 19,
      maxLines: 4,
      minSize: 12,
      shrinkToFit: true,
    },
  );
  const dimensions = measureTextBlock(
    ctx,
    strongestDimensions(result, item.methodologyId, 3).join(" · "),
    widths.dimensions,
    {
      size: 14,
      lineHeight: 19,
      maxLines: 4,
      minSize: 12,
      shrinkToFit: true,
    },
  );
  const rationale = measureTextBlock(
    ctx,
    item.shortRationaleText ?? item.overviewText ?? "",
    widths.rationale,
    {
      size: 14,
      lineHeight: 19,
      color: COLORS.muted,
      maxLines: 6,
      minSize: 12,
      shrinkToFit: true,
    },
  );

  const methodologyHeight =
    title.height + (labelsMeasure.height > 0 ? 8 + labelsMeasure.height : 0);
  const fitHeight = fit.height + 8 + score.height;

  return {
    title,
    labels: labelsMeasure,
    fit,
    score,
    role,
    dimensions,
    rationale,
    height:
      Math.max(methodologyHeight, fitHeight, role.height, dimensions.height, rationale.height) +
      28,
  };
}

function drawComparisonRow(
  page: Page,
  result: AssessmentResult,
  item: AssessmentResult["ranking"][number],
  content: ResultsDictionary,
  x: number,
  y: number,
  width: number,
) {
  const innerX = x + 18;
  const widths = {
    methodology: 220,
    fit: 156,
    role: 160,
    dimensions: 216,
    rationale: width - 36 - 34 - 220 - 156 - 160 - 216 - 40,
  };
  const measure = measureComparisonRow(page.ctx, result, item, content, widths);
  const palette = fitPalette(item.fitTier);

  drawBox(page.ctx, x, y, width, measure.height, COLORS.surface, COLORS.soft, 12);
  drawText(page.ctx, String(item.rank), innerX, y + 14, 34, {
    size: 20,
    lineHeight: 24,
    weight: 700,
  });

  let columnX = innerX + 42;
  drawMeasuredText(page.ctx, measure.title, columnX, y + 14, COLORS.text);
  drawMeasuredText(
    page.ctx,
    measure.labels,
    columnX,
    y + 14 + measure.title.height + 8,
    COLORS.muted,
  );

  columnX += widths.methodology + 18;
  drawBadge(
    page.ctx,
    content.fitLabels[item.fitTier],
    columnX,
    y + 14,
    palette.fill,
    palette.color,
    widths.fit,
  );
  drawMeasuredText(
    page.ctx,
    measure.score,
    columnX,
    y + 14 + measure.fit.height + 8,
    COLORS.muted,
  );

  columnX += widths.fit + 18;
  drawMeasuredText(page.ctx, measure.role, columnX, y + 14, COLORS.text);
  columnX += widths.role + 18;
  drawMeasuredText(page.ctx, measure.dimensions, columnX, y + 14, COLORS.text);
  columnX += widths.dimensions + 18;
  drawMeasuredText(page.ctx, measure.rationale, columnX, y + 14, COLORS.muted);

  return measure.height;
}

function drawRankedComparisonPage(
  page: Page,
  result: AssessmentResult,
  document: ResultExportDocument,
  content: ResultsDictionary,
) {
  const top = result.ranking[0];
  const second = result.ranking[1];
  const lowest = result.ranking[result.ranking.length - 1];
  let y = drawSectionLead(
    page,
    content.export.report.rankedComparisonTitle,
    document.rankingSection.description,
  );

  const summaryLabel = measureBoxSectionHeader(
    page.ctx,
    CONTENT_WIDTH - CARD_PADDING * 2,
    document.interpretation.summaryLabel,
  );
  const summaryMeasure = measureTextBlock(
    page.ctx,
    document.interpretation.summary,
    CONTENT_WIDTH - CARD_PADDING * 2,
    {
      size: 15,
      lineHeight: 22,
      color: COLORS.muted,
      maxLines: 5,
      minSize: 13,
      shrinkToFit: true,
    },
  );
  const summaryHeight =
    CARD_PADDING +
    summaryLabel.height +
    12 +
    summaryMeasure.height +
    CARD_PADDING;

  drawBox(page.ctx, PAGE_MARGIN_X, y, CONTENT_WIDTH, summaryHeight, COLORS.panel, COLORS.line);
  drawBoxSectionHeader(
    page,
    PAGE_MARGIN_X + CARD_PADDING,
    y + CARD_PADDING,
    CONTENT_WIDTH - CARD_PADDING * 2,
    document.interpretation.summaryLabel,
  );
  drawMeasuredText(
    page.ctx,
    summaryMeasure,
    PAGE_MARGIN_X + CARD_PADDING,
    y + CARD_PADDING + summaryLabel.height + 12,
    COLORS.muted,
  );

  y += summaryHeight + GRID_GAP;

  const tableHeaderY = y + CARD_PADDING;
  const tableWidth = CONTENT_WIDTH - CARD_PADDING * 2;
  const headerCells = [
    { label: "#", x: 0, width: 30 },
    {
      label: content.export.report.methodologyLabel ?? "Methodology",
      x: 42,
      width: 220,
    },
    { label: content.export.report.fitLabel ?? "Fit", x: 280, width: 156 },
    { label: content.export.report.coreRoleLabel, x: 454, width: 160 },
    {
      label: content.export.report.strongestDimensionsLabel,
      x: 632,
      width: 216,
    },
    { label: content.export.report.rationaleLabel, x: 866, width: 190 },
  ];
  const tableHeaderHeight = 24;
  const rowHeights = result.ranking.map((item) =>
    measureComparisonRow(page.ctx, result, item, content, {
      methodology: 220,
      fit: 156,
      role: 160,
      dimensions: 216,
      rationale: tableWidth - 34 - 220 - 156 - 160 - 216 - 58,
    }).height,
  );
  const tableHeight =
    CARD_PADDING +
    tableHeaderHeight +
    16 +
    sumHeights(rowHeights, TABLE_ROW_GAP) +
    CARD_PADDING;

  drawBox(page.ctx, PAGE_MARGIN_X, y, CONTENT_WIDTH, tableHeight, COLORS.surface, COLORS.line);
  headerCells.forEach((cell) => {
    drawText(
      page.ctx,
      cell.label,
      PAGE_MARGIN_X + CARD_PADDING + cell.x,
      tableHeaderY,
      cell.width,
      {
        size: 12,
        lineHeight: 16,
        weight: 700,
        color: COLORS.accent,
        maxLines: 2,
        minSize: 10,
        shrinkToFit: true,
      },
    );
  });

  let rowY = tableHeaderY + tableHeaderHeight + 16;
  result.ranking.forEach((item) => {
    const rowHeight = drawComparisonRow(
      page,
      result,
      item,
      content,
      PAGE_MARGIN_X + CARD_PADDING,
      rowY,
      CONTENT_WIDTH - CARD_PADDING * 2,
    );
    rowY += rowHeight + TABLE_ROW_GAP;
  });

  y += tableHeight + GRID_GAP;

  const insightWidth = (CONTENT_WIDTH - GRID_GAP * 2) / 3;
  const strongestTitle =
    result.sensitivityHint?.mostSensitiveDimensionLabel ??
    strongestDimensions(result, top?.methodologyId ?? "", 1)[0] ??
    (top?.dimensionHighlights[0]
      ? result.dimensions.find(
          (dimension) =>
            dimension.dimensionKey === top.dimensionHighlights[0]?.dimensionKey,
        )?.labelText
      : "") ??
    "";
  const strongestBody = top && second
    ? `${strongestTitle} most clearly separates ${top.methodologyTitle ?? top.methodologyId} from ${second.methodologyTitle ?? second.methodologyId}.`
    : document.interpretation.summary;
  const nearestBody = second
    ? second.tradeoffText ??
      document.interpretation.secondaryExplanation ??
      buildComparisonInsight(result, second, content)
    : document.interpretation.summary;
  const lowestBody = lowest
    ? lowest.tradeoffText ??
      content.narrative.outcomeCautionTexts[lowest.methodologyId]
    : document.interpretation.summary;
  drawInsightCard(
    page,
    PAGE_MARGIN_X,
    y,
    insightWidth,
    content.export.report.strongestDiscriminatorLabel,
    strongestTitle,
    strongestBody,
    COLORS.panel,
  );
  drawInsightCard(
    page,
    PAGE_MARGIN_X + insightWidth + GRID_GAP,
    y,
    insightWidth,
    content.export.report.nearestAlternativeLabel,
    second?.methodologyTitle ?? "",
    nearestBody,
  );
  drawInsightCard(
    page,
    PAGE_MARGIN_X + (insightWidth + GRID_GAP) * 2,
    y,
    insightWidth,
    content.export.report.lowestFitPatternLabel,
    lowest?.methodologyTitle ?? "",
    lowestBody,
  );
}

function measureDimensionEvidenceCard(
  ctx: CanvasRenderingContext2D,
  result: AssessmentResult,
  width: number,
  content: ResultsDictionary,
) {
  const header = measureBoxSectionHeader(
    ctx,
    width - CARD_PADDING * 2,
    content.bestFit.dimensionsLabel,
  );
  const rowHeights = result.dimensions.map((dimension) => {
    const label = measureTextBlock(ctx, dimension.labelText ?? dimension.dimensionKey, 230, {
      size: 14,
      lineHeight: 18,
      maxLines: 2,
      minSize: 12,
      shrinkToFit: true,
    });

    return Math.max(label.height, 18) + 10;
  });

  return (
    CARD_PADDING +
    header.height +
    18 +
    sumHeights(rowHeights, 10) +
    CARD_PADDING
  );
}

function drawDimensionEvidenceCard(
  page: Page,
  result: AssessmentResult,
  x: number,
  y: number,
  width: number,
  content: ResultsDictionary,
) {
  const height = measureDimensionEvidenceCard(page.ctx, result, width, content);

  drawBox(page.ctx, x, y, width, height, COLORS.panel, COLORS.line);
  let cursorY = y + CARD_PADDING;
  cursorY += drawBoxSectionHeader(
    page,
    x + CARD_PADDING,
    cursorY,
    width - CARD_PADDING * 2,
    content.bestFit.dimensionsLabel,
  );
  cursorY += 18;

  result.dimensions.forEach((dimension) => {
    const label = measureTextBlock(page.ctx, dimension.labelText ?? dimension.dimensionKey, 230, {
      size: 14,
      lineHeight: 18,
      maxLines: 2,
      minSize: 12,
      shrinkToFit: true,
    });
    const rowHeight = Math.max(label.height, 18) + 10;

    drawMeasuredText(page.ctx, label, x + CARD_PADDING, cursorY + 2, COLORS.text);
    drawLevelBar(page.ctx, x + width - CARD_PADDING - 200, cursorY + 4, 150, dimension.level);
    drawText(page.ctx, `${dimension.level}/3`, x + width - CARD_PADDING - 40, cursorY + 1, 40, {
      size: 13,
      lineHeight: 18,
      weight: 700,
      color: COLORS.muted,
    });
    cursorY += rowHeight + 10;
  });
}

function measureAlternativeTradeoffCard(
  ctx: CanvasRenderingContext2D,
  rows: AssessmentResult["ranking"],
  width: number,
  content: ResultsDictionary,
) {
  const header = measureBoxSectionHeader(
    ctx,
    width - CARD_PADDING * 2,
    content.export.report.whyNotOthersLabel,
  );
  const rowHeights = rows.map((item) => {
    const title = measureTextBlock(ctx, item.methodologyTitle ?? item.methodologyId, 170, {
      size: 16,
      lineHeight: 20,
      weight: 700,
      maxLines: 2,
      minSize: 14,
      shrinkToFit: true,
    });
    const tradeoff = measureTextBlock(ctx, item.tradeoffText ?? "", width - CARD_PADDING * 2 - 190, {
      size: 14,
      lineHeight: 19,
      color: COLORS.muted,
      maxLines: 5,
      minSize: 12,
      shrinkToFit: true,
    });

    return Math.max(title.height, tradeoff.height) + 14;
  });

  return (
    CARD_PADDING +
    header.height +
    18 +
    sumHeights(rowHeights, 12) +
    CARD_PADDING
  );
}

function drawAlternativeTradeoffCard(
  page: Page,
  rows: AssessmentResult["ranking"],
  x: number,
  y: number,
  width: number,
  content: ResultsDictionary,
) {
  const height = measureAlternativeTradeoffCard(page.ctx, rows, width, content);

  drawBox(page.ctx, x, y, width, height, COLORS.surface, COLORS.line);
  let cursorY = y + CARD_PADDING;
  cursorY += drawBoxSectionHeader(
    page,
    x + CARD_PADDING,
    cursorY,
    width - CARD_PADDING * 2,
    content.export.report.whyNotOthersLabel,
  );
  cursorY += 18;

  rows.forEach((item, index) => {
    const title = measureTextBlock(page.ctx, item.methodologyTitle ?? item.methodologyId, 170, {
      size: 16,
      lineHeight: 20,
      weight: 700,
      maxLines: 2,
      minSize: 14,
      shrinkToFit: true,
    });
    const tradeoff = measureTextBlock(page.ctx, item.tradeoffText ?? "", width - CARD_PADDING * 2 - 190, {
      size: 14,
      lineHeight: 19,
      color: COLORS.muted,
      maxLines: 5,
      minSize: 12,
      shrinkToFit: true,
    });
    const rowHeight = Math.max(title.height, tradeoff.height) + 14;

    drawMeasuredText(page.ctx, title, x + CARD_PADDING, cursorY, COLORS.text);
    drawMeasuredText(page.ctx, tradeoff, x + CARD_PADDING + 190, cursorY, COLORS.muted);

    cursorY += rowHeight;

    if (index < rows.length - 1) {
      drawRule(page.ctx, x + CARD_PADDING, cursorY + 6, width - CARD_PADDING * 2);
      cursorY += 18;
    }
  });
}

function drawTopFitAnalysisPage(
  page: Page,
  result: AssessmentResult,
  document: ResultExportDocument,
  content: ResultsDictionary,
) {
  const top = result.ranking[0];

  if (!top) {
    return;
  }

  const alternativeRows = result.ranking.slice(1, 4);
  let y = drawSectionLead(
    page,
    content.export.report.topFitAnalysisTitle,
    document.interpretation.primaryExplanation,
  );

  const summaryHeader = measureBoxSectionHeader(
    page.ctx,
    CONTENT_WIDTH - CARD_PADDING * 2,
    content.export.report.primaryRecommendationLabel,
    top.methodologyTitle ?? top.methodologyId,
  );
  const roleMeasure = measureTextBlock(
    page.ctx,
    `${content.export.report.coreRoleLabel}: ${roleLabel(getMethodologyRole(top.methodologyId), content)}`,
    360,
    {
      size: 15,
      lineHeight: 20,
      weight: 600,
      color: COLORS.muted,
      maxLines: 3,
      minSize: 13,
      shrinkToFit: true,
    },
  );
  const heroBadge = measureBadge(page.ctx, content.fitLabels[top.fitTier], 180);
  const chips = topDrivers(result);
  const chipRows = measureChipRows(page.ctx, chips, 420, 220);
  const summaryHeight =
    CARD_PADDING +
    summaryHeader.height +
    14 +
    heroBadge.height +
    12 +
    roleMeasure.height +
    14 +
    chipRows.height +
    CARD_PADDING;

  drawBox(page.ctx, PAGE_MARGIN_X, y, CONTENT_WIDTH, summaryHeight, COLORS.surface, COLORS.line);
  let cursorY = y + CARD_PADDING;
  cursorY += drawBoxSectionHeader(
    page,
    PAGE_MARGIN_X + CARD_PADDING,
    cursorY,
    CONTENT_WIDTH - CARD_PADDING * 2,
    content.export.report.primaryRecommendationLabel,
    top.methodologyTitle ?? top.methodologyId,
  );
  const palette = fitPalette(top.fitTier);
  drawBadge(
    page.ctx,
    content.fitLabels[top.fitTier],
    PAGE_MARGIN_X + CARD_PADDING,
    cursorY + 14,
    palette.fill,
    palette.color,
    180,
  );
  drawMeasuredText(
    page.ctx,
    roleMeasure,
    PAGE_MARGIN_X + CARD_PADDING + 200,
    cursorY + 18,
    COLORS.muted,
  );
  drawChipRows(
    page,
    chips,
    PAGE_MARGIN_X + CARD_PADDING,
    cursorY + 14 + heroBadge.height + 16,
    CONTENT_WIDTH - CARD_PADDING * 2,
  );

  y += summaryHeight + GRID_GAP;

  const leftWidth = 530;
  const rightWidth = CONTENT_WIDTH - leftWidth - GRID_GAP;

  const whyLeadHeader = measureBoxSectionHeader(
    page.ctx,
    leftWidth - CARD_PADDING * 2,
    content.export.report.whyItLeadsLabel,
  );
  const overviewMeasure = measureTextBlock(
    page.ctx,
    top.overviewText ?? "",
    leftWidth - CARD_PADDING * 2,
    {
      size: 15,
      lineHeight: 22,
      maxLines: 6,
      minSize: 13,
      shrinkToFit: true,
    },
  );
  const primaryExplanation = measureTextBlock(
    page.ctx,
    document.interpretation.primaryExplanation,
    leftWidth - CARD_PADDING * 2,
    {
      size: 15,
      lineHeight: 22,
      color: COLORS.muted,
      maxLines: 6,
      minSize: 13,
      shrinkToFit: true,
    },
  );
  const outcomeMeasure = measureTextBlock(
    page.ctx,
    top.outcomeText ?? content.narrative.nextStepTexts[top.methodologyId],
    leftWidth - CARD_PADDING * 2,
    {
      size: 14,
      lineHeight: 20,
      color: COLORS.text,
      maxLines: 6,
      minSize: 12,
      shrinkToFit: true,
    },
  );
  const leftHeight =
    CARD_PADDING +
    whyLeadHeader.height +
    12 +
    overviewMeasure.height +
    12 +
    primaryExplanation.height +
    16 +
    outcomeMeasure.height +
    CARD_PADDING;
  const rightHeight = measureDimensionEvidenceCard(page.ctx, result, rightWidth, content);
  const topRowHeight = Math.max(leftHeight, rightHeight);

  drawBox(page.ctx, PAGE_MARGIN_X, y, leftWidth, topRowHeight, COLORS.surface, COLORS.line);
  cursorY = y + CARD_PADDING;
  cursorY += drawBoxSectionHeader(
    page,
    PAGE_MARGIN_X + CARD_PADDING,
    cursorY,
    leftWidth - CARD_PADDING * 2,
    content.export.report.whyItLeadsLabel,
  );
  cursorY += 12;
  drawMeasuredText(page.ctx, overviewMeasure, PAGE_MARGIN_X + CARD_PADDING, cursorY, COLORS.text);
  cursorY += overviewMeasure.height + 12;
  drawMeasuredText(
    page.ctx,
    primaryExplanation,
    PAGE_MARGIN_X + CARD_PADDING,
    cursorY,
    COLORS.muted,
  );
  cursorY += primaryExplanation.height + 16;
  drawMeasuredText(page.ctx, outcomeMeasure, PAGE_MARGIN_X + CARD_PADDING, cursorY, COLORS.text);

  drawDimensionEvidenceCard(
    page,
    result,
    PAGE_MARGIN_X + leftWidth + GRID_GAP,
    y,
    rightWidth,
    content,
  );

  y += topRowHeight + GRID_GAP;

  const caveatsHeader = measureBoxSectionHeader(
    page.ctx,
    leftWidth - CARD_PADDING * 2,
    content.export.report.caveatsLabel,
  );
  const caveatMeasure = measureTextBlock(
    page.ctx,
    content.narrative.outcomeCautionTexts[top.methodologyId],
    leftWidth - CARD_PADDING * 2,
    {
      size: 15,
      lineHeight: 22,
      maxLines: 8,
      minSize: 13,
      shrinkToFit: true,
    },
  );
  const supportHeader = document.interpretation.supportNotes.length
    ? measureTextBlock(
        page.ctx,
        content.interpretation.supportNoteLabel,
        leftWidth - CARD_PADDING * 2,
        {
          size: 12,
          lineHeight: 16,
          weight: 700,
          color: COLORS.accent,
          maxLines: 2,
          minSize: 10,
          shrinkToFit: true,
        },
      )
    : undefined;
  const supportList = document.interpretation.supportNotes.length
    ? measureBulletList(
        page.ctx,
        document.interpretation.supportNotes,
        leftWidth - CARD_PADDING * 2,
        {
          size: 14,
          lineHeight: 20,
          color: COLORS.muted,
          maxLines: 3,
          minSize: 12,
          shrinkToFit: true,
        },
      )
    : undefined;
  const caveatHeight =
    CARD_PADDING +
    caveatsHeader.height +
    12 +
    caveatMeasure.height +
    (supportHeader && supportList
      ? 18 + supportHeader.height + 10 + supportList.height
      : 0) +
    CARD_PADDING;
  const whyNotHeight = measureAlternativeTradeoffCard(
    page.ctx,
    alternativeRows,
    rightWidth,
    content,
  );
  const bottomHeight = Math.max(caveatHeight, whyNotHeight);

  drawBox(page.ctx, PAGE_MARGIN_X, y, leftWidth, bottomHeight, COLORS.surface, COLORS.line);
  cursorY = y + CARD_PADDING;
  cursorY += drawBoxSectionHeader(
    page,
    PAGE_MARGIN_X + CARD_PADDING,
    cursorY,
    leftWidth - CARD_PADDING * 2,
    content.export.report.caveatsLabel,
  );
  cursorY += 12;
  drawMeasuredText(page.ctx, caveatMeasure, PAGE_MARGIN_X + CARD_PADDING, cursorY, COLORS.text);
  cursorY += caveatMeasure.height;

  if (supportHeader && supportList) {
    cursorY += 18;
    drawMeasuredText(page.ctx, supportHeader, PAGE_MARGIN_X + CARD_PADDING, cursorY, COLORS.accent);
    cursorY += supportHeader.height + 10;
    drawBulletList(
      page,
      document.interpretation.supportNotes,
      PAGE_MARGIN_X + CARD_PADDING,
      cursorY,
      leftWidth - CARD_PADDING * 2,
      {
        size: 14,
        lineHeight: 20,
        color: COLORS.muted,
        maxLines: 3,
        minSize: 12,
        shrinkToFit: true,
      },
    );
  }

  drawAlternativeTradeoffCard(
    page,
    alternativeRows,
    PAGE_MARGIN_X + leftWidth + GRID_GAP,
    y,
    rightWidth,
    content,
  );

  y += bottomHeight + GRID_GAP;

  const thirdWidth = (CONTENT_WIDTH - GRID_GAP * 2) / 3;
  const alternateShiftTitle = result.ranking[1]?.methodologyTitle ?? "";
  const alternateShiftBody = result.ranking[1]
    ? getDimensionShiftText(result, result.ranking[1].methodologyId)
    : document.interpretation.summary;
  const firstMoveBody =
    top.outcomeText ?? content.narrative.nextStepTexts[top.methodologyId];
  const reinforcementBody = `The result is reinforced by ${topDrivers(result)
    .slice(0, 4)
    .join(", ")}.`;

  drawInsightCard(
    page,
    PAGE_MARGIN_X,
    y,
    thirdWidth,
    content.export.report.recommendedFirstMoveLabel,
    top.methodologyTitle ?? top.methodologyId,
    firstMoveBody,
    COLORS.panel,
  );
  drawInsightCard(
    page,
    PAGE_MARGIN_X + thirdWidth + GRID_GAP,
    y,
    thirdWidth,
    content.export.report.whatRaisesAlternativeLabel,
    alternateShiftTitle,
    alternateShiftBody,
  );
  drawInsightCard(
    page,
    PAGE_MARGIN_X + (thirdWidth + GRID_GAP) * 2,
    y,
    thirdWidth,
    content.interpretation.supportNoteLabel,
    content.export.report.keyDriversLabel,
    reinforcementBody || document.interpretation.summary,
  );
}

function getStayWithTopText(
  result: AssessmentResult,
  content: ResultsDictionary,
) {
  const top = result.ranking[0];

  if (!top) {
    return "";
  }

  return `${top.methodologyTitle ?? top.methodologyId} remains strongest while ${topDrivers(
    result,
  )
    .slice(0, 3)
    .join(", ")} continue to dominate the profile. ${
    top.tradeoffText ?? content.narrative.outcomeTexts[top.methodologyId]
  }`;
}

function getMoveTowardAlternativeText(
  result: AssessmentResult,
  content: ResultsDictionary,
) {
  const second = result.ranking[1];

  if (!second) {
    return "";
  }

  return `${getDimensionShiftText(result, second.methodologyId)} ${
    result.sensitivityHint?.noteText ?? second.tradeoffText ?? ""
  }`;
}

function getOperationalDifferenceText(
  result: AssessmentResult,
  content: ResultsDictionary,
) {
  const top = result.ranking[0];
  const second = result.ranking[1];

  if (!top || !second) {
    return "";
  }

  return `${top.methodologyTitle ?? top.methodologyId} emphasizes ${roleLabel(
    getMethodologyRole(top.methodologyId),
    content,
  )}, while ${second.methodologyTitle ?? second.methodologyId} emphasizes ${roleLabel(
    getMethodologyRole(second.methodologyId),
    content,
  )}. ${buildComparisonInsight(result, top, content)} ${buildComparisonInsight(
    result,
    second,
    content,
  )}`;
}

function buildCompositeStrategyCards(
  result: AssessmentResult,
  document: ResultExportDocument,
  content: ResultsDictionary,
) {
  const top = result.ranking[0];
  const second = result.ranking[1];

  if (!top || !second) {
    return [] as ColumnCard[];
  }

  const caveatTexts = [
    `${top.methodologyTitle ?? top.methodologyId}: ${content.narrative.outcomeCautionTexts[top.methodologyId]}`,
    `${second.methodologyTitle ?? second.methodologyId}: ${content.narrative.outcomeCautionTexts[second.methodologyId]}`,
  ];
  const comparisonTitle = `${top.methodologyTitle ?? top.methodologyId} / ${second.methodologyTitle ?? second.methodologyId}`;

  return [
    {
      measure: (ctx: CanvasRenderingContext2D, width: number) => {
        const header = measureBoxSectionHeader(
          ctx,
          width - CARD_PADDING * 2,
          document.interpretation.primaryReasonLabel,
          comparisonTitle,
        );
        const left = measureTextBlock(
          ctx,
          document.interpretation.primaryExplanation,
          (width - CARD_PADDING * 2 - GRID_GAP) / 2,
          {
            size: 15,
            lineHeight: 22,
            maxLines: 8,
            minSize: 13,
            shrinkToFit: true,
          },
        );
        const right = measureTextBlock(
          ctx,
          document.interpretation.secondaryExplanation ?? "",
          (width - CARD_PADDING * 2 - GRID_GAP) / 2,
          {
            size: 15,
            lineHeight: 22,
            maxLines: 8,
            minSize: 13,
            shrinkToFit: true,
          },
        );

        return CARD_PADDING + header.height + 16 + Math.max(left.height, right.height) + CARD_PADDING;
      },
      draw: (page: Page, x: number, y: number, width: number, height: number) => {
        drawBox(page.ctx, x, y, width, height, COLORS.surface, COLORS.line);
        let cursorY = y + CARD_PADDING;
        cursorY += drawBoxSectionHeader(
          page,
          x + CARD_PADDING,
          cursorY,
          width - CARD_PADDING * 2,
          document.interpretation.primaryReasonLabel,
          comparisonTitle,
        );
        cursorY += 16;
        const columnWidth = (width - CARD_PADDING * 2 - GRID_GAP) / 2;
        const topTitle = measureTextBlock(page.ctx, top.methodologyTitle ?? top.methodologyId, columnWidth, {
          size: 17,
          lineHeight: 21,
          weight: 700,
          maxLines: 2,
          minSize: 15,
          shrinkToFit: true,
        });
        const topText = measureTextBlock(page.ctx, document.interpretation.primaryExplanation, columnWidth, {
          size: 15,
          lineHeight: 22,
          maxLines: 8,
          minSize: 13,
          shrinkToFit: true,
        });
        const secondTitle = measureTextBlock(page.ctx, second.methodologyTitle ?? second.methodologyId, columnWidth, {
          size: 17,
          lineHeight: 21,
          weight: 700,
          maxLines: 2,
          minSize: 15,
          shrinkToFit: true,
        });
        const secondText = measureTextBlock(page.ctx, document.interpretation.secondaryExplanation ?? "", columnWidth, {
          size: 15,
          lineHeight: 22,
          maxLines: 8,
          minSize: 13,
          shrinkToFit: true,
        });
        drawMeasuredText(page.ctx, topTitle, x + CARD_PADDING, cursorY, COLORS.text);
        drawMeasuredText(page.ctx, topText, x + CARD_PADDING, cursorY + topTitle.height + 8, COLORS.text);
        drawMeasuredText(page.ctx, secondTitle, x + CARD_PADDING + columnWidth + GRID_GAP, cursorY, COLORS.text);
        drawMeasuredText(
          page.ctx,
          secondText,
          x + CARD_PADDING + columnWidth + GRID_GAP,
          cursorY + secondTitle.height + 8,
          COLORS.text,
        );
      },
    },
    {
      measure: (ctx: CanvasRenderingContext2D, width: number) => {
        const header = measureBoxSectionHeader(
          ctx,
          width - CARD_PADDING * 2,
          content.export.report.switchingConditionsLabel,
        );
        const sensitivity = measureTextBlock(
          ctx,
          result.sensitivityHint?.noteText ?? second.tradeoffText ?? "",
          width - CARD_PADDING * 2,
          {
            size: 15,
            lineHeight: 22,
            maxLines: 8,
            minSize: 13,
            shrinkToFit: true,
          },
        );
        return CARD_PADDING + header.height + 12 + sensitivity.height + CARD_PADDING;
      },
      draw: (page: Page, x: number, y: number, width: number, height: number) => {
        drawBox(page.ctx, x, y, width, height, COLORS.panel, COLORS.line);
        const cursorY =
          y +
          CARD_PADDING +
          drawBoxSectionHeader(
            page,
            x + CARD_PADDING,
            y + CARD_PADDING,
            width - CARD_PADDING * 2,
            content.export.report.switchingConditionsLabel,
          ) +
          12;
        drawText(
          page.ctx,
          result.sensitivityHint?.noteText ?? second.tradeoffText ?? "",
          x + CARD_PADDING,
          cursorY,
          width - CARD_PADDING * 2,
          {
            size: 15,
            lineHeight: 22,
            color: COLORS.text,
            maxLines: 8,
            minSize: 13,
            shrinkToFit: true,
          },
        );
      },
    },
    {
      measure: (ctx: CanvasRenderingContext2D, width: number) => {
        const header = measureBoxSectionHeader(
          ctx,
          width - CARD_PADDING * 2,
          content.export.report.operationalDifferenceLabel,
        );
        const notes = measureTextBlock(
          ctx,
          getOperationalDifferenceText(result, content),
          width - CARD_PADDING * 2,
          {
            size: 14,
            lineHeight: 20,
            color: COLORS.muted,
            maxLines: 8,
            minSize: 12,
            shrinkToFit: true,
          },
        );
        return CARD_PADDING + header.height + 12 + notes.height + CARD_PADDING;
      },
      draw: (page: Page, x: number, y: number, width: number, height: number) => {
        drawBox(page.ctx, x, y, width, height, COLORS.panel, COLORS.line);
        let cursorY = y + CARD_PADDING;
        cursorY += drawBoxSectionHeader(
          page,
          x + CARD_PADDING,
          cursorY,
          width - CARD_PADDING * 2,
          content.export.report.operationalDifferenceLabel,
        );
        cursorY += 12;
        drawText(
          page.ctx,
          getOperationalDifferenceText(result, content),
          x + CARD_PADDING,
          cursorY,
          width - CARD_PADDING * 2,
          {
            size: 14,
            lineHeight: 20,
            color: COLORS.muted,
            maxLines: 8,
            minSize: 12,
            shrinkToFit: true,
          },
        );
      },
    },
    {
      measure: (ctx: CanvasRenderingContext2D, width: number) => {
        const header = measureBoxSectionHeader(
          ctx,
          width - CARD_PADDING * 2,
          content.export.report.caveatsLabel,
        );
        const bullets = measureBulletList(ctx, caveatTexts, width - CARD_PADDING * 2, {
          size: 14,
          lineHeight: 20,
          color: COLORS.text,
          maxLines: 4,
          minSize: 12,
          shrinkToFit: true,
        });
        return CARD_PADDING + header.height + 12 + bullets.height + CARD_PADDING;
      },
      draw: (page: Page, x: number, y: number, width: number, height: number) => {
        drawBox(page.ctx, x, y, width, height, COLORS.surface, COLORS.line);
        let cursorY = y + CARD_PADDING;
        cursorY += drawBoxSectionHeader(
          page,
          x + CARD_PADDING,
          cursorY,
          width - CARD_PADDING * 2,
          content.export.report.caveatsLabel,
        );
        cursorY += 12;
        drawBulletList(
          page,
          caveatTexts,
          x + CARD_PADDING,
          cursorY,
          width - CARD_PADDING * 2,
          {
            size: 14,
            lineHeight: 20,
            color: COLORS.text,
            maxLines: 4,
            minSize: 12,
            shrinkToFit: true,
          },
        );
      },
    },
    {
      measure: (ctx: CanvasRenderingContext2D, width: number) => {
        const header = measureBoxSectionHeader(
          ctx,
          width - CARD_PADDING * 2,
          content.interpretation.supportNoteLabel,
        );
        const notes = measureBulletList(
          ctx,
          [
            content.narrative.nextStepTexts[top.methodologyId],
            content.narrative.nextStepTexts[second.methodologyId],
            ...(document.interpretation.supportNotes.length > 0
              ? document.interpretation.supportNotes
              : []),
          ],
          width - CARD_PADDING * 2,
          {
            size: 14,
            lineHeight: 20,
            color: COLORS.muted,
            maxLines: 4,
            minSize: 12,
            shrinkToFit: true,
          },
        );
        return CARD_PADDING + header.height + 12 + notes.height + CARD_PADDING;
      },
      draw: (page: Page, x: number, y: number, width: number, height: number) => {
        drawBox(page.ctx, x, y, width, height, COLORS.surface, COLORS.line);
        let cursorY = y + CARD_PADDING;
        cursorY += drawBoxSectionHeader(
          page,
          x + CARD_PADDING,
          cursorY,
          width - CARD_PADDING * 2,
          content.interpretation.supportNoteLabel,
        );
        cursorY += 12;
        drawBulletList(
          page,
          [
            content.narrative.nextStepTexts[top.methodologyId],
            content.narrative.nextStepTexts[second.methodologyId],
            ...(document.interpretation.supportNotes.length > 0
              ? document.interpretation.supportNotes
              : []),
          ],
          x + CARD_PADDING,
          cursorY,
          width - CARD_PADDING * 2,
          {
            size: 14,
            lineHeight: 20,
            color: COLORS.muted,
            maxLines: 4,
            minSize: 12,
            shrinkToFit: true,
          },
        );
      },
    },
  ];
}

function buildAlternativeStrategyCards(
  result: AssessmentResult,
  document: ResultExportDocument,
  content: ResultsDictionary,
) {
  const top = result.ranking[0];
  const second = result.ranking[1];

  if (!top || !second) {
    return [] as ColumnCard[];
  }

  return [
    {
      measure: (ctx: CanvasRenderingContext2D, width: number) => {
        const header = measureBoxSectionHeader(
          ctx,
          width - CARD_PADDING * 2,
          content.export.report.complementaryRecommendationLabel,
          second.methodologyTitle ?? second.methodologyId,
        );
        const role = measureTextBlock(
          ctx,
          `${content.export.report.coreRoleLabel}: ${roleLabel(getMethodologyRole(second.methodologyId), content)}`,
          width - CARD_PADDING * 2,
          {
            size: 15,
            lineHeight: 20,
            weight: 600,
            color: COLORS.muted,
            maxLines: 3,
            minSize: 13,
            shrinkToFit: true,
          },
        );
        const explanation = measureTextBlock(
          ctx,
          document.interpretation.secondaryExplanation ?? second.overviewText ?? "",
          width - CARD_PADDING * 2,
          {
            size: 15,
            lineHeight: 22,
            maxLines: 9,
            minSize: 13,
            shrinkToFit: true,
          },
        );
        return CARD_PADDING + header.height + 12 + role.height + 14 + explanation.height + CARD_PADDING;
      },
      draw: (page: Page, x: number, y: number, width: number, height: number) => {
        drawBox(page.ctx, x, y, width, height, COLORS.surface, COLORS.line);
        let cursorY = y + CARD_PADDING;
        cursorY += drawBoxSectionHeader(
          page,
          x + CARD_PADDING,
          cursorY,
          width - CARD_PADDING * 2,
          content.export.report.complementaryRecommendationLabel,
          second.methodologyTitle ?? second.methodologyId,
        );
        cursorY += 12;
        cursorY += drawText(
          page.ctx,
          `${content.export.report.coreRoleLabel}: ${roleLabel(getMethodologyRole(second.methodologyId), content)}`,
          x + CARD_PADDING,
          cursorY,
          width - CARD_PADDING * 2,
          {
            size: 15,
            lineHeight: 20,
            weight: 600,
            color: COLORS.muted,
            maxLines: 3,
            minSize: 13,
            shrinkToFit: true,
          },
        );
        cursorY += 14;
        drawText(
          page.ctx,
          document.interpretation.secondaryExplanation ?? second.overviewText ?? "",
          x + CARD_PADDING,
          cursorY,
          width - CARD_PADDING * 2,
          {
            size: 15,
            lineHeight: 22,
            color: COLORS.text,
            maxLines: 9,
            minSize: 13,
            shrinkToFit: true,
          },
        );
      },
    },
    {
      measure: (ctx: CanvasRenderingContext2D, width: number) => {
        const header = measureBoxSectionHeader(
          ctx,
          width - CARD_PADDING * 2,
          content.export.report.switchingConditionsLabel,
        );
        const text = measureTextBlock(
          ctx,
          result.sensitivityHint?.noteText ?? second.tradeoffText ?? "",
          width - CARD_PADDING * 2,
          {
            size: 15,
            lineHeight: 22,
            maxLines: 8,
            minSize: 13,
            shrinkToFit: true,
          },
        );
        return CARD_PADDING + header.height + 12 + text.height + CARD_PADDING;
      },
      draw: (page: Page, x: number, y: number, width: number, height: number) => {
        drawBox(page.ctx, x, y, width, height, COLORS.panel, COLORS.line);
        let cursorY = y + CARD_PADDING;
        cursorY += drawBoxSectionHeader(
          page,
          x + CARD_PADDING,
          cursorY,
          width - CARD_PADDING * 2,
          content.export.report.switchingConditionsLabel,
        );
        cursorY += 12;
        drawText(
          page.ctx,
          result.sensitivityHint?.noteText ?? second.tradeoffText ?? "",
          x + CARD_PADDING,
          cursorY,
          width - CARD_PADDING * 2,
          {
            size: 15,
            lineHeight: 22,
            color: COLORS.text,
            maxLines: 8,
            minSize: 13,
            shrinkToFit: true,
          },
        );
      },
    },
    {
      measure: (ctx: CanvasRenderingContext2D, width: number) => {
        const header = measureBoxSectionHeader(
          ctx,
          width - CARD_PADDING * 2,
          content.export.report.stayWithTopLabel,
        );
        const text = measureTextBlock(
          ctx,
          getStayWithTopText(result, content),
          width - CARD_PADDING * 2,
          {
            size: 15,
            lineHeight: 22,
            maxLines: 9,
            minSize: 13,
            shrinkToFit: true,
          },
        );
        return CARD_PADDING + header.height + 12 + text.height + CARD_PADDING;
      },
      draw: (page: Page, x: number, y: number, width: number, height: number) => {
        drawBox(page.ctx, x, y, width, height, COLORS.surface, COLORS.line);
        let cursorY = y + CARD_PADDING;
        cursorY += drawBoxSectionHeader(
          page,
          x + CARD_PADDING,
          cursorY,
          width - CARD_PADDING * 2,
          content.export.report.stayWithTopLabel,
        );
        cursorY += 12;
        drawText(
          page.ctx,
          getStayWithTopText(result, content),
          x + CARD_PADDING,
          cursorY,
          width - CARD_PADDING * 2,
          {
            size: 15,
            lineHeight: 22,
            color: COLORS.text,
            maxLines: 9,
            minSize: 13,
            shrinkToFit: true,
          },
        );
      },
    },
    {
      measure: (ctx: CanvasRenderingContext2D, width: number) => {
        const header = measureBoxSectionHeader(
          ctx,
          width - CARD_PADDING * 2,
          content.export.report.moveTowardAlternativeLabel,
        );
        const text = measureTextBlock(
          ctx,
          getMoveTowardAlternativeText(result, content),
          width - CARD_PADDING * 2,
          {
            size: 15,
            lineHeight: 22,
            maxLines: 9,
            minSize: 13,
            shrinkToFit: true,
          },
        );
        return CARD_PADDING + header.height + 12 + text.height + CARD_PADDING;
      },
      draw: (page: Page, x: number, y: number, width: number, height: number) => {
        drawBox(page.ctx, x, y, width, height, COLORS.panel, COLORS.line);
        let cursorY = y + CARD_PADDING;
        cursorY += drawBoxSectionHeader(
          page,
          x + CARD_PADDING,
          cursorY,
          width - CARD_PADDING * 2,
          content.export.report.moveTowardAlternativeLabel,
        );
        cursorY += 12;
        drawText(
          page.ctx,
          getMoveTowardAlternativeText(result, content),
          x + CARD_PADDING,
          cursorY,
          width - CARD_PADDING * 2,
          {
            size: 15,
            lineHeight: 22,
            color: COLORS.text,
            maxLines: 9,
            minSize: 13,
            shrinkToFit: true,
          },
        );
      },
    },
    {
      measure: (ctx: CanvasRenderingContext2D, width: number) => {
        const header = measureBoxSectionHeader(
          ctx,
          width - CARD_PADDING * 2,
          content.export.report.operationalDifferenceLabel,
        );
        const text = measureTextBlock(
          ctx,
          getOperationalDifferenceText(result, content),
          width - CARD_PADDING * 2,
          {
            size: 14,
            lineHeight: 20,
            color: COLORS.muted,
            maxLines: 8,
            minSize: 12,
            shrinkToFit: true,
          },
        );
        return CARD_PADDING + header.height + 12 + text.height + CARD_PADDING;
      },
      draw: (page: Page, x: number, y: number, width: number, height: number) => {
        drawBox(page.ctx, x, y, width, height, COLORS.surface, COLORS.line);
        let cursorY = y + CARD_PADDING;
        cursorY += drawBoxSectionHeader(
          page,
          x + CARD_PADDING,
          cursorY,
          width - CARD_PADDING * 2,
          content.export.report.operationalDifferenceLabel,
        );
        cursorY += 12;
        drawText(
          page.ctx,
          getOperationalDifferenceText(result, content),
          x + CARD_PADDING,
          cursorY,
          width - CARD_PADDING * 2,
          {
            size: 14,
            lineHeight: 20,
            color: COLORS.muted,
            maxLines: 8,
            minSize: 12,
            shrinkToFit: true,
          },
        );
      },
    },
  ];
}

function drawSecondaryStrategyPage(
  page: Page,
  result: AssessmentResult,
  document: ResultExportDocument,
  content: ResultsDictionary,
) {
  const interpretation = getRecommendationInterpretation(result);
  const description =
    interpretation.mode === "composite_strategy"
      ? document.interpretation.secondaryExplanation ?? document.interpretation.summary
      : result.sensitivityHint?.noteText ?? document.interpretation.secondaryExplanation ?? document.interpretation.summary;
  let y = drawSectionLead(
    page,
    content.export.report.secondaryStrategyTitle,
    description,
  );

  const cards =
    interpretation.mode === "composite_strategy"
      ? buildCompositeStrategyCards(result, document, content)
      : buildAlternativeStrategyCards(result, document, content);

  const columnWidth = (CONTENT_WIDTH - GRID_GAP) / 2;
  const topCard = cards[0];
  const topHeight = topCard?.measure(page.ctx, CONTENT_WIDTH) ?? 0;

  if (topCard) {
    topCard.draw(page, PAGE_MARGIN_X, y, CONTENT_WIDTH, topHeight);
    y += topHeight + GRID_GAP;
  }

  const remainingCards = cards.slice(1);

  for (let index = 0; index < remainingCards.length; index += 2) {
    const leftCard = remainingCards[index];
    const rightCard = remainingCards[index + 1];

    if (!leftCard) {
      break;
    }

    if (!rightCard) {
      const fullWidthHeight = leftCard.measure(page.ctx, CONTENT_WIDTH);
      leftCard.draw(page, PAGE_MARGIN_X, y, CONTENT_WIDTH, fullWidthHeight);
      y += fullWidthHeight + GRID_GAP;
      break;
    }

    const rowHeight = Math.max(
      leftCard.measure(page.ctx, columnWidth),
      rightCard.measure(page.ctx, columnWidth),
    );

    leftCard.draw(page, PAGE_MARGIN_X, y, columnWidth, rowHeight);
    rightCard.draw(
      page,
      PAGE_MARGIN_X + columnWidth + GRID_GAP,
      y,
      columnWidth,
      rowHeight,
    );
    y += rowHeight + GRID_GAP;
  }
}

function measureDimensionProfileRow(
  ctx: CanvasRenderingContext2D,
  result: AssessmentResult,
  dimension: AssessmentResult["dimensions"][number],
  content: ResultsDictionary,
) {
  const effectData = getDimensionDecisionEffect(result, dimension, content);
  const label = measureTextBlock(ctx, dimension.labelText ?? dimension.dimensionKey, 220, {
    size: 16,
    lineHeight: 20,
    weight: 700,
    maxLines: 2,
    minSize: 14,
    shrinkToFit: true,
  });
  const summaryHeader = measureTextBlock(
    ctx,
    content.export.report.currentSignalLabel,
    320,
    {
      size: 12,
      lineHeight: 16,
      weight: 700,
      color: COLORS.accent,
      maxLines: 2,
      minSize: 10,
      shrinkToFit: true,
    },
  );
  const summary = measureTextBlock(ctx, effectData.currentSignal, 320, {
    size: 14,
    lineHeight: 19,
    maxLines: 6,
    minSize: 12,
    shrinkToFit: true,
  });
  const effectTitle = measureTextBlock(
    ctx,
    content.export.report.effectOnRecommendationLabel,
    300,
    {
      size: 12,
      lineHeight: 16,
      weight: 700,
      color: COLORS.accent,
      maxLines: 2,
      minSize: 10,
      shrinkToFit: true,
    },
  );
  const supportLabel = measureTextBlock(
    ctx,
    `${content.export.report.supportsMethodologyLabel}: ${effectData.supportingMethodology}`,
    300,
    {
      size: 14,
      lineHeight: 19,
      weight: 600,
      maxLines: 3,
      minSize: 12,
      shrinkToFit: true,
    },
  );
  const weightLabel = measureTextBlock(
    ctx,
    `${content.export.report.decisionWeightLabel}: ${effectData.decisionWeight}`,
    300,
    {
      size: 14,
      lineHeight: 19,
      weight: 600,
      color: COLORS.muted,
      maxLines: 3,
      minSize: 12,
      shrinkToFit: true,
    },
  );
  const effect = measureTextBlock(
    ctx,
    effectData.explanation,
    300,
    {
      size: 13,
      lineHeight: 18,
      color: COLORS.muted,
      maxLines: 5,
      minSize: 11,
      shrinkToFit: true,
    },
  );
  const leftBlockHeight = label.height + 16 + 18;
  const summaryBlockHeight = summaryHeader.height + 8 + summary.height;
  const effectBlockHeight =
    effectTitle.height +
    8 +
    supportLabel.height +
    8 +
    weightLabel.height +
    10 +
    effect.height;

  return {
    label,
    summaryHeader,
    summary,
    effectTitle,
    supportLabel,
    weightLabel,
    effect,
    height:
      Math.max(leftBlockHeight, summaryBlockHeight, effectBlockHeight) + 32,
  };
}

function drawDimensionProfilePage(
  page: Page,
  result: AssessmentResult,
  content: ResultsDictionary,
) {
  let y = drawSectionLead(
    page,
    content.export.report.dimensionProfileTitle,
    content.pageIntro.description,
  );

  result.dimensions.forEach((dimension) => {
    const rowMeasure = measureDimensionProfileRow(
      page.ctx,
      result,
      dimension,
      content,
    );

    drawBox(
      page.ctx,
      PAGE_MARGIN_X,
      y,
      CONTENT_WIDTH,
      rowMeasure.height,
      COLORS.surface,
      COLORS.soft,
      12,
    );
    const baseY = y + 16;
    const leftX = PAGE_MARGIN_X + 20;

    drawMeasuredText(page.ctx, rowMeasure.label, leftX, baseY, COLORS.text);
    drawLevelBar(page.ctx, leftX, baseY + rowMeasure.label.height + 10, 160, dimension.level);
    drawText(
      page.ctx,
      `${dimension.level}/3`,
      leftX + 176,
      baseY + rowMeasure.label.height + 4,
      44,
      {
        size: 14,
        lineHeight: 18,
        weight: 700,
        color: COLORS.muted,
      },
    );

    drawMeasuredText(
      page.ctx,
      rowMeasure.summaryHeader,
      PAGE_MARGIN_X + 292,
      baseY,
      COLORS.accent,
    );
    drawMeasuredText(
      page.ctx,
      rowMeasure.summary,
      PAGE_MARGIN_X + 292,
      baseY + rowMeasure.summaryHeader.height + 8,
      COLORS.text,
    );
    drawMeasuredText(
      page.ctx,
      rowMeasure.effectTitle,
      PAGE_MARGIN_X + CONTENT_WIDTH - 268,
      baseY,
      COLORS.accent,
    );
    drawMeasuredText(
      page.ctx,
      rowMeasure.supportLabel,
      PAGE_MARGIN_X + CONTENT_WIDTH - 268,
      baseY + rowMeasure.effectTitle.height + 8,
      COLORS.text,
    );
    drawMeasuredText(
      page.ctx,
      rowMeasure.weightLabel,
      PAGE_MARGIN_X + CONTENT_WIDTH - 268,
      baseY + rowMeasure.effectTitle.height + 16 + rowMeasure.supportLabel.height,
      COLORS.muted,
    );
    drawMeasuredText(
      page.ctx,
      rowMeasure.effect,
      PAGE_MARGIN_X + CONTENT_WIDTH - 268,
      baseY +
        rowMeasure.effectTitle.height +
        26 +
        rowMeasure.supportLabel.height +
        rowMeasure.weightLabel.height,
      COLORS.muted,
    );

    y += rowMeasure.height + 14;
  });
}

function buildAnswerBlockCard(
  result: AssessmentResult,
  block: ResultExportDocument["answersSection"]["items"][number],
  content: ResultsDictionary,
): ColumnCard {
  return {
    measure: (ctx: CanvasRenderingContext2D, width: number) => {
      const titleWidth = 180;
      const answerWidth = 128;
      const mappingWidth = width - CARD_PADDING * 2 - titleWidth - answerWidth - 44;
      const header = measureBoxSectionHeader(
        ctx,
        width - CARD_PADDING * 2,
        block.label,
        block.title,
      );
      const rowHeights = block.questions.map((question) => {
        const title = measureTextBlock(ctx, question.questionTitle, titleWidth, {
          size: 14,
          lineHeight: 18,
          color: COLORS.muted,
          maxLines: 4,
          minSize: 12,
          shrinkToFit: true,
        });
        const answer = measureTextBlock(ctx, question.answerLabel, answerWidth, {
          size: 14,
          lineHeight: 18,
          weight: 700,
          maxLines: 3,
          minSize: 12,
          shrinkToFit: true,
        });
        const mapping = measureTextBlock(
          ctx,
          answerTrace(result, question.questionId) ||
            content.export.report.answerMappingLabel,
          mappingWidth,
          {
            size: 12,
            lineHeight: 16,
            color: COLORS.text,
            maxLines: 5,
            minSize: 11,
            shrinkToFit: true,
          },
        );

        return Math.max(title.height, answer.height, mapping.height) + 16;
      });

      return (
        CARD_PADDING +
        header.height +
        16 +
        sumHeights(rowHeights, 10) +
        CARD_PADDING
      );
    },
    draw: (page: Page, x: number, y: number, width: number, height: number) => {
      const titleWidth = 180;
      const answerWidth = 128;
      const mappingWidth = width - CARD_PADDING * 2 - titleWidth - answerWidth - 44;
      drawBox(page.ctx, x, y, width, height, COLORS.surface, COLORS.line);
      let cursorY = y + CARD_PADDING;
      cursorY += drawBoxSectionHeader(
        page,
        x + CARD_PADDING,
        cursorY,
        width - CARD_PADDING * 2,
        block.label,
        block.title,
      );
      cursorY += 16;

      block.questions.forEach((question, index) => {
        const title = measureTextBlock(page.ctx, question.questionTitle, titleWidth, {
          size: 14,
          lineHeight: 18,
          color: COLORS.muted,
          maxLines: 4,
          minSize: 12,
          shrinkToFit: true,
        });
        const answer = measureTextBlock(page.ctx, question.answerLabel, answerWidth, {
          size: 14,
          lineHeight: 18,
          weight: 700,
          maxLines: 3,
          minSize: 12,
          shrinkToFit: true,
        });
        const mapping = measureTextBlock(
          page.ctx,
          answerTrace(result, question.questionId) ||
            content.export.report.answerMappingLabel,
          mappingWidth,
          {
            size: 12,
            lineHeight: 16,
            color: COLORS.text,
            maxLines: 5,
            minSize: 11,
            shrinkToFit: true,
          },
        );
        const rowHeight = Math.max(title.height, answer.height, mapping.height) + 16;

        drawMeasuredText(page.ctx, title, x + CARD_PADDING, cursorY, COLORS.muted);
        drawMeasuredText(
          page.ctx,
          answer,
          x + CARD_PADDING + titleWidth + 18,
          cursorY,
          COLORS.text,
        );
        drawMeasuredText(
          page.ctx,
          mapping,
          x + CARD_PADDING + titleWidth + answerWidth + 36,
          cursorY,
          COLORS.text,
        );

        cursorY += rowHeight;

        if (index < block.questions.length - 1) {
          drawRule(page.ctx, x + CARD_PADDING, cursorY + 4, width - CARD_PADDING * 2);
          cursorY += 14;
        }
      });
    },
  };
}

function renderTraceabilityPages(
  result: AssessmentResult,
  document: ResultExportDocument,
  content: ResultsDictionary,
) {
  const cards = document.answersSection.items.map((block) =>
    buildAnswerBlockCard(result, block, content),
  );
  const measurePage = createPage();
  const headerY = drawSectionLead(
    measurePage,
    document.answersSection.title,
    document.answersSection.description,
  );
  const columnWidth = (CONTENT_WIDTH - GRID_GAP) / 2;
  const availableHeight = PAGE_HEIGHT - PAGE_MARGIN_BOTTOM - headerY;
  const columnPages = paginateCardsIntoColumns(
    measurePage.ctx,
    cards,
    2,
    columnWidth,
    availableHeight,
  );

  return columnPages.map((columnCards, index) => {
    const page = index === 0 ? measurePage : createPage();
    const startY =
      index === 0
        ? headerY
        : drawSectionLead(
            page,
            document.answersSection.title,
            document.answersSection.description,
          );

    drawColumnCardLayout(page, startY, columnCards);

    return page;
  });
}

function measureMethodologyNoteRow(
  ctx: CanvasRenderingContext2D,
  result: AssessmentResult,
  item: AssessmentResult["ranking"][number],
  width: number,
  content: ResultsDictionary,
) {
  const title = measureTextBlock(ctx, item.methodologyTitle ?? item.methodologyId, width - 270, {
    size: 18,
    lineHeight: 22,
    weight: 700,
    maxLines: 2,
    minSize: 16,
    shrinkToFit: true,
  });
  const badge = measureBadge(ctx, content.fitLabels[item.fitTier], 180);
  const chips = measureChipRows(
    ctx,
    strongestDimensions(result, item.methodologyId, 2),
    width - CARD_PADDING * 2,
    220,
  );
  const whenTitle = measureTextBlock(ctx, content.export.report.whenItWouldFitLabel, (width - CARD_PADDING * 2 - GRID_GAP) / 2, {
    size: 12,
    lineHeight: 16,
    weight: 700,
    color: COLORS.accent,
    maxLines: 2,
    minSize: 10,
    shrinkToFit: true,
  });
  const whenText = measureTextBlock(
    ctx,
    content.narrative.outcomeContrastTexts[item.methodologyId] ?? item.outcomeText ?? "",
    (width - CARD_PADDING * 2 - GRID_GAP) / 2,
    {
      size: 14,
      lineHeight: 19,
      maxLines: 6,
      minSize: 12,
      shrinkToFit: true,
    },
  );
  const whyTitle = measureTextBlock(ctx, content.export.report.whyItRankedLowerLabel, (width - CARD_PADDING * 2 - GRID_GAP) / 2, {
    size: 12,
    lineHeight: 16,
    weight: 700,
    color: COLORS.accent,
    maxLines: 2,
    minSize: 10,
    shrinkToFit: true,
  });
  const whyText = measureTextBlock(
    ctx,
    item.tradeoffText ?? content.narrative.outcomeCautionTexts[item.methodologyId],
    (width - CARD_PADDING * 2 - GRID_GAP) / 2,
    {
      size: 14,
      lineHeight: 19,
      color: COLORS.muted,
      maxLines: 6,
      minSize: 12,
      shrinkToFit: true,
    },
  );

  return {
    title,
    badge,
    chips,
    whenTitle,
    whenText,
    whyTitle,
    whyText,
    height:
      CARD_PADDING +
      Math.max(title.height, badge.height) +
      12 +
      chips.height +
      14 +
      Math.max(whenTitle.height + 8 + whenText.height, whyTitle.height + 8 + whyText.height) +
      CARD_PADDING,
  };
}

function drawMethodologyNotesPage(
  page: Page,
  result: AssessmentResult,
  content: ResultsDictionary,
) {
  const rows = result.ranking.slice(2);
  let y = drawSectionLead(
    page,
    content.export.report.methodologyNotesTitle,
    content.alternatives.description,
  );

  rows.forEach((item) => {
    const row = measureMethodologyNoteRow(page.ctx, result, item, CONTENT_WIDTH, content);
    const palette = fitPalette(item.fitTier);

    drawBox(page.ctx, PAGE_MARGIN_X, y, CONTENT_WIDTH, row.height, COLORS.surface, COLORS.soft, 12);
    let cursorY = y + CARD_PADDING;
    drawMeasuredText(page.ctx, row.title, PAGE_MARGIN_X + CARD_PADDING, cursorY, COLORS.text);
    drawBadge(
      page.ctx,
      content.fitLabels[item.fitTier],
      PAGE_MARGIN_X + CONTENT_WIDTH - CARD_PADDING - row.badge.width,
      cursorY,
      palette.fill,
      palette.color,
      180,
    );
    cursorY += Math.max(row.title.height, row.badge.height) + 12;
    drawChipRows(
      page,
      strongestDimensions(result, item.methodologyId, 2),
      PAGE_MARGIN_X + CARD_PADDING,
      cursorY,
      CONTENT_WIDTH - CARD_PADDING * 2,
    );
    cursorY += row.chips.height + 14;
    const columnWidth = (CONTENT_WIDTH - CARD_PADDING * 2 - GRID_GAP) / 2;
    drawMeasuredText(page.ctx, row.whenTitle, PAGE_MARGIN_X + CARD_PADDING, cursorY, COLORS.accent);
    drawMeasuredText(page.ctx, row.whenText, PAGE_MARGIN_X + CARD_PADDING, cursorY + row.whenTitle.height + 8, COLORS.text);
    drawMeasuredText(
      page.ctx,
      row.whyTitle,
      PAGE_MARGIN_X + CARD_PADDING + columnWidth + GRID_GAP,
      cursorY,
      COLORS.accent,
    );
    drawMeasuredText(
      page.ctx,
      row.whyText,
      PAGE_MARGIN_X + CARD_PADDING + columnWidth + GRID_GAP,
      cursorY + row.whyTitle.height + 8,
      COLORS.muted,
    );
    y += row.height + GRID_GAP;
  });

  const remainingHeight = PAGE_HEIGHT - PAGE_MARGIN_BOTTOM - y;

  if (remainingHeight > 180) {
    const shiftWidth = (CONTENT_WIDTH - GRID_GAP * 2) / 3;
    const second = result.ranking[1];
    const third = result.ranking[2];
    const fourth = result.ranking[3];

    drawInsightCard(
      page,
      PAGE_MARGIN_X,
      y,
      shiftWidth,
      content.export.report.rankingShiftLabel,
      second?.methodologyTitle ?? "",
      second ? getDimensionShiftText(result, second.methodologyId) : "",
      COLORS.panel,
    );
    drawInsightCard(
      page,
      PAGE_MARGIN_X + shiftWidth + GRID_GAP,
      y,
      shiftWidth,
      content.export.report.rankingShiftLabel,
      third?.methodologyTitle ?? "",
      third ? getDimensionShiftText(result, third.methodologyId) : "",
    );
    drawInsightCard(
      page,
      PAGE_MARGIN_X + (shiftWidth + GRID_GAP) * 2,
      y,
      shiftWidth,
      content.export.report.strongestDiscriminatorLabel,
      fourth?.methodologyTitle ?? "",
      fourth
        ? `${getDimensionShiftText(result, fourth.methodologyId)} ${getLowestFitPattern(result, content)}`
        : "",
    );
  }
}

function dataUrlToBytes(dataUrl: string) {
  const base64 = dataUrl.split(",")[1] ?? "";
  const binary = window.atob(base64);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return bytes;
}

function concatBytes(chunks: Uint8Array[]) {
  const total = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
  const out = new Uint8Array(total);
  let offset = 0;

  chunks.forEach((chunk) => {
    out.set(chunk, offset);
    offset += chunk.length;
  });

  return out;
}

function buildPdfBytes(canvases: HTMLCanvasElement[]) {
  const encoder = new TextEncoder();
  const header = new Uint8Array([
    0x25, 0x50, 0x44, 0x46, 0x2d, 0x31, 0x2e, 0x34, 0x0a, 0x25, 0xff, 0xff,
    0xff, 0xff, 0x0a,
  ]);
  const chunks: Uint8Array[] = [header];
  const offsets: number[] = [0];
  let length = header.length;
  let objectCount = 2;

  const addChunk = (chunk: Uint8Array) => {
    chunks.push(chunk);
    length += chunk.length;
  };
  const addText = (text: string) => addChunk(encoder.encode(text));
  const beginObject = (id: number) => {
    offsets[id] = length;
    addText(`${id} 0 obj\n`);
  };

  const catalogId = 1;
  const pagesId = 2;
  const pageIds: number[] = [];
  const imageIds: number[] = [];
  const contentIds: number[] = [];
  const images = canvases.map((canvas) =>
    dataUrlToBytes(canvas.toDataURL("image/jpeg", 0.92)),
  );

  for (let index = 0; index < canvases.length; index += 1) {
    pageIds.push(objectCount + 1);
    imageIds.push(objectCount + 2);
    contentIds.push(objectCount + 3);
    objectCount += 3;
  }

  beginObject(catalogId);
  addText(`<< /Type /Catalog /Pages ${pagesId} 0 R >>\nendobj\n`);
  beginObject(pagesId);
  addText(
    `<< /Type /Pages /Count ${canvases.length} /Kids [${pageIds
      .map((id) => `${id} 0 R`)
      .join(" ")}] >>\nendobj\n`,
  );

  for (let index = 0; index < canvases.length; index += 1) {
    const imageName = `Im${index + 1}`;
    const image = images[index];
    const stream = encoder.encode(`q\n595 0 0 842 0 0 cm\n/${imageName} Do\nQ\n`);

    beginObject(pageIds[index]);
    addText(
      `<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 595 842] /Resources << /XObject << /${imageName} ${imageIds[index]} 0 R >> >> /Contents ${contentIds[index]} 0 R >>\nendobj\n`,
    );
    beginObject(imageIds[index]);
    addText(
      `<< /Type /XObject /Subtype /Image /Width ${canvases[index].width} /Height ${canvases[index].height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${image.length} >>\nstream\n`,
    );
    addChunk(image);
    addText(`\nendstream\nendobj\n`);
    beginObject(contentIds[index]);
    addText(`<< /Length ${stream.length} >>\nstream\n`);
    addChunk(stream);
    addText(`endstream\nendobj\n`);
  }

  const xrefOffset = length;
  addText(`xref\n0 ${objectCount + 1}\n`);
  addText("0000000000 65535 f \n");

  for (let id = 1; id <= objectCount; id += 1) {
    addText(`${offsets[id].toString().padStart(10, "0")} 00000 n \n`);
  }

  addText(
    `trailer\n<< /Size ${objectCount + 1} /Root ${catalogId} 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`,
  );

  return concatBytes(chunks);
}

function renderPages(
  result: AssessmentResult,
  document: ResultExportDocument,
  content: ResultsDictionary,
) {
  const pages: Page[] = [
    createPage(),
    createPage(),
    createPage(),
    createPage(),
    createPage(),
  ];

  drawExecutiveSummaryPage(pages[0], result, document, content);
  drawRankedComparisonPage(pages[1], result, document, content);
  drawTopFitAnalysisPage(pages[2], result, document, content);
  drawSecondaryStrategyPage(pages[3], result, document, content);
  drawDimensionProfilePage(pages[4], result, content);
  pages.push(...renderTraceabilityPages(result, document, content));
  pages.push(createPage());
  drawMethodologyNotesPage(pages[pages.length - 1], result, content);
  pages.forEach((page, index) => drawFooter(page, index, pages.length));

  return pages.map((page) => page.canvas);
}

export async function downloadResultPdf(
  result: AssessmentResult,
  document: ResultExportDocument,
  content: ResultsDictionary,
) {
  const canvases = renderPages(result, document, content);
  const pdfBytes = buildPdfBytes(canvases);

  downloadBlob(
    getResultExportFilename(result, "pdf"),
    new Blob([pdfBytes], { type: "application/pdf" }),
  );
}
