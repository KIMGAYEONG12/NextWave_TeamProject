"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { PageHeader, StatusBadge } from "@/components/ui";
import { orders as initialOrders, Order } from "@/lib/data";

const tabs = ["전체", "접수", "준비중", "완료", "취소"] as const;

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [tab, setTab] = useState<(typeof tabs)[number]>("전체");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Order>(initialOrders[0]);

  const filtered = useMemo(
    () =>
      orders.filter(
        (o) =>
          (tab === "전체" || o.status === tab) &&
          (o.customer.includes(query) || o.id.includes(query))
      ),
    [orders, tab, query]
  );

  const advance = (status: Order["status"]) => {
    const order: Record<Order["status"], Order["status"]> = {
      접수: "준비중",
      준비중: "완료",
      완료: "완료",
      취소: "취소",
    };
    const next = order[selected.status];
    setOrders((prev) => prev.map((o) => (o.id === selected.id ? { ...o, status: next } : o)));
    setSelected((s) => ({ ...s, status: next }));
  };

  const cancel = () => {
    setOrders((prev) => prev.map((o) => (o.id === selected.id ? { ...o, status: "취소" } : o)));
    setSelected((s) => ({ ...s, status: "취소" }));
  };

  return (
    <div>
      <PageHeader title="주문/결제(POS) 관리" desc="실시간 주문 내역을 확인하고 상태를 관리하세요." />

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_360px]">
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
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="주문번호 / 고객명 검색"
                className="input py-1.5 pl-8 text-xs"
              />
            </div>
          </div>

          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="table-th">주문번호</th>
                <th className="table-th">고객</th>
                <th className="table-th">주문 내역</th>
                <th className="table-th">금액</th>
                <th className="table-th">상태</th>
                <th className="table-th">시간</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((o) => (
                <tr
                  key={o.id}
                  onClick={() => setSelected(o)}
                  className={`cursor-pointer border-b border-slate-50 hover:bg-slate-50 ${
                    selected.id === o.id ? "bg-brand-50/50" : ""
                  }`}
                >
                  <td className="table-td font-semibold text-brand-600">{o.id}</td>
                  <td className="table-td">{o.customer}</td>
                  <td className="table-td text-black">
                    {o.items.map((i) => i.name).join(", ")}
                    {o.items.length > 1 ? ` 외 ${o.items.length - 1}` : ""}
                  </td>
                  <td className="table-td font-medium">{o.total.toLocaleString()}원</td>
                  <td className="table-td">
                    <StatusBadge status={o.status} />
                  </td>
                  <td className="table-td text-black">{o.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card h-fit p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-bold text-black">주문 상세 {selected.id}</h3>
            <StatusBadge status={selected.status} />
          </div>
          <p className="mb-1 text-xs text-black">주문 시각</p>
          <p className="mb-3 text-sm font-medium text-black">2026.08.07 {selected.time}</p>
          <p className="mb-1 text-xs text-black">주문 고객</p>
          <p className="mb-3 text-sm font-medium text-black">
            {selected.customer} · {selected.phone}
          </p>
          <p className="mb-2 text-xs text-black">주문 내역</p>
          <div className="mb-3 space-y-2 rounded-xl bg-slate-50 p-3">
            {selected.items.map((i, idx) => (
              <div key={idx} className="flex justify-between text-sm">
                <span className="text-black">
                  {i.name} x{i.qty}
                </span>
                <span className="font-medium text-black">{(i.price * i.qty).toLocaleString()}원</span>
              </div>
            ))}
            <div className="flex justify-between border-t border-slate-200 pt-2 text-sm font-bold text-black">
              <span>합계</span>
              <span>{selected.total.toLocaleString()}원</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => advance(selected.status)}
              disabled={selected.status === "완료" || selected.status === "취소"}
              className="btn-primary flex-1"
            >
              {selected.status === "접수" ? "준비 완료" : selected.status === "준비중" ? "완료 처리" : "완료됨"}
            </button>
            <button
              onClick={cancel}
              disabled={selected.status === "완료" || selected.status === "취소"}
              className="btn-secondary flex-1 !border-red-200 !text-red-600 hover:!bg-red-50"
            >
              주문 취소
            </button>
          </div>
          <button className="btn-secondary mt-2 w-full">영수증 출력</button>
        </div>
      </div>
    </div>
  );
}
