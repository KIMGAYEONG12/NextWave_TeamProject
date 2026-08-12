// 카페ON 사장님 관리 시스템 - 목업 데이터
// 실제 서비스에서는 API(Laravel 백엔드) 연동으로 교체됩니다.

export const store = {
  name: "OOO 커피 강남점",
  ownerLabel: "사장님",
  today: "2026.08.07 (금) 13:00",
};

export const salesTrend = [
  { day: "8/1 (토)", value: 38000 },
  { day: "8/2 (일)", value: 45000 },
  { day: "8/3 (월)", value: 32000 },
  { day: "8/4 (화)", value: 56000 },
  { day: "8/5 (수)", value: 72000 },
  { day: "8/6 (목)", value: 58000 },
  { day: "8/7 (금)", value: 66000 },
];

export const popularMenu = [
  { rank: 1, name: "싱글오리진 드립", qty: 84, unit: "잔" },
  { rank: 2, name: "카페라떼", qty: 67, unit: "잔" },
  { rank: 3, name: "크루아상", qty: 41, unit: "개" },
  { rank: 4, name: "바닐라 라떼", qty: 38, unit: "잔" },
  { rank: 5, name: "아메리카노", qty: 36, unit: "잔" },
];

export const todayReservations = [
  { time: "10:30", name: "김민수", people: 2, status: "승인 대기" },
  { time: "11:00", name: "이지은", people: 4, status: "승인" },
  { time: "12:30", name: "박성호", people: 3, status: "승인" },
  { time: "14:00", name: "최유리", people: 2, status: "승인 대기" },
  { time: "15:30", name: "정하늘", people: 5, status: "승인" },
];

export const recentReviews = [
  { name: "김현지", rating: 5.0, text: "커피도 맛있고 분위기도 너무 좋아요!", time: "2시간 전" },
  { name: "이서연", rating: 4.5, text: "디저트가 정말 맛있어요. 다음엔 또 올게요.", time: "5시간 전" },
  { name: "박수연", rating: 5.0, text: "친절하고 인테리어가 예뻐요 ☕", time: "1일 전" },
];

export const alerts = [
  { title: "딸기(냉동) 재고 부족", desc: "현재 3kg 남음 (발주 필요)", time: "5분 전", level: "danger" as const },
  { title: "새 소식 등록 후 10일 경과", desc: "고객 관심 유지를 위해 새 소식을 올려보세요.", time: "1일 전", level: "warning" as const },
  { title: "발주가 필요한 상품", desc: "에티오피아 예가체프 원두 1종", time: "2일 전", level: "warning" as const },
];

// 메뉴 · 재고 관리 -----------------------------------------------------
export type MenuItem = {
  id: string;
  name: string;
  category: "커피" | "논커피" | "티" | "디저트" | "베이커리" | "시즌 메뉴";
  price: number;
  desc: string;
  stockStatus: "정상" | "부족" | "품절";
  stockQty: string;
  weeklySold: number;
  image: string;
  visible: boolean;
};

export const menuItems: MenuItem[] = [
  { id: "m1", name: "아메리카노", category: "커피", price: 4000, desc: "고소한 원두의 깊은 풍미를 느낄 수 있는 아메리카노입니다.", stockStatus: "정상", stockQty: "무제한", weeklySold: 112, image: "☕", visible: true },
  { id: "m2", name: "카페라떼", category: "커피", price: 4500, desc: "부드러운 우유 거품과 에스프레소의 조화.", stockStatus: "정상", stockQty: "128잔", weeklySold: 128, image: "☕", visible: true },
  { id: "m3", name: "바닐라 라떼", category: "커피", price: 5000, desc: "달콤한 바닐라 시럽이 더해진 라떼.", stockStatus: "부족", stockQty: "12잔", weeklySold: 98, image: "☕", visible: true },
  { id: "m4", name: "콜드브루", category: "커피", price: 4500, desc: "저온 추출로 부드러운 콜드브루.", stockStatus: "정상", stockQty: "무제한", weeklySold: 74, image: "🧊", visible: true },
  { id: "m5", name: "말차 라떼", category: "논커피", price: 5300, desc: "진한 말차의 풍미.", stockStatus: "정상", stockQty: "28잔", weeklySold: 64, image: "🍵", visible: true },
  { id: "m6", name: "딸기 요거트 스무디", category: "논커피", price: 6200, desc: "상큼한 딸기와 요거트.", stockStatus: "부족", stockQty: "8잔", weeklySold: 52, image: "🍓", visible: true },
  { id: "m7", name: "크루아상", category: "베이커리", price: 4000, desc: "겉바속촉 버터 크루아상.", stockStatus: "품절", stockQty: "0개", weeklySold: 41, image: "🥐", visible: true },
  { id: "m8", name: "티라미수", category: "디저트", price: 6500, desc: "부드러운 마스카포네 티라미수.", stockStatus: "정상", stockQty: "12개", weeklySold: 33, image: "🍰", visible: true },
];

export const menuCategories = ["전체", "커피", "논커피", "티", "디저트", "베이커리", "시즌 메뉴"];

export const stockSummary = { normal: 24, low: 4, out: 1 };
export const recentOrdersToStock = [
  { date: "2026-08-05", item: "딸기(냉동) 3kg" },
  { date: "2026-08-01", item: "우유, 생크림 5종" },
  { date: "2026-07-28", item: "원두 (남미) 3종 2kg" },
];

// 재고 입출고 로그 ----------------------------------------------------------
export type StockLog = { id: string; date: string; item: string; type: "입고" | "출고"; qty: string; reason: string; staff: string };
export const stockLogs: StockLog[] = [
  { id: "sl1", date: "2026.08.07 09:10", item: "우유 20L", type: "입고", qty: "+20L", reason: "정기 발주", staff: "정다은" },
  { id: "sl2", date: "2026.08.07 08:40", item: "바닐라 시럽", type: "출고", qty: "-2병", reason: "판매 소진", staff: "한지호" },
  { id: "sl3", date: "2026.08.06 19:20", item: "딸기(냉동) 3kg", type: "입고", qty: "+3kg", reason: "긴급 발주", staff: "김사장" },
  { id: "sl4", date: "2026.08.06 15:05", item: "크루아상 반죽", type: "출고", qty: "-15개", reason: "품절 처리", staff: "오세영" },
  { id: "sl5", date: "2026.08.05 10:00", item: "원두(남미) 2kg", type: "입고", qty: "+2kg", reason: "정기 발주", staff: "정다은" },
  { id: "sl6", date: "2026.08.04 13:30", item: "생크림 5개", type: "출고", qty: "-5개", reason: "폐기 (유통기한)", staff: "한지호" },
];

// 주문/결제(POS) 관리 ---------------------------------------------------
export type Order = {
  id: string;
  customer: string;
  phone: string;
  items: { name: string; qty: number; price: number }[];
  total: number;
  status: "접수" | "준비중" | "완료" | "취소";
  time: string;
};

export const orders: Order[] = [
  { id: "#000128", customer: "임지수", phone: "010-1234-5678", items: [{ name: "아이스 아메리카노", qty: 1, price: 4000 }, { name: "바닐라 라떼", qty: 1, price: 4500 }], total: 8500, status: "접수", time: "13:42" },
  { id: "#000127", customer: "박서준", phone: "010-2222-3333", items: [{ name: "바닐라 라떼", qty: 1, price: 6000 }], total: 6000, status: "준비중", time: "13:35" },
  { id: "#000126", customer: "김수현", phone: "010-4444-5555", items: [{ name: "크루아상", qty: 1, price: 4000 }, { name: "아메리카노", qty: 1, price: 4000 }], total: 8000, status: "완료", time: "13:21" },
  { id: "#000125", customer: "최영희", phone: "010-6666-7777", items: [{ name: "말차 라떼", qty: 1, price: 5300 }], total: 5300, status: "완료", time: "13:10" },
  { id: "#000124", customer: "정훈", phone: "010-8888-9999", items: [{ name: "바닐라 라떼", qty: 1, price: 4500 }], total: 4500, status: "완료", time: "12:58" },
  { id: "#000123", customer: "이민", phone: "010-1111-2222", items: [{ name: "딸기 스무디", qty: 1, price: 6200 }], total: 6200, status: "취소", time: "12:45" },
];

// 예약 관리 -------------------------------------------------------------
export type Reservation = {
  id: string;
  date: string; // yyyy-mm-dd
  time: string;
  name: string;
  phone: string;
  people: number;
  seat: string;
  request: string;
  status: "승인 대기" | "승인" | "거절";
};

export const reservations: Reservation[] = [
  { id: "R-20260807-015", date: "2026-08-07", time: "10:30", name: "김인수", phone: "010-1234-5678", people: 2, seat: "창가 자리", request: "조용한 자리 부탁드려요.", status: "승인 대기" },
  { id: "R-20260807-016", date: "2026-08-07", time: "11:00", name: "이지은", phone: "010-2345-6789", people: 4, seat: "테이블석", request: "-", status: "승인" },
  { id: "R-20260807-017", date: "2026-08-07", time: "12:30", name: "박성호", phone: "010-3456-7890", people: 3, seat: "테이블석", request: "-", status: "승인" },
  { id: "R-20260807-018", date: "2026-08-07", time: "14:00", name: "최유리", phone: "010-4567-8901", people: 2, seat: "룸 자리", request: "생일 케이크 반입 가능한가요?", status: "승인 대기" },
  { id: "R-20260807-019", date: "2026-08-07", time: "15:30", name: "정하늘", phone: "010-5678-9012", people: 5, seat: "단체석", request: "-", status: "승인" },
];

export const reservationCounts: Record<string, number> = {
  "2026-08-03": 2,
  "2026-08-04": 1,
  "2026-08-07": 5,
  "2026-08-10": 1,
  "2026-08-17": 1,
};

// 노쇼 방지 설정 ----------------------------------------------------------
export const noShowSettings = {
  depositEnabled: true,
  depositAmount: 5000,
  freeCancelHours: 3,
  penalty: "포인트 차감" as "포인트 차감" | "예약 제한" | "안내만 발송",
  penaltyDetail: "노쇼 1회당 3,000P 차감, 3회 누적 시 온라인 예약 1개월 제한",
  monthNoShow: 4,
};

// 실시간 좌석 현황 --------------------------------------------------------
export type Seat = { id: string; label: string; status: "사용중" | "예약됨" | "비어있음" | "청소중"; guest?: string; people?: number; since?: string };
export const seats: Seat[] = [
  { id: "1", label: "1", status: "비어있음" },
  { id: "2", label: "2", status: "사용중", guest: "김민수", people: 2, since: "13:10" },
  { id: "3", label: "3", status: "예약됨" },
  { id: "4", label: "4", status: "비어있음" },
  { id: "5", label: "5", status: "사용중", guest: "이서연", people: 3, since: "12:55" },
  { id: "6", label: "6", status: "비어있음" },
  { id: "7", label: "7", status: "사용중", guest: "박서연", people: 2, since: "13:20" },
  { id: "8", label: "8", status: "비어있음" },
  { id: "9", label: "9", status: "청소중" },
  { id: "10", label: "10", status: "비어있음" },
  { id: "11", label: "11", status: "사용중", guest: "최유리", people: 4, since: "12:40" },
  { id: "12", label: "12", status: "비어있음" },
  { id: "13", label: "13", status: "예약됨" },
];

// 직원 관리 ---------------------------------------------------------------
export type Staff = {
  id: string;
  name: string;
  role: "매니저" | "바리스타" | "홀 스태프" | "파트타임";
  phone: string;
  email: string;
  permission: "전체 관리" | "주문/예약 관리" | "조회 전용";
  status: "근무중" | "휴직" | "퇴사";
  hireDate: string;
};
export const staffList: Staff[] = [
  { id: "s1", name: "김사장", role: "매니저", phone: "010-1111-0000", email: "owner@ooocoffee.com", permission: "전체 관리", status: "근무중", hireDate: "2023.03.02" },
  { id: "s2", name: "정다은", role: "바리스타", phone: "010-2222-1111", email: "daeun@ooocoffee.com", permission: "주문/예약 관리", status: "근무중", hireDate: "2024.06.15" },
  { id: "s3", name: "한지호", role: "바리스타", phone: "010-3333-2222", email: "jiho@ooocoffee.com", permission: "주문/예약 관리", status: "근무중", hireDate: "2024.11.01" },
  { id: "s4", name: "오세영", role: "홀 스태프", phone: "010-4444-3333", email: "seyoung@ooocoffee.com", permission: "조회 전용", status: "근무중", hireDate: "2025.02.20" },
  { id: "s5", name: "류하나", role: "파트타임", phone: "010-5555-4444", email: "hana@ooocoffee.com", permission: "조회 전용", status: "휴직", hireDate: "2025.05.10" },
];
export const staffStats = { total: 5, active: 4, onLeave: 1, newThisMonth: 1 };

// 매장 소식 ---------------------------------------------------------------
export type Notice = { id: string; title: string; type: "공지" | "이벤트" | "배너"; period: string; status: "게시중" | "예약" | "종료"; views: number };
export const notices: Notice[] = [
  { id: "n1", title: "8월 여름 스페셜 음료 출시!", type: "이벤트", period: "2026.08.01 ~ 2026.08.31", status: "게시중", views: 1245 },
  { id: "n2", title: "추석 연휴 영업 안내", type: "공지", period: "2026.09.28 ~ 2026.10.03", status: "예약", views: 856 },
  { id: "n3", title: "텀블러 할인 이벤트", type: "이벤트", period: "2026.07.25 ~ 2026.08.10", status: "게시중", views: 2031 },
  { id: "n4", title: "원두 가격 인상 안내", type: "공지", period: "2026.06.15 ~ 2026.06.30", status: "종료", views: 1104 },
  { id: "n5", title: "매장 리뉴얼 오픈", type: "공지", period: "2026.05.01 ~ 2026.05.05", status: "종료", views: 3245 },
];

// 멤버십 (포인트·쿠폰) -----------------------------------------------------
export const membershipStats = { totalMembers: 1248, totalPoints: 98450, monthUsedPoints: 24300, couponRate: 38 };
export type Coupon = { id: string; name: string; discount: string; target: string; period: string; status: "진행중" | "종료"; used: number; limit: number };
export const coupons: Coupon[] = [
  { id: "c1", name: "신메뉴 오픈 기념 쿠폰", discount: "15% 할인", target: "전체 고객", period: "~2026.08.31", status: "진행중", used: 128, limit: 300 },
  { id: "c2", name: "여름 시즌 음료 쿠폰", discount: "2,000원 할인", target: "전체 고객", period: "~2026.08.31", status: "진행중", used: 96, limit: 200 },
  { id: "c3", name: "생일 축하 쿠폰", discount: "3,000원 할인", target: "생일 회원", period: "~2026.12.31", status: "진행중", used: 24, limit: 100 },
  { id: "c4", name: "단골 감사 쿠폰", discount: "10% 할인", target: "단골 고객", period: "~2026.10.31", status: "종료", used: 72, limit: 100 },
  { id: "c5", name: "휴일 방문 쿠폰", discount: "1,000원 할인", target: "전체 고객", period: "~2026.07.31", status: "종료", used: 203, limit: 250 },
];

// 친환경 포인트 / 텀블러 적립·기부 -------------------------------------------
export const ecoPointsSettings = {
  enabled: true,
  tumblerPoint: 300,
  reusableCupPoint: 100,
  donationEnabled: true,
  donationRatio: 1, // 고객 적립 1P당 매장이 1P를 환경 기금에 추가 적립
  monthDonatedPoint: 128600,
  monthTumblerUses: 412,
};
export type EcoAction = { id: string; type: "텀블러 지참" | "다회용기 이용"; customer: string; point: number; date: string };
export const ecoActions: EcoAction[] = [
  { id: "eco1", type: "텀블러 지참", customer: "김인수", point: 300, date: "2026.08.07 12:34" },
  { id: "eco2", type: "텀블러 지참", customer: "이지은", point: 300, date: "2026.08.07 11:20" },
  { id: "eco3", type: "다회용기 이용", customer: "박서준", point: 100, date: "2026.08.06 18:45" },
  { id: "eco4", type: "텀블러 지참", customer: "최유리", point: 300, date: "2026.08.06 14:22" },
];

// 고객 및 리뷰 관리 ----------------------------------------------------
export type Customer = { id: string; name: string; phone: string; email: string; grade: "VIP" | "GOLD" | "SILVER" | "BRONZE" | "NEW"; points: number; visits: number; total: number; lastVisit: string };
export const customers: Customer[] = [
  { id: "cu1", name: "김인수", phone: "010-1234-5678", email: "kimsu@email.com", grade: "VIP", points: 12450, visits: 28, total: 286400, lastVisit: "2026.08.07 12:34" },
  { id: "cu2", name: "이지은", phone: "010-2345-6789", email: "jieun@email.com", grade: "GOLD", points: 8230, visits: 19, total: 173200, lastVisit: "2026.08.07 11:20" },
  { id: "cu3", name: "박서준", phone: "010-3456-7890", email: "parkseojun@email.com", grade: "SILVER", points: 4750, visits: 12, total: 98600, lastVisit: "2026.08.06 18:45" },
  { id: "cu4", name: "최유리", phone: "010-4567-8901", email: "yuri.choi@email.com", grade: "BRONZE", points: 2180, visits: 6, total: 48300, lastVisit: "2026.08.06 14:22" },
  { id: "cu5", name: "정하늘", phone: "010-5678-9012", email: "skyjung@example.com", grade: "NEW", points: 350, visits: 1, total: 12800, lastVisit: "2026.08.06 10:05" },
];

export type Review = { id: string; customer: string; grade: string; menu: string; rating: number; text: string; date: string; status: "일반 리뷰" | "신고 접수"; image?: string };
export const reviews: Review[] = [
  { id: "rv1", customer: "김지현", grade: "단골 고객", menu: "아메리카노 맛이 궁금하고 편두 향이 너무 좋아요.", rating: 5.0, text: "매장 분위기도 편안하고 직원분도 친절해요!", date: "2026.08.07", status: "일반 리뷰" },
  { id: "rv2", customer: "이서연", grade: "일반 고객", menu: "케이크가 정말 있었어요! 다음엔 더 먹어보고 싶어요 :)", rating: 4.5, text: "케이크가 정말 있었어요! 다음엔 더 먹어보고 싶어요 :)", date: "2026.08.06", status: "일반 리뷰" },
  { id: "rv3", customer: "박인수", grade: "일반 고객", menu: "테이블 간 간격이 넓어서 좋았어요.", rating: 4.0, text: "테이블 간 간격이 넓어서 좋았어요. 조용해서 작업하기도 좋습니다.", date: "2026.08.05", status: "일반 대기" as any },
  { id: "rv4", customer: "최유리", grade: "단골 고객", menu: "라떼가 좀 미지근했어요ㅠ", rating: 3.0, text: "라떼가 좀 미지근했어요ㅠ 다시금 더 따뜻하게 부탁드려요.", date: "2026.08.04", status: "신고 접수" },
];

export const reviewStats = { total: 152, avg: 4.7, replyRate: 92, reports: 3 };

// 고객 방문 · VIP 관리 -----------------------------------------------------
export const visitStats = { total: 2846, newCustomers: 168, monthVisits: 1284, vip: 286, revisitRate: 68.7 };
export const gradeBenefits = ["모든 매뉴 10% 할인", "생일 쿠폰 제공", "우선 예약 혜택", "신메뉴 시식 초대"];

// 블로그 (CMS) -----------------------------------------------------------
export type BlogPost = { id: string; title: string; category: string; status: "발행 중" | "임시 저장" | "예약 발행"; date: string; views: number };
export const blogPosts: BlogPost[] = [
  { id: "b1", title: "여름 시즌 신메뉴 출시 안내", category: "이벤트", status: "발행 중", date: "2026.08.01", views: 512 },
  { id: "b2", title: "시원한 여름 음료 추천!", category: "매장 소개", status: "발행 중", date: "2026.07.29", views: 423 },
  { id: "b3", title: "매장 인테리어 리뉴얼 소식", category: "매장 소식", status: "발행 중", date: "2026.07.25", views: 687 },
  { id: "b4", title: "원두가 맛있는 이유", category: "스토리", status: "임시 저장", date: "2026.08.06", views: 0 },
  { id: "b5", title: "8월 휴무일 및 영업시간 안내", category: "공지사항", status: "예약 발행", date: "2026.08.10", views: 0 },
];
export const blogStats = { total: 48, published: 32, draft: 6, scheduled: 3, monthViews: 2845, viewsGrowth: 18 };

// 리뷰 · 커뮤니티 ----------------------------------------------------------
export type CommunityPost = { id: string; author: string; content: string; likes: number; comments: number; date: string; pinned?: boolean };
export const communityPosts: CommunityPost[] = [
  { id: "cp1", author: "사장님", content: "이번 주 신메뉴 '피치 아이스티' 반응이 뜨거워요! 많은 관심 부탁드립니다 🍑", likes: 42, comments: 8, date: "2026.08.06", pinned: true },
  { id: "cp2", author: "김민지", content: "오늘도 맛있게 잘 마시고 갑니다 :) 사장님 항상 친절하셔서 좋아요!", likes: 15, comments: 3, date: "2026.08.06" },
  { id: "cp3", author: "이수현", content: "주차 공간이 조금 더 넓었으면 좋겠어요.", likes: 6, comments: 2, date: "2026.08.05" },
  { id: "cp4", author: "박준영", content: "단골 쿠폰 적립 방식이 헷갈려요. 안내 부탁드립니다!", likes: 3, comments: 4, date: "2026.08.04" },
];

// SEO 노출 관리 ------------------------------------------------------------
export const seoInfo = {
  url: "https://cafeon.co.kr",
  title: "cafeON – 수제 커피와 디저트가 맛있는 공간",
  desc: "cafeON은 신선한 원두와 정성으로 만든 커피, 디저트를 제공하는 특별한 카페입니다.",
  address: "서울특별시 강남구 테헤란로 123-4",
  phone: "02-1234-5678",
  rating: 4.7,
  reviewCount: 152,
  hours: "08:00 ~ 21:00",
};
export const seoScores = { exposure: "우수", registration: "우수", mobile: "우수", speed: "빠름" };
export const lastCrawl = { time: "2026.08.06 14:32", status: "성공" };

// 알림 센터 ---------------------------------------------------------------
export type NotificationItem = { id: string; type: "주문" | "예약" | "재고" | "리뷰" | "멤버십" | "시스템"; content: string; time: string; read: boolean; important?: boolean };
export const notifications: NotificationItem[] = [
  { id: "no1", type: "주문", content: "[주문] 신규 주문 #000128이 접수되었습니다.", time: "5분 전", read: false, important: true },
  { id: "no2", type: "재고", content: "[재고] 바닐라 라떼 원두 재고가 부족합니다. (남은 수량 3kg)", time: "15분 전", read: false, important: true },
  { id: "no3", type: "예약", content: "[예약] 8/8 (토) 14:00 예약이 취소되었습니다.", time: "1시간 전", read: true },
  { id: "no4", type: "재고", content: "[재고] 새로운 고객 리뷰가 등록되었습니다.", time: "2시간 전", read: true },
  { id: "no5", type: "멤버십", content: "[멤버십] 신규 쿠폰 '여름 시즌 20% 할인'이 발행되었습니다.", time: "3시간 전", read: true },
  { id: "no6", type: "시스템", content: "[시스템] 시스템 점검이 완료되었습니다.", time: "5시간 전", read: true },
  { id: "no7", type: "재고", content: "[재고] 원두 베이스 재고가 부족합니다. (남은 수량: 1개)", time: "1일 전", read: true },
  { id: "no8", type: "멤버십", content: "[멤버십] 신규 회원 '김인수'님이 가입했습니다.", time: "1일 전", read: true },
];
export const notificationStats = { total: 28, unread: 3, important: 5, today: 12 };

// AI 메뉴 사진 보정 ---------------------------------------------------------
export const aiPhotoUsage = { used: 24, limit: 100 };
export const recentRetouches = [
  { name: "아이스아메리카노", time: "2026.08.07 13:30" },
  { name: "카페라떼", time: "2026.08.07 13:25" },
  { name: "바닐라 라떼", time: "2026.08.07 13:20" },
  { name: "크루아상", time: "2026.08.07 13:15" },
  { name: "딸기 에이드", time: "2026.08.07 13:10" },
];

// AI 기능 관리 --------------------------------------------------------------
export const aiFeatures = [
  { id: "af1", name: "AI 매출 예측", desc: "요일/시간대별 매출 흐름을 예측해 리포트로 제공", enabled: true },
  { id: "af2", name: "AI 프로모션 문구", desc: "메뉴·타깃·톤에 맞는 홍보 문구를 자동으로 생성", enabled: true },
  { id: "af3", name: "AI 리뷰 감성분석", desc: "고객 리뷰의 긍정·부정 감정과 핵심 키워드 분석", enabled: true },
  { id: "af4", name: "AI 시즌 할인 제안", desc: "판매 데이터 기반 시즌 할인 메뉴·할인율 추천", enabled: false },
];

// AI 프로모션 문구 생성 -------------------------------------------------------
export const promoMenus = ["아이스 아메리카노", "딸기 요거트 스무디", "바닐라 라떼", "크루아상", "말차 라떼"];
export const promoTones = ["발랄한", "감성적인", "따뜻한", "trendy한"] as const;
export const promoTemplates: { menu: string; tone: string; text: string }[] = [
  { menu: "아이스 아메리카노", tone: "발랄한", text: "🔥 무더위엔 역시 아이스 아메리카노! 오늘 하루 1,000원 할인 이벤트 진행 중이에요 ☕" },
  { menu: "딸기 요거트 스무디", tone: "감성적인", text: "달콤 상큼 딸기 요거트 스무디로 오후를 채워보세요 🍓 지금 방문 시 사이즈업 무료!" },
  { menu: "바닐라 라떼", tone: "따뜻한", text: "부드러운 바닐라 라떼 한 잔, 오늘 하루도 수고한 나에게 주는 작은 선물 🤎" },
  { menu: "크루아상", tone: "trendy한", text: "바삭하고 촉촉한 크루아상, 지금 이 시간 가장 신선해요 🥐 커피와 함께 즐겨보세요!" },
  { menu: "말차 라떼", tone: "감성적인", text: "진한 말차의 풍미가 가득한 라떼 한 잔, 잠깐의 여유를 선물해 드려요 🍵" },
];

// AI 리뷰 감성분석 -----------------------------------------------------------
export const reviewSentiment = {
  positive: 78,
  neutral: 15,
  negative: 7,
  positiveKeywords: ["친절해요", "분위기 좋아요", "커피 맛있어요"],
  negativeKeywords: ["대기시간 길어요", "좌석이 협소해요"],
  summary:
    "최근 7일간 리뷰의 78%가 긍정적이에요. '친절함'과 '분위기'에 대한 긍정 언급이 가장 많고, '대기시간'에 대한 부정 언급이 소폭 늘었어요.",
};

// AI 시즌 할인 제안 ----------------------------------------------------------
export type SeasonSuggestion = { id: string; menu: string; season: string; suggestedDiscount: number; reason: string };
export const seasonSuggestions: SeasonSuggestion[] = [
  { id: "ss1", menu: "아이스 아메리카노", season: "여름 성수기", suggestedDiscount: 10, reason: "최근 2주 판매량 32% 증가, 경쟁 매장 대비 가격 경쟁력이 낮아요." },
  { id: "ss2", menu: "딸기 요거트 스무디", season: "여름 시즌 메뉴", suggestedDiscount: 15, reason: "시즌 종료가 임박한 재고예요. 재구매율이 높은 메뉴라 할인 효과가 클 것으로 보여요." },
  { id: "ss3", menu: "콜드브루", season: "여름 성수기", suggestedDiscount: 5, reason: "꾸준한 판매량이에요. 소폭 할인으로 신규 고객 유입을 기대할 수 있어요." },
];

export const salesForecast = [
  { day: "8/3 (월)", value: 900000 },
  { day: "8/4 (화)", value: 1150000 },
  { day: "8/5 (수)", value: 980000 },
  { day: "8/6 (목)", value: 1300000 },
  { day: "8/7 (금)", value: 1250000, highlight: true },
  { day: "8/8 (토)", value: 1450000 },
  { day: "8/9 (일)", value: 1000000 },
];
export const aiInsights = [
  "금요일 오후 2~4시 매출이 가장 높을 것으로 예상돼요. 지난 데이터 기반 예측.",
  "딸기 음료의 판매가 증가할 것으로 예상돼요. 최근 3주 판매 데이터 분석.",
  "월요일 오전 매출이 낮아요. 프로모션 추천드려요.",
];

// 요금제 관리 ---------------------------------------------------------------
export const currentPlan = {
  name: "멤버십",
  price: 39000,
  cycle: "매월 결제",
  nextBillingDate: "2026.09.07 (월)",
  nextBillingAmount: 39000,
  paymentMethod: "카드 •••• 1234",
  billingEmail: "owner@ooocoffee.com",
  features: ["모든 기본 기능", "고급 매출 분석", "예약 관리", "멤버십(포인트, 쿠폰)", "마케팅 기능(쿠폰, 알림)", "블로그(CMS)", "SEO 관리", "우선 고객 지원"],
};
export const usage = [
  { label: "매출 분석 리포트", used: 18, total: 30, unit: "건" },
  { label: "예약 관리", used: 120, total: 200, unit: "건" },
  { label: "멤버십 회원", used: 1248, total: 2000, unit: "건" },
  { label: "저장 용량", used: 2.4, total: 10, unit: "GB" },
];
