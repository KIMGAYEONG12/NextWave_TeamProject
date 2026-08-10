"use client";

import { Bell, Calendar, ChevronDown, Store } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { store, notificationStats } from "@/lib/data";

const stores = ["OOO 커피 강남점", "OOO 커피 대구점", "OOO 커피 홍대점"];

export default function Topbar() {
  const [storeOpen, setStoreOpen] = useState(false);
  const [selected, setSelected] = useState(stores[0]);

  return (
    <div className="flex items-center justify-end gap-3 border-b border-slate-200 bg-white/80 px-4 py-3 backdrop-blur lg:px-8">
      <div className="hidden items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-600 sm:flex">
        <Calendar size={15} className="text-slate-400" />
        {store.today}
      </div>

      <Link
        href="/notifications"
        className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50"
      >
        <Bell size={17} />
        {notificationStats.unread > 0 && (
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-danger text-[10px] font-bold text-white">
            {notificationStats.unread}
          </span>
        )}
      </Link>

      <div className="relative">
        <button
          onClick={() => setStoreOpen((v) => !v)}
          className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          <Store size={15} className="text-slate-400" />
          <span className="hidden sm:inline">{selected}</span>
          <ChevronDown size={14} className="text-slate-400" />
        </button>
        {storeOpen && (
          <div className="absolute right-0 top-12 z-30 w-56 rounded-xl border border-slate-200 bg-white p-1.5 shadow-popover">
            {stores.map((s) => (
              <button
                key={s}
                onClick={() => {
                  setSelected(s);
                  setStoreOpen(false);
                }}
                className={`w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-slate-50 ${
                  s === selected ? "font-semibold text-brand-600" : "text-slate-600"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
