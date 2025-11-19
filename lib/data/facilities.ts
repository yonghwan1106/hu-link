export type FacilityCategory = 'sports' | 'culture' | 'welfare' | 'camping' | 'youth';

export interface Facility {
  id: string;
  name: string;
  category: FacilityCategory;
  description: string;
  address: string;
  coordinates: { lat: number; lng: number };
  images: string[];
  thumbnailUrl?: string; // 대표 이미지 URL (옵션)
  price: number;
  priceUnit: string;
  capacity: number;
  amenities: string[];
  isAccessible: boolean; // 저상버스 접근 가능
  isKidFriendly: boolean;
  hasParking: boolean;
  operatingHours: string;
  reservationAvailable: boolean;
  rating: number;
  reviewCount: number;
}

export const facilities: Facility[] = [
  {
    id: 'facility-001',
    name: '화성종합경기타운',
    category: 'sports',
    description: '화성시 대표 종합 체육시설로 축구장, 야구장, 수영장 등 다양한 스포츠 시설을 갖추고 있습니다.',
    address: '경기도 화성시 향남읍 행정서로 96',
    coordinates: { lat: 37.0892, lng: 126.8142 },
    images: ['/images/facilities/sports-complex-1.jpg'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&q=80',
    price: 5000,
    priceUnit: '시간당',
    capacity: 100,
    amenities: ['주차장', '샤워실', '락커룸', '매점'],
    isAccessible: true,
    isKidFriendly: true,
    hasParking: true,
    operatingHours: '06:00 - 22:00',
    reservationAvailable: true,
    rating: 4.5,
    reviewCount: 328
  },
  {
    id: 'facility-002',
    name: '동탄중앙어울림체육센터',
    category: 'sports',
    description: '동탄신도시 중심의 현대적 체육센터로 피트니스, 수영장, 실내체육관 시설을 보유하고 있습니다.',
    address: '경기도 화성시 동탄순환대로 20길 155',
    coordinates: { lat: 37.2010, lng: 127.0745 },
    images: ['/images/facilities/dongtan-sports-1.jpg'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
    price: 4000,
    priceUnit: '시간당',
    capacity: 80,
    amenities: ['주차장', '샤워실', '락커룸', '카페', '탈의실'],
    isAccessible: true,
    isKidFriendly: true,
    hasParking: true,
    operatingHours: '06:00 - 23:00',
    reservationAvailable: true,
    rating: 4.7,
    reviewCount: 542
  },
  {
    id: 'facility-003',
    name: '다람산공원',
    category: 'culture',
    description: '자연 친화적 공원으로 산책로, 운동기구, 어린이 놀이터가 조성되어 있습니다.',
    address: '경기도 화성시 병점동 산91-1',
    coordinates: { lat: 37.1823, lng: 127.0389 },
    images: ['/images/facilities/daram-park-1.jpg'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?w=800&q=80',
    price: 0,
    priceUnit: '무료',
    capacity: 500,
    amenities: ['주차장', '화장실', '놀이터', '운동시설'],
    isAccessible: true,
    isKidFriendly: true,
    hasParking: true,
    operatingHours: '24시간',
    reservationAvailable: false,
    rating: 4.3,
    reviewCount: 215
  },
  {
    id: 'facility-004',
    name: '향남오토캠핑장',
    category: 'camping',
    description: '가족 단위 캠핑을 즐길 수 있는 쾌적한 야외 캠핑장입니다.',
    address: '경기도 화성시 향남읍 발안로 123',
    coordinates: { lat: 37.0654, lng: 126.8234 },
    images: ['/images/facilities/camping-1.jpg'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80',
    price: 35000,
    priceUnit: '1박',
    capacity: 50,
    amenities: ['주차장', '화장실', '샤워실', '매점', '전기시설', '개수대'],
    isAccessible: false,
    isKidFriendly: true,
    hasParking: true,
    operatingHours: '체크인 14:00, 체크아웃 11:00',
    reservationAvailable: true,
    rating: 4.6,
    reviewCount: 189
  },
  {
    id: 'facility-005',
    name: '아르딤 복지관',
    category: 'welfare',
    description: '장애아동을 위한 전문 복지시설로 재활치료, 교육 프로그램을 제공합니다.',
    address: '경기도 화성시 동탄대로 590',
    coordinates: { lat: 37.1998, lng: 127.0892 },
    images: ['/images/facilities/ardim-1.jpg'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80',
    price: 0,
    priceUnit: '무료',
    capacity: 30,
    amenities: ['주차장', '엘리베이터', '휠체어 경사로', '장애인 화장실'],
    isAccessible: true,
    isKidFriendly: true,
    hasParking: true,
    operatingHours: '09:00 - 18:00',
    reservationAvailable: true,
    rating: 4.8,
    reviewCount: 92
  },
  {
    id: 'facility-006',
    name: '동탄 청소년 문화의 집',
    category: 'youth',
    description: '청소년들을 위한 문화 공간으로 동아리실, 공연장, 스터디룸을 운영합니다.',
    address: '경기도 화성시 동탄대로21길 83',
    coordinates: { lat: 37.2045, lng: 127.0765 },
    images: ['/images/facilities/youth-center-1.jpg'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&q=80',
    price: 2000,
    priceUnit: '시간당',
    capacity: 60,
    amenities: ['주차장', '카페', '스터디룸', '공연장', 'Wi-Fi'],
    isAccessible: true,
    isKidFriendly: true,
    hasParking: true,
    operatingHours: '09:00 - 21:00',
    reservationAvailable: true,
    rating: 4.4,
    reviewCount: 267
  },
  {
    id: 'facility-007',
    name: '화성 드림파크 (유소년 야구장)',
    category: 'sports',
    description: '유소년 야구단을 위한 전문 야구장으로 체계적인 훈련이 가능합니다.',
    address: '경기도 화성시 우정읍 화성로 270',
    coordinates: { lat: 37.2234, lng: 126.8567 },
    images: ['/images/facilities/dream-park-1.jpg'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=800&q=80',
    price: 10000,
    priceUnit: '2시간',
    capacity: 50,
    amenities: ['주차장', '관람석', '락커룸', '매점'],
    isAccessible: true,
    isKidFriendly: true,
    hasParking: true,
    operatingHours: '08:00 - 18:00',
    reservationAvailable: true,
    rating: 4.6,
    reviewCount: 134
  },
  {
    id: 'facility-008',
    name: '병점 문화센터',
    category: 'culture',
    description: '다양한 문화 강좌와 전시회를 개최하는 지역 문화 공간입니다.',
    address: '경기도 화성시 병점중앙로 140',
    coordinates: { lat: 37.1765, lng: 127.0456 },
    images: ['/images/facilities/culture-center-1.jpg'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&q=80',
    price: 3000,
    priceUnit: '강좌당',
    capacity: 40,
    amenities: ['주차장', '카페', '전시실', '강의실'],
    isAccessible: true,
    isKidFriendly: false,
    hasParking: true,
    operatingHours: '10:00 - 20:00',
    reservationAvailable: true,
    rating: 4.2,
    reviewCount: 178
  },
  {
    id: 'facility-009',
    name: '봉담 실내수영장',
    category: 'sports',
    description: '사계절 이용 가능한 실내 수영장으로 수영 강습도 제공합니다.',
    address: '경기도 화성시 봉담읍 상리 154-2',
    coordinates: { lat: 37.2187, lng: 126.9456 },
    images: ['/images/facilities/swimming-pool-1.jpg'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1576610616656-d3aa5d1f4534?w=800&q=80',
    price: 5000,
    priceUnit: '1회',
    capacity: 100,
    amenities: ['주차장', '샤워실', '락커룸', '탈의실', '수영용품 판매'],
    isAccessible: true,
    isKidFriendly: true,
    hasParking: true,
    operatingHours: '06:00 - 21:00',
    reservationAvailable: true,
    rating: 4.5,
    reviewCount: 412
  },
  {
    id: 'facility-010',
    name: '서신 체육공원',
    category: 'sports',
    description: '축구장, 농구장, 배드민턴장 등 다목적 체육시설을 갖춘 공원입니다.',
    address: '경기도 화성시 서신면 전곡리 산12',
    coordinates: { lat: 37.1234, lng: 126.7845 },
    images: ['/images/facilities/sports-park-1.jpg'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&q=80',
    price: 0,
    priceUnit: '무료',
    capacity: 200,
    amenities: ['주차장', '화장실', '음수대', '운동기구'],
    isAccessible: true,
    isKidFriendly: true,
    hasParking: true,
    operatingHours: '05:00 - 22:00',
    reservationAvailable: false,
    rating: 4.1,
    reviewCount: 156
  }
];

export function getFacilityById(id: string): Facility | undefined {
  return facilities.find(f => f.id === id);
}

export function getFacilitiesByCategory(category: FacilityCategory): Facility[] {
  return facilities.filter(f => f.category === category);
}

export function getKidFriendlyFacilities(): Facility[] {
  return facilities.filter(f => f.isKidFriendly);
}

export function getAccessibleFacilities(): Facility[] {
  return facilities.filter(f => f.isAccessible);
}
