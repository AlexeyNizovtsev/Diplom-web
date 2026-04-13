import { downloadBlob } from "@/lib/export/downloadBlob";
import { getResultExportFilename } from "@/lib/export/downloadResultJson";
import type {
  AssessmentResult,
  FitTier,
  ResultExportDocument,
  ResultExportMethodologyCard,
} from "@/types/result";

const PAGE_WIDTH = 1240;
const PAGE_HEIGHT = 1754;
const PAGE_MARGIN_X = 72;
const PAGE_MARGIN_TOP = 72;
const PAGE_MARGIN_BOTTOM = 60;
const PAGE_CONTENT_WIDTH = PAGE_WIDTH - PAGE_MARGIN_X * 2;
const CARD_RADIUS = 28;
const CARD_GAP = 16;

interface PdfPageState {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  cursorY: number;
}

interface TextStyle {
  fontSize: number;
  lineHeight: number;
  fontWeight?: 400 | 500 | 600 | 700;
  color?: string;
}

interface CardPalette {
  fill: string;
  stroke: string;
  chipFill: string;
  chipText: string;
}

function createPage(): PdfPageState {
  const canvas = window.document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Canvas 2D context is unavailable.");
  }

  canvas.width = PAGE_WIDTH;
  canvas.height = PAGE_HEIGHT;
  context.fillStyle = "#f5efe8";
  context.fillRect(0, 0, PAGE_WIDTH, PAGE_HEIGHT);
  context.textBaseline = "top";

  return { canvas, context, cursorY: PAGE_MARGIN_TOP };
}

function setFont(
  context: CanvasRenderingContext2D,
  fontSize: number,
  fontWeight: 400 | 500 | 600 | 700 = 400,
) {
  context.font = `${fontWeight} ${fontSize}px Arial, "Segoe UI", sans-serif`;
}

function getLines(
  context: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  fontSize: number,
  fontWeight: 400 | 500 | 600 | 700 = 400,
) {
  setFont(context, fontSize, fontWeight);
  const normalizedText = text.replace(/\s+/g, " ").trim();

  if (!normalizedText) {
    return [];
  }

  const words = normalizedText.split(" ");
  const lines: string[] = [];
  let currentLine = words[0] ?? "";

  for (let index = 1; index < words.length; index += 1) {
    const word = words[index];
    const candidate = `${currentLine} ${word}`;

    if (context.measureText(candidate).width <= maxWidth) {
      currentLine = candidate;
      continue;
    }

    lines.push(currentLine);
    currentLine = word;
  }

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines;
}

function measureTextHeight(
  context: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  style: TextStyle,
) {
  return getLines(context, text, maxWidth, style.fontSize, style.fontWeight).length * style.lineHeight;
}

function drawWrappedText(
  context: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  style: TextStyle,
) {
  const lines = getLines(context, text, maxWidth, style.fontSize, style.fontWeight);

  setFont(context, style.fontSize, style.fontWeight);
  context.fillStyle = style.color ?? "#1a1d23";
  lines.forEach((line, index) => context.fillText(line, x, y + index * style.lineHeight));

  return lines.length * style.lineHeight;
}

function roundedRectPath(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  const safeRadius = Math.min(radius, width / 2, height / 2);

  context.beginPath();
  context.moveTo(x + safeRadius, y);
  context.lineTo(x + width - safeRadius, y);
  context.quadraticCurveTo(x + width, y, x + width, y + safeRadius);
  context.lineTo(x + width, y + height - safeRadius);
  context.quadraticCurveTo(x + width, y + height, x + width - safeRadius, y + height);
  context.lineTo(x + safeRadius, y + height);
  context.quadraticCurveTo(x, y + height, x, y + height - safeRadius);
  context.lineTo(x, y + safeRadius);
  context.quadraticCurveTo(x, y, x + safeRadius, y);
  context.closePath();
}

function drawCardBackground(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  fill: string,
  stroke: string,
) {
  roundedRectPath(context, x, y, width, height, CARD_RADIUS);
  context.fillStyle = fill;
  context.fill();
  context.strokeStyle = stroke;
  context.lineWidth = 2;
  context.stroke();
}

function getFitPalette(fitTier: FitTier): CardPalette {
  if (fitTier === "bestFit") {
    return { fill: "#fbf8f4", stroke: "#ddd7cf", chipFill: "#17191d", chipText: "#ffffff" };
  }
  if (fitTier === "strongAlternative") {
    return { fill: "#fff8f1", stroke: "#e3c7a7", chipFill: "#f47a12", chipText: "#ffffff" };
  }
  if (fitTier === "moderateFit") {
    return { fill: "#fffdf9", stroke: "#e8ddd2", chipFill: "#f6f1eb", chipText: "#5c626a" };
  }
  return { fill: "#fffdfb", stroke: "#ebe3da", chipFill: "#f4efe8", chipText: "#6a7079" };
}

function measurePillRows(
  context: CanvasRenderingContext2D,
  labels: string[],
  maxWidth: number,
  fontSize: number,
  paddingX = 16,
  pillHeight = 38,
  gap = 10,
) {
  if (labels.length === 0) {
    return 0;
  }

  setFont(context, fontSize, 700);
  let rows = 1;
  let lineWidth = 0;

  for (const label of labels) {
    const pillWidth = context.measureText(label).width + paddingX * 2;

    if (lineWidth > 0 && lineWidth + gap + pillWidth > maxWidth) {
      rows += 1;
      lineWidth = pillWidth;
      continue;
    }

    lineWidth = lineWidth > 0 ? lineWidth + gap + pillWidth : pillWidth;
  }

  return rows * pillHeight + (rows - 1) * gap;
}

function drawPillRows(
  context: CanvasRenderingContext2D,
  labels: string[],
  x: number,
  y: number,
  maxWidth: number,
  fill: string,
  textColor: string,
  stroke: string,
  fontSize: number,
  paddingX = 16,
  pillHeight = 38,
  gap = 10,
) {
  if (labels.length === 0) {
    return 0;
  }

  setFont(context, fontSize, 700);
  let cursorX = x;
  let cursorY = y;
  let rows = 1;

  for (const label of labels) {
    const pillWidth = context.measureText(label).width + paddingX * 2;

    if (cursorX > x && cursorX + pillWidth > x + maxWidth) {
      rows += 1;
      cursorX = x;
      cursorY += pillHeight + gap;
    }

    roundedRectPath(context, cursorX, cursorY, pillWidth, pillHeight, 999);
    context.fillStyle = fill;
    context.fill();
    context.strokeStyle = stroke;
    context.lineWidth = 1.5;
    context.stroke();
    context.fillStyle = textColor;
    context.fillText(label, cursorX + paddingX, cursorY + (pillHeight - fontSize) / 2 - 2);
    cursorX += pillWidth + gap;
  }

  return rows * pillHeight + (rows - 1) * gap;
}

function ensureSpace(pages: PdfPageState[], requiredHeight: number) {
  const currentPage = pages[pages.length - 1];

  if (currentPage.cursorY + requiredHeight <= PAGE_HEIGHT - PAGE_MARGIN_BOTTOM) {
    return currentPage;
  }

  const nextPage = createPage();
  pages.push(nextPage);

  return nextPage;
}

function pushBlock(
  pages: PdfPageState[],
  measureHeight: (context: CanvasRenderingContext2D) => number,
  draw: (page: PdfPageState, y: number, height: number) => void,
) {
  const height = measureHeight(pages[pages.length - 1].context);
  const page = ensureSpace(pages, height);
  const y = page.cursorY;

  draw(page, y, height);
  page.cursorY += height;
}

function drawSectionLead(pages: PdfPageState[], title: string, description?: string) {
  pushBlock(
    pages,
    (context) =>
      50 +
      (description
        ? measureTextHeight(context, description, PAGE_CONTENT_WIDTH, {
            fontSize: 20,
            lineHeight: 29,
          }) + 8
        : 0),
    (page, y) => {
      drawWrappedText(page.context, title, PAGE_MARGIN_X, y, PAGE_CONTENT_WIDTH, {
        fontSize: 34,
        lineHeight: 42,
        fontWeight: 700,
        color: "#16191d",
      });

      if (description) {
        drawWrappedText(page.context, description, PAGE_MARGIN_X, y + 44, PAGE_CONTENT_WIDTH, {
          fontSize: 20,
          lineHeight: 29,
          color: "#5f6670",
        });
      }
    },
  );
}

function drawHero(pages: PdfPageState[], document: ResultExportDocument) {
  pushBlock(
    pages,
    (context) =>
      26 +
      measureTextHeight(context, document.title, PAGE_CONTENT_WIDTH, {
        fontSize: 56,
        lineHeight: 66,
        fontWeight: 700,
      }) +
      measureTextHeight(context, document.description, PAGE_CONTENT_WIDTH, {
        fontSize: 24,
        lineHeight: 34,
      }) +
      18,
    (page, y) => {
      drawWrappedText(page.context, document.title, PAGE_MARGIN_X, y, PAGE_CONTENT_WIDTH, {
        fontSize: 56,
        lineHeight: 66,
        fontWeight: 700,
        color: "#15181d",
      });
      drawWrappedText(page.context, document.description, PAGE_MARGIN_X, y + 76, PAGE_CONTENT_WIDTH, {
        fontSize: 24,
        lineHeight: 34,
        color: "#5f6670",
      });
    },
  );
}

function drawMetadataRow(pages: PdfPageState[], document: ResultExportDocument) {
  const items = document.metadata.filter(
    (item) => item.id !== "questionnaireVersion" && item.id !== "locale",
  );
  const gap = 12;
  const cardWidth = (PAGE_CONTENT_WIDTH - gap * (items.length - 1)) / items.length;
  const cardHeight = 112;

  pushBlock(
    pages,
    () => cardHeight + 12,
    (page, y) => {
      items.forEach((item, index) => {
        const x = PAGE_MARGIN_X + index * (cardWidth + gap);

        drawCardBackground(page.context, x, y, cardWidth, cardHeight, "#fffaf4", "#e3d8cf");
        drawWrappedText(page.context, item.label, x + 20, y + 18, cardWidth - 40, {
          fontSize: 14,
          lineHeight: 20,
          fontWeight: 700,
          color: "#8c5d33",
        });
        drawWrappedText(page.context, item.value, x + 20, y + 48, cardWidth - 40, {
          fontSize: 20,
          lineHeight: 28,
          fontWeight: item.id === "resultCode" ? 700 : 600,
          color: "#17191d",
        });
      });
    },
  );
}

function measureReasonBox(
  context: CanvasRenderingContext2D,
  label: string,
  text: string,
  width: number,
) {
  return (
    24 +
    measureTextHeight(context, label, width - 40, {
      fontSize: 16,
      lineHeight: 22,
      fontWeight: 700,
    }) +
    8 +
    measureTextHeight(context, text, width - 40, {
      fontSize: 19,
      lineHeight: 28,
    }) +
    24
  );
}

function drawInterpretationPanel(pages: PdfPageState[], document: ResultExportDocument) {
  pushBlock(
    pages,
    (context) => {
      const width = PAGE_CONTENT_WIDTH - 56;
      let height =
        28 +
        measureTextHeight(context, document.interpretation.heading, width, {
          fontSize: 34,
          lineHeight: 42,
          fontWeight: 700,
        }) +
        18 +
        measureTextHeight(context, document.interpretation.summaryLabel, width, {
          fontSize: 16,
          lineHeight: 22,
          fontWeight: 700,
        }) +
        8 +
        measureTextHeight(context, document.interpretation.summary, width, {
          fontSize: 21,
          lineHeight: 31,
        }) +
        20 +
        measureReasonBox(
          context,
          document.interpretation.primaryReasonLabel,
          document.interpretation.primaryExplanation,
          width,
        );

      if (document.interpretation.secondaryExplanation) {
        height +=
          CARD_GAP +
          measureReasonBox(
            context,
            document.interpretation.secondaryReasonLabel,
            document.interpretation.secondaryExplanation,
            width,
          );
      }

      if (document.interpretation.supportNotes.length > 0) {
        height += 18 + 24;
        document.interpretation.supportNotes.forEach((note) => {
          height +=
            measureTextHeight(context, `• ${note}`, width - 48, {
              fontSize: 18,
              lineHeight: 27,
            }) + 8;
        });
        height += 24;
      }

      return height + 28;
    },
    (page, y, height) => {
      const x = PAGE_MARGIN_X;
      const innerX = x + 28;
      const width = PAGE_CONTENT_WIDTH - 56;
      let cursorY = y + 28;

      drawCardBackground(page.context, x, y, PAGE_CONTENT_WIDTH, height - 8, "#fbf8f4", "#ddd7cf");
      cursorY += drawWrappedText(page.context, document.interpretation.heading, innerX, cursorY, width, {
        fontSize: 34,
        lineHeight: 42,
        fontWeight: 700,
        color: "#17191d",
      });
      cursorY += 18;
      drawWrappedText(page.context, document.interpretation.summaryLabel, innerX, cursorY, width, {
        fontSize: 16,
        lineHeight: 22,
        fontWeight: 700,
        color: "#707780",
      });
      cursorY += 30;
      cursorY += drawWrappedText(page.context, document.interpretation.summary, innerX, cursorY, width, {
        fontSize: 21,
        lineHeight: 31,
        color: "#1b1f24",
      });
      cursorY += 20;

      const drawReason = (label: string, text: string) => {
        const boxHeight = measureReasonBox(page.context, label, text, width);
        drawCardBackground(page.context, innerX, cursorY, width, boxHeight, "#ffffff", "#e5d9cc");
        drawWrappedText(page.context, label, innerX + 20, cursorY + 24, width - 40, {
          fontSize: 16,
          lineHeight: 22,
          fontWeight: 700,
          color: "#707780",
        });
        drawWrappedText(page.context, text, innerX + 20, cursorY + 54, width - 40, {
          fontSize: 19,
          lineHeight: 28,
          color: "#1b1f24",
        });
        cursorY += boxHeight + CARD_GAP;
      };

      drawReason(
        document.interpretation.primaryReasonLabel,
        document.interpretation.primaryExplanation,
      );

      if (document.interpretation.secondaryExplanation) {
        drawReason(
          document.interpretation.secondaryReasonLabel,
          document.interpretation.secondaryExplanation,
        );
      }

      if (document.interpretation.supportNotes.length > 0) {
        const notesHeight =
          24 +
          document.interpretation.supportNotes.reduce(
            (sum, note) =>
              sum +
              measureTextHeight(page.context, `• ${note}`, width - 48, {
                fontSize: 18,
                lineHeight: 27,
              }) +
              8,
            0,
          ) +
          24;

        drawCardBackground(page.context, innerX, cursorY, width, notesHeight, "#f4efe8", "#e7ddd2");
        let noteY = cursorY + 24;

        document.interpretation.supportNotes.forEach((note) => {
          noteY += drawWrappedText(page.context, `• ${note}`, innerX + 24, noteY, width - 48, {
            fontSize: 18,
            lineHeight: 27,
            color: "#5f6670",
          }) + 8;
        });
      }
    },
  );
}

function measureRankingCardHeight(
  context: CanvasRenderingContext2D,
  item: ResultExportDocument["rankingSection"]["items"][number],
) {
  const width = PAGE_CONTENT_WIDTH - 152;
  let height =
    26 +
    measureTextHeight(context, item.title, width, {
      fontSize: 28,
      lineHeight: 36,
      fontWeight: 700,
    }) +
    CARD_GAP +
    38;

  if (item.interpretationLabels.length > 0) {
    height += CARD_GAP + measurePillRows(context, item.interpretationLabels, width, 12, 14, 34, 8);
  }

  if (item.rationale) {
    height +=
      CARD_GAP +
      measureTextHeight(context, item.rationale, width, {
        fontSize: 19,
        lineHeight: 28,
      });
  }

  return height + 26;
}

function drawRankingCard(
  pages: PdfPageState[],
  item: ResultExportDocument["rankingSection"]["items"][number],
) {
  pushBlock(
    pages,
    (context) => measureRankingCardHeight(context, item) + 8,
    (page, y, height) => {
      const palette = getFitPalette(item.fitTier);
      const x = PAGE_MARGIN_X;
      const circleX = x + 26;
      const circleSize = 54;
      const contentX = circleX + circleSize + 18;
      const contentWidth = PAGE_CONTENT_WIDTH - (contentX - x) - 26;
      let cursorY = y + 26;

      drawCardBackground(page.context, x, y, PAGE_CONTENT_WIDTH, height - 8, palette.fill, palette.stroke);
      roundedRectPath(page.context, circleX, y + 26, circleSize, circleSize, 999);
      page.context.fillStyle = item.fitTier === "bestFit" ? "#17191d" : "#f6f1eb";
      page.context.fill();
      page.context.strokeStyle = item.fitTier === "bestFit" ? "#17191d" : "#ddd1c7";
      page.context.lineWidth = 1.5;
      page.context.stroke();
      drawWrappedText(page.context, String(item.rank), circleX + 20, y + 42, circleSize - 20, {
        fontSize: 18,
        lineHeight: 22,
        fontWeight: 700,
        color: item.fitTier === "bestFit" ? "#ffffff" : "#5b6470",
      });

      cursorY += drawWrappedText(page.context, item.title, contentX, cursorY, contentWidth, {
        fontSize: 28,
        lineHeight: 36,
        fontWeight: 700,
        color: "#17191d",
      });
      cursorY += CARD_GAP;
      drawPillRows(page.context, [item.fitLabel], contentX, cursorY, contentWidth, palette.chipFill, palette.chipText, palette.chipFill, 12);
      cursorY += 38;

      if (item.interpretationLabels.length > 0) {
        cursorY += CARD_GAP;
        cursorY += drawPillRows(page.context, item.interpretationLabels, contentX, cursorY, contentWidth, "#f4f6f8", "#5b6470", "#d8dce3", 12, 14, 34, 8);
      }

      if (item.rationale) {
        cursorY += CARD_GAP;
        drawWrappedText(page.context, item.rationale, contentX, cursorY, contentWidth, {
          fontSize: 19,
          lineHeight: 28,
          color: "#5f6670",
        });
      }
    },
  );
}

function measureDimensionCardHeight(
  context: CanvasRenderingContext2D,
  label: string,
  summary?: string,
) {
  let height =
    18 +
    measureTextHeight(context, label, PAGE_CONTENT_WIDTH - 132, {
      fontSize: 16,
      lineHeight: 22,
      fontWeight: 700,
    }) +
    12 +
    34;

  if (summary) {
    height +=
      12 +
      measureTextHeight(context, summary, PAGE_CONTENT_WIDTH - 132, {
        fontSize: 16,
        lineHeight: 24,
      });
  }

  return height + 18;
}

function measureMethodologyCardHeight(
  context: CanvasRenderingContext2D,
  card: ResultExportMethodologyCard,
) {
  const width = PAGE_CONTENT_WIDTH - 56;
  let height =
    28 +
    measureTextHeight(context, card.title, width, {
      fontSize: 34,
      lineHeight: 42,
      fontWeight: 700,
    }) +
    16 +
    38;

  if (card.interpretationLabels.length > 0) {
    height += CARD_GAP + measurePillRows(context, card.interpretationLabels, width, 12, 14, 34, 8);
  }

  if (card.signalTags.length > 0) {
    height += CARD_GAP + measurePillRows(context, card.signalTags, width, 14, 16, 38, 8);
  }

  if (card.summary) {
    height +=
      CARD_GAP +
      measureTextHeight(context, card.summary, width, {
        fontSize: 19,
        lineHeight: 28,
        fontWeight: 600,
      });
  }

  if (card.description) {
    height +=
      CARD_GAP +
      measureTextHeight(context, card.description, width, {
        fontSize: 20,
        lineHeight: 29,
      });
  }

  if (card.supportingText) {
    height +=
      CARD_GAP +
      measureTextHeight(context, card.supportingText, width, {
        fontSize: 18,
        lineHeight: 27,
      });
  }

  if (card.dimensionsTitle && card.dimensions.length > 0) {
    height += CARD_GAP + 22 + 12;
    card.dimensions.forEach((dimension) => {
      height += measureDimensionCardHeight(context, dimension.label, dimension.summary) + 10;
    });
  }

  if (card.outcomeLabel && card.outcomeText) {
    height +=
      CARD_GAP +
      24 +
      22 +
      8 +
      measureTextHeight(context, card.outcomeText, width - 40, {
        fontSize: 19,
        lineHeight: 28,
      }) +
      24;
  }

  if (card.routeLabel && card.routeHref) {
    height +=
      CARD_GAP +
      measureTextHeight(context, `${card.routeLabel}: ${card.routeHref}`, width, {
        fontSize: 16,
        lineHeight: 24,
      });
  }

  return height + 28;
}

function drawMethodologyCard(
  pages: PdfPageState[],
  card: ResultExportMethodologyCard,
) {
  pushBlock(
    pages,
    (context) => measureMethodologyCardHeight(context, card) + 8,
    (page, y, height) => {
      const palette = getFitPalette(card.fitTier);
      const x = PAGE_MARGIN_X;
      const innerX = x + 28;
      const width = PAGE_CONTENT_WIDTH - 56;
      let cursorY = y + 28;

      drawCardBackground(page.context, x, y, PAGE_CONTENT_WIDTH, height - 8, palette.fill, palette.stroke);
      cursorY += drawWrappedText(page.context, card.title, innerX, cursorY, width, {
        fontSize: 34,
        lineHeight: 42,
        fontWeight: 700,
        color: "#17191d",
      });
      cursorY += 16;
      drawPillRows(page.context, [card.badgeLabel], innerX, cursorY, width, palette.chipFill, palette.chipText, palette.chipFill, 12);
      cursorY += 38;

      if (card.interpretationLabels.length > 0) {
        cursorY += CARD_GAP;
        cursorY += drawPillRows(page.context, card.interpretationLabels, innerX, cursorY, width, "#f4f6f8", "#5b6470", "#d8dce3", 12, 14, 34, 8);
      }

      if (card.signalTags.length > 0) {
        cursorY += CARD_GAP;
        cursorY += drawPillRows(
          page.context,
          card.signalTags,
          innerX,
          cursorY,
          width,
          card.fitTier === "bestFit" ? "#f47a12" : "#f6f1eb",
          card.fitTier === "bestFit" ? "#ffffff" : "#5c626a",
          card.fitTier === "bestFit" ? "#f2b37a" : "#ded5cb",
          14,
          16,
          38,
          8,
        );
      }

      if (card.summary) {
        cursorY += CARD_GAP;
        cursorY += drawWrappedText(page.context, card.summary, innerX, cursorY, width, {
          fontSize: 19,
          lineHeight: 28,
          fontWeight: 600,
          color: "#30353c",
        });
      }

      if (card.description) {
        cursorY += CARD_GAP;
        cursorY += drawWrappedText(page.context, card.description, innerX, cursorY, width, {
          fontSize: 20,
          lineHeight: 29,
          color: "#1b1f24",
        });
      }

      if (card.supportingText) {
        cursorY += CARD_GAP;
        cursorY += drawWrappedText(page.context, card.supportingText, innerX, cursorY, width, {
          fontSize: 18,
          lineHeight: 27,
          color: "#5f6670",
        });
      }

      if (card.dimensionsTitle && card.dimensions.length > 0) {
        cursorY += CARD_GAP;
        drawWrappedText(page.context, card.dimensionsTitle, innerX, cursorY, width, {
          fontSize: 16,
          lineHeight: 22,
          fontWeight: 700,
          color: "#707780",
        });
        cursorY += 34;

        card.dimensions.forEach((dimension) => {
          const boxHeight = measureDimensionCardHeight(page.context, dimension.label, dimension.summary);
          drawCardBackground(page.context, innerX, cursorY, width, boxHeight, "#ffffff", "#ead9cc");
          drawWrappedText(page.context, dimension.label, innerX + 18, cursorY + 18, width - 36, {
            fontSize: 16,
            lineHeight: 22,
            fontWeight: 700,
            color: "#666d76",
          });
          drawPillRows(page.context, [`${dimension.level} / 3`], innerX + 18, cursorY + 52, width - 36, "#f6f1eb", "#5a6069", "#e3d8cf", 12, 14, 34, 8);

          if (dimension.summary) {
            drawWrappedText(page.context, dimension.summary, innerX + 18, cursorY + 96, width - 36, {
              fontSize: 16,
              lineHeight: 24,
              color: "#5f6670",
            });
          }

          cursorY += boxHeight + 10;
        });
      }

      if (card.outcomeLabel && card.outcomeText) {
        cursorY += CARD_GAP;
        const outcomeHeight =
          24 +
          22 +
          8 +
          measureTextHeight(page.context, card.outcomeText, width - 40, {
            fontSize: 19,
            lineHeight: 28,
          }) +
          24;

        drawCardBackground(page.context, innerX, cursorY, width, outcomeHeight, "#f7f4f0", "#ddd1c7");
        drawWrappedText(page.context, card.outcomeLabel, innerX + 20, cursorY + 24, width - 40, {
          fontSize: 16,
          lineHeight: 22,
          fontWeight: 700,
          color: "#707780",
        });
        drawWrappedText(page.context, card.outcomeText, innerX + 20, cursorY + 54, width - 40, {
          fontSize: 19,
          lineHeight: 28,
          color: "#1b1f24",
        });
        cursorY += outcomeHeight;
      }

      if (card.routeLabel && card.routeHref) {
        cursorY += CARD_GAP;
        drawWrappedText(page.context, `${card.routeLabel}: ${card.routeHref}`, innerX, cursorY, width, {
          fontSize: 16,
          lineHeight: 24,
          color: "#5f6670",
        });
      }
    },
  );
}

function measureAnswersCardHeight(
  context: CanvasRenderingContext2D,
  block: ResultExportDocument["answersSection"]["items"][number],
) {
  const width = PAGE_CONTENT_WIDTH - 56;
  let height =
    28 +
    measureTextHeight(context, block.title, width, {
      fontSize: 26,
      lineHeight: 34,
      fontWeight: 700,
    }) +
    20;

  block.questions.forEach((question) => {
    height +=
      measureTextHeight(context, question.questionTitle, width, {
        fontSize: 18,
        lineHeight: 26,
      }) +
      8 +
      measureTextHeight(context, question.answerLabel, width - 24, {
        fontSize: 18,
        lineHeight: 26,
        fontWeight: 600,
      }) +
      18;
  });

  return height + 18;
}

function drawAnswersCard(
  pages: PdfPageState[],
  block: ResultExportDocument["answersSection"]["items"][number],
) {
  pushBlock(
    pages,
    (context) => measureAnswersCardHeight(context, block) + 8,
    (page, y, height) => {
      const x = PAGE_MARGIN_X;
      const innerX = x + 28;
      const width = PAGE_CONTENT_WIDTH - 56;
      let cursorY = y + 28;

      drawCardBackground(page.context, x, y, PAGE_CONTENT_WIDTH, height - 8, "#fbf8f5", "#e7d1bf");
      cursorY += drawWrappedText(page.context, block.title, innerX, cursorY, width, {
        fontSize: 26,
        lineHeight: 34,
        fontWeight: 700,
        color: "#14171c",
      });
      cursorY += 20;

      block.questions.forEach((question) => {
        cursorY += drawWrappedText(page.context, question.questionTitle, innerX, cursorY, width, {
          fontSize: 18,
          lineHeight: 26,
          color: "#6a6e75",
        });
        cursorY += 8;
        cursorY += drawWrappedText(page.context, question.answerLabel, innerX + 24, cursorY, width - 24, {
          fontSize: 18,
          lineHeight: 26,
          fontWeight: 600,
          color: "#8b6a46",
        });
        cursorY += 18;
      });
    },
  );
}

function drawFooter(page: PdfPageState, pageIndex: number, pageCount: number) {
  const footerText = `${pageIndex + 1} / ${pageCount}`;

  setFont(page.context, 16, 600);
  page.context.fillStyle = "#8a9097";
  page.context.fillText(
    footerText,
    PAGE_WIDTH - PAGE_MARGIN_X - page.context.measureText(footerText).width,
    PAGE_HEIGHT - 40,
  );
}

function dataUrlToBytes(dataUrl: string) {
  const base64 = dataUrl.split(",")[1] ?? "";
  const binaryString = window.atob(base64);
  const bytes = new Uint8Array(binaryString.length);

  for (let index = 0; index < binaryString.length; index += 1) {
    bytes[index] = binaryString.charCodeAt(index);
  }

  return bytes;
}

function concatenateUint8Arrays(chunks: Uint8Array[]) {
  const totalLength = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
  const combined = new Uint8Array(totalLength);
  let offset = 0;

  for (const chunk of chunks) {
    combined.set(chunk, offset);
    offset += chunk.length;
  }

  return combined;
}

function buildPdfBytes(canvases: HTMLCanvasElement[]) {
  const encoder = new TextEncoder();
  const header = new Uint8Array([0x25,0x50,0x44,0x46,0x2d,0x31,0x2e,0x34,0x0a,0x25,0xff,0xff,0xff,0xff,0x0a]);
  const chunks: Uint8Array[] = [header];
  let length = header.length;
  const offsets: number[] = [0];
  let objectCount = 2;

  const addChunk = (chunk: Uint8Array) => {
    chunks.push(chunk);
    length += chunk.length;
  };
  const addText = (value: string) => addChunk(encoder.encode(value));
  const beginObject = (id: number) => {
    offsets[id] = length;
    addText(`${id} 0 obj\n`);
  };

  const catalogId = 1;
  const pagesId = 2;
  const pageIds: number[] = [];
  const imageIds: number[] = [];
  const contentIds: number[] = [];
  const images = canvases.map((canvas) => dataUrlToBytes(canvas.toDataURL("image/jpeg", 0.92)));

  for (let index = 0; index < canvases.length; index += 1) {
    pageIds.push(objectCount + 1);
    imageIds.push(objectCount + 2);
    contentIds.push(objectCount + 3);
    objectCount += 3;
  }

  beginObject(catalogId);
  addText(`<< /Type /Catalog /Pages ${pagesId} 0 R >>\nendobj\n`);
  beginObject(pagesId);
  addText(`<< /Type /Pages /Count ${canvases.length} /Kids [${pageIds.map((id) => `${id} 0 R`).join(" ")}] >>\nendobj\n`);

  for (let index = 0; index < canvases.length; index += 1) {
    const imageName = `Im${index + 1}`;
    const image = images[index];
    const stream = encoder.encode(`q\n595 0 0 842 0 0 cm\n/${imageName} Do\nQ\n`);

    beginObject(pageIds[index]);
    addText(`<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 595 842] /Resources << /XObject << /${imageName} ${imageIds[index]} 0 R >> >> /Contents ${contentIds[index]} 0 R >>\nendobj\n`);
    beginObject(imageIds[index]);
    addText(`<< /Type /XObject /Subtype /Image /Width ${canvases[index].width} /Height ${canvases[index].height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${image.length} >>\nstream\n`);
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

  addText(`trailer\n<< /Size ${objectCount + 1} /Root ${catalogId} 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`);
  return concatenateUint8Arrays(chunks);
}

function renderDocumentToCanvases(document: ResultExportDocument) {
  const pages = [createPage()];

  drawHero(pages, document);
  drawMetadataRow(pages, document);
  drawSectionLead(pages, document.interpretation.title);
  drawInterpretationPanel(pages, document);
  drawSectionLead(pages, document.rankingSection.title, document.rankingSection.description);
  document.rankingSection.items.forEach((item) => drawRankingCard(pages, item));
  drawSectionLead(pages, document.featuredSection.title, document.featuredSection.description);
  document.featuredSection.items.forEach((card) => drawMethodologyCard(pages, card));

  if (document.alternativesSection.items.length > 0) {
    drawSectionLead(pages, document.alternativesSection.title, document.alternativesSection.description);
    document.alternativesSection.items.forEach((card) => drawMethodologyCard(pages, card));
  }

  if (document.answersSection.items.length > 0) {
    drawSectionLead(pages, document.answersSection.title, document.answersSection.description);
    document.answersSection.items.forEach((block) => drawAnswersCard(pages, block));
  }

  pages.forEach((page, index) => drawFooter(page, index, pages.length));

  return pages.map((page) => page.canvas);
}

export async function downloadResultPdf(
  result: AssessmentResult,
  document: ResultExportDocument,
) {
  const canvases = renderDocumentToCanvases(document);
  const pdfBytes = buildPdfBytes(canvases);
  downloadBlob(
    getResultExportFilename(result, "pdf"),
    new Blob([pdfBytes], { type: "application/pdf" }),
  );
}
