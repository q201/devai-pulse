import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "DevAI Pulse | Modern Tech & AI Blog & News Digest",
  description: "High-performance, SEO-optimized Tech & AI Blog presenting deep dives on LLMs, Next.js 14, PyTorch, system architectures, and live news feeds.",
  keywords: ["AI", "Machine Learning", "LLMs", "Next.js", "Tailwind CSS", "TypeScript", "Python", "PyTorch", "Rust", "Hacker News"],
  authors: [{ name: "DevAI Pulse Team" }],
  openGraph: {
    title: "DevAI Pulse | Tech & AI Blog",
    description: "Cyber-Clean Tech & AI Blog presenting real-time feeds, code-first tutorials, and architecture breakdowns.",
    type: "website",
    locale: "en_US",
    siteName: "DevAI Pulse",
  },
  twitter: {
    card: "summary_large_image",
    title: "DevAI Pulse | Tech & AI Blog",
    description: "High-performance Tech & AI Blog built with Next.js 14 App Router.",
  },
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased selection:bg-cyan-500 selection:text-white">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
