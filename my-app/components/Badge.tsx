import React from "react";

type Tone =
  | "gray"
  | "blue"
  | "green"
  | "red"
  | "amber"
  | "purple"
  | "navy";

const toneClasses: Record<Tone, string> = {
  gray: "bg-ink-100 text-ink-600",
  blue: "bg-brand-50 text-brand-700",
  green: "bg-emerald-50 text-emerald-700",
  red: "bg-red-50 text-red-600",
  amber: "bg-amber-50 text-amber-700",
  purple: "bg-purple-50 text-purple-700",
  navy: "bg-slate-800 text-white",
};

export default function Badge({
  children,
  tone = "gray",
  className = "",
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium whitespace-nowrap ${toneClasses[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
