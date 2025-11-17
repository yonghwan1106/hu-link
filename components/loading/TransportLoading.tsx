'use client';

import { BusCardSkeleton, BusRouteSkeleton } from '@/components/ui/skeleton';

export function TransportLoading() {
  return (
    <div className="bg-gradient-to-b from-sky-50 to-white min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header Skeleton */}
        <div className="mb-8 space-y-2">
          <div className="h-10 w-32 bg-gray-200 rounded animate-pulse" />
          <div className="h-5 w-80 bg-gray-200 rounded animate-pulse" />
        </div>

        {/* Map Skeleton */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-6 w-6 bg-gray-200 rounded animate-pulse" />
            <div className="h-7 w-56 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="w-full h-[400px] bg-gray-200 rounded-lg animate-pulse flex items-center justify-center">
            <div className="text-gray-400">지도를 불러오는 중...</div>
          </div>
          <div className="h-4 w-full max-w-2xl bg-gray-200 rounded animate-pulse mt-2" />
        </div>

        {/* Live Bus Status Skeleton */}
        <div className="mb-8">
          <div className="h-7 w-48 bg-gray-200 rounded animate-pulse mb-4" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <BusCardSkeleton key={i} />
            ))}
          </div>
        </div>

        {/* Bus Routes Skeleton */}
        <div>
          <div className="h-7 w-44 bg-gray-200 rounded animate-pulse mb-4" />
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <BusRouteSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
