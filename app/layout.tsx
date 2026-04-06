import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    default: "Farid Hasfindra | AI Engineer & Tech Innovator",
    template: "%s | Farid Hasfindra"
  },
  description: "Senior AI Engineer specializing in Deep Learning, Large Language Models, and building production-ready intelligent systems. Explore my research, projects, and professional background.",
  authors: [{ name: "Farid Hasfindra" }],
  keywords: ["AI Engineer", "Machine Learning", "LLM", "Deep Learning", "Software Portfolio", "AI Research"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://faridhasfindra.com", // Adjust once deployed
    siteName: "Farid Hasfindra Portfolio"
  }
};

import { ToastProvider } from "@/components/ui/toast-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={cn(inter.variable, "min-h-screen bg-background font-sans antialiased text-foreground")}>
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
