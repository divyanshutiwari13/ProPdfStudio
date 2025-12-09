import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Split PDF - Extract Pages from PDF",
  description: "Split PDF files into separate documents. Extract specific pages or split PDF into multiple files. Free online PDF splitter.",
  keywords: ["split PDF", "extract PDF pages", "PDF splitter", "divide PDF", "split PDF online"],
  openGraph: {
    title: "Split PDF - Extract Pages from PDF | ProPDF Studio",
    description: "Split PDF files into separate documents. Extract specific pages or split PDF into multiple files.",
    type: "website",
  },
};

export default function SplitPdfLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

