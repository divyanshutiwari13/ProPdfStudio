import { tools } from "@/lib/tools";
import ToolCard from "@/components/ToolCard";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All PDF Tools - ProPDF Studio",
  description: "Browse all available PDF tools: merge, split, compress, convert PDFs and more. Free online PDF toolkit for all your document needs.",
  keywords: ["PDF tools", "PDF utilities", "PDF editor", "PDF toolkit", "free PDF tools", "online PDF tools"],
  openGraph: {
    title: "All PDF Tools - ProPDF Studio",
    description: "Browse all available PDF tools: merge, split, compress, convert PDFs and more.",
    type: "website",
  },
};

export default function ToolsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">All PDF Tools</h1>
        <p className="text-xl text-gray-600">
          Choose a tool to get started. All tools are free and work directly in your browser.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </div>
  );
}

