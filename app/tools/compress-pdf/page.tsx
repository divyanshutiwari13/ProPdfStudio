"use client";

import { useState } from "react";
import FileUpload from "@/components/FileUpload";
import { UploadedFile } from "@/types";
import { processCompress, CompressionLevel } from "@/app/actions/pdf";
import { Download, Loader2 } from "lucide-react";
import { config } from "@/lib/config";
import { arrayBufferToBase64 } from "@/lib/utils/base64";

export default function CompressPdfPage() {
  const [file, setFile] = useState<UploadedFile | null>(null);
  const [compressionLevel, setCompressionLevel] = useState<CompressionLevel>("balanced");
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<{ data: string; fileName: string; originalSize: number; compressedSize: number } | null>(null);
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
      // Convert ArrayBuffer to base64 for server action
      const serializableFile = {
        name: file.name,
        size: file.size,
        type: file.type,
        data: arrayBufferToBase64(file.data),
      };

      const response = await processCompress(serializableFile, compressionLevel);
      if (response.success && response.data) {
        // Calculate compressed size from base64
        const compressedSize = Math.round((response.data.length * 3) / 4);
        setResult({ 
          data: response.data, 
          fileName: response.fileName,
          originalSize: file.size,
          compressedSize: compressedSize
        });
      } else {
        setError(response.error || "Failed to compress PDF");
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
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Compress PDF</h1>
        <p className="text-lg text-gray-600">
          Reduce PDF file size while maintaining quality. Choose your preferred compression level.
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
            Compression Level
          </label>
          <div className="space-y-2">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="compression"
                value="high"
                checked={compressionLevel === "high"}
                onChange={(e) => setCompressionLevel(e.target.value as CompressionLevel)}
                className="w-4 h-4 text-primary-600"
              />
              <div>
                <span className="font-medium text-gray-900">High Quality</span>
                <p className="text-sm text-gray-500">Best quality, moderate compression</p>
              </div>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="compression"
                value="balanced"
                checked={compressionLevel === "balanced"}
                onChange={(e) => setCompressionLevel(e.target.value as CompressionLevel)}
                className="w-4 h-4 text-primary-600"
              />
              <div>
                <span className="font-medium text-gray-900">Balanced</span>
                <p className="text-sm text-gray-500">Good balance between quality and size</p>
              </div>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="compression"
                value="smallest"
                checked={compressionLevel === "smallest"}
                onChange={(e) => setCompressionLevel(e.target.value as CompressionLevel)}
                className="w-4 h-4 text-primary-600"
              />
              <div>
                <span className="font-medium text-gray-900">Smallest Size</span>
                <p className="text-sm text-gray-500">Maximum compression, smaller file size</p>
              </div>
            </label>
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
          disabled={!file || processing}
          className="btn-primary flex items-center gap-2"
        >
          {processing ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Processing...
            </>
          ) : (
            "Compress PDF"
          )}
        </button>

        {result && (
          <>
            <div className="flex-1 card bg-blue-50 border border-blue-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Original Size</p>
                  <p className="font-semibold text-gray-900">
                    {(result.originalSize / 1024).toFixed(2)} KB
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Compressed Size</p>
                  <p className="font-semibold text-gray-900">
                    {(result.compressedSize / 1024).toFixed(2)} KB
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Reduction</p>
                  <p className={`font-semibold ${
                    result.compressedSize < result.originalSize 
                      ? "text-green-600" 
                      : "text-red-600"
                  }`}>
                    {result.compressedSize < result.originalSize ? "-" : "+"}
                    {Math.abs(
                      ((result.originalSize - result.compressedSize) / result.originalSize) * 100
                    ).toFixed(1)}%
                  </p>
                </div>
              </div>
            </div>
            <button onClick={handleDownload} className="btn-outline flex items-center gap-2">
              <Download className="h-5 w-5" />
              Download Result
            </button>
          </>
        )}
      </div>
    </div>
  );
}

