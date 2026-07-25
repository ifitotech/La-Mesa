"use client";

import Link from "next/link";
import { ArrowLeft, Maximize, Pause, Play, RotateCcw, Timer, Trophy } from "lucide-react";
import { useEffect, useState } from "react";

import AppLayout from "@/app/components/AppLayout";
import { GameNightSession, getGameNightSession, saveGameNightSession } from "@/lib/game-night-session";

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

export default function HostScreenPage() {
  const [session, setSession] = useState<GameNightSession | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setSession(getGameNightSession());
      setHydrated(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!running) return;
    const interval = window.setInterval(() => setElapsedSeconds((value) => value + 1), 1000);
    return () => window.clearInterval(interval);
  }, [running]);

  function changeScore(id: string, amount: number) {
    if (!session) return;
    const nextSession = {
      ...session,
      participants: session.participants.map((participant) => participant.id === id ? { ...participant, score: participant.score + amount } : participant),
    };
    saveGameNightSession(nextSession);
    setSession(nextSession);
  }

  const ranking = [...(session?.participants ?? [])].sort((first, second) => second.score - first.score);

  if (!hydrated) return <AppLayout><div className="mesa-panel mx-auto max-w-3xl rounded-3xl p-10 text-center text-slate-400">Preparando la pantalla del anfitrión...</div></AppLayout>;
  if (!session) return <AppLayout><div className="mesa-panel mx-auto max-w-3xl rounded-3xl p-10 text-center"><Trophy className="mx-auto text-amber-300" size={40} /><h1 className="mt-4 text-3xl font-black">Aún no hay una Game Night activa</h1><p className="mt-3 text-slate-400">Crea tu Mesa primero para usar la pantalla compartida.</p><Link href="/game-night" className="mt-6 inline-flex rounded-xl bg-violet-600 px-5 py-3 font-black">Crear Game Night</Link></div></AppLayout>;

  return <AppLayout lockViewport><div className="mx-auto flex min-h-full max-w-6xl flex-col gap-5 pb-3">
    <header className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-blue-200/20 bg-[#071a38] px-5 py-4">
      <Link href="/game-night" className="inline-flex items-center gap-2 text-sm font-bold text-slate-300 hover:text-white"><ArrowLeft size={18} /> Controles</Link>
      <div className="text-center"><p className="text-xs font-black uppercase tracking-[.3em] text-blue-300">La Mesa · Modo Anfitrión</p><p className="mt-1 text-lg font-black">Pantalla compartida</p></div>
      <button onClick={() => void document.documentElement.requestFullscreen?.()} className="inline-flex items-center gap-2 rounded-xl border border-blue-300/30 bg-blue-500/15 px-4 py-2 font-bold text-blue-100 hover:bg-blue-500/25"><Maximize size={18} /> Pantalla completa</button>
    </header>
    <section className="grid gap-5 lg:grid-cols-[.8fr_1.2fr]">
      <div className="rounded-3xl border border-amber-300/25 bg-[radial-gradient(circle_at_top,#432e0b,#12100b_65%)] p-6 text-center shadow-2xl shadow-amber-950/25 md:p-9"><Timer className="mx-auto text-amber-300" size={38} /><p className="mt-4 text-xs font-black uppercase tracking-[.28em] text-amber-200">Tiempo de la noche</p><p className="mt-3 font-mono text-6xl font-black tracking-tight text-white md:text-8xl">{formatTime(elapsedSeconds)}</p><div className="mt-7 flex justify-center gap-3"><button onClick={() => setRunning((value) => !value)} className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-5 py-3 font-black text-slate-950">{running ? <Pause size={18} /> : <Play size={18} />}{running ? "Pausar" : "Iniciar"}</button><button onClick={() => { setRunning(false); setElapsedSeconds(0); }} className="rounded-xl border border-amber-200/30 px-4 py-3 text-amber-100 hover:bg-amber-100/10"><RotateCcw size={18} /></button></div></div>
      <div className="mesa-panel rounded-3xl p-5 md:p-7"><div className="flex items-center justify-between"><div><p className="text-xs font-black uppercase tracking-[.24em] text-emerald-300">Ranking en vivo</p><h1 className="mt-1 text-3xl font-black md:text-4xl">¿Quién va ganando?</h1></div><Trophy className="text-amber-300" size={38} /></div><div className="mt-6 space-y-3">{ranking.map((participant, index) => <div key={participant.id} className={`flex items-center gap-3 rounded-2xl border p-4 md:p-5 ${index === 0 ? "border-amber-300/40 bg-amber-400/10" : "border-slate-700/70 bg-slate-950/50"}`}><span className="w-9 text-center text-xl font-black text-slate-400">#{index + 1}</span><p className="min-w-0 flex-1 truncate text-xl font-black md:text-2xl">{participant.name}</p><button onClick={() => changeScore(participant.id, -1)} className="rounded-xl border border-slate-600 px-3 py-2 text-lg font-black hover:bg-slate-800">−</button><span className="w-14 text-center text-3xl font-black text-amber-200">{participant.score}</span><button onClick={() => changeScore(participant.id, 1)} className="rounded-xl bg-emerald-600 px-3 py-2 text-lg font-black hover:bg-emerald-500">+</button></div>)}</div></div>
    </section>
    <p className="text-center text-sm text-slate-400">Conecta esta pantalla a una TV o proyector para que todos sigan el marcador.</p>
  </div></AppLayout>;
}
