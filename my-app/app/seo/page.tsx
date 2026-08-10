"use client";
import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import Card from "@/components/Card";
import StoreTabs from "@/components/StoreTabs";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Badge from "@/components/Badge";

type TabKey = "basic" | "keyword" | "meta" | "sitemap";

export default function SeoPage() {
  const [tab, setTab] = useState<TabKey>("basic");

  return (
    <div className="p-6 md:p-8 max-w-[1400px] mx-auto">
      <PageHeader
        title="SEO 노출 관리"
        subtitle="검색 엔진 노출을 최적화하고 매장 정보를 관리하세요."
      />

      <div className="mb-5">
        <StoreTabs
          tabs={[
            { key: "basic", label: "기본 정보" },
            { key: "keyword", label: "키워드 관리" },
            { key: "meta", label: "메타 태그" },
            { key: "sitemap", label: "사이트맵" },
          ]}
          active={tab}
          onChange={setTab}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5">
        <div className="space-y-5">
          <Card>
            <h3 className="text-sm font-semibold text-ink-800 mb-4">
              검색 노출 미리보기
            </h3>
            <div className="rounded-xl border border-ink-100 p-4 bg-ink-50">
              <p className="text-xs text-emerald-700">https://cafeon.co.kr</p>
              <p className="text-base text-brand-700 font-medium mt-0.5">
                cafeON - 수제 커피와 디저트를 맛있는 공간
              </p>
              <p className="text-xs text-ink-500 mt-1">
                cafeON은 신선한 원두와 정성으로 만든 커피, 디저트를 제공하는
                특별한 카페입니다. 평점: 4.7 · 리뷰 152개 · 영업중 · 08:00 ~
                21:00
              </p>
            </div>
          </Card>
          <Card>
            <h3 className="text-sm font-semibold text-ink-800 mb-4">
              기본 정보
            </h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-ink-500 mb-1 block">
                  매장명
                </label>
                <Input defaultValue="cafeON" />
              </div>
              <div>
                <label className="text-xs text-ink-500 mb-1 block">설명</label>
                <Input defaultValue="수제 커피와 디저트가 있는 공간, cafeON입니다." />
              </div>
              <div>
                <label className="text-xs text-ink-500 mb-1 block">주소</label>
                <Input defaultValue="서울특별시 강남구 테헤란로 123-4" />
              </div>
              <div>
                <label className="text-xs text-ink-500 mb-1 block">
                  전화번호
                </label>
                <Input defaultValue="02-1234-5678" />
              </div>
              <div>
                <label className="text-xs text-ink-500 mb-1 block">
                  대표 이미지
                </label>
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-lg bg-ink-100 flex items-center justify-center text-2xl">
                    ☕
                  </div>
                  <Button variant="outline" size="sm">
                    이미지 변경
                  </Button>
                </div>
              </div>
            </div>
            <Button className="mt-5">저장하기</Button>
          </Card>
        </div>

        <div className="space-y-5">
          <Card>
            <h3 className="text-sm font-semibold text-ink-800 mb-4">
              노출 현황
            </h3>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <dt className="text-ink-500">검색 노출 상태</dt>
                <dd>
                  <Badge tone="green">우수</Badge>
                </dd>
              </div>
              <div className="flex justify-between items-center">
                <dt className="text-ink-500">색인 등록 상태</dt>
                <dd>
                  <Badge tone="green">색인됨</Badge>
                </dd>
              </div>
              <div className="flex justify-between items-center">
                <dt className="text-ink-500">모바일 친화도</dt>
                <dd>
                  <Badge tone="green">우수</Badge>
                </dd>
              </div>
              <div className="flex justify-between items-center">
                <dt className="text-ink-500">페이지 로딩 속도</dt>
                <dd>
                  <Badge tone="blue">빠름</Badge>
                </dd>
              </div>
            </dl>
            <a
              href="#"
              className="mt-4 inline-block text-xs text-brand-600 font-medium"
            >
              상세 분석 보기 →
            </a>
          </Card>
          <Card>
            <h3 className="text-sm font-semibold text-ink-800 mb-3">
              최근 크롤링
            </h3>
            <div className="flex items-center justify-between text-sm">
              <span className="text-ink-500">2026.08.06 14:32</span>
              <Badge tone="green">성공</Badge>
            </div>
            <Button variant="outline" className="w-full mt-4">
              크롤링 요청
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
