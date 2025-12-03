import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import { UploadedFile } from "@/types";

// Set worker path
if (typeof window !== "undefined") {
  GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;
}

export async function pdfToImages(
  file: UploadedFile,
  format: "jpeg" | "png" = "jpeg",
  quality: number = 0.9
): Promise<Blob[]> {
  const images: Blob[] = [];
  const arrayBuffer = file.data;

  try {
    const loadingTask = getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;
    const numPages = pdf.numPages;

    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const viewport = page.getViewport({ scale: 2.0 });

      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      if (!context) throw new Error("Could not get canvas context");

      canvas.height = viewport.height;
      canvas.width = viewport.width;

      await page.render({
        canvasContext: context,
        viewport: viewport,
      }).promise;

      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (blob) => {
            if (blob) resolve(blob);
            else reject(new Error("Failed to create blob"));
          },
          `image/${format}`,
          quality
        );
      });

      images.push(blob);
    }

    return images;
  } catch (error) {
    throw new Error(`Failed to convert PDF to images: ${error}`);
  }
}

