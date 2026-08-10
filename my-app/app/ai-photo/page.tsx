"use client";
import { useRef, useState } from "react";
import PageHeader from "@/components/PageHeader";
import Card from "@/components/Card";
import StoreTabs from "@/components/StoreTabs";
import Button from "@/components/Button";
import Icon from "@/components/icons";
import { useToast } from "@/components/Toast";

type TabKey = "retouch" | "history";

type HistoryItem = {
  id: number;
  name: string;
  time: string;
  thumb: string | null; // data URL of the retouched result, null = default emoji thumb
};

const initialHistory: HistoryItem[] = [
  { id: 1, name: "아메리카노", time: "2026.08.07 13:30", thumb: null },
  { id: 2, name: "카페라떼", time: "2026.08.07 13:25", thumb: null },
  { id: 3, name: "바닐라 라떼", time: "2026.08.07 13:20", thumb: null },
  { id: 4, name: "크루아상", time: "2026.08.07 13:15", thumb: null },
  { id: 5, name: "딸기 에이드", time: "2026.08.07 13:10", thumb: null },
];

function formatNow() {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

// 캔버스로 실제 이미지에 밝기/대비/채도 보정을 적용해 진짜 결과 이미지를 만든다.
function retouchImage(dataUrl: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject(new Error("canvas context 생성 실패"));
      // 밝기 +12%, 대비 +10%, 채도 +30%로 신선하고 먹음직스러운 톤 보정
      ctx.filter = "brightness(1.12) contrast(1.1) saturate(1.3)";
      ctx.drawImage(img, 0, 0);
      resolve(canvas.toDataURL("image/jpeg", 0.92));
    };
    img.onerror = () => reject(new Error("이미지를 불러오지 못했습니다."));
    img.src = dataUrl;
  });
}

export default function AiPhotoPage() {
  const { show } = useToast();
  const [tab, setTab] = useState<TabKey>("retouch");
  const [fileName, setFileName] = useState<string | null>(null);
  const [original, setOriginal] = useState<string | null>(null);
  const [processed, setProcessed] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [usedCount, setUsedCount] = useState(24);
  const [history, setHistory] = useState<HistoryItem[]>(initialHistory);
  const inputRef = useRef<HTMLInputElement>(null);

  const loadFile = (file: File | undefined) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      show("이미지 파일만 업로드할 수 있습니다.", "error");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setOriginal(reader.result as string);
      setProcessed(null);
      setFileName(file.name.replace(/\.[^/.]+$/, ""));
    };
    reader.readAsDataURL(file);
  };

  const handleRetouch = async () => {
    if (!original) return;
    if (usedCount >= 100) {
      show("이번 달 AI 보정 사용량을 모두 소진했습니다.", "error");
      return;
    }
    setIsProcessing(true);
    try {
      const result = await retouchImage(original);
      setProcessed(result);
      setUsedCount((c) => c + 1);
      setHistory((prev) =>
        [
          {
            id: Date.now(),
            name: fileName || "새 메뉴 사진",
            time: formatNow(),
            thumb: result,
          },
          ...prev,
        ].slice(0, 10),
      );
      show("AI 보정이 완료되었습니다.");
    } catch (e) {
      show(
        e instanceof Error ? e.message : "보정 중 오류가 발생했습니다.",
        "error",
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = (dataUrl: string | null, name: string) => {
    if (!dataUrl) return;
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `${name}_ai보정.jpg`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <div className="p-6 md:p-8 max-w-[1400px] mx-auto">
      <PageHeader
        title="AI 메뉴 사진 보정"
        subtitle="AI가 메뉴 사진의 밝기, 색감, 신선도를 자동으로 보정해드립니다."
        action={
          <Button variant="outline" size="md">
            <Icon name="ai" className="w-4 h-4" /> 사용 가이드
          </Button>
        }
      />

      <div className="flex items-center justify-between mb-5">
        <StoreTabs
          tabs={[
            { key: "retouch", label: "보정하기" },
            { key: "history", label: "보정 내역" },
          ]}
          active={tab}
          onChange={setTab}
        />
        <p className="text-xs text-ink-400">이번 달 사용함 {usedCount} / 100</p>
      </div>

      {tab === "retouch" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
          <Card>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => loadFile(e.target.files?.[0])}
            />
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragOver(true);
              }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragOver(false);
                loadFile(e.dataTransfer.files?.[0]);
              }}
              onClick={() => inputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl flex flex-col items-center justify-center py-14 text-center cursor-pointer transition-colors ${
                isDragOver ? "border-brand-400 bg-brand-50" : "border-ink-200"
              }`}
            >
              <div className="w-12 h-12 rounded-full bg-brand-50 text-brand-500 flex items-center justify-center mb-3">
                <Icon name="upload" className="w-6 h-6" />
              </div>
              <p className="text-sm text-ink-600 mb-1">
                {fileName
                  ? `${fileName} 업로드됨`
                  : "사진을 드래그하거나 클릭하여 업로드"}
              </p>
              <p className="text-xs text-ink-400 mb-4">
                JPG, PNG 파일 (최대 10MB)
              </p>
              <Button
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  inputRef.current?.click();
                }}
              >
                파일 선택
              </Button>
            </div>
            <p className="text-xs text-ink-400 mt-3">
              ⚠ 최대 10장까지 한 번에 업로드가 가능합니다.
            </p>
            <Button
              className="w-full mt-3"
              onClick={handleRetouch}
              disabled={!original || isProcessing}
            >
              <Icon name="ai" className="w-4 h-4" />
              {isProcessing ? "AI가 보정하는 중..." : "AI 보정 시작"}
            </Button>
          </Card>

          <Card>
            <h3 className="text-sm font-semibold text-ink-800 mb-4">
              보정 미리보기
            </h3>
            <div className="grid grid-cols-2 gap-3 items-center">
              <div>
                <p className="text-xs text-ink-400 mb-1.5">원본 사진</p>
                <div className="aspect-square rounded-xl bg-ink-100 flex items-center justify-center text-4xl overflow-hidden">
                  {original ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={original}
                      alt="원본"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    "☕"
                  )}
                </div>
              </div>
              <div>
                <p className="text-xs text-ink-400 mb-1.5">AI 보정 결과</p>
                <div className="aspect-square rounded-xl bg-gradient-to-br from-amber-100 to-amber-50 flex items-center justify-center text-4xl overflow-hidden">
                  {isProcessing ? (
                    <span className="text-xs text-ink-400 animate-pulse">
                      보정 중...
                    </span>
                  ) : processed ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={processed}
                      alt="AI 보정 결과"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    "☕"
                  )}
                </div>
              </div>
            </div>
            <Button
              className="w-full mt-4"
              disabled={!processed}
              onClick={() => handleDownload(processed, fileName || "menu")}
            >
              <Icon name="download" className="w-4 h-4" /> 다운로드
            </Button>
          </Card>
        </div>
      )}

      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-ink-800">최근 보정 내역</h3>
          <a href="#" className="text-xs text-brand-600 font-medium">
            전체 보정 내역 보기 →
          </a>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {history.map((r) => (
            <div
              key={r.id}
              className="rounded-xl border border-ink-100 overflow-hidden"
            >
              <div className="aspect-square bg-ink-50 flex items-center justify-center text-3xl relative group overflow-hidden">
                {r.thumb ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={r.thumb}
                    alt={r.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  "☕"
                )}
                <button
                  onClick={() => handleDownload(r.thumb, r.name)}
                  disabled={!r.thumb}
                  className="absolute bottom-1.5 right-1.5 w-6 h-6 rounded-full bg-white shadow flex items-center justify-center text-ink-500 disabled:opacity-40"
                >
                  <Icon name="download" className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="px-2.5 py-2">
                <p className="text-xs font-medium text-ink-700 truncate">
                  {r.name}
                </p>
                <p className="text-[10px] text-ink-400">{r.time}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
