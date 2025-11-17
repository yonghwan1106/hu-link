'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface ImageGalleryProps {
  images: string[];
  alt: string;
}

export function ImageGallery({ images, alt }: ImageGalleryProps) {
  // 실제 이미지가 없으므로 그라데이션 배경 생성
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
        {gradients.map((gradient, index) => (
          <SwiperSlide key={index}>
            <div className={`w-full h-full bg-gradient-to-br ${gradient} relative`}>
              <div className="absolute inset-0 flex items-center justify-center text-white text-8xl font-bold opacity-20">
                HU
              </div>
              <div className="absolute bottom-4 left-4 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-lg">
                <p className="text-white text-sm font-semibold">
                  {alt} - {index + 1}/{gradients.length}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
