export interface BusStop {
  id: string;
  name: string;
  coordinates: { lat: number; lng: number };
  sequence: number;
}

export interface BusRoute {
  id: string;
  routeNumber: string;
  routeName: string;
  type: 'express' | 'local' | 'shuttle';
  color: string;
  stops: BusStop[];
  interval: number; // 배차 간격 (분)
  firstBus: string;
  lastBus: string;
  fare: number;
}

export interface LiveBus {
  busId: string;
  routeId: string;
  currentStopId: string;
  nextStopId: string;
  remainingStops: number;
  estimatedArrival: number; // 분
  congestion: 'low' | 'medium' | 'high';
  isLowFloor: boolean; // 저상버스 여부
  coordinates: { lat: number; lng: number };
}

export const busRoutes: BusRoute[] = [
  {
    id: 'route-h001',
    routeNumber: 'H-1',
    routeName: '동탄-화성종합경기타운',
    type: 'express',
    color: '#0ea5e9',
    interval: 15,
    firstBus: '06:00',
    lastBus: '22:30',
    fare: 1500,
    stops: [
      { id: 'stop-001', name: '동탄역', coordinates: { lat: 37.1995, lng: 127.0950 }, sequence: 1 },
      { id: 'stop-002', name: '동탄중앙어울림센터', coordinates: { lat: 37.2010, lng: 127.0745 }, sequence: 2 },
      { id: 'stop-003', name: '병점역', coordinates: { lat: 37.1823, lng: 127.0456 }, sequence: 3 },
      { id: 'stop-004', name: '봉담읍사무소', coordinates: { lat: 37.2187, lng: 126.9456 }, sequence: 4 },
      { id: 'stop-005', name: '화성종합경기타운', coordinates: { lat: 37.0892, lng: 126.8142 }, sequence: 5 },
    ]
  },
  {
    id: 'route-h002',
    routeNumber: 'H-2',
    routeName: '동탄-향남 순환',
    type: 'local',
    color: '#14b8a6',
    interval: 20,
    firstBus: '05:30',
    lastBus: '23:00',
    fare: 1500,
    stops: [
      { id: 'stop-011', name: '동탄역', coordinates: { lat: 37.1995, lng: 127.0950 }, sequence: 1 },
      { id: 'stop-012', name: '동탄 청소년 문화의 집', coordinates: { lat: 37.2045, lng: 127.0765 }, sequence: 2 },
      { id: 'stop-013', name: '병점중앙로', coordinates: { lat: 37.1765, lng: 127.0456 }, sequence: 3 },
      { id: 'stop-014', name: '향남터미널', coordinates: { lat: 37.0654, lng: 126.8234 }, sequence: 4 },
      { id: 'stop-015', name: '향남오토캠핑장', coordinates: { lat: 37.0654, lng: 126.8234 }, sequence: 5 },
    ]
  },
  {
    id: 'route-h003',
    routeNumber: 'H-3',
    routeName: '서부권 순환',
    type: 'local',
    color: '#06b6d4',
    interval: 25,
    firstBus: '06:00',
    lastBus: '21:00',
    fare: 1500,
    stops: [
      { id: 'stop-021', name: '서신면사무소', coordinates: { lat: 37.1234, lng: 126.7845 }, sequence: 1 },
      { id: 'stop-022', name: '서신체육공원', coordinates: { lat: 37.1234, lng: 126.7845 }, sequence: 2 },
      { id: 'stop-023', name: '우정읍', coordinates: { lat: 37.2234, lng: 126.8567 }, sequence: 3 },
      { id: 'stop-024', name: '화성 드림파크', coordinates: { lat: 37.2234, lng: 126.8567 }, sequence: 4 },
      { id: 'stop-025', name: '향남읍', coordinates: { lat: 37.0892, lng: 126.8142 }, sequence: 5 },
    ]
  },
  {
    id: 'route-h004',
    routeNumber: 'H-4',
    routeName: '동탄 시티투어',
    type: 'shuttle',
    color: '#8b5cf6',
    interval: 30,
    firstBus: '09:00',
    lastBus: '20:00',
    fare: 2000,
    stops: [
      { id: 'stop-031', name: '동탄역', coordinates: { lat: 37.1995, lng: 127.0950 }, sequence: 1 },
      { id: 'stop-032', name: '아르딤 복지관', coordinates: { lat: 37.1998, lng: 127.0892 }, sequence: 2 },
      { id: 'stop-033', name: '동탄중앙어울림센터', coordinates: { lat: 37.2010, lng: 127.0745 }, sequence: 3 },
      { id: 'stop-034', name: '동탄 청소년 문화의 집', coordinates: { lat: 37.2045, lng: 127.0765 }, sequence: 4 },
      { id: 'stop-035', name: '동탄호수공원', coordinates: { lat: 37.2123, lng: 127.0789 }, sequence: 5 },
    ]
  },
  {
    id: 'route-h005',
    routeNumber: 'H-5',
    routeName: '봉담-동탄 급행',
    type: 'express',
    color: '#ef4444',
    interval: 10,
    firstBus: '06:30',
    lastBus: '22:00',
    fare: 2000,
    stops: [
      { id: 'stop-041', name: '봉담역', coordinates: { lat: 37.2187, lng: 126.9456 }, sequence: 1 },
      { id: 'stop-042', name: '봉담 실내수영장', coordinates: { lat: 37.2187, lng: 126.9456 }, sequence: 2 },
      { id: 'stop-043', name: '병점역', coordinates: { lat: 37.1823, lng: 127.0456 }, sequence: 3 },
      { id: 'stop-044', name: '다람산공원', coordinates: { lat: 37.1823, lng: 127.0389 }, sequence: 4 },
      { id: 'stop-045', name: '동탄역', coordinates: { lat: 37.1995, lng: 127.0950 }, sequence: 5 },
    ]
  },
  {
    id: 'route-h006',
    routeNumber: 'H-6',
    routeName: '남부권 연계',
    type: 'local',
    color: '#f59e0b',
    interval: 20,
    firstBus: '06:00',
    lastBus: '21:30',
    fare: 1500,
    stops: [
      { id: 'stop-051', name: '향남터미널', coordinates: { lat: 37.0654, lng: 126.8234 }, sequence: 1 },
      { id: 'stop-052', name: '화성종합경기타운', coordinates: { lat: 37.0892, lng: 126.8142 }, sequence: 2 },
      { id: 'stop-053', name: '발안역', coordinates: { lat: 37.0542, lng: 126.8876 }, sequence: 3 },
      { id: 'stop-054', name: '봉담읍', coordinates: { lat: 37.2187, lng: 126.9456 }, sequence: 4 },
      { id: 'stop-055', name: '병점역', coordinates: { lat: 37.1823, lng: 127.0456 }, sequence: 5 },
    ]
  },
  {
    id: 'route-h007',
    routeNumber: 'H-7',
    routeName: '문화시설 순환',
    type: 'shuttle',
    color: '#10b981',
    interval: 35,
    firstBus: '09:00',
    lastBus: '19:00',
    fare: 1500,
    stops: [
      { id: 'stop-061', name: '동탁역', coordinates: { lat: 37.1995, lng: 127.0950 }, sequence: 1 },
      { id: 'stop-062', name: '동탄 청소년 문화의 집', coordinates: { lat: 37.2045, lng: 127.0765 }, sequence: 2 },
      { id: 'stop-063', name: '병점 문화센터', coordinates: { lat: 37.1765, lng: 127.0456 }, sequence: 3 },
      { id: 'stop-064', name: '다람산공원', coordinates: { lat: 37.1823, lng: 127.0389 }, sequence: 4 },
      { id: 'stop-065', name: '동탄중앙어울림센터', coordinates: { lat: 37.2010, lng: 127.0745 }, sequence: 5 },
    ]
  },
  {
    id: 'route-h008',
    routeNumber: 'H-8',
    routeName: '접근성 특화 노선',
    type: 'shuttle',
    color: '#3b82f6',
    interval: 40,
    firstBus: '08:00',
    lastBus: '18:00',
    fare: 1000,
    stops: [
      { id: 'stop-071', name: '동탄역', coordinates: { lat: 37.1995, lng: 127.0950 }, sequence: 1 },
      { id: 'stop-072', name: '아르딤 복지관', coordinates: { lat: 37.1998, lng: 127.0892 }, sequence: 2 },
      { id: 'stop-073', name: '동탄 청소년 문화의 집', coordinates: { lat: 37.2045, lng: 127.0765 }, sequence: 3 },
      { id: 'stop-074', name: '동탄중앙어울림센터', coordinates: { lat: 37.2010, lng: 127.0745 }, sequence: 4 },
      { id: 'stop-075', name: '화성 드림파크', coordinates: { lat: 37.2234, lng: 126.8567 }, sequence: 5 },
    ]
  },
];

// 실시간 버스 위치 시뮬레이션 데이터
export const liveBuses: LiveBus[] = [
  {
    busId: 'bus-h1-01',
    routeId: 'route-h001',
    currentStopId: 'stop-002',
    nextStopId: 'stop-003',
    remainingStops: 3,
    estimatedArrival: 8,
    congestion: 'medium',
    isLowFloor: true,
    coordinates: { lat: 37.1920, lng: 127.0600 }
  },
  {
    busId: 'bus-h1-02',
    routeId: 'route-h001',
    currentStopId: 'stop-004',
    nextStopId: 'stop-005',
    remainingStops: 1,
    estimatedArrival: 5,
    congestion: 'low',
    isLowFloor: true,
    coordinates: { lat: 37.1540, lng: 126.8789 }
  },
  {
    busId: 'bus-h2-01',
    routeId: 'route-h002',
    currentStopId: 'stop-012',
    nextStopId: 'stop-013',
    remainingStops: 3,
    estimatedArrival: 12,
    congestion: 'high',
    isLowFloor: false,
    coordinates: { lat: 37.2000, lng: 127.0610 }
  },
  {
    busId: 'bus-h4-01',
    routeId: 'route-h004',
    currentStopId: 'stop-032',
    nextStopId: 'stop-033',
    remainingStops: 3,
    estimatedArrival: 6,
    congestion: 'low',
    isLowFloor: true,
    coordinates: { lat: 37.2004, lng: 127.0818 }
  },
  {
    busId: 'bus-h5-01',
    routeId: 'route-h005',
    currentStopId: 'stop-043',
    nextStopId: 'stop-044',
    remainingStops: 2,
    estimatedArrival: 4,
    congestion: 'medium',
    isLowFloor: true,
    coordinates: { lat: 37.1823, lng: 127.0420 }
  },
  {
    busId: 'bus-h8-01',
    routeId: 'route-h008',
    currentStopId: 'stop-072',
    nextStopId: 'stop-073',
    remainingStops: 3,
    estimatedArrival: 7,
    congestion: 'low',
    isLowFloor: true, // 접근성 특화 노선은 모두 저상버스
    coordinates: { lat: 37.2020, lng: 127.0828 }
  },
];

export function getBusRouteById(id: string): BusRoute | undefined {
  return busRoutes.find(r => r.id === id);
}

export function getLiveBusesByRoute(routeId: string): LiveBus[] {
  return liveBuses.filter(b => b.routeId === routeId);
}

export function getLowFloorBuses(): LiveBus[] {
  return liveBuses.filter(b => b.isLowFloor);
}

export function getNextBusArrival(stopId: string, routeId: string): number | null {
  const buses = liveBuses.filter(b =>
    b.routeId === routeId && b.nextStopId === stopId
  );

  if (buses.length === 0) return null;

  return Math.min(...buses.map(b => b.estimatedArrival));
}
