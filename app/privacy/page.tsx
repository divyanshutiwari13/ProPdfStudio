import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - ProPDF Studio",
  description: "Read ProPDF Studio's privacy policy. Learn how we protect your data and handle file processing securely.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
      <div className="prose prose-lg max-w-none">
        <p className="text-gray-600 mb-4">
          <strong>Last updated:</strong> {new Date().toLocaleDateString()}
        </p>
        <p className="text-gray-700 mb-6">
          At ProPDF Studio, we take your privacy seriously. This Privacy Policy explains how we
          collect, use, and protect your information when you use our PDF tools.
        </p>
        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Information We Collect</h2>
        <p className="text-gray-700 mb-4">
          We collect information that you provide directly to us, such as when you create an
          account, use our services, or contact us for support.
        </p>
        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">How We Use Your Information</h2>
        <p className="text-gray-700 mb-4">
          We use the information we collect to provide, maintain, and improve our services, process
          your requests, and communicate with you.
        </p>
        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">File Processing</h2>
        <p className="text-gray-700 mb-4">
          All PDF processing is done securely in your browser or on our servers. Files are
          automatically deleted after processing and are not stored permanently.
        </p>
        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Contact Us</h2>
        <p className="text-gray-700">
          If you have any questions about this Privacy Policy, please contact us through our
          contact page.
        </p>
      </div>
    </div>
  );
}

