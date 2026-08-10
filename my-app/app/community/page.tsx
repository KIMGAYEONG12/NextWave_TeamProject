"use client";
import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import Card from "@/components/Card";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Badge from "@/components/Badge";
import Icon from "@/components/icons";
import { useToast } from "@/components/Toast";

type Post = {
  id: number;
  title: string;
  author: string;
  category: "질문" | "후기" | "공지" | "자유";
  comments: number;
  likes: number;
  date: string;
  pinned?: boolean;
};

const initialPosts: Post[] = [
  { id: 1, title: "8월 여름 시즌 메뉴 어때요? 다들 드셔보셨나요 ☕", author: "김지현", category: "자유", comments: 12, likes: 24, date: "2026.08.07" },
  { id: 2, title: "매장 와이파이 비밀번호 안내드립니다.", author: "OOO 커피", category: "공지", comments: 2, likes: 8, date: "2026.08.06", pinned: true },
  { id: 3, title: "단체석 예약은 어떻게 하나요?", author: "이서연", category: "질문", comments: 5, likes: 1, date: "2026.08.06" },
  { id: 4, title: "크루아상 진짜 맛있어요 강추합니다!", author: "박인수", category: "후기", comments: 7, likes: 19, date: "2026.08.05" },
  { id: 5, title: "노트북 작업하기 좋은 자리 추천해주세요", author: "최유리", category: "질문", comments: 9, likes: 3, date: "2026.08.04" },
];

const categoryTone: Record<Post["category"], "blue" | "green" | "amber" | "gray"> = {
  질문: "blue",
  후기: "green",
  공지: "amber",
  자유: "gray",
};

export default function CommunityPage() {
  const { show } = useToast();
  const [posts] = useState(initialPosts);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"전체" | Post["category"]>("전체");

  const filtered = posts.filter(
    (p) =>
      (filter === "전체" || p.category === filter) &&
      (query.trim() === "" || p.title.includes(query) || p.author.includes(query))
  );

  const totalComments = posts.reduce((sum, p) => sum + p.comments, 0);

  return (
    <div className="p-6 md:p-8 max-w-[1400px] mx-auto">
      <PageHeader
        title="리뷰 · 커뮤니티"
        subtitle="고객들이 남긴 게시글과 이야기를 확인하고 소통하세요."
        action={
          <Button size="sm" onClick={() => show("새 글 작성 기능은 준비 중입니다.")}>
            <Icon name="plus" className="w-3.5 h-3.5" />새 글 작성
          </Button>
        }
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
        <Card className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
            <Icon name="community" className="w-5 h-5" />
          </div>
          <div><p className="text-xl font-bold text-ink-900">{posts.length}</p><p className="text-xs text-ink-400">전체 게시글</p></div>
        </Card>
        <Card className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Icon name="check" className="w-5 h-5" />
          </div>
          <div><p className="text-xl font-bold text-ink-900">{totalComments}</p><p className="text-xs text-ink-400">전체 댓글</p></div>
        </Card>
        <Card className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Icon name="star" className="w-5 h-5" />
          </div>
          <div><p className="text-xl font-bold text-ink-900">{posts.filter((p) => p.category === "후기").length}</p><p className="text-xs text-ink-400">후기 게시글</p></div>
        </Card>
        <Card className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
            <Icon name="bell" className="w-5 h-5" />
          </div>
          <div><p className="text-xl font-bold text-ink-900">{posts.filter((p) => p.category === "질문").length}</p><p className="text-xs text-ink-400">미답변 질문</p></div>
        </Card>
      </div>

      <Card>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-1.5 flex-wrap">
            {(["전체", "질문", "후기", "공지", "자유"] as const).map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                  filter === c
                    ? "bg-brand-600 border-brand-600 text-white"
                    : "bg-white border-ink-200 text-ink-500 hover:bg-ink-50"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <Input
            placeholder="제목, 작성자 검색"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="sm:w-56"
          />
        </div>

        <div className="divide-y divide-ink-50">
          {filtered.length === 0 && (
            <p className="text-sm text-ink-400 text-center py-10">게시글이 없습니다.</p>
          )}
          {filtered.map((p) => (
            <div key={p.id} className="flex items-center gap-3 py-3">
              <Badge tone={categoryTone[p.category]}>{p.category}</Badge>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-ink-800 truncate flex items-center gap-1.5">
                  {p.pinned && <Icon name="star" className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                  {p.title}
                </p>
                <p className="text-xs text-ink-400 mt-0.5">{p.author} · {p.date}</p>
              </div>
              <div className="flex items-center gap-3 text-xs text-ink-400 shrink-0">
                <span className="flex items-center gap-1"><Icon name="community" className="w-3.5 h-3.5" />{p.comments}</span>
                <span className="flex items-center gap-1"><Icon name="star" className="w-3.5 h-3.5" />{p.likes}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
