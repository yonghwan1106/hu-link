'use client';

import { RefreshCw } from 'lucide-react';
import { usePullToRefresh } from '@/lib/hooks/usePullToRefresh';

interface PullToRefreshProps {
  onRefresh: () => Promise<void> | void;
  children: React.ReactNode;
}

export function PullToRefresh({ onRefresh, children }: PullToRefreshProps) {
  const { pullDistance, isRefreshing, refreshProgress, shouldRefresh } = usePullToRefresh({
    onRefresh,
  });

  const showIndicator = pullDistance > 0 || isRefreshing;

  return (
    <div className="relative">
      {/* Pull to Refresh Indicator */}
      {showIndicator && (
        <div
          className="fixed top-0 left-0 right-0 z-40 flex items-center justify-center transition-all duration-200 bg-gradient-to-b from-[--primary]/10 to-transparent"
          style={{
            height: isRefreshing ? '60px' : `${pullDistance}px`,
            opacity: isRefreshing ? 1 : Math.min(refreshProgress / 100, 1),
          }}
        >
          <div className="flex flex-col items-center">
            <div
              className={`rounded-full bg-white shadow-lg p-3 transition-transform ${
                isRefreshing ? 'animate-spin' : shouldRefresh ? 'rotate-180' : ''
              }`}
            >
              <RefreshCw
                className="h-6 w-6 text-[--primary]"
                style={{
                  transform: !isRefreshing ? `rotate(${refreshProgress * 3.6}deg)` : undefined,
                }}
              />
            </div>
            {isRefreshing && (
              <p className="text-sm font-semibold text-[--primary] mt-2">새로고침 중...</p>
            )}
          </div>
        </div>
      )}

      {children}
    </div>
  );
}
