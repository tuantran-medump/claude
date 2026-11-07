import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Orca Multi-Agent Web App",
  description: "Phối hợp Antigravity (Gemini Pro), Codex (GPT Pro) và Claude Code (Claude Pro)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}
