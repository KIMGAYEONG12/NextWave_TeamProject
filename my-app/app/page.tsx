import Icon from "@/components/icons";
import Card from "@/components/Card";
import StatCard from "@/components/StatCard";
import LineChart from "@/components/LineChart";
import CongestionBar from "@/components/CongestionBar";
import { salesTrend, topMenus, todayReservations, reviews } from "@/lib/mock-data";

const alerts = [
  {
    tone: "red" as const,
    title: "딸기 (냉동) 재고 부족",
    desc: "현재 3kg 남음 (발주 필요)",
    time: "5분 전",
  },
  {
    tone: "blue" as const,
    title: "새 소식 등록 후 10일 경과",
    desc: "고객 관심 유지를 위해 새 소식을 올려보세요.",
    time: "1일 전",
  },
  {
    tone: "amber" as const,
    title: "발주가 필요한 상품",
    desc: "에티오피아 예가체프 외 1종",
    time: "2일 전",
  },
];

const alertTone: Record<string, string> = {
  red: "bg-red-50 text-red-500",
  blue: "bg-brand-50 text-brand-500",
  amber: "bg-amber-50 text-amber-500",
};

export default function DashboardPage() {
  return (
    <div className="p-6 md:p-8 max-w-[1400px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-ink-900">
            안녕하세요, 사장님! 👋
          </h1>
          <p className="mt-1 text-sm text-ink-500">
            오늘도 OOO 커피의 성공적인 하루를 응원합니다.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-lg border border-ink-200 bg-white px-3 py-2 text-xs text-ink-600">
            <Icon name="reservation" className="w-4 h-4 text-ink-400" />
            2026.08.07 (금) 13:00
            <Icon name="chevronDown" className="w-3.5 h-3.5 text-ink-400" />
          </button>
          <button className="relative flex items-center justify-center w-9 h-9 rounded-lg border border-ink-200 bg-white text-ink-500">
            <Icon name="bell" className="w-[18px] h-[18px]" />
            <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center min-w-[18px] h-[18px] rounded-full bg-red-500 text-white text-[10px] font-semibold px-1">
              1
            </span>
          </button>
          <div className="flex items-center gap-2 rounded-lg border border-ink-200 bg-white px-2 py-1.5">
            <div className="w-7 h-7 rounded-full bg-ink-100 flex items-center justify-center text-sm">☕</div>
            <div className="leading-tight pr-1">
              <p className="text-xs font-semibold text-ink-800">OOO 커피</p>
              <p className="text-[10px] text-ink-400">매장 보기</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        <StatCard label="오늘 예상 매출" value="₩66,000" delta="▲ 8%" deltaLabel="지난 7일 평균 대비" icon="sales" iconTone="blue" />
        <StatCard label="오늘 예약" value="3건" delta="" deltaLabel="2건 승인 대기 중" icon="reservation" iconTone="green" />
        <StatCard label="재고 경고 품목" value="2개" deltaLabel="기존 수량 이하 품목" icon="menu" iconTone="amber" />
        <StatCard label="신규 리뷰" value="5개" deltaLabel="오늘 작성된 리뷰" icon="star" iconTone="purple" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
        <Card className="lg:col-span-1">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm font-semibold text-ink-800">최근 7일 매출 추이</h3>
            <select className="text-xs border border-ink-200 rounded-md px-2 py-1 text-ink-500">
              <option>7일</option>
              <option>30일</option>
            </select>
          </div>
          <LineChart data={salesTrend} />
        </Card>

        <Card>
          <h3 className="text-sm font-semibold text-ink-800 mb-4">지금 매장 상태</h3>
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-sm font-medium text-emerald-600">여유</span>
          </div>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-ink-500">영업 시간</dt>
              <dd className="text-ink-800 font-medium">08:00 ~ 21:00</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink-500">노쇼 정책</dt>
              <dd className="text-ink-800 font-medium">예약 60분 전까지 무료취소</dd>
            </div>
          </dl>
          <div className="mt-4">
            <CongestionBar used={14} total={32} label="좌석 현황" />
          </div>
          <div className="flex justify-between mt-4 text-sm">
            <dt className="text-ink-500">오늘 날씨</dt>
            <dd className="text-ink-800 font-medium">☀️ 맑음 28°C</dd>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-ink-800">주요 알림</h3>
            <a href="/notifications" className="text-xs text-brand-600 font-medium">전체 보기 →</a>
          </div>
          <div className="space-y-2.5">
            {alerts.map((a) => (
              <div key={a.title} className={`rounded-xl px-3 py-2.5 ${alertTone[a.tone]}`}>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">{a.title}</p>
                  <span className="text-[11px] opacity-70 shrink-0">{a.time}</span>
                </div>
                <p className="text-xs mt-0.5 opacity-80">{a.desc}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-ink-800">인기 메뉴 순위 (최근 7일)</h3>
          </div>
          <div className="space-y-3">
            {topMenus.map((m) => (
              <div key={m.rank} className="flex items-center gap-3">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${m.rank === 1 ? "bg-brand-600 text-white" : "bg-ink-100 text-ink-500"}`}>
                  {m.rank}
                </span>
                <span className="text-sm text-ink-800 flex-1">{m.name}</span>
                <span className="text-xs text-ink-400">{m.sold}</span>
              </div>
            ))}
          </div>
          <a href="/menu" className="mt-4 inline-block text-xs text-brand-600 font-medium">전체 메뉴 보기 →</a>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-ink-800">오늘 예약 현황</h3>
            <a href="/reservations" className="text-xs text-brand-600 font-medium">전체 보기 →</a>
          </div>
          <div className="space-y-2.5">
            {todayReservations.map((r) => (
              <div key={r.time} className="flex items-center justify-between text-sm">
                <span className="text-ink-500 w-12">{r.time}</span>
                <span className="text-ink-800 flex-1">{r.name}</span>
                <span className="text-ink-400 text-xs w-8">{r.people}명</span>
                <span className={`text-xs font-medium rounded-full px-2 py-0.5 ${r.status === "승인" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>
                  {r.status}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-ink-800">최근 리뷰</h3>
            <a href="/customers" className="text-xs text-brand-600 font-medium">전체 보기 →</a>
          </div>
          <div className="space-y-3">
            {reviews.slice(0, 3).map((r) => (
              <div key={r.name} className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-full bg-ink-100 flex items-center justify-center text-xs shrink-0">🙂</div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-ink-800">{r.name}</p>
                    <span className="text-[11px] text-ink-400">{r.date}</span>
                  </div>
                  <div className="flex items-center gap-0.5 text-amber-400 my-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Icon key={i} name="star" className={`w-3 h-3 ${i < Math.round(r.rating) ? "" : "text-ink-200"}`} />
                    ))}
                  </div>
                  <p className="text-xs text-ink-500 truncate">{r.content}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
