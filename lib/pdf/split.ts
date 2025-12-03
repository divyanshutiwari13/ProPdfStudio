import { PDFDocument } from "pdf-lib";
import { UploadedFile } from "@/types";

export interface SplitOptions {
  pageRanges: string[]; // e.g., ["1-3", "5", "7-10"]
}

export async function splitPdf(file: UploadedFile, options: SplitOptions): Promise<Uint8Array[]> {
  const pdfDoc = await PDFDocument.load(file.data);
  const totalPages = pdfDoc.getPageCount();
  const results: Uint8Array[] = [];

  for (const range of options.pageRanges) {
    const newPdf = await PDFDocument.create();

    // Parse range (e.g., "1-3" or "5")
    const pages = parsePageRange(range, totalPages);

    for (const pageNum of pages) {
      if (pageNum >= 1 && pageNum <= totalPages) {
        const [copiedPage] = await newPdf.copyPages(pdfDoc, [pageNum - 1]);
        newPdf.addPage(copiedPage);
      }
    }

    if (newPdf.getPageCount() > 0) {
      results.push(await newPdf.save());
    }
  }

  return results;
}

function parsePageRange(range: string, maxPages: number): number[] {
  const pages: number[] = [];

  if (range.includes("-")) {
    const [start, end] = range.split("-").map((n) => parseInt(n.trim()));
    for (let i = start; i <= Math.min(end, maxPages); i++) {
      pages.push(i);
    }
  } else {
    const page = parseInt(range.trim());
    if (page >= 1 && page <= maxPages) {
      pages.push(page);
    }
  }

  return pages;
}

