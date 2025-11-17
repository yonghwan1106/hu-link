'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ThumbsUp, MessageSquare } from 'lucide-react';
import { getReviewsByFacilityId, type Review } from '@/lib/data/reviews';

interface ReviewSectionProps {
  facilityId: string;
  facilityName: string;
}

export function ReviewSection({ facilityId, facilityName }: ReviewSectionProps) {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [hoveredStar, setHoveredStar] = useState(0);

  const reviews = getReviewsByFacilityId(facilityId);
  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '0.0';

  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => ({
    stars: rating,
    count: reviews.filter((r) => r.rating === rating).length,
    percentage: reviews.length > 0
      ? Math.round((reviews.filter((r) => r.rating === rating).length / reviews.length) * 100)
      : 0,
  }));

  const handleSubmitReview = () => {
    // 실제로는 서버에 리뷰를 저장
    alert(`리뷰가 등록되었습니다!\n평점: ${newRating}점\n내용: ${newComment}`);
    setShowReviewForm(false);
    setNewRating(5);
    setNewComment('');
  };

  return (
    <div className="space-y-6">
      {/* Review Summary */}
      <Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:bg-gradient-to-br dark:from-amber-950/20 dark:to-orange-950/20">
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Average Rating */}
            <div className="text-center">
              <div className="text-6xl font-bold text-[--warning] mb-2">{avgRating}</div>
              <div className="flex items-center justify-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-6 w-6 ${
                      star <= Math.round(Number(avgRating))
                        ? 'fill-[--warning] text-[--warning]'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-600">총 {reviews.length}개의 리뷰</p>
            </div>

            {/* Rating Distribution */}
            <div className="space-y-2">
              {ratingDistribution.map((item) => (
                <div key={item.stars} className="flex items-center gap-3">
                  <div className="flex items-center gap-1 w-16">
                    <span className="text-sm font-semibold">{item.stars}</span>
                    <Star className="h-4 w-4 fill-[--warning] text-[--warning]" />
                  </div>
                  <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[--warning] transition-all"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-12 text-right">{item.count}개</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Write Review Button */}
      {!showReviewForm && (
        <Button
          onClick={() => setShowReviewForm(true)}
          className="w-full gap-2"
          size="lg"
        >
          <MessageSquare className="h-5 w-5" />
          리뷰 작성하기
        </Button>
      )}

      {/* Review Form */}
      {showReviewForm && (
        <Card className="bg-blue-50 dark:bg-blue-950/20 border-2 border-[--primary]">
          <CardHeader>
            <CardTitle>리뷰 작성</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">평점</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setNewRating(star)}
                    onMouseEnter={() => setHoveredStar(star)}
                    onMouseLeave={() => setHoveredStar(0)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={`h-10 w-10 ${
                        star <= (hoveredStar || newRating)
                          ? 'fill-[--warning] text-[--warning]'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">리뷰 내용</label>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder={`${facilityName}에 대한 솔직한 리뷰를 남겨주세요`}
                className="w-full h-32 p-4 border-2 border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[--primary] focus:border-[--primary] text-gray-900 font-medium"
              />
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handleSubmitReview}
                disabled={!newComment.trim()}
                className="flex-1"
              >
                리뷰 등록
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowReviewForm(false);
                  setNewRating(5);
                  setNewComment('');
                }}
                className="flex-1"
              >
                취소
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-900">
          리뷰 ({reviews.length})
        </h3>

        {reviews.length === 0 ? (
          <Card className="bg-gray-50 dark:bg-gray-900/20">
            <CardContent className="p-8 text-center">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500">아직 작성된 리뷰가 없습니다</p>
              <p className="text-sm text-gray-400 mt-1">첫 번째 리뷰를 남겨보세요!</p>
            </CardContent>
          </Card>
        ) : (
          reviews.map((review) => (
            <Card key={review.id} className="hover:shadow-md transition-shadow bg-white dark:bg-gray-900">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="font-semibold text-lg mb-1">{review.userName}</div>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${
                              star <= review.rating
                                ? 'fill-[--warning] text-[--warning]'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 mb-4 leading-relaxed">{review.comment}</p>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="gap-1.5">
                    <ThumbsUp className="h-4 w-4" />
                    도움이 돼요 ({review.helpful})
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
