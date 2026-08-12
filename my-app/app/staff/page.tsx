"use client";

import { useState } from "react";
import { Plus, Users, UserCheck, UserMinus, UserPlus2, Pencil, Trash2, Phone, Mail } from "lucide-react";
import { PageHeader, StatCard, StatusBadge } from "@/components/ui";
import { Modal } from "@/components/Modal";
import { useToast } from "@/components/Toast";
import { staffList as initialStaff, staffStats, Staff } from "@/lib/data";

const roles: Staff["role"][] = ["매니저", "바리스타", "홀 스태프", "파트타임"];
const permissions: Staff["permission"][] = ["전체 관리", "주문/예약 관리", "조회 전용"];
const statuses: Staff["status"][] = ["근무중", "휴직", "퇴사"];

const emptyForm = {
  name: "",
  role: "바리스타" as Staff["role"],
  phone: "",
  email: "",
  permission: "조회 전용" as Staff["permission"],
  status: "근무중" as Staff["status"],
  hireDate: "",
};

export default function StaffPage() {
  const showToast = useToast();
  const [staff, setStaff] = useState<Staff[]>(initialStaff);
  const [addOpen, setAddOpen] = useState(false);
  const [editing, setEditing] = useState<Staff | null>(null);
  const [form, setForm] = useState(emptyForm);

  const openAdd = () => {
    setForm(emptyForm);
    setAddOpen(true);
  };

  const openEdit = (s: Staff) => {
    setEditing(s);
    setForm({
      name: s.name,
      role: s.role,
      phone: s.phone,
      email: s.email,
      permission: s.permission,
      status: s.status,
      hireDate: s.hireDate,
    });
  };

  const addStaff = () => {
    if (!form.name.trim() || !form.phone.trim()) {
      showToast("이름과 연락처를 입력해 주세요.");
      return;
    }
    const newStaff: Staff = {
      id: `s${Date.now()}`,
      name: form.name.trim(),
      role: form.role,
      phone: form.phone.trim(),
      email: form.email.trim(),
      permission: form.permission,
      status: form.status,
      hireDate: form.hireDate || "-",
    };
    setStaff((prev) => [newStaff, ...prev]);
    setAddOpen(false);
    showToast("새 직원이 등록되었습니다!");
  };

  const saveEdit = () => {
    if (!editing) return;
    setStaff((prev) =>
      prev.map((s) =>
        s.id === editing.id
          ? {
              ...s,
              name: form.name.trim() || s.name,
              role: form.role,
              phone: form.phone.trim() || s.phone,
              email: form.email.trim(),
              permission: form.permission,
              status: form.status,
              hireDate: form.hireDate || s.hireDate,
            }
          : s
      )
    );
    setEditing(null);
    showToast("직원 정보가 수정되었습니다!");
  };

  const removeStaff = (id: string) => {
    setStaff((prev) => prev.filter((s) => s.id !== id));
    showToast("직원이 삭제되었습니다.");
  };

  return (
    <div>
      <PageHeader
        title="직원 관리"
        desc="직원 정보와 근무 상태, 시스템 접근 권한을 관리하세요."
        action={
          <button onClick={openAdd} className="btn-primary">
            <Plus size={16} /> 직원 등록
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="전체 직원" value={`${staff.length}명`} sub={`등록 기준`} icon={Users} />
        <StatCard
          label="근무중"
          value={`${staff.filter((s) => s.status === "근무중").length}명`}
          sub="정상 근무 중"
          icon={UserCheck}
          tone="success"
        />
        <StatCard
          label="휴직"
          value={`${staff.filter((s) => s.status === "휴직").length}명`}
          sub="복귀 예정"
          icon={UserMinus}
          tone="warning"
        />
        <StatCard label="이번 달 신규" value={`${staffStats.newThisMonth}명`} sub="신규 입사" icon={UserPlus2} />
      </div>

      <div className="mt-6 card overflow-x-auto p-0">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="table-th">이름</th>
              <th className="table-th">직책</th>
              <th className="table-th">연락처</th>
              <th className="table-th">접근 권한</th>
              <th className="table-th">근무 상태</th>
              <th className="table-th">입사일</th>
              <th className="table-th">관리</th>
            </tr>
          </thead>
          <tbody>
            {staff.map((s) => (
              <tr key={s.id} className="border-b border-slate-50 hover:bg-slate-50">
                <td className="table-td font-medium text-black">{s.name}</td>
                <td className="table-td text-black">{s.role}</td>
                <td className="table-td text-black">
                  <div className="flex flex-col gap-0.5 text-xs">
                    <span className="flex items-center gap-1">
                      <Phone size={12} className="text-black/40" /> {s.phone}
                    </span>
                    {s.email && (
                      <span className="flex items-center gap-1 text-black/60">
                        <Mail size={12} className="text-black/40" /> {s.email}
                      </span>
                    )}
                  </div>
                </td>
                <td className="table-td text-black">{s.permission}</td>
                <td className="table-td">
                  <StatusBadge status={s.status === "근무중" ? "정상" : s.status === "휴직" ? "부족" : "품절"} />
                  <span className="ml-1.5 align-middle text-xs text-black/60">{s.status}</span>
                </td>
                <td className="table-td text-black">{s.hireDate}</td>
                <td className="table-td">
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => openEdit(s)}
                      className="rounded-lg border border-slate-200 p-1.5 text-black hover:bg-slate-50"
                      title="수정"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => removeStaff(s.id)}
                      className="rounded-lg border border-red-200 p-1.5 text-red-600 hover:bg-red-50"
                      title="삭제"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {staff.length === 0 && (
              <tr>
                <td colSpan={7} className="table-td py-10 text-center text-black/50">
                  등록된 직원이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {(addOpen || editing) && (
        <Modal
          title={editing ? "직원 정보 수정" : "직원 등록"}
          onClose={() => {
            setAddOpen(false);
            setEditing(null);
          }}
        >
          <div className="space-y-3 text-sm">
            <div>
              <label className="mb-1 block text-xs text-black/60">이름</label>
              <input className="input" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="예: 정다은" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-xs text-black/60">직책</label>
                <select className="input" value={form.role} onChange={(e) => setForm((f) => ({ ...f, role: e.target.value as Staff["role"] }))}>
                  {roles.map((r) => (
                    <option key={r}>{r}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs text-black/60">근무 상태</label>
                <select className="input" value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as Staff["status"] }))}>
                  {statuses.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs text-black/60">연락처</label>
              <input className="input" value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} placeholder="010-0000-0000" />
            </div>
            <div>
              <label className="mb-1 block text-xs text-black/60">이메일</label>
              <input className="input" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} placeholder="staff@ooocoffee.com" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-xs text-black/60">접근 권한</label>
                <select
                  className="input"
                  value={form.permission}
                  onChange={(e) => setForm((f) => ({ ...f, permission: e.target.value as Staff["permission"] }))}
                >
                  {permissions.map((p) => (
                    <option key={p}>{p}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs text-black/60">입사일</label>
                <input className="input" value={form.hireDate} onChange={(e) => setForm((f) => ({ ...f, hireDate: e.target.value }))} placeholder="2026.08.12" />
              </div>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <button
              className="btn-secondary flex-1"
              onClick={() => {
                setAddOpen(false);
                setEditing(null);
              }}
            >
              취소
            </button>
            <button className="btn-primary flex-1" onClick={editing ? saveEdit : addStaff}>
              {editing ? "저장" : "등록"}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
