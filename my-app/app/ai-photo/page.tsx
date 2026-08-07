"use client";
import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import Card from "@/components/Card";
import StoreTabs from "@/components/StoreTabs";
import Button from "@/components/Button";
import Icon from "@/components/icons";

type TabKey = "retouch" | "history";

const recent = [
  { name: "아메리카노", time: "2026.08.07 13:30" },
  { name: "카페라떼", time: "2026.08.07 13:25" },
  { name: "바닐라 라떼", time: "2026.08.07 13:20" },
  { name: "크루아상", time: "2026.08.07 13:15" },
  { name: "딸기 에이드", time: "2026.08.07 13:10" },
];

export default function AiPhotoPage() {
  const [tab, setTab] = useState<TabKey>("retouch");

  return (
    <div className="p-6 md:p-8 max-w-[1400px] mx-auto">
      <PageHeader
        title="AI 메뉴 사진 보정"
        subtitle="AI가 메뉴 사진의 밝기, 색감, 신선도를 자동으로 보정해드립니다."
        action={
          <Button variant="outline" size="md">
            <Icon name="ai" className="w-4 h-4" /> 사용 가이드
          </Button>
        }
      />

      <div className="flex items-center justify-between mb-5">
        <StoreTabs
          tabs={[
            { key: "retouch", label: "보정하기" },
            { key: "history", label: "보정 내역" },
          ]}
          active={tab}
          onChange={setTab}
        />
        <p className="text-xs text-ink-400">이번 달 사용함 24 / 100</p>
      </div>

      {tab === "retouch" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
          <Card>
            <div className="border-2 border-dashed border-ink-200 rounded-xl flex flex-col items-center justify-center py-14 text-center">
              <div className="w-12 h-12 rounded-full bg-brand-50 text-brand-500 flex items-center justify-center mb-3">
                <Icon name="upload" className="w-6 h-6" />
              </div>
              <p className="text-sm text-ink-600 mb-1">사진을 드래그하거나 클릭하여 업로드</p>
              <p className="text-xs text-ink-400 mb-4">JPG, PNG 파일 (최대 10MB)</p>
              <Button size="sm">파일 선택</Button>
            </div>
            <p className="text-xs text-ink-400 mt-3">⚠ 최대 10장까지 한 번에 업로드가 가능합니다.</p>
          </Card>

          <Card>
            <h3 className="text-sm font-semibold text-ink-800 mb-4">보정 미리보기</h3>
            <div className="grid grid-cols-2 gap-3 items-center">
              <div>
                <p className="text-xs text-ink-400 mb-1.5">원본 사진</p>
                <div className="aspect-square rounded-xl bg-ink-100 flex items-center justify-center text-4xl">☕</div>
              </div>
              <div>
                <p className="text-xs text-ink-400 mb-1.5">AI 보정 결과</p>
                <div className="aspect-square rounded-xl bg-gradient-to-br from-amber-100 to-amber-50 flex items-center justify-center text-4xl">☕</div>
              </div>
            </div>
            <Button className="w-full mt-4">
              <Icon name="download" className="w-4 h-4" /> 다운로드
            </Button>
          </Card>
        </div>
      )}

      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-ink-800">최근 보정 내역</h3>
          <a href="#" className="text-xs text-brand-600 font-medium">전체 보정 내역 보기 →</a>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {recent.map((r) => (
            <div key={r.name} className="rounded-xl border border-ink-100 overflow-hidden">
              <div className="aspect-square bg-ink-50 flex items-center justify-center text-3xl relative group">
                ☕
                <button className="absolute bottom-1.5 right-1.5 w-6 h-6 rounded-full bg-white shadow flex items-center justify-center text-ink-500">
                  <Icon name="download" className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="px-2.5 py-2">
                <p className="text-xs font-medium text-ink-700 truncate">{r.name}</p>
                <p className="text-[10px] text-ink-400">{r.time}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
