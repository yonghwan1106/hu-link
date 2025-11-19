'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Dumbbell, Palette, HandHeart, Tent, Users } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface ImageGalleryProps {
  images: string[];
  alt: string;
  thumbnailUrl?: string;
  category?: string;
}

// 카테고리별 아이콘과 그라데이션
const getCategoryDisplay = (category?: string) => {
  const displays = {
    sports: {
      icon: Dumbbell,
      gradient: 'from-blue-500 to-cyan-500',
    },
    culture: {
      icon: Palette,
      gradient: 'from-purple-500 to-pink-500',
    },
    welfare: {
      icon: HandHeart,
      gradient: 'from-rose-500 to-red-500',
    },
    camping: {
      icon: Tent,
      gradient: 'from-green-500 to-emerald-500',
    },
    youth: {
      icon: Users,
      gradient: 'from-amber-500 to-orange-500',
    },
  };
  return displays[category as keyof typeof displays] || displays.sports;
};

export function ImageGallery({ images, alt, thumbnailUrl, category }: ImageGalleryProps) {
  const [imageError, setImageError] = useState(false);
  const categoryDisplay = getCategoryDisplay(category);
  const CategoryIcon = categoryDisplay.icon;

  // 실제 이미지가 있으면 사용, 없으면 그라데이션
  const gradients = [
    'from-[--primary] to-[--primary-light]',
    'from-[--secondary] to-[--accent]',
    'from-[--primary-light] to-[--secondary]',
    'from-blue-500 to-cyan-500',
    'from-teal-500 to-emerald-500',
  ];

  return (
    <div className="relative rounded-2xl overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        className="aspect-[21/9] w-full"
      >
        {thumbnailUrl && !imageError ? (
          // 실제 이미지 표시
          <SwiperSlide>
            <div className="w-full h-full relative">
              <Image
                src={thumbnailUrl}
                alt={alt}
                fill
                className="object-cover"
                onError={() => setImageError(true)}
                priority
              />
              {/* 이미지 위에 그라데이션 오버레이 */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-lg z-10">
                <p className="text-white text-sm font-semibold">{alt}</p>
              </div>
            </div>
          </SwiperSlide>
        ) : (
          // 폴백: 카테고리별 아이콘과 그라데이션
          gradients.map((gradient, index) => (
            <SwiperSlide key={index}>
              <div className={`w-full h-full bg-gradient-to-br ${index === 0 ? categoryDisplay.gradient : gradient} relative`}>
                {index === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <CategoryIcon className="w-40 h-40 text-white/20" strokeWidth={1.5} />
                  </div>
                )}
                {index !== 0 && (
                  <div className="absolute inset-0 flex items-center justify-center text-white text-8xl font-bold opacity-20">
                    HU
                  </div>
                )}
                <div className="absolute bottom-4 left-4 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <p className="text-white text-sm font-semibold">
                    {alt} - {index + 1}/{gradients.length}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </div>
  );
}
