"use client";

import { useState } from "react";
import { Sparkles, Lightbulb, Wand2, MessageSquareHeart, Percent, RefreshCcw, Check } from "lucide-react";
import { PageHeader } from "@/components/ui";
import {
  aiFeatures as initialFeatures,
  salesForecast,
  aiInsights,
  promoMenus,
  promoTones,
  promoTemplates,
  reviewSentiment,
  seasonSuggestions,
} from "@/lib/data";

const reportTabs = ["매출 예측", "프로모션 문구 생성", "리뷰 감성분석", "시즌 할인 제안"] as const;

export default function AiFeaturesPage() {
  const [features, setFeatures] = useState(initialFeatures);
  const [reportTab, setReportTab] = useState<(typeof reportTabs)[number]>("매출 예측");
  const max = Math.max(...salesForecast.map((d) => d.value));
  const total = 7850000;

  // 프로모션 문구 생성 상태
  const [promoMenu, setPromoMenu] = useState(promoMenus[0]);
  const [promoTone, setPromoTone] = useState<(typeof promoTones)[number]>(promoTones[0]);
  const [generatedPromo, setGeneratedPromo] = useState<string | null>(null);

  // 시즌 할인 제안 상태
  const [appliedIds, setAppliedIds] = useState<string[]>([]);

  const toggle = (id: string) =>
    setFeatures((prev) =>
      prev.map((f) => (f.id === id ? { ...f, enabled: !f.enabled } : f)),
    );

  const generatePromo = () => {
    const match =
      promoTemplates.find((t) => t.menu === promoMenu && t.tone === promoTone) ??
      promoTemplates.find((t) => t.menu === promoMenu) ??
      promoTemplates[Math.floor(Math.random() * promoTemplates.length)];
    setGeneratedPromo(match.text);
  };

  const applySeasonSuggestion = (id: string) => {
    setAppliedIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

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
              <span className="flex items-center gap-1.5 text-sm font-bold text-black">
                <Sparkles size={14} className="text-brand-500" /> {f.name}
              </span>
              <span className="badge bg-brand-50 text-[10px] text-brand-600">
                AI
              </span>
            </div>
            <p className="mb-4 text-xs text-black">{f.desc}</p>
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
            <span className="ml-2 align-middle text-xs text-black">
              {f.enabled ? "활성화" : "비활성화"}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 xl:grid-cols-[1fr_320px]">
        <div className="card p-5">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <h3 className="font-bold text-black">AI 분석 리포트</h3>
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
                    : "bg-slate-50 text-black hover:bg-slate-100"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {reportTab === "매출 예측" && (
            <>
              <p className="text-xs text-black">이번 주 매출 예측</p>
              <p className="mb-4 text-2xl font-bold text-black">
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
                    <span className="text-[11px] text-black">{d.day}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          {reportTab === "프로모션 문구 생성" && (
            <div>
              <p className="mb-3 flex items-center gap-1.5 text-xs text-black/60">
                <Wand2 size={13} className="text-brand-500" /> 메뉴와 톤을 선택하면 AI가 홍보 문구를 만들어드려요.
              </p>
              <div className="mb-3 grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs text-black/60">메뉴</label>
                  <select className="input" value={promoMenu} onChange={(e) => setPromoMenu(e.target.value)}>
                    {promoMenus.map((m) => (
                      <option key={m}>{m}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs text-black/60">문구 톤</label>
                  <select
                    className="input"
                    value={promoTone}
                    onChange={(e) => setPromoTone(e.target.value as (typeof promoTones)[number])}
                  >
                    {promoTones.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>
              <button onClick={generatePromo} className="btn-primary mb-4">
                <RefreshCcw size={14} /> 문구 생성
              </button>
              <div className="min-h-[88px] rounded-xl bg-brand-50/60 p-4 text-sm leading-relaxed text-black">
                {generatedPromo ?? "‘문구 생성’ 버튼을 눌러 AI가 만든 홍보 문구를 확인해 보세요."}
              </div>
            </div>
          )}

          {reportTab === "리뷰 감성분석" && (
            <div>
              <p className="mb-4 flex items-center gap-1.5 text-xs text-black/60">
                <MessageSquareHeart size={13} className="text-brand-500" /> 최근 7일 리뷰 감성 비율
              </p>
              <div className="mb-1 flex h-4 w-full overflow-hidden rounded-full bg-slate-100">
                <div className="bg-emerald-500" style={{ width: `${reviewSentiment.positive}%` }} />
                <div className="bg-amber-400" style={{ width: `${reviewSentiment.neutral}%` }} />
                <div className="bg-red-500" style={{ width: `${reviewSentiment.negative}%` }} />
              </div>
              <div className="mb-4 flex flex-wrap gap-4 text-xs text-black/70">
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" /> 긍정 {reviewSentiment.positive}%
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400" /> 보통 {reviewSentiment.neutral}%
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500" /> 부정 {reviewSentiment.negative}%
                </span>
              </div>

              <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <p className="mb-1.5 text-xs font-semibold text-black/60">긍정 키워드</p>
                  <div className="flex flex-wrap gap-1.5">
                    {reviewSentiment.positiveKeywords.map((k) => (
                      <span key={k} className="badge bg-emerald-50 text-emerald-600">
                        {k}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="mb-1.5 text-xs font-semibold text-black/60">부정 키워드</p>
                  <div className="flex flex-wrap gap-1.5">
                    {reviewSentiment.negativeKeywords.map((k) => (
                      <span key={k} className="badge bg-red-50 text-red-600">
                        {k}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-brand-50/60 p-3 text-sm leading-relaxed text-black">
                {reviewSentiment.summary}
              </div>
            </div>
          )}

          {reportTab === "시즌 할인 제안" && (
            <div className="space-y-3">
              <p className="mb-1 flex items-center gap-1.5 text-xs text-black/60">
                <Percent size={13} className="text-brand-500" /> 판매 데이터를 기반으로 AI가 시즌 할인 메뉴를 제안해요.
              </p>
              {seasonSuggestions.map((s) => (
                <div key={s.id} className="rounded-xl border border-slate-100 p-3">
                  <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-black">{s.menu}</span>
                      <span className="badge bg-brand-50 text-[10px] text-brand-600">{s.season}</span>
                    </div>
                    <span className="text-sm font-bold text-brand-600">{s.suggestedDiscount}% 할인 제안</span>
                  </div>
                  <p className="mb-2 text-xs text-black/60">{s.reason}</p>
                  <button
                    onClick={() => applySeasonSuggestion(s.id)}
                    disabled={appliedIds.includes(s.id)}
                    className="btn-secondary !py-1.5 !px-3 text-xs disabled:opacity-60"
                  >
                    {appliedIds.includes(s.id) ? (
                      <>
                        <Check size={13} className="text-emerald-600" /> 적용됨
                      </>
                    ) : (
                      "할인 적용하기"
                    )}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="card p-5">
          <h3 className="mb-3 flex items-center gap-1.5 font-bold text-black">
            <Lightbulb size={16} className="text-amber-400" /> AI 추천 인사이트
          </h3>
          <div className="space-y-3">
            {aiInsights.map((t, i) => (
              <div
                key={i}
                className="rounded-xl bg-brand-50/60 p-3 text-sm leading-relaxed text-black"
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
