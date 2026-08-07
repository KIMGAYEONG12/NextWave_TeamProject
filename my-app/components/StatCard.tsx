import React from "react";
import Icon, { IconName } from "./icons";

export default function StatCard({
  label,
  value,
  delta,
  deltaLabel,
  icon,
  iconTone = "blue",
}: {
  label: string;
  value: string;
  delta?: string;
  deltaLabel?: string;
  icon?: IconName;
  iconTone?: "blue" | "green" | "amber" | "purple" | "red";
}) {
  const toneMap: Record<string, string> = {
    blue: "bg-brand-50 text-brand-600",
    green: "bg-emerald-50 text-emerald-600",
    amber: "bg-amber-50 text-amber-600",
    purple: "bg-purple-50 text-purple-600",
    red: "bg-red-50 text-red-600",
  };
  const isUp = delta?.startsWith("+") || delta?.startsWith("▲");
  return (
    <div className="bg-white rounded-2xl border border-ink-100 shadow-card p-5 flex items-center justify-between">
      <div>
        <p className="text-sm text-ink-500">{label}</p>
        <p className="mt-2 text-2xl font-bold text-ink-900">{value}</p>
        {delta && (
          <p
            className={`mt-1 text-xs font-medium ${
              isUp ? "text-emerald-600" : "text-red-500"
            }`}
          >
            {delta} <span className="text-ink-400 font-normal">{deltaLabel}</span>
          </p>
        )}
      </div>
      {icon && (
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${toneMap[iconTone]}`}>
          <Icon name={icon} className="w-6 h-6" />
        </div>
      )}
    </div>
  );
}
