"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import MobileNavigation from "./MobileNavigation";

type AppLayoutProps = {
  children: ReactNode;
  lockViewport?: boolean;
};

export default function AppLayout({
  children,
  lockViewport = false,
}: AppLayoutProps) {
  const pathname = usePathname();
  const shouldLockViewport = lockViewport || pathname.startsWith("/play/");
  return (
    <div className={`${shouldLockViewport ? "h-dvh overflow-hidden overscroll-none" : "min-h-screen"} bg-[#050b12] text-white`}>
      <div className={`flex ${shouldLockViewport ? "h-full min-h-0" : ""}`}>
        <Sidebar />

        <div className={`flex flex-1 flex-col ${shouldLockViewport ? "min-h-0" : "min-h-screen"}`}>
          <Topbar />

          <main className={`flex-1 overflow-x-hidden overflow-y-auto px-4 pb-24 pt-5 overscroll-contain sm:px-6 md:py-7 xl:px-8 xl:pb-8 ${shouldLockViewport ? "min-h-0 touch-pan-y" : ""}`}>
            {children}
          </main>
          <MobileNavigation />
        </div>
      </div>
    </div>
  );
}
