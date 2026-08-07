"use client";
import React from "react";

export default function StoreTabs<T extends string>({
  tabs,
  active,
  onChange,
}: {
  tabs: { key: T; label: string; count?: number }[];
  active: T;
  onChange: (key: T) => void;
}) {
  return (
    <div className="flex items-center gap-1 border-b border-ink-100">
      {tabs.map((tab) => {
        const isActive = tab.key === active;
        return (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            className={`relative px-4 py-2.5 text-sm font-medium transition-colors ${
              isActive
                ? "text-brand-600"
                : "text-ink-500 hover:text-ink-800"
            }`}
          >
            {tab.label}
            {typeof tab.count === "number" && (
              <span
                className={`ml-1.5 text-xs ${
                  isActive ? "text-brand-500" : "text-ink-400"
                }`}
              >
                {tab.count}
              </span>
            )}
            {isActive && (
              <span className="absolute left-0 right-0 -bottom-px h-0.5 bg-brand-600 rounded-full" />
            )}
          </button>
        );
      })}
    </div>
  );
}
