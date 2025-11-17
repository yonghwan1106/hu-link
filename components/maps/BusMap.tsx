'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { LiveBus } from '@/lib/data/buses';
import { Loader2 } from 'lucide-react';

// Leaflet을 동적으로 import (SSR 방지)
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);

interface BusMapProps {
  buses: LiveBus[];
  center?: [number, number];
  zoom?: number;
}

export default function BusMap({ buses, center = [37.1995, 127.0950], zoom = 12 }: BusMapProps) {
  const [isClient, setIsClient] = useState(false);
  const [L, setL] = useState<any>(null);

  useEffect(() => {
    setIsClient(true);
    // Leaflet 로드
    import('leaflet').then((leaflet) => {
      setL(leaflet.default);

      // 기본 아이콘 수정 (Next.js에서 아이콘 경로 문제 해결)
      delete (leaflet.default.Icon.Default.prototype as any)._getIconUrl;
      leaflet.default.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      });
    });
  }, []);

  if (!isClient || !L) {
    return (
      <div className="w-full h-[400px] bg-gray-100 rounded-lg flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[--primary]" />
      </div>
    );
  }

  // 버스 노선별 색상
  const getBusColor = (routeId: string) => {
    if (routeId.includes('h001') || routeId.includes('h002')) return '#0ea5e9'; // 간선 - 파란색
    if (routeId.includes('h003') || routeId.includes('h004')) return '#10b981'; // 지선 - 녹색
    if (routeId.includes('h005') || routeId.includes('h006')) return '#f59e0b'; // 순환 - 주황색
    return '#14b8a6'; // 기타 - 청록색
  };

  // 커스텀 버스 아이콘 생성
  const createBusIcon = (bus: LiveBus) => {
    const color = getBusColor(bus.routeId);
    const congestionColor =
      bus.congestion === 'low' ? '#10b981' : bus.congestion === 'medium' ? '#f59e0b' : '#ef4444';

    return L?.divIcon({
      className: 'custom-bus-icon',
      html: `
        <div style="position: relative;">
          <div style="
            width: 40px;
            height: 40px;
            background: ${color};
            border: 3px solid white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          ">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M4 16c0 .88.39 1.67 1 2.22V20c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-6H6V6h12v5z"/>
            </svg>
          </div>
          <div style="
            position: absolute;
            bottom: -8px;
            left: 50%;
            transform: translateX(-50%);
            background: ${congestionColor};
            color: white;
            padding: 2px 6px;
            border-radius: 10px;
            font-size: 10px;
            font-weight: bold;
            white-space: nowrap;
            box-shadow: 0 1px 3px rgba(0,0,0,0.3);
          ">
            ${bus.routeId.toUpperCase()}
          </div>
        </div>
      `,
      iconSize: [40, 40],
      iconAnchor: [20, 20],
    });
  };

  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden border border-gray-200 shadow-sm">
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {buses.map((bus) => (
          <Marker
            key={bus.busId}
            position={[bus.coordinates.lat, bus.coordinates.lng]}
            icon={createBusIcon(bus)}
          >
            <Popup>
              <div className="text-sm">
                <div className="font-bold text-base mb-1">{bus.routeId.toUpperCase()}</div>
                <div className="text-gray-600 space-y-1">
                  <div>도착 예정: <span className="font-semibold text-[--primary]">{bus.estimatedArrival}분</span></div>
                  <div>혼잡도: <span className={`font-semibold ${
                    bus.congestion === 'low' ? 'text-green-600' :
                    bus.congestion === 'medium' ? 'text-orange-600' :
                    'text-red-600'
                  }`}>
                    {bus.congestion === 'low' ? '여유' : bus.congestion === 'medium' ? '보통' : '혼잡'}
                  </span></div>
                  {bus.isLowFloor && (
                    <div className="text-green-600 font-semibold">✓ 저상버스</div>
                  )}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
