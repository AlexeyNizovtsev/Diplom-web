import { downloadBlob } from "@/lib/export/downloadBlob";
import type {
  AssessmentResult,
  ResultExportDocument,
  ResultExportPayload,
} from "@/types/result";

const RESULT_EXPORT_VERSION = "1.0.0";

function buildExportFilename(
  result: AssessmentResult,
  extension: "json" | "pdf",
) {
  const createdAt = result.createdAt.slice(0, 10);

  return `methodology-match-${result.resultCode}-${createdAt}.${extension}`;
}

export function getResultExportFilename(
  result: AssessmentResult,
  extension: "json" | "pdf",
) {
  return buildExportFilename(result, extension);
}

export function downloadResultJson(
  result: AssessmentResult,
  document: ResultExportDocument,
  exportedAt: string,
) {
  const payload: ResultExportPayload = {
    exportVersion: RESULT_EXPORT_VERSION,
    exportedAt,
    result,
    document,
  };
  const blob = new Blob([`${JSON.stringify(payload, null, 2)}\n`], {
    type: "application/json;charset=utf-8",
  });

  downloadBlob(buildExportFilename(result, "json"), blob);
}
