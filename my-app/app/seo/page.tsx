"use client";

import { useState } from "react";
import { Eye, Star, CheckCircle2, Loader2 } from "lucide-react";
import { PageHeader } from "@/components/ui";
import { Modal } from "@/components/Modal";
import { useToast } from "@/components/Toast";
import { seoInfo, seoScores, lastCrawl as initialLastCrawl } from "@/lib/data";

const tabs = ["기본 정보", "키워드 관리", "메타 태그", "사이트맵"] as const;

const titleSuffix = seoInfo.title.includes(" – ") ? seoInfo.title.split(" – ")[1] : "";

export default function SeoPage() {
  const showToast = useToast();
  const [tab, setTab] = useState<(typeof tabs)[number]>("기본 정보");
  const [storeName, setStoreName] = useState(seoInfo.title.split(" – ")[0]);
  const [info, setInfo] = useState(seoInfo);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [crawling, setCrawling] = useState(false);
  const [lastCrawl, setLastCrawl] = useState(initialLastCrawl);

  const title = titleSuffix ? `${storeName} – ${titleSuffix}` : storeName;

  const save = () => {
    setInfo((i) => ({ ...i, title }));
    showToast("SEO 정보가 저장되었습니다!");
  };

  const requestCrawl = () => {
    setCrawling(true);
    setTimeout(() => {
      const now = new Date();
      const formatted = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, "0")}.${String(
        now.getDate()
      ).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
      setLastCrawl({ time: formatted, status: "성공" });
      setCrawling(false);
      showToast("크롤링 요청이 완료되었습니다!");
    }, 1200);
  };

  return (
    <div>
      <PageHeader
        title="SEO 노출 관리"
        desc="검색 엔진 노출을 최적화하고 매장 정보를 관리하세요."
        action={
          <button onClick={() => setPreviewOpen(true)} className="btn-secondary">
            <Eye size={15} /> 미리보기
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_340px]">
        <div className="card p-5">
          <div className="mb-4 flex flex-wrap gap-2">
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
          </div>

          {tab === "기본 정보" && (
            <>
              <div className="mb-5 rounded-xl border border-slate-100 bg-slate-50 p-4">
                <p className="mb-1 text-xs text-black/50">검색 노출 미리보기</p>
                <p className="text-sm text-brand-700">{info.url}</p>
                <p className="mt-0.5 text-base font-medium text-blue-700">{title}</p>
                <p className="mt-0.5 text-sm text-black/70">{info.desc}</p>
                <p className="mt-1 text-xs text-black/50">
                  평점: {info.rating} · 리뷰 {info.reviewCount}개 · 영업중 · {info.hours}
                </p>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="mb-1 block text-xs text-black/60">매장명</label>
                  <input className="input" value={storeName} onChange={(e) => setStoreName(e.target.value)} />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-black/60">설명</label>
                  <textarea className="input" rows={2} value={info.desc} onChange={(e) => setInfo({ ...info, desc: e.target.value })} />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-black/60">주소</label>
                  <input className="input" value={info.address} onChange={(e) => setInfo({ ...info, address: e.target.value })} />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-black/60">전화번호</label>
                  <input className="input" value={info.phone} onChange={(e) => setInfo({ ...info, phone: e.target.value })} />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-black/60">대표 이미지</label>
                  <button onClick={() => showToast("이미지 변경 창을 준비 중입니다.")} className="btn-secondary">
                    이미지 변경
                  </button>
                </div>
              </div>
              <button onClick={save} className="btn-primary mt-5">
                저장
              </button>
            </>
          )}

          {tab !== "기본 정보" && (
            <p className="py-16 text-center text-sm text-black/50">{tab} 설정 화면입니다. 준비 중인 세부 옵션이 이어집니다.</p>
          )}
        </div>

        <div className="space-y-5">
          <div className="card p-5">
            <h3 className="mb-3 font-bold text-black">노출 현황</h3>
            <dl className="space-y-2.5 text-sm">
              {Object.entries(seoScores).map(([k, v]) => (
                <div key={k} className="flex items-center justify-between">
                  <dt className="text-black/60">
                    {k === "exposure" ? "검색 노출 상태" : k === "registration" ? "네이버 등록 상태" : k === "mobile" ? "모바일 친화도" : "페이지 로딩 속도"}
                  </dt>
                  <dd className="flex items-center gap-1 font-semibold text-emerald-600">
                    <CheckCircle2 size={14} /> {v}
                  </dd>
                </div>
              ))}
            </dl>
            <a href="#" className="mt-3 inline-block text-xs font-medium text-brand-600">
              상세 분석 보기 →
            </a>
          </div>

          <div className="card p-5">
            <h3 className="mb-3 font-bold text-black">최근 크롤링</h3>
            <div className="flex items-center justify-between text-sm">
              <span className="text-black/60">{lastCrawl.time}</span>
              <span className="flex items-center gap-1 font-semibold text-emerald-600">
                <Star size={13} className="fill-emerald-500 text-emerald-500" /> {lastCrawl.status}
              </span>
            </div>
            <button onClick={requestCrawl} disabled={crawling} className="btn-secondary mt-4 w-full">
              {crawling ? (
                <>
                  <Loader2 size={14} className="animate-spin" /> 크롤링 요청 중...
                </>
              ) : (
                "지금 크롤링 요청"
              )}
            </button>
          </div>
        </div>
      </div>

      {previewOpen && (
        <Modal title="검색 노출 미리보기" onClose={() => setPreviewOpen(false)} width="max-w-lg">
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-sm text-brand-700">{info.url}</p>
            <p className="mt-0.5 text-lg font-medium text-blue-700">{title}</p>
            <p className="mt-1 text-sm text-black/70">{info.desc}</p>
            <p className="mt-2 text-xs text-black/50">
              평점: {info.rating} · 리뷰 {info.reviewCount}개 · 영업중 · {info.hours}
            </p>
            <p className="mt-2 text-xs text-black/50">{info.address} · {info.phone}</p>
          </div>
          <p className="mt-3 text-xs text-black/50">실제 검색 결과에 노출되는 정보의 예시입니다.</p>
          <button className="btn-primary mt-4 w-full" onClick={() => setPreviewOpen(false)}>
            닫기
          </button>
        </Modal>
      )}
    </div>
  );
}
