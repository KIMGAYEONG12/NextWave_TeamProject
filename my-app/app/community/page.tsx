"use client";

import { useState } from "react";
import { Pin, Heart, MessageCircle, Plus } from "lucide-react";
import { PageHeader } from "@/components/ui";
import { communityPosts } from "@/lib/data";

export default function CommunityPage() {
  const [posts, setPosts] = useState(communityPosts);
  const [draft, setDraft] = useState("");

  const post = () => {
    if (!draft.trim()) return;
    setPosts((prev) => [
      { id: `cp${prev.length + 1}`, author: "사장님", content: draft, likes: 0, comments: 0, date: "방금 전" },
      ...prev,
    ]);
    setDraft("");
  };

  return (
    <div>
      <PageHeader title="리뷰·커뮤니티" desc="단골 고객과 소통하는 매장 커뮤니티 게시판을 관리하세요." />

      <div className="mx-auto max-w-2xl">
        <div className="card mb-5 p-4">
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="고객들에게 전하고 싶은 소식을 남겨보세요 (신메뉴, 이벤트, 안내 등)"
            className="input"
            rows={3}
          />
          <div className="mt-2 flex justify-end">
            <button onClick={post} className="btn-primary">
              <Plus size={15} /> 게시하기
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {posts.map((p) => (
            <div key={p.id} className="card p-4">
              <div className="mb-2 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-50 text-xs font-bold text-brand-600">
                  {p.author[0]}
                </div>
                <span className="text-sm font-semibold text-slate-800">{p.author}</span>
                {p.pinned && (
                  <span className="badge bg-brand-50 text-brand-600">
                    <Pin size={11} /> 고정
                  </span>
                )}
                <span className="ml-auto text-xs text-slate-400">{p.date}</span>
              </div>
              <p className="text-sm leading-relaxed text-slate-700">{p.content}</p>
              <div className="mt-3 flex items-center gap-4 text-xs text-slate-400">
                <button className="flex items-center gap-1 hover:text-red-500">
                  <Heart size={14} /> {p.likes}
                </button>
                <button className="flex items-center gap-1 hover:text-brand-600">
                  <MessageCircle size={14} /> {p.comments}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
