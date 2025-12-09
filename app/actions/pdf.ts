"use server";

import { mergePdfs } from "@/lib/pdf/merge";
import { splitPdf, SplitOptions } from "@/lib/pdf/split";
import { compressPdf, CompressionLevel } from "@/lib/pdf/compress";
import { imagesToPdf } from "@/lib/pdf/images-to-pdf";
import { SerializableUploadedFile, UploadedFile } from "@/types";
import { createActivity } from "@/lib/db/activities";
import { getCurrentUser } from "@/lib/auth";

export type { CompressionLevel } from "@/lib/pdf/compress";

// Convert serializable file to UploadedFile format
function deserializeFile(file: SerializableUploadedFile): UploadedFile {
  const buffer = Buffer.from(file.data, "base64");
  // Convert Buffer to ArrayBuffer for compatibility
  const arrayBuffer = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
  return {
    name: file.name,
    size: file.size,
    type: file.type,
    data: arrayBuffer,
  };
}

export async function processMerge(files: SerializableUploadedFile[]) {
  try {
    const deserializedFiles = files.map(deserializeFile);
    const result = await mergePdfs(deserializedFiles);
    const user = await getCurrentUser();

    if (user?.id) {
      await createActivity(
        user.id,
        "merge",
        `merged_${files.length}_files.pdf`,
        result.length,
        undefined
      );
    }

    return {
      success: true,
      data: Buffer.from(result).toString("base64"),
      fileName: "merged.pdf",
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to merge PDFs",
    };
  }
}

export async function processSplit(
  file: SerializableUploadedFile,
  options: SplitOptions
) {
  try {
    const deserializedFile = deserializeFile(file);
    const results = await splitPdf(deserializedFile, options);
    const user = await getCurrentUser();

    if (user?.id) {
      await createActivity(
        user.id,
        "split",
        file.name,
        file.size,
        undefined
      );
    }

    return {
      success: true,
      data: results.map((r) => Buffer.from(r).toString("base64")),
      fileName: "split.pdf",
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to split PDF",
    };
  }
}

export async function processCompress(
  file: SerializableUploadedFile,
  level: CompressionLevel
) {
  try {
    const deserializedFile = deserializeFile(file);
    const result = await compressPdf(deserializedFile, level);
    const user = await getCurrentUser();

    if (user?.id) {
      await createActivity(
        user.id,
        "compress",
        file.name,
        result.length,
        undefined
      );
    }

    return {
      success: true,
      data: Buffer.from(result).toString("base64"),
      fileName: file.name.replace(".pdf", "_compressed.pdf"),
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to compress PDF",
    };
  }
}

export async function processImagesToPdf(files: SerializableUploadedFile[]) {
  try {
    const deserializedFiles = files.map(deserializeFile);
    const result = await imagesToPdf(deserializedFiles);
    const user = await getCurrentUser();

    if (user?.id) {
      await createActivity(
        user.id,
        "images-to-pdf",
        `images_to_pdf.pdf`,
        result.length,
        undefined
      );
    }

    return {
      success: true,
      data: Buffer.from(result).toString("base64"),
      fileName: "images_to_pdf.pdf",
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create PDF from images",
    };
  }
}

