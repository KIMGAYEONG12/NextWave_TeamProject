"use client";
import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import Card from "@/components/Card";
import Select from "@/components/Select";
import Button from "@/components/Button";
import { useToast } from "@/components/Toast";
import {
  seatData as initialSeatData,
  patioSeats as initialPatioSeats,
  stores,
} from "@/lib/mock-data";

type Status = "empty" | "used" | "reserved" | "cleaning";

const statusStyle: Record<Status, string> = {
  used: "bg-red-500 border-red-500 text-white",
  reserved: "bg-amber-400 border-amber-400 text-white",
  empty: "bg-emerald-500 border-emerald-500 text-white",
  cleaning: "bg-ink-300 border-ink-300 text-white",
};

const statusLabel: Record<Status, string> = {
  used: "사용 중",
  reserved: "예약됨",
  empty: "빈자리",
  cleaning: "청소 중",
};

const legend: { status: Status; label: string }[] = [
  { status: "used", label: "사용 중" },
  { status: "reserved", label: "예약석" },
  { status: "empty", label: "빈자리" },
  { status: "cleaning", label: "청소 중" },
];

function SeatButton({
  label,
  status,
  isSelected,
  onClick,
}: {
  label: string;
  status: Status;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`aspect-square w-full rounded-xl border-2 flex items-center justify-center text-sm font-semibold shadow-sm transition-transform hover:-translate-y-0.5 ${statusStyle[status]} ${
        isSelected ? "ring-2 ring-brand-500 ring-offset-2" : ""
      }`}
    >
      {label}
    </button>
  );
}

export default function SeatsPage() {
  const { show } = useToast();
  const [seats, setSeats] = useState(
    initialSeatData as {
      id: number;
      label: string;
      status: Status;
      zone: string;
    }[],
  );
  const [patio, setPatio] = useState(
    initialPatioSeats as { id: string; status: Status }[],
  );
  const [selectedId, setSelectedId] = useState<number | string>(7);
  const [store, setStore] = useState(stores[0].name);

  const allSeats: { key: string; label: string; status: Status }[] = [
    ...seats.map((s) => ({
      key: String(s.id),
      label: s.label,
      status: s.status,
    })),
    ...patio.map((p) => ({ key: p.id, label: p.id, status: p.status })),
  ];

  const selected =
    allSeats.find((s) => s.key === String(selectedId)) ?? allSeats[0];
  const [pendingStatus, setPendingStatus] = useState<Status>(selected.status);

  const usedCount = allSeats.filter((s) => s.status === "used").length;
  const reservedCount = allSeats.filter((s) => s.status === "reserved").length;

  const handleSelect = (key: string | number, status: Status) => {
    setSelectedId(key);
    setPendingStatus(status);
  };

  const handleStatusChange = () => {
    const key = String(selectedId);
    if (seats.some((s) => String(s.id) === key)) {
      setSeats((prev) =>
        prev.map((s) =>
          String(s.id) === key ? { ...s, status: pendingStatus } : s,
        ),
      );
    } else {
      setPatio((prev) =>
        prev.map((p) => (p.id === key ? { ...p, status: pendingStatus } : p)),
      );
    }
    show(
      `좌석 ${selected.label}의 상태가 '${statusLabel[pendingStatus]}'(으)로 변경되었습니다.`,
    );
  };

  const windowSeats = seats.filter((s) => s.zone === "window");
  const tableRow1 = seats.filter((s) => s.zone === "table").slice(0, 4);
  const tableRow2 = seats.filter((s) => s.zone === "table").slice(4, 8);

  return (
    <div className="p-6 md:p-8 max-w-[1400px] mx-auto">
      <PageHeader
        title="실시간 좌석 현황"
        subtitle="매장 좌석 사용 현황을 실시간으로 확인하세요."
      />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5">
        <Card>
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            <Select
              className="w-44"
              value={store}
              onChange={(e) => setStore(e.target.value)}
            >
              {stores.map((s) => (
                <option key={s.id} value={s.name}>
                  {s.name.replace("OOO 커피 ", "")}
                </option>
              ))}
            </Select>
            <div className="flex items-center gap-4 text-xs text-ink-500 flex-wrap">
              {legend.map((l) => (
                <span key={l.status} className="flex items-center gap-1.5">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${statusStyle[l.status].split(" ")[0]}`}
                  />
                  {l.label}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-ink-50 p-6 md:p-8">
            <div className="flex gap-4 md:gap-6">
              {/* Counter */}
              <div className="hidden sm:flex flex-col items-center justify-center w-14 shrink-0 rounded-2xl border-2 border-dashed border-ink-200 bg-white">
                <span
                  className="text-[11px] font-medium text-ink-400 tracking-widest"
                  style={{ writingMode: "vertical-rl" }}
                >
                  카운터
                </span>
              </div>

              {/* Main floor */}
              <div className="flex-1 min-w-0">
                <p className="text-center text-xs font-medium text-ink-400 mb-3">
                  창가 좌석
                </p>
                <div className="grid grid-cols-5 gap-3 md:gap-4 max-w-xl mx-auto mb-6">
                  {windowSeats.map((s) => (
                    <SeatButton
                      key={s.id}
                      label={s.label}
                      status={s.status}
                      isSelected={String(selectedId) === String(s.id)}
                      onClick={() => handleSelect(s.id, s.status)}
                    />
                  ))}
                </div>

                <div className="grid grid-cols-4 gap-3 md:gap-4 max-w-xl mx-auto mb-2">
                  {tableRow1.map((s) => (
                    <SeatButton
                      key={s.id}
                      label={s.label}
                      status={s.status}
                      isSelected={String(selectedId) === String(s.id)}
                      onClick={() => handleSelect(s.id, s.status)}
                    />
                  ))}
                </div>

                <p className="text-center text-xs font-medium text-ink-400 mt-6 mb-3">
                  테이블 좌석
                </p>
                <div className="grid grid-cols-4 gap-3 md:gap-4 max-w-xl mx-auto">
                  {tableRow2.map((s) => (
                    <SeatButton
                      key={s.id}
                      label={s.label}
                      status={s.status}
                      isSelected={String(selectedId) === String(s.id)}
                      onClick={() => handleSelect(s.id, s.status)}
                    />
                  ))}
                </div>
              </div>

              {/* Patio */}
              <div className="hidden md:flex flex-col items-center gap-4 w-24 shrink-0 rounded-2xl border-2 border-dashed border-ink-200 bg-white py-6">
                <span className="text-lg">🌿</span>
                <button
                  onClick={() => handleSelect(patio[0].id, patio[0].status)}
                  className={`w-14 h-14 rounded-full border-2 flex items-center justify-center text-xs font-semibold shadow-sm transition-transform hover:-translate-y-0.5 ${statusStyle[patio[0].status]} ${
                    String(selectedId) === patio[0].id
                      ? "ring-2 ring-brand-500 ring-offset-2"
                      : ""
                  }`}
                >
                  {patio[0].id}
                </button>
                <span className="text-lg">🪴</span>
                <button
                  onClick={() => handleSelect(patio[1].id, patio[1].status)}
                  className={`w-14 h-14 rounded-full border-2 flex items-center justify-center text-xs font-semibold shadow-sm transition-transform hover:-translate-y-0.5 ${statusStyle[patio[1].status]} ${
                    String(selectedId) === patio[1].id
                      ? "ring-2 ring-brand-500 ring-offset-2"
                      : ""
                  }`}
                >
                  {patio[1].id}
                </button>
                <span className="text-[11px] font-medium text-ink-400 mt-1">
                  파티오
                </span>
              </div>
            </div>
          </div>
          <p className="text-xs text-ink-400 mt-3">
            * 좌석을 클릭하면 상세 정보를 확인할 수 있습니다.
          </p>
        </Card>

        <div className="space-y-5">
          <Card>
            <h3 className="text-sm font-semibold text-ink-800 mb-3">
              좌석 정보
            </h3>
            <div className="flex items-center gap-2 mb-1">
              <p className="text-lg font-bold text-ink-900">
                좌석 {selected.label}
              </p>
              <span
                className={`text-[11px] font-medium rounded-full px-2 py-0.5 ${
                  selected.status === "used"
                    ? "bg-red-50 text-red-500"
                    : selected.status === "reserved"
                      ? "bg-amber-50 text-amber-500"
                      : selected.status === "cleaning"
                        ? "bg-ink-100 text-ink-500"
                        : "bg-emerald-50 text-emerald-600"
                }`}
              >
                {statusLabel[selected.status]}
              </span>
            </div>
            {selected.status === "used" ? (
              <dl className="space-y-2 text-sm mt-4">
                <div className="flex justify-between">
                  <dt className="text-ink-500">이용 고객</dt>
                  <dd className="text-ink-800">박*헌 (2명)</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-ink-500">입장 시간</dt>
                  <dd className="text-ink-800">13:20</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-ink-500">주문 내역</dt>
                  <dd className="text-ink-800">바닐라 라떼 외 1</dd>
                </div>
              </dl>
            ) : (
              <p className="text-sm text-ink-400 mt-4">
                현재 이용 중인 고객 정보가 없습니다.
              </p>
            )}
            <Select
              className="w-full mt-4"
              value={pendingStatus}
              onChange={(e) => setPendingStatus(e.target.value as Status)}
            >
              <option value="empty">빈자리</option>
              <option value="used">사용 중</option>
              <option value="reserved">예약됨</option>
              <option value="cleaning">청소 중</option>
            </Select>
            <Button className="w-full mt-2" onClick={handleStatusChange}>
              좌석 상태 변경
            </Button>
          </Card>

          <Card>
            <p className="text-sm text-ink-500 mb-1">전체 좌석</p>
            <p className="text-2xl font-bold text-ink-900 mb-3">
              {allSeats.length}석
            </p>
            <div className="flex justify-between text-sm py-1.5 border-t border-ink-50">
              <span className="text-ink-500">사용 중</span>
              <span className="font-medium text-red-500">
                {usedCount}석 ({Math.round((usedCount / allSeats.length) * 100)}
                %)
              </span>
            </div>
            <div className="flex justify-between text-sm py-1.5 border-t border-ink-50">
              <span className="text-ink-500">예약됨</span>
              <span className="font-medium text-amber-500">
                {reservedCount}석 (
                {Math.round((reservedCount / allSeats.length) * 100)}%)
              </span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
