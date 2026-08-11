"use client";

import { useState } from "react";
import { Bell, ShoppingCart, CalendarDays, Package, Star, Gift, Settings2 } from "lucide-react";
import { PageHeader } from "@/components/ui";
import { useToast } from "@/components/Toast";
import { notifications as initialNotifications, notificationStats, NotificationItem } from "@/lib/data";

const tabs = ["전체", "주문", "예약", "재고", "멤버십", "시스템"] as const;

const typeIcon: Record<NotificationItem["type"], any> = {
  주문: ShoppingCart,
  예약: CalendarDays,
  재고: Package,
  리뷰: Star,
  멤버십: Gift,
  시스템: Settings2,
};

export default function NotificationsPage() {
  const showToast = useToast();
  const [items, setItems] = useState(initialNotifications);
  const [tab, setTab] = useState<(typeof tabs)[number]>("전체");
  const [settings, setSettings] = useState({ 주문알림: true, 예약알림: true, 재고알림: true, 리뷰알림: true, 멤버십알림: true, 시스템알림: true });
  const [saving, setSaving] = useState(false);

  const saveSettings = () => {
    setSaving(true);
    // 실제 서비스라면 여기서 서버에 알림 설정을 저장하는 API를 호출합니다.
    setTimeout(() => {
      setSaving(false);
      showToast("알림 설정이 저장되었습니다!");
    }, 400);
  };

  const filtered = items.filter((n) => tab === "전체" || n.type === tab);
  const markRead = (id: string) => setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));

  return (
    <div>
      <PageHeader title="알림 센터" desc="매장 운영과 관련된 알림을 확인하고 관리할 수 있습니다." />

      <div className="mb-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="card flex items-center gap-3 p-4">
          <Bell className="text-brand-500" size={20} />
          <div>
            <p className="text-xs text-black">전체 알림</p>
            <p className="font-bold text-black">{notificationStats.total}</p>
          </div>
        </div>
        <div className="card flex items-center gap-3 p-4">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-500">●</span>
          <div>
            <p className="text-xs text-black">안읽은 알림</p>
            <p className="font-bold text-black">{notificationStats.unread}</p>
          </div>
        </div>
        <div className="card flex items-center gap-3 p-4">
          <Star className="text-red-500" size={20} />
          <div>
            <p className="text-xs text-black">중요 알림</p>
            <p className="font-bold text-black">{notificationStats.important}</p>
          </div>
        </div>
        <div className="card flex items-center gap-3 p-4">
          <Package className="text-emerald-500" size={20} />
          <div>
            <p className="text-xs text-black">오늘 알림</p>
            <p className="font-bold text-black">{notificationStats.today}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_300px]">
        <div className="card p-4">
          <div className="mb-4 flex flex-wrap gap-2">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium ${
                  tab === t ? "bg-brand-600 text-white" : "bg-slate-50 text-black hover:bg-slate-100"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="space-y-1">
            {filtered.map((n) => {
              const Icon = typeIcon[n.type];
              return (
                <button
                  key={n.id}
                  onClick={() => markRead(n.id)}
                  className={`flex w-full items-start gap-3 rounded-xl p-3 text-left transition ${
                    n.read ? "hover:bg-slate-50" : "bg-brand-50/60 hover:bg-brand-50"
                  }`}
                >
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-black shadow-card">
                    <Icon size={15} />
                  </span>
                  <span className="flex-1">
                    <span className="block text-sm text-black">{n.content}</span>
                    <span className="mt-0.5 block text-xs text-black">{n.time}</span>
                  </span>
                  {!n.read && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-500" />}
                </button>
              );
            })}
          </div>
        </div>

        <div className="card h-fit p-5">
          <h3 className="mb-4 font-bold text-black">알림 설정</h3>
          <div className="space-y-3">
            {Object.entries(settings).map(([key, val]) => (
              <div key={key} className="flex items-center justify-between text-sm">
                <span className="text-black">{key}</span>
                <button
                  onClick={() => setSettings((s) => ({ ...s, [key]: !val }))}
                  className={`relative h-5 w-9 rounded-full transition ${val ? "bg-brand-600" : "bg-slate-200"}`}
                >
                  <span
                    className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition ${
                      val ? "left-[18px]" : "left-0.5"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
          <button onClick={saveSettings} disabled={saving} className="btn-primary mt-5 w-full">
            {saving ? "저장 중..." : "알림 설정 저장"}
          </button>
        </div>
      </div>
    </div>
  );
}
