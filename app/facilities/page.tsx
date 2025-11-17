'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { facilities, FacilityCategory } from '@/lib/data/facilities';
import { MapPin, Star, Baby, Filter, Check, Heart } from 'lucide-react';
import { useFavorites } from '@/lib/hooks/useFavorites';
import dynamic from 'next/dynamic';

// Dynamic imports for code splitting
const EmptyState = dynamic(() => import('@/components/ui/empty-state').then(mod => ({ default: mod.EmptyState })), { ssr: true });
const SwipeableFacilityCard = dynamic(
  () => import('@/components/facilities/SwipeableFacilityCard').then(mod => ({ default: mod.SwipeableFacilityCard })),
  { ssr: true }
);

export default function FacilitiesPage() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const { toggleFavorite, isFavorite } = useFavorites();

  const [selectedCategory, setSelectedCategory] = useState<FacilityCategory | 'all'>('all');
  const [showAccessibleOnly, setShowAccessibleOnly] = useState(false);
  const [showKidFriendlyOnly, setShowKidFriendlyOnly] = useState(false);

  const filteredFacilities = facilities.filter((facility) => {
    // 검색 쿼리 필터링
    if (searchQuery && !facility.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    if (selectedCategory !== 'all' && facility.category !== selectedCategory) return false;
    if (showAccessibleOnly && !facility.isAccessible) return false;
    if (showKidFriendlyOnly && !facility.isKidFriendly) return false;
    return true;
  });

  const categories = [
    { value: 'all' as const, label: '전체' },
    { value: 'sports' as FacilityCategory, label: '체육시설' },
    { value: 'culture' as FacilityCategory, label: '문화시설' },
    { value: 'welfare' as FacilityCategory, label: '복지시설' },
    { value: 'camping' as FacilityCategory, label: '캠핑장' },
    { value: 'youth' as FacilityCategory, label: '청소년' },
  ];

  return (
    <div className="bg-gradient-to-b from-sky-50 to-white min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">시설 찾기</h1>
          <p className="text-gray-600">
            {searchQuery ? (
              <>
                '<span className="font-semibold text-[--primary]">{searchQuery}</span>' 검색 결과
              </>
            ) : (
              '화성시 공공시설을 한눈에 확인하고 바로 예약하세요'
            )}
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <h2 className="font-semibold text-gray-900">필터</h2>
            </div>
            {(selectedCategory !== 'all' || showAccessibleOnly || showKidFriendlyOnly) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedCategory('all');
                  setShowAccessibleOnly(false);
                  setShowKidFriendlyOnly(false);
                }}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                필터 초기화
              </Button>
            )}
          </div>

          {/* Category Filters */}
          <div className="mb-3">
            <p className="text-xs text-gray-500 mb-2">카테고리</p>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Button
                  key={cat.value}
                  variant={selectedCategory === cat.value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(cat.value)}
                  className={
                    selectedCategory === cat.value
                      ? 'gap-1'
                      : ''
                  }
                >
                  {selectedCategory === cat.value && <Check className="h-3 w-3" />}
                  {cat.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Additional Filters */}
          <div>
            <p className="text-xs text-gray-500 mb-2">접근성</p>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={showAccessibleOnly ? 'secondary' : 'outline'}
                size="sm"
                onClick={() => setShowAccessibleOnly(!showAccessibleOnly)}
                className={showAccessibleOnly ? 'gap-1' : ''}
              >
                {showAccessibleOnly && <Check className="h-3 w-3" />}
                저상버스 접근 가능
              </Button>
              <Button
                variant={showKidFriendlyOnly ? 'secondary' : 'outline'}
                size="sm"
                onClick={() => setShowKidFriendlyOnly(!showKidFriendlyOnly)}
                className={showKidFriendlyOnly ? 'gap-1' : ''}
              >
                {showKidFriendlyOnly && <Check className="h-3 w-3" />}
                <Baby className="h-4 w-4 mr-1" />
                아이와 함께
              </Button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-gray-600">
            총 <span className="font-semibold text-[--primary]">{filteredFacilities.length}</span>개의
            시설이 있습니다
          </p>
        </div>

        {/* Facilities Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFacilities.map((facility) => (
            <SwipeableFacilityCard
              key={facility.id}
              facility={facility}
              isFavorite={isFavorite(facility.id)}
              onToggleFavorite={() => toggleFavorite(facility.id)}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredFacilities.length === 0 && (
          <EmptyState
            icon={searchQuery ? 'search' : 'location'}
            title="조건에 맞는 시설이 없습니다"
            description={
              searchQuery
                ? `'${searchQuery}' 검색 결과가 없습니다. 다른 검색어를 시도해보세요.`
                : '선택한 필터 조건과 일치하는 시설을 찾을 수 없습니다.'
            }
            action={{
              label: '필터 초기화',
              onClick: () => {
                setSelectedCategory('all');
                setShowAccessibleOnly(false);
                setShowKidFriendlyOnly(false);
              },
            }}
          />
        )}
      </div>
    </div>
  );
}
