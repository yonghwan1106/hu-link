# HU-Link 배포 가이드

## Vercel 배포 (권장)

### 1. Vercel 계정 준비
1. [Vercel](https://vercel.com) 계정 생성
2. GitHub 저장소 연결

### 2. 프로젝트 설정
```bash
# Vercel CLI 설치
npm i -g vercel

# 로그인
vercel login

# 프로젝트 배포
vercel
```

### 3. 환경 변수 설정
Vercel 대시보드에서 다음 환경 변수 설정:
- `NEXT_PUBLIC_APP_URL`: 프로덕션 URL
- 기타 필요한 API 키

### 4. 도메인 설정
- Vercel에서 제공하는 도메인 사용
- 또는 커스텀 도메인 연결

## 빌드 최적화

### 프로덕션 빌드
```bash
npm run build
```

### 빌드 분석
```bash
# 번들 크기 분석
npm run analyze
```

### 성능 최적화 체크리스트
- [ ] 이미지 최적화 (Next.js Image)
- [ ] 코드 스플리팅 (Dynamic imports)
- [ ] CSS 최소화
- [ ] JavaScript 압축
- [ ] 폰트 최적화
- [ ] 캐싱 전략 설정

## PWA 설정

### manifest.json
- 192x192, 512x512 아이콘 준비
- 스크린샷 이미지 준비
- 테마 색상 설정

### Service Worker
- 오프라인 페이지 구현
- 캐싱 전략 확인
- 백그라운드 동기화 (선택)

## 모니터링

### 추천 도구
- **Vercel Analytics**: 성능 모니터링
- **Sentry**: 에러 추적
- **Google Analytics**: 사용자 분석
- **Lighthouse**: 성능 점수

### 성능 메트릭
- LCP (Largest Contentful Paint) < 2.5s
- FID (First Input Delay) < 100ms
- CLS (Cumulative Layout Shift) < 0.1
- FCP (First Contentful Paint) < 1.8s
- TTI (Time to Interactive) < 3.8s

## 보안

### 체크리스트
- [ ] HTTPS 사용
- [ ] 환경 변수 보호
- [ ] CSP (Content Security Policy) 설정
- [ ] CORS 설정
- [ ] Rate limiting
- [ ] 입력 검증

## 백업 및 복구

### 데이터베이스 백업
```bash
# 백업 (Supabase 사용 시)
npx supabase db dump -f backup.sql
```

### 복구 절차
1. Vercel 이전 배포로 롤백
2. 데이터베이스 복원
3. 환경 변수 확인

## CI/CD

### GitHub Actions 예시
```yaml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm ci
      - run: npm run build
      - run: npm test
```

## 트러블슈팅

### 빌드 실패
- Node.js 버전 확인
- 의존성 재설치
- 캐시 클리어

### 성능 저하
- 번들 크기 확인
- 이미지 최적화
- 코드 스플리팅 개선

### 배포 후 오류
- Vercel 로그 확인
- Sentry 에러 로그
- 브라우저 콘솔 확인
