'use client';

import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  className?: string;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  quality?: number;
  sizes?: string;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill,
  priority = false,
  className,
  objectFit = 'cover',
  quality = 85,
  sizes,
  placeholder = 'empty',
  blurDataURL,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div
        className={cn(
          'bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center',
          className
        )}
        style={{ width, height }}
      >
        <span className="text-gray-500 text-sm">이미지 로드 실패</span>
      </div>
    );
  }

  const imageProps = {
    src,
    alt,
    quality,
    priority,
    className: cn(
      'transition-opacity duration-300',
      isLoading ? 'opacity-0' : 'opacity-100',
      className
    ),
    onLoad: () => setIsLoading(false),
    onError: () => setError(true),
    ...(fill
      ? { fill: true }
      : { width: width || 800, height: height || 600 }),
    ...(objectFit && { style: { objectFit } }),
    ...(sizes && { sizes }),
    ...(placeholder === 'blur' && blurDataURL && { placeholder, blurDataURL }),
  };

  return (
    <>
      {isLoading && (
        <div
          className={cn(
            'absolute inset-0 bg-gray-200 animate-pulse',
            className
          )}
        />
      )}
      <Image {...imageProps} />
    </>
  );
}
