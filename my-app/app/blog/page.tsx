"use client";

import { useState } from "react";
import { Plus, FolderOpen, Search } from "lucide-react";
import { PageHeader, StatusBadge } from "@/components/ui";
import { blogPosts, blogStats } from "@/lib/data";

const tabs = ["전체 글", "발행 중", "임시 저장", "예약 발행"] as const;

export default function BlogPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("전체 글");
  const filtered = blogPosts.filter((p) => tab === "전체 글" || p.status === tab);

  return (
    <div>
      <PageHeader
        title="블로그 (CMS)"
        desc="매장 소식과 이벤트를 블로그로 관리하고 발행하세요."
        action={
          <>
            <button className="btn-secondary">
              <FolderOpen size={15} /> 카테고리 관리
            </button>
            <button className="btn-primary">
              <Plus size={16} /> 새 글 작성
            </button>
          </>
        }
      />

      <div className="mb-5 grid grid-cols-2 gap-4 sm:grid-cols-5">
        <div className="card p-4">
          <p className="text-xs text-black">전체 글</p>
          <p className="mt-1 text-xl font-bold text-black">{blogStats.total}개</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-black">발행 중</p>
          <p className="mt-1 text-xl font-bold text-emerald-600">{blogStats.published}개</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-black">임시 저장</p>
          <p className="mt-1 text-xl font-bold text-black">{blogStats.draft}개</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-black">예약 발행</p>
          <p className="mt-1 text-xl font-bold text-brand-600">{blogStats.scheduled}개</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-black">조회수 (이번 달)</p>
          <p className="mt-1 text-xl font-bold text-black">
            {blogStats.monthViews.toLocaleString()} <span className="text-xs text-emerald-600">▲{blogStats.viewsGrowth}%</span>
          </p>
        </div>
      </div>

      <div className="card p-4">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium ${
                tab === t ? "bg-brand-600 text-white" : "bg-slate-50 text-black hover:bg-slate-100"
              }`}
            >
              {t}
            </button>
          ))}
          <div className="relative ml-auto w-56">
            <Search size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-black" />
            <input placeholder="제목 검색" className="input py-1.5 pl-8 text-xs" />
          </div>
          <select className="input w-32 py-1.5 text-xs">
            <option>전체 카테고리</option>
          </select>
        </div>

        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="table-th">제목</th>
              <th className="table-th">카테고리</th>
              <th className="table-th">상태</th>
              <th className="table-th">작성일</th>
              <th className="table-th">조회수</th>
              <th className="table-th">관리</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-b border-slate-50 hover:bg-slate-50">
                <td className="table-td font-medium text-black">{p.title}</td>
                <td className="table-td text-black">{p.category}</td>
                <td className="table-td">
                  <StatusBadge status={p.status} />
                </td>
                <td className="table-td text-black">{p.date}</td>
                <td className="table-td text-black">{p.views || "-"}</td>
                <td className="table-td">
                  <button className="text-xs font-medium text-brand-600">수정</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 flex justify-center gap-1 text-sm text-black">
          {[1, 2, 3, 4, 5].map((n) => (
            <button key={n} className={`h-7 w-7 rounded-lg ${n === 1 ? "bg-brand-600 text-white" : "hover:bg-slate-50"}`}>
              {n}
            </button>
          ))}
          <span className="px-1">...</span>
        </div>
      </div>
    </div>
  );
}
