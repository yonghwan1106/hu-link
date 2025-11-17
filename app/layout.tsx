import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { BottomNav } from "@/components/layout/bottom-nav";
import { FavoritesProvider } from "@/lib/hooks/useFavorites";
import { ThemeProvider } from "@/lib/hooks/useTheme";
import { InstallPrompt } from "@/components/ui/install-prompt";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "HU-Link | 화성 통합 MaaS 플랫폼",
    template: "%s | HU-Link",
  },
  description: "100만 화성특례시 동서 균형발전과 시민 이동권 보장을 위한 HU 자산 통합 MaaS 플랫폼. 공공시설 예약부터 H버스 실시간 정보, AI 경로 추천까지 한 번에!",
  keywords: [
    "화성시",
    "MaaS",
    "공공시설 예약",
    "H버스",
    "교통정보",
    "DRT",
    "수요응답형교통",
    "시설예약",
    "화성특례시",
    "동서균형발전",
  ],
  authors: [{ name: "HU-Link Team" }],
  creator: "HU-Link",
  publisher: "HU-Link",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "HU-Link | 화성 통합 MaaS 플랫폼",
    description: "공공시설 예약부터 H버스 실시간 정보까지, 화성시민을 위한 통합 모빌리티 플랫폼",
    url: "https://hu-link.vercel.app",
    siteName: "HU-Link",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HU-Link | 화성 통합 MaaS 플랫폼",
    description: "공공시설 예약부터 H버스 실시간 정보까지, 화성시민을 위한 통합 모빌리티 플랫폼",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0ea5e9" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="HU-Link" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <FavoritesProvider>
            <Header />
            <main className="min-h-screen pb-16 md:pb-0">
              {children}
            </main>
            <BottomNav />
            <InstallPrompt />
          </FavoritesProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
