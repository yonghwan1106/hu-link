import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "교통 정보",
  description: "H버스 실시간 위치와 노선 정보를 확인하세요. 버스 도착 예정 시간, 혼잡도, 저상버스 운행 정보를 실시간으로 제공합니다. DRT(수요응답형 교통) 서비스도 이용 가능합니다.",
  keywords: [
    "H버스",
    "화성시 버스",
    "실시간 버스",
    "버스 위치",
    "DRT",
    "수요응답형교통",
    "저상버스",
    "교통정보",
    "버스 노선",
  ],
  openGraph: {
    title: "교통 정보 | HU-Link",
    description: "H버스 실시간 위치와 노선 정보를 확인하세요",
    url: "https://hu-link.vercel.app/transport",
  },
};

export default function TransportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
