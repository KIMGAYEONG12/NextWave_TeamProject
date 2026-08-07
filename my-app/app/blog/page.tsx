"use client";
import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import Card from "@/components/Card";
import StatCard from "@/components/StatCard";
import StoreTabs from "@/components/StoreTabs";
import Select from "@/components/Select";
import Button from "@/components/Button";
import Badge from "@/components/Badge";
import Icon from "@/components/icons";
import { blogPosts } from "@/lib/mock-data";

type TabKey = "all" | "published" | "draft" | "scheduled";

const statusTone: Record<string, "green" | "gray" | "blue"> = {
  "발행 중": "green",
  "임시 저장": "gray",
  "예약 발행": "blue",
};

export default function BlogPage() {
  const [tab, setTab] = useState<TabKey>("all");

  const filtered = blogPosts.filter((p) => {
    if (tab === "all") return true;
    if (tab === "published") return p.status === "발행 중";
    if (tab === "draft") return p.status === "임시 저장";
    return p.status === "예약 발행";
  });

  return (
    <div className="p-6 md:p-8 max-w-[1400px] mx-auto">
      <PageHeader
        title="블로그 (CMS)"
        subtitle="매장 소식과 이벤트를 블로그로 관리하고 발행하세요."
        action={
          <Button size="md">
            <Icon name="edit" className="w-4 h-4" /> 새 글 작성
          </Button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-5">
        <StatCard label="전체 글" value="48개" icon="blog" iconTone="blue" />
        <StatCard label="발행 중" value="32개" icon="check" iconTone="green" />
        <StatCard label="임시 저장" value="6개" icon="edit" iconTone="amber" />
        <StatCard label="예약 발행" value="3개" icon="reservation" iconTone="purple" />
        <StatCard label="조회수 (이번 달)" value="2,845" delta="▲ 18%" icon="seo" iconTone="blue" />
      </div>

      <Card padded={false}>
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 pt-4">
          <StoreTabs
            tabs={[
              { key: "all", label: "전체 글" },
              { key: "published", label: "발행 중" },
              { key: "draft", label: "임시 저장" },
              { key: "scheduled", label: "예약 발행" },
            ]}
            active={tab}
            onChange={setTab}
          />
          <Select className="w-32" defaultValue="all">
            <option value="all">전체 카테고리</option>
            <option>이벤트</option>
            <option>매장 소개</option>
          </Select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-ink-400 text-xs border-y border-ink-100">
                <th className="px-5 py-2.5 font-medium">제목</th>
                <th className="px-2 py-2.5 font-medium">카테고리</th>
                <th className="px-2 py-2.5 font-medium">상태</th>
                <th className="px-2 py-2.5 font-medium">작성일</th>
                <th className="px-2 py-2.5 font-medium">조회수</th>
                <th className="px-5 py-2.5 font-medium">관리</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.title} className="border-b border-ink-50 hover:bg-ink-50">
                  <td className="px-5 py-3 font-medium text-ink-800">{p.title}</td>
                  <td className="px-2 py-3 text-ink-500">{p.category}</td>
                  <td className="px-2 py-3"><Badge tone={statusTone[p.status]}>{p.status}</Badge></td>
                  <td className="px-2 py-3 text-ink-400 text-xs">{p.date}</td>
                  <td className="px-2 py-3 text-ink-600">{p.views ?? "-"}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3 text-ink-400">
                      <button className="hover:text-ink-700"><Icon name="edit" className="w-4 h-4" /></button>
                      <button className="hover:text-red-500"><Icon name="trash" className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3">
          <a href="#" className="text-xs text-brand-600 font-medium">전체 글 보기 →</a>
        </div>
      </Card>
    </div>
  );
}
