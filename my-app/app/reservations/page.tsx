"use client";
import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import Card from "@/components/Card";
import Button from "@/components/Button";
import Badge from "@/components/Badge";
import Icon from "@/components/icons";
import { useToast } from "@/components/Toast";
import { todayReservations as initialReservations } from "@/lib/mock-data";

const weeks = [
  [27, 28, 29, 30, 31, 1, 2],
  [3, 4, 5, 6, 7, 8, 9],
  [10, 11, 12, 13, 14, 15, 16],
  [17, 18, 19, 20, 21, 22, 23],
  [24, 25, 26, 27, 28, 29, 30],
];
const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
const reservedDays: Record<number, number> = {
  3: 2,
  4: 1,
  5: 3,
  6: 2,
  7: 5,
  10: 1,
};

export default function ReservationsPage() {
  const { show } = useToast();
  const [selectedDay, setSelectedDay] = useState(7);
  const [reservations, setReservations] = useState(initialReservations);
  const [selectedTime, setSelectedTime] = useState(initialReservations[0].time);

  const selected =
    reservations.find((r) => r.time === selectedTime) ?? reservations[0];

  const updateStatus = (status: "승인" | "거절") => {
    setReservations((prev) =>
      prev.map((r) => (r.time === selected.time ? { ...r, status } : r)),
    );
    show(
      status === "승인"
        ? `${selected.time} ${selected.name}님 예약이 승인되었습니다.`
        : `${selected.time} ${selected.name}님 예약이 거절되었습니다.`,
      status === "승인" ? "success" : "error",
    );
  };

  return (
    <div className="p-6 md:p-8 max-w-[1400px] mx-auto">
      <PageHeader
        title="예약 관리"
        subtitle="예약 현황을 확인하고 승인/거절을 관리하세요."
        action={
          <Button size="md">
            <Icon name="plus" className="w-4 h-4" /> 예약 추가
          </Button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-5">
        <Card>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <button className="p-1 text-ink-400 hover:text-ink-700">
                <Icon name="chevronLeft" className="w-5 h-5" />
              </button>
              <h3 className="text-base font-semibold text-ink-900">
                2026년 8월
              </h3>
              <button className="p-1 text-ink-400 hover:text-ink-700">
                <Icon name="chevronRight" className="w-5 h-5" />
              </button>
            </div>
            <div className="flex bg-ink-100 rounded-lg p-0.5 text-xs">
              {["일", "주", "월"].map((v, i) => (
                <button
                  key={v}
                  className={`px-3 py-1.5 rounded-md ${i === 2 ? "bg-white shadow-card text-ink-800 font-medium" : "text-ink-500"}`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-7 text-center text-xs text-ink-400 mb-2">
            {dayNames.map((d) => (
              <div key={d} className="py-1">
                {d}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1.5">
            {weeks.flat().map((d, i) => {
              const isCurrentMonth = i >= 5 && i < 5 + 31;
              const count =
                reservedDays[d] && isCurrentMonth ? reservedDays[d] : 0;
              const isSelected = isCurrentMonth && d === selectedDay;
              return (
                <button
                  key={i}
                  onClick={() => isCurrentMonth && setSelectedDay(d)}
                  className={`aspect-square rounded-lg border text-left p-1.5 text-xs transition-colors ${
                    isSelected
                      ? "border-brand-500 bg-brand-50"
                      : "border-ink-100 hover:border-ink-200"
                  } ${!isCurrentMonth ? "opacity-30" : ""}`}
                >
                  <span
                    className={
                      isSelected
                        ? "text-brand-700 font-semibold"
                        : "text-ink-600"
                    }
                  >
                    {d}
                  </span>
                  {count > 0 && (
                    <span className="block mt-1 text-[10px] bg-brand-100 text-brand-700 rounded px-1 py-0.5 w-fit">
                      예약 {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </Card>

        <Card>
          <h3 className="text-sm font-semibold text-ink-800 mb-3">
            8월 {selectedDay}일 예약 목록
          </h3>
          <div className="space-y-2">
            {reservations.map((r) => (
              <button
                key={r.time}
                onClick={() => setSelectedTime(r.time)}
                className={`w-full flex items-center justify-between rounded-lg border px-3 py-2.5 text-left ${
                  selected.time === r.time
                    ? "border-brand-400 bg-brand-50/50"
                    : "border-ink-100 hover:border-ink-200"
                }`}
              >
                <div>
                  <p className="text-sm font-medium text-ink-800">
                    {r.time} · {r.name}
                  </p>
                  <p className="text-xs text-ink-400">{r.people}명</p>
                </div>
                <Badge
                  tone={
                    r.status === "승인"
                      ? "green"
                      : r.status === "거절"
                        ? "red"
                        : "amber"
                  }
                >
                  {r.status}
                </Badge>
              </button>
            ))}
          </div>

          <div className="mt-5 pt-5 border-t border-ink-100">
            <h4 className="text-sm font-semibold text-ink-800 mb-3">
              예약 상세
            </h4>
            <dl className="space-y-2.5 text-sm">
              <div className="flex justify-between">
                <dt className="text-ink-500">예약 번호</dt>
                <dd className="text-ink-800">R-20260807-015</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-500">예약 고객</dt>
                <dd className="text-ink-800">
                  {selected.name} (010-1234-5678)
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-500">예약 일시</dt>
                <dd className="text-ink-800">
                  2026.08.{String(selectedDay).padStart(2, "0")} (금){" "}
                  {selected.time}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-500">인원</dt>
                <dd className="text-ink-800">{selected.people}명</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-500">좌석</dt>
                <dd className="text-ink-800">창가 자리</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-500">요청 사항</dt>
                <dd className="text-ink-800 text-right">
                  조용한 자리 부탁드려요.
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-500">현재 상태</dt>
                <dd>
                  <Badge
                    tone={
                      selected.status === "승인"
                        ? "green"
                        : selected.status === "거절"
                          ? "red"
                          : "amber"
                    }
                  >
                    {selected.status}
                  </Badge>
                </dd>
              </div>
            </dl>
            <div className="flex gap-2 mt-4">
              <Button
                variant="outline"
                className="flex-1"
                disabled={selected.status === "거절"}
                onClick={() => updateStatus("거절")}
              >
                거절
              </Button>
              <Button
                className="flex-1"
                disabled={selected.status === "승인"}
                onClick={() => updateStatus("승인")}
              >
                승인하기
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
