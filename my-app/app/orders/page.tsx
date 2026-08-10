"use client";
import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import Card from "@/components/Card";
import Input from "@/components/Input";
import Select from "@/components/Select";
import Button from "@/components/Button";
import Badge from "@/components/Badge";
import StoreTabs from "@/components/StoreTabs";
import { orderList } from "@/lib/mock-data";

const statusTone: Record<string, "blue" | "amber" | "green" | "red"> = {
  접수: "blue",
  준비중: "amber",
  완료: "green",
  취소: "red",
};

type TabKey = "all" | "progress" | "done" | "cancel";

export default function OrdersPage() {
  const [tab, setTab] = useState<TabKey>("all");
  const [selected, setSelected] = useState(orderList[0]);

  const filtered = orderList.filter((o) => {
    if (tab === "all") return true;
    if (tab === "progress") return o.status === "접수" || o.status === "준비중";
    if (tab === "done") return o.status === "완료";
    return o.status === "취소";
  });

  return (
    <div className="p-6 md:p-8 max-w-[1400px] mx-auto">
      <PageHeader
        title="주문 (POS) 관리"
        subtitle="매장 주문 내역과 결제 상태를 관리하세요."
      />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-5">
        <Card padded={false}>
          <div className="px-5 pt-4">
            <StoreTabs
              tabs={[
                { key: "all", label: "전체 주문", count: orderList.length },
                {
                  key: "progress",
                  label: "진행 중",
                  count: orderList.filter(
                    (o) => o.status === "접수" || o.status === "준비중",
                  ).length,
                },
                {
                  key: "done",
                  label: "완료",
                  count: orderList.filter((o) => o.status === "완료").length,
                },
                {
                  key: "cancel",
                  label: "취소",
                  count: orderList.filter((o) => o.status === "취소").length,
                },
              ]}
              active={tab}
              onChange={setTab}
            />
          </div>
          <div className="flex items-center gap-3 px-5 py-3">
            <div className="flex-1">
              <Input icon="search" placeholder="주문번호 / 고객명 검색" />
            </div>
            <Input type="date" defaultValue="2026-08-07" className="w-40" />
            <Select className="w-28" defaultValue="all">
              <option value="all">전체</option>
              <option value="dine">매장</option>
              <option value="take">포장</option>
            </Select>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-ink-400 text-xs border-y border-ink-100">
                  <th className="px-5 py-2.5 font-medium">주문번호</th>
                  <th className="px-2 py-2.5 font-medium">고객</th>
                  <th className="px-2 py-2.5 font-medium">주문 내역</th>
                  <th className="px-2 py-2.5 font-medium">금액</th>
                  <th className="px-2 py-2.5 font-medium">상태</th>
                  <th className="px-5 py-2.5 font-medium">시간</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((o) => (
                  <tr
                    key={o.id}
                    onClick={() => setSelected(o)}
                    className={`border-b border-ink-50 cursor-pointer ${
                      selected.id === o.id
                        ? "bg-brand-50/50"
                        : "hover:bg-ink-50"
                    }`}
                  >
                    <td className="px-5 py-3 font-medium text-brand-700">
                      {o.id}
                    </td>
                    <td className="px-2 py-3 text-ink-700">{o.customer}</td>
                    <td className="px-2 py-3 text-ink-500">{o.items}</td>
                    <td className="px-2 py-3 text-ink-800">{o.amount}</td>
                    <td className="px-2 py-3">
                      <Badge tone={statusTone[o.status]}>{o.status}</Badge>
                    </td>
                    <td className="px-5 py-3 text-ink-400">{o.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-ink-900">
              주문 상세 {selected.id}
            </h3>
            <Badge tone={statusTone[selected.status]}>{selected.status}</Badge>
          </div>
          <dl className="text-sm space-y-2 mb-4">
            <div className="flex justify-between">
              <dt className="text-ink-500">주문 시간</dt>
              <dd className="text-ink-800">2026.08.07 {selected.time}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink-500">주문 고객</dt>
              <dd className="text-ink-800">{selected.customer}</dd>
            </div>
          </dl>
          <p className="text-xs font-semibold text-ink-400 mb-2">주문 내역</p>
          <div className="rounded-lg border border-ink-100 divide-y divide-ink-50 mb-4">
            {selected.items.split(" + ").map((line) => (
              <div
                key={line}
                className="flex justify-between px-3 py-2.5 text-sm"
              >
                <span className="text-ink-700">{line}</span>
                <span className="text-ink-400">x1</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center bg-ink-50 rounded-lg px-3 py-3 mb-5">
            <span className="text-sm text-ink-600">합계</span>
            <span className="text-lg font-bold text-ink-900">
              {selected.amount}
            </span>
          </div>
          <div className="flex gap-2">
            <Button className="flex-1">준비 완료</Button>
            <Button variant="danger" className="flex-1">
              주문 취소
            </Button>
          </div>
          <Button variant="outline" className="w-full mt-2">
            영수증 출력
          </Button>
        </Card>
      </div>
    </div>
  );
}
