"use client";

import { Crown, LoaderCircle, Medal, Trophy, UsersRound } from "lucide-react";
import { useEffect, useState } from "react";

import AppLayout from "@/app/components/AppLayout";
import { getRanking, RankingPlayer } from "@/services/ranking";

const podiumStyles = [
  {
    border: "border-amber-300/40",
    background: "from-amber-400/20 to-amber-950/20",
    accent: "text-amber-300",
    label: "Campeón",
  },
  {
    border: "border-slate-300/35",
    background: "from-slate-300/15 to-slate-900/20",
    accent: "text-slate-200",
    label: "Segundo lugar",
  },
  {
    border: "border-orange-400/35",
    background: "from-orange-400/15 to-orange-950/20",
    accent: "text-orange-300",
    label: "Tercer lugar",
  },
];

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export default function RankingPage() {
  const [players, setPlayers] = useState<RankingPlayer[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let active = true;
    const timeout = new Promise<RankingPlayer[]>((_, reject) => {
      window.setTimeout(() => reject(new Error("Ranking request timed out")), 5000);
    });

    Promise.race([getRanking(), timeout])
      .then((ranking) => {
        if (active) setPlayers(ranking);
      })
      .catch(() => {
        if (active) setMessage("No pudimos cargar la clasificación en este momento.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const podium = players.slice(0, 3);
  const remainingPlayers = players.slice(3);

  return (
    <AppLayout>
      <div className="mx-auto w-full max-w-6xl space-y-6">
        <section className="mesa-panel-gold overflow-hidden rounded-3xl p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-400/15 text-amber-300">
              <Trophy size={26} />
            </span>
            <div>
              <p className="text-xs font-black uppercase tracking-[.24em] text-amber-300">
                Temporada actual
              </p>
              <h1 className="mt-2 text-3xl font-black sm:text-4xl">
                Ranking global
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
                Sube de posición jugando, completando retos y acumulando XP en
                cada Game Night.
              </p>
            </div>
          </div>
        </section>

        {loading ? (
          <section className="mesa-panel flex min-h-72 flex-col items-center justify-center rounded-3xl p-8 text-center">
            <LoaderCircle className="animate-spin text-amber-300" size={32} />
            <p className="mt-4 font-bold">Calculando posiciones...</p>
          </section>
        ) : players.length === 0 ? (
          <section className="mesa-panel flex min-h-72 flex-col items-center justify-center rounded-3xl p-8 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800 text-slate-300">
              <UsersRound size={28} />
            </span>
            <h2 className="mt-5 text-2xl font-black">El ranking está esperando jugadores</h2>
            <p className="mt-2 max-w-md text-sm leading-6 text-slate-400">
              Cuando los jugadores comiencen a ganar XP, sus posiciones
              aparecerán aquí.
            </p>
            {message && (
              <p
                role="status"
                className="mt-5 rounded-xl bg-rose-500/10 px-4 py-3 text-sm text-rose-200"
              >
                {message}
              </p>
            )}
          </section>
        ) : (
          <>
            <section aria-labelledby="podium-title">
              <h2 id="podium-title" className="sr-only">
                Podio
              </h2>
              <div className="grid gap-4 md:grid-cols-3">
                {podium.map((player, index) => {
                  const style = podiumStyles[index];
                  return (
                    <article
                      key={player.uid}
                      className={`mesa-panel rounded-3xl border ${style.border} bg-gradient-to-br ${style.background} p-6 text-center`}
                    >
                      <Crown className={`mx-auto ${style.accent}`} size={28} />
                      <span className="mx-auto mt-4 flex h-16 w-16 items-center justify-center rounded-full border border-white/15 bg-slate-900 text-xl font-black">
                        {initials(player.displayName) || "JM"}
                      </span>
                      <p className={`mt-4 text-xs font-black uppercase tracking-[.2em] ${style.accent}`}>
                        {style.label}
                      </p>
                      <h3 className="mt-2 truncate text-xl font-black">
                        {player.displayName}
                      </h3>
                      <p className="mt-2 text-lg font-bold text-white">
                        {player.xp.toLocaleString()} XP
                      </p>
                    </article>
                  );
                })}
              </div>
            </section>

            {remainingPlayers.length > 0 && (
              <section className="mesa-panel overflow-hidden rounded-3xl">
                <div className="flex items-center gap-3 border-b border-slate-700/70 px-5 py-4 sm:px-6">
                  <Medal className="text-violet-300" size={21} />
                  <h2 className="font-black">Clasificación general</h2>
                </div>
                <ol className="divide-y divide-slate-800">
                  {remainingPlayers.map((player, index) => (
                    <li
                      key={player.uid}
                      className="flex items-center gap-4 px-5 py-4 sm:px-6"
                    >
                      <span className="w-8 text-center text-sm font-black text-slate-400">
                        {index + 4}
                      </span>
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-500/15 text-sm font-black text-violet-200">
                        {initials(player.displayName) || "JM"}
                      </span>
                      <span className="min-w-0 flex-1 truncate font-bold">
                        {player.displayName}
                      </span>
                      <span className="shrink-0 font-black text-amber-300">
                        {player.xp.toLocaleString()} XP
                      </span>
                    </li>
                  ))}
                </ol>
              </section>
            )}
          </>
        )}
      </div>
    </AppLayout>
  );
}
