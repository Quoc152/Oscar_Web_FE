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
  openGraph: {
    title: "TECHVIFY MULTIVERSE - EVOLUTION SAGA",
    description:
      "Bình chọn những nhân viên xuất sắc nhất trong đêm hội Oscar 2026",
    url: "https://techvify.oscarnight.io.vn/",
    siteName: "Techvify Oscar",
    images: [
      {
        url: "/logo/techvify_logo_ver2.png",
        width: 1200,
        height: 630,
        alt: "Techvify Oscar Awards 2026",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TECHVIFY MULTIVERSE - EVOLUTION SAGA",
    description:
      "Bình chọn những nhân viên xuất sắc nhất trong đêm hội Oscar 2026",
    images: ["/logo/techvify_logo_ver2.png"],
  },
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
