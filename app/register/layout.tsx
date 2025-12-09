import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register - ProPDF Studio",
  description: "Create a free ProPDF Studio account to track your PDF processing history and access advanced features.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

