"use client";

import Link from "next/link";
import { House, PartyPopper, Plus, Trophy, UsersRound } from "lucide-react";
import { FormEvent, useState } from "react";

import AppLayout from "@/app/components/AppLayout";
import GameModeCatalog from "@/app/components/GameModeCatalog";
import { GameNightMode, GameNightParticipant, GameNightSession, getGameNightSession, saveGameNightSession } from "@/lib/game-night-session";

export default function GameNightPage() {
  const [session, setSession] = useState<GameNightSession | null>(getGameNightSession);
  const [mode, setMode] = useState<GameNightMode>(session?.mode ?? "individual");
  const [participants, setParticipants] = useState<GameNightParticipant[]>(session?.participants ?? []);
  const [triviaSeconds, setTriviaSeconds] = useState(session?.triviaSeconds ?? 15);
  const [name, setName] = useState("");

  function addParticipant(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleanName = name.trim();
    if (!cleanName) return;
    setParticipants((current) => [...current, { id: crypto.randomUUID(), name: cleanName, score: 0 }]);
    setName("");
  }

  function startGameNight() {
    if (!participants.length) return;
    const nextSession = { mode, participants, triviaSeconds };
    saveGameNightSession(nextSession);
    setSession(nextSession);
  }

  function changeSetup() {
    setSession(null);
  }

  return <AppLayout><div className="mx-auto max-w-7xl space-y-8">
    <section className="mesa-panel-gold rounded-3xl p-7 md:p-10"><PartyPopper className="text-amber-300" size={36} /><p className="mt-5 text-xs font-bold uppercase tracking-[.25em] text-amber-300">Presencial · Sin conexión</p><h1 className="mt-2 text-4xl font-black md:text-5xl">Juegos de Game Night</h1><p className="mt-4 max-w-2xl text-slate-300">Organiza la reunión primero; después cambia de juego sin perder el marcador de la noche.</p></section>
    {!session ? <section className="mesa-panel rounded-3xl p-6 md:p-8"><div className="flex items-center gap-3"><UsersRound className="text-violet-300" /><div><p className="text-xs font-bold uppercase tracking-[.2em] text-violet-300">Paso 1</p><h2 className="text-2xl font-black">¿Cómo quieren jugar?</h2></div></div><div className="mt-6 grid gap-3 sm:grid-cols-2"><button onClick={() => setMode("individual")} className={`rounded-2xl border p-5 text-left ${mode === "individual" ? "border-violet-300 bg-violet-500/15" : "border-slate-700 bg-slate-950/50"}`}><p className="font-black">Personal</p><p className="mt-1 text-sm text-slate-400">Cada persona suma sus propios puntos.</p></button><button onClick={() => setMode("teams")} className={`rounded-2xl border p-5 text-left ${mode === "teams" ? "border-violet-300 bg-violet-500/15" : "border-slate-700 bg-slate-950/50"}`}><p className="font-black">Por equipos</p><p className="mt-1 text-sm text-slate-400">Cada equipo comparte un marcador.</p></button></div><label className="mt-6 block text-sm font-bold text-slate-300">Tiempo por pregunta de Trivia<select value={triviaSeconds} onChange={(event) => setTriviaSeconds(Number(event.target.value))} className="mt-2 block rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 font-black outline-none focus:border-violet-400"><option value={10}>10 segundos</option><option value={15}>15 segundos</option><option value={20}>20 segundos</option><option value={30}>30 segundos</option></select></label><form onSubmit={addParticipant} className="mt-7 flex flex-col gap-3 sm:flex-row"><input value={name} onChange={(event) => setName(event.target.value)} maxLength={24} placeholder={mode === "teams" ? "Nombre del equipo" : "Nombre de la persona"} className="flex-1 rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 outline-none focus:border-violet-400" /><button className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 font-black"><Plus size={18} /> Agregar</button></form><div className="mt-4 flex flex-wrap gap-2">{participants.map((participant) => <span key={participant.id} className="rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm font-bold">{participant.name}<button onClick={() => setParticipants((current) => current.filter((item) => item.id !== participant.id))} className="ml-2 text-slate-500 hover:text-rose-300">×</button></span>)}</div><button onClick={startGameNight} disabled={!participants.length} className="mt-7 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 px-6 py-3 font-black disabled:opacity-40"><PartyPopper size={18} /> Empezar Game Night</button></section> : <><section className="mesa-panel rounded-3xl p-6 md:p-7"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-emerald-300">Game Night activa · {session.mode === "teams" ? "Por equipos" : "Personal"} · Trivia: {session.triviaSeconds ?? 15}s</p><h2 className="mt-1 text-2xl font-black">{session.participants.map((participant) => participant.name).join(" · ")}</h2></div><div className="flex gap-3"><Link href="/scoreboard" className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-3 font-black text-slate-950"><Trophy size={18} /> Ver marcador</Link><button onClick={changeSetup} className="rounded-xl border border-slate-600 px-4 py-3 font-bold hover:bg-slate-800">Cambiar</button></div></div></section><GameModeCatalog mode="game-night" /></>}
    <Link href="/dashboard" className="flex w-fit items-center gap-2 text-sm font-bold text-slate-300 hover:text-white"><House size={17} /> Volver al inicio</Link>
  </div></AppLayout>;
}
