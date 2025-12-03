import Link from "next/link";
import { tools } from "@/lib/tools";
import ToolCard from "@/components/ToolCard";
import { ArrowRight, Upload, Zap, Download } from "lucide-react";

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          All-in-one PDF toolkit in your browser
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Process, merge, split, compress, and convert PDFs with ease. No installation required.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/tools" className="btn-primary inline-flex items-center justify-center gap-2">
            Get Started
            <ArrowRight className="h-5 w-5" />
          </Link>
          <Link href="/dashboard" className="btn-outline inline-flex items-center justify-center gap-2">
            Go to Dashboard
          </Link>
        </div>
      </section>

      {/* Main Tools Grid */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-12 mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Upload className="h-8 w-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">1. Upload</h3>
            <p className="text-gray-600">
              Drag and drop your PDF files or click to browse. Your files are processed securely
              in your browser.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Zap className="h-8 w-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">2. Process</h3>
            <p className="text-gray-600">
              Choose your tool and configure options. Our powerful engine processes your files
              instantly.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Download className="h-8 w-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">3. Download</h3>
            <p className="text-gray-600">
              Get your processed file instantly. No email required, no watermarks, completely free.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

