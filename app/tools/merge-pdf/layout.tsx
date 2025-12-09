import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Merge PDF - Combine Multiple PDF Files",
  description: "Merge multiple PDF files into one document. Free online PDF merger tool. Combine PDFs instantly without watermarks.",
  keywords: ["merge PDF", "combine PDF", "PDF merger", "join PDF files", "merge PDF online"],
  openGraph: {
    title: "Merge PDF - Combine Multiple PDF Files | ProPDF Studio",
    description: "Merge multiple PDF files into one document. Free online PDF merger tool.",
    type: "website",
  },
};

export default function MergePdfLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

