import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Card from "@/components/Card";
import StatCard from "@/components/StatCard";
import Badge from "@/components/Badge";
import LineChart from "@/components/LineChart";
import Icon from "@/components/icons";
import {
  salesTrend,
  topMenus,
  todayReservations,
  orderList,
  notifications,
} from "@/lib/mock-data";

const statusTone: Record<string, "blue" | "amber" | "green" | "red"> = {
  접수: "blue",
  준비중: "amber",
  완료: "green",
  취소: "red",
  "승인 대기": "amber",
  승인: "green",
};

export default function Home() {
  const recentOrders = orderList.slice(0, 5);
  const upcomingReservations = todayReservations.slice(0, 5);
  const recentNotifications = notifications.slice(0, 4);

  return (
    <div className="p-6 md:p-8 max-w-[1400px] mx-auto">
      <PageHeader
        title="대시보드"
        subtitle="오늘 매장 운영 현황을 한눈에 확인하세요."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <StatCard
          label="오늘 매출"
          value="66,000원"
          delta="+13.8%"
          deltaLabel="전일 대비"
          icon="sales"
          iconTone="blue"
        />
        <StatCard
          label="오늘 주문"
          value="24건"
          delta="+4건"
          deltaLabel="전일 대비"
          icon="orders"
          iconTone="green"
        />
        <StatCard
          label="예약 대기"
          value="2건"
          delta="승인 필요"
          deltaLabel=""
          icon="reservation"
          iconTone="amber"
        />
        <StatCard
          label="신규 알림"
          value={`${notifications.length}건`}
          delta="확인 필요"
          deltaLabel=""
          icon="bell"
          iconTone="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-5">
        <div className="space-y-5">
          <Card>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-semibold text-ink-900">
                최근 7일 매출 추이
              </h2>
              <Link
                href="/sales"
                className="text-xs font-medium text-brand-600 hover:text-brand-700"
              >
                매출 리포트 보기 →
              </Link>
            </div>
            <LineChart data={salesTrend} />
          </Card>

          <Card padded={false}>
            <div className="flex items-center justify-between px-5 pt-4 pb-2">
              <h2 className="text-sm font-semibold text-ink-900">
                최근 주문
              </h2>
              <Link
                href="/orders"
                className="text-xs font-medium text-brand-600 hover:text-brand-700"
              >
                전체 주문 보기 →
              </Link>
            </div>
            <div className="divide-y divide-ink-100">
              {recentOrders.map((o) => (
                <div
                  key={o.id}
                  className="flex items-center justify-between gap-3 px-5 py-3"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-ink-800 truncate">
                      {o.id} · {o.customer}
                    </p>
                    <p className="text-xs text-ink-400 truncate">
                      {o.items}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-sm text-ink-700">{o.amount}</span>
                    <Badge tone={statusTone[o.status] ?? "gray"}>
                      {o.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-5">
          <Card>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-ink-900">
                오늘 예약
              </h2>
              <Link
                href="/reservations"
                className="text-xs font-medium text-brand-600 hover:text-brand-700"
              >
                전체 보기 →
              </Link>
            </div>
            <div className="space-y-2.5">
              {upcomingReservations.map((r, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between gap-2 text-sm"
                >
                  <div className="min-w-0">
                    <span className="font-medium text-ink-800">
                      {r.time}
                    </span>
                    <span className="text-ink-400"> · {r.name} 님 {r.people}인</span>
                  </div>
                  <Badge tone={statusTone[r.status] ?? "gray"}>
                    {r.status}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-ink-900">
                인기 메뉴 TOP 5
              </h2>
              <Link
                href="/menu"
                className="text-xs font-medium text-brand-600 hover:text-brand-700"
              >
                메뉴 관리 →
              </Link>
            </div>
            <div className="space-y-2.5">
              {topMenus.map((m) => (
                <div
                  key={m.rank}
                  className="flex items-center gap-2.5 text-sm"
                >
                  <span className="w-5 text-ink-400 font-semibold">
                    {m.rank}
                  </span>
                  <span className="text-lg">{m.img}</span>
                  <span className="flex-1 text-ink-800 truncate">
                    {m.name}
                  </span>
                  <span className="text-xs text-ink-400 shrink-0">
                    {m.sold}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-ink-900">
                최근 알림
              </h2>
              <Link
                href="/notifications"
                className="text-xs font-medium text-brand-600 hover:text-brand-700"
              >
                알림 센터 →
              </Link>
            </div>
            <div className="space-y-3">
              {recentNotifications.map((n, i) => (
                <div key={i} className="flex items-start gap-2.5 text-sm">
                  <Icon
                    name={n.icon as import("@/components/icons").IconName}
                    className="w-4 h-4 mt-0.5 text-ink-400 shrink-0"
                  />
                  <span className="text-ink-700">{n.text}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
