import React from "react";

export default function CongestionBar({
  used,
  total,
  label = "좌석 현황",
}: {
  used: number;
  total: number;
  label?: string;
}) {
  const pct = total > 0 ? Math.round((used / total) * 100) : 0;
  const tone =
    pct >= 80 ? "bg-red-500" : pct >= 50 ? "bg-amber-500" : "bg-emerald-500";
  return (
    <div>
      <div className="flex items-center justify-between text-xs text-ink-500 mb-1.5">
        <span>{label}</span>
        <span className="font-medium text-ink-700">
          {total}석 중 {used}석 사용
        </span>
      </div>
      <div className="h-2 w-full rounded-full bg-ink-100 overflow-hidden">
        <div
          className={`h-full rounded-full ${tone} transition-all`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="mt-1 text-right text-xs text-ink-400">{pct}%</p>
    </div>
  );
}
