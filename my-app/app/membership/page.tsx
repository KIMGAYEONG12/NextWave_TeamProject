"use client";

import { useState } from "react";
import { Plus, Users, Coins, TrendingUp, Ticket, Leaf, Recycle } from "lucide-react";
import { PageHeader, StatCard, StatusBadge } from "@/components/ui";
import { Modal } from "@/components/Modal";
import { useToast } from "@/components/Toast";
import { membershipStats, coupons as initialCoupons, Coupon, ecoPointsSettings, ecoActions } from "@/lib/data";

const emptyCouponForm = {
  name: "",
  discount: "",
  target: "전체 고객",
  period: "",
  limit: "100",
};

export default function MembershipPage() {
  const showToast = useToast();
  const [rate, setRate] = useState(3);
  const [minPoint, setMinPoint] = useState(1000);
  const [restrict, setRestrict] = useState(false);

  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons);
  const [couponOpen, setCouponOpen] = useState(false);
  const [couponForm, setCouponForm] = useState(emptyCouponForm);

  const [ecoEnabled, setEcoEnabled] = useState(ecoPointsSettings.enabled);
  const [tumblerPoint, setTumblerPoint] = useState(ecoPointsSettings.tumblerPoint);
  const [cupPoint, setCupPoint] = useState(ecoPointsSettings.reusableCupPoint);
  const [donationEnabled, setDonationEnabled] = useState(ecoPointsSettings.donationEnabled);
  const [donationRatio, setDonationRatio] = useState(ecoPointsSettings.donationRatio);

  const issueCoupon = () => {
    if (!couponForm.name.trim() || !couponForm.discount.trim()) {
      showToast("쿠폰명과 할인 내용을 입력해 주세요.");
      return;
    }
    const limitNum = Number(couponForm.limit) || 0;
    const newCoupon: Coupon = {
      id: `c${Date.now()}`,
      name: couponForm.name.trim(),
      discount: couponForm.discount.trim(),
      target: couponForm.target,
      period: couponForm.period || "기간 미설정",
      status: "진행중",
      used: 0,
      limit: limitNum,
    };
    setCoupons((prev) => [newCoupon, ...prev]);
    setCouponForm(emptyCouponForm);
    setCouponOpen(false);
    showToast("쿠폰이 발급되었습니다!");
  };

  const savePointPolicy = () => showToast("포인트 적립 정책이 저장되었습니다!");
  const saveEcoPolicy = () => showToast("친환경 포인트 정책이 저장되었습니다!");

  return (
    <div>
      <PageHeader title="멤버십 (포인트·쿠폰)" desc="포인트 적립 정책을 설정하고 쿠폰을 발급/관리하세요." />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="총 회원 수" value={`${membershipStats.totalMembers.toLocaleString()}명`} sub="▲ 12명 (이번 주)" icon={Users} />
        <StatCard label="보유 포인트 합계" value={`${membershipStats.totalPoints.toLocaleString()}P`} sub="▲ 8,230P (이번 주)" icon={Coins} tone="success" />
        <StatCard label="이번 달 사용 포인트" value={`${membershipStats.monthUsedPoints.toLocaleString()}P`} sub="▲ 18%" icon={TrendingUp} tone="warning" />
        <StatCard label="쿠폰 사용률" value={`${membershipStats.couponRate}%`} sub="▲ 5%" icon={Ticket} tone="danger" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 xl:grid-cols-[360px_1fr]">
        <div className="card p-5">
          <h3 className="mb-4 font-bold text-black">포인트 적립 정책</h3>
          <label className="mb-1 block text-xs text-black">적립률</label>
          <div className="mb-4 flex items-center gap-2">
            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="input w-20"
            />
            <span className="whitespace-nowrap text-sm text-black">% 결제 금액 대비</span>
          </div>
          <label className="mb-1 block text-xs text-black">최소 사용 가능 포인트</label>
          <div className="mb-4 flex items-center gap-2">
            <input
              type="number"
              value={minPoint}
              onChange={(e) => setMinPoint(Number(e.target.value))}
              className="input w-32"
            />
            <span className="text-sm text-black">P</span>
          </div>
          <label className="mb-5 flex items-center gap-2 text-sm text-black">
            <input type="checkbox" checked={restrict} onChange={(e) => setRestrict(e.target.checked)} className="h-4 w-4 rounded border-slate-300" />
            쿠폰 + 포인트 중복 사용 제한 (동시 사용 끄기)
          </label>
          <button onClick={savePointPolicy} className="btn-primary w-full">
            정책 저장
          </button>
        </div>

        <div className="card p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-bold text-black">쿠폰 관리</h3>
            <button onClick={() => setCouponOpen(true)} className="btn-primary">
              <Plus size={15} /> 쿠폰 발급
            </button>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="table-th">쿠폰명</th>
                <th className="table-th">할인 내용</th>
                <th className="table-th">발급 대상</th>
                <th className="table-th">사용 기간</th>
                <th className="table-th">상태</th>
                <th className="table-th">발급 한도</th>
                <th className="table-th">사용 수</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((c) => (
                <tr key={c.id} className="border-b border-slate-50 hover:bg-slate-50">
                  <td className="table-td font-medium text-black">{c.name}</td>
                  <td className="table-td text-brand-600">{c.discount}</td>
                  <td className="table-td text-black">{c.target}</td>
                  <td className="table-td text-black">{c.period}</td>
                  <td className="table-td">
                    <StatusBadge status={c.status} />
                  </td>
                  <td className="table-td text-black">{c.limit.toLocaleString()}장</td>
                  <td className="table-td text-black">
                    {c.used.toLocaleString()} / {c.limit.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <a href="#" className="mt-3 inline-block text-xs font-medium text-brand-600">
            전체 쿠폰 보기 →
          </a>
        </div>
      </div>

      {/* 친환경 포인트 / 텀블러 적립·기부 */}
      <div className="mt-6 grid grid-cols-1 gap-5 xl:grid-cols-[360px_1fr]">
        <div className="card p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="flex items-center gap-1.5 font-bold text-black">
              <Leaf size={16} className="text-emerald-500" /> 친환경 포인트 정책
            </h3>
            <button
              onClick={() => setEcoEnabled((v) => !v)}
              className={`relative h-6 w-11 rounded-full transition ${ecoEnabled ? "bg-emerald-500" : "bg-slate-200"}`}
            >
              <span
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition ${
                  ecoEnabled ? "left-[22px]" : "left-0.5"
                }`}
              />
            </button>
          </div>

          <label className="mb-1 block text-xs text-black">텀블러 지참 시 적립 포인트</label>
          <div className="mb-4 flex items-center gap-2">
            <input
              type="number"
              value={tumblerPoint}
              onChange={(e) => setTumblerPoint(Number(e.target.value))}
              className="input w-24"
            />
            <span className="text-sm text-black">P / 잔</span>
          </div>

          <label className="mb-1 block text-xs text-black">다회용기 이용 시 적립 포인트</label>
          <div className="mb-4 flex items-center gap-2">
            <input
              type="number"
              value={cupPoint}
              onChange={(e) => setCupPoint(Number(e.target.value))}
              className="input w-24"
            />
            <span className="text-sm text-black">P / 회</span>
          </div>

          <label className="mb-2 flex items-center gap-2 text-sm text-black">
            <input
              type="checkbox"
              checked={donationEnabled}
              onChange={(e) => setDonationEnabled(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300"
            />
            환경 기금 자동 기부 (매장 매칭 적립)
          </label>
          {donationEnabled && (
            <div className="mb-4 flex items-center gap-2 pl-6">
              <span className="text-xs text-black">고객 적립 1P당</span>
              <input
                type="number"
                value={donationRatio}
                onChange={(e) => setDonationRatio(Number(e.target.value))}
                className="input w-16"
              />
              <span className="text-xs text-black">P 매장 기부</span>
            </div>
          )}

          <button onClick={saveEcoPolicy} className="btn-primary w-full">
            정책 저장
          </button>

          <div className="mt-5 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
            <div className="rounded-xl bg-emerald-50 p-3">
              <p className="text-xs text-black/60">이번 달 텀블러 사용</p>
              <p className="text-lg font-bold text-emerald-700">{ecoPointsSettings.monthTumblerUses.toLocaleString()}건</p>
            </div>
            <div className="rounded-xl bg-emerald-50 p-3">
              <p className="text-xs text-black/60">이번 달 기부 포인트</p>
              <p className="text-lg font-bold text-emerald-700">{ecoPointsSettings.monthDonatedPoint.toLocaleString()}P</p>
            </div>
          </div>
        </div>

        <div className="card p-5">
          <h3 className="mb-4 flex items-center gap-1.5 font-bold text-black">
            <Recycle size={16} className="text-emerald-500" /> 친환경 적립 내역
          </h3>
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="table-th">고객</th>
                <th className="table-th">참여 유형</th>
                <th className="table-th">적립 포인트</th>
                <th className="table-th">일시</th>
              </tr>
            </thead>
            <tbody>
              {ecoActions.map((a) => (
                <tr key={a.id} className="border-b border-slate-50 hover:bg-slate-50">
                  <td className="table-td font-medium text-black">{a.customer}</td>
                  <td className="table-td text-black">
                    <span className="badge bg-emerald-50 text-emerald-600">{a.type}</span>
                  </td>
                  <td className="table-td text-emerald-600">+{a.point}P</td>
                  <td className="table-td text-black">{a.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {couponOpen && (
        <Modal title="쿠폰 발급" onClose={() => setCouponOpen(false)}>
          <div className="space-y-3 text-sm">
            <div>
              <label className="mb-1 block text-xs text-black/60">쿠폰명</label>
              <input
                className="input"
                value={couponForm.name}
                onChange={(e) => setCouponForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="예: 가을 시즌 음료 쿠폰"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-black/60">할인 내용</label>
              <input
                className="input"
                value={couponForm.discount}
                onChange={(e) => setCouponForm((f) => ({ ...f, discount: e.target.value }))}
                placeholder="예: 2,000원 할인 또는 15% 할인"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-black/60">발급 대상</label>
              <select
                className="input"
                value={couponForm.target}
                onChange={(e) => setCouponForm((f) => ({ ...f, target: e.target.value }))}
              >
                <option>전체 고객</option>
                <option>신규 회원</option>
                <option>생일 회원</option>
                <option>단골 고객</option>
                <option>VIP 고객</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs text-black/60">사용 기간</label>
              <input
                className="input"
                value={couponForm.period}
                onChange={(e) => setCouponForm((f) => ({ ...f, period: e.target.value }))}
                placeholder="예: ~2026.09.30"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-black/60">발급 한도 (매수)</label>
              <input
                type="number"
                className="input"
                value={couponForm.limit}
                onChange={(e) => setCouponForm((f) => ({ ...f, limit: e.target.value }))}
                placeholder="예: 200"
              />
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <button className="btn-secondary flex-1" onClick={() => setCouponOpen(false)}>
              취소
            </button>
            <button className="btn-primary flex-1" onClick={issueCoupon}>
              발급하기
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
