export const stores = [
  { id: 1, name: "OOO 커피 강남점", address: "서울특별시 강남구 테헤란로 123-4" },
  { id: 2, name: "OOO 커피 대구점", address: "대구광역시 중구 동성로 45-2" },
  { id: 3, name: "OOO 커피 홍대점", address: "서울특별시 마포구 와우산로 21" },
];

export const salesTrend = [
  { day: "8/1(토)", value: 38000 },
  { day: "8/2(일)", value: 45000 },
  { day: "8/3(월)", value: 32000 },
  { day: "8/4(화)", value: 56000 },
  { day: "8/5(수)", value: 72000 },
  { day: "8/6(목)", value: 58000 },
  { day: "8/7(금)", value: 66000 },
];

export const hourlySales = [
  { hour: 7, value: 42000, orders: 9 },
  { hour: 8, value: 118000, orders: 24 },
  { hour: 9, value: 96000, orders: 19 },
  { hour: 10, value: 74000, orders: 15 },
  { hour: 11, value: 88000, orders: 17 },
  { hour: 12, value: 156000, orders: 31 },
  { hour: 13, value: 142000, orders: 28 },
  { hour: 14, value: 101000, orders: 20 },
  { hour: 15, value: 128000, orders: 26 },
  { hour: 16, value: 134000, orders: 27 },
  { hour: 17, value: 92000, orders: 18 },
  { hour: 18, value: 68000, orders: 14 },
  { hour: 19, value: 54000, orders: 11 },
  { hour: 20, value: 38000, orders: 8 },
  { hour: 21, value: 22000, orders: 5 },
];

export const topMenus = [
  { rank: 1, name: "싱글오리진 드립", sold: "판매 84잔", img: "🫖" },
  { rank: 2, name: "카페라떼", sold: "판매 67잔", img: "🥛" },
  { rank: 3, name: "크루아상", sold: "판매 41개", img: "🥐" },
  { rank: 4, name: "바닐라 라떼", sold: "판매 38잔", img: "🍮" },
  { rank: 5, name: "아메리카노", sold: "판매 36잔", img: "☕" },
];

export const todayReservations = [
  { time: "10:30", name: "김인수", people: 2, status: "승인 대기" },
  { time: "11:00", name: "이지은", people: 4, status: "승인" },
  { time: "12:30", name: "박성호", people: 3, status: "승인" },
  { time: "14:00", name: "최유리", people: 2, status: "승인" },
  { time: "15:30", name: "정하늘", people: 5, status: "승인 대기" },
];

export const menuItems = [
  { id: 1, name: "아메리카노", category: "커피", price: 4000, stock: "정상 (150잔)", stockLevel: "ok", orders: 112, img: "☕" },
  { id: 2, name: "카페라떼", category: "커피", price: 4800, stock: "정상 (120잔)", stockLevel: "ok", orders: 128, img: "🥛" },
  { id: 3, name: "바닐라 라떼", category: "커피", price: 5300, stock: "부족 (12잔)", stockLevel: "low", orders: 98, img: "🍮" },
  { id: 4, name: "딸기 에이드", category: "에이드", price: 5800, stock: "부족 (8잔)", stockLevel: "low", orders: 76, img: "🍓" },
  { id: 5, name: "크루아상", category: "베이커리", price: 3500, stock: "품절", stockLevel: "out", orders: 74, img: "🥐" },
];

export const orderList = [
  { id: "#000128", customer: "임지*", items: "아이스 아메리카노 외 1", amount: "8,500원", status: "접수", time: "13:42" },
  { id: "#000127", customer: "박*헌", items: "바닐라 라떼", amount: "6,000원", status: "준비중", time: "13:35" },
  { id: "#000126", customer: "김*수", items: "크루아상 + 아메리카노", amount: "8,000원", status: "완료", time: "13:21" },
  { id: "#000125", customer: "최*영", items: "말차 라떼", amount: "5,300원", status: "완료", time: "13:10" },
  { id: "#000124", customer: "정*훈", items: "바닐라 라떼", amount: "4,500원", status: "완료", time: "12:58" },
  { id: "#000123", customer: "이*민", items: "딸기 스무디", amount: "6,200원", status: "취소", time: "12:45" },
];

export const seatData = [
  { id: 1, label: "1", status: "used", zone: "window" },
  { id: 2, label: "2", status: "used", zone: "window" },
  { id: 3, label: "3", status: "empty", zone: "window" },
  { id: 4, label: "4", status: "reserved", zone: "window" },
  { id: 5, label: "5", status: "empty", zone: "window" },
  { id: 6, label: "6", status: "empty", zone: "table" },
  { id: 7, label: "7", status: "used", zone: "table" },
  { id: 8, label: "8", status: "empty", zone: "table" },
  { id: 9, label: "9", status: "reserved", zone: "table" },
  { id: 10, label: "10", status: "empty", zone: "table" },
  { id: 11, label: "11", status: "empty", zone: "table" },
  { id: 12, label: "12", status: "cleaning", zone: "table" },
  { id: 13, label: "13", status: "empty", zone: "table" },
];

export const patioSeats = [
  { id: "T1", status: "reserved" },
  { id: "T2", status: "empty" },
];

export const members = [
  { name: "김민수", grade: "VIP", email: "kimsu@email.com", phone: "010-1234-5678", points: "12,450P", visits: "28회", total: "₩286,400", lastVisit: "2026.08.07 12:34" },
  { name: "이지은", grade: "GOLD", email: "jieun@email.com", phone: "010-2345-6789", points: "8,230P", visits: "19회", total: "₩173,200", lastVisit: "2026.08.07 11:20" },
  { name: "박서준", grade: "SILVER", email: "parkseojun@email.com", phone: "010-3456-7890", points: "4,750P", visits: "12회", total: "₩98,600", lastVisit: "2026.08.06 18:45" },
  { name: "최유리", grade: "BRONZE", email: "yuri.choi@email.com", phone: "010-4567-8901", points: "2,180P", visits: "6회", total: "₩48,300", lastVisit: "2026.08.06 14:22" },
  { name: "정하늘", grade: "NEW", email: "skyjung@example.com", phone: "010-5678-9012", points: "350P", visits: "1회", total: "₩12,800", lastVisit: "2026.08.06 10:05" },
];

export const coupons = [
  { name: "신메뉴 오픈 기념 쿠폰", desc: "15% 할인", target: "전체 고객", period: "~2026.08.31", status: "진행중", used: 128 },
  { name: "여름 시즌 음료 쿠폰", desc: "2,000원 할인", target: "전체 고객", period: "~2026.08.31", status: "진행중", used: 96 },
  { name: "생일 축하 쿠폰", desc: "3,000원 할인", target: "생일 회원", period: "~2026.12.31", status: "진행중", used: 24 },
  { name: "단골 감사 쿠폰", desc: "10% 할인", target: "단골 고객", period: "~2026.10.31", status: "종료", used: 72 },
  { name: "평일 방문 쿠폰", desc: "1,000원 할인", target: "전체 고객", period: "~2026.07.31", status: "종료", used: 203 },
];

export const reviews = [
  { name: "김지현", grade: "단골 고객", rating: 5.0, date: "2026.08.07", content: "아메리카노 맛이 깔끔하고 원두 향이 너무 좋아요. 매장 분위기도 편안하고 직원분도 친절해요!", status: "답변 완료" },
  { name: "이서연", grade: "일반 고객", rating: 4.5, date: "2026.08.06", content: "케이크가 정말 맛있어요! 다음엔 디저트 메뉴도 더 다양하게 있으면 좋겠어요 :)", status: "답변 완료" },
  { name: "박인수", grade: "일반 고객", rating: 4.0, date: "2026.08.05", content: "테이블 간 간격이 넓어서 좋았어요. 조용해서 작업하기도 좋습니다.", status: "답변 대기" },
  { name: "최유리", grade: "단골 고객", rating: 3.0, date: "2026.08.04", content: "라떼가 좀 미지근했어요ㅠ 다시 조금 더 따뜻하게 부탁드려요.", status: "신고 접수" },
];

export const blogPosts = [
  { title: "여름 시즌 신메뉴 출시 안내", category: "이벤트", status: "발행 중", date: "2026.08.01", views: 512 },
  { title: "시원한 여름 음료 추천!", category: "매장 소개", status: "발행 중", date: "2026.07.29", views: 423 },
  { title: "매장 인테리어 리뉴얼 소식", category: "매장 소식", status: "발행 중", date: "2026.07.25", views: 687 },
  { title: "원두가 맛있는 이유", category: "스토리", status: "임시 저장", date: "2026.08.06", views: null },
  { title: "8월 휴무일 및 영업시간 안내", category: "공지사항", status: "예약 발행", date: "2026.08.10", views: null },
];

export const storeNews = [
  { title: "8월 여름 스페셜 음료 출시!", type: "이벤트", period: "2026.08.01 ~ 2026.08.31", status: "게시중", views: 1245 },
  { title: "추석 연휴 영업 안내", type: "공지", period: "2026.09.28 ~ 2026.10.03", status: "예약", views: 856 },
  { title: "텀블러 할인 이벤트", type: "이벤트", period: "2026.07.25 ~ 2026.08.10", status: "게시중", views: 2031 },
  { title: "원두 가격 인상 안내", type: "공지", period: "2026.06.15 ~ 2026.06.30", status: "종료", views: 1104 },
  { title: "매장 리뉴얼 오픈", type: "공지", period: "2026.05.01 ~ 2026.05.05", status: "종료", views: 3245 },
];

export const notifications = [
  { type: "주문", icon: "orders", text: "[주문] 신규 주문 #000128이 접수되었습니다.", time: "5분 전", read: false },
  { type: "재고", icon: "menu", text: "[재고] 딸기라떼 원두 재고가 부족합니다. (남은 수량: 3kg)", time: "15분 전", read: false },
  { type: "예약", icon: "reservation", text: "[예약] 8/8 (토) 14:00 예약이 취소되었습니다.", time: "1시간 전", read: true },
  { type: "리뷰", icon: "star", text: "[리뷰] 새로운 고객 리뷰가 등록되었습니다.", time: "2시간 전", read: true },
  { type: "멤버십", icon: "membership", text: "[쿠폰] 신규 쿠폰 '여름 시즌 20% 할인'이 발행되었습니다.", time: "3시간 전", read: true },
  { type: "시스템", icon: "aiSettings", text: "[시스템] 시스템 점검이 완료되었습니다.", time: "5시간 전", read: true },
  { type: "재고", icon: "menu", text: "[재고] 얼그레이 베이스 재고가 부족합니다. (남은 수량: 1개)", time: "1일 전", read: true },
  { type: "멤버십", icon: "membership", text: "[멤버십] 신규 회원 '김인수'님이 가입했습니다.", time: "1일 전", read: true },
];

export const aiFeatures = [
  { name: "AI 메뉴 추천", desc: "고객 선호도 분석을 통한 인기 메뉴 추천", enabled: true },
  { name: "AI 수요 예측", desc: "요일/시간별 매출 및 수요 예측", enabled: true },
  { name: "AI 리뷰 분석", desc: "고객 리뷰 감성 분석 및 인사이트 제공", enabled: true },
  { name: "AI 재고 관리", desc: "재고 소진 예측 및 자동 발주 알림", enabled: false },
];

export const pricingPlans = [
  {
    name: "베이직",
    price: "₩19,000",
    features: ["기본 매출 관리", "메뉴/재고 관리", "주문(POS) 관리"],
    current: false,
  },
  {
    name: "프로페셔널",
    price: "₩49,000",
    features: [
      "모든 기본 기능",
      "고급 매출 분석",
      "예약 관리",
      "멤버십(포인트, 쿠폰)",
      "마케팅 기능(쿠폰, 알림)",
      "블로그(CMS)",
      "SEO 관리",
      "우선 고객 지원",
    ],
    current: true,
  },
  {
    name: "엔터프라이즈",
    price: "₩99,000",
    features: ["무제한 데이터", "전담 지원", "맞춤 기능"],
    current: false,
  },
];
