import { ToolConfig } from "@/types";

export const tools: ToolConfig[] = [
  {
    id: "merge-pdf",
    name: "Merge PDF",
    description: "Combine multiple PDF files into one document",
    icon: "📄",
    route: "/tools/merge-pdf",
    acceptsMultiple: true,
    acceptedTypes: ["application/pdf"],
  },
  {
    id: "split-pdf",
    name: "Split PDF",
    description: "Extract pages from a PDF or split into multiple files",
    icon: "✂️",
    route: "/tools/split-pdf",
    acceptsMultiple: false,
    acceptedTypes: ["application/pdf"],
  },
  {
    id: "compress-pdf",
    name: "Compress PDF",
    description: "Reduce PDF file size while maintaining quality",
    icon: "🗜️",
    route: "/tools/compress-pdf",
    acceptsMultiple: false,
    acceptedTypes: ["application/pdf"],
  },
  {
    id: "pdf-to-images",
    name: "PDF to Images",
    description: "Convert PDF pages to JPG, PNG, or WebP images",
    icon: "🖼️",
    route: "/tools/pdf-to-images",
    acceptsMultiple: false,
    acceptedTypes: ["application/pdf"],
  },
  {
    id: "images-to-pdf",
    name: "Images to PDF",
    description: "Combine multiple images into a single PDF document",
    icon: "📸",
    route: "/tools/images-to-pdf",
    acceptsMultiple: true,
    acceptedTypes: ["image/jpeg", "image/png", "image/webp"],
  },
];

export function getToolById(id: string): ToolConfig | undefined {
  return tools.find((tool) => tool.id === id);
}

