import type { Metadata, Viewport } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-urbanist",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "SHIELD — Cognitive Protection & Dominance",
    template: "%s · SHIELD",
  },
  description:
    "SHIELD: Cognitive warfare training platform. Sense, Harmonise, Interpret, Endure, Lead, Dominate.",
  applicationName: "SHIELD",
  authors: [{ name: "SHIELD" }],
  keywords: [
    "cognitive warfare",
    "deepfake detection",
    "training",
    "defence",
    "SHIELD",
  ],
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#0A0E1A",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("dark", urbanist.variable)}>
      <body
        className={cn(
          "min-h-screen bg-bg text-text-primary font-sans antialiased",
          "selection:bg-primary/30 selection:text-text-primary"
        )}
      >
        {/* Ambient hex-grid pattern fixed behind every screen at 5% opacity */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 -z-10 bg-hex-grid opacity-[0.05]"
          style={{ backgroundSize: "24px 24px" }}
        />
        {children}
      </body>
    </html>
  );
}
