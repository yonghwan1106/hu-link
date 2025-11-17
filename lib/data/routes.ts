import { busRoutes } from './buses';
import { facilities } from './facilities';

export interface RouteSegment {
  type: 'walk' | 'bus' | 'drt';
  mode: string;
  from: string;
  to: string;
  distance?: number; // 미터
  duration: number; // 분
  cost: number;
  routeNumber?: string;
  color?: string;
  isLowFloor?: boolean;
  coordinates: { lat: number; lng: number }[];
}

export interface RecommendedRoute {
  id: string;
  totalDuration: number; // 분
  totalCost: number;
  totalDistance: number; // 미터
  segments: RouteSegment[];
  co2Saved: number; // kg (자가용 대비)
  isAccessible: boolean; // 전 구간 저상버스/엘리베이터 가능
  difficulty: 'easy' | 'medium' | 'hard';
  badge?: '최단시간' | '최저요금' | '편안한 이동' | '친환경';
}

export function calculateRoute(
  fromLat: number,
  fromLng: number,
  toFacilityId: string,
  requireAccessible: boolean = false
): RecommendedRoute[] {
  const facility = facilities.find(f => f.id === toFacilityId);
  if (!facility) return [];

  // 3가지 경로 옵션 생성
  const routes: RecommendedRoute[] = [];

  // 옵션 1: 최단 시간 (급행 + DRT)
  routes.push({
    id: 'route-fast',
    totalDuration: 35,
    totalCost: 4500,
    totalDistance: 12500,
    co2Saved: 2.8,
    isAccessible: true,
    difficulty: 'easy',
    badge: '최단시간',
    segments: [
      {
        type: 'drt',
        mode: '똑버스 (DRT)',
        from: '현재 위치',
        to: '동탄역 정류장',
        distance: 800,
        duration: 5,
        cost: 1000,
        coordinates: [
          { lat: fromLat, lng: fromLng },
          { lat: 37.1995, lng: 127.0950 }
        ]
      },
      {
        type: 'bus',
        mode: 'H버스',
        from: '동탄역',
        to: facility.name,
        distance: 11700,
        duration: 25,
        cost: 2000,
        routeNumber: 'H-1',
        color: '#0ea5e9',
        isLowFloor: true,
        coordinates: [
          { lat: 37.1995, lng: 127.0950 },
          { lat: 37.2010, lng: 127.0745 },
          { lat: 37.1823, lng: 127.0456 },
          { lat: facility.coordinates.lat, lng: facility.coordinates.lng }
        ]
      },
      {
        type: 'walk',
        mode: '도보',
        from: `${facility.name} 정류장`,
        to: facility.name,
        distance: 150,
        duration: 5,
        cost: 0,
        coordinates: [
          { lat: facility.coordinates.lat - 0.001, lng: facility.coordinates.lng },
          { lat: facility.coordinates.lat, lng: facility.coordinates.lng }
        ]
      }
    ]
  });

  // 옵션 2: 최저 요금 (일반 버스만)
  routes.push({
    id: 'route-cheap',
    totalDuration: 48,
    totalCost: 3000,
    totalDistance: 13200,
    co2Saved: 3.1,
    isAccessible: requireAccessible,
    difficulty: 'medium',
    badge: '최저요금',
    segments: [
      {
        type: 'walk',
        mode: '도보',
        from: '현재 위치',
        to: '버스 정류장',
        distance: 600,
        duration: 8,
        cost: 0,
        coordinates: [
          { lat: fromLat, lng: fromLng },
          { lat: fromLat + 0.005, lng: fromLng + 0.003 }
        ]
      },
      {
        type: 'bus',
        mode: 'H버스',
        from: '동탄역',
        to: facility.name,
        distance: 12600,
        duration: 35,
        cost: 1500,
        routeNumber: 'H-2',
        color: '#14b8a6',
        isLowFloor: requireAccessible,
        coordinates: [
          { lat: fromLat + 0.005, lng: fromLng + 0.003 },
          { lat: 37.2045, lng: 127.0765 },
          { lat: 37.1765, lng: 127.0456 },
          { lat: facility.coordinates.lat, lng: facility.coordinates.lng }
        ]
      },
      {
        type: 'walk',
        mode: '도보',
        from: '정류장',
        to: facility.name,
        distance: 200,
        duration: 5,
        cost: 0,
        coordinates: [
          { lat: facility.coordinates.lat - 0.0015, lng: facility.coordinates.lng },
          { lat: facility.coordinates.lat, lng: facility.coordinates.lng }
        ]
      }
    ]
  });

  // 옵션 3: 편안한 이동 (저상버스 + 최소 환승)
  if (requireAccessible || facility.isAccessible) {
    routes.push({
      id: 'route-comfort',
      totalDuration: 42,
      totalCost: 3500,
      totalDistance: 12000,
      co2Saved: 2.9,
      isAccessible: true,
      difficulty: 'easy',
      badge: '편안한 이동',
      segments: [
        {
          type: 'drt',
          mode: 'HU-Link 셔틀',
          from: '현재 위치',
          to: '동탄역',
          distance: 800,
          duration: 7,
          cost: 1000,
          coordinates: [
            { lat: fromLat, lng: fromLng },
            { lat: 37.1995, lng: 127.0950 }
          ]
        },
        {
          type: 'bus',
          mode: 'H버스 (저상)',
          from: '동탄역',
          to: facility.name,
          distance: 11200,
          duration: 30,
          cost: 1500,
          routeNumber: 'H-8',
          color: '#3b82f6',
          isLowFloor: true,
          coordinates: [
            { lat: 37.1995, lng: 127.0950 },
            { lat: 37.1998, lng: 127.0892 },
            { lat: 37.2010, lng: 127.0745 },
            { lat: facility.coordinates.lat, lng: facility.coordinates.lng }
          ]
        },
        {
          type: 'walk',
          mode: '도보 (무장애)',
          from: '정류장',
          to: facility.name,
          distance: 100,
          duration: 5,
          cost: 0,
          coordinates: [
            { lat: facility.coordinates.lat - 0.0008, lng: facility.coordinates.lng },
            { lat: facility.coordinates.lat, lng: facility.coordinates.lng }
          ]
        }
      ]
    });
  }

  return routes;
}

export function calculateCO2Savings(distanceKm: number): number {
  // 자가용 대비 CO2 절감량 (kg)
  // 승용차: 약 0.22kg CO2/km
  // 버스: 약 0.08kg CO2/km per person
  const carEmission = distanceKm * 0.22;
  const busEmission = distanceKm * 0.08;
  return Number((carEmission - busEmission).toFixed(2));
}

export function estimateArrivalTime(segments: RouteSegment[]): string {
  const totalMinutes = segments.reduce((sum, seg) => sum + seg.duration, 0);
  const now = new Date();
  now.setMinutes(now.getMinutes() + totalMinutes);

  return now.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit'
  });
}
