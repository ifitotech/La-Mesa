"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Gamepad2,
  Home,
  LayoutGrid,
  ShoppingBag,
  Trophy,
  UserRound,
  UsersRound,
} from "lucide-react";

import Avatar from "@/app/components/Avatar";
import { useAuthContext } from "@/contexts/AuthContext";
import { Player, subscribeToPlayer } from "@/services/player";

const menu = [
  { label: "Game Night", detail: "Juegos en la misma casa", href: "/game-night", icon: Gamepad2, color: "from-emerald-500 to-green-700" },
  { label: "Juegos online", detail: "Crea o únete a una sala", href: "/online", icon: LayoutGrid, color: "from-violet-500 to-purple-700" },
  { label: "Amigos", detail: "Conéctate y juega", href: "/profile", icon: UsersRound, color: "from-amber-500 to-orange-700" },
  { label: "Marcador", detail: "Puntos de tu Game Night", href: "/scoreboard", icon: Trophy, color: "from-cyan-500 to-blue-700" },
  { label: "Tienda", detail: "Avatares y temas", href: "/store", icon: ShoppingBag, color: "from-rose-500 to-pink-700" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuthContext();
  const [player, setPlayer] = useState<Player | null>(null);
  const activePlayer = user ? player : null;

  useEffect(() => {
    if (!user) return;
    return subscribeToPlayer(user.uid, setPlayer);
  }, [user]);

  return (
    <aside className="mesa-panel hidden w-[290px] shrink-0 border-y-0 border-l-0 xl:flex xl:min-h-screen xl:flex-col">
      <div className="border-b border-slate-700/70 px-7 py-8">
        <Link href="/dashboard" className="flex items-center gap-3">
          <Image
            src="/la-mesa-logo-v2.png"
            alt="La Mesa"
            width={72}
            height={72}
            priority
            className="h-[72px] w-[72px] rounded-2xl border border-amber-200/50 object-cover shadow-lg shadow-amber-500/20"
          />
          <div>
            <p className="text-3xl font-black tracking-tight text-amber-50">LA MESA</p>
            <p className="text-xs font-bold tracking-[0.32em] text-amber-400">GAME NIGHT</p>
          </div>
        </Link>
        <p className="mt-6 text-center text-xs font-semibold tracking-[0.18em] text-slate-300">
          JUEGA · CONECTA · DIVIÉRTETE
        </p>
      </div>

      <Link href="/profile" className="mx-5 mt-5 rounded-2xl border border-slate-700/70 bg-slate-950/45 p-4 transition hover:border-blue-300/50">
        <div className="flex items-center gap-3">
          <Avatar avatar={activePlayer?.avatar} photoURL={activePlayer?.photoURL} name={activePlayer?.displayName ?? "Jugador"} size="sm" />
          <div className="min-w-0">
            <p className="truncate font-bold">{activePlayer?.displayName ?? "Tu Game Night"}</p>
            <p className="text-xs text-slate-400">Nivel {activePlayer?.level ?? 1} · Perfil y recompensas</p>
          </div>
        </div>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
          <div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-400" style={{ width: `${Math.min(100, Math.max(8, ((activePlayer?.xp ?? 0) % 100) + 8))}%` }} />
        </div>
      </Link>

      <nav className="flex-1 space-y-2 px-5 py-5">
        {menu.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href.split("?")[0];

          return (
            <Link key={item.label} href={item.href} className={`group flex items-center gap-3 rounded-2xl border px-3 py-3 transition ${active ? "border-violet-400/50 bg-violet-500/12" : "border-transparent hover:border-slate-700 hover:bg-slate-800/70"}`}>
              <span className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${item.color} text-white shadow-lg`}><Icon size={21} /></span>
              <span className="min-w-0 flex-1">
                <span className="block font-bold uppercase tracking-wide">{item.label}</span>
                <span className="block truncate text-xs text-slate-400">{item.detail}</span>
              </span>
              <span className="text-slate-500 group-hover:text-white">›</span>
            </Link>
          );
        })}
      </nav>

      <div className="flex justify-around border-t border-slate-700/70 px-4 py-4 text-slate-400">
        <Link href="/dashboard" aria-label="Inicio" className="rounded-lg p-2 hover:bg-slate-800 hover:text-violet-300"><Home size={20} /></Link>
        <Link href="/games" aria-label="Juegos" className="rounded-lg p-2 hover:bg-slate-800 hover:text-violet-300"><Gamepad2 size={20} /></Link>
        <Link href="/profile" aria-label="Perfil" className="rounded-lg p-2 hover:bg-slate-800 hover:text-violet-300"><UserRound size={20} /></Link>
      </div>
    </aside>
  );
}
