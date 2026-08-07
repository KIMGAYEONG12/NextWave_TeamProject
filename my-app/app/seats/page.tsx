"use client";
import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import Card from "@/components/Card";
import Select from "@/components/Select";
import Button from "@/components/Button";
import { seatData } from "@/lib/mock-data";

const statusStyle: Record<string, string> = {
  empty: "bg-white border-ink-200 text-ink-500",
  used: "bg-red-500 border-red-500 text-white",
  reserved: "bg-amber-400 border-amber-400 text-white",
  cleaning: "bg-ink-300 border-ink-300 text-white",
};

const statusLabel: Record<string, string> = {
  empty: "비어 있음",
  used: "사용 중",
  reserved: "예약됨",
  cleaning: "청소 중",
};

export default function SeatsPage() {
  const [selected, setSelected] = useState(seatData[6]);
  const usedCount = seatData.filter((s) => s.status === "used").length;
  const reservedCount = seatData.filter((s) => s.status === "reserved").length;

  return (
    <div className="p-6 md:p-8 max-w-[1400px] mx-auto">
      <PageHeader title="실시간 좌석 현황" subtitle="매장 좌석 사용 현황을 실시간으로 확인하세요." />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5">
        <Card>
          <div className="flex items-center justify-between mb-4">
            <Select className="w-40" defaultValue="gangnam">
              <option value="gangnam">강남점</option>
            </Select>
            <div className="flex items-center gap-4 text-xs text-ink-500">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-500" /> 사용 중</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> 예약됨</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-white border border-ink-300" /> 비어 있음</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-ink-300" /> 청소 중</span>
            </div>
          </div>
          <div className="rounded-2xl bg-ink-50 p-8">
            <div className="grid grid-cols-5 gap-4 max-w-xl mx-auto">
              {seatData.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelected(s)}
                  className={`aspect-square rounded-xl border-2 flex items-center justify-center text-sm font-semibold shadow-sm transition-transform hover:-translate-y-0.5 ${
                    statusStyle[s.status]
                  } ${selected.id === s.id ? "ring-2 ring-brand-400 ring-offset-2" : ""}`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
          <p className="text-xs text-ink-400 mt-3">* 좌석을 클릭하면 상세 정보를 확인할 수 있습니다.</p>
        </Card>

        <div className="space-y-5">
          <Card>
            <h3 className="text-sm font-semibold text-ink-800 mb-3">좌석 정보</h3>
            <p className="text-lg font-bold text-ink-900 mb-1">좌석 {selected.label}</p>
            <p className="text-sm text-ink-500 mb-4">{statusLabel[selected.status]}</p>
            {selected.status === "used" && (
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between"><dt className="text-ink-500">이용 고객</dt><dd className="text-ink-800">박*헌 (2명)</dd></div>
                <div className="flex justify-between"><dt className="text-ink-500">입장 시간</dt><dd className="text-ink-800">13:20</dd></div>
                <div className="flex justify-between"><dt className="text-ink-500">주문 내역</dt><dd className="text-ink-800">바닐라 라떼 외 1</dd></div>
              </dl>
            )}
            {selected.status !== "used" && (
              <p className="text-sm text-ink-400">현재 이용 중인 고객 정보가 없습니다.</p>
            )}
            <Select className="w-full mt-4" defaultValue={selected.status}>
              <option value="empty">비어 있음</option>
              <option value="used">사용 중</option>
              <option value="reserved">예약됨</option>
              <option value="cleaning">청소 중</option>
            </Select>
            <Button className="w-full mt-2">좌석 상태 변경</Button>
          </Card>

          <Card>
            <p className="text-sm text-ink-500 mb-1">전체 좌석</p>
            <p className="text-2xl font-bold text-ink-900 mb-3">{seatData.length}석</p>
            <div className="flex justify-between text-sm py-1.5 border-t border-ink-50">
              <span className="text-ink-500">사용 중</span>
              <span className="font-medium text-red-500">{usedCount}석 ({Math.round((usedCount / seatData.length) * 100)}%)</span>
            </div>
            <div className="flex justify-between text-sm py-1.5 border-t border-ink-50">
              <span className="text-ink-500">예약됨</span>
              <span className="font-medium text-amber-500">{reservedCount}석 ({Math.round((reservedCount / seatData.length) * 100)}%)</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
