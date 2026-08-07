"use client";
import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import Card from "@/components/Card";
import StatCard from "@/components/StatCard";
import StoreTabs from "@/components/StoreTabs";
import LineChart from "@/components/LineChart";
import Button from "@/components/Button";
import Icon from "@/components/icons";
import { salesTrend, topMenus } from "@/lib/mock-data";

type TabKey = "sales" | "reservation" | "customer" | "stock";

const paymentMix = [
  { label: "카드", pct: 68.4, color: "#2f5bd6" },
  { label: "간편결제", pct: 18.7, color: "#5b8def" },
  { label: "현금", pct: 8.6, color: "#b3ccff" },
  { label: "기타", pct: 4.3, color: "#e5e7eb" },
];

function Donut() {
  let acc = 0;
  const stops = paymentMix
    .map((p) => {
      const start = acc;
      acc += p.pct;
      return `${p.color} ${start}% ${acc}%`;
    })
    .join(", ");
  return (
    <div
      className="w-32 h-32 rounded-full mx-auto"
      style={{ background: `conic-gradient(${stops})` }}
    >
      <div className="w-[72px] h-[72px] rounded-full bg-white m-[28px] flex items-center justify-center text-[10px] text-ink-500 text-center leading-tight">
        총 매출<br />₩1,286,000
      </div>
    </div>
  );
}

const hourly = Array.from({ length: 15 }, (_, i) => ({
  hour: 7 + i,
  value: Math.round(20 + Math.random() * 80),
}));

export default function SalesPage() {
  const [tab, setTab] = useState<TabKey>("sales");

  return (
    <div className="p-6 md:p-8 max-w-[1400px] mx-auto">
      <PageHeader
        title="매출·리포트"
        subtitle="기간별 매출과 운영 지표를 확인하세요."
        action={
          <Button variant="outline" size="md">
            <Icon name="download" className="w-4 h-4" /> 다운로드
          </Button>
        }
      />

      <div className="mb-5">
        <StoreTabs
          tabs={[
            { key: "sales", label: "매출 리포트" },
            { key: "reservation", label: "예약 분석" },
            { key: "customer", label: "고객 분석" },
            { key: "stock", label: "재고 리포트" },
          ]}
          active={tab}
          onChange={setTab}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        <StatCard label="총 매출" value="₩1,286,000" delta="▲ 12.9%" deltaLabel="전주 대비" icon="sales" iconTone="blue" />
        <StatCard label="총 주문 수" value="482건" delta="▲ 8.3%" deltaLabel="전주 대비" icon="orders" iconTone="green" />
        <StatCard label="평균 주문 금액" value="₩7,650" delta="▲ 3.1%" deltaLabel="전주 대비" icon="pricing" iconTone="amber" />
        <StatCard label="신규 고객 수" value="86명" delta="▲ 15.2%" deltaLabel="전주 대비" icon="customers" iconTone="purple" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5 mb-5">
        <Card>
          <h3 className="text-sm font-semibold text-ink-800 mb-2">일별 매출 추이</h3>
          <LineChart data={salesTrend} />
        </Card>
        <Card>
          <h3 className="text-sm font-semibold text-ink-800 mb-4 text-center">결제 수단 비율</h3>
          <Donut />
          <div className="mt-5 space-y-2">
            {paymentMix.map((p) => (
              <div key={p.label} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-ink-600">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: p.color }} />
                  {p.label}
                </span>
                <span className="text-ink-800 font-medium">{p.pct}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-5">
        <Card>
          <h3 className="text-sm font-semibold text-ink-800 mb-3">인기 메뉴 TOP 5</h3>
          <div className="space-y-3">
            {topMenus.map((m) => (
              <div key={m.rank} className="flex items-center gap-3">
                <span className="w-5 text-xs font-semibold text-ink-400">{m.rank}</span>
                <span className="text-sm text-ink-700 w-28 shrink-0">{m.name}</span>
                <div className="flex-1 h-2 rounded-full bg-ink-100 overflow-hidden">
                  <div
                    className="h-full bg-brand-500 rounded-full"
                    style={{ width: `${100 - m.rank * 12}%` }}
                  />
                </div>
                <span className="text-xs text-ink-400 w-20 text-right">{m.sold}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="text-sm font-semibold text-ink-800 mb-3">시간대별 매출 분포</h3>
          <div className="flex items-end gap-1.5 h-32">
            {hourly.map((h) => (
              <div key={h.hour} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-t bg-brand-200"
                  style={{ height: `${h.value}%`, backgroundColor: h.value > 70 ? "#2f5bd6" : h.value > 40 ? "#84acff" : "#d9e6ff" }}
                />
                <span className="text-[9px] text-ink-400">{h.hour}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
