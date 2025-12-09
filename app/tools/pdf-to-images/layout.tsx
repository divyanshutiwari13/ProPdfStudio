import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PDF to Images - Convert PDF Pages to Images",
  description: "Convert PDF pages to JPG, PNG, or WebP images. Free online PDF to image converter. Extract images from PDF instantly.",
  keywords: ["PDF to images", "PDF to JPG", "PDF to PNG", "PDF converter", "extract images from PDF"],
  openGraph: {
    title: "PDF to Images - Convert PDF Pages to Images | ProPDF Studio",
    description: "Convert PDF pages to JPG, PNG, or WebP images. Free online PDF to image converter.",
    type: "website",
  },
};

export default function PdfToImagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

