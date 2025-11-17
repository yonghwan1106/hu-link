'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { PullToRefresh } from '@/components/ui/pull-to-refresh';
import { busRoutes, liveBuses } from '@/lib/data/buses';
import { Bus, Clock, MapPin, Navigation, TrendingUp, Map as MapIcon } from 'lucide-react';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const BusMap = dynamic(() => import('@/components/maps/BusMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] bg-gray-100 rounded-lg flex items-center justify-center">
      <div className="text-gray-500">지도를 불러오는 중...</div>
    </div>
  ),
});

export default function TransportPage() {
  const handleRefresh = async () => {
    // 실제로는 버스 위치 데이터를 다시 fetch
    await new Promise((resolve) => setTimeout(resolve, 1500));
    window.location.reload();
  };
  // Helper function to get congestion data
  const getCongestionData = (congestion: 'low' | 'medium' | 'high') => {
    switch (congestion) {
      case 'low':
        return { value: 30, color: 'bg-green-500', label: '여유', badgeVariant: 'success' as const };
      case 'medium':
        return { value: 65, color: 'bg-orange-500', label: '보통', badgeVariant: 'warning' as const };
      case 'high':
        return { value: 95, color: 'bg-red-500', label: '혼잡', badgeVariant: 'error' as const };
    }
  };

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <div className="bg-gradient-to-b from-sky-50 to-white min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">교통 정보</h1>
          <p className="text-gray-600">H버스 실시간 위치와 노선 정보를 확인하세요</p>
        </div>

        {/* Bus Map */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <MapIcon className="h-6 w-6 text-[--primary]" />
            <h2 className="text-2xl font-bold text-gray-900">실시간 버스 위치 지도</h2>
          </div>
          <Suspense
            fallback={
              <div className="w-full h-[400px] bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-gray-500">지도를 불러오는 중...</div>
              </div>
            }
          >
            <BusMap buses={liveBuses} />
          </Suspense>
          <p className="text-sm text-gray-500 mt-2">
            지도를 클릭하거나 확대/축소하여 버스 위치를 자세히 확인하세요. 버스 아이콘을 클릭하면 상세 정보를
            볼 수 있습니다.
          </p>
        </div>

        {/* Live Bus Status Cards */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">실시간 버스 현황</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {liveBuses.map((bus) => {
              const route = busRoutes.find((r) => r.id === bus.routeId);
              if (!route) return null;

              return (
                <Card key={bus.busId} className="hover:shadow-lg transition-shadow bg-cyan-50 dark:bg-cyan-950/20">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <div
                          className="w-14 h-10 rounded flex items-center justify-center text-white font-bold"
                          style={{ backgroundColor: route.color }}
                        >
                          {route.routeNumber}
                        </div>
                      </CardTitle>
                      {bus.isLowFloor && (
                        <Badge variant="success" className="text-xs">
                          저상버스
                        </Badge>
                      )}
                    </div>
                    <CardDescription className="text-sm mt-2">{route.routeName}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500 flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          도착 예정
                        </span>
                        <span className="font-semibold text-[--primary] text-lg">
                          {bus.estimatedArrival}분 후
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">남은 정류장</span>
                        <span className="font-semibold">{bus.remainingStops}개</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">혼잡도</span>
                          <Badge variant={getCongestionData(bus.congestion).badgeVariant} className="text-xs">
                            {getCongestionData(bus.congestion).label}
                          </Badge>
                        </div>
                        <Progress
                          value={getCongestionData(bus.congestion).value}
                          indicatorClassName={getCongestionData(bus.congestion).color}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Bus Routes */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">H버스 노선 정보</h2>
          <div className="space-y-4">
            {busRoutes.map((route) => (
              <Card key={route.id} className="hover:shadow-lg transition-shadow bg-teal-50 dark:bg-teal-950/20">
                <CardHeader>
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-16 h-12 rounded-lg flex items-center justify-center text-white font-bold text-lg"
                        style={{ backgroundColor: route.color }}
                      >
                        {route.routeNumber}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{route.routeName}</CardTitle>
                        <CardDescription className="text-xs">
                          {route.firstBus} ~ {route.lastBus} 운행
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <Badge
                        variant={
                          route.type === 'express'
                            ? 'error'
                            : route.type === 'local'
                            ? 'secondary'
                            : 'default'
                        }
                      >
                        {route.type === 'express' ? '급행' : route.type === 'local' ? '일반' : '셔틀'}
                      </Badge>
                      <span className="text-sm font-semibold text-[--primary]">
                        {route.fare.toLocaleString()}원
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>배차 간격: {route.interval}분</span>
                    </div>
                    <div className="mt-3">
                      <p className="text-xs text-gray-500 mb-2">주요 정류장</p>
                      <div className="flex flex-wrap gap-2">
                        {route.stops.map((stop, index) => (
                          <div key={stop.id} className="flex items-center gap-1">
                            <Badge variant="outline" className="text-xs">
                              {stop.name}
                            </Badge>
                            {index < route.stops.length - 1 && (
                              <Navigation className="h-3 w-3 text-gray-400" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* DRT Info */}
        <div className="mt-12 bg-gradient-to-r from-[--secondary] to-[--accent] rounded-xl p-8 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">DRT (수요응답형 교통) 서비스</h2>
            <p className="text-lg opacity-90 mb-6">
              H버스 정류장까지 거리가 멀다면, DRT를 이용하세요!
              <br />
              앱에서 실시간으로 호출 가능합니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-[--secondary] hover:bg-gray-50">
                DRT 호출하기
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                이용 방법 보기
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </PullToRefresh>
  );
}
