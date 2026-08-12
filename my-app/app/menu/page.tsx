"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus, Search, Pencil, Trash2, PackageCheck, PackageX, AlertTriangle, ClipboardList, ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import { PageHeader, StatusBadge } from "@/components/ui";
import { Modal } from "@/components/Modal";
import { useToast } from "@/components/Toast";
import { menuItems, menuCategories, stockSummary, recentOrdersToStock, MenuItem, stockLogs as initialStockLogs, StockLog } from "@/lib/data";

const emptyLogForm = { item: "", type: "입고" as StockLog["type"], qty: "", reason: "", staff: "" };

const emojiByCategory: Record<string, string> = {
  커피: "☕",
  논커피: "🧊",
  티: "🍵",
  디저트: "🍰",
  베이커리: "🥐",
  "시즌 메뉴": "🎉",
};

const emptyForm = { name: "", category: "커피" as MenuItem["category"], price: "", desc: "", stockQty: "무제한" };

export default function MenuPage() {
  const showToast = useToast();
  const [category, setCategory] = useState("전체");
  const [statusFilter, setStatusFilter] = useState("전체 상태");
  const [query, setQuery] = useState("");
  const [items, setItems] = useState(menuItems);
  const [selectedId, setSelectedId] = useState(menuItems[0].id);
  const [addOpen, setAddOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const [stockLogs, setStockLogs] = useState<StockLog[]>(initialStockLogs);
  const [logOpen, setLogOpen] = useState(false);
  const [logForm, setLogForm] = useState(emptyLogForm);

  const selected = items.find((m) => m.id === selectedId) ?? items[0];

  // editable copy of the currently-selected item shown in the detail panel
  const [editForm, setEditForm] = useState({
    category: selected.category,
    price: String(selected.price),
    desc: selected.desc,
    stockMode: selected.stockQty === "무제한" ? "무제한" : "관리함",
  });

  useEffect(() => {
    setEditForm({
      category: selected.category,
      price: String(selected.price),
      desc: selected.desc,
      stockMode: selected.stockQty === "무제한" ? "무제한" : "관리함",
    });
  }, [selectedId]); // eslint-disable-line react-hooks/exhaustive-deps

  const filtered = useMemo(
    () =>
      items.filter(
        (m) =>
          (category === "전체" || m.category === category) &&
          (statusFilter === "전체 상태" || m.stockStatus === statusFilter) &&
          m.name.toLowerCase().includes(query.toLowerCase())
      ),
    [items, category, query, statusFilter]
  );

  const toggleVisible = (id: string) =>
    setItems((prev) => prev.map((m) => (m.id === id ? { ...m, visible: !m.visible } : m)));

  const saveEdit = () => {
    const priceNum = Number(editForm.price.toString().replace(/[^0-9]/g, ""));
    setItems((prev) =>
      prev.map((m) =>
        m.id === selected.id
          ? {
              ...m,
              category: editForm.category,
              price: Number.isFinite(priceNum) && priceNum > 0 ? priceNum : m.price,
              desc: editForm.desc,
              stockQty: editForm.stockMode === "무제한" ? "무제한" : m.stockQty === "무제한" ? "0개" : m.stockQty,
              stockStatus: editForm.stockMode === "무제한" ? "정상" : m.stockStatus,
            }
          : m
      )
    );
    showToast("메뉴가 수정되었습니다!");
  };

  const deleteItem = () => {
    if (items.length <= 1) {
      showToast("메뉴가 최소 1개는 있어야 합니다.");
      return;
    }
    const remaining = items.filter((m) => m.id !== selected.id);
    setItems(remaining);
    setSelectedId(remaining[0].id);
    showToast("메뉴가 삭제되었습니다!");
  };

  const addMenu = () => {
    if (!form.name.trim()) {
      showToast("메뉴명을 입력해 주세요.");
      return;
    }
    const priceNum = Number(form.price.toString().replace(/[^0-9]/g, ""));
    const newItem: MenuItem = {
      id: `m${Date.now()}`,
      name: form.name.trim(),
      category: form.category,
      price: Number.isFinite(priceNum) && priceNum > 0 ? priceNum : 0,
      desc: form.desc || "메뉴 설명을 입력해 주세요.",
      stockStatus: "정상",
      stockQty: form.stockQty === "무제한" ? "무제한" : "0개",
      weeklySold: 0,
      image: emojiByCategory[form.category] ?? "🍽️",
      visible: true,
    };
    setItems((prev) => [newItem, ...prev]);
    setSelectedId(newItem.id);
    setForm(emptyForm);
    setAddOpen(false);
    showToast("새 메뉴가 추가되었습니다!");
  };

  const addStockLog = () => {
    if (!logForm.item.trim() || !logForm.qty.trim()) {
      showToast("품목과 수량을 입력해 주세요.");
      return;
    }
    const sign = logForm.type === "입고" ? "+" : "-";
    const qtyText = logForm.qty.trim().startsWith("+") || logForm.qty.trim().startsWith("-") ? logForm.qty.trim() : `${sign}${logForm.qty.trim()}`;
    const newLog: StockLog = {
      id: `sl${Date.now()}`,
      date: new Date().toISOString().slice(0, 10).replace(/-/g, ".") + " " + new Date().toTimeString().slice(0, 5),
      item: logForm.item.trim(),
      type: logForm.type,
      qty: qtyText,
      reason: logForm.reason || "-",
      staff: logForm.staff || "-",
    };
    setStockLogs((prev) => [newLog, ...prev]);
    setLogForm(emptyLogForm);
    setLogOpen(false);
    showToast("입출고 내역이 등록되었습니다!");
  };

  return (
    <div>
      <PageHeader
        title="메뉴·재고 관리"
        desc="메뉴를 관리하고 주요 재고 현황을 확인하세요."
        action={
          <button onClick={() => setAddOpen(true)} className="btn-primary">
            <Plus size={16} /> 메뉴 추가
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[240px_1fr_360px]">
        {/* category sidebar */}
        <div className="card h-fit p-3">
          {menuCategories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`mb-1 w-full rounded-xl px-4 py-3 text-left text-sm font-medium transition ${
                category === c ? "bg-brand-50 text-brand-700" : "text-black hover:bg-slate-50"
              }`}
            >
              {c}
              <span className="ml-1 text-xs text-black/50">
                ({c === "전체" ? items.length : items.filter((i) => i.category === c).length})
              </span>
            </button>
          ))}
        </div>

        {/* list */}
        <div>
          <div className="mb-4 flex items-center gap-2">
            <div className="relative flex-1">
              <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-black/40" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="메뉴명 검색"
                className="input pl-9"
              />
            </div>
            <select className="input w-36" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option>전체 상태</option>
              <option>정상</option>
              <option>부족</option>
              <option>품절</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4 auto-rows-fr">
            {filtered.map((m) => (
              <button
                key={m.id}
                onClick={() => setSelectedId(m.id)}
                className={`card flex h-[180px] flex-col items-start gap-2 p-4 text-left transition hover:-translate-y-0.5 ${
                  selected.id === m.id ? "ring-2 ring-brand-400" : ""
                }`}
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-3xl">
                  {m.image}
                </div>
                <p className="mt-1 w-full truncate text-base font-semibold text-black" title={m.name}>
                  {m.name}
                </p>
                <p className="text-sm font-bold text-brand-600">{m.price.toLocaleString()}원</p>
                <div className="flex w-full flex-wrap items-center gap-1.5">
                  <StatusBadge status={m.stockStatus} />
                  <span className="whitespace-nowrap text-xs text-black/50">재고: {m.stockQty}</span>
                </div>
              </button>
            ))}
            {filtered.length === 0 && (
              <p className="col-span-full py-10 text-center text-sm text-black/50">검색 결과가 없습니다.</p>
            )}
          </div>
        </div>

        {/* detail */}
        <div className="card h-fit p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-base font-bold text-black">
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

          <p className="mb-4 text-xs font-semibold uppercase text-black/50">기본 정보</p>
          <div className="space-y-3 text-sm">
            <div>
              <label className="mb-1 block text-xs text-black/60">카테고리</label>
              <select
                className="input"
                value={editForm.category}
                onChange={(e) => setEditForm((f) => ({ ...f, category: e.target.value as MenuItem["category"] }))}
              >
                {menuCategories.slice(1).map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs text-black/60">판매 가격</label>
              <input
                className="input"
                value={editForm.price}
                onChange={(e) => setEditForm((f) => ({ ...f, price: e.target.value }))}
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-black/60">메뉴 설명</label>
              <textarea
                className="input"
                rows={2}
                value={editForm.desc}
                onChange={(e) => setEditForm((f) => ({ ...f, desc: e.target.value }))}
              />
            </div>
          </div>

          <p className="mb-3 mt-5 text-xs font-semibold uppercase text-black/50">재고 정보</p>
          <div className="space-y-3 text-sm">
            <div>
              <label className="mb-1 block text-xs text-black/60">재고 설정</label>
              <select
                className="input"
                value={editForm.stockMode}
                onChange={(e) => setEditForm((f) => ({ ...f, stockMode: e.target.value }))}
              >
                <option>무제한</option>
                <option>관리함</option>
              </select>
            </div>
            <div className="flex justify-between text-xs text-black/60">
              <span>현재 재고</span>
              <span className="font-semibold text-black">{selected.stockQty}</span>
            </div>
          </div>

          <div className="mt-5 flex gap-2">
            <button onClick={saveEdit} className="btn-primary flex-1">
              <Pencil size={14} /> 수정
            </button>
            <button onClick={deleteItem} className="btn-secondary flex-1 !border-red-200 !text-red-600 hover:!bg-red-50">
              <Trash2 size={14} /> 삭제
            </button>
          </div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="card flex items-center gap-3 p-4">
          <PackageCheck className="text-emerald-500" size={22} />
          <div>
            <p className="text-xs text-black/60">정상 재고</p>
            <p className="font-bold text-black">{stockSummary.normal}개</p>
          </div>
        </div>
        <div className="card flex items-center gap-3 p-4">
          <AlertTriangle className="text-amber-500" size={22} />
          <div>
            <p className="text-xs text-black/60">부족 재고</p>
            <p className="font-bold text-black">{stockSummary.low}개</p>
          </div>
        </div>
        <div className="card flex items-center gap-3 p-4">
          <PackageX className="text-red-500" size={22} />
          <div>
            <p className="text-xs text-black/60">품절</p>
            <p className="font-bold text-black">{stockSummary.out}개</p>
          </div>
        </div>
        <div className="card p-4">
          <p className="mb-2 text-xs font-semibold text-black/60">최근 발주 내역</p>
          <div className="space-y-1">
            {recentOrdersToStock.map((o, i) => (
              <p key={i} className="text-xs text-black/60">
                <span className="text-black/40">{o.date}</span> {o.item}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 card overflow-x-auto p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="flex items-center gap-1.5 font-bold text-black">
            <ClipboardList size={16} className="text-brand-500" /> 재고 입출고 로그
          </h3>
          <button onClick={() => setLogOpen(true)} className="btn-primary">
            <Plus size={15} /> 입출고 등록
          </button>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="table-th">일시</th>
              <th className="table-th">품목</th>
              <th className="table-th">구분</th>
              <th className="table-th">수량</th>
              <th className="table-th">사유</th>
              <th className="table-th">담당자</th>
            </tr>
          </thead>
          <tbody>
            {stockLogs.map((l) => (
              <tr key={l.id} className="border-b border-slate-50 hover:bg-slate-50">
                <td className="table-td text-black/60">{l.date}</td>
                <td className="table-td font-medium text-black">{l.item}</td>
                <td className="table-td">
                  <span
                    className={`badge ${
                      l.type === "입고" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                    }`}
                  >
                    {l.type === "입고" ? <ArrowDownCircle size={12} /> : <ArrowUpCircle size={12} />}
                    {l.type}
                  </span>
                </td>
                <td className={`table-td font-semibold ${l.type === "입고" ? "text-emerald-600" : "text-red-600"}`}>{l.qty}</td>
                <td className="table-td text-black">{l.reason}</td>
                <td className="table-td text-black">{l.staff}</td>
              </tr>
            ))}
            {stockLogs.length === 0 && (
              <tr>
                <td colSpan={6} className="table-td py-8 text-center text-black/50">
                  입출고 내역이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {addOpen && (
        <Modal title="메뉴 추가" onClose={() => setAddOpen(false)}>
          <div className="space-y-3 text-sm">
            <div>
              <label className="mb-1 block text-xs text-black/60">메뉴명</label>
              <input className="input" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="예: 헤이즐넛 라떼" />
            </div>
            <div>
              <label className="mb-1 block text-xs text-black/60">카테고리</label>
              <select
                className="input"
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value as MenuItem["category"] }))}
              >
                {menuCategories.slice(1).map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs text-black/60">판매 가격</label>
              <input className="input" value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))} placeholder="예: 5000" />
            </div>
            <div>
              <label className="mb-1 block text-xs text-black/60">메뉴 설명</label>
              <textarea className="input" rows={2} value={form.desc} onChange={(e) => setForm((f) => ({ ...f, desc: e.target.value }))} />
            </div>
            <div>
              <label className="mb-1 block text-xs text-black/60">재고 설정</label>
              <select className="input" value={form.stockQty} onChange={(e) => setForm((f) => ({ ...f, stockQty: e.target.value }))}>
                <option>무제한</option>
                <option>관리함</option>
              </select>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <button className="btn-secondary flex-1" onClick={() => setAddOpen(false)}>
              취소
            </button>
            <button className="btn-primary flex-1" onClick={addMenu}>
              추가
            </button>
          </div>
        </Modal>
      )}

      {logOpen && (
        <Modal title="재고 입출고 등록" onClose={() => setLogOpen(false)}>
          <div className="space-y-3 text-sm">
            <div>
              <label className="mb-1 block text-xs text-black/60">품목</label>
              <input
                className="input"
                value={logForm.item}
                onChange={(e) => setLogForm((f) => ({ ...f, item: e.target.value }))}
                placeholder="예: 원두(남미) 2kg"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-xs text-black/60">구분</label>
                <select
                  className="input"
                  value={logForm.type}
                  onChange={(e) => setLogForm((f) => ({ ...f, type: e.target.value as StockLog["type"] }))}
                >
                  <option>입고</option>
                  <option>출고</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs text-black/60">수량</label>
                <input
                  className="input"
                  value={logForm.qty}
                  onChange={(e) => setLogForm((f) => ({ ...f, qty: e.target.value }))}
                  placeholder="예: 2kg"
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs text-black/60">사유</label>
              <input
                className="input"
                value={logForm.reason}
                onChange={(e) => setLogForm((f) => ({ ...f, reason: e.target.value }))}
                placeholder="예: 정기 발주 / 판매 소진 / 폐기"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-black/60">담당자</label>
              <input
                className="input"
                value={logForm.staff}
                onChange={(e) => setLogForm((f) => ({ ...f, staff: e.target.value }))}
                placeholder="예: 정다은"
              />
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <button className="btn-secondary flex-1" onClick={() => setLogOpen(false)}>
              취소
            </button>
            <button className="btn-primary flex-1" onClick={addStockLog}>
              등록
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
