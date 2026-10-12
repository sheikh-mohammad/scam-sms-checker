import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Scam SMS Checker — Scam ya Safe?",
  description:
    "Paste any SMS or WhatsApp message and get a clear answer in Roman Urdu and English: SCAM, PROBABLY SCAM, or LOOKS SAFE.",
  applicationName: "Scam SMS Checker",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f172a",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ur" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
