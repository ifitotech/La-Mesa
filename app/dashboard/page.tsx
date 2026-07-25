"use client";

import Link from "next/link";
import { ArrowRight, Brain, Crown, Gamepad2, Plus, UsersRound } from "lucide-react";
import { useEffect, useState } from "react";

import AppLayout from "@/app/components/AppLayout";
import PlayerCard from "@/app/components/PlayerCard";
import { useAuthContext } from "@/contexts/AuthContext";
import { Player, subscribeToPlayer } from "@/services/player";
import { useCountry } from "@/contexts/CountryContext";

const actions = [
  { title: "Game Night", detail: "Jueguen sin conexión", href: "/game-night", icon: Gamepad2, tone: "from-emerald-500 to-green-700" },
  { title: "Juegos online", detail: "Crea o únete a una sala", href: "/online", icon: Plus, tone: "from-violet-500 to-purple-700" },
  { title: "Explorar juegos", detail: "Elige el próximo reto", href: "/games", icon: Brain, tone: "from-blue-500 to-cyan-700" },
  { title: "Ver amigos", detail: "Organiza la reunión", href: "/profile", icon: UsersRound, tone: "from-amber-500 to-orange-700" },
];

export default function DashboardPage() {
  const { user, loading } = useAuthContext();
  const [player, setPlayer] = useState<Player | null>(null);
  const [loadingPlayer, setLoadingPlayer] = useState(true);
  const { country } = useCountry();

  useEffect(() => {
    if (!user) return;
    return subscribeToPlayer(user.uid, (data) => {
      setPlayer(data);
      setLoadingPlayer(false);
    });
  }, [user]);

  if (loading || (user !== null && loadingPlayer)) {
    return <AppLayout><div className="mesa-panel rounded-3xl p-10 text-center text-slate-400">Preparando tu Game Night...</div></AppLayout>;
  }

  const guestPlayer: Player = {
    uid: "guest",
    email: "",
    displayName: "Invitado",
    country: country.flag,
    avatar: "avatar_001",
    level: 1,
    xp: 0,
    coins: 0,
    gems: 0,
    streak: 0,
    ranking: 0,
  };
  const activePlayer = player ?? (user ? null : guestPlayer);

  if (!activePlayer) {
    return <AppLayout><div className="mesa-panel rounded-3xl p-10 text-center text-rose-300">No encontramos tu perfil de jugador.</div></AppLayout>;
  }

  return (
    <AppLayout>
      <div className="mx-auto max-w-7xl space-y-7">
        <section className="relative overflow-hidden rounded-3xl border border-amber-200/20 bg-gradient-to-br from-[#1c2836] via-[#101d2b] to-[#090e16] p-7 md:p-10">
          <div className="absolute -right-14 -top-20 h-72 w-72 rounded-full bg-violet-500/15 blur-3xl" />
          <div className="relative max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-amber-300">La Mesa · Game Night</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight md:text-6xl">{country.greeting} Que empiece la reunión.</h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-300">Trivia, expresiones y temas de {country.name}, más juegos para compartir con familia y amigos.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/game-night" className="rounded-xl bg-gradient-to-r from-violet-600 to-purple-700 px-5 py-3 font-bold shadow-lg shadow-violet-950/50 hover:from-violet-500 hover:to-purple-600">Jugar ahora</Link>
              <Link href="/games" className="mesa-action">Ver catálogo</Link>
            </div>
          </div>
        </section>

        <PlayerCard name={activePlayer.displayName} country={activePlayer.country} level={activePlayer.level} xp={activePlayer.xp} coins={activePlayer.coins} gems={activePlayer.gems} streak={activePlayer.streak} ranking={activePlayer.ranking} />

        <section>
          <div className="mb-4 flex items-center justify-between">
            <div><p className="text-xs font-bold uppercase tracking-[0.22em] text-violet-300">Tu mesa</p><h2 className="mt-1 text-2xl font-black">¿Qué hacemos esta noche?</h2></div>
            <Crown className="text-amber-300" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {actions.map((action) => {
              const Icon = action.icon;
              return <Link key={action.title} href={action.href} className="mesa-panel group rounded-2xl p-5 transition hover:-translate-y-1 hover:border-violet-400/60">
                <span className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${action.tone} shadow-lg`}><Icon size={23} /></span>
                <h3 className="mt-5 text-lg font-black">{action.title}</h3>
                <p className="mt-1 text-sm text-slate-400">{action.detail}</p>
                <span className="mt-5 flex items-center gap-1 text-sm font-bold text-violet-300">Abrir <ArrowRight size={16} /></span>
              </Link>;
            })}
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
