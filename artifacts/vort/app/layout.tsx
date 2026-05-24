import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Vort — AI No-Code Builder",
  description:
    "Опишите идею — получите готовое приложение. AI-конструктор приложений на базе Ollama.",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 36 36'><rect width='36' height='36' rx='10' fill='%237c5cfc'/><path d='M9 10 L18 24 L27 10' stroke='white' stroke-width='3' stroke-linecap='round' stroke-linejoin='round' fill='none'/></svg>",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={inter.variable}>
      <body style={{ background: "var(--bg)", minHeight: "100vh" }}>
        {children}
      </body>
    </html>
  );
}
