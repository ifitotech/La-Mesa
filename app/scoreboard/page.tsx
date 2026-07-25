"use client";

import { Plus, RotateCcw, Trophy, UserPlus, X } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

import AppLayout from "@/app/components/AppLayout";
import { GameNightMode, getGameNightSession, saveGameNightSession } from "@/lib/game-night-session";

type ScorePlayer = { id: string; name: string; score: number };

const modeLabels: Record<GameNightMode, string> = { solo: "Solo", individual: "Con más personas", teams: "Por equipos" };

export default function ScoreboardPage() {
  const [players, setPlayers] = useState<ScorePlayer[]>([]);
  const [mode, setMode] = useState<GameNightMode>("individual");
  const [name, setName] = useState("");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const session = getGameNightSession();
      setPlayers(session?.participants ?? []);
      setMode(session?.mode ?? "individual");
      setHydrated(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveGameNightSession({ mode, participants: players, triviaSeconds: getGameNightSession()?.triviaSeconds });
  }, [hydrated, mode, players]);

  const ranking = [...players].sort((a, b) => b.score - a.score);

  function addPlayer(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleanName = name.trim();
    if (!cleanName || mode === "solo") return;
    setPlayers((current) => [...current, { id: crypto.randomUUID(), name: cleanName, score: 0 }]);
    setName("");
  }

  function changeScore(id: string, amount: number) {
    setPlayers((current) => current.map((player) => player.id === id ? { ...player, score: player.score + amount } : player));
  }

  return <AppLayout><div className="mx-auto max-w-3xl space-y-6">
    <section className="mesa-panel-gold rounded-3xl p-6 text-center md:p-8"><Trophy className="mx-auto text-amber-300" size={38} /><p className="mt-4 text-xs font-bold uppercase tracking-[.24em] text-cyan-300">El anfitrión de la noche · {modeLabels[mode]}</p><h1 className="mt-2 text-3xl font-black">Marcador de Game Night</h1><p className="mx-auto mt-3 max-w-xl text-slate-300">Los puntos se mantienen al cambiar de juego durante esta reunión.</p></section>
    {mode !== "solo" && <section className="mesa-panel rounded-3xl p-5 md:p-7"><form onSubmit={addPlayer} className="flex flex-col gap-3 sm:flex-row"><label className="flex flex-1 items-center gap-3 rounded-xl border border-slate-700 bg-slate-950/60 px-4"><UserPlus size={18} className="text-cyan-300" /><input value={name} onChange={(event) => setName(event.target.value)} maxLength={24} placeholder={mode === "teams" ? "Nombre del equipo" : "Nombre del jugador"} className="w-full bg-transparent py-3 outline-none" /></label><button className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 px-5 py-3 font-black"><Plus size={18} /> Agregar</button></form></section>}
    <section className="mesa-panel rounded-3xl p-5 md:p-7">{ranking.length ? <div className="space-y-3">{ranking.map((player, index) => <div key={player.id} className={`flex items-center gap-3 rounded-2xl border p-4 ${index === 0 ? "border-amber-300/40 bg-amber-400/10" : "border-slate-700/70 bg-slate-950/45"}`}><span className="w-7 text-center font-black text-slate-400">#{index + 1}</span><p className="min-w-0 flex-1 truncate text-lg font-black">{player.name}</p><div className="flex items-center gap-2"><button onClick={() => changeScore(player.id, -1)} className="rounded-lg border border-slate-600 px-3 py-2 font-black hover:bg-slate-800">−</button><span className="w-12 text-center text-xl font-black text-amber-200">{player.score}</span><button onClick={() => changeScore(player.id, 1)} className="rounded-lg bg-cyan-600 px-3 py-2 font-black hover:bg-cyan-500">+</button>{mode !== "solo" && <button onClick={() => setPlayers((current) => current.filter((item) => item.id !== player.id))} aria-label={`Eliminar a ${player.name}`} className="rounded-lg p-2 text-slate-500 hover:bg-rose-500/15 hover:text-rose-300"><X size={18} /></button>}</div></div>)}</div> : <p className="py-10 text-center text-slate-400">Agrega los jugadores para comenzar a llevar el marcador.</p>}<div className="mt-6 flex justify-end"><button onClick={() => setPlayers((current) => current.map((player) => ({ ...player, score: 0 })))} disabled={!players.length} className="inline-flex items-center gap-2 rounded-xl border border-slate-600 px-4 py-2 text-sm font-bold disabled:opacity-40 hover:bg-slate-800"><RotateCcw size={16} /> Reiniciar puntos</button></div></section>
  </div></AppLayout>;
}
