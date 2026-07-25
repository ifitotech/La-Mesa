"use client";

import { ArrowRight, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import GameArtwork from "@/app/components/GameArtwork";
import { useAuthContext } from "@/contexts/AuthContext";
import { useCountry } from "@/contexts/CountryContext";
import { gameCatalog, type GameId } from "@/lib/game-catalog";
import { createRoom } from "@/services/rooms";

type Props = { mode: "game-night" | "online" };

export default function GameModeCatalog({ mode }: Props) {
  const router = useRouter(); const { country } = useCountry(); const { user } = useAuthContext();
  const [creatingGame, setCreatingGame] = useState<GameId | null>(null); const online = mode === "online";
  const betaGames = new Set(["heads-up", "challenges", "couples", "charades", "memory"]);
  const games = gameCatalog.filter((game) => online ? game.gameNight : !game.gameNight || game.id === "trivia").sort((a, b) => { if (a.id === "trivia") return -1; if (b.id === "trivia") return 1; const aBeta = mode === "game-night" && betaGames.has(a.id); const bBeta = mode === "game-night" && betaGames.has(b.id); return aBeta === bBeta ? 0 : aBeta ? 1 : -1; });
  async function playOnline(gameId: GameId) { if (!user) { router.push("/auth/login?next=/online"); return; } try { setCreatingGame(gameId); const roomId = await createRoom(user.uid, gameId); router.push(`/lobby/${roomId}`); } catch (error) { console.error("No se pudo crear la partida online", error); window.alert("No se pudo crear la partida. Revisa Firebase e inténtalo otra vez."); } finally { setCreatingGame(null); } }
  return <section className="grid gap-3 lg:grid-cols-2">{games.map((game) => { const available = game.status === "available"; const isBeta = mode === "game-night" && betaGames.has(game.id); const isCreating = creatingGame === game.id; return <article key={game.id} className="mesa-panel group flex overflow-hidden rounded-2xl transition hover:border-blue-300/50"><GameArtwork gameId={game.id} /><div className="min-w-0 flex-1 p-4"><div className="flex items-start justify-between gap-2"><div><h2 className="text-lg font-black">{game.id === "trivia" ? country.triviaName : game.name}</h2><p className="mt-1 text-sm leading-5 text-slate-400">{game.description}</p></div><span className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-bold ${isBeta ? "bg-amber-400/15 text-amber-200" : available ? "bg-emerald-500/15 text-emerald-300" : "bg-slate-800 text-slate-400"}`}>{isBeta ? "Beta Test" : available ? "Disponible" : "Próximamente"}</span></div><div className="mt-3 flex items-center justify-between border-t border-slate-700/70 pt-3 text-xs text-slate-400"><span className="flex items-center gap-1"><Users size={13} /> {game.minPlayers}-{game.maxPlayers}</span>{available && <button onClick={() => online ? void playOnline(game.id) : router.push(`/play/${game.id}`)} disabled={creatingGame !== null} className="inline-flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-xs font-black text-white transition hover:bg-blue-500 disabled:opacity-50">{online && isCreating ? "Creando..." : online ? "Jugar ahora" : "Jugar"} <ArrowRight size={13} /></button>}</div></div></article>; })}</section>;
}
