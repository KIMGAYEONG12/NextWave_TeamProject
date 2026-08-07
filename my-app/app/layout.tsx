import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import BottomTabBar from "@/components/BottomTabBar";
import { ToastProvider } from "@/components/Toast";

export const metadata: Metadata = {
  title: "cafeON | 사장님 관리 시스템",
  description: "카페 사장님을 위한 올인원 매장 관리 시스템 cafeON",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <ToastProvider>
          <div className="flex min-h-screen w-full">
            <Sidebar />
            <main className="flex-1 min-w-0 bg-ink-50 pb-16 md:pb-0">
              {children}
            </main>
          </div>
          <BottomTabBar />
        </ToastProvider>
      </body>
    </html>
  );
}
