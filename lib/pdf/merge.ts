import { PDFDocument } from "pdf-lib";
import { UploadedFile } from "@/types";

export async function mergePdfs(files: UploadedFile[]): Promise<Uint8Array> {
  const mergedPdf = await PDFDocument.create();

  for (const file of files) {
    try {
      const pdfDoc = await PDFDocument.load(file.data);
      const pages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
      pages.forEach((page) => mergedPdf.addPage(page));
    } catch (error) {
      throw new Error(`Failed to process file ${file.name}: ${error}`);
    }
  }

  return await mergedPdf.save();
}

