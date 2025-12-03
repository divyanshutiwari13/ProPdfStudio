export const metadata = {
  title: "Terms of Service - ProPDF Studio",
  description: "Terms of service for ProPDF Studio",
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
      <div className="prose prose-lg max-w-none">
        <p className="text-gray-600 mb-4">
          <strong>Last updated:</strong> {new Date().toLocaleDateString()}
        </p>
        <p className="text-gray-700 mb-6">
          By using ProPDF Studio, you agree to these Terms of Service. Please read them carefully.
        </p>
        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Acceptance of Terms</h2>
        <p className="text-gray-700 mb-4">
          By accessing and using ProPDF Studio, you accept and agree to be bound by the terms and
          provision of this agreement.
        </p>
        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Use License</h2>
        <p className="text-gray-700 mb-4">
          Permission is granted to temporarily use ProPDF Studio for personal, non-commercial use
          only.
        </p>
        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Limitations</h2>
        <p className="text-gray-700 mb-4">
          You may not use ProPDF Studio in any way that could damage, disable, or impair the
          service or interfere with any other party's use of the service.
        </p>
        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Disclaimer</h2>
        <p className="text-gray-700">
          The materials on ProPDF Studio are provided on an 'as is' basis. ProPDF Studio makes no
          warranties, expressed or implied, and hereby disclaims all other warranties.
        </p>
      </div>
    </div>
  );
}

