"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X, File } from "lucide-react";
import { UploadedFile } from "@/types";

interface FileUploadProps {
  onFilesSelected: (files: UploadedFile[]) => void;
  acceptedTypes: string[];
  multiple?: boolean;
  maxSize?: number;
  existingFiles?: UploadedFile[];
}

export default function FileUpload({
  onFilesSelected,
  acceptedTypes,
  multiple = false,
  maxSize = 100 * 1024 * 1024, // 100MB default
  existingFiles = [],
}: FileUploadProps) {
  const [files, setFiles] = useState<UploadedFile[]>(existingFiles);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<Map<string, number>>(new Map());

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setError(null);
      const progressMap = new Map<string, number>();

      if (!multiple && files.length > 0) {
        setError("Please remove existing files first");
        return;
      }

      const newFiles: UploadedFile[] = [];

      for (const file of acceptedFiles) {
        if (file.size > maxSize) {
          setError(`File ${file.name} exceeds maximum size of ${maxSize / 1024 / 1024}MB`);
          continue;
        }

        if (!acceptedTypes.includes(file.type)) {
          setError(`File ${file.name} is not a supported type`);
          continue;
        }

        // Show upload progress
        progressMap.set(file.name, 0);
        setUploadProgress(new Map(progressMap));

        // Simulate progress for better UX
        const progressInterval = setInterval(() => {
          const current = progressMap.get(file.name) || 0;
          if (current < 90) {
            progressMap.set(file.name, current + 10);
            setUploadProgress(new Map(progressMap));
          }
        }, 50);

        // Read file
        const reader = new FileReader();
        
        await new Promise<void>((resolve, reject) => {
          reader.onload = () => {
            clearInterval(progressInterval);
            progressMap.set(file.name, 100);
            setUploadProgress(new Map(progressMap));
            const arrayBuffer = reader.result as ArrayBuffer;
            newFiles.push({
              name: file.name,
              size: file.size,
              type: file.type,
              data: arrayBuffer,
            });
            resolve();
          };

          reader.onerror = () => {
            clearInterval(progressInterval);
            reject(new Error(`Failed to read file ${file.name}`));
          };
          
          reader.readAsArrayBuffer(file);
        });
      }

      // Clear progress after a short delay
      setTimeout(() => {
        setUploadProgress(new Map());
      }, 500);

      const updatedFiles = multiple ? [...files, ...newFiles] : newFiles;
      setFiles(updatedFiles);
      onFilesSelected(updatedFiles);
    },
    [files, multiple, maxSize, acceptedTypes, onFilesSelected]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedTypes.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
    multiple,
    maxSize,
  });

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    onFilesSelected(updatedFiles);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB";
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${
            isDragActive
              ? "border-primary-500 bg-primary-50"
              : "border-gray-300 hover:border-primary-400 bg-gray-50"
          }
        `}
      >
        <input {...getInputProps()} />
        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 mb-2">
          {isDragActive ? "Drop files here" : "Drag & drop files here"}
        </p>
        <p className="text-sm text-gray-500">or</p>
        <button type="button" className="btn-primary mt-4">
          Browse Files
        </button>
        <p className="text-xs text-gray-400 mt-2">
          Max file size: {maxSize / 1024 / 1024}MB
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {files.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">Selected Files:</h3>
          {files.map((file, index) => {
            const progress = uploadProgress.get(file.name) ?? 100;
            const isUploading = progress < 100 && uploadProgress.has(file.name);
            
            return (
              <div
                key={index}
                className="flex flex-col bg-white border border-gray-200 rounded-lg p-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <File className="h-5 w-5 text-gray-400 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                      <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                    </div>
                  </div>
                  {isUploading && (
                    <span className="text-xs font-medium text-primary-600 ml-2">
                      {progress}%
                    </span>
                  )}
                  <button
                    onClick={() => removeFile(index)}
                    className="text-red-500 hover:text-red-700 p-1 ml-2"
                    type="button"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                {isUploading && (
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

