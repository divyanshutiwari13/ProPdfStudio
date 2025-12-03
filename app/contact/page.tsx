export const metadata = {
  title: "Contact Us - ProPDF Studio",
  description: "Get in touch with ProPDF Studio",
};

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Contact Us</h1>
      <div className="card">
        <p className="text-gray-700 mb-6">
          Have a question or need help? We'd love to hear from you!
        </p>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
            <p className="text-gray-600">support@propdfstudio.com</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Support Hours</h3>
            <p className="text-gray-600">Monday - Friday, 9:00 AM - 5:00 PM EST</p>
          </div>
        </div>
      </div>
    </div>
  );
}

