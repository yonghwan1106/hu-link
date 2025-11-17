'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getKidFriendlyFacilities, getAccessibleFacilities } from '@/lib/data/facilities';
import { busRoutes, getLowFloorBuses } from '@/lib/data/buses';
import { Baby, Bus, Heart, Shield, Star, MapPin, Accessibility } from 'lucide-react';

export default function WithKidsPage() {
  const kidFriendlyFacilities = getKidFriendlyFacilities();
  const lowFloorBuses = getLowFloorBuses();
  const accessibleBusRoutes = busRoutes.filter((route) => route.id.includes('h008') || route.id.includes('h004'));

  return (
    <div className="bg-gradient-to-b from-pink-50 to-white min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full mb-6">
            <Baby className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">아이와 함께</h1>
          <p className="text-lg text-gray-600">
            아이와 함께 안전하고 편안하게 이용할 수 있는 시설과 교통 정보를 확인하세요
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center border-pink-200 bg-pink-50 dark:bg-pink-950/20">
            <CardHeader>
              <div className="mx-auto mb-4 w-14 h-14 bg-pink-100 rounded-full flex items-center justify-center">
                <Shield className="h-7 w-7 text-pink-500" />
              </div>
              <CardTitle className="text-lg">안전한 시설</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                유모차 출입이 가능하고 안전 시설이 갖춰진 공공시설만 엄선했습니다
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-purple-200 bg-purple-50 dark:bg-purple-950/20">
            <CardHeader>
              <div className="mx-auto mb-4 w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center">
                <Accessibility className="h-7 w-7 text-purple-500" />
              </div>
              <CardTitle className="text-lg">저상버스 우선</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                유모차와 휠체어 탑승이 편리한 저상버스 노선을 우선 안내합니다
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-blue-200 bg-blue-50 dark:bg-blue-950/20">
            <CardHeader>
              <div className="mx-auto mb-4 w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
                <Heart className="h-7 w-7 text-blue-500" />
              </div>
              <CardTitle className="text-lg">맞춤 프로그램</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                영유아 및 아동을 위한 특별 프로그램이 운영되는 시설을 찾아보세요
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Kid-Friendly Facilities */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">아이와 함께하기 좋은 시설</h2>
            <Link href="/facilities">
              <Button variant="ghost" size="sm">
                전체 보기
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {kidFriendlyFacilities.slice(0, 6).map((facility) => (
              <Link key={facility.id} href={`/facilities/${facility.id}`}>
                <Card className="h-full hover:shadow-xl transition-all cursor-pointer group border-pink-100 bg-rose-50 dark:bg-rose-950/20">
                  <div className="aspect-video bg-gradient-to-br from-pink-300 to-purple-300 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center text-white text-4xl font-bold opacity-20">
                      HU
                    </div>
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-white/90 text-pink-600">
                        <Baby className="h-3 w-3 mr-1" />
                        아이와 함께
                      </Badge>
                    </div>
                    {facility.isAccessible && (
                      <Badge className="absolute top-2 right-2 bg-green-500">유모차 OK</Badge>
                    )}
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg group-hover:text-pink-600 transition-colors">
                      {facility.name}
                    </CardTitle>
                    <CardDescription className="text-xs line-clamp-2">
                      {facility.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2 text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <span className="line-clamp-1">{facility.address}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-[--warning]">
                          <Star className="h-4 w-4 fill-current" />
                          <span className="font-semibold text-sm">{facility.rating}</span>
                        </div>
                        <div className="font-semibold text-pink-600">
                          {facility.price === 0 ? '무료' : `${facility.price.toLocaleString()}원`}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {facility.amenities.includes('유모차') && (
                          <Badge variant="outline" className="text-xs">
                            유모차 대여
                          </Badge>
                        )}
                        {facility.amenities.includes('수유실') && (
                          <Badge variant="outline" className="text-xs">
                            수유실
                          </Badge>
                        )}
                        {facility.hasParking && (
                          <Badge variant="outline" className="text-xs">
                            주차
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Low Floor Buses */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">저상버스 운행 노선</h2>
          <p className="text-gray-600 mb-6">
            유모차와 휠체어 탑승이 편리한 저상버스가 운행되는 노선입니다
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            {accessibleBusRoutes.map((route) => (
              <Card key={route.id} className="border-green-200 bg-green-50 dark:bg-green-950/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
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
                          {route.firstBus} ~ {route.lastBus}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge variant="success" className="text-xs">
                      <Accessibility className="h-3 w-3 mr-1" />
                      저상버스
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Bus className="h-4 w-4" />
                    <span>배차 간격: {route.interval}분</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Tip Section */}
        <Card className="bg-gradient-to-r from-pink-400 to-purple-400 text-white border-0">
          <CardContent className="p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-4">아이와 함께 이용 팁</h2>
              <div className="grid md:grid-cols-2 gap-6 text-left">
                <div className="bg-white/20 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">시설 예약 시</h3>
                  <ul className="text-sm space-y-1 opacity-90">
                    <li>• 수유실, 기저귀 교환대 유무 확인</li>
                    <li>• 유모차 대여 가능 여부 체크</li>
                    <li>• 아이와 함께 필터로 검색</li>
                  </ul>
                </div>
                <div className="bg-white/20 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">교통 이용 시</h3>
                  <ul className="text-sm space-y-1 opacity-90">
                    <li>• 저상버스 노선 우선 선택</li>
                    <li>• 혼잡도 낮은 시간대 이용</li>
                    <li>• DRT로 정류장까지 편하게</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
