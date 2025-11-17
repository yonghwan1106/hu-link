'use client';

import { FacilityCardSkeleton } from '@/components/ui/skeleton';

export function FacilitiesLoading() {
  return (
    <div className="bg-gradient-to-b from-sky-50 to-white min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header Skeleton */}
        <div className="mb-8 space-y-2">
          <div className="h-10 w-48 bg-gray-200 rounded animate-pulse" />
          <div className="h-5 w-96 bg-gray-200 rounded animate-pulse" />
        </div>

        {/* Filters Skeleton */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-8 space-y-4">
          <div className="flex items-center justify-between">
            <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
            <div className="h-8 w-24 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="space-y-2">
            <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
            <div className="flex gap-2">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-9 w-20 bg-gray-200 rounded animate-pulse" />
              ))}
            </div>
          </div>
        </div>

        {/* Results Count Skeleton */}
        <div className="mb-4">
          <div className="h-5 w-48 bg-gray-200 rounded animate-pulse" />
        </div>

        {/* Grid Skeleton */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <FacilityCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
