"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import GameNightPointControl from "./GameNightPointControl";

type AppLayoutProps = {
  children: ReactNode;
};

export default function AppLayout({
  children,
}: AppLayoutProps) {
  const pathname = usePathname();
  const showGameNightPoints = pathname.startsWith("/play/");

  return (
    <div className="min-h-screen bg-[#050b12] text-white">
      <div className="flex">
        <Sidebar />

        <div className="flex min-h-screen flex-1 flex-col">
          <Topbar />

          <main className="flex-1 overflow-y-auto px-4 py-6 md:px-8 md:py-8">
            {children}
          </main>
          {showGameNightPoints && <GameNightPointControl />}
        </div>
      </div>
    </div>
  );
}
