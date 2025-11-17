export interface Review {
  id: string;
  facilityId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
  images?: string[];
}

export const reviews: Review[] = [
  {
    id: 'review-001',
    facilityId: 'facility-001',
    userId: 'user-001',
    userName: '김민수',
    rating: 5,
    comment: '시설이 정말 깨끗하고 넓어요. 아이들과 함께 이용하기 좋았습니다. 직원분들도 친절하셨어요!',
    date: '2025-01-10',
    helpful: 24,
  },
  {
    id: 'review-002',
    facilityId: 'facility-001',
    userId: 'user-002',
    userName: '이지은',
    rating: 4,
    comment: '전반적으로 좋았습니다. 다만 주차장이 조금 좁아서 주말에는 주차하기 어려울 것 같아요.',
    date: '2025-01-08',
    helpful: 15,
  },
  {
    id: 'review-003',
    facilityId: 'facility-001',
    userId: 'user-003',
    userName: '박철수',
    rating: 5,
    comment: 'H버스로 접근이 편리해서 좋았습니다. 시설도 현대적이고 깨끗해요. 강력 추천!',
    date: '2025-01-05',
    helpful: 31,
  },
  {
    id: 'review-004',
    facilityId: 'facility-002',
    userId: 'user-004',
    userName: '최유진',
    rating: 5,
    comment: '동탄에서 가장 좋은 체육센터인 것 같아요. 수영장이 특히 깨끗하고 관리가 잘 되어 있습니다.',
    date: '2025-01-12',
    helpful: 42,
  },
  {
    id: 'review-005',
    facilityId: 'facility-002',
    userId: 'user-005',
    userName: '정민호',
    rating: 4,
    comment: '시설은 좋은데 사람이 많아서 러닝머신 대기 시간이 길어요. 그래도 만족합니다!',
    date: '2025-01-09',
    helpful: 18,
  },
  {
    id: 'review-006',
    facilityId: 'facility-003',
    userId: 'user-006',
    userName: '강서연',
    rating: 4,
    comment: '산책하기 정말 좋은 공원입니다. 아이들 놀이터도 안전하고 깨끗해요.',
    date: '2025-01-11',
    helpful: 27,
  },
  {
    id: 'review-007',
    facilityId: 'facility-004',
    userId: 'user-007',
    userName: '윤태영',
    rating: 5,
    comment: '가족과 함께 캠핑하기 딱 좋았어요. 시설도 깨끗하고 관리가 잘 되어 있습니다. 재방문 의사 100%!',
    date: '2025-01-06',
    helpful: 35,
  },
  {
    id: 'review-008',
    facilityId: 'facility-005',
    userId: 'user-008',
    userName: '임수빈',
    rating: 5,
    comment: '장애아동을 위한 프로그램이 정말 잘 되어 있어요. 선생님들도 전문적이시고 친절합니다.',
    date: '2025-01-13',
    helpful: 51,
  },
];

export function getReviewsByFacilityId(facilityId: string): Review[] {
  return reviews.filter((review) => review.facilityId === facilityId);
}

export function getAverageRating(facilityId: string): number {
  const facilityReviews = getReviewsByFacilityId(facilityId);
  if (facilityReviews.length === 0) return 0;
  const sum = facilityReviews.reduce((acc, review) => acc + review.rating, 0);
  return Number((sum / facilityReviews.length).toFixed(1));
}
