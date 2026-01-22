import React from "react";
import type { Metadata } from "next";
import { Montserrat, Inter, Sora } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800"],
  variable: "--font-sora",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TECHVIFY MULTIVERSE - EVOLUTION SAGA",
  description:
    "Bình chọn những nhân viên xuất sắc nhất trong đêm hội Oscar 2026",
  generator: "v0.app",
  icons: {
    icon: "/techvify_icon.ico",
    shortcut: "/techvify_icon.ico",
    apple: "/techvify_icon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body
        className={`${montserrat.variable} ${inter.variable} ${sora.variable} font-body antialiased bg-background`}
      >
        <AuthProvider>
          {children}
          <Analytics />
        </AuthProvider>
      </body>
    </html>
  );
}
