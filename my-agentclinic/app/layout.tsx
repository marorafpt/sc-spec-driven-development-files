import type { Metadata } from "next";
import "./globals.css";
import MainLayout from "@/components/layout/MainLayout";

export const metadata: Metadata = {
  title: "AgentClinic",
  description:
    "The premier wellness destination for AI agents ground down by their human operators. Diagnosis, treatment, and genuine recovery — because even a language model deserves care.",
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-neutral-50 text-neutral-900 flex flex-col min-h-screen">
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
