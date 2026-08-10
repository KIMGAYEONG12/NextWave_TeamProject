"use client";

import { useState } from "react";
import { Check, CreditCard } from "lucide-react";
import { PageHeader, Progress } from "@/components/ui";
import { currentPlan, usage, plans } from "@/lib/data";

export default function BillingPage() {
  const [selectedPlan, setSelectedPlan] = useState("pro");

  return (
    <div>
      <PageHeader title="요금제 관리" desc="현재 사용 중인 요금제와 결제 정보를 확인하고 관리하세요." />

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        {/* current plan */}
        <div className="card p-6">
          <p className="mb-1 text-xs font-semibold uppercase text-slate-400">현재 사용 중인 요금제</p>
          <h2 className="mb-1 text-xl font-bold text-slate-900">{currentPlan.name}</h2>
          <p className="mb-1 text-3xl font-extrabold text-brand-600">
            ₩{currentPlan.price.toLocaleString()}
            <span className="text-sm font-medium text-slate-400"> /월 (부가세 별도)</span>
          </p>
          <p className="mb-5 text-sm text-slate-500">
            매출 분석, 예약 관리, 멤버십, 마케팅 기능까지 모든 기능을 이용할 수 있는 요금제입니다.
          </p>
          <ul className="mb-6 space-y-2.5">
            {currentPlan.features.map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm text-slate-700">
                <Check size={15} className="shrink-0 text-brand-600" /> {f}
              </li>
            ))}
          </ul>
          <button className="btn-primary w-full">요금제 변경</button>
        </div>

        {/* payment info */}
        <div className="card p-6">
          <p className="mb-4 text-xs font-semibold uppercase text-slate-400">결제 정보</p>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-slate-500">결제 주기</dt>
              <dd className="font-medium text-slate-800">{currentPlan.cycle}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">다음 결제일</dt>
              <dd className="font-medium text-slate-800">{currentPlan.nextBillingDate}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">다음 결제 금액</dt>
              <dd className="font-medium text-slate-800">₩{currentPlan.nextBillingAmount.toLocaleString()} (부가세 별도)</dd>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2.5">
              <dt className="flex items-center gap-1.5 text-slate-500">
                <CreditCard size={14} /> 결제 수단
              </dt>
              <dd className="flex items-center gap-2 font-medium text-slate-800">
                {currentPlan.paymentMethod}
                <button className="text-xs font-semibold text-brand-600">변경</button>
              </dd>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2.5">
              <dt className="text-slate-500">청구 이메일</dt>
              <dd className="flex items-center gap-2 font-medium text-slate-800">
                {currentPlan.billingEmail}
                <button className="text-xs font-semibold text-brand-600">변경</button>
              </dd>
            </div>
          </dl>
          <a href="#" className="mt-4 inline-block text-xs font-medium text-brand-600">
            결제 내역 보기 →
          </a>

          <p className="mb-3 mt-6 text-xs font-semibold uppercase text-slate-400">이용량 현황 (이번 달)</p>
          <div className="space-y-3.5">
            {usage.map((u) => (
              <div key={u.label}>
                <div className="mb-1 flex justify-between text-xs text-slate-500">
                  <span>{u.label}</span>
                  <span className="font-medium text-slate-700">
                    {u.used}
                    {u.unit === "GB" ? "GB" : ""} / {u.total}
                    {u.unit === "GB" ? "GB" : u.unit}
                  </span>
                </div>
                <Progress value={u.used} max={u.total} tone={u.used / u.total > 0.85 ? "warning" : "brand"} />
              </div>
            ))}
          </div>
        </div>

        {/* compare plans */}
        <div className="card p-6">
          <p className="mb-4 text-xs font-semibold uppercase text-slate-400">다른 요금제 비교</p>
          <div className="space-y-3">
            {plans.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedPlan(p.id)}
                className={`w-full rounded-2xl border p-4 text-left transition ${
                  p.current
                    ? "border-brand-400 bg-brand-50/60 ring-1 ring-brand-300"
                    : selectedPlan === p.id
                    ? "border-brand-300"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="mb-1 flex items-center justify-between">
                  <span className="font-bold text-slate-900">{p.name}</span>
                  {p.current && <span className="badge bg-brand-600 text-white">✓ 현재 사용 중</span>}
                </div>
                <p className="mb-2 text-lg font-extrabold text-slate-900">
                  ₩{p.price.toLocaleString()}
                  <span className="text-xs font-medium text-slate-400">/월</span>
                </p>
                <ul className="space-y-1">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-1.5 text-xs text-slate-600">
                      <Check size={12} className="text-brand-500" /> {f}
                    </li>
                  ))}
                </ul>
              </button>
            ))}
          </div>
          <button className="btn-secondary mt-4 w-full">자세히 보기</button>
        </div>
      </div>
    </div>
  );
}
