import React from "react";
import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
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

export const metadata: Metadata = {
  title: "A Night of Stars",
  description:
    "Bình chọn những nhân viên xuất sắc nhất trong đêm hội A Night of Stars 2026",
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
        className={`${montserrat.variable} ${inter.variable} font-body antialiased bg-background`}
      >
        <AuthProvider>
          {children}
          <Analytics />
        </AuthProvider>
      </body>
    </html>
  );
}
