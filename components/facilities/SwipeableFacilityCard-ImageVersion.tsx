'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, Baby, Heart, Dumbbell, Palette, HandHeart, Tent, Users } from 'lucide-react';
import { Facility } from '@/lib/data/facilities';
import { useSwipe } from '@/lib/hooks/useSwipe';

interface SwipeableFacilityCardProps {
  facility: Facility;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

// 카테고리별 아이콘과 색상 매핑
const getCategoryDisplay = (category: string) => {
  const displays = {
    sports: {
      icon: Dumbbell,
      gradient: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-100',
    },
    culture: {
      icon: Palette,
      gradient: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-100',
    },
    welfare: {
      icon: HandHeart,
      gradient: 'from-rose-500 to-red-500',
      bgColor: 'bg-rose-100',
    },
    camping: {
      icon: Tent,
      gradient: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-100',
    },
    youth: {
      icon: Users,
      gradient: 'from-amber-500 to-orange-500',
      bgColor: 'bg-amber-100',
    },
  };
  return displays[category as keyof typeof displays] || displays.sports;
};

export function SwipeableFacilityCard({
  facility,
  isFavorite,
  onToggleFavorite,
}: SwipeableFacilityCardProps) {
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [imageError, setImageError] = useState(false);
  const categoryDisplay = getCategoryDisplay(facility.category);
  const CategoryIcon = categoryDisplay.icon;

  const { handlers } = useSwipe({
    onSwipeLeft: () => {
      setIsRevealed(true);
      setSwipeOffset(-80);
      // Auto-hide after 2 seconds
      setTimeout(() => {
        setIsRevealed(false);
        setSwipeOffset(0);
      }, 2000);
    },
    onSwipeRight: () => {
      setIsRevealed(false);
      setSwipeOffset(0);
    },
    threshold: 30,
  });

  return (
    <div className="relative overflow-hidden">
      {/* Swipe Action Background */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-end pr-6 rounded-lg"
        style={{
          transform: `translateX(${isRevealed ? '0' : '100%'})`,
          transition: 'transform 0.3s ease',
        }}
      >
        <div className="flex flex-col items-center text-white">
          <Heart className="h-6 w-6 fill-white" />
          <span className="text-xs mt-1 font-semibold">
            {isFavorite ? '해제' : '추가'}
          </span>
        </div>
      </div>

      {/* Card */}
      <div
        className="relative bg-white"
        style={{
          transform: `translateX(${swipeOffset}px)`,
          transition: 'transform 0.3s ease',
        }}
        {...handlers}
      >
        <Link href={`/facilities/${facility.id}`}>
          <Card className={`h-full hover:shadow-2xl hover:scale-[1.02] hover:border-[--primary] transition-all duration-300 cursor-pointer group border-2 border-transparent ${categoryDisplay.bgColor} dark:bg-blue-950/20`}>
            <div className={`aspect-video bg-gradient-to-br ${categoryDisplay.gradient} relative overflow-hidden group-hover:scale-105 transition-transform duration-300`}>
              {/* 실제 이미지가 있으면 이미지 표시, 없으면 아이콘 표시 */}
              {facility.thumbnailUrl && !imageError ? (
                <>
                  <Image
                    src={facility.thumbnailUrl}
                    alt={facility.name}
                    fill
                    className="object-cover"
                    onError={() => setImageError(true)}
                  />
                  {/* 이미지 위에 그라데이션 오버레이 */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <CategoryIcon className="w-24 h-24 text-white/30 group-hover:text-white/50 transition-all duration-300 group-hover:scale-110" strokeWidth={1.5} />
                </div>
              )}
              {facility.isAccessible && (
                <Badge className="absolute top-2 right-2" variant="success">
                  접근 편리
                </Badge>
              )}
              <div className="absolute bottom-2 left-2">
                <Badge variant="outline" className="bg-white/90">
                  {facility.category === 'sports'
                    ? '체육'
                    : facility.category === 'culture'
                    ? '문화'
                    : facility.category === 'welfare'
                    ? '복지'
                    : facility.category === 'camping'
                    ? '캠핑'
                    : '청소년'}
                </Badge>
              </div>
            </div>
            <CardHeader>
              <CardTitle className="text-lg group-hover:text-[--primary] transition-colors">
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
                    <span className="text-gray-400 text-xs">({facility.reviewCount})</span>
                  </div>
                  <div className="font-semibold text-[--primary]">
                    {facility.price === 0 ? '무료' : `${facility.price.toLocaleString()}원`}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {facility.isKidFriendly && (
                    <Badge variant="outline" className="text-xs">
                      <Baby className="h-3 w-3 mr-1" />
                      아이와 함께
                    </Badge>
                  )}
                  {facility.hasParking && (
                    <Badge variant="outline" className="text-xs">
                      주차 가능
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        {/* Favorite Button (always visible on desktop) */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggleFavorite();
          }}
          className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all duration-200 md:block hidden"
          aria-label={isFavorite ? '즐겨찾기 해제' : '즐겨찾기 추가'}
        >
          <Heart
            className={`h-5 w-5 transition-colors ${
              isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'
            }`}
          />
        </button>
      </div>

      {/* Swipe Action Button (revealed on mobile swipe) */}
      {isRevealed && (
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggleFavorite();
            setIsRevealed(false);
            setSwipeOffset(0);
          }}
          className="absolute top-3 right-3 z-20 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg md:hidden"
          aria-label={isFavorite ? '즐겨찾기 해제' : '즐겨찾기 추가'}
        >
          <Heart
            className={`h-5 w-5 transition-colors ${
              isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'
            }`}
          />
        </button>
      )}
    </div>
  );
}
