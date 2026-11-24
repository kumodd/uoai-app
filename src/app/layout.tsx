import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ToastProvider } from "@/components/ui/ToastProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Universal Offline AI (UOAI) Provider — On-Device Android Inference",
    template: "%s | Universal Offline AI (UOAI)",
  },
  description:
    "Shared on-device Gemma 3 & Gemma 4 inference engine for Android (com.uoai.provider). 100% on-device, zero cloud, zero tracking over secure loopback 127.0.0.1:8765.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#FBFBF8] text-[#1B1E16]">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-4 focus:z-50 focus:rounded-full focus:bg-[#4F5D2F] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#FAFBF7]"
        >
          Skip to main content
        </a>
        <ToastProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </ToastProvider>
      </body>
    </html>
  );
}
