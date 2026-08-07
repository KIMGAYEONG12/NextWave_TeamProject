"use client";
import React, { createContext, useCallback, useContext, useState } from "react";
import Icon from "./icons";

type ToastItem = { id: number; message: string; tone: "success" | "error" | "info" };
type ToastContextType = { show: (message: string, tone?: ToastItem["tone"]) => void };

const ToastContext = createContext<ToastContextType | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);

  const show = useCallback((message: string, tone: ToastItem["tone"] = "success") => {
    const id = Date.now();
    setItems((prev) => [...prev, { id, message, tone }]);
    setTimeout(() => {
      setItems((prev) => prev.filter((t) => t.id !== id));
    }, 2800);
  }, []);

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2">
        {items.map((t) => (
          <div
            key={t.id}
            className={`flex items-center gap-2 rounded-lg px-4 py-3 text-sm text-white shadow-lg animate-in fade-in slide-in-from-bottom-2 ${
              t.tone === "success"
                ? "bg-ink-900"
                : t.tone === "error"
                ? "bg-red-600"
                : "bg-brand-600"
            }`}
          >
            <Icon name="check" className="w-4 h-4" />
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
