export interface Booking {
  id: string;
  facilityId: string;
  userId: string;
  date: string;
  startTime: string;
  endTime: string;
  participants: number;
  totalPrice: number;
  transportCost: number;
  discount: number;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  createdAt: string;
  paymentMethod: 'card' | 'points' | 'mixed';
  routeInfo?: {
    routeId: string;
    departureStop: string;
    arrivalStop: string;
    estimatedTime: number;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  points: number;
  totalBookings: number;
  preferredCategories: string[];
}

export const mockUser: User = {
  id: 'user-001',
  name: '김화성',
  email: 'hwaseong@example.com',
  phone: '010-1234-5678',
  points: 15800,
  totalBookings: 23,
  preferredCategories: ['sports', 'youth']
};

export const bookings: Booking[] = [
  {
    id: 'booking-001',
    facilityId: 'facility-002',
    userId: 'user-001',
    date: '2025-11-25',
    startTime: '14:00',
    endTime: '16:00',
    participants: 2,
    totalPrice: 10000,
    transportCost: 3000,
    discount: 1000,
    status: 'confirmed',
    createdAt: '2025-11-17T10:30:00',
    paymentMethod: 'card',
    routeInfo: {
      routeId: 'route-h001',
      departureStop: '동탄역',
      arrivalStop: '동탄중앙어울림센터',
      estimatedTime: 15
    }
  },
  {
    id: 'booking-002',
    facilityId: 'facility-001',
    userId: 'user-001',
    date: '2025-11-20',
    startTime: '10:00',
    endTime: '12:00',
    participants: 4,
    totalPrice: 12000,
    transportCost: 6000,
    discount: 1500,
    status: 'completed',
    createdAt: '2025-11-15T14:20:00',
    paymentMethod: 'mixed',
    routeInfo: {
      routeId: 'route-h001',
      departureStop: '동탄역',
      arrivalStop: '화성종합경기타운',
      estimatedTime: 45
    }
  },
  {
    id: 'booking-003',
    facilityId: 'facility-006',
    userId: 'user-001',
    date: '2025-11-18',
    startTime: '16:00',
    endTime: '18:00',
    participants: 1,
    totalPrice: 2000,
    transportCost: 1500,
    discount: 0,
    status: 'completed',
    createdAt: '2025-11-16T09:15:00',
    paymentMethod: 'points',
    routeInfo: {
      routeId: 'route-h004',
      departureStop: '동탄역',
      arrivalStop: '동탄 청소년 문화의 집',
      estimatedTime: 12
    }
  },
  {
    id: 'booking-004',
    facilityId: 'facility-004',
    userId: 'user-001',
    date: '2025-12-05',
    startTime: '14:00',
    endTime: '11:00',
    participants: 4,
    totalPrice: 37000,
    transportCost: 3000,
    discount: 2000,
    status: 'pending',
    createdAt: '2025-11-17T11:00:00',
    paymentMethod: 'card',
    routeInfo: {
      routeId: 'route-h002',
      departureStop: '동탄역',
      arrivalStop: '향남오토캠핑장',
      estimatedTime: 50
    }
  }
];

export interface TimeSlot {
  time: string;
  available: boolean;
  price: number;
}

export function getAvailableTimeSlots(facilityId: string, date: string): TimeSlot[] {
  // 시뮬레이션: 9시부터 21시까지 2시간 단위 슬롯
  const slots: TimeSlot[] = [];
  const hours = ['09:00', '11:00', '13:00', '15:00', '17:00', '19:00'];

  hours.forEach((time, index) => {
    // 랜덤하게 일부 슬롯을 예약됨으로 표시
    const isBooked = Math.random() > 0.7;
    slots.push({
      time,
      available: !isBooked,
      price: 5000 + (index * 500)
    });
  });

  return slots;
}

export function getUserBookings(userId: string): Booking[] {
  return bookings.filter(b => b.userId === userId);
}

export function getUpcomingBookings(userId: string): Booking[] {
  const now = new Date();
  return bookings.filter(b => {
    const bookingDate = new Date(b.date);
    return b.userId === userId && bookingDate > now && b.status !== 'cancelled';
  });
}

export function getPastBookings(userId: string): Booking[] {
  const now = new Date();
  return bookings.filter(b => {
    const bookingDate = new Date(b.date);
    return b.userId === userId && (bookingDate <= now || b.status === 'completed');
  });
}
