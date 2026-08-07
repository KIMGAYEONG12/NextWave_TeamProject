"use client";
import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import Card from "@/components/Card";
import StoreTabs from "@/components/StoreTabs";
import Button from "@/components/Button";
import Icon, { IconName } from "@/components/icons";
import { notifications } from "@/lib/mock-data";

type TabKey = "all" | "order" | "reservation" | "stock" | "membership" | "system";

const typeToTab: Record<string, TabKey> = {
  주문: "order",
  재고: "stock",
  예약: "reservation",
  리뷰: "order",
  멤버십: "membership",
  시스템: "system",
};

const toggles = [
  { label: "주문 알림", key: "order" },
  { label: "예약 알림", key: "reservation" },
  { label: "재고 알림", key: "stock" },
  { label: "리뷰 알림", key: "review" },
  { label: "멤버십 알림", key: "membership" },
  { label: "시스템 알림", key: "system" },
];

export default function NotificationsPage() {
  const [tab, setTab] = useState<TabKey>("all");
  const [enabled, setEnabled] = useState<Record<string, boolean>>(
    Object.fromEntries(toggles.map((t) => [t.key, true]))
  );

  const filtered = notifications.filter((n) => tab === "all" || typeToTab[n.type] === tab);

  return (
    <div className="p-6 md:p-8 max-w-[1400px] mx-auto">
      <PageHeader title="알림 센터" subtitle="매장 운영과 관련된 알림을 확인하고 관리할 수 있습니다." />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
        <Card className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center"><Icon name="bell" className="w-5 h-5" /></div>
          <div><p className="text-xl font-bold text-ink-900">28</p><p className="text-xs text-ink-400">전체 알림</p></div>
        </Card>
        <Card className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center"><Icon name="star" className="w-5 h-5" /></div>
          <div><p className="text-xl font-bold text-ink-900">3</p><p className="text-xs text-ink-400">확인 필요</p></div>
        </Card>
        <Card className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center"><Icon name="aiSettings" className="w-5 h-5" /></div>
          <div><p className="text-xl font-bold text-ink-900">5</p><p className="text-xs text-ink-400">중요 알림</p></div>
        </Card>
        <Card className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center"><Icon name="reservation" className="w-5 h-5" /></div>
          <div><p className="text-xl font-bold text-ink-900">12</p><p className="text-xs text-ink-400">오늘 알림</p></div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-5">
        <Card padded={false}>
          <div className="px-5 pt-4">
            <StoreTabs
              tabs={[
                { key: "all", label: "전체" },
                { key: "order", label: "주문" },
                { key: "reservation", label: "예약" },
                { key: "stock", label: "재고" },
                { key: "membership", label: "멤버십" },
                { key: "system", label: "시스템" },
              ]}
              active={tab}
              onChange={setTab}
            />
          </div>
          <div className="divide-y divide-ink-50">
            {filtered.map((n, i) => (
              <div key={i} className={`flex items-center gap-3 px-5 py-3.5 ${!n.read ? "bg-brand-50/30" : ""}`}>
                <div className="w-9 h-9 rounded-lg bg-ink-100 text-ink-500 flex items-center justify-center shrink-0">
                  <Icon name={n.icon as IconName} className="w-4 h-4" />
                </div>
                <p className="flex-1 text-sm text-ink-700">{n.text}</p>
                <span className="text-xs text-ink-400 shrink-0">{n.time}</span>
                {!n.read && <span className="w-2 h-2 rounded-full bg-brand-500 shrink-0" />}
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="text-sm font-semibold text-ink-800 mb-4">알림 설정</h3>
          <div className="space-y-3.5">
            {toggles.map((t) => (
              <div key={t.key} className="flex items-center justify-between">
                <span className="text-sm text-ink-600">{t.label}</span>
                <button
                  onClick={() => setEnabled((prev) => ({ ...prev, [t.key]: !prev[t.key] }))}
                  className={`w-9 h-5 rounded-full relative transition-colors ${enabled[t.key] ? "bg-brand-600" : "bg-ink-200"}`}
                >
                  <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${enabled[t.key] ? "translate-x-4" : "translate-x-0.5"}`} />
                </button>
              </div>
            ))}
          </div>
          <Button className="w-full mt-5">알림 설정 저장</Button>
        </Card>
      </div>
    </div>
  );
}
