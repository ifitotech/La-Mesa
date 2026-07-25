"use client";

import Link from "next/link";
import { ArrowRight, Brain, Crown, Gamepad2, Radio, Trophy, UsersRound } from "lucide-react";
import { useEffect, useState } from "react";

import AppLayout from "@/app/components/AppLayout";
import PlayerCard from "@/app/components/PlayerCard";
import { useAuthContext } from "@/contexts/AuthContext";
import { useCountry } from "@/contexts/CountryContext";
import { Player, subscribeToPlayer } from "@/services/player";

const actions = [
  { title: "Game Night", detail: "Jueguen juntos en la misma casa", href: "/game-night", icon: Gamepad2, tone: "from-emerald-500 via-emerald-700 to-[#063d32]" },
  { title: "Partida online", detail: "Crea una sala y comparte el código", href: "/online", icon: Radio, tone: "from-blue-500 via-blue-700 to-[#071d50]" },
  { title: "Trivia", detail: "Preguntas y cultura de tu país", href: "/play/trivia", icon: Brain, tone: "from-violet-500 via-indigo-700 to-[#24124d]" },
];

export default function DashboardPage() {
  const { user, loading } = useAuthContext(); const { country } = useCountry();
  const [player, setPlayer] = useState<Player | null>(null); const [loadingPlayer, setLoadingPlayer] = useState(true);
  useEffect(() => { if (!user) return; return subscribeToPlayer(user.uid, (data) => { setPlayer(data); setLoadingPlayer(false); }); }, [user]);
  if (loading || (user !== null && loadingPlayer)) return <AppLayout><div className="mesa-panel rounded-3xl p-10 text-center text-slate-400">Preparando tu Game Night...</div></AppLayout>;
  const guestPlayer: Player = { uid: "guest", email: "", displayName: "Invitado", country: country.flag, avatar: "avatar_001", level: 1, xp: 0, coins: 0, gems: 0, streak: 0, ranking: 0 };
  const activePlayer = player ?? (user ? null : guestPlayer);
  if (!activePlayer) return <AppLayout><div className="mesa-panel rounded-3xl p-10 text-center text-rose-300">No encontramos tu perfil de jugador.</div></AppLayout>;
  return <AppLayout><div className="mx-auto max-w-7xl space-y-6 md:space-y-8">
    <section className="relative overflow-hidden rounded-3xl border border-blue-200/20 bg-[linear-gradient(130deg,#071733,#102d68_58%,#07142c)] p-6 shadow-2xl shadow-blue-950/30 md:p-9"><div className="absolute -right-14 -top-20 h-64 w-64 rounded-full bg-blue-400/20 blur-3xl" /><div className="absolute -bottom-20 left-1/3 h-48 w-48 rounded-full bg-violet-500/15 blur-3xl" /><div className="relative max-w-2xl"><p className="text-xs font-bold uppercase tracking-[.3em] text-amber-300">La Mesa · {country.name}</p><h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">{country.greeting}<br />Que empiece la reunión.</h2><p className="mt-4 max-w-xl leading-7 text-slate-300">Tu anfitrión para jugar, competir y conectar con familia y amigos, estén donde estén.</p><div className="mt-7 flex flex-wrap gap-3"><Link href="/game-night" className="mesa-action inline-flex items-center gap-2"><Gamepad2 size={18} /> Jugar ahora</Link><Link href="/online" className="rounded-xl border border-white/15 bg-slate-950/35 px-5 py-3 font-bold text-white transition hover:border-blue-200/60 hover:bg-blue-500/10">Jugar online</Link></div></div></section>
    <section><div className="mb-4 flex items-end justify-between"><div><p className="text-xs font-bold uppercase tracking-[.22em] text-blue-300">Tus juegos</p><h2 className="mt-1 text-2xl font-black">¿Qué jugamos hoy?</h2></div><Trophy className="text-amber-300" /></div><div className="grid gap-3 md:grid-cols-3">{actions.map((action) => { const Icon = action.icon; return <Link key={action.title} href={action.href} className={`mesa-game-button bg-gradient-to-br ${action.tone}`}><span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 bg-black/15"><Icon size={22} /></span><h3 className="mt-5 text-xl font-black">{action.title}</h3><p className="mt-1 text-sm text-blue-100/80">{action.detail}</p><span className="mt-5 flex items-center gap-1 text-sm font-bold">Abrir <ArrowRight size={16} /></span></Link>; })}</div></section>
    <PlayerCard name={activePlayer.displayName} country={activePlayer.country} level={activePlayer.level} xp={activePlayer.xp} coins={activePlayer.coins} gems={activePlayer.gems} streak={activePlayer.streak} ranking={activePlayer.ranking} />
    <section className="grid gap-3 sm:grid-cols-2"><Link href="/profile" className="mesa-panel flex items-center gap-4 rounded-2xl p-5 transition hover:border-blue-300/50"><span className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-400/15 text-amber-300"><UsersRound size={23} /></span><div><h3 className="font-black">Amigos y familia</h3><p className="mt-1 text-sm text-slate-400">Invita a tu gente y arma la próxima mesa.</p></div></Link><Link href="/ranking" className="mesa-panel flex items-center gap-4 rounded-2xl p-5 transition hover:border-blue-300/50"><span className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/15 text-violet-300"><Crown size={23} /></span><div><h3 className="font-black">Torneos y ranking</h3><p className="mt-1 text-sm text-slate-400">Compite, sube de nivel y desbloquea premios.</p></div></Link></section>
  </div></AppLayout>;
}
