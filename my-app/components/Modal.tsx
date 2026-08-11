"use client";

import { X } from "lucide-react";
import { ReactNode } from "react";

export function Modal({
  title,
  onClose,
  children,
  width = "max-w-md",
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
  width?: string;
}) {
  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className={`relative w-full ${width} rounded-2xl bg-white p-6 shadow-popover`}>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-bold text-black">{title}</h3>
          <button onClick={onClose} className="rounded-lg p-1 text-black/50 hover:bg-slate-100">
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
