"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Coins, Crown, Gamepad2, Radio, Sparkles, Trophy } from "lucide-react";
import { useEffect, useState } from "react";

import AppLayout from "@/app/components/AppLayout";
import { useAuthContext } from "@/contexts/AuthContext";
import { useCountry } from "@/contexts/CountryContext";
import { Player, subscribeToPlayer } from "@/services/player";

type DashboardGame = {
  title: string;
  subtitle: string;
  href?: string;
  icon: string;
  visual: string;
  accent: string;
  ready: boolean;
};

export default function DashboardPage() {
  const { user, loading } = useAuthContext();
  const { country, isEnglish } = useCountry();
  const [player, setPlayer] = useState<Player | null>(null);
  const [loadingPlayer, setLoadingPlayer] = useState(true);

  useEffect(() => {
    if (!user) return;
    return subscribeToPlayer(user.uid, (data) => {
      setPlayer(data);
      setLoadingPlayer(false);
    });
  }, [user]);

  if (loading || (user !== null && loadingPlayer)) return <AppLayout><div className="mesa-panel rounded-3xl p-10 text-center text-slate-400">Preparando tu Game Night...</div></AppLayout>;

  const guestPlayer: Player = { uid: "guest", email: "", displayName: isEnglish ? "Guest" : "Invitado", country: country.flag, avatar: "avatar_001", level: 1, xp: 0, coins: 0, gems: 0, streak: 0, ranking: 0 };
  const activePlayer = player ?? (user ? null : guestPlayer);
  if (!activePlayer) return <AppLayout><div className="mesa-panel rounded-3xl p-10 text-center text-rose-300">No encontramos tu perfil de jugador.</div></AppLayout>;

  // The U.S. collection is intentionally independent; no Latin-game additions are listed here.
  const games: DashboardGame[] = isEnglish ? [
    { title: "Game Night", subtitle: "Play together at home", href: "/game-night", icon: "🎉", visual: "👥", accent: "from-emerald-500 via-emerald-700 to-[#063d32]", ready: true },
    { title: "Online match", subtitle: "Create a room and invite friends", href: "/online", icon: "🌐", visual: "🎮", accent: "from-blue-500 via-blue-700 to-[#071d50]", ready: true },
    { title: country.triviaName, subtitle: "U.S. culture, history and more", href: "/play/trivia", icon: "🧠", visual: "🇺🇸", accent: "from-violet-500 via-indigo-700 to-[#24124d]", ready: true },
  ] : [
    { title: "Dominó", subtitle: "Doble seis o doble nueve", href: "/play/domino", icon: "🎲", visual: "🁣", accent: "from-cyan-500 via-blue-700 to-[#071d50]", ready: true },
    { title: "Cartas españolas", subtitle: "Oros, copas, espadas y bastos", href: "/play/cards", icon: "🃏", visual: "🂡", accent: "from-rose-500 via-red-700 to-[#3b0a18]", ready: true },
    { title: "Parchís", subtitle: "Próximamente en La Mesa", icon: "🎲", visual: "🎯", accent: "from-amber-400 via-orange-600 to-[#55210b]", ready: false },
  ];

  const welcome = isEnglish ? `${country.greeting}! Let the night begin.` : `${country.greeting} ¡Que empiece la reunión!`;
  const avatar = activePlayer.avatar || "avatar_001";

  return <AppLayout><div className="mx-auto max-w-6xl space-y-5 pb-4 md:space-y-7">
    <section className="relative overflow-hidden rounded-[2rem] border border-blue-200/20 bg-[linear-gradient(130deg,#06142e,#123574_58%,#08152e)] p-5 shadow-2xl shadow-blue-950/40 md:p-8">
      <div className="absolute -right-10 -top-12 h-44 w-44 rounded-full bg-blue-400/20 blur-3xl" />
      <div className="absolute -bottom-16 left-1/3 h-32 w-32 rounded-full bg-violet-500/20 blur-3xl" />
      <div className="relative flex items-start justify-between gap-4"><div className="min-w-0"><p className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[.24em] text-amber-300"><Sparkles size={13} /> La Mesa · {country.name}</p><h1 className="mt-3 max-w-2xl text-3xl font-black leading-tight sm:text-4xl md:text-5xl">{welcome}</h1><p className="mt-3 max-w-xl text-sm leading-6 text-blue-100/80 md:text-base">{isEnglish ? "Your social game host for sharing a great night with friends and family." : "Tu anfitrión para jugar, competir y pasar una noche increíble con los tuyos."}</p></div><Link href="/profile" aria-label={isEnglish ? "Open profile" : "Abrir perfil"} className="shrink-0 rounded-2xl border border-white/15 bg-slate-950/30 p-1.5 shadow-lg"><Image src={`/avatars/${avatar}.png`} alt="" width={58} height={58} className="h-14 w-14 rounded-xl object-cover" /></Link></div>
      <div className="relative mt-5 flex flex-wrap gap-2"><span className="inline-flex items-center gap-2 rounded-xl border border-amber-300/25 bg-amber-400/10 px-3 py-2 text-sm font-black text-amber-100"><Coins size={16} className="text-amber-300" /> {activePlayer.coins.toLocaleString()}</span><span className="rounded-xl border border-blue-300/20 bg-blue-500/10 px-3 py-2 text-sm font-bold text-blue-100">{isEnglish ? "Level" : "Nivel"} {activePlayer.level}</span><Link href="/scoreboard" className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-slate-950/25 px-3 py-2 text-sm font-bold text-slate-100"><Trophy size={16} className="text-amber-300" /> {isEnglish ? "Scores" : "Marcador"}</Link></div>
    </section>

    <section><div className="mb-3 flex items-end justify-between"><div><p className="text-[10px] font-black uppercase tracking-[.24em] text-blue-300">{isEnglish ? "Games" : "Juegos"}</p><h2 className="mt-1 text-2xl font-black">{isEnglish ? "Pick a table" : "Elige una mesa"}</h2></div><Link href="/games" className="text-sm font-black text-blue-300 hover:text-white">{isEnglish ? "See all" : "Ver todos"}</Link></div><div className="grid gap-3 md:grid-cols-3">{games.map((game) => { const body = <><div className="absolute -right-5 -top-7 text-8xl opacity-25">{game.visual}</div><div className="relative flex items-start justify-between"><span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/25 bg-black/15 text-2xl">{game.icon}</span><span className={`rounded-full px-2.5 py-1 text-[10px] font-black ${game.ready ? "bg-blue-400/20 text-blue-100" : "bg-amber-300/20 text-amber-100"}`}>{game.ready ? (isEnglish ? "PLAY" : "JUGAR") : (isEnglish ? "SOON" : "PRONTO")}</span></div><div className="relative mt-6"><h3 className="text-2xl font-black leading-none">{game.title}</h3><p className="mt-2 min-h-10 text-sm text-white/75">{game.subtitle}</p><span className="mt-4 flex items-center gap-1 text-sm font-black">{game.ready ? (isEnglish ? "Play now" : "Jugar ahora") : (isEnglish ? "In development" : "En desarrollo")} {game.ready && <ArrowRight size={16} />}</span></div></>; return game.ready && game.href ? <Link key={game.title} href={game.href} className={`relative overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br p-5 shadow-xl shadow-black/25 transition hover:-translate-y-1 hover:border-white/50 ${game.accent}`}>{body}</Link> : <article key={game.title} className={`relative overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br p-5 opacity-85 ${game.accent}`}>{body}</article>; })}</div></section>

    <section className="grid gap-3 sm:grid-cols-2"><Link href="/game-night" className="mesa-panel flex items-center gap-4 rounded-2xl p-4 transition hover:border-emerald-300/50"><span className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-300"><Gamepad2 size={23} /></span><div><h3 className="font-black">Game Night</h3><p className="mt-1 text-sm text-slate-400">{isEnglish ? "Set up scores for your group." : "Organiza el marcador de tu grupo."}</p></div></Link><Link href="/online" className="mesa-panel flex items-center gap-4 rounded-2xl p-4 transition hover:border-violet-300/50"><span className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/15 text-violet-300"><Radio size={23} /></span><div><h3 className="font-black">{isEnglish ? "Play online" : "Jugar online"}</h3><p className="mt-1 text-sm text-slate-400">{isEnglish ? "Create a private room for friends." : "Crea una sala privada para tus amigos."}</p></div></Link></section>
    <Link href="/ranking" className="mesa-panel flex items-center justify-between rounded-2xl p-4 transition hover:border-amber-300/50"><span className="flex items-center gap-3"><Crown className="text-amber-300" /><span><span className="block font-black">{isEnglish ? "Rankings and rewards" : "Torneos y recompensas"}</span><span className="mt-1 block text-sm text-slate-400">{isEnglish ? "Keep playing to level up." : "Sigue jugando para subir de nivel."}</span></span></span><ArrowRight className="text-slate-400" /></Link>
  </div></AppLayout>;
}
