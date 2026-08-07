# cafeON 사장님 관리 시스템 (Next.js + Tailwind)

디자인 시안(이미지 6장)을 기반으로 만든 cafeON 카페 사장님 관리 대시보드입니다.
Next.js 14 App Router + TypeScript + Tailwind CSS로 작성되었으며, 모든 데이터는
`lib/mock-data.ts`의 목업 데이터를 사용합니다 (실제 API 연동 전 단계).

## 포함된 화면 (사이드바 순서대로)

- `/` 대시보드
- `/menu` 메뉴·재고 관리
- `/orders` 주문(POS) 관리
- `/reservations` 예약 관리
- `/seats` 실시간 좌석 현황
- `/sales` 매출·리포트
- `/news` 매장 소식
- `/membership` 멤버십 (포인트·쿠폰)
- `/customers` 고객 및 리뷰 관리
- `/blog` 블로그 (CMS)
- `/seo` SEO 노출 관리
- `/ai-photo` AI 메뉴 사진 보정
- `/notifications` 알림 센터
- `/pricing` 요금제 관리
- `/ai-settings` AI 기능 관리

## 실행 방법

```bash
npm install
npm run dev
```

http://localhost:3000 에서 확인할 수 있습니다.

## 기존 프로젝트(D:\Nextjs\my-app)에 합치는 방법

이미 `components` 폴더에 Badge / Button / Card / Input / Select / Textarea / Modal /
Toast / StatCard / CongestionBar / StoreTabs / BottomTabBar / ReviewInput 파일들을
만들어두신 것을 확인했습니다. 이 프로젝트에서 같은 이름으로 새로 만들었으니,

1. 기존 `components` 폴더의 내용을 이 zip의 `components` 폴더 내용으로 교체(또는 비교 후 병합)하세요.
2. 새로 추가된 `Sidebar.tsx`, `PageHeader.tsx`, `icons.tsx`, `LineChart.tsx` 파일을 `components`에 추가하세요.
3. `app` 폴더의 각 페이지(`page.tsx`)들을 기존 `app` 폴더의 같은 경로에 복사하세요.
4. `lib/mock-data.ts`를 `lib` 폴더에 추가하세요.
5. `tailwind.config.js`의 `theme.extend` (brand / ink 색상, shadow, radius) 를 기존
   설정에 병합하세요. 기존 tailwind.config.js를 이미 갖고 계시다면 `colors.brand`,
   `colors.ink`, `boxShadow.card` 부분만 추가하시면 됩니다.
6. `app/globals.css`, `app/layout.tsx` 내용도 기존 파일에 반영해주세요.

## 컴포넌트 사용 방법 요약

- `Icon`: `<Icon name="dashboard" />` 형태로 사용하는 커스텀 SVG 아이콘 (외부 아이콘
  라이브러리 의존성 없음).
- `LineChart`: recharts 등 외부 차트 라이브러리 없이 순수 SVG로 그린 매출 추이 차트.
- 그 외 `Badge` / `Button` / `Card` / `Input` / `Select` / `Textarea` / `Modal` /
  `Toast`(`useToast()`) / `StatCard` / `CongestionBar` / `StoreTabs` / `BottomTabBar` /
  `ReviewInput`은 디자인 시안의 반복되는 UI 패턴을 재사용 컴포넌트로 뽑아둔 것입니다.

## 참고

- 모든 데이터는 목업이며, 버튼 클릭 시 실제 서버 요청은 이루어지지 않습니다
  (탭 전환, 좌석/메뉴 선택, 알림 on/off 등 화면 내 상호작용은 동작합니다).
- 아이콘은 lucide-react 등 외부 패키지 설치 없이 자체 SVG로 구현했습니다.
- 실제 로그인/매장 전환, 결제, 파일 업로드 등은 백엔드 연동이 필요합니다.
