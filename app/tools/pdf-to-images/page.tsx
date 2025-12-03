"use client";

import { useState } from "react";
import FileUpload from "@/components/FileUpload";
import { UploadedFile } from "@/types";
import { Download, Loader2, FileArchive } from "lucide-react";
import { config } from "@/lib/config";
import JSZip from "jszip";

export default function PdfToImagesPage() {
  const [file, setFile] = useState<UploadedFile | null>(null);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<Blob[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFilesSelected = (files: UploadedFile[]) => {
    if (files.length > 0) {
      setFile(files[0]);
      setResult(null);
      setError(null);
    }
  };

  const handleProcess = async () => {
    if (!file) {
      setError("Please select a PDF file");
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      // Client-side PDF to images conversion using pdfjs-dist
      const { getDocument, GlobalWorkerOptions } = await import("pdfjs-dist");
      
      // Set worker
      GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

      const loadingTask = getDocument({ data: file.data });
      const pdf = await loadingTask.promise;
      const numPages = pdf.numPages;

      const blobs: Blob[] = [];

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
            "image/jpeg",
            0.9
          );
        });

        blobs.push(blob);
      }

      setResult(blobs);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setProcessing(false);
    }
  };

  const handleDownloadZip = async () => {
    if (!result || result.length === 0) return;

    try {
      const zip = new JSZip();
      
      // Add all images to the zip file
      for (let i = 0; i < result.length; i++) {
        const blob = result[i];
        const fileName = `page_${i + 1}.jpg`;
        zip.file(fileName, blob);
      }

      // Generate the zip file
      const zipBlob = await zip.generateAsync({ type: "blob" });
      
      // Create download link
      const link = document.createElement("a");
      link.href = URL.createObjectURL(zipBlob);
      link.download = `pdf_pages_${result.length}_images.zip`;
      link.click();
      
      // Clean up
      URL.revokeObjectURL(link.href);
    } catch (error) {
      setError("Failed to create ZIP file. Please try again.");
      console.error("ZIP creation error:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">PDF to Images</h1>
        <p className="text-lg text-gray-600">
          Convert PDF pages to JPG, PNG, or WebP images. Each page will be saved as a separate image.
        </p>
      </div>

      <div className="card mb-6">
        <FileUpload
          onFilesSelected={handleFilesSelected}
          acceptedTypes={config.allowedPdfTypes}
          multiple={false}
          maxSize={config.maxUploadSize}
          existingFiles={file ? [file] : []}
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      <div className="flex gap-4 mb-6">
        <button
          onClick={handleProcess}
          disabled={!file || processing}
          className="btn-primary flex items-center gap-2"
        >
          {processing ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Processing...
            </>
          ) : (
            "Convert to Images"
          )}
        </button>
      </div>

      {result && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Conversion Complete ({result.length} pages)
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            All {result.length} pages have been converted to images. Download them as a ZIP file.
          </p>
          <button
            onClick={handleDownloadZip}
            className="btn-primary flex items-center gap-2 w-full justify-center"
          >
            <FileArchive className="h-5 w-5" />
            Download All Pages as ZIP ({result.length} images)
          </button>
        </div>
      )}
    </div>
  );
}

