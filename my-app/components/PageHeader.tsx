import Link from "next/link";
import Icon from "./icons";


export default function PageHeader({
  title,
  subtitle,
  notifCount = 1,
  action,
}: {
  title: string;
  subtitle?: string;
  notifCount?: number;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4 mb-6">
      <div>
        <h1 className="text-xl font-bold text-ink-900">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-ink-500">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-3 shrink-0">
        {action}
        <button className="flex items-center gap-2 rounded-lg border border-ink-200 bg-white px-3 py-2 text-xs text-ink-600">
          <Icon name="reservation" className="w-4 h-4 text-ink-400" />
          2026.08.07 (금) 13:00
        </button>
        <Link
          href="/notifications"
          className="relative flex items-center justify-center w-9 h-9 rounded-lg border border-ink-200 bg-white text-ink-500"
        >
          <Icon name="bell" className="w-[18px] h-[18px]" />
          {notifCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center min-w-[18px] h-[18px] rounded-full bg-red-500 text-white text-[10px] font-semibold px-1">
              {notifCount}
            </span>
          )}
        </Link>
        <div className="flex items-center gap-2 rounded-lg border border-ink-200 bg-white px-2 py-1.5">
          <div className="w-6 h-6 rounded-full bg-ink-100 flex items-center justify-center text-xs">
            ☕
          </div>
          <span className="text-xs text-ink-700 font-medium pr-1">
            OOO 커피
          </span>
          <Icon name="chevronDown" className="w-3.5 h-3.5 text-ink-400" />
        </div>
      </div>
    </div>
  );
}
