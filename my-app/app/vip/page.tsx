"use client";

import { useState } from "react";
import { Search, Download, Users, UserPlus, CalendarCheck, Crown, Repeat2 } from "lucide-react";
import { PageHeader, StatCard, StatusBadge } from "@/components/ui";
import { customers, visitStats, gradeBenefits } from "@/lib/data";

const tabs = ["전체", "최근 방문", "VIP 고객", "이달 고객", "생일 고객"] as const;

export default function VipPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("전체");
  const [selected, setSelected] = useState(customers[0]);

  const filtered = tab === "VIP 고객" ? customers.filter((c) => c.grade === "VIP") : customers;

  return (
    <div>
      <PageHeader
        title="고객 방문·VIP 관리"
        desc="고객의 방문 이력과 등급을 관리하고 VIP 고객을 확인하세요."
        action={
          <button className="btn-secondary">
            <Download size={15} /> 엑셀 내보내기
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard label="전체 고객" value={`${visitStats.total.toLocaleString()}명`} sub="▲ 8.2% (지난 30일)" icon={Users} />
        <StatCard label="신규 고객" value={`${visitStats.newCustomers}명`} sub="▲ 12.4%" icon={UserPlus} tone="success" />
        <StatCard label="이번 달 방문 고객" value={`${visitStats.monthVisits.toLocaleString()}명`} sub="▲ 6.3%" icon={CalendarCheck} tone="warning" />
        <StatCard label="VIP 고객" value={`${visitStats.vip}명`} sub="▲ 3.1%" icon={Crown} tone="danger" />
        <StatCard label="재방문율" value={`${visitStats.revisitRate}%`} sub="▲ 4.5%" icon={Repeat2} />
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-[1fr_320px]">
        <div className="card p-4">
          <div className="mb-4 flex flex-wrap items-center gap-2">
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
            <div className="relative ml-auto w-56">
              <Search size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-black" />
              <input placeholder="이름, 휴대폰, 이메일 검색" className="input py-1.5 pl-8 text-xs" />
            </div>
          </div>

          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="table-th">고객 정보</th>
                <th className="table-th">등급</th>
                <th className="table-th">포인트</th>
                <th className="table-th">방문 횟수</th>
                <th className="table-th">최근 방문일</th>
                <th className="table-th">총 주문 금액</th>
                <th className="table-th">관리</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr
                  key={c.id}
                  onClick={() => setSelected(c)}
                  className={`cursor-pointer border-b border-slate-50 hover:bg-slate-50 ${selected.id === c.id ? "bg-brand-50/50" : ""}`}
                >
                  <td className="table-td">
                    <p className="font-medium text-black">{c.name}</p>
                    <p className="text-xs text-black">{c.phone}</p>
                  </td>
                  <td className="table-td">
                    <StatusBadge status={c.grade} />
                  </td>
                  <td className="table-td">{c.points.toLocaleString()}P</td>
                  <td className="table-td">{c.visits}회</td>
                  <td className="table-td text-black">{c.lastVisit}</td>
                  <td className="table-td font-medium">{c.total.toLocaleString()}원</td>
                  <td className="table-td">
                    <button className="text-xs font-medium text-brand-600">상세 보기</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card h-fit p-5">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-lg font-bold text-brand-600">
              {selected.name[0]}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <p className="font-bold text-black">{selected.name}</p>
                <StatusBadge status={selected.grade} />
              </div>
              <p className="text-xs text-black">{selected.email}</p>
            </div>
          </div>

          <div className="mb-5 grid grid-cols-3 gap-2 rounded-xl bg-slate-50 p-3 text-center">
            <div>
              <p className="text-xs text-black">포인트</p>
              <p className="text-sm font-bold text-black">{selected.points.toLocaleString()}P</p>
            </div>
            <div>
              <p className="text-xs text-black">방문 횟수</p>
              <p className="text-sm font-bold text-black">{selected.visits}회</p>
            </div>
            <div>
              <p className="text-xs text-black">총 주문 금액</p>
              <p className="text-sm font-bold text-black">₩{selected.total.toLocaleString()}</p>
            </div>
          </div>

          <p className="mb-2 text-xs font-semibold uppercase text-black">등급 혜택</p>
          <ul className="mb-5 space-y-1.5">
            {gradeBenefits.map((b) => (
              <li key={b} className="flex items-center gap-2 text-sm text-black">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-500" /> {b}
              </li>
            ))}
          </ul>

          <button className="btn-primary w-full">고객 상세 정보 보기</button>
        </div>
      </div>
    </div>
  );
}
