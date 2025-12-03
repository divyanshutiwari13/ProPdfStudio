import { PDFDocument } from "pdf-lib";
import { UploadedFile } from "@/types";

export type CompressionLevel = "high" | "balanced" | "smallest";

export async function compressPdf(
  file: UploadedFile,
  level: CompressionLevel = "balanced"
): Promise<Uint8Array> {
  try {
    // Load the original PDF
    const originalPdf = await PDFDocument.load(file.data);
    const numPages = originalPdf.getPageCount();

    // Create a new PDF document (this helps remove unused objects)
    const compressedPdf = await PDFDocument.create();

    // Copy all pages to the new document
    // This process can help reduce file size by removing unused objects
    const pageIndices = Array.from({ length: numPages }, (_, i) => i);
    const copiedPages = await compressedPdf.copyPages(originalPdf, pageIndices);
    
    // Add all copied pages to the new document
    copiedPages.forEach((page) => {
      compressedPdf.addPage(page);
    });

    // Define save options based on compression level
    // pdf-lib has limited compression options, but useObjectStreams helps
    const saveOptions: {
      useObjectStreams?: boolean;
    } = {
      useObjectStreams: true, // Enable object streams for all levels
    };

    // Save the compressed PDF
    const compressedBytes = await compressedPdf.save(saveOptions);

    return compressedBytes;
  } catch (error) {
    // If compression fails, provide detailed error
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("PDF compression error:", errorMessage);
    
    // Try to load and save without compression as fallback
    try {
      const pdfDoc = await PDFDocument.load(file.data);
      return await pdfDoc.save({ useObjectStreams: true });
    } catch (fallbackError) {
      throw new Error(`Failed to compress PDF: ${errorMessage}. Fallback also failed.`);
    }
  }
}

