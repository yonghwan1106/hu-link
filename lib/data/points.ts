export interface PointTransaction {
  id: string;
  type: 'earn' | 'spend';
  amount: number;
  description: string;
  category: 'bus' | 'booking' | 'review' | 'referral' | 'discount';
  timestamp: Date;
  balance: number;
}

export const mockPointTransactions: PointTransaction[] = [
  {
    id: 'pt-1',
    type: 'earn',
    amount: 500,
    description: 'H버스 이용 (H-301)',
    category: 'bus',
    timestamp: new Date('2025-01-17T09:30:00'),
    balance: 15800,
  },
  {
    id: 'pt-2',
    type: 'spend',
    amount: 2000,
    description: '화성종합경기타운 예약 할인',
    category: 'discount',
    timestamp: new Date('2025-01-16T14:20:00'),
    balance: 15300,
  },
  {
    id: 'pt-3',
    type: 'earn',
    amount: 300,
    description: '시설 리뷰 작성',
    category: 'review',
    timestamp: new Date('2025-01-15T18:45:00'),
    balance: 17300,
  },
  {
    id: 'pt-4',
    type: 'earn',
    amount: 500,
    description: 'H버스 이용 (H-501)',
    category: 'bus',
    timestamp: new Date('2025-01-15T08:15:00'),
    balance: 17000,
  },
  {
    id: 'pt-5',
    type: 'earn',
    amount: 1000,
    description: '친구 초대 보너스',
    category: 'referral',
    timestamp: new Date('2025-01-14T12:00:00'),
    balance: 16500,
  },
  {
    id: 'pt-6',
    type: 'spend',
    amount: 3000,
    description: '화성시립도서관 예약 할인',
    category: 'discount',
    timestamp: new Date('2025-01-13T16:30:00'),
    balance: 15500,
  },
  {
    id: 'pt-7',
    type: 'earn',
    amount: 500,
    description: 'H버스 이용 (H-201)',
    category: 'bus',
    timestamp: new Date('2025-01-12T10:20:00'),
    balance: 18500,
  },
  {
    id: 'pt-8',
    type: 'earn',
    amount: 2000,
    description: '시설 첫 예약 보너스',
    category: 'booking',
    timestamp: new Date('2025-01-10T11:00:00'),
    balance: 18000,
  },
  {
    id: 'pt-9',
    type: 'earn',
    amount: 500,
    description: 'H버스 이용 (H-301)',
    category: 'bus',
    timestamp: new Date('2025-01-09T09:00:00'),
    balance: 16000,
  },
  {
    id: 'pt-10',
    type: 'earn',
    amount: 300,
    description: '시설 리뷰 작성',
    category: 'review',
    timestamp: new Date('2025-01-08T20:15:00'),
    balance: 15500,
  },
];

export function formatPointAmount(amount: number, type: 'earn' | 'spend'): string {
  const sign = type === 'earn' ? '+' : '-';
  return `${sign}${amount.toLocaleString()}P`;
}

export function formatPointDate(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) {
    return '오늘';
  } else if (days === 1) {
    return '어제';
  } else if (days < 7) {
    return `${days}일 전`;
  } else {
    return date.toLocaleDateString('ko-KR', {
      month: 'long',
      day: 'numeric',
    });
  }
}

export function getCategoryLabel(category: PointTransaction['category']): string {
  switch (category) {
    case 'bus':
      return '버스 이용';
    case 'booking':
      return '시설 예약';
    case 'review':
      return '리뷰 작성';
    case 'referral':
      return '친구 초대';
    case 'discount':
      return '할인 사용';
  }
}
