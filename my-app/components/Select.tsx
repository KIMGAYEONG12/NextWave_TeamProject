"use client";
import React from "react";
import Icon from "./icons";

export default function Select({
  className = "",
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative">
      <select
        className={`appearance-none w-full rounded-lg border border-ink-200 bg-white text-sm text-ink-700 pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-brand-200 focus:border-brand-400 ${className}`}
        {...props}
      >
        {children}
      </select>
      <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-ink-400">
        <Icon name="chevronDown" className="w-4 h-4" />
      </span>
    </div>
  );
}
