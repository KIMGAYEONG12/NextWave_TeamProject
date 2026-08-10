"use client";
import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import Card from "@/components/Card";
import StoreTabs from "@/components/StoreTabs";
import Button from "@/components/Button";
import Icon from "@/components/icons";
import LineChart from "@/components/LineChart";
import { aiFeatures, salesTrend } from "@/lib/mock-data";

type TabKey = "sales" | "menu" | "review" | "stock";

const insights = [
  {
    icon: "reservation" as const,
    text: "금요일 오후 2-4시에 매출이 가장 높을 것으로 예상돼요.",
    sub: "지난 4주 데이터 기반 예측",
  },
  {
    icon: "sales" as const,
    text: "딸기 음료의 판매가 증가할 것으로 예상돼요.",
    sub: "최근 3주 판매 데이터 분석",
  },
  {
    icon: "ai" as const,
    text: "월요일 오전 매출이 낮아요.",
    sub: "프로모션 추천 드립니다.",
  },
];

export default function AiSettingsPage() {
  const [tab, setTab] = useState<TabKey>("sales");
  const [features, setFeatures] = useState(aiFeatures);

  return (
    <div className="p-6 md:p-8 max-w-[1400px] mx-auto">
      <PageHeader
        title="AI 기능 관리"
        subtitle="AI 기반 분석 및 자동화 기능을 설정하고 활용할 수 있습니다."
        action={
          <Button variant="outline" size="md">
            <Icon name="ai" className="w-4 h-4" /> 사용 가이드 보기
          </Button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        {features.map((f, i) => (
          <Card key={f.name}>
            <div className="flex items-center justify-between mb-2">
              <span className="flex items-center gap-1.5 text-sm font-semibold text-ink-800">
                <span className="text-[10px] bg-brand-50 text-brand-600 rounded px-1.5 py-0.5">
                  AI
                </span>
                {f.name}
              </span>
            </div>
            <p className="text-xs text-ink-500 mb-4 h-8">{f.desc}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-ink-500">
                {f.enabled ? "활성화됨" : "비활성화"}
              </span>
              <button
                onClick={() =>
                  setFeatures((prev) =>
                    prev.map((x, idx) =>
                      idx === i ? { ...x, enabled: !x.enabled } : x,
                    ),
                  )
                }
                className={`w-9 h-5 rounded-full relative transition-colors ${f.enabled ? "bg-brand-600" : "bg-ink-200"}`}
              >
                <span
                  className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${f.enabled ? "translate-x-4" : "translate-x-0.5"}`}
                />
              </button>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-5">
        <Card>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-ink-800">
              AI 분석 리포트
            </h3>
          </div>
          <div className="mb-4">
            <StoreTabs
              tabs={[
                { key: "sales", label: "매출 예측 리포트" },
                { key: "menu", label: "메뉴 추천 리포트" },
                { key: "review", label: "리뷰 분석 리포트" },
                { key: "stock", label: "재고 예측 리포트" },
              ]}
              active={tab}
              onChange={setTab}
            />
          </div>
          <div className="flex items-center justify-between mb-1">
            <div>
              <p className="text-xs text-ink-400">이번 주 매출 예측</p>
              <p className="text-2xl font-bold text-ink-900">
                ₩7,850,000{" "}
                <span className="text-emerald-600 text-sm font-medium">
                  ▲ 12.5%
                </span>
              </p>
              <p className="text-xs text-ink-400">지난 주 대비</p>
            </div>
          </div>
          <LineChart
            data={salesTrend.map((s) => ({
              day: s.day.split("(")[0],
              value: s.value * 8.4,
            }))}
          />
        </Card>

        <Card>
          <h3 className="text-sm font-semibold text-ink-800 mb-4">
            AI 추천 인사이트
          </h3>
          <div className="space-y-3">
            {insights.map((ins, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-xl bg-ink-50 p-3"
              >
                <div className="w-8 h-8 rounded-lg bg-brand-100 text-brand-600 flex items-center justify-center shrink-0">
                  <Icon name={ins.icon} className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm text-ink-700">{ins.text}</p>
                  <p className="text-xs text-ink-400 mt-0.5">{ins.sub}</p>
                </div>
              </div>
            ))}
          </div>
          <a
            href="#"
            className="mt-4 inline-block text-xs text-brand-600 font-medium"
          >
            전체 리포트 보기 →
          </a>
        </Card>
      </div>
    </div>
  );
}
