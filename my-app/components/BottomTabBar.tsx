"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon, { IconName } from "./icons";

const items: { href: string; label: string; icon: IconName }[] = [
  { href: "/", label: "대시보드", icon: "dashboard" },
  { href: "/orders", label: "주문", icon: "orders" },
  { href: "/reservations", label: "예약", icon: "reservation" },
  { href: "/customers", label: "고객", icon: "customers" },
  { href: "/notifications", label: "알림", icon: "bell" },
];

export default function BottomTabBar() {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around border-t border-ink-100 bg-white py-2 md:hidden">
      {items.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-0.5 px-3 py-1 text-[11px] ${
              isActive ? "text-brand-600" : "text-ink-400"
            }`}
          >
            <Icon name={item.icon} className="w-5 h-5" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
