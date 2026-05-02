import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RP Motorcycles - Expert Motorcycle Services | South Africa",
  description: "Professional motorcycle repair, servicing, engine rebuilds, diagnostics, and custom modifications. From routine maintenance to full restorations. Pickup & delivery available.",
  keywords: ["motorcycle repair", "motorcycle service", "engine rebuild", "motorcycle diagnostics", "motorcycle restoration", "South Africa", "RP Motorcycles"],
  authors: [{ name: "RP Motorcycles" }],
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🏍️</text></svg>",
  },
  openGraph: {
    title: "RP Motorcycles - Expert Motorcycle Services",
    description: "Professional motorcycle repair, servicing, engine rebuilds, diagnostics, and custom modifications.",
    url: "https://www.rpmotorcycles.co.za",
    siteName: "RP Motorcycles",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RP Motorcycles - Expert Motorcycle Services",
    description: "Professional motorcycle repair, servicing, engine rebuilds, diagnostics, and custom modifications.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
