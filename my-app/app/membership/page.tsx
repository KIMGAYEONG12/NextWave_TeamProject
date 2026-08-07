"use client";
import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import Card from "@/components/Card";
import StatCard from "@/components/StatCard";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Badge from "@/components/Badge";
import { coupons } from "@/lib/mock-data";

export default function MembershipPage() {
  const [rate, setRate] = useState(3);

  return (
    <div className="p-6 md:p-8 max-w-[1400px] mx-auto">
      <PageHeader title="멤버십 (포인트·쿠폰)" subtitle="포인트 적립 정책을 설정하고 쿠폰을 발급/관리하세요." />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        <StatCard label="총 회원 수" value="1,248명" delta="▲ 12명" deltaLabel="(이번 주)" icon="customers" iconTone="blue" />
        <StatCard label="보유 포인트 합계" value="98,450P" delta="▲ 8,230P" deltaLabel="(이번 주)" icon="membership" iconTone="green" />
        <StatCard label="이번 달 사용 포인트" value="24,300P" delta="▲ 18%" deltaLabel="" icon="sales" iconTone="amber" />
        <StatCard label="쿠폰 사용률" value="38%" delta="▲ 5%" deltaLabel="" icon="pricing" iconTone="purple" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-5">
        <Card>
          <h3 className="text-sm font-semibold text-ink-800 mb-4">포인트 적립 정책</h3>
          <label className="text-xs text-ink-500 mb-1 block">적립률</label>
          <div className="flex items-center gap-2 mb-4">
            <Input
              type="number"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-24"
            />
            <span className="text-sm text-ink-500">% 결제 금액 대비</span>
          </div>
          <label className="text-xs text-ink-500 mb-1 block">최소 사용 가능 포인트</label>
          <div className="flex items-center gap-2 mb-4">
            <Input defaultValue={1000} type="number" className="w-24" />
            <span className="text-sm text-ink-500">P 이상</span>
          </div>
          <label className="flex items-center gap-2 text-sm text-ink-600 mb-5">
            <input type="checkbox" className="rounded border-ink-300" />
            쿠폰 + 포인트 중복 사용 제한 (동시 사용 불가)
          </label>
          <Button className="w-full">정책 저장</Button>
        </Card>

        <Card padded={false}>
          <div className="flex items-center justify-between px-5 pt-5 pb-3">
            <h3 className="text-sm font-semibold text-ink-800">쿠폰 관리</h3>
            <Button size="sm">+ 쿠폰 발행</Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-ink-400 text-xs border-y border-ink-100">
                  <th className="px-5 py-2.5 font-medium">쿠폰명</th>
                  <th className="px-2 py-2.5 font-medium">할인 내용</th>
                  <th className="px-2 py-2.5 font-medium">발급 대상</th>
                  <th className="px-2 py-2.5 font-medium">사용 기간</th>
                  <th className="px-2 py-2.5 font-medium">상태</th>
                  <th className="px-2 py-2.5 font-medium">사용 수</th>
                  <th className="px-5 py-2.5 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {coupons.map((c) => (
                  <tr key={c.name} className="border-b border-ink-50 hover:bg-ink-50">
                    <td className="px-5 py-3 font-medium text-ink-800">{c.name}</td>
                    <td className="px-2 py-3 text-ink-600">{c.desc}</td>
                    <td className="px-2 py-3 text-ink-500">{c.target}</td>
                    <td className="px-2 py-3 text-ink-400 text-xs">{c.period}</td>
                    <td className="px-2 py-3">
                      <Badge tone={c.status === "진행중" ? "green" : "gray"}>{c.status}</Badge>
                    </td>
                    <td className="px-2 py-3 text-ink-600">{c.used}</td>
                    <td className="px-5 py-3 text-ink-400">···</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-5 py-3">
            <a href="#" className="text-xs text-brand-600 font-medium">전체 쿠폰 보기 →</a>
          </div>
        </Card>
      </div>
    </div>
  );
}
