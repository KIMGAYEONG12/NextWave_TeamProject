"use client";
import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import Card from "@/components/Card";
import StatCard from "@/components/StatCard";
import StoreTabs from "@/components/StoreTabs";
import Input from "@/components/Input";
import Select from "@/components/Select";
import Button from "@/components/Button";
import Badge from "@/components/Badge";
import Icon from "@/components/icons";
import ReviewInput from "@/components/ReviewInput";
import { members, reviews } from "@/lib/mock-data";

type TabKey = "customers" | "reviews" | "reports";

const gradeTone: Record<string, "navy" | "amber" | "gray" | "purple" | "green"> = {
  VIP: "navy",
  GOLD: "amber",
  SILVER: "gray",
  BRONZE: "purple",
  NEW: "green",
};

export default function CustomersPage() {
  const [tab, setTab] = useState<TabKey>("reviews");
  const [selected, setSelected] = useState(members[0]);

  return (
    <div className="p-6 md:p-8 max-w-[1400px] mx-auto">
      <PageHeader title="고객 및 리뷰 관리" subtitle="고객 정보와 리뷰를 한눈에 보고 관리하세요." />

      <div className="mb-5">
        <StoreTabs
          tabs={[
            { key: "customers", label: "고객 관리" },
            { key: "reviews", label: "리뷰 관리", count: reviews.length },
            { key: "reports", label: "신고/차단 관리" },
          ]}
          active={tab}
          onChange={setTab}
        />
      </div>

      {tab === "reviews" && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
            <StatCard label="전체 리뷰" value="152개" delta="▲ 18개" deltaLabel="(이번 주)" icon="star" iconTone="blue" />
            <StatCard label="평균 평점" value="4.7 / 5" delta="▲ 0.2" deltaLabel="" icon="star" iconTone="amber" />
            <StatCard label="답변 완료율" value="92%" delta="▲ 8%" deltaLabel="" icon="check" iconTone="green" />
            <StatCard label="신고/차단 요청" value="3건" delta="▲ 1건" deltaLabel="" icon="aiSettings" iconTone="red" />
          </div>

          <Card padded={false}>
            <div className="flex flex-wrap items-center gap-3 px-5 py-4">
              <div className="flex-1 min-w-[180px]">
                <Input icon="search" placeholder="리뷰 내용, 고객명 검색" />
              </div>
              <Select className="w-32" defaultValue="all">
                <option value="all">전체 평점</option>
                <option value="5">5점</option>
                <option value="4">4점</option>
              </Select>
              <Select className="w-36" defaultValue="all">
                <option value="all">전체 상태</option>
                <option value="done">답변 완료</option>
                <option value="wait">답변 대기</option>
              </Select>
              <Input type="date" defaultValue="2026-07-01" className="w-40" />
            </div>
            <div className="divide-y divide-ink-50">
              {reviews.map((r) => (
                <div key={r.name} className="px-5 py-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-ink-100 flex items-center justify-center shrink-0">🙂</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-ink-800">{r.name}</p>
                          <span className="text-xs text-ink-400">{r.grade}</span>
                        </div>
                        <span className="text-xs text-ink-400">{r.date}</span>
                      </div>
                      <div className="flex items-center gap-2 my-1">
                        <div className="flex text-amber-400">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Icon key={i} name="star" className={`w-3.5 h-3.5 ${i < Math.round(r.rating) ? "" : "text-ink-200"}`} />
                          ))}
                        </div>
                        <span className="text-xs text-ink-500">{r.rating.toFixed(1)}</span>
                        <Badge tone={r.status === "답변 완료" ? "green" : r.status === "신고 접수" ? "red" : "amber"}>
                          {r.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-ink-600 mb-2">{r.content}</p>
                      <ReviewInput />
                    </div>
                    <button className="text-ink-300 hover:text-ink-600">
                      <Icon name="dots" className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-5 py-3">
              <a href="#" className="text-xs text-brand-600 font-medium">전체 리뷰 보기 →</a>
            </div>
          </Card>
        </>
      )}

      {tab === "customers" && (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5">
          <Card padded={false}>
            <div className="flex items-center gap-3 px-5 py-4">
              <div className="flex-1">
                <Input icon="search" placeholder="이름, 휴대폰, 이메일 검색" />
              </div>
              <Select className="w-32" defaultValue="all">
                <option value="all">전체 등급</option>
                <option value="vip">VIP</option>
                <option value="gold">GOLD</option>
              </Select>
              <Button variant="outline" size="md">
                <Icon name="download" className="w-4 h-4" /> 엑셀 내보내기
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-ink-400 text-xs border-y border-ink-100">
                    <th className="px-5 py-2.5 font-medium">고객 정보</th>
                    <th className="px-2 py-2.5 font-medium">등급</th>
                    <th className="px-2 py-2.5 font-medium">포인트</th>
                    <th className="px-2 py-2.5 font-medium">방문 횟수</th>
                    <th className="px-2 py-2.5 font-medium">최근 방문일</th>
                    <th className="px-2 py-2.5 font-medium">총 주문 금액</th>
                    <th className="px-5 py-2.5 font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {members.map((m) => (
                    <tr
                      key={m.name}
                      onClick={() => setSelected(m)}
                      className={`border-b border-ink-50 cursor-pointer ${selected.name === m.name ? "bg-brand-50/50" : "hover:bg-ink-50"}`}
                    >
                      <td className="px-5 py-3">
                        <p className="font-medium text-ink-800">{m.name}</p>
                        <p className="text-xs text-ink-400">{m.email}</p>
                      </td>
                      <td className="px-2 py-3"><Badge tone={gradeTone[m.grade]}>{m.grade}</Badge></td>
                      <td className="px-2 py-3 text-ink-700">{m.points}</td>
                      <td className="px-2 py-3 text-ink-500">{m.visits}</td>
                      <td className="px-2 py-3 text-ink-400 text-xs">{m.lastVisit}</td>
                      <td className="px-2 py-3 text-ink-800">{m.total}</td>
                      <td className="px-5 py-3">
                        <Button size="sm" variant="outline">상세 보기</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-ink-100 flex items-center justify-center">🙂</div>
              <div>
                <p className="text-sm font-semibold text-ink-900">{selected.name}</p>
                <Badge tone={gradeTone[selected.grade]} className="mt-1">{selected.grade}</Badge>
              </div>
            </div>
            <p className="text-xs text-ink-400 mb-4">{selected.email} · {selected.phone}</p>
            <div className="grid grid-cols-3 gap-2 text-center mb-4">
              <div className="rounded-lg bg-ink-50 py-2">
                <p className="text-sm font-bold text-ink-900">{selected.points}</p>
                <p className="text-[11px] text-ink-400">포인트</p>
              </div>
              <div className="rounded-lg bg-ink-50 py-2">
                <p className="text-sm font-bold text-ink-900">{selected.visits}</p>
                <p className="text-[11px] text-ink-400">방문 횟수</p>
              </div>
              <div className="rounded-lg bg-ink-50 py-2">
                <p className="text-sm font-bold text-ink-900">{selected.total}</p>
                <p className="text-[11px] text-ink-400">총 주문 금액</p>
              </div>
            </div>
            <p className="text-xs font-semibold text-ink-400 mb-2">등급 혜택</p>
            <ul className="space-y-1.5 text-sm text-ink-600 mb-5">
              <li className="flex items-center gap-2"><Icon name="check" className="w-3.5 h-3.5 text-brand-500" /> 모든 메뉴 10% 할인</li>
              <li className="flex items-center gap-2"><Icon name="check" className="w-3.5 h-3.5 text-brand-500" /> 생일 쿠폰 제공</li>
              <li className="flex items-center gap-2"><Icon name="check" className="w-3.5 h-3.5 text-brand-500" /> 우선 예약 혜택</li>
              <li className="flex items-center gap-2"><Icon name="check" className="w-3.5 h-3.5 text-brand-500" /> 신메뉴 시식 초대</li>
            </ul>
            <Button className="w-full">고객 상세 정보 보기</Button>
          </Card>
        </div>
      )}

      {tab === "reports" && (
        <Card>
          <p className="text-sm text-ink-500">
            신고 및 차단 처리 대기 중인 항목이 없습니다. 새로운 신고가 접수되면 이곳에 표시됩니다.
          </p>
        </Card>
      )}
    </div>
  );
}
