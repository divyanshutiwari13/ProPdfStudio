import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - ProPDF Studio",
  description: "Sign in to your ProPDF Studio account to access your dashboard and activity history.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

