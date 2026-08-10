"use client";
import React from "react";
import { useAuth } from "@/lib/auth-context";
import Icon from "./icons";

export default function AuthGate({
  children,
  message = "로그인 후 작성할 수 있습니다.",
}: {
  children: React.ReactNode;
  message?: string;
}) {
  const { isLoggedIn, userName, login, logout } = useAuth();

  if (!isLoggedIn) {
    return (
      <div className="flex items-center justify-between gap-3 rounded-lg border border-dashed border-ink-200 bg-ink-50 px-3 py-2.5">
        <span className="flex items-center gap-1.5 text-xs text-ink-500">
          <Icon name="x" className="w-3.5 h-3.5 text-ink-400" />
          {message}
        </span>
        <button
          onClick={login}
          className="shrink-0 text-xs font-semibold text-brand-600 hover:text-brand-700"
        >
          로그인하기 →
        </button>
      </div>
    );
  }

  return (
    <div>
      {children}
      <div className="mt-1.5 flex justify-end">
        <button
          onClick={logout}
          className="text-[11px] text-ink-400 hover:text-ink-600"
        >
          {userName}님으로 로그인됨 · 로그아웃
        </button>
      </div>
    </div>
  );
}
