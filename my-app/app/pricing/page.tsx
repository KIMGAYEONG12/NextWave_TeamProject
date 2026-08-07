import PageHeader from "@/components/PageHeader";
import Card from "@/components/Card";
import Button from "@/components/Button";
import Icon from "@/components/icons";
import { pricingPlans } from "@/lib/mock-data";

export default function PricingPage() {
  return (
    <div className="p-6 md:p-8 max-w-[1400px] mx-auto">
      <PageHeader title="요금제 관리" subtitle="현재 사용 중인 요금제와 결제 정보를 확인하고 관리하세요." />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_320px] gap-5 mb-5">
        <Card>
          <p className="text-xs text-ink-400 mb-1">현재 사용 중인 요금제</p>
          <p className="text-xl font-bold text-ink-900 mb-1">프로페셔널</p>
          <p className="text-2xl font-bold text-brand-600 mb-2">
            ₩49,000<span className="text-sm text-ink-400 font-normal"> /월 (부가세 별도)</span>
          </p>
          <p className="text-xs text-ink-500 mb-4">매출 분석, 예약 관리, 멤버십, 마케팅 기능까지 모든 기능을 이용할 수 있는 요금제입니다.</p>
          <ul className="space-y-2 text-sm text-ink-600 mb-5">
            {["모든 기본 기능", "고급 매출 분석", "예약 관리", "멤버십(포인트, 쿠폰)", "마케팅 기능(쿠폰, 알림)", "블로그(CMS)", "SEO 관리", "우선 고객 지원"].map((f) => (
              <li key={f} className="flex items-center gap-2"><Icon name="check" className="w-3.5 h-3.5 text-brand-500" /> {f}</li>
            ))}
          </ul>
          <Button className="w-full">요금제 변경</Button>
        </Card>

        <Card>
          <h3 className="text-sm font-semibold text-ink-800 mb-4">결제 정보</h3>
          <dl className="space-y-3 text-sm mb-4">
            <div className="flex justify-between"><dt className="text-ink-500">결제 주기</dt><dd className="text-ink-800">매월 결제</dd></div>
            <div className="flex justify-between"><dt className="text-ink-500">다음 결제일</dt><dd className="text-ink-800">2026.09.07 (월)</dd></div>
            <div className="flex justify-between"><dt className="text-ink-500">다음 결제 금액</dt><dd className="text-ink-800">₩49,000 (부가세 별도)</dd></div>
          </dl>
          <div className="flex items-center justify-between rounded-lg border border-ink-100 px-3 py-2.5 mb-3">
            <span className="text-sm text-ink-600">결제 수단</span>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-ink-100 rounded px-1.5 py-0.5">카드</span>
              <span className="text-sm text-ink-800">···· 1234</span>
              <button className="text-xs text-brand-600 font-medium">변경</button>
            </div>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-ink-100 px-3 py-2.5 mb-4">
            <span className="text-sm text-ink-600">청구 이메일</span>
            <div className="flex items-center gap-2">
              <span className="text-sm text-ink-800">owner@ooocoffee.com</span>
              <button className="text-xs text-brand-600 font-medium">변경</button>
            </div>
          </div>
          <a href="#" className="text-xs text-brand-600 font-medium">결제 내역 보기 →</a>

          <h4 className="text-sm font-semibold text-ink-800 mt-5 mb-3">이용량 현황 (이번 달)</h4>
          {[
            { label: "매출 분석 리포트", used: 18, total: 30 },
            { label: "예약 관리", used: 120, total: 200 },
            { label: "멤버십 회원", used: 1248, total: 2000 },
            { label: "저장 용량", used: 2.4, total: 10, unit: "GB" },
          ].map((u) => (
            <div key={u.label} className="mb-2.5">
              <div className="flex justify-between text-xs text-ink-500 mb-1">
                <span>{u.label}</span>
                <span>{u.used}{u.unit ?? ""} / {u.total}{u.unit ?? "건"}</span>
              </div>
              <div className="h-1.5 rounded-full bg-ink-100 overflow-hidden">
                <div className="h-full bg-brand-500 rounded-full" style={{ width: `${Math.min(100, (u.used / u.total) * 100)}%` }} />
              </div>
            </div>
          ))}
        </Card>

        <Card>
          <h3 className="text-sm font-semibold text-ink-800 mb-4">다른 요금제 비교</h3>
          <div className="space-y-3">
            {pricingPlans.map((p) => (
              <div
                key={p.name}
                className={`rounded-xl border p-3.5 ${p.current ? "border-brand-500 ring-1 ring-brand-100" : "border-ink-100"}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-semibold text-ink-800">{p.name}</p>
                  {p.current && (
                    <span className="flex items-center gap-1 text-[10px] bg-brand-600 text-white rounded-full px-2 py-0.5">
                      <Icon name="check" className="w-3 h-3" /> 현재 사용 중
                    </span>
                  )}
                </div>
                <p className="text-base font-bold text-ink-900 mb-2">{p.price}<span className="text-xs text-ink-400 font-normal">/월</span></p>
                <ul className="space-y-1 text-xs text-ink-500">
                  {p.features.slice(0, 3).map((f) => (
                    <li key={f}>✓ {f}</li>
                  ))}
                </ul>
              </div>
            ))}
            <Button variant="outline" className="w-full">자세히 보기</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
