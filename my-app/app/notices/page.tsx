"use client";

import { useState } from "react";
import { Plus, MoreVertical, Search } from "lucide-react";
import { PageHeader, StatusBadge } from "@/components/ui";
import { notices } from "@/lib/data";

const tabs = ["전체", "공지", "이벤트", "배너"] as const;

export default function NoticesPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("전체");
  const filtered = notices.filter((n) => tab === "전체" || n.type === tab || (tab === "배너" && false));

  return (
    <div>
      <PageHeader
        title="매장 소식 관리"
        desc="매장 공지사항 및 이벤트 소식을 관리하세요."
        action={
          <button className="btn-primary">
            <Plus size={16} /> 새 소식 작성
          </button>
        }
      />

      <div className="mb-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="card p-4">
          <p className="text-xs text-slate-500">전체 소식</p>
          <p className="mt-1 text-xl font-bold text-slate-900">{notices.length}건</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-slate-500">공지</p>
          <p className="mt-1 text-xl font-bold text-slate-900">{notices.filter((n) => n.type === "공지").length}건</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-slate-500">이벤트</p>
          <p className="mt-1 text-xl font-bold text-slate-900">{notices.filter((n) => n.type === "이벤트").length}건</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-slate-500">배너/홍보</p>
          <p className="mt-1 text-xl font-bold text-slate-900">4건</p>
        </div>
      </div>

      <div className="card p-4">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium ${
                tab === t ? "bg-brand-600 text-white" : "bg-slate-50 text-slate-500 hover:bg-slate-100"
              }`}
            >
              {t}
            </button>
          ))}
          <div className="relative ml-auto w-56">
            <Search size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input placeholder="제목 검색" className="input py-1.5 pl-8 text-xs" />
          </div>
        </div>

        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="table-th">제목</th>
              <th className="table-th">유형</th>
              <th className="table-th">게시 기간</th>
              <th className="table-th">상태</th>
              <th className="table-th">조회수</th>
              <th className="table-th">관리</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((n) => (
              <tr key={n.id} className="border-b border-slate-50 hover:bg-slate-50">
                <td className="table-td font-medium text-slate-800">{n.title}</td>
                <td className="table-td text-slate-500">{n.type}</td>
                <td className="table-td text-slate-500">{n.period}</td>
                <td className="table-td">
                  <StatusBadge status={n.status} />
                </td>
                <td className="table-td text-slate-500">{n.views.toLocaleString()}</td>
                <td className="table-td">
                  <div className="flex gap-2">
                    <button className="text-xs font-medium text-brand-600">수정</button>
                    <button className="text-slate-400 hover:text-slate-600">
                      <MoreVertical size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
