export interface User {
  _id?: string;
  email: string;
  password: string;
  name: string;
  createdAt: Date;
}

export interface Activity {
  _id?: string;
  userId: string;
  toolType: "merge" | "split" | "compress" | "pdf-to-images" | "images-to-pdf";
  fileName: string;
  fileSize: number;
  createdAt: Date;
  downloadUrl?: string;
}

export interface UploadedFile {
  name: string;
  size: number;
  type: string;
  data: ArrayBuffer;
}

// Serializable version for Server Actions (uses base64 string instead of ArrayBuffer)
export interface SerializableUploadedFile {
  name: string;
  size: number;
  type: string;
  data: string; // base64 encoded
}

export type ToolType = "merge" | "split" | "compress" | "pdf-to-images" | "images-to-pdf";

export interface ToolConfig {
  id: string;
  name: string;
  description: string;
  icon: string;
  route: string;
  acceptsMultiple: boolean;
  acceptedTypes: string[];
}

