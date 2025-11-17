'use client';

import { BookingCardSkeleton, StatCardSkeleton, ListItemSkeleton } from '@/components/ui/skeleton';

export function MyPageLoading() {
  return (
    <div className="bg-gradient-to-b from-sky-50 to-white min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header Skeleton */}
        <div className="mb-8 space-y-2">
          <div className="h-10 w-40 bg-gray-200 rounded animate-pulse" />
          <div className="h-5 w-72 bg-gray-200 rounded animate-pulse" />
        </div>

        {/* User Info Card Skeleton */}
        <div className="mb-8 bg-gradient-to-r from-[--primary] to-[--primary-light] rounded-lg p-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-full animate-pulse" />
              <div className="space-y-2">
                <div className="h-7 w-32 bg-white/20 rounded animate-pulse" />
                <div className="h-4 w-48 bg-white/20 rounded animate-pulse" />
              </div>
            </div>
            <div className="flex gap-6">
              <div className="text-center space-y-1">
                <div className="h-9 w-20 bg-white/20 rounded animate-pulse mx-auto" />
                <div className="h-4 w-16 bg-white/20 rounded animate-pulse" />
              </div>
              <div className="text-center space-y-1">
                <div className="h-9 w-12 bg-white/20 rounded animate-pulse mx-auto" />
                <div className="h-4 w-16 bg-white/20 rounded animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats Skeleton */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {[...Array(3)].map((_, i) => (
            <StatCardSkeleton key={i} />
          ))}
        </div>

        {/* CO2 Chart Skeleton */}
        <div className="mb-8 bg-emerald-50 dark:bg-emerald-950/20 rounded-lg p-6">
          <div className="space-y-2 mb-4">
            <div className="h-6 w-48 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-80 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="h-64 bg-gray-200 rounded animate-pulse" />
        </div>

        {/* Upcoming Bookings Skeleton */}
        <div className="mb-8">
          <div className="h-7 w-40 bg-gray-200 rounded animate-pulse mb-4" />
          <div className="space-y-4">
            {[...Array(2)].map((_, i) => (
              <BookingCardSkeleton key={i} />
            ))}
          </div>
        </div>

        {/* Past Bookings Skeleton */}
        <div>
          <div className="h-7 w-32 bg-gray-200 rounded animate-pulse mb-4" />
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <ListItemSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
