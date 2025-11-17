import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "시설 찾기",
  description: "화성시 공공시설을 한눈에 확인하고 바로 예약하세요. 체육시설, 문화시설, 복지시설, 캠핑장 등 다양한 시설 정보와 실시간 예약 가능 여부를 확인할 수 있습니다.",
  keywords: [
    "화성시 공공시설",
    "시설 예약",
    "체육시설",
    "문화시설",
    "복지시설",
    "캠핑장",
    "화성시 시설",
    "공공시설 예약",
  ],
  openGraph: {
    title: "시설 찾기 | HU-Link",
    description: "화성시 공공시설을 한눈에 확인하고 바로 예약하세요",
    url: "https://hu-link.vercel.app/facilities",
  },
};

export default function FacilitiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
