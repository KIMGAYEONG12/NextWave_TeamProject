"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Coffee, Crown, ChevronDown, X, Menu } from "lucide-react";
import { navSections } from "@/lib/nav";
import { useState } from "react";

export default function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const content = (
    <div className="flex h-full w-72 flex-col bg-navy-950 text-slate-300">
      <div className="flex items-center gap-2.5 px-5 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500 text-white">
          <Coffee size={18} />
        </div>
        <div>
          <p className="text-base font-bold leading-tight text-white">cafeON</p>
          <p className="text-[11px] leading-tight text-slate-400">사장님 관리 시스템</p>
        </div>
        <button
          className="ml-auto rounded-lg p-1.5 text-slate-400 hover:bg-navy-800 lg:hidden"
          onClick={() => setMobileOpen(false)}
        >
          <X size={18} />
        </button>
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto px-3 pb-4">
        {navSections.map((section) => (
          <div key={section.title}>
            <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              {section.title}
            </p>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const active = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm transition ${
                      active
                        ? "bg-brand-600 text-white shadow-card"
                        : "text-slate-300 hover:bg-navy-800 hover:text-white"
                    }`}
                  >
                    <Icon size={17} className={active ? "text-white" : "text-slate-400"} />
                    <span className="flex-1 font-medium">{item.label}</span>
                    {!!item.badge && (
                      <span
                        className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[11px] font-semibold ${
                          active ? "bg-white/20 text-white" : "bg-danger/90 text-white"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="mx-3 mb-3 rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 p-4 text-white">
        <div className="mb-1 flex items-center gap-1.5 text-sm font-bold">
          <Crown size={15} className="text-amber-300" />
          프로 기능
          <span className="ml-auto rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-semibold">Pro</span>
        </div>
        <Link href="/billing" className="text-xs font-medium text-brand-100 underline underline-offset-2">
          프로 기능 더 보기 →
        </Link>
      </div>

      <div className="flex items-center gap-2.5 border-t border-navy-800 px-4 py-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-700 text-sm">🏠</div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-white">김사장님</p>
          <p className="text-[11px] text-slate-400">매장 설정 &gt;</p>
        </div>
        <ChevronDown size={16} className="text-slate-500" />
      </div>
    </div>
  );

  return (
    <>
      {/* desktop */}
      <aside className="hidden shrink-0 lg:block">{content}</aside>

      {/* mobile trigger */}
      <button
        className="fixed left-3 top-3 z-40 rounded-lg bg-navy-950 p-2 text-white shadow-popover lg:hidden"
        onClick={() => setMobileOpen(true)}
      >
        <Menu size={18} />
      </button>

      {/* mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <div className="absolute inset-y-0 left-0">{content}</div>
        </div>
      )}
    </>
  );
}
