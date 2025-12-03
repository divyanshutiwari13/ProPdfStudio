"use client";

import { useState } from "react";
import FileUpload from "@/components/FileUpload";
import { UploadedFile } from "@/types";
import { processImagesToPdf } from "@/app/actions/pdf";
import { Download, Loader2 } from "lucide-react";
import { config } from "@/lib/config";
import { arrayBufferToBase64 } from "@/lib/utils/base64";

export default function ImagesToPdfPage() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<{ data: string; fileName: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFilesSelected = (selectedFiles: UploadedFile[]) => {
    setFiles(selectedFiles);
    setResult(null);
    setError(null);
  };

  const handleProcess = async () => {
    if (files.length === 0) {
      setError("Please select at least one image file");
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      // Convert ArrayBuffer to base64 for server action
      const serializableFiles = files.map((file) => ({
        name: file.name,
        size: file.size,
        type: file.type,
        data: arrayBufferToBase64(file.data),
      }));

      const response = await processImagesToPdf(serializableFiles);
      if (response.success && response.data) {
        setResult({ data: response.data, fileName: response.fileName });
      } else {
        setError(response.error || "Failed to create PDF from images");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!result) return;
    const link = document.createElement("a");
    link.href = `data:application/pdf;base64,${result.data}`;
    link.download = result.fileName;
    link.click();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Images to PDF</h1>
        <p className="text-lg text-gray-600">
          Combine multiple images into a single PDF document. Supports JPG, PNG, and WebP formats.
        </p>
      </div>

      <div className="card mb-6">
        <FileUpload
          onFilesSelected={handleFilesSelected}
          acceptedTypes={config.allowedImageTypes}
          multiple={true}
          maxSize={config.maxUploadSize}
          existingFiles={files}
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      <div className="flex gap-4">
        <button
          onClick={handleProcess}
          disabled={files.length === 0 || processing}
          className="btn-primary flex items-center gap-2"
        >
          {processing ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Processing...
            </>
          ) : (
            "Create PDF"
          )}
        </button>

        {result && (
          <button onClick={handleDownload} className="btn-outline flex items-center gap-2">
            <Download className="h-5 w-5" />
            Download PDF
          </button>
        )}
      </div>
    </div>
  );
}

