import {
  LayoutDashboard,
  Coffee,
  ShoppingCart,
  CalendarDays,
  Grid3x3,
  Megaphone,
  Gift,
  Users,
  UserCheck,
  UserCog,
  Newspaper,
  MessagesSquare,
  Search,
  Sparkles,
  Bell,
  CreditCard,
  Wand2,
} from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  icon: any;
  badge?: number;
};

export type NavSection = {
  title: string;
  items: NavItem[];
};

export const navSections: NavSection[] = [
  {
    title: "운영 관리",
    items: [
      { label: "대시보드", href: "/", icon: LayoutDashboard },
      { label: "메뉴·재고 관리", href: "/menu", icon: Coffee, badge: 2 },
      { label: "주문/결제(POS) 관리", href: "/orders", icon: ShoppingCart, badge: 2 },
      { label: "예약 관리", href: "/reservations", icon: CalendarDays },
      { label: "실시간 좌석 현황", href: "/seats", icon: Grid3x3 },
      { label: "매장 소식", href: "/notices", icon: Megaphone },
      { label: "직원 관리", href: "/staff", icon: UserCog },
    ],
  },
  {
    title: "고객 관리",
    items: [
      { label: "멤버십 (포인트·쿠폰)", href: "/membership", icon: Gift },
      { label: "고객 및 리뷰 관리", href: "/customers", icon: Users, badge: 2 },
      { label: "고객 방문·VIP 관리", href: "/vip", icon: UserCheck },
    ],
  },
  {
    title: "콘텐츠 & 마케팅",
    items: [
      { label: "블로그 (CMS)", href: "/blog", icon: Newspaper },
      { label: "리뷰·커뮤니티", href: "/community", icon: MessagesSquare },
      { label: "SEO 노출 관리", href: "/seo", icon: Search },
    ],
  },
  {
    title: "AI & 자동화",
    items: [
      { label: "AI 메뉴 사진 보정", href: "/ai-photo", icon: Wand2 },
      { label: "AI 기능 관리", href: "/ai-features", icon: Sparkles },
    ],
  },
  {
    title: "설정",
    items: [
      { label: "알림 센터", href: "/notifications", icon: Bell, badge: 3 },
      { label: "요금제 관리", href: "/billing", icon: CreditCard },
    ],
  },
];
