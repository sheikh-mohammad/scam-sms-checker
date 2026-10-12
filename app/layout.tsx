import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Scam SMS Checker — Scam ya Safe?",
    template: "%s — Scam SMS Checker",
  },
  description:
    "Paste any SMS or WhatsApp message and get a clear answer in Roman Urdu and English: SCAM, PROBABLY SCAM, or LOOKS SAFE. Plus guides to spot scams and the 8171 rule.",
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
      <body className="app-bg flex min-h-screen flex-col">
        <SiteHeader />
        <main className="w-full flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
