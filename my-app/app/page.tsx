"use client";

import { TrendingUp, CalendarCheck2, PackageX, Star, CloudSun, ArrowRight } from "lucide-react";
import { PageHeader, StatCard, StatusBadge, Progress } from "@/components/ui";
import { salesTrend, popularMenu, todayReservations, recentReviews, alerts } from "@/lib/data";
import Link from "next/link";

export default function DashboardPage() {
  const max = Math.max(...salesTrend.map((d) => d.value));

  return (
    <div>
      <PageHeader title="안녕하세요, 사장님! 👋" desc="오늘도 OOO 커피의 성공적인 하루를 응원합니다." />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="오늘 예상 매출" value="₩66,000" sub="지난 7일 평균 대비 ▲ 8%" icon={TrendingUp} tone="brand" />
        <StatCard label="오늘 예약" value="3건" sub="2건 승인 대기 중" icon={CalendarCheck2} tone="success" />
        <StatCard label="재고 경고 품목" value="2개" sub="기존 수량 이하 품목" icon={PackageX} tone="warning" />
        <StatCard label="신규 리뷰" value="5개" sub="오늘 작성된 리뷰" icon={Star} tone="danger" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="card p-5 xl:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-bold text-slate-900">최근 7일 매출 추이</h2>
            <select className="input w-24 py-1.5 text-xs">
              <option>7일</option>
              <option>30일</option>
            </select>
          </div>
          <div className="flex h-56 items-end gap-3">
            {salesTrend.map((d) => (
              <div key={d.day} className="flex flex-1 flex-col items-center gap-2">
                <span className="text-xs font-semibold text-slate-500">
                  {d.value === max ? `${d.value.toLocaleString()}` : ""}
                </span>
                <div
                  className={`w-full rounded-t-lg ${d.value === max ? "bg-brand-600" : "bg-brand-200"}`}
                  style={{ height: `${(d.value / max) * 160}px` }}
                />
                <span className="text-[11px] text-slate-400">{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-5">
          <h2 className="mb-4 font-bold text-slate-900">지금 매장 상태</h2>
          <div className="mb-4 flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
            <span className="text-sm font-semibold text-emerald-600">여유</span>
          </div>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-slate-500">영업 시간</dt>
              <dd className="font-medium text-slate-800">08:00 ~ 21:00</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">노쇼 정책</dt>
              <dd className="font-medium text-slate-800">예약 60분 전까지 무료취소</dd>
            </div>
            <div>
              <div className="mb-1.5 flex justify-between">
                <dt className="text-slate-500">좌석 현황</dt>
                <dd className="font-medium text-slate-800">여유 (총 32석 / 사용 14석)</dd>
              </div>
              <Progress value={14} max={32} />
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-slate-500">오늘 날씨</dt>
              <dd className="flex items-center gap-1 font-medium text-slate-800">
                <CloudSun size={15} className="text-amber-400" /> 맑음 28°C
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="card p-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-bold text-slate-900">인기 메뉴 순위 (최근 7일)</h2>
            <Link href="/menu" className="flex items-center gap-1 text-xs font-medium text-brand-600">
              전체 보기 <ArrowRight size={12} />
            </Link>
          </div>
          <div className="space-y-3">
            {popularMenu.map((m) => (
              <div key={m.rank} className="flex items-center gap-3">
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                    m.rank === 1 ? "bg-amber-400 text-white" : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {m.rank}
                </span>
                <span className="flex-1 text-sm font-medium text-slate-700">{m.name}</span>
                <span className="text-sm text-slate-400">
                  판매 {m.qty}
                  {m.unit}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-bold text-slate-900">오늘 예약 현황</h2>
            <Link href="/reservations" className="flex items-center gap-1 text-xs font-medium text-brand-600">
              전체 보기 <ArrowRight size={12} />
            </Link>
          </div>
          <div className="space-y-3">
            {todayReservations.map((r, i) => (
              <div key={i} className="flex items-center gap-3 text-sm">
                <span className="w-12 font-semibold text-slate-700">{r.time}</span>
                <span className="flex-1 text-slate-600">{r.name}</span>
                <span className="text-xs text-slate-400">{r.people}명</span>
                <StatusBadge status={r.status} />
              </div>
            ))}
          </div>
        </div>

        <div className="card p-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-bold text-slate-900">최근 리뷰</h2>
            <Link href="/customers" className="flex items-center gap-1 text-xs font-medium text-brand-600">
              전체 보기 <ArrowRight size={12} />
            </Link>
          </div>
          <div className="space-y-4">
            {recentReviews.map((r, i) => (
              <div key={i} className="flex gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-50 text-sm font-semibold text-brand-600">
                  {r.name[0]}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-semibold text-slate-800">{r.name}</span>
                    <span className="flex items-center gap-0.5 text-xs font-semibold text-amber-500">
                      <Star size={12} className="fill-amber-400 text-amber-400" /> {r.rating}
                    </span>
                    <span className="ml-auto text-[11px] text-slate-400">{r.time}</span>
                  </div>
                  <p className="mt-0.5 text-xs text-slate-500">{r.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 card p-5">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-bold text-slate-900">주요 알림</h2>
          <Link href="/notifications" className="flex items-center gap-1 text-xs font-medium text-brand-600">
            전체 보기 <ArrowRight size={12} />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {alerts.map((a, i) => (
            <div
              key={i}
              className={`rounded-xl border p-3.5 ${
                a.level === "danger" ? "border-red-100 bg-red-50" : "border-amber-100 bg-amber-50"
              }`}
            >
              <p className={`text-sm font-semibold ${a.level === "danger" ? "text-red-700" : "text-amber-700"}`}>
                {a.title}
              </p>
              <p className="mt-0.5 text-xs text-slate-500">{a.desc}</p>
              <p className="mt-1.5 text-[11px] text-slate-400">{a.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
