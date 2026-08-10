"use client";
import React, { useState } from "react";
import PageHeader from "@/components/PageHeader";
import Card from "@/components/Card";
import StatCard from "@/components/StatCard";
import StoreTabs from "@/components/StoreTabs";
import Select from "@/components/Select";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Badge from "@/components/Badge";
import Modal from "@/components/Modal";
import Icon from "@/components/icons";
import AuthGate from "@/components/AuthGate";
import ReviewInput from "@/components/ReviewInput";
import { useToast } from "@/components/Toast";
import { blogPosts as initialBlogPosts } from "@/lib/mock-data";

type TabKey = "all" | "published" | "draft" | "scheduled";

type Comment = { id: number; name: string; content: string; date: string };
type Post = {
  id: number;
  title: string;
  category: string;
  status: string;
  date: string;
  views: number | null;
  comments: Comment[];
};

const statusTone: Record<string, "green" | "gray" | "blue"> = {
  "발행 중": "green",
  "임시 저장": "gray",
  "예약 발행": "blue",
};

const seedComments: Record<string, Comment[]> = {
  "여름 시즌 신메뉴 출시 안내": [
    {
      id: 1,
      name: "이서연",
      content: "복숭아 라떼 진짜 맛있어요! 재입고 언제 되나요?",
      date: "2026.08.02",
    },
  ],
  "시원한 여름 음료 추천!": [
    {
      id: 2,
      name: "박인수",
      content: "에이드 종류 더 늘려주세요 ㅎㅎ",
      date: "2026.07.30",
    },
  ],
};

function formatToday() {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())}`;
}

export default function BlogPage() {
  const { show } = useToast();
  const [tab, setTab] = useState<TabKey>("all");
  const [posts, setPosts] = useState<Post[]>(
    initialBlogPosts.map((p, i) => ({
      ...p,
      id: i + 1,
      comments: seedComments[p.title] ?? [],
    })),
  );
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({
    title: "",
    category: "이벤트",
    status: "임시 저장",
  });

  const filtered = posts.filter((p) => {
    if (tab === "all") return true;
    if (tab === "published") return p.status === "발행 중";
    if (tab === "draft") return p.status === "임시 저장";
    return p.status === "예약 발행";
  });

  const openCreate = () => {
    setEditingId(null);
    setForm({ title: "", category: "이벤트", status: "임시 저장" });
    setModalOpen(true);
  };

  const openEdit = (p: Post) => {
    setEditingId(p.id);
    setForm({ title: p.title, category: p.category, status: p.status });
    setModalOpen(true);
  };

  const savePost = () => {
    if (!form.title.trim()) {
      show("제목을 입력해주세요.", "error");
      return;
    }
    if (editingId !== null) {
      setPosts((prev) =>
        prev.map((p) => (p.id === editingId ? { ...p, ...form } : p)),
      );
      show("게시글이 수정되었습니다.");
    } else {
      setPosts((prev) => [
        {
          id: Date.now(),
          title: form.title,
          category: form.category,
          status: form.status,
          date: formatToday(),
          views: null,
          comments: [],
        },
        ...prev,
      ]);
      show("새 글이 등록되었습니다.");
    }
    setModalOpen(false);
  };

  const deletePost = (p: Post) => {
    if (!window.confirm(`'${p.title}' 글을 삭제하시겠습니까?`)) return;
    setPosts((prev) => prev.filter((x) => x.id !== p.id));
    show("게시글이 삭제되었습니다.", "error");
  };

  const addComment = (postId: number, text: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              comments: [
                ...p.comments,
                {
                  id: Date.now(),
                  name: "사장님",
                  content: text,
                  date: formatToday(),
                },
              ],
            }
          : p,
      ),
    );
    show("댓글이 등록되었습니다.");
  };

  return (
    <div className="p-6 md:p-8 max-w-[1400px] mx-auto">
      <PageHeader
        title="블로그 (CMS)"
        subtitle="매장 소식과 이벤트를 블로그로 관리하고 발행하세요."
        action={
          <Button size="md" onClick={openCreate}>
            <Icon name="edit" className="w-4 h-4" /> 새 글 작성
          </Button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-5">
        <StatCard
          label="전체 글"
          value={`${posts.length}개`}
          icon="blog"
          iconTone="blue"
        />
        <StatCard
          label="발행 중"
          value={`${posts.filter((p) => p.status === "발행 중").length}개`}
          icon="check"
          iconTone="green"
        />
        <StatCard
          label="임시 저장"
          value={`${posts.filter((p) => p.status === "임시 저장").length}개`}
          icon="edit"
          iconTone="amber"
        />
        <StatCard
          label="예약 발행"
          value={`${posts.filter((p) => p.status === "예약 발행").length}개`}
          icon="reservation"
          iconTone="purple"
        />
        <StatCard
          label="조회수 (이번 달)"
          value="2,845"
          delta="▲ 18%"
          icon="seo"
          iconTone="blue"
        />
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
                <th className="px-2 py-2.5 font-medium">댓글</th>
                <th className="px-5 py-2.5 font-medium">관리</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <React.Fragment key={p.id}>
                  <tr className="border-b border-ink-50 hover:bg-ink-50">
                    <td className="px-5 py-3 font-medium text-ink-800">
                      <button
                        onClick={() =>
                          setExpandedId(expandedId === p.id ? null : p.id)
                        }
                        className="flex items-center gap-1.5 text-left hover:text-brand-700"
                      >
                        <Icon
                          name="chevronRight"
                          className={`w-3.5 h-3.5 text-ink-400 transition-transform ${expandedId === p.id ? "rotate-90" : ""}`}
                        />
                        {p.title}
                      </button>
                    </td>
                    <td className="px-2 py-3 text-ink-500">{p.category}</td>
                    <td className="px-2 py-3">
                      <Badge tone={statusTone[p.status]}>{p.status}</Badge>
                    </td>
                    <td className="px-2 py-3 text-ink-400 text-xs">{p.date}</td>
                    <td className="px-2 py-3 text-ink-600">{p.views ?? "-"}</td>
                    <td className="px-2 py-3 text-ink-600">
                      {p.comments.length}
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3 text-ink-400">
                        <button
                          onClick={() => openEdit(p)}
                          className="hover:text-ink-700"
                        >
                          <Icon name="edit" className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deletePost(p)}
                          className="hover:text-red-500"
                        >
                          <Icon name="trash" className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  {expandedId === p.id && (
                    <tr className="border-b border-ink-50 bg-ink-50/60">
                      <td colSpan={7} className="px-5 py-4">
                        <p className="text-xs font-semibold text-ink-500 mb-2">
                          댓글 {p.comments.length}개
                        </p>
                        <div className="space-y-2 mb-3">
                          {p.comments.length === 0 && (
                            <p className="text-xs text-ink-400">
                              아직 댓글이 없습니다.
                            </p>
                          )}
                          {p.comments.map((c) => (
                            <div
                              key={c.id}
                              className="rounded-lg bg-white border border-ink-100 px-3 py-2"
                            >
                              <div className="flex items-center justify-between mb-0.5">
                                <span className="text-xs font-semibold text-ink-700">
                                  {c.name}
                                </span>
                                <span className="text-[10px] text-ink-400">
                                  {c.date}
                                </span>
                              </div>
                              <p className="text-xs text-ink-600">
                                {c.content}
                              </p>
                            </div>
                          ))}
                        </div>
                        <AuthGate message="로그인 후 댓글을 작성할 수 있습니다.">
                          <ReviewInput
                            placeholder="댓글을 입력해주세요..."
                            onSubmit={(text) => addComment(p.id, text)}
                          />
                        </AuthGate>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-5 py-8 text-center text-sm text-ink-400"
                  >
                    해당 조건의 글이 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3">
          <a href="#" className="text-xs text-brand-600 font-medium">
            전체 글 보기 →
          </a>
        </div>
      </Card>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingId !== null ? "게시글 수정" : "새 글 작성"}
        footer={
          <>
            <Button variant="outline" onClick={() => setModalOpen(false)}>
              취소
            </Button>
            <Button onClick={savePost}>
              {editingId !== null ? "수정 저장" : "등록"}
            </Button>
          </>
        }
      >
        <div className="space-y-3">
          <div>
            <label className="text-xs font-medium text-ink-500 mb-1 block">
              제목
            </label>
            <Input
              value={form.title}
              onChange={(e) =>
                setForm((f) => ({ ...f, title: e.target.value }))
              }
              placeholder="글 제목을 입력하세요"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-ink-500 mb-1 block">
                카테고리
              </label>
              <Select
                value={form.category}
                onChange={(e) =>
                  setForm((f) => ({ ...f, category: e.target.value }))
                }
              >
                <option>이벤트</option>
                <option>매장 소개</option>
                <option>매장 소식</option>
                <option>스토리</option>
                <option>공지사항</option>
              </Select>
            </div>
            <div>
              <label className="text-xs font-medium text-ink-500 mb-1 block">
                상태
              </label>
              <Select
                value={form.status}
                onChange={(e) =>
                  setForm((f) => ({ ...f, status: e.target.value }))
                }
              >
                <option>임시 저장</option>
                <option>발행 중</option>
                <option>예약 발행</option>
              </Select>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
