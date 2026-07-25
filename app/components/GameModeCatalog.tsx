"use client";

import { ArrowRight, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useAuthContext } from "@/contexts/AuthContext";
import { useCountry } from "@/contexts/CountryContext";
import { gameCatalog, type GameId } from "@/lib/game-catalog";
import { createRoom } from "@/services/rooms";

type Props = { mode: "game-night" | "online" };

export default function GameModeCatalog({ mode }: Props) {
  const router = useRouter();
  const { country } = useCountry();
  const { user } = useAuthContext();
  const [creatingGame, setCreatingGame] = useState<GameId | null>(null);
  const online = mode === "online";
  const betaGames = new Set(["heads-up", "challenges", "couples", "charades", "memory"]);
  const games = gameCatalog
    .filter((game) => online ? game.gameNight : !game.gameNight || game.id === "trivia")
    .sort((a, b) => {
      if (a.id === "trivia") return -1;
      if (b.id === "trivia") return 1;
      const aBeta = mode === "game-night" && betaGames.has(a.id);
      const bBeta = mode === "game-night" && betaGames.has(b.id);
      if (aBeta !== bBeta) return aBeta ? 1 : -1;
      return 0;
    });

  async function playOnline(gameId: GameId) {
    if (!user) {
      router.push("/auth/login?next=/online");
      return;
    }

    try {
      setCreatingGame(gameId);
      const roomId = await createRoom(user.uid, gameId);
      router.push(`/lobby/${roomId}`);
    } catch (error) {
      console.error("No se pudo crear la partida online", error);
      window.alert("No se pudo crear la partida. Revisa Firebase e inténtalo otra vez.");
    } finally {
      setCreatingGame(null);
    }
  }

  return <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">{games.map((game) => {
    const Icon = game.icon;
    const available = game.status === "available";
    const isBeta = mode === "game-night" && betaGames.has(game.id);
    const isCreating = creatingGame === game.id;
    return <article key={game.id} className="mesa-panel overflow-hidden rounded-xl"><div className={`h-1 bg-gradient-to-r ${game.accent}`} /><div className="p-3"><div className="flex items-start justify-between gap-2"><div className={`rounded-lg bg-gradient-to-br ${game.accent} p-2 text-white`}><Icon size={20} /></div><span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${isBeta ? "bg-amber-400/15 text-amber-200" : available ? "bg-emerald-500/15 text-emerald-300" : "bg-slate-800 text-slate-400"}`}>{isBeta ? "Beta Test" : available ? "Disponible" : "Próximamente"}</span></div><h2 className="mt-3 text-lg font-black">{game.id === "trivia" ? country.triviaName : game.name}</h2><p className="mt-1 line-clamp-2 text-xs leading-4 text-slate-400">{game.description}</p><div className="mt-3 flex items-center justify-between border-t border-slate-700/70 pt-2.5 text-xs text-slate-400"><span className="flex items-center gap-1"><Users size={13} /> {game.minPlayers}-{game.maxPlayers}</span>{available && <button onClick={() => online ? void playOnline(game.id) : router.push(`/play/${game.id}`)} disabled={creatingGame !== null} className="flex items-center gap-1 text-xs font-bold text-white hover:text-violet-300 disabled:cursor-wait disabled:opacity-50">{online && isCreating ? "Creando..." : online ? "Jugar ahora" : "Jugar"} <ArrowRight size={13} /></button>}</div></div></article>;
  })}</section>;
}
