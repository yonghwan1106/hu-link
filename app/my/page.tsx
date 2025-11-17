'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockUser, bookings, getUpcomingBookings, getPastBookings } from '@/lib/data/bookings';
import { facilities } from '@/lib/data/facilities';
import { User, Calendar, Award, TrendingUp, MapPin, Clock, Leaf, Heart, Star, History } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useFavorites } from '@/lib/hooks/useFavorites';
import dynamic from 'next/dynamic';

// Dynamic imports for code splitting
const CO2Chart = dynamic(() => import('@/components/charts/CO2Chart').then(mod => ({ default: mod.CO2Chart })), { ssr: false });
const PointTimeline = dynamic(() => import('@/components/points/PointTimeline').then(mod => ({ default: mod.PointTimeline })), { ssr: false });
const EmptyState = dynamic(() => import('@/components/ui/empty-state').then(mod => ({ default: mod.EmptyState })), { ssr: true });

export default function MyPage() {
  const router = useRouter();
  const upcomingBookings = getUpcomingBookings(mockUser.id);
  const pastBookings = getPastBookings(mockUser.id);
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const favoriteFacilities = facilities.filter((f) => favorites.includes(f.id));

  return (
    <div className="bg-gradient-to-b from-sky-50 to-white min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">마이 페이지</h1>
          <p className="text-gray-600">내 예약 내역과 포인트를 관리하세요</p>
        </div>

        {/* User Info */}
        <Card className="mb-8 bg-gradient-to-r from-[--primary] to-[--primary-light] text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-4 rounded-full">
                  <User className="h-8 w-8" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{mockUser.name}님</h2>
                  <p className="text-sm opacity-90">{mockUser.email}</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold">{mockUser.points.toLocaleString()}</div>
                  <div className="text-sm opacity-90">포인트</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">{mockUser.totalBookings}</div>
                  <div className="text-sm opacity-90">이용 횟수</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-sky-50 dark:bg-sky-950/20">
            <CardHeader>
              <CardTitle className="text-sm text-gray-500">다가오는 예약</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[--primary]">{upcomingBookings.length}</div>
            </CardContent>
          </Card>
          <Card className="bg-teal-50 dark:bg-teal-950/20">
            <CardHeader>
              <CardTitle className="text-sm text-gray-500">이번 달 이용</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[--secondary]">5</div>
            </CardContent>
          </Card>
          <Card className="bg-green-50 dark:bg-green-950/20">
            <CardHeader>
              <CardTitle className="text-sm text-gray-500">절약한 CO2</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-[--success]">24.3kg</div>
            </CardContent>
          </Card>
        </div>

        {/* CO2 Savings Chart */}
        <Card className="mb-8 bg-emerald-50 dark:bg-emerald-950/20">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-[--success]" />
              <CardTitle>월별 CO2 절감량</CardTitle>
            </div>
            <CardDescription>
              대중교통 이용으로 절감한 CO2 배출량을 확인하세요
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CO2Chart />
            <div className="mt-4 p-4 bg-green-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">총 절감량 (6개월)</p>
                  <p className="text-2xl font-bold text-[--success]">24.3kg</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">나무 심기 효과</p>
                  <p className="text-xl font-semibold text-green-700">약 3.5그루</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Bookings */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">다가오는 예약</h2>
          {upcomingBookings.length > 0 ? (
            <div className="space-y-4">
              {upcomingBookings.map((booking) => {
                const facility = facilities.find((f) => f.id === booking.facilityId);
                if (!facility) return null;

                return (
                  <Card key={booking.id} className="hover:shadow-lg transition-shadow bg-blue-50 dark:bg-blue-950/20">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between flex-wrap gap-4">
                        <div className="flex gap-4">
                          <div className="w-20 h-20 bg-gradient-to-br from-[--primary] to-[--primary-light] rounded-lg flex items-center justify-center text-white font-bold text-2xl">
                            HU
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold mb-1">{facility.name}</h3>
                            <div className="space-y-1 text-sm text-gray-600">
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                <span>
                                  {booking.date} {booking.startTime} - {booking.endTime}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                <span>{facility.address}</span>
                              </div>
                              {booking.routeInfo && (
                                <div className="flex items-center gap-2">
                                  <Clock className="h-4 w-4" />
                                  <span>예상 이동시간: {booking.routeInfo.estimatedTime}분</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge
                            variant={
                              booking.status === 'confirmed'
                                ? 'success'
                                : booking.status === 'pending'
                                ? 'warning'
                                : 'default'
                            }
                            className="mb-2"
                          >
                            {booking.status === 'confirmed'
                              ? '예약 확정'
                              : booking.status === 'pending'
                              ? '대기 중'
                              : '취소됨'}
                          </Badge>
                          <div className="text-2xl font-bold text-[--primary]">
                            {(booking.totalPrice + booking.transportCost - booking.discount).toLocaleString()}원
                          </div>
                          <div className="text-xs text-gray-500">
                            시설 {booking.totalPrice.toLocaleString()}원 + 교통{' '}
                            {booking.transportCost.toLocaleString()}원
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <EmptyState
              icon="calendar"
              title="다가오는 예약이 없습니다"
              description="새로운 시설을 예약하고 편리하게 이용하세요!"
              action={{
                label: '시설 예약하기',
                onClick: () => router.push('/facilities'),
              }}
            />
          )}
        </div>

        {/* Favorite Facilities */}
        {favoriteFacilities.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="h-6 w-6 text-red-500 fill-red-500" />
              <h2 className="text-2xl font-bold text-gray-900">즐겨찾는 시설</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {favoriteFacilities.map((facility) => (
                <div key={facility.id} className="relative">
                  <Link href={`/facilities/${facility.id}`}>
                    <Card className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02] bg-pink-50 dark:bg-pink-950/20">
                      <div className="aspect-video bg-gradient-to-br from-[--primary] to-[--primary-light] relative overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center text-white text-5xl font-bold opacity-20">
                          HU
                        </div>
                      </div>
                      <CardHeader>
                        <CardTitle className="text-lg">{facility.name}</CardTitle>
                        <CardDescription className="text-xs line-clamp-1">
                          {facility.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-[--warning]">
                            <Star className="h-4 w-4 fill-current" />
                            <span className="font-semibold text-sm">{facility.rating}</span>
                          </div>
                          <div className="font-semibold text-[--primary]">
                            {facility.price === 0 ? '무료' : `${facility.price.toLocaleString()}원`}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleFavorite(facility.id);
                    }}
                    className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all duration-200"
                    aria-label="즐겨찾기 해제"
                  >
                    <Heart className="h-5 w-5 fill-red-500 text-red-500" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Past Bookings */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">이용 내역</h2>
          <div className="space-y-4">
            {pastBookings.slice(0, 5).map((booking) => {
              const facility = facilities.find((f) => f.id === booking.facilityId);
              if (!facility) return null;

              return (
                <Card key={booking.id} className="opacity-75 bg-gray-50 dark:bg-gray-900/20">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">{facility.name}</h4>
                        <p className="text-sm text-gray-500">
                          {booking.date} {booking.startTime}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline">완료</Badge>
                        <p className="text-sm font-semibold mt-1">
                          {(booking.totalPrice + booking.transportCost - booking.discount).toLocaleString()}원
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Point Transaction Timeline */}
        <div className="mt-12">
          <div className="flex items-center gap-2 mb-6">
            <History className="h-6 w-6 text-[--primary]" />
            <h2 className="text-2xl font-bold text-gray-900">포인트 적립/사용 내역</h2>
          </div>
          <PointTimeline />
        </div>

        {/* Points Info */}
        <div className="mt-12 bg-gradient-to-r from-[--warning] to-[--secondary] rounded-xl p-8 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <Award className="h-12 w-12 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">포인트 더 모으기</h2>
            <p className="text-lg opacity-90 mb-6">
              H버스를 이용하고 예약할 때마다 포인트를 적립하세요!
              <br />
              적립한 포인트로 시설 이용료 할인 혜택을 받을 수 있습니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
