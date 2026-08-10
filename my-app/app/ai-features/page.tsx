"use client";

import { useState } from "react";
import { Sparkles, Lightbulb } from "lucide-react";
import { PageHeader } from "@/components/ui";
import {
  aiFeatures as initialFeatures,
  salesForecast,
  aiInsights,
} from "@/lib/data";

const reportTabs = [
  "매출 예측 리포트",
  "메뉴 추천 리포트",
  "리뷰 분석 리포트",
  "재고 예측 리포트",
] as const;

export default function AiFeaturesPage() {
  const [features, setFeatures] = useState(initialFeatures);
  const [reportTab, setReportTab] =
    useState<(typeof reportTabs)[number]>("매출 예측 리포트");
  const max = Math.max(...salesForecast.map((d) => d.value));
  const total = 7850000;

  const toggle = (id: string) =>
    setFeatures((prev) =>
      prev.map((f) => (f.id === id ? { ...f, enabled: !f.enabled } : f)),
    );

  return (
    <div>
      <PageHeader
        title="AI 기능 관리"
        desc="AI 기반 분석 및 자동화 기능을 설정하고 활용하세요."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {features.map((f) => (
          <div key={f.id} className="card p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-sm font-bold text-slate-800">
                <Sparkles size={14} className="text-brand-500" /> {f.name}
              </span>
              <span className="badge bg-brand-50 text-[10px] text-brand-600">
                AI
              </span>
            </div>
            <p className="mb-4 text-xs text-slate-800">{f.desc}</p>
            <button
              onClick={() => toggle(f.id)}
              className={`relative h-6 w-11 rounded-full transition ${f.enabled ? "bg-brand-600" : "bg-slate-200"}`}
            >
              <span
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition ${
                  f.enabled ? "left-[22px]" : "left-0.5"
                }`}
              />
            </button>
            <span className="ml-2 align-middle text-xs text-slate-500">
              {f.enabled ? "활성화" : "비활성화"}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 xl:grid-cols-[1fr_320px]">
        <div className="card p-5">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <h3 className="font-bold text-slate-900">AI 분석 리포트</h3>
            <select className="input w-28 py-1.5 text-xs">
              <option>이번 주</option>
              <option>지난 주</option>
            </select>
          </div>
          <div className="mb-4 flex flex-wrap gap-2">
            {reportTabs.map((t) => (
              <button
                key={t}
                onClick={() => setReportTab(t)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium ${
                  reportTab === t
                    ? "bg-brand-600 text-white"
                    : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {reportTab === "매출 예측 리포트" ? (
            <>
              <p className="text-xs text-slate-400">이번 주 매출 예측</p>
              <p className="mb-4 text-2xl font-bold text-slate-900">
                ₩{total.toLocaleString()}{" "}
                <span className="text-sm font-medium text-emerald-600">
                  ▲ 12.5% 지난 대비
                </span>
              </p>
              <div className="flex h-48 items-end gap-3">
                {salesForecast.map((d) => (
                  <div
                    key={d.day}
                    className="group relative flex flex-1 flex-col items-center gap-2"
                  >
                    {d.highlight && (
                      <span className="absolute -top-9 rounded-lg bg-navy-950 px-2 py-1 text-[10px] font-semibold text-white">
                        {d.day} 예상 매출 {d.value.toLocaleString()}원
                      </span>
                    )}
                    <div
                      className={`w-full rounded-t-lg ${d.highlight ? "bg-brand-600" : "bg-brand-200"}`}
                      style={{ height: `${(d.value / max) * 140}px` }}
                    />
                    <span className="text-[11px] text-slate-400">{d.day}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="py-16 text-center text-sm text-slate-400">
              {reportTab} 데이터를 분석 중입니다.
            </p>
          )}
        </div>

        <div className="card p-5">
          <h3 className="mb-3 flex items-center gap-1.5 font-bold text-slate-900">
            <Lightbulb size={16} className="text-amber-400" /> AI 추천 인사이트
          </h3>
          <div className="space-y-3">
            {aiInsights.map((t, i) => (
              <div
                key={i}
                className="rounded-xl bg-brand-50/60 p-3 text-sm leading-relaxed text-slate-700"
              >
                {t}
              </div>
            ))}
          </div>
          <a
            href="#"
            className="mt-4 inline-block text-xs font-medium text-brand-600"
          >
            전체 리포트 보기 →
          </a>
        </div>
      </div>
    </div>
  );
}
