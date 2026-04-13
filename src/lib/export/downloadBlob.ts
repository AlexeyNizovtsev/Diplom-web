export function downloadBlob(filename: string, blob: Blob) {
  const objectUrl = window.URL.createObjectURL(blob);
  const link = window.document.createElement("a");

  link.href = objectUrl;
  link.download = filename;
  link.style.display = "none";

  window.document.body.appendChild(link);
  link.click();
  link.remove();

  window.setTimeout(() => {
    window.URL.revokeObjectURL(objectUrl);
  }, 0);
}
