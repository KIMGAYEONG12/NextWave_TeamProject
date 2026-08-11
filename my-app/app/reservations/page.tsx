"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Plus, X, Check, Crown } from "lucide-react";
import { PageHeader, StatusBadge } from "@/components/ui";
import { reservations as initialReservations, reservationCounts, Reservation } from "@/lib/data";

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

function buildMonthGrid(year: number, month: number) {
  // month: 0-indexed
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();
  const cells: { day: number; current: boolean; dateKey: string }[] = [];

  for (let i = firstDay - 1; i >= 0; i--) {
    cells.push({ day: daysInPrevMonth - i, current: false, dateKey: "" });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    cells.push({ day: d, current: true, dateKey });
  }
  while (cells.length % 7 !== 0) {
    cells.push({ day: cells.length - (firstDay + daysInMonth) + 1, current: false, dateKey: "" });
  }
  return cells;
}

export default function ReservationsPage() {
  const [year] = useState(2026);
  const [month, setMonth] = useState(7); // August = index 7
  const [selectedDate, setSelectedDate] = useState("2026-08-07");
  const [reservations, setReservations] = useState<Reservation[]>(initialReservations);
  const [selected, setSelected] = useState<Reservation>(initialReservations[0]);
  const [showProModal, setShowProModal] = useState(false);

  const cells = useMemo(() => buildMonthGrid(year, month), [year, month]);
  const dayReservations = reservations.filter((r) => r.date === selectedDate);

  const setStatus = (status: Reservation["status"]) => {
    setReservations((prev) => prev.map((r) => (r.id === selected.id ? { ...r, status } : r)));
    setSelected((s) => ({ ...s, status }));
  };

  return (
    <div>
      <PageHeader
        title="예약 관리"
        desc="예약 현황을 확인하고 승인/거절을 관리하세요."
        action={
          <>
            <button onClick={() => setShowProModal(true)} className="btn-secondary">
              <Crown size={15} className="text-amber-500" /> 프로 기능 더 보기
            </button>
            <button className="btn-primary">
              <Plus size={16} /> 예약 추가
            </button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_360px]">
        {/* calendar */}
        <div className="card p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-bold text-black">
              {year}년 {month + 1}월
            </h3>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setMonth((m) => Math.max(0, m - 1))}
                className="rounded-lg border border-slate-200 p-1.5 hover:bg-slate-50"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => setMonth((m) => Math.min(11, m + 1))}
                className="rounded-lg border border-slate-200 p-1.5 hover:bg-slate-50"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {WEEKDAYS.map((w) => (
              <div key={w} className="pb-1 text-center text-xs font-semibold text-black">
                {w}
              </div>
            ))}
            {cells.map((c, idx) => {
              const count = c.current ? reservationCounts[c.dateKey] ?? 0 : 0;
              const isSelected = c.current && c.dateKey === selectedDate;
              return (
                <button
                  key={idx}
                  disabled={!c.current}
                  onClick={() => c.current && setSelectedDate(c.dateKey)}
                  className={`flex h-24 flex-col items-start gap-1.5 rounded-xl border p-2 text-left transition ${
                    !c.current
                      ? "border-transparent text-black"
                      : isSelected
                      ? "border-brand-400 bg-brand-50 ring-2 ring-brand-100"
                      : "border-slate-100 hover:bg-slate-50"
                  }`}
                >
                  <span className={`text-sm font-semibold ${isSelected ? "text-brand-700" : "text-black"}`}>
                    {c.day}
                  </span>
                  {count > 0 && (
                    <span className="rounded-md bg-brand-100 px-1.5 py-0.5 text-[11px] font-semibold text-brand-700">
                      예약 {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* side: day list + detail */}
        <div className="space-y-5">
          <div className="card p-4">
            <h3 className="mb-3 px-1 text-sm font-bold text-black">
              {month + 1}월 {Number(selectedDate.split("-")[2])}일 예약 목록
            </h3>
            <div className="space-y-2">
              {dayReservations.length === 0 && (
                <p className="px-1 py-6 text-center text-sm text-black">예약이 없습니다.</p>
              )}
              {dayReservations.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setSelected(r)}
                  className={`flex w-full items-center justify-between rounded-xl border p-3 text-left transition ${
                    selected.id === r.id ? "border-brand-300 bg-brand-50" : "border-slate-100 hover:bg-slate-50"
                  }`}
                >
                  <div>
                    <p className="text-sm font-semibold text-black">
                      {r.time} · {r.name}
                    </p>
                    <p className="text-xs text-black">{r.people}명</p>
                  </div>
                  <StatusBadge status={r.status} />
                </button>
              ))}
            </div>
          </div>

          {dayReservations.length > 0 && (
            <div className="card p-5">
              <h3 className="mb-3 text-sm font-bold text-black">예약 상세</h3>
              <dl className="space-y-2.5 text-sm">
                <Row label="예약 번호" value={selected.id} />
                <Row label="예약 고객" value={`${selected.name} (${selected.phone})`} />
                <Row label="예약 일시" value={`${selected.date} ${selected.time}`} />
                <Row label="인원" value={`${selected.people}명`} />
                <Row label="좌석" value={selected.seat} />
                <Row label="요청 사항" value={selected.request} />
                <div className="flex items-center justify-between pt-1">
                  <dt className="text-black">현재 상태</dt>
                  <dd>
                    <StatusBadge status={selected.status} />
                  </dd>
                </div>
              </dl>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => setStatus("거절")}
                  className="btn-secondary flex-1 !border-red-200 !text-red-600 hover:!bg-red-50"
                >
                  거절
                </button>
                <button onClick={() => setStatus("승인")} className="btn-primary flex-1">
                  승인하기
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {showProModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          {/* opaque backdrop fully covers the calendar behind — prevents any text bleed-through */}
          <div className="absolute inset-0 bg-slate-900/60" onClick={() => setShowProModal(false)} />
          <div className="relative z-10 max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-popover">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-black">프로 기능 더 보기</h3>
              <button onClick={() => setShowProModal(false)} className="rounded-lg p-1 text-black hover:bg-slate-100">
                <X size={18} />
              </button>
            </div>
            <p className="mb-5 text-sm leading-relaxed text-black">
              현재 <span className="font-semibold text-black">멤버십</span> 요금제에서 이용 중인 기능입니다.
            </p>

            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-black">멤버십 포함 기능</p>
            <ul className="mb-6 space-y-2">
              {["모든 기본 기능", "고급 매출 분석", "예약 관리", "멤버십(포인트, 쿠폰)", "마케팅 기능(쿠폰, 알림)", "블로그(CMS)", "SEO 관리", "우선 고객 지원"].map(
                (f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-black">
                    <Check size={15} className="text-brand-600" /> {f}
                  </li>
                )
              )}
            </ul>

            <div className="flex justify-end gap-2">
              <button onClick={() => setShowProModal(false)} className="btn-secondary">
                닫기
              </button>
              <a href="/billing" className="btn-primary">
                요금제 관리로 이동
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="shrink-0 text-black">{label}</dt>
      <dd className="text-right font-medium text-black">{value}</dd>
    </div>
  );
}
