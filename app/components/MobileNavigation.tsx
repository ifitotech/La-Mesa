"use client";

import Link from "next/link";
import { Gamepad2, Home, Radio, Trophy, UserRound } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCountry } from "@/contexts/CountryContext";

const items = [
  { label: "Inicio", href: "/dashboard", icon: Home },
  { label: "Game Night", href: "/game-night", icon: Gamepad2 },
  { label: "Online", href: "/online", icon: Radio },
  { label: "Marcador", href: "/scoreboard", icon: Trophy },
  { label: "Perfil", href: "/profile", icon: UserRound },
];

export default function MobileNavigation() {
  const pathname = usePathname();
  const { isEnglish } = useCountry();

  return <nav aria-label="Navegación principal" className="fixed inset-x-0 bottom-0 z-50 border-t border-blue-300/15 bg-[#07111ff2] px-2 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-2 shadow-[0_-14px_35px_rgba(0,0,0,0.35)] backdrop-blur-xl xl:hidden"><div className="mx-auto grid max-w-xl grid-cols-5 gap-1">{items.map((item) => {
    const Icon = item.icon;
    const active = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(`${item.href}/`));
    const label = isEnglish ? ({ "Inicio": "Home", "Game Night": "Game Night", "Online": "Online", "Marcador": "Scores", "Perfil": "Profile" }[item.label] ?? item.label) : item.label;
    return <Link key={item.href} href={item.href} className={`flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl px-1 text-[10px] font-bold transition ${active ? "bg-blue-500/15 text-blue-200" : "text-slate-400 hover:bg-slate-800/80 hover:text-slate-100"}`}><span className={`flex h-7 w-7 items-center justify-center rounded-lg ${active ? "bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-900/60" : ""}`}><Icon size={18} strokeWidth={active ? 2.6 : 2} /></span><span className="truncate">{label}</span></Link>;
  })}</div></nav>;
}
