"use client";

import { useState } from "react";
import { RefreshCcw } from "lucide-react";
import { PageHeader } from "@/components/ui";
import { seats as initialSeats, Seat } from "@/lib/data";

const toneMap: Record<Seat["status"], string> = {
  사용중: "bg-red-400 border-red-500 text-white",
  예약됨: "bg-amber-300 border-amber-400 text-amber-900",
  비어있음: "bg-emerald-100 border-emerald-300 text-emerald-800",
  청소중: "bg-slate-200 border-slate-300 text-slate-500",
};

const legend: { label: Seat["status"]; swatch: string }[] = [
  { label: "사용중", swatch: "bg-red-400" },
  { label: "예약됨", swatch: "bg-amber-300" },
  { label: "비어있음", swatch: "bg-emerald-100 border border-emerald-300" },
  { label: "청소중", swatch: "bg-slate-200" },
];

export default function SeatsPage() {
  const [seats, setSeats] = useState<Seat[]>(initialSeats);
  const [selected, setSelected] = useState<Seat>(initialSeats[1]);

  const counts = {
    total: seats.length,
    used: seats.filter((s) => s.status === "사용중").length,
    reserved: seats.filter((s) => s.status === "예약됨").length,
    empty: seats.filter((s) => s.status === "비어있음").length,
  };

  const cycle = (id: string) => {
    const order: Seat["status"][] = ["비어있음", "사용중", "예약됨", "청소중"];
    setSeats((prev) =>
      prev.map((s) => {
        if (s.id !== id) return s;
        const next = order[(order.indexOf(s.status) + 1) % order.length];
        return { ...s, status: next };
      })
    );
  };

  return (
    <div>
      <PageHeader
        title="실시간 좌석 현황"
        desc="매장 좌석 상태를 실시간으로 관리하세요."
        action={
          <button className="btn-secondary" onClick={() => setSeats(initialSeats)}>
            <RefreshCcw size={14} /> 새로고침
          </button>
        }
      />

      <div className="mb-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="card p-4">
          <p className="text-xs text-slate-500">전체 좌석</p>
          <p className="mt-1 text-xl font-bold text-slate-900">{counts.total}석</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-slate-500">사용 중</p>
          <p className="mt-1 text-xl font-bold text-red-500">
            {counts.used}석 <span className="text-sm text-slate-400">({Math.round((counts.used / counts.total) * 100)}%)</span>
          </p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-slate-500">예약됨</p>
          <p className="mt-1 text-xl font-bold text-amber-500">
            {counts.reserved}석{" "}
            <span className="text-sm text-slate-400">({Math.round((counts.reserved / counts.total) * 100)}%)</span>
          </p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-slate-500">이용 가능</p>
          <p className="mt-1 text-xl font-bold text-emerald-500">
            {counts.empty}석{" "}
            <span className="text-sm text-slate-400">({Math.round((counts.empty / counts.total) * 100)}%)</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_320px]">
        <div className="card p-6">
          <div className="mb-4 flex items-center gap-4">
            <select className="input w-40">
              <option>강남점</option>
              <option>대구점</option>
              <option>홍대점</option>
            </select>
            <div className="ml-auto flex items-center gap-4 text-xs text-slate-500">
              {legend.map((l) => (
                <span key={l.label} className="flex items-center gap-1.5">
                  <span className={`h-3 w-3 rounded ${l.swatch}`} /> {l.label}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-slate-50 p-6">
            <div className="grid grid-cols-4 gap-4 sm:grid-cols-5">
              {seats.map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    setSelected(s);
                  }}
                  onDoubleClick={() => cycle(s.id)}
                  className={`flex aspect-square flex-col items-center justify-center rounded-xl border-2 text-sm font-bold transition hover:-translate-y-0.5 hover:shadow-md ${
                    toneMap[s.status]
                  } ${selected.id === s.id ? "ring-2 ring-offset-2 ring-brand-400" : ""}`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
          <p className="mt-3 text-center text-xs text-slate-400">* 좌석을 클릭하면 상세 정보를, 더블클릭하면 상태를 변경합니다.</p>
        </div>

        <div className="card h-fit p-5">
          <h3 className="mb-3 text-sm font-bold text-slate-900">좌석 정보</h3>
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm text-slate-500">좌석 {selected.label}</span>
            <span
              className={`badge ${
                selected.status === "사용중"
                  ? "bg-red-50 text-red-600"
                  : selected.status === "예약됨"
                  ? "bg-amber-50 text-amber-600"
                  : selected.status === "청소중"
                  ? "bg-slate-100 text-slate-500"
                  : "bg-emerald-50 text-emerald-600"
              }`}
            >
              {selected.status}
            </span>
          </div>
          {selected.status === "사용중" ? (
            <dl className="space-y-2.5 text-sm">
              <div className="flex justify-between">
                <dt className="text-slate-500">이용 고객</dt>
                <dd className="font-medium text-slate-800">
                  {selected.guest} ({selected.people}명)
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">입장 시간</dt>
                <dd className="font-medium text-slate-800">{selected.since}</dd>
              </div>
            </dl>
          ) : (
            <p className="text-sm text-slate-400">현재 이용 정보가 없습니다.</p>
          )}
          <select className="input mt-5">
            <option>좌석 상태 변경</option>
            <option>비어있음</option>
            <option>사용중</option>
            <option>예약됨</option>
            <option>청소중</option>
          </select>
        </div>
      </div>
    </div>
  );
}
