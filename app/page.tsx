'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PullToRefresh } from '@/components/ui/pull-to-refresh';
import {
  MapPin,
  Bus,
  Calendar,
  Star,
  TrendingUp,
  Baby,
  Leaf,
  Zap,
  ArrowRight,
  Clock,
  Users,
  Award,
  Heart
} from 'lucide-react';
import { facilities } from '@/lib/data/facilities';
import { busRoutes, liveBuses } from '@/lib/data/buses';
import { bookings, mockUser } from '@/lib/data/bookings';
import { useCountUp } from '@/lib/hooks/useCountUp';
import { useFavorites } from '@/lib/hooks/useFavorites';
import dynamic from 'next/dynamic';

// Dynamic imports for code splitting
const SwipeableFacilityCard = dynamic(
  () => import('@/components/facilities/SwipeableFacilityCard').then(mod => ({ default: mod.SwipeableFacilityCard })),
  { ssr: true }
);

export default function HomePage() {
  const handleRefresh = async () => {
    // 실제로는 데이터를 다시 fetch
    await new Promise((resolve) => setTimeout(resolve, 1500));
    window.location.reload();
  };
  const facilitiesCount = useCountUp(facilities.length, 1500);
  const busRoutesCount = useCountUp(busRoutes.length, 1500);
  const pointsCount = useCountUp(mockUser.points, 2000);
  const bookingsCount = useCountUp(mockUser.totalBookings, 1500);
  const { toggleFavorite, isFavorite } = useFavorites();
  const popularFacilities = facilities.slice(0, 4);
  const activeBuses = liveBuses.slice(0, 3);
  const upcomingBooking = bookings.find(b => b.status === 'confirmed');

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <div className="bg-gradient-to-b from-sky-50 to-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <Badge variant="secondary" className="mb-4">
            100만 화성특례시 통합 MaaS 플랫폼
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            시설 예약부터 이동까지,
            <br />
            <span className="text-[--primary]">HU-Link 하나로</span>
          </h1>
          <p className="text-lg text-gray-800 mb-8 font-medium">
            공공시설 예약과 교통 정보를 한 번에. AI가 추천하는 최적의 경로로 편안하게 이동하세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/facilities">
              <Button size="lg" className="w-full sm:w-auto gap-2">
                <MapPin className="h-5 w-5" />
                시설 둘러보기
              </Button>
            </Link>
            <Link href="/transport">
              <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2 border-2 border-gray-800 text-gray-900 hover:bg-gray-100">
                <Bus className="h-5 w-5" />
                실시간 버스 정보
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
          <Card className="hover:shadow-lg transition-shadow bg-sky-50 dark:bg-sky-950/20">
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-[--primary] mb-1">
                {facilitiesCount}+
              </div>
              <div className="text-sm text-gray-500">공공시설</div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow bg-teal-50 dark:bg-teal-950/20">
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-[--secondary] mb-1">
                {busRoutesCount}
              </div>
              <div className="text-sm text-gray-500">H버스 노선</div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow bg-amber-50 dark:bg-amber-950/20">
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-[--accent] mb-1">
                {pointsCount.toLocaleString()}
              </div>
              <div className="text-sm text-gray-500">내 포인트</div>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow bg-green-50 dark:bg-green-950/20">
            <CardContent className="pt-6 text-center">
              <div className="text-3xl font-bold text-[--success] mb-1">
                {bookingsCount}
              </div>
              <div className="text-sm text-gray-500">이용 횟수</div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Next Booking Alert */}
      {upcomingBooking && (
        <section className="container mx-auto px-4 mb-12">
          <Card className="bg-gradient-to-r from-[--primary] to-[--primary-light] text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 p-3 rounded-lg">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-sm opacity-90">다가오는 예약</div>
                    <div className="text-xl font-bold">
                      {facilities.find(f => f.id === upcomingBooking.facilityId)?.name}
                    </div>
                    <div className="text-sm opacity-90">
                      {upcomingBooking.date} {upcomingBooking.startTime}
                    </div>
                  </div>
                </div>
                <Link href="/my">
                  <Button variant="outline" className="bg-white text-[--primary] hover:bg-gray-50">
                    자세히 보기
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      {/* Live Bus Status */}
      <section className="container mx-auto px-4 mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">실시간 버스 현황</h2>
          <Link href="/transport">
            <Button variant="ghost" size="sm">
              전체 보기 <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {activeBuses.map((bus) => {
            const route = busRoutes.find(r => r.id === bus.routeId);
            if (!route) return null;

            return (
              <Card key={bus.busId} className="hover:shadow-lg transition-shadow bg-cyan-50 dark:bg-cyan-950/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <div
                        className="w-12 h-8 rounded flex items-center justify-center text-white font-bold text-sm"
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
                  <CardDescription className="text-sm">{route.routeName}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">도착 예정</span>
                      <span className="font-semibold text-[--primary]">
                        {bus.estimatedArrival}분 후
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">혼잡도</span>
                      <Badge
                        variant={
                          bus.congestion === 'low'
                            ? 'success'
                            : bus.congestion === 'medium'
                            ? 'warning'
                            : 'error'
                        }
                      >
                        {bus.congestion === 'low'
                          ? '여유'
                          : bus.congestion === 'medium'
                          ? '보통'
                          : '혼잡'}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Popular Facilities */}
      <section className="container mx-auto px-4 mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">인기 시설</h2>
          <Link href="/facilities">
            <Button variant="ghost" size="sm">
              전체 보기 <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularFacilities.map((facility) => (
            <SwipeableFacilityCard
              key={facility.id}
              facility={facility}
              isFavorite={isFavorite(facility.id)}
              onToggleFavorite={() => toggleFavorite(facility.id)}
            />
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 pb-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">HU-Link만의 특별한 혜택</h2>
          <p className="text-gray-800 font-medium">환경도 지키고, 포인트도 적립하세요</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Card className="text-center bg-green-50 dark:bg-green-950/20">
            <CardHeader>
              <div className="mx-auto mb-4 w-14 h-14 bg-[--success]/10 rounded-full flex items-center justify-center">
                <Leaf className="h-7 w-7 text-[--success]" />
              </div>
              <CardTitle className="text-lg">탄소 절감</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                대중교통 이용 시 자동으로 CO2 절감량을 계산하여 환경 기여도를 확인할 수 있습니다.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center bg-amber-50 dark:bg-amber-950/20">
            <CardHeader>
              <div className="mx-auto mb-4 w-14 h-14 bg-[--warning]/10 rounded-full flex items-center justify-center">
                <Award className="h-7 w-7 text-[--warning]" />
              </div>
              <CardTitle className="text-lg">포인트 적립</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                H버스 이용 시 마일리지 적립! 시설 예약 시 할인 혜택으로 사용 가능합니다.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center bg-sky-50 dark:bg-sky-950/20">
            <CardHeader>
              <div className="mx-auto mb-4 w-14 h-14 bg-[--primary]/10 rounded-full flex items-center justify-center">
                <Zap className="h-7 w-7 text-[--primary]" />
              </div>
              <CardTitle className="text-lg">AI 경로 추천</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                목적지까지 최단 시간, 최저 요금, 편안한 이동 중 원하는 경로를 선택하세요.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 pb-16">
        <Card className="bg-gradient-to-r from-[--primary] via-[--primary-light] to-[--accent] text-white border-0">
          <CardContent className="p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">
              지금 바로 시설을 예약하고
              <br />
              최적의 이동 경로를 확인하세요
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              HU-Link는 화성시민의 이동권 보장과 동서 균형 발전을 위한 통합 플랫폼입니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/facilities">
                <Button size="lg" className="bg-white text-[--primary] hover:bg-gray-50 w-full sm:w-auto">
                  시설 예약하기
                </Button>
              </Link>
              <Link href="/with-kids">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/20 w-full sm:w-auto"
                >
                  <Baby className="mr-2 h-5 w-5" />
                  아이와 함께
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
    </PullToRefresh>
  );
}
