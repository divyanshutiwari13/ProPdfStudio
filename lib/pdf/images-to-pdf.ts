import { PDFDocument } from "pdf-lib";
import { UploadedFile } from "@/types";
import sharp from "sharp";

export async function imagesToPdf(files: UploadedFile[]): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();

  for (const file of files) {
    try {
      // Convert image to buffer and get dimensions
      const buffer = Buffer.from(file.data);
      const image = sharp(buffer);
      const metadata = await image.metadata();
      const imageBuffer = await image.toBuffer();

      // Embed image in PDF
      let pdfImage;
      if (file.type === "image/jpeg" || file.type === "image/jpg") {
        pdfImage = await pdfDoc.embedJpg(imageBuffer);
      } else if (file.type === "image/png") {
        pdfImage = await pdfDoc.embedPng(imageBuffer);
      } else {
        // Convert to PNG for other formats
        const pngBuffer = await image.png().toBuffer();
        pdfImage = await pdfDoc.embedPng(pngBuffer);
      }

      // Add page with image
      const page = pdfDoc.addPage([
        metadata.width || 800,
        metadata.height || 600,
      ]);
      page.drawImage(pdfImage, {
        x: 0,
        y: 0,
        width: metadata.width || 800,
        height: metadata.height || 600,
      });
    } catch (error) {
      throw new Error(`Failed to process image ${file.name}: ${error}`);
    }
  }

  return await pdfDoc.save();
}

