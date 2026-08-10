"use client";

import { useMemo, useState } from "react";
import { Plus, Search, Pencil, Trash2, PackageCheck, PackageX, AlertTriangle } from "lucide-react";
import { PageHeader, StatusBadge } from "@/components/ui";
import { menuItems, menuCategories, stockSummary, recentOrdersToStock, MenuItem } from "@/lib/data";

export default function MenuPage() {
  const [category, setCategory] = useState("전체");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<MenuItem>(menuItems[0]);
  const [items, setItems] = useState(menuItems);

  const filtered = useMemo(
    () =>
      items.filter(
        (m) =>
          (category === "전체" || m.category === category) &&
          m.name.toLowerCase().includes(query.toLowerCase())
      ),
    [items, category, query]
  );

  const toggleVisible = (id: string) =>
    setItems((prev) => prev.map((m) => (m.id === id ? { ...m, visible: !m.visible } : m)));

  return (
    <div>
      <PageHeader
        title="메뉴·재고 관리"
        desc="메뉴를 관리하고 주요 재고 현황을 확인하세요."
        action={
          <button className="btn-primary">
            <Plus size={16} /> 메뉴 추가
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[220px_1fr_320px]">
        {/* category sidebar */}
        <div className="card h-fit p-3">
          {menuCategories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`mb-1 w-full rounded-xl px-3.5 py-2.5 text-left text-sm font-medium transition ${
                category === c ? "bg-brand-50 text-brand-700" : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              {c}
              <span className="ml-1 text-xs text-slate-400">
                ({c === "전체" ? items.length : items.filter((i) => i.category === c).length})
              </span>
            </button>
          ))}
        </div>

        {/* list */}
        <div>
          <div className="mb-4 flex items-center gap-2">
            <div className="relative flex-1">
              <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="메뉴명 검색"
                className="input pl-9"
              />
            </div>
            <select className="input w-36">
              <option>전체 상태</option>
              <option>정상</option>
              <option>부족</option>
              <option>품절</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {filtered.map((m) => (
              <button
                key={m.id}
                onClick={() => setSelected(m)}
                className={`card flex flex-col items-start gap-1.5 p-4 text-left transition hover:-translate-y-0.5 ${
                  selected.id === m.id ? "ring-2 ring-brand-400" : ""
                }`}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 text-2xl">
                  {m.image}
                </div>
                <p className="mt-1 text-sm font-semibold text-slate-800">{m.name}</p>
                <p className="text-sm font-bold text-brand-600">{m.price.toLocaleString()}원</p>
                <div className="flex items-center gap-1">
                  <StatusBadge status={m.stockStatus} />
                  <span className="text-[11px] text-slate-400">재고: {m.stockQty}</span>
                </div>
              </button>
            ))}
            {filtered.length === 0 && (
              <p className="col-span-full py-10 text-center text-sm text-slate-400">검색 결과가 없습니다.</p>
            )}
          </div>
        </div>

        {/* detail */}
        <div className="card h-fit p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-base font-bold text-slate-900">
              <span className="text-xl">{selected.image}</span> {selected.name}
            </h3>
            <button
              onClick={() => toggleVisible(selected.id)}
              className={`relative h-6 w-11 rounded-full transition ${selected.visible ? "bg-brand-600" : "bg-slate-200"}`}
            >
              <span
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition ${
                  selected.visible ? "left-[22px]" : "left-0.5"
                }`}
              />
            </button>
          </div>

          <p className="mb-4 text-xs font-semibold uppercase text-slate-400">기본 정보</p>
          <div className="space-y-3 text-sm">
            <div>
              <label className="mb-1 block text-xs text-slate-500">카테고리</label>
              <select className="input" defaultValue={selected.category}>
                {menuCategories.slice(1).map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs text-slate-500">판매 가격</label>
              <input className="input" defaultValue={selected.price} />
            </div>
            <div>
              <label className="mb-1 block text-xs text-slate-500">메뉴 설명</label>
              <textarea className="input" rows={2} defaultValue={selected.desc} />
            </div>
          </div>

          <p className="mb-3 mt-5 text-xs font-semibold uppercase text-slate-400">재고 정보</p>
          <div className="space-y-3 text-sm">
            <div>
              <label className="mb-1 block text-xs text-slate-500">재고 설정</label>
              <select className="input" defaultValue={selected.stockQty === "무제한" ? "무제한" : "관리함"}>
                <option>무제한</option>
                <option>관리함</option>
              </select>
            </div>
            <div className="flex justify-between text-xs text-slate-500">
              <span>현재 재고</span>
              <span className="font-semibold text-slate-700">{selected.stockQty}</span>
            </div>
          </div>

          <div className="mt-5 flex gap-2">
            <button className="btn-primary flex-1">
              <Pencil size={14} /> 수정
            </button>
            <button className="btn-secondary flex-1 !border-red-200 !text-red-600 hover:!bg-red-50">
              <Trash2 size={14} /> 삭제
            </button>
          </div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="card flex items-center gap-3 p-4">
          <PackageCheck className="text-emerald-500" size={22} />
          <div>
            <p className="text-xs text-slate-500">정상 재고</p>
            <p className="font-bold text-slate-800">{stockSummary.normal}개</p>
          </div>
        </div>
        <div className="card flex items-center gap-3 p-4">
          <AlertTriangle className="text-amber-500" size={22} />
          <div>
            <p className="text-xs text-slate-500">부족 재고</p>
            <p className="font-bold text-slate-800">{stockSummary.low}개</p>
          </div>
        </div>
        <div className="card flex items-center gap-3 p-4">
          <PackageX className="text-red-500" size={22} />
          <div>
            <p className="text-xs text-slate-500">품절</p>
            <p className="font-bold text-slate-800">{stockSummary.out}개</p>
          </div>
        </div>
        <div className="card p-4">
          <p className="mb-2 text-xs font-semibold text-slate-500">최근 발주 내역</p>
          <div className="space-y-1">
            {recentOrdersToStock.map((o, i) => (
              <p key={i} className="text-xs text-slate-500">
                <span className="text-slate-400">{o.date}</span> {o.item}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
