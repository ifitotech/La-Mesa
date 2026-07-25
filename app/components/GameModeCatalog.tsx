"use client";

import { ArrowRight, Users } from "lucide-react";
import { useRouter } from "next/navigation";

import { gameCatalog } from "@/lib/game-catalog";
import { useCountry } from "@/contexts/CountryContext";

type Props = { mode: "game-night" | "online" };

export default function GameModeCatalog({ mode }: Props) {
  const router = useRouter();
  const { country } = useCountry();
  const online = mode === "online";
  const betaGames = new Set(["heads-up", "challenges", "couples", "charades", "memory"]);
  const games = gameCatalog
    .filter((game) => mode === "online" ? game.gameNight : !game.gameNight || game.id === "trivia")
    .sort((a, b) => {
      if (a.id === "trivia") return -1;
      if (b.id === "trivia") return 1;
      const aBeta = mode === "game-night" && betaGames.has(a.id);
      const bBeta = mode === "game-night" && betaGames.has(b.id);
      if (aBeta !== bBeta) return aBeta ? 1 : -1;
      return 0;
    });

  return <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">{games.map((game) => {
    const Icon = game.icon;
    const available = game.status === "available";
    const isBeta = mode === "game-night" && betaGames.has(game.id);
    return <article key={game.id} className="mesa-panel overflow-hidden rounded-xl"><div className={`h-1 bg-gradient-to-r ${game.accent}`} /><div className="p-3"><div className="flex items-start justify-between gap-2"><div className={`rounded-lg bg-gradient-to-br ${game.accent} p-2 text-white`}><Icon size={20} /></div><span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${isBeta ? "bg-amber-400/15 text-amber-200" : available ? "bg-emerald-500/15 text-emerald-300" : "bg-slate-800 text-slate-400"}`}>{isBeta ? "Beta Test" : available ? "Disponible" : "Próximamente"}</span></div><h2 className="mt-3 text-lg font-black">{game.id === "trivia" ? country.triviaName : game.name}</h2><p className="mt-1 line-clamp-2 text-xs leading-4 text-slate-400">{game.description}</p><div className="mt-3 flex items-center justify-between border-t border-slate-700/70 pt-2.5 text-xs text-slate-400"><span className="flex items-center gap-1"><Users size={13} /> {game.minPlayers}-{game.maxPlayers}</span>{available && <button onClick={() => router.push(online ? `/lobby?game=${game.id}` : `/play/${game.id}`)} className="flex items-center gap-1 text-xs font-bold text-white hover:text-violet-300">{online ? "Sala" : "Jugar"} <ArrowRight size={13} /></button>}</div></div></article>;
  })}</section>;
}
