import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import { ToastProvider } from "@/components/Toast";
import Sidebar from "@/components/Sidebar";
import BottomTabBar from "@/components/BottomTabBar";

export const metadata: Metadata = {
  title: "cafeON | 사장님 관리 시스템",
  description: "개인 카페 사장님을 위한 스마트 운영 + 고객 적립 관리 시스템",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="bg-ink-50">
        <AuthProvider>
          <ToastProvider>
            <div className="flex min-h-screen">
              <Sidebar />
              <main className="flex-1 min-w-0 pb-16 md:pb-0">{children}</main>
            </div>
            <BottomTabBar />
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
