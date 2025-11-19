'use client';

import { use, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { facilities, getFacilityById } from '@/lib/data/facilities';
import { calculateRoute } from '@/lib/data/routes';
import {
  MapPin,
  Star,
  Clock,
  Users,
  ArrowRight,
  Baby,
  ParkingCircle,
  Leaf,
  Award,
  Navigation,
  Calendar,
  Zap,
  Wifi,
  Coffee,
  UtensilsCrossed,
  ShowerHead,
  Box
} from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// Dynamic imports for code splitting
const ImageGallery = dynamic(() => import('@/components/gallery/ImageGallery').then(mod => ({ default: mod.ImageGallery })), { ssr: false });
const BookingModal = dynamic(() => import('@/components/booking/BookingModal').then(mod => ({ default: mod.BookingModal })), { ssr: false });
const ShareButton = dynamic(() => import('@/components/share/ShareButton').then(mod => ({ default: mod.ShareButton })), { ssr: true });
const ReviewSection = dynamic(() => import('@/components/reviews/ReviewSection').then(mod => ({ default: mod.ReviewSection })), { ssr: false });

export default function FacilityDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const facility = getFacilityById(id);
  const [showRoutes, setShowRoutes] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);

  if (!facility) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">시설을 찾을 수 없습니다</h1>
          <Link href="/facilities">
            <Button>시설 목록으로 돌아가기</Button>
          </Link>
        </div>
      </div>
    );
  }

  // 현재 위치를 동탄역으로 가정 (실제로는 사용자의 실제 위치를 사용)
  const currentLat = 37.1995;
  const currentLng = 127.0950;
  const routes = calculateRoute(currentLat, currentLng, facility.id, facility.isAccessible);

  return (
    <div className="bg-gradient-to-b from-sky-50 to-white min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Facility Hero */}
        <div className="mb-8">
          <div className="relative mb-6">
            <ImageGallery
              images={facility.images}
              alt={facility.name}
              thumbnailUrl={facility.thumbnailUrl}
              category={facility.category}
            />
            <div className="absolute top-4 right-4 flex gap-2 z-10">
              {facility.isAccessible && (
                <Badge className="bg-white text-[--success]">저상버스 접근 가능</Badge>
              )}
              {facility.isKidFriendly && (
                <Badge className="bg-white text-pink-600">
                  <Baby className="h-4 w-4 mr-1" />
                  아이와 함께
                </Badge>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between gap-6">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{facility.name}</h1>
              <p className="text-lg text-gray-600 mb-4">{facility.description}</p>

              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-[--warning] fill-current" />
                  <span className="text-xl font-semibold">{facility.rating}</span>
                  <span className="text-gray-500">({facility.reviewCount}개 리뷰)</span>
                </div>
                <div className="text-2xl font-bold text-[--primary]">
                  {facility.price === 0 ? '무료' : `${facility.price.toLocaleString()}원`}
                  <span className="text-sm text-gray-500 ml-1">{facility.priceUnit}</span>
                </div>
              </div>

              <ShareButton
                title={facility.name}
                text={`${facility.name} - ${facility.description}`}
              />
            </div>

            <div className="md:w-80">
              <Card className="bg-sky-50 dark:bg-sky-950/20">
                <CardHeader>
                  <CardTitle className="text-lg">시설 정보</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 mt-0.5 text-gray-500" />
                    <span>{facility.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span>{facility.operatingHours}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span>최대 {facility.capacity}명</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Amenities */}
        <Card className="mb-8 bg-violet-50 dark:bg-violet-950/20">
          <CardHeader>
            <CardTitle>편의시설</CardTitle>
            <CardDescription>이 시설에서 제공하는 편의시설입니다</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2" data-testid="amenities-list">
              {facility.amenities.map((amenity, index) => {
                // 아이콘 매핑
                const getAmenityIcon = (name: string) => {
                  if (name.includes('주차')) return <ParkingCircle className="h-4 w-4 mr-1" />;
                  if (name.includes('샤워') || name.includes('탈의')) return <ShowerHead className="h-4 w-4 mr-1" />;
                  if (name.includes('카페') || name.includes('매점')) return <Coffee className="h-4 w-4 mr-1" />;
                  if (name.includes('식당')) return <UtensilsCrossed className="h-4 w-4 mr-1" />;
                  if (name.includes('와이파이') || name.includes('WiFi')) return <Wifi className="h-4 w-4 mr-1" />;
                  if (name.includes('락커') || name.includes('보관')) return <Box className="h-4 w-4 mr-1" />;
                  return null;
                };

                return (
                  <Badge
                    key={index}
                    variant="outline"
                    className="text-sm"
                    data-testid={`amenity-badge-${index}`}
                  >
                    {getAmenityIcon(amenity)}
                    {amenity}
                  </Badge>
                );
              })}
              {facility.hasParking && !facility.amenities.some(a => a.includes('주차')) && (
                <Badge variant="outline" className="text-sm" data-testid="parking-badge">
                  <ParkingCircle className="h-4 w-4 mr-1" />
                  주차 가능
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* AI Route Recommendation */}
        <div className="mb-8" data-testid="route-recommendation-section">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">AI 경로 추천</h2>
            {!showRoutes && (
              <Button
                onClick={() => setShowRoutes(true)}
                className="gap-2"
                aria-label="AI 최적 경로 보기"
              >
                <Zap className="h-4 w-4" />
                최적 경로 보기
              </Button>
            )}
          </div>

          {showRoutes && routes.length > 0 && (
            <div className="grid md:grid-cols-3 gap-4" data-testid="route-cards-container">
              {routes.map((route, routeIndex) => (
                <Card
                  key={route.id}
                  className="hover:shadow-xl transition-all cursor-pointer border-2 hover:border-[--primary] bg-emerald-50 dark:bg-emerald-950/20"
                  data-testid={`route-card-${routeIndex}`}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">{route.badge}</Badge>
                      <Badge variant={route.difficulty === 'easy' ? 'success' : 'outline'}>
                        {route.difficulty === 'easy' ? '쉬움' : '보통'}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">
                      총 {route.totalDuration}분 • {route.totalCost.toLocaleString()}원
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {route.segments.map((segment, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="flex flex-col items-center">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                segment.type === 'bus'
                                  ? 'bg-[--primary]'
                                  : segment.type === 'drt'
                                  ? 'bg-[--secondary]'
                                  : 'bg-gray-300'
                              } text-white`}
                            >
                              {segment.type === 'bus' ? (
                                <Navigation className="h-4 w-4" />
                              ) : segment.type === 'drt' ? (
                                <Zap className="h-4 w-4" />
                              ) : (
                                <Users className="h-4 w-4" />
                              )}
                            </div>
                            {index < route.segments.length - 1 && (
                              <div className="w-0.5 h-8 bg-gray-300" />
                            )}
                          </div>
                          <div className="flex-1 pb-3">
                            <div className="font-semibold text-sm">{segment.mode}</div>
                            <div className="text-xs text-gray-500">
                              {segment.from} → {segment.to}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {segment.duration}분 • {segment.cost.toLocaleString()}원
                            </div>
                            {segment.isLowFloor && (
                              <Badge variant="success" className="text-xs mt-1">
                                저상버스
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}

                      <div className="pt-3 border-t space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-500">CO2 절감</span>
                          <span className="font-semibold text-[--success]">
                            <Leaf className="h-3 w-3 inline mr-1" />
                            {route.co2Saved}kg
                          </span>
                        </div>
                        {route.isAccessible && (
                          <div className="text-xs text-[--success]">✓ 휠체어/유모차 접근 가능</div>
                        )}
                      </div>

                      <Button
                        className="w-full mt-2"
                        onClick={() => setShowBookingModal(true)}
                      >
                        이 경로로 예약하기
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {showRoutes && routes.length === 0 && (
            <Card className="bg-gray-50 dark:bg-gray-900/20">
              <CardContent className="p-12 text-center">
                <p className="text-gray-500">경로를 찾을 수 없습니다</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Booking CTA */}
        <Card className="bg-gradient-to-r from-[--primary] to-[--primary-light] text-white border-0">
          <CardContent className="p-8">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h3 className="text-2xl font-bold mb-2">지금 바로 예약하세요</h3>
                <p className="opacity-90">
                  시설 예약과 교통편을 한 번에! HU-Link로 편리하게 이용하세요
                </p>
              </div>
              <div className="flex gap-3">
                <Button
                  size="lg"
                  className="bg-white text-[--primary] hover:bg-gray-50"
                  onClick={() => setShowBookingModal(true)}
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  예약하기
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Benefits */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <Card className="text-center bg-green-50 dark:bg-green-950/20">
            <CardContent className="pt-6">
              <div className="mx-auto mb-4 w-14 h-14 bg-[--primary]/10 rounded-full flex items-center justify-center">
                <Leaf className="h-7 w-7 text-[--success]" />
              </div>
              <h3 className="font-semibold mb-2">환경 보호</h3>
              <p className="text-sm text-gray-600">
                대중교통 이용 시 CO2 절감량을 실시간으로 확인하세요
              </p>
            </CardContent>
          </Card>
          <Card className="text-center bg-amber-50 dark:bg-amber-950/20">
            <CardContent className="pt-6">
              <div className="mx-auto mb-4 w-14 h-14 bg-[--warning]/10 rounded-full flex items-center justify-center">
                <Award className="h-7 w-7 text-[--warning]" />
              </div>
              <h3 className="font-semibold mb-2">포인트 적립</h3>
              <p className="text-sm text-gray-600">예약과 이용 시마다 포인트를 적립하세요</p>
            </CardContent>
          </Card>
          <Card className="text-center bg-teal-50 dark:bg-teal-950/20">
            <CardContent className="pt-6">
              <div className="mx-auto mb-4 w-14 h-14 bg-[--secondary]/10 rounded-full flex items-center justify-center">
                <Zap className="h-7 w-7 text-[--secondary]" />
              </div>
              <h3 className="font-semibold mb-2">원스톱 서비스</h3>
              <p className="text-sm text-gray-600">시설 예약부터 교통편까지 한 번에 해결</p>
            </CardContent>
          </Card>
        </div>

        {/* Reviews Section */}
        <div className="mt-12">
          <ReviewSection facilityId={facility.id} facilityName={facility.name} />
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        facility={facility}
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
      />
    </div>
  );
}
