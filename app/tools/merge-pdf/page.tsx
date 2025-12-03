"use client";

import { useState } from "react";
import FileUpload from "@/components/FileUpload";
import { UploadedFile } from "@/types";
import { processMerge } from "@/app/actions/pdf";
import { ArrowUp, ArrowDown, Download, Loader2 } from "lucide-react";
import { config } from "@/lib/config";
import { arrayBufferToBase64 } from "@/lib/utils/base64";

export default function MergePdfPage() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<{ data: string; fileName: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFilesSelected = (selectedFiles: UploadedFile[]) => {
    setFiles(selectedFiles);
    setResult(null);
    setError(null);
  };

  const moveFile = (index: number, direction: "up" | "down") => {
    const newFiles = [...files];
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex >= 0 && newIndex < files.length) {
      [newFiles[index], newFiles[newIndex]] = [newFiles[newIndex], newFiles[index]];
      setFiles(newFiles);
    }
  };

  const handleProcess = async () => {
    if (files.length < 2) {
      setError("Please select at least 2 PDF files");
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

      const response = await processMerge(serializableFiles);
      if (response.success && response.data) {
        setResult({ data: response.data, fileName: response.fileName });
      } else {
        setError(response.error || "Failed to merge PDFs");
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
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Merge PDF</h1>
        <p className="text-lg text-gray-600">
          Combine multiple PDF files into one document. Drag and drop your files or click to browse.
        </p>
      </div>

      <div className="card mb-6">
        <FileUpload
          onFilesSelected={handleFilesSelected}
          acceptedTypes={config.allowedPdfTypes}
          multiple={true}
          maxSize={config.maxUploadSize}
          existingFiles={files}
        />
      </div>

      {files.length > 1 && (
        <div className="card mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">File Order</h3>
          <div className="space-y-2">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-50 rounded-lg p-3"
              >
                <span className="text-sm font-medium text-gray-700">
                  {index + 1}. {file.name}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => moveFile(index, "up")}
                    disabled={index === 0}
                    className="p-1 text-gray-600 hover:text-gray-900 disabled:opacity-30"
                  >
                    <ArrowUp className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => moveFile(index, "down")}
                    disabled={index === files.length - 1}
                    className="p-1 text-gray-600 hover:text-gray-900 disabled:opacity-30"
                  >
                    <ArrowDown className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      <div className="flex gap-4">
        <button
          onClick={handleProcess}
          disabled={files.length < 2 || processing}
          className="btn-primary flex items-center gap-2"
        >
          {processing ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Processing...
            </>
          ) : (
            "Merge PDFs"
          )}
        </button>

        {result && (
          <button onClick={handleDownload} className="btn-outline flex items-center gap-2">
            <Download className="h-5 w-5" />
            Download Result
          </button>
        )}
      </div>
    </div>
  );
}

