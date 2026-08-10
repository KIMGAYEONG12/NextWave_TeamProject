"use client";
import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import Card from "@/components/Card";
import StoreTabs from "@/components/StoreTabs";
import Input from "@/components/Input";
import Select from "@/components/Select";
import Button from "@/components/Button";
import Badge from "@/components/Badge";
import Icon from "@/components/icons";
import { storeNews } from "@/lib/mock-data";

type TabKey = "all" | "notice" | "event" | "banner" | "draft";

const statusTone: Record<string, "green" | "blue" | "gray"> = {
  게시중: "green",
  예약: "blue",
  종료: "gray",
};

export default function NewsPage() {
  const [tab, setTab] = useState<TabKey>("all");

  const filtered = storeNews.filter((n) => {
    if (tab === "all") return true;
    if (tab === "notice") return n.type === "공지";
    if (tab === "event") return n.type === "이벤트";
    return true;
  });

  return (
    <div className="p-6 md:p-8 max-w-[1400px] mx-auto">
      <PageHeader
        title="매장 소식 관리"
        subtitle="매장 공지사항 및 이벤트 소식을 관리하세요."
        action={
          <Button size="md">
            <Icon name="plus" className="w-4 h-4" /> 새 소식 작성
          </Button>
        }
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
        <Card>
          <p className="text-sm text-ink-500">전체 소식</p>
          <p className="text-2xl font-bold text-ink-900 mt-1">32건</p>
          <p className="text-xs text-ink-400 mt-1">전체</p>
        </Card>
        <Card>
          <p className="text-sm text-ink-500">공지</p>
          <p className="text-2xl font-bold text-ink-900 mt-1">18건</p>
          <p className="text-xs text-ink-400 mt-1">중요 공지</p>
        </Card>
        <Card>
          <p className="text-sm text-ink-500">이벤트</p>
          <p className="text-2xl font-bold text-ink-900 mt-1">10건</p>
          <p className="text-xs text-ink-400 mt-1">이벤트</p>
        </Card>
        <Card>
          <p className="text-sm text-ink-500">배너</p>
          <p className="text-2xl font-bold text-ink-900 mt-1">4건</p>
          <p className="text-xs text-ink-400 mt-1">배너/홍보</p>
        </Card>
      </div>

      <Card padded={false}>
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 pt-4">
          <StoreTabs
            tabs={[
              { key: "all", label: "전체 32" },
              { key: "notice", label: "공지 18" },
              { key: "event", label: "이벤트 10" },
              { key: "banner", label: "배너 4" },
              { key: "draft", label: "임시저장 2" },
            ]}
            active={tab}
            onChange={setTab}
          />
          <div className="flex items-center gap-2">
            <Input icon="search" placeholder="제목 검색" className="w-48" />
            <Select className="w-28" defaultValue="all">
              <option value="all">전체 상태</option>
              <option value="live">게시중</option>
            </Select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-ink-400 text-xs border-y border-ink-100">
                <th className="px-5 py-2.5 font-medium">제목</th>
                <th className="px-2 py-2.5 font-medium">유형</th>
                <th className="px-2 py-2.5 font-medium">게시 기간</th>
                <th className="px-2 py-2.5 font-medium">상태</th>
                <th className="px-2 py-2.5 font-medium">조회수</th>
                <th className="px-5 py-2.5 font-medium">관리</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((n) => (
                <tr
                  key={n.title}
                  className="border-b border-ink-50 hover:bg-ink-50"
                >
                  <td className="px-5 py-3 font-medium text-ink-800">
                    {n.title}
                  </td>
                  <td className="px-2 py-3">
                    <Badge tone={n.type === "이벤트" ? "purple" : "blue"}>
                      {n.type}
                    </Badge>
                  </td>
                  <td className="px-2 py-3 text-ink-400 text-xs">{n.period}</td>
                  <td className="px-2 py-3">
                    <Badge tone={statusTone[n.status]}>{n.status}</Badge>
                  </td>
                  <td className="px-2 py-3 text-ink-600">{n.views}</td>
                  <td className="px-5 py-3 text-ink-400">···</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-center gap-2 px-5 py-4 text-sm text-ink-500">
          <button className="px-2">‹</button>
          {[1, 2, 3, 4].map((p) => (
            <button
              key={p}
              className={`w-7 h-7 rounded-md ${p === 1 ? "bg-brand-600 text-white" : "hover:bg-ink-100"}`}
            >
              {p}
            </button>
          ))}
          <span>…</span>
          <button className="w-7 h-7 rounded-md hover:bg-ink-100">7</button>
          <button className="px-2">›</button>
        </div>
      </Card>
    </div>
  );
}
