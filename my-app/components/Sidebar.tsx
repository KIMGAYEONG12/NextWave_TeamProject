"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Icon, { IconName } from "./icons";
import Modal from "./Modal";
import Button from "./Button";
import { pricingPlans } from "@/lib/mock-data";

type NavItem = {
  href: string;
  label: string;
  icon: IconName;
  badge?: number;
};

type NavSection = {
  title: string;
  items: NavItem[];
};

const sections: NavSection[] = [
  {
    title: "운영 관리",
    items: [
      { href: "/", label: "대시보드", icon: "dashboard" },
      { href: "/menu", label: "메뉴·재고 관리", icon: "menu", badge: 2 },
      { href: "/orders", label: "주문/결제(POS) 관리", icon: "orders", badge: 2 },
      { href: "/reservations", label: "예약 관리", icon: "reservation" },
      { href: "/seats", label: "실시간 좌석 현황", icon: "seats" },
      { href: "/sales", label: "매출·리포트", icon: "sales" },
      { href: "/news", label: "매장 소식", icon: "news" },
    ],
  },
  {
    title: "고객 관리",
    items: [
      { href: "/membership", label: "멤버십 (포인트·쿠폰)", icon: "membership" },
      { href: "/customers", label: "고객 및 리뷰 관리", icon: "customers", badge: 2 },
    ],
  },
  {
    title: "콘텐츠 & 마케팅",
    items: [
      { href: "/blog", label: "블로그 (CMS)", icon: "blog" },
      { href: "/community", label: "리뷰·커뮤니티", icon: "community" },
      { href: "/seo", label: "SEO 노출 관리", icon: "seo" },
    ],
  },
  {
    title: "AI & 자동화",
    items: [{ href: "/ai-photo", label: "AI 메뉴 사진 보정", icon: "ai" }],
  },
  {
    title: "설정",
    items: [
      { href: "/notifications", label: "알림 센터", icon: "bell", badge: 1 },
      { href: "/pricing", label: "요금제 관리", icon: "pricing" },
      { href: "/ai-settings", label: "AI 기능 관리", icon: "aiSettings" },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [proOpen, setProOpen] = useState(false);
  const proPlan = pricingPlans.find((p) => p.name === "프로페셔널") ?? pricingPlans[1];
  const enterprisePlan = pricingPlans.find((p) => p.name === "엔터프라이즈") ?? pricingPlans[2];

  return (
    <aside
      className={`hidden md:flex flex-col shrink-0 border-r border-ink-100 bg-white h-screen sticky top-0 transition-all ${
        collapsed ? "w-[76px]" : "w-[264px]"
      }`}
    >
      <div className="flex items-center gap-2.5 px-5 py-5">
        <div className="w-9 h-9 rounded-xl bg-brand-600 text-white flex items-center justify-center shrink-0">
          <Icon name="coffee" className="w-5 h-5" />
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <p className="text-base font-bold text-ink-900 leading-tight">cafeON</p>
            <p className="text-[11px] text-ink-400 leading-tight truncate">
              사장님 관리 시스템
            </p>
          </div>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto px-3 pb-4">
        {sections.map((section) => (
          <div key={section.title} className="mb-4">
            {!collapsed && (
              <p className="px-2.5 mb-1.5 text-[11px] font-semibold text-ink-400 uppercase tracking-wide">
                {section.title}
              </p>
            )}
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    title={collapsed ? item.label : undefined}
                    className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-colors ${
                      isActive
                        ? "bg-brand-50 text-brand-700 font-semibold"
                        : "text-ink-600 hover:bg-ink-50"
                    }`}
                  >
                    <Icon
                      name={item.icon}
                      className={`w-[18px] h-[18px] shrink-0 ${
                        isActive ? "text-brand-600" : "text-ink-400"
                      }`}
                    />
                    {!collapsed && (
                      <span className="flex-1 truncate">{item.label}</span>
                    )}
                    {!collapsed && item.badge ? (
                      <span className="flex items-center justify-center min-w-[18px] h-[18px] rounded-full bg-red-500 text-white text-[10px] font-semibold px-1">
                        {item.badge}
                      </span>
                    ) : null}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="px-3 pb-3 space-y-2">
        {!collapsed && (
          <div className="rounded-xl bg-gradient-to-br from-brand-600 to-brand-800 text-white p-4">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-sm font-semibold">프로 기능</span>
              <span className="text-[10px] bg-white/20 rounded px-1.5 py-0.5">Pro</span>
            </div>
            <button
              onClick={() => setProOpen(true)}
              className="text-xs text-white/90 underline underline-offset-2"
            >
              프로 기능 더 보기 →
            </button>
          </div>
        )}

        <Modal
          open={proOpen}
          onClose={() => setProOpen(false)}
          title="프로 기능 더 보기"
          footer={
            <>
              <Button variant="outline" onClick={() => setProOpen(false)}>
                닫기
              </Button>
              <Link href="/pricing" onClick={() => setProOpen(false)}>
                <Button>요금제 관리로 이동</Button>
              </Link>
            </>
          }
        >
          <p className="text-sm text-ink-500 mb-4">
            현재 <span className="font-semibold text-ink-800">{proPlan.name}</span> 요금제에서 이용 중인 기능과, 상위 요금제에서 추가로 이용할 수 있는 기능입니다.
          </p>
          <p className="text-xs font-semibold text-ink-400 mb-2">프로페셔널 포함 기능</p>
          <ul className="space-y-1.5 text-sm text-ink-700 mb-4">
            {proPlan.features.map((f) => (
              <li key={f} className="flex items-center gap-2">
                <Icon name="check" className="w-3.5 h-3.5 text-brand-500 shrink-0" />
                {f}
              </li>
            ))}
          </ul>
          <p className="text-xs font-semibold text-ink-400 mb-2">엔터프라이즈로 업그레이드 시</p>
          <ul className="space-y-1.5 text-sm text-ink-500">
            {enterprisePlan.features.map((f) => (
              <li key={f} className="flex items-center gap-2">
                <Icon name="check" className="w-3.5 h-3.5 text-ink-300 shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        </Modal>
        <div className="flex items-center gap-2.5 px-2 py-2 border-t border-ink-100 pt-3">
          <div className="w-8 h-8 rounded-full bg-ink-100 flex items-center justify-center shrink-0">
            <span className="text-sm">☕</span>
          </div>
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-ink-800 truncate">OOO 커피</p>
              <p className="text-[11px] text-ink-400 truncate">사장님 관리자</p>
            </div>
          )}
          <button
            onClick={() => setCollapsed((c) => !c)}
            className="text-ink-300 hover:text-ink-600"
          >
            <Icon
              name={collapsed ? "chevronRight" : "chevronLeft"}
              className="w-4 h-4"
            />
          </button>
        </div>
      </div>
    </aside>
  );
}
