import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Images to PDF - Convert Images to PDF",
  description: "Convert multiple images (JPG, PNG, WebP) into a single PDF document. Free online image to PDF converter. Create PDF from images instantly.",
  keywords: ["images to PDF", "JPG to PDF", "PNG to PDF", "image converter", "create PDF from images"],
  openGraph: {
    title: "Images to PDF - Convert Images to PDF | ProPDF Studio",
    description: "Convert multiple images (JPG, PNG, WebP) into a single PDF document. Free online image to PDF converter.",
    type: "website",
  },
};

export default function ImagesToPdfLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

