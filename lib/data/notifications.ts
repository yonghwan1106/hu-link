export interface Notification {
  id: string;
  type: 'booking' | 'transport' | 'point' | 'system';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  link?: string;
}

export const mockNotifications: Notification[] = [
  {
    id: 'notif-1',
    type: 'booking',
    title: '예약 확정',
    message: '화성종합경기타운 예약이 확정되었습니다.',
    timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    read: false,
    link: '/my',
  },
  {
    id: 'notif-2',
    type: 'transport',
    title: 'H버스 도착 알림',
    message: 'H-301번 버스가 5분 후 도착 예정입니다.',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    read: false,
    link: '/transport',
  },
  {
    id: 'notif-3',
    type: 'point',
    title: '포인트 적립 완료',
    message: 'H버스 이용으로 500포인트가 적립되었습니다.',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    read: true,
    link: '/my',
  },
  {
    id: 'notif-4',
    type: 'system',
    title: '시스템 공지',
    message: '2025년 1월 20일 오전 2시~4시 시스템 점검이 예정되어 있습니다.',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    read: true,
  },
  {
    id: 'notif-5',
    type: 'booking',
    title: '예약 취소 안내',
    message: '화성시립도서관 예약이 취소되었습니다.',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    read: true,
    link: '/my',
  },
];

export function getUnreadCount(): number {
  return mockNotifications.filter((n) => !n.read).length;
}

export function formatNotificationTime(timestamp: Date): string {
  const now = new Date();
  const diff = now.getTime() - timestamp.getTime();
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (minutes < 60) {
    return `${minutes}분 전`;
  } else if (hours < 24) {
    return `${hours}시간 전`;
  } else {
    return `${days}일 전`;
  }
}
