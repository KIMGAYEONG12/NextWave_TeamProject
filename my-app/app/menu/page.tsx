"use client";
import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import Card from "@/components/Card";
import Input from "@/components/Input";
import Select from "@/components/Select";
import Button from "@/components/Button";
import Badge from "@/components/Badge";
import Icon from "@/components/icons";
import { menuItems } from "@/lib/mock-data";

const categories = ["전체", "커피", "논커피", "티", "디저트", "베이커리", "시즌메뉴"];

export default function MenuPage() {
  const [activeCat, setActiveCat] = useState("전체");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(menuItems[0]);
  const [available, setAvailable] = useState(true);

  const filtered = menuItems.filter((m) => {
    const matchCat = activeCat === "전체" || m.category === activeCat;
    const matchQuery = m.name.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQuery;
  });

  return (
    <div className="p-6 md:p-8 max-w-[1400px] mx-auto">
      <PageHeader
        title="메뉴·재고 관리"
        subtitle="메뉴를 관리하고 주요 재고 현황을 확인하세요."
        action={
          <Button size="md">
            <Icon name="plus" className="w-4 h-4" /> 메뉴 추가
          </Button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-5">
        <Card padded={false} className="overflow-hidden">
          <div className="flex flex-wrap items-center gap-4 px-5 pt-4">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCat(c)}
                className={`pb-3 text-sm border-b-2 -mb-px ${
                  activeCat === c
                    ? "border-brand-600 text-brand-600 font-semibold"
                    : "border-transparent text-ink-500 hover:text-ink-800"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="border-t border-ink-100" />
          <div className="flex items-center gap-3 px-5 py-3">
            <div className="flex-1">
              <Input
                icon="search"
                placeholder="메뉴명 검색"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <Select className="w-40" defaultValue="all">
              <option value="all">전체 상태</option>
              <option value="ok">판매중</option>
              <option value="out">품절</option>
            </Select>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 px-5 pb-5">
            {filtered.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelected(item)}
                className={`text-left rounded-xl border p-3 transition-colors ${
                  selected.id === item.id
                    ? "border-brand-400 ring-2 ring-brand-100 bg-brand-50/40"
                    : "border-ink-100 hover:border-ink-200"
                }`}
              >
                <div className="w-full aspect-square rounded-lg bg-ink-50 flex items-center justify-center text-3xl mb-2">
                  {item.img}
                </div>
                <p className="text-sm font-medium text-ink-800 truncate">{item.name}</p>
                <p className="text-xs text-ink-400">{item.price.toLocaleString()}원</p>
                <Badge
                  tone={item.stockLevel === "ok" ? "green" : item.stockLevel === "low" ? "amber" : "red"}
                  className="mt-1.5"
                >
                  재고: {item.stock}
                </Badge>
              </button>
            ))}
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-ink-900 flex items-center gap-2">
              <span className="text-2xl">{selected.img}</span> {selected.name}
            </h3>
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <span className="text-xs text-ink-500">판매중</span>
              <span
                onClick={() => setAvailable((v) => !v)}
                className={`w-9 h-5 rounded-full relative transition-colors ${
                  available ? "bg-brand-600" : "bg-ink-200"
                }`}
              >
                <span
                  className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                    available ? "translate-x-4" : "translate-x-0.5"
                  }`}
                />
              </span>
            </label>
          </div>

          <p className="text-xs font-semibold text-ink-400 mb-2">기본 정보</p>
          <div className="space-y-3 mb-5">
            <div>
              <label className="text-xs text-ink-500 mb-1 block">카테고리</label>
              <Select defaultValue={selected.category}>
                {categories.slice(1).map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </Select>
            </div>
            <div>
              <label className="text-xs text-ink-500 mb-1 block">판매 가격</label>
              <Input defaultValue={selected.price} type="number" />
            </div>
            <div>
              <label className="text-xs text-ink-500 mb-1 block">메뉴 설명</label>
              <textarea
                className="w-full rounded-lg border border-ink-200 text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-200"
                rows={2}
                defaultValue={`고소한 원두 향이 살아있는 ${selected.name}입니다.`}
              />
            </div>
          </div>

          <p className="text-xs font-semibold text-ink-400 mb-2">재고 정보</p>
          <div className="space-y-3 mb-6">
            <div>
              <label className="text-xs text-ink-500 mb-1 block">재고 설정</label>
              <Select defaultValue="track">
                <option value="track">추적함</option>
                <option value="none">추적안함</option>
              </Select>
            </div>
            <div>
              <label className="text-xs text-ink-500 mb-1 block">현재 재고</label>
              <Input defaultValue={selected.stock} />
            </div>
          </div>

          <div className="flex gap-2">
            <Button className="flex-1">수정</Button>
            <Button variant="danger" className="flex-1">삭제</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
