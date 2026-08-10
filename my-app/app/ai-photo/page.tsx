"use client";

import { useRef, useState } from "react";
import { UploadCloud, Download, BookOpen, ImageIcon } from "lucide-react";
import { PageHeader } from "@/components/ui";
import { aiPhotoUsage, recentRetouches } from "@/lib/data";

const tabs = ["보정하기", "보정 내역"] as const;

export default function AiPhotoPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("보정하기");
  const [original, setOriginal] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      setOriginal(reader.result as string);
      setResult(null);
    };
    reader.readAsDataURL(file);
  };

  const runAiRetouch = () => {
    if (!original) return;
    setProcessing(true);
    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current!;
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d")!;
      // "AI 보정" 데모: 밝기·채도·선명도를 자동 보정하는 필터를 실제로 적용합니다.
      ctx.filter = "brightness(1.08) saturate(1.35) contrast(1.12) drop-shadow(0 0 0 transparent)";
      ctx.drawImage(img, 0, 0);
      setTimeout(() => {
        setResult(canvas.toDataURL("image/jpeg", 0.92));
        setProcessing(false);
      }, 900);
    };
    img.src = original;
  };

  return (
    <div>
      <PageHeader
        title="AI 메뉴 사진 보정"
        desc="AI가 메뉴 사진의 밝기, 색감, 선명도를 자동으로 보정해드립니다."
        action={
          <button className="btn-secondary">
            <BookOpen size={15} /> 사용 가이드 보기
          </button>
        }
      />

      <div className="mb-5 flex items-center justify-between rounded-xl bg-brand-50 px-4 py-2.5 text-sm text-brand-700">
        <span>이번 달 사용량</span>
        <span className="font-semibold">
          {aiPhotoUsage.used} / {aiPhotoUsage.limit}
        </span>
      </div>

      <div className="mb-5 flex gap-2">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium ${
              tab === t ? "bg-brand-600 text-white" : "bg-slate-50 text-slate-500 hover:bg-slate-100"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "보정하기" && (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
            }}
            className="card flex h-64 cursor-pointer flex-col items-center justify-center gap-2 border-2 border-dashed border-slate-200 p-6 text-center hover:border-brand-300"
          >
            {original ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={original} alt="업로드한 이미지" className="h-full max-h-52 rounded-lg object-contain" />
            ) : (
              <>
                <UploadCloud size={30} className="text-slate-300" />
                <p className="text-sm text-slate-500">사진을 드래그하거나 클릭하여 업로드</p>
                <p className="text-xs text-slate-400">JPG, PNG 파일 (최대 10MB)</p>
              </>
            )}
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => e.target.files && handleFile(e.target.files[0])}
            />
          </div>

          <div className="card p-5">
            <p className="mb-3 text-sm font-semibold text-slate-700">보정 미리보기</p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="mb-1.5 text-xs text-slate-400">원본 사진</p>
                <div className="flex h-32 items-center justify-center rounded-xl bg-slate-50">
                  {original ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={original} alt="원본" className="h-full w-full rounded-xl object-cover" />
                  ) : (
                    <ImageIcon className="text-slate-300" />
                  )}
                </div>
              </div>
              <div>
                <p className="mb-1.5 text-xs text-slate-400">AI 보정 결과</p>
                <div className="flex h-32 items-center justify-center rounded-xl bg-slate-50">
                  {result ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={result} alt="보정 결과" className="h-full w-full rounded-xl object-cover" />
                  ) : (
                    <ImageIcon className="text-slate-300" />
                  )}
                </div>
              </div>
            </div>
            <button onClick={runAiRetouch} disabled={!original || processing} className="btn-primary mt-4 w-full">
              {processing ? "AI 보정 중..." : "AI 보정 실행"}
            </button>
            {result && (
              <a href={result} download="ai-retouched.jpg" className="btn-secondary mt-2 flex w-full">
                <Download size={15} /> 다운로드
              </a>
            )}
            <canvas ref={canvasRef} className="hidden" />
          </div>
        </div>
      )}

      {tab === "보정 내역" && (
        <div className="card p-5">
          <p className="mb-4 text-sm font-semibold text-slate-700">최근 보정 내역</p>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
            {recentRetouches.map((r, i) => (
              <div key={i} className="rounded-xl border border-slate-100 p-3 text-center">
                <div className="mb-2 flex h-16 items-center justify-center rounded-lg bg-slate-50 text-2xl">☕</div>
                <p className="text-xs font-medium text-slate-700">{r.name}</p>
                <p className="text-[11px] text-slate-400">{r.time}</p>
              </div>
            ))}
          </div>
          <a href="#" className="mt-4 inline-block text-xs font-medium text-brand-600">
            전체 보정 내역 보기 →
          </a>
        </div>
      )}
    </div>
  );
}
