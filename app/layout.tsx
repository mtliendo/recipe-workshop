import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Fraunces, Literata } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  style: ["normal", "italic"],
});

const literata = Literata({
  subsets: ["latin"],
  variable: "--font-literata",
  display: "swap",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "Sunday Box",
    template: "%s · Sunday Box",
  },
  description: "Workshop app for Your First Product: Building for Humans and Agents. Maya’s family recipe box.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${literata.variable} h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
