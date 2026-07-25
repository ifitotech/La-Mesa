"use client";

import { ReactNode } from "react";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import MobileNavigation from "./MobileNavigation";

type AppLayoutProps = {
  children: ReactNode;
};

export default function AppLayout({
  children,
}: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-[#050b12] text-white">
      <div className="flex">
        <Sidebar />

        <div className="flex min-h-screen flex-1 flex-col">
          <Topbar />

          <main className="flex-1 overflow-y-auto px-4 pb-24 pt-5 sm:px-6 md:py-7 xl:px-8 xl:pb-8">
            {children}
          </main>
          <MobileNavigation />
        </div>
      </div>
    </div>
  );
}
