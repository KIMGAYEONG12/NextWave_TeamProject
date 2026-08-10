"use client";

import { useState } from "react";
import { Plus, Users, Coins, TrendingUp, Ticket } from "lucide-react";
import { PageHeader, StatCard, StatusBadge } from "@/components/ui";
import { membershipStats, coupons } from "@/lib/data";

export default function MembershipPage() {
  const [rate, setRate] = useState(3);
  const [minPoint, setMinPoint] = useState(1000);
  const [restrict, setRestrict] = useState(false);

  return (
    <div>
      <PageHeader title="멤버십 (포인트·쿠폰)" desc="포인트 적립 정책을 설정하고 쿠폰을 발급/관리하세요." />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="총 회원 수" value={`${membershipStats.totalMembers.toLocaleString()}명`} sub="▲ 12명 (이번 주)" icon={Users} />
        <StatCard label="보유 포인트 합계" value={`${membershipStats.totalPoints.toLocaleString()}P`} sub="▲ 8,230P (이번 주)" icon={Coins} tone="success" />
        <StatCard label="이번 달 사용 포인트" value={`${membershipStats.monthUsedPoints.toLocaleString()}P`} sub="▲ 18%" icon={TrendingUp} tone="warning" />
        <StatCard label="쿠폰 사용률" value={`${membershipStats.couponRate}%`} sub="▲ 5%" icon={Ticket} tone="danger" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 xl:grid-cols-[360px_1fr]">
        <div className="card p-5">
          <h3 className="mb-4 font-bold text-slate-900">포인트 적립 정책</h3>
          <label className="mb-1 block text-xs text-slate-500">적립률</label>
          <div className="mb-4 flex items-center gap-2">
            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="input w-24"
            />
            <span className="text-sm text-slate-500">% 결제 금액 대비</span>
          </div>
          <label className="mb-1 block text-xs text-slate-500">최소 사용 가능 포인트</label>
          <div className="mb-4 flex items-center gap-2">
            <input
              type="number"
              value={minPoint}
              onChange={(e) => setMinPoint(Number(e.target.value))}
              className="input w-32"
            />
            <span className="text-sm text-slate-500">P</span>
          </div>
          <label className="mb-5 flex items-center gap-2 text-sm text-slate-600">
            <input type="checkbox" checked={restrict} onChange={(e) => setRestrict(e.target.checked)} className="h-4 w-4 rounded border-slate-300" />
            쿠폰 + 포인트 중복 사용 제한 (동시 사용 끄기)
          </label>
          <button className="btn-primary w-full">정책 저장</button>
        </div>

        <div className="card p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-bold text-slate-900">쿠폰 관리</h3>
            <button className="btn-primary">
              <Plus size={15} /> 쿠폰 발급
            </button>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="table-th">쿠폰명</th>
                <th className="table-th">할인 내용</th>
                <th className="table-th">발급 대상</th>
                <th className="table-th">사용 기간</th>
                <th className="table-th">상태</th>
                <th className="table-th">사용 수</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((c) => (
                <tr key={c.id} className="border-b border-slate-50 hover:bg-slate-50">
                  <td className="table-td font-medium text-slate-800">{c.name}</td>
                  <td className="table-td text-brand-600">{c.discount}</td>
                  <td className="table-td text-slate-500">{c.target}</td>
                  <td className="table-td text-slate-500">{c.period}</td>
                  <td className="table-td">
                    <StatusBadge status={c.status} />
                  </td>
                  <td className="table-td text-slate-500">{c.used}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <a href="#" className="mt-3 inline-block text-xs font-medium text-brand-600">
            전체 쿠폰 보기 →
          </a>
        </div>
      </div>
    </div>
  );
}
