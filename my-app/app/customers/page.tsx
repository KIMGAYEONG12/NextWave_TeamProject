"use client";

import { useState } from "react";
import { Search, Star, MessageSquare, ShieldAlert } from "lucide-react";
import { PageHeader, StatusBadge } from "@/components/ui";
import { customers, reviews as initialReviews, reviewStats } from "@/lib/data";

const tabs = ["고객 관리", "리뷰 관리", "신고/차단 관리"] as const;

export default function CustomersPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("리뷰 관리");
  const [reviews, setReviews] = useState(initialReviews);

  const reportedReviews = reviews.filter((r) => r.status === "신고 접수");

  return (
    <div>
      <PageHeader title="고객 및 리뷰 관리" desc="고객 정보와 리뷰를 한눈에 보고 관리하세요." />

      <div className="mb-5 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
              tab === t ? "bg-brand-600 text-white shadow-card" : "bg-white text-slate-500 hover:bg-slate-50"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "고객 관리" && (
        <div className="card p-4">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <div className="relative w-64">
              <Search size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input placeholder="이름, 휴대폰, 이메일 검색" className="input py-2 pl-8 text-sm" />
            </div>
            <select className="input w-32 py-2 text-sm">
              <option>전체 등급</option>
              <option>VIP</option>
              <option>GOLD</option>
              <option>SILVER</option>
              <option>BRONZE</option>
              <option>NEW</option>
            </select>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="table-th">고객 정보</th>
                <th className="table-th">등급</th>
                <th className="table-th">포인트</th>
                <th className="table-th">방문 횟수</th>
                <th className="table-th">최근 방문일</th>
                <th className="table-th">총 주문 금액</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c.id} className="border-b border-slate-50 hover:bg-slate-50">
                  <td className="table-td">
                    <p className="font-medium text-slate-800">{c.name}</p>
                    <p className="text-xs text-slate-400">{c.phone}</p>
                  </td>
                  <td className="table-td">
                    <StatusBadge status={c.grade} />
                  </td>
                  <td className="table-td">{c.points.toLocaleString()}P</td>
                  <td className="table-td">{c.visits}회</td>
                  <td className="table-td text-slate-500">{c.lastVisit}</td>
                  <td className="table-td font-medium">{c.total.toLocaleString()}원</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === "리뷰 관리" && (
        <>
          <div className="mb-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="card p-4">
              <p className="text-xs text-slate-500">전체 리뷰</p>
              <p className="mt-1 text-xl font-bold text-slate-900">{reviewStats.total}개</p>
            </div>
            <div className="card p-4">
              <p className="text-xs text-slate-500">평균 평점</p>
              <p className="mt-1 flex items-center gap-1 text-xl font-bold text-amber-500">
                {reviewStats.avg} <Star size={16} className="fill-amber-400 text-amber-400" />
              </p>
            </div>
            <div className="card p-4">
              <p className="text-xs text-slate-500">답변 비율</p>
              <p className="mt-1 text-xl font-bold text-emerald-600">{reviewStats.replyRate}%</p>
            </div>
            <div className="card p-4">
              <p className="text-xs text-slate-500">신고/차단 요청</p>
              <p className="mt-1 text-xl font-bold text-red-500">{reviewStats.reports}건</p>
            </div>
          </div>

          <div className="card p-4">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <div className="relative w-64">
                <Search size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input placeholder="리뷰 내용, 고객명 검색" className="input py-2 pl-8 text-sm" />
              </div>
              <select className="input w-28 py-2 text-sm">
                <option>전체 평점</option>
                <option>5점</option>
                <option>4점</option>
                <option>3점 이하</option>
              </select>
              <select className="input w-28 py-2 text-sm">
                <option>전체 상태</option>
                <option>일반 리뷰</option>
                <option>신고 접수</option>
              </select>
            </div>
            <div className="space-y-3">
              {reviews.map((r) => (
                <div key={r.id} className="flex items-start gap-3 rounded-xl border border-slate-100 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-50 font-semibold text-brand-600">
                    {r.customer[0]}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-semibold text-slate-800">{r.customer}</span>
                      <span className="text-xs text-slate-400">{r.grade}</span>
                      <span className="flex items-center gap-0.5 text-xs font-semibold text-amber-500">
                        <Star size={12} className="fill-amber-400 text-amber-400" /> {r.rating}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-slate-600">{r.text}</p>
                    <p className="mt-1 text-xs text-slate-400">{r.date}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <StatusBadge status={r.status} />
                    <button className="text-xs font-medium text-brand-600">보기</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {tab === "신고/차단 관리" && (
        <div className="card p-5">
          <h3 className="mb-4 flex items-center gap-2 font-bold text-slate-900">
            <ShieldAlert size={18} className="text-red-500" /> 신고 접수된 리뷰
          </h3>
          {reportedReviews.length === 0 ? (
            <p className="py-10 text-center text-sm text-slate-400">신고 접수된 항목이 없습니다.</p>
          ) : (
            <div className="space-y-3">
              {reportedReviews.map((r) => (
                <div key={r.id} className="flex items-center justify-between rounded-xl border border-red-100 bg-red-50 p-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      {r.customer} · <MessageSquare size={12} className="mb-0.5 inline text-slate-400" /> {r.text}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">{r.date}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setReviews((prev) => prev.map((x) => (x.id === r.id ? { ...x, status: "일반 리뷰" } : x)))}
                      className="btn-secondary py-1.5 text-xs"
                    >
                      신고 반려
                    </button>
                    <button className="btn-secondary py-1.5 text-xs !border-red-200 !text-red-600 hover:!bg-red-100">
                      게시글 숨김
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
