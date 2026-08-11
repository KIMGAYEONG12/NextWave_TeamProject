import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

export function PageHeader({
  title,
  desc,
  action,
}: {
  title: string;
  desc?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
      <div>
        <h1 className="text-2xl font-bold text-black">{title}</h1>
        {desc && <p className="mt-1 text-sm text-black">{desc}</p>}
      </div>
      {action && <div className="flex items-center gap-2">{action}</div>}
    </div>
  );
}

export function StatCard({
  label,
  value,
  sub,
  icon: Icon,
  tone = "brand",
}: {
  label: string;
  value: string;
  sub?: string;
  icon: LucideIcon;
  tone?: "brand" | "success" | "warning" | "danger" | "slate";
}) {
  const toneMap: Record<string, string> = {
    brand: "bg-brand-50 text-brand-600",
    success: "bg-emerald-50 text-emerald-600",
    warning: "bg-amber-50 text-amber-600",
    danger: "bg-red-50 text-red-600",
    slate: "bg-slate-100 text-black",
  };
  return (
    <div className="card flex items-center justify-between p-5">
      <div>
        <p className="text-sm text-black">{label}</p>
        <p className="mt-1.5 text-2xl font-bold text-black">{value}</p>
        {sub && <p className="mt-1 text-xs font-medium text-emerald-600">{sub}</p>}
      </div>
      <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${toneMap[tone]}`}>
        <Icon size={20} />
      </div>
    </div>
  );
}

const statusTone: Record<string, string> = {
  // generic
  정상: "bg-emerald-50 text-emerald-600",
  부족: "bg-amber-50 text-amber-600",
  품절: "bg-red-50 text-red-600",
  승인: "bg-emerald-50 text-emerald-600",
  "승인 대기": "bg-amber-50 text-amber-600",
  거절: "bg-red-50 text-red-600",
  접수: "bg-brand-50 text-brand-600",
  준비중: "bg-amber-50 text-amber-600",
  완료: "bg-emerald-50 text-emerald-600",
  취소: "bg-red-50 text-red-600",
  진행중: "bg-emerald-50 text-emerald-600",
  종료: "bg-slate-100 text-black",
  게시중: "bg-emerald-50 text-emerald-600",
  예약: "bg-brand-50 text-brand-600",
  "발행 중": "bg-emerald-50 text-emerald-600",
  "임시 저장": "bg-slate-100 text-black",
  "예약 발행": "bg-brand-50 text-brand-600",
  사용중: "bg-red-50 text-red-600",
  예약됨: "bg-amber-50 text-amber-600",
  비어있음: "bg-emerald-50 text-emerald-600",
  청소중: "bg-slate-100 text-black",
  "일반 리뷰": "bg-slate-100 text-black",
  "신고 접수": "bg-red-50 text-red-600",
  VIP: "bg-navy-900 text-white",
  GOLD: "bg-amber-100 text-amber-700",
  SILVER: "bg-slate-200 text-black",
  BRONZE: "bg-orange-100 text-orange-700",
  NEW: "bg-emerald-100 text-emerald-700",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`badge ${statusTone[status] ?? "bg-slate-100 text-black"}`}>{status}</span>
  );
}

export function Progress({ value, max, tone = "brand" }: { value: number; max: number; tone?: "brand" | "warning" | "danger" }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  const toneMap = { brand: "bg-brand-500", warning: "bg-amber-500", danger: "bg-red-500" };
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
      <div className={`h-full rounded-full ${toneMap[tone]}`} style={{ width: `${pct}%` }} />
    </div>
  );
}
