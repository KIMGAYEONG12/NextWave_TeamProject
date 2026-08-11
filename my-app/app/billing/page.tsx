"use client";

import { useState } from "react";
import { Check, CreditCard } from "lucide-react";
import { PageHeader, Progress } from "@/components/ui";
import { Modal } from "@/components/Modal";
import { useToast } from "@/components/Toast";
import { currentPlan as initialPlan, usage } from "@/lib/data";

export default function BillingPage() {
  const showToast = useToast();
  const [plan, setPlan] = useState(initialPlan);
  const [cardModalOpen, setCardModalOpen] = useState(false);
  const [emailModalOpen, setEmailModalOpen] = useState(false);

  const [cardNumber, setCardNumber] = useState("");
  const [emailInput, setEmailInput] = useState(plan.billingEmail);
  const [emailError, setEmailError] = useState("");

  const saveCard = () => {
    const digits = cardNumber.replace(/\D/g, "");
    if (digits.length < 4) return;
    const last4 = digits.slice(-4);
    setPlan((p) => ({ ...p, paymentMethod: `카드 •••• ${last4}` }));
    setCardModalOpen(false);
    setCardNumber("");
    showToast("결제 수단이 변경되었습니다!");
  };

  const saveEmail = () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput)) {
      setEmailError("올바른 이메일 주소를 입력해 주세요.");
      return;
    }
    setPlan((p) => ({ ...p, billingEmail: emailInput }));
    setEmailModalOpen(false);
    setEmailError("");
    showToast("청구 이메일이 변경되었습니다!");
  };

  return (
    <div>
      <PageHeader title="요금제 관리" desc="현재 사용 중인 요금제와 결제 정보를 확인하고 관리하세요." />

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        {/* current plan */}
        <div className="card p-6">
          <p className="mb-1 text-xs font-semibold uppercase text-black/50">현재 사용 중인 요금제</p>
          <h2 className="mb-1 text-xl font-bold text-black">{plan.name}</h2>
          <p className="mb-1 text-3xl font-extrabold text-brand-600">
            ₩{plan.price.toLocaleString()}
            <span className="text-sm font-medium text-black/50"> /월 (부가세 별도)</span>
          </p>
          <p className="mb-5 text-sm text-black/70">
            매출 분석, 예약 관리, 멤버십, 마케팅 기능까지 모든 기능을 이용할 수 있는 요금제입니다.
          </p>
          <ul className="mb-6 space-y-2.5">
            {plan.features.map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm text-black">
                <Check size={15} className="shrink-0 text-brand-600" /> {f}
              </li>
            ))}
          </ul>
          <button onClick={() => showToast("요금제 변경 화면으로 이동합니다. (데모)")} className="btn-primary w-full">
            요금제 변경
          </button>
        </div>

        {/* payment info */}
        <div className="card p-6">
          <p className="mb-4 text-xs font-semibold uppercase text-black/50">결제 정보</p>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-black/60">결제 주기</dt>
              <dd className="font-medium text-black">{plan.cycle}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-black/60">다음 결제일</dt>
              <dd className="font-medium text-black">{plan.nextBillingDate}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-black/60">다음 결제 금액</dt>
              <dd className="font-medium text-black">₩{plan.nextBillingAmount.toLocaleString()} (부가세 별도)</dd>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2.5">
              <dt className="flex items-center gap-1.5 text-black/60">
                <CreditCard size={14} /> 결제 수단
              </dt>
              <dd className="flex items-center gap-2 font-medium text-black">
                {plan.paymentMethod}
                <button onClick={() => setCardModalOpen(true)} className="text-xs font-semibold text-brand-600">
                  변경
                </button>
              </dd>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2.5">
              <dt className="text-black/60">청구 이메일</dt>
              <dd className="flex items-center gap-2 font-medium text-black">
                {plan.billingEmail}
                <button
                  onClick={() => {
                    setEmailInput(plan.billingEmail);
                    setEmailModalOpen(true);
                  }}
                  className="text-xs font-semibold text-brand-600"
                >
                  변경
                </button>
              </dd>
            </div>
          </dl>
          <a href="#" className="mt-4 inline-block text-xs font-medium text-brand-600">
            결제 내역 보기 →
          </a>

          <p className="mb-3 mt-6 text-xs font-semibold uppercase text-black/50">이용량 현황 (이번 달)</p>
          <div className="space-y-3.5">
            {usage.map((u) => (
              <div key={u.label}>
                <div className="mb-1 flex justify-between text-xs text-black/60">
                  <span>{u.label}</span>
                  <span className="font-medium text-black">
                    {u.used}
                    {u.unit === "GB" ? "GB" : ""} / {u.total}
                    {u.unit === "GB" ? "GB" : u.unit}
                  </span>
                </div>
                <Progress value={u.used} max={u.total} tone={u.used / u.total > 0.85 ? "warning" : "brand"} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {cardModalOpen && (
        <Modal title="결제 수단 변경" onClose={() => setCardModalOpen(false)}>
          <p className="mb-3 text-xs text-black/60">새 카드 번호를 입력하세요. (데모 환경이라 실제 결제는 이루어지지 않습니다)</p>
          <input
            className="input"
            placeholder="0000 0000 0000 0000"
            value={cardNumber}
            maxLength={19}
            onChange={(e) => setCardNumber(e.target.value)}
          />
          <div className="mt-4 flex gap-2">
            <button className="btn-secondary flex-1" onClick={() => setCardModalOpen(false)}>
              취소
            </button>
            <button className="btn-primary flex-1" onClick={saveCard} disabled={cardNumber.replace(/\D/g, "").length < 4}>
              저장
            </button>
          </div>
        </Modal>
      )}

      {emailModalOpen && (
        <Modal title="청구 이메일 변경" onClose={() => setEmailModalOpen(false)}>
          <p className="mb-3 text-xs text-black/60">청구서를 받을 이메일 주소를 입력하세요.</p>
          <input
            className="input"
            type="email"
            placeholder="owner@example.com"
            value={emailInput}
            onChange={(e) => {
              setEmailInput(e.target.value);
              setEmailError("");
            }}
          />
          {emailError && <p className="mt-1.5 text-xs text-red-500">{emailError}</p>}
          <div className="mt-4 flex gap-2">
            <button className="btn-secondary flex-1" onClick={() => setEmailModalOpen(false)}>
              취소
            </button>
            <button className="btn-primary flex-1" onClick={saveEmail}>
              저장
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
