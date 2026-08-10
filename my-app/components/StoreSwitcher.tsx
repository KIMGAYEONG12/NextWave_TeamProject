"use client";
import { useEffect, useRef, useState } from "react";
import Icon from "./icons";
import { stores } from "@/lib/mock-data";
import { useToast } from "./Toast";

export default function StoreSwitcher({
  size = "md",
}: {
  size?: "sm" | "md";
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(stores[0]);
  const ref = useRef<HTMLDivElement>(null);
  const { show } = useToast();

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`flex items-center gap-2 rounded-lg border border-ink-200 bg-white hover:bg-ink-50 transition-colors ${
          size === "sm" ? "px-2 py-1.5" : "px-2 py-1.5"
        }`}
      >
        <div className="w-6 h-6 rounded-full bg-ink-100 flex items-center justify-center text-xs shrink-0">
          ☕
        </div>
        <span className="text-xs text-ink-700 font-medium pr-1 whitespace-nowrap">
          {active.name.replace("OOO 커피 ", "").length > 0
            ? active.name
            : active.name}
        </span>
        <Icon
          name="chevronDown"
          className={`w-3.5 h-3.5 text-ink-400 shrink-0 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute right-0 top-full mt-2 w-64 rounded-xl border border-ink-100 bg-white shadow-lg py-1.5 z-30"
        >
          <p className="px-3 py-1.5 text-[11px] font-semibold text-ink-400 uppercase tracking-wide">
            매장 전환
          </p>
          <div className="max-h-64 overflow-y-auto">
            {stores.map((s) => (
              <button
                key={s.id}
                type="button"
                role="option"
                aria-selected={active.id === s.id}
                onClick={() => {
                  setActive(s);
                  setOpen(false);
                  show(`'${s.name}'(으)로 전환되었습니다.`);
                }}
                className={`w-full flex items-center justify-between gap-2 px-3 py-2 text-sm text-left transition-colors ${
                  active.id === s.id
                    ? "bg-brand-50 text-brand-700 font-semibold"
                    : "text-ink-700 hover:bg-ink-50"
                }`}
              >
                <span className="min-w-0">
                  <span className="block truncate">{s.name}</span>
                  <span className="block truncate text-[11px] font-normal text-ink-400">
                    {s.address}
                  </span>
                </span>
                {active.id === s.id && (
                  <Icon name="check" className="w-4 h-4 shrink-0" />
                )}
              </button>
            ))}
          </div>
          <div className="border-t border-ink-100 mt-1 pt-1">
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                show("매장 추가 기능은 준비 중입니다.");
              }}
              className="w-full flex items-center gap-1.5 px-3 py-2 text-sm text-ink-500 hover:bg-ink-50"
            >
              <Icon name="menu" className="w-3.5 h-3.5 text-ink-400" />
              + 매장 추가
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
