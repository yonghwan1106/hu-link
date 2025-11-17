# Contributing to HU-Link

HU-Link 프로젝트에 기여해주셔서 감사합니다!

## 개발 환경 설정

### 필요 조건
- Node.js 18.x 이상
- npm 또는 yarn

### 설치
```bash
# 저장소 클론
git clone <repository-url>
cd hu-link

# 의존성 설치
npm install

# 환경 변수 설정
cp .env.example .env.local

# 개발 서버 실행
npm run dev
```

## 코드 스타일

### TypeScript
- 명시적인 타입 선언 사용
- any 타입 사용 지양
- 인터페이스 우선 사용

### 컴포넌트
- 함수형 컴포넌트 사용
- Props는 인터페이스로 정의
- 'use client' 지시어를 명시적으로 표시

### 스타일링
- Tailwind CSS 사용
- 커스텀 CSS는 최소화
- 반응형 디자인 우선

### 파일 구조
```
app/              # Next.js 15 App Router
components/       # 재사용 가능한 컴포넌트
lib/              # 유틸리티 및 훅
public/           # 정적 파일
```

## 커밋 메시지

### 형식
```
<type>: <subject>

<body>
```

### 타입
- feat: 새로운 기능
- fix: 버그 수정
- docs: 문서 변경
- style: 코드 포맷팅
- refactor: 리팩토링
- test: 테스트 추가/수정
- chore: 빌드 프로세스 또는 도구 변경

### 예시
```
feat: 시설 예약 기능 추가

- 예약 모달 컴포넌트 구현
- 날짜 및 시간 선택 UI
- 인원 선택 기능
```

## Pull Request

### 체크리스트
- [ ] 코드가 정상적으로 빌드됨
- [ ] 모든 테스트 통과
- [ ] ESLint 경고 없음
- [ ] 반응형 디자인 확인
- [ ] 접근성 테스트 완료
- [ ] 브라우저 호환성 확인

### 리뷰 프로세스
1. PR 생성
2. 코드 리뷰
3. 피드백 반영
4. 승인 및 병합

## 테스트

```bash
# 단위 테스트
npm run test

# E2E 테스트
npm run test:e2e

# 테스트 커버리지
npm run test:coverage
```

## 문의

질문이나 제안사항이 있으시면 이슈를 생성해주세요.
