"use client";

import { useState } from "react";
import FileUpload from "@/components/FileUpload";
import { UploadedFile } from "@/types";
import { processSplit } from "@/app/actions/pdf";
import { Download, Loader2 } from "lucide-react";
import { config } from "@/lib/config";
import { arrayBufferToBase64 } from "@/lib/utils/base64";

export default function SplitPdfPage() {
  const [file, setFile] = useState<UploadedFile | null>(null);
  const [pageRanges, setPageRanges] = useState<string>("");
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<{ data: string[]; fileName: string } | null>(null);
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

    if (!pageRanges.trim()) {
      setError("Please enter page ranges (e.g., 1-3, 5, 7-10)");
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      // Convert ArrayBuffer to base64 for server action
      const serializableFile = {
        name: file.name,
        size: file.size,
        type: file.type,
        data: arrayBufferToBase64(file.data),
      };

      const ranges = pageRanges.split(",").map((r) => r.trim());
      const response = await processSplit(serializableFile, { pageRanges: ranges });
      if (response.success && response.data) {
        setResult({ data: response.data, fileName: response.fileName });
      } else {
        setError(response.error || "Failed to split PDF");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setProcessing(false);
    }
  };

  const handleDownload = (index: number) => {
    if (!result) return;
    const link = document.createElement("a");
    link.href = `data:application/pdf;base64,${result.data[index]}`;
    link.download = `split_${index + 1}.pdf`;
    link.click();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Split PDF</h1>
        <p className="text-lg text-gray-600">
          Extract pages from a PDF or split into multiple files. Enter page ranges separated by commas.
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

      {file && (
        <div className="card mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Page Ranges (e.g., 1-3, 5, 7-10)
          </label>
          <input
            type="text"
            value={pageRanges}
            onChange={(e) => setPageRanges(e.target.value)}
            placeholder="1-3, 5, 7-10"
            className="input"
          />
          <p className="text-xs text-gray-500 mt-2">
            Enter page ranges separated by commas. Use format: 1-3 (pages 1 to 3), 5 (single page),
            or 7-10 (pages 7 to 10).
          </p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      <div className="flex gap-4 mb-6">
        <button
          onClick={handleProcess}
          disabled={!file || !pageRanges.trim() || processing}
          className="btn-primary flex items-center gap-2"
        >
          {processing ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Processing...
            </>
          ) : (
            "Split PDF"
          )}
        </button>
      </div>

      {result && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Download Results</h3>
          <div className="space-y-2">
            {result.data.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDownload(index)}
                className="btn-outline flex items-center gap-2 w-full justify-center"
              >
                <Download className="h-5 w-5" />
                Download Split {index + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

