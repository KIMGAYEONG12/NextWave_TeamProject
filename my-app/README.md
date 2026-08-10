# cafeON 사장님 관리 시스템

카페 사장님을 위한 올인원 매장 관리 대시보드 (Next.js 14 App Router + TypeScript + Tailwind CSS)

## 실행 방법

```bash
npm install
npm run dev
```

브라우저에서 http://localhost:3000 접속

## 프로덕션 빌드

```bash
npm run build
npm run start
```

## 포함된 화면 (17개)

- 대시보드 `/`
- 메뉴·재고 관리 `/menu`
- 주문/결제(POS) 관리 `/orders`
- 예약 관리 `/reservations` — 프로 기능 모달 겹침 버그 수정 완료
- 실시간 좌석 현황 `/seats`
- 매장 소식 `/notices`
- 멤버십 (포인트·쿠폰) `/membership`
- 고객 및 리뷰 관리 `/customers` (고객관리 / 리뷰관리 / 신고·차단관리 탭)
- 고객 방문·VIP 관리 `/vip`
- 블로그 (CMS) `/blog`
- 리뷰·커뮤니티 `/community`
- SEO 노출 관리 `/seo`
- AI 메뉴 사진 보정 `/ai-photo` — 실제 캔버스 필터로 밝기/채도/대비 보정 동작
- AI 기능 관리 `/ai-features`
- 알림 센터 `/notifications`
- 요금제 관리 `/billing` — 재정비된 레이아웃

## 구조

- `app/` — 각 화면의 라우트 (App Router)
- `components/` — Sidebar, Topbar, 공통 UI(StatCard, StatusBadge 등)
- `lib/data.ts` — 화면에서 사용하는 목업 데이터 (백엔드 연동 시 이 부분을 API 호출로 교체)
- `lib/nav.ts` — 좌측 사이드바 메뉴 구성

## 참고

- 모든 인터랙션(탭 전환, 토글, 좌석/예약 상태 변경, 리뷰 신고 처리, AI 사진 보정 등)은 실제로 동작합니다.
- 데이터는 메모리 내 목업이며 새로고침 시 초기화됩니다. 실 서비스 연동 시 `lib/data.ts`를 API 호출로 교체하세요.
