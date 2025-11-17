# HU-Link: 화성 통합 MaaS 플랫폼

> **화성도시공사 ESG경영·경영혁신 시민 아이디어 공모전 출품작**

100만 화성특례시 동서 균형발전과 시민 이동권 보장을 위한 HU 자산 통합 MaaS 플랫폼

[![GitHub](https://img.shields.io/badge/GitHub-yonghwan1106%2Fhu--link-blue)](https://github.com/yonghwan1106/hu-link)
[![Vercel](https://img.shields.io/badge/Vercel-배포_예정-black)](https://hu-link.vercel.app)
[![Version](https://img.shields.io/badge/version-1.0.0-green)](https://github.com/yonghwan1106/hu-link)

## 프로젝트 소개

HU-Link는 화성도시공사(HU)의 공공시설 통합 예약 시스템과 H버스 및 대중교통을 연계한 통합 이동 서비스(MaaS)를 하나의 플랫폼으로 구현한 웹 애플리케이션입니다.

### 주요 기능

- **통합 예약**: 모든 HU 공공시설을 한 곳에서 검색하고 예약
- **AI 경로 추천**: 시설 예약 시 최적의 대중교통 경로를 자동으로 제시
- **실시간 버스 정보**: H버스의 실시간 위치와 도착 예정 시간 확인
- **원패스 결제**: 시설 이용료 + 교통비를 한 번에 결제
- **아이와 함께**: 저상버스와 아동 친화 시설 특화 서비스
- **포인트 적립**: 대중교통 이용 시 포인트 적립 및 할인 혜택
- **환경 기여도**: CO2 절감량 실시간 확인

### 구현된 페이지

1. **메인 홈**: 대시보드, 인기 시설, 실시간 버스 현황, 다가오는 예약
2. **시설 찾기**: 카테고리별 필터링, 접근성 필터, 상세 검색
3. **시설 상세**: 시설 정보, AI 경로 추천, 예약 기능
4. **교통 정보**: H버스 실시간 위치, 노선 정보, DRT 서비스
5. **아이와 함께**: 아동 친화 시설, 저상버스 노선, 이용 팁
6. **마이페이지**: 예약 내역, 포인트 관리, 이용 통계

## 기술 스택

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: Custom components with shadcn/ui patterns
- **State Management**: Zustand
- **Icons**: Lucide React
- **Maps**: React-Leaflet (준비 완료)

## 시작하기

### 필수 요구사항

- Node.js 20 이상
- npm 또는 yarn

### 설치 및 실행

1. 의존성 설치:
```bash
npm install
```

2. 개발 서버 실행:
```bash
npm run dev
```

3. 브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

### 프로덕션 빌드

```bash
npm run build
npm run start
```

## 프로젝트 구조

```
hu-link/
├── app/                      # Next.js App Router 페이지
│   ├── facilities/          # 시설 목록 및 상세
│   ├── transport/           # 교통 정보
│   ├── my/                  # 마이페이지
│   └── with-kids/           # 아이와 함께 페이지
├── components/              # React 컴포넌트
│   ├── ui/                 # 재사용 가능한 UI 컴포넌트
│   └── layout/             # 레이아웃 컴포넌트
├── lib/                     # 유틸리티 및 데이터
│   ├── data/               # 목업 데이터
│   └── utils.ts            # 헬퍼 함수
└── stores/                  # Zustand 상태 관리
```

## 목업 데이터

프로토타입에는 다음 목업 데이터가 포함되어 있습니다:

- 10개의 공공시설 (체육, 문화, 복지, 캠핑, 청소년)
- 8개의 H버스 노선
- 실시간 버스 위치 시뮬레이션
- 사용자 예약 내역
- AI 경로 추천 알고리즘

## 주요 특징

### 1. 시각적 디자인
- 화성도시공사 브랜드 컬러 (청록색 계열)
- 반응형 디자인 (모바일, 태블릿, 데스크톱)
- 직관적인 UI/UX
- 실시간 데이터 시각화

### 2. 접근성
- 저상버스 정보 표시
- 아이와 함께 특화 페이지
- 휠체어/유모차 접근 가능 시설 필터

### 3. ESG 기여
- CO2 절감량 실시간 계산
- 대중교통 이용 장려
- 포인트 적립 시스템

## 📋 출품 정보

### 공모전 정보
- **공모전명**: 화성도시공사 ESG경영·경영혁신 시민 아이디어 공모전
- **출품 부문**: 경영혁신 아이디어
- **제출일**: 2025-11-17
- **개발 기간**: 약 4.5시간 (집중 개발)

### 프로젝트 정보
- **버전**: 1.0.0
- **GitHub**: https://github.com/yonghwan1106/hu-link
- **배포 URL**: https://hu-link.vercel.app (배포 후 업데이트 예정)
- **문서**: 프로젝트 내 SUMMARY.md, FEATURES.md, DEPLOYMENT.md 참고

## 📄 라이선스

이 프로젝트는 교육 및 공모전 출품 목적으로 제작되었습니다.
