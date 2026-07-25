"use client";

import { ArrowRight, Users } from "lucide-react";
import { useRouter } from "next/navigation";

import AppLayout from "@/app/components/AppLayout";
import GameArtwork from "@/app/components/GameArtwork";
import { useCountry } from "@/contexts/CountryContext";
import { gameCatalog, isGameEnabledForCountry } from "@/lib/game-catalog";

export default function GamesPage() {
  const router = useRouter(); const { country } = useCountry();
  const games = gameCatalog.filter((game) => isGameEnabledForCountry(game.id, country.code));
  return <AppLayout><div className="mx-auto max-w-6xl space-y-7"><section className="mesa-panel-gold rounded-3xl p-6 md:p-8"><p className="text-xs font-bold uppercase tracking-[.25em] text-blue-300">Elige tu experiencia</p><h1 className="mt-2 text-4xl font-black md:text-5xl">Juegos para toda la mesa</h1><p className="mt-3 max-w-2xl text-slate-300">Cada juego tiene su propia dinámica, imagen y descripción. Puedes jugar solo, con quienes están contigo o crear una partida online.</p></section><section className="grid gap-4 lg:grid-cols-2">{games.map((game) => { const playable = game.status !== "coming-soon"; const isBeta = game.status === "beta"; return <article key={game.id} className="mesa-panel group flex overflow-hidden rounded-2xl transition hover:border-blue-300/50"><GameArtwork gameId={game.id} /><div className="min-w-0 flex-1 p-4"><div className="flex items-start justify-between gap-2"><div><h2 className="text-xl font-black">{game.id === "trivia" ? country.triviaName : game.name}</h2><p className="mt-1 text-sm leading-5 text-slate-400">{game.description}</p></div><span className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-bold ${isBeta ? "bg-amber-400/15 text-amber-200" : playable ? "bg-emerald-500/15 text-emerald-300" : "bg-slate-800 text-slate-400"}`}>{isBeta ? "Beta Test" : playable ? "Disponible" : "Próximamente"}</span></div><div className="mt-4 flex items-center justify-between border-t border-slate-700/70 pt-3"><span className="flex items-center gap-1 text-xs text-slate-400"><Users size={13} /> {game.minPlayers}-{game.maxPlayers} jugadores</span>{playable && <button onClick={() => router.push(`/play/${game.id}`)} className="inline-flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-xs font-black text-white hover:bg-blue-500">Jugar ahora <ArrowRight size={13} /></button>}</div></div></article>; })}</section></div></AppLayout>;
}
