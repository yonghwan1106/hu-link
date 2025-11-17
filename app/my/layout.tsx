import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "마이 페이지",
  description: "내 예약 내역과 포인트를 관리하세요. 다가오는 예약, 이용 내역, CO2 절감량, 포인트 적립/사용 내역을 한눈에 확인할 수 있습니다.",
  keywords: [
    "예약 내역",
    "포인트",
    "마일리지",
    "CO2 절감",
    "이용 내역",
    "즐겨찾기",
    "마이페이지",
  ],
  openGraph: {
    title: "마이 페이지 | HU-Link",
    description: "내 예약 내역과 포인트를 관리하세요",
    url: "https://hu-link.vercel.app/my",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function MyPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
