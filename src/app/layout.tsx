import type { Metadata } from "next";
import { Suspense } from "react";
import { Hind_Siliguri } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/Footer";
import Navbar, { NavbarSkeleton } from "@/components/Navbar";
import Ticker, { TickerSkeleton } from "@/components/Ticker";
import "./globals.css";

const hind = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hind",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে",
    template: "%s | বাজার দর",
  },
  description:
    "চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার আজকের দাম — বাজারভিত্তিক বিস্তারিত এক জায়গায়।",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bn" data-theme="light" className={hind.variable}>
      <body className="flex min-h-screen flex-col antialiased">
        <Suspense fallback={<NavbarSkeleton />}>
          <Navbar />
        </Suspense>
        <Suspense fallback={<TickerSkeleton />}>
          <Ticker />
        </Suspense>
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster position="top-center" toastOptions={{ duration: 3500 }} />
      </body>
    </html>
  );
}
