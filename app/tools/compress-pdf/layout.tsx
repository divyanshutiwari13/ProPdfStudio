import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compress PDF - Reduce PDF File Size",
  description: "Compress PDF files to reduce file size while maintaining quality. Free online PDF compressor. Reduce PDF size instantly.",
  keywords: ["compress PDF", "reduce PDF size", "PDF compressor", "shrink PDF", "PDF file size reducer"],
  openGraph: {
    title: "Compress PDF - Reduce PDF File Size | ProPDF Studio",
    description: "Compress PDF files to reduce file size while maintaining quality. Free online PDF compressor.",
    type: "website",
  },
};

export default function CompressPdfLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

