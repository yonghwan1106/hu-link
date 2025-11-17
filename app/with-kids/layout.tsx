import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "아이와 함께",
  description: "아이와 함께 안전하고 편안하게 이용할 수 있는 시설과 교통 정보를 확인하세요. 유모차 출입 가능 시설, 저상버스 노선, 수유실 및 기저귀 교환대 정보를 제공합니다.",
  keywords: [
    "아이와 함께",
    "유모차",
    "저상버스",
    "수유실",
    "기저귀 교환대",
    "아동 시설",
    "육아",
    "키즈 프렌들리",
    "화성시 육아",
  ],
  openGraph: {
    title: "아이와 함께 | HU-Link",
    description: "아이와 함께 안전하고 편안하게 이용할 수 있는 시설과 교통 정보",
    url: "https://hu-link.vercel.app/with-kids",
  },
};

export default function WithKidsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
