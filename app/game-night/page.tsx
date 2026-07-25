"use client";

import Link from "next/link";
import { House, Maximize, PartyPopper, Plus, Trophy, UsersRound } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

import AppLayout from "@/app/components/AppLayout";
import GameModeCatalog from "@/app/components/GameModeCatalog";
import { useAuthContext } from "@/contexts/AuthContext";
import { GameNightMode, GameNightParticipant, GameNightSession, getGameNightSession, saveGameNightSession } from "@/lib/game-night-session";
import { getPlayer } from "@/services/player";

const modeLabels: Record<GameNightMode, string> = { solo: "Solo", individual: "Con más personas", teams: "Por equipos" };

export default function GameNightPage() {
  const { user } = useAuthContext();
  const [session, setSession] = useState<GameNightSession | null>(null);
  const [mode, setMode] = useState<GameNightMode>("individual");
  const [participants, setParticipants] = useState<GameNightParticipant[]>([]);
  const [name, setName] = useState("");
  const [hydrated, setHydrated] = useState(false);
  const [profileName, setProfileName] = useState("");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const saved = getGameNightSession();
      setSession(saved);
      setMode(saved?.mode ?? "individual");
      setParticipants(saved?.participants ?? []);
      setHydrated(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!user) return;
    void getPlayer(user.uid).then((player) => setProfileName(player?.displayName?.trim() || user.displayName?.trim() || "Jugador"));
  }, [user]);

  function selectMode(nextMode: GameNightMode) {
    setMode(nextMode);
    if (nextMode === "solo") setParticipants([{ id: user?.uid ?? "solo-player", name: profileName || user?.displayName?.trim() || "Jugador", score: 0 }]);
  }

  function addParticipant(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleanName = name.trim();
    if (!cleanName) return;
    const participant = { id: crypto.randomUUID(), name: cleanName, score: 0 };
    setParticipants((current) => mode === "solo" ? [participant] : [...current, participant]);
    setName("");
  }

  function startGameNight() {
    if (!participants.length) return;
    const nextSession: GameNightSession = { mode, participants };
    saveGameNightSession(nextSession);
    setSession(nextSession);
  }

  if (!hydrated) return <AppLayout><div className="mesa-panel mx-auto max-w-3xl rounded-3xl p-10 text-center text-slate-400">Preparando tu Game Night...</div></AppLayout>;

  return <AppLayout><div className="mx-auto max-w-7xl space-y-8">
    <section className="mesa-panel-gold rounded-3xl p-7 md:p-10"><PartyPopper className="text-amber-300" size={36} /><p className="mt-5 text-xs font-bold uppercase tracking-[.25em] text-amber-300">Presencial · Modo anfitrión</p><h1 className="mt-2 text-4xl font-black md:text-5xl">Juegos de Game Night</h1><p className="mt-4 max-w-2xl text-slate-300">La Mesa organiza turnos, puntos y tiempo para que nadie tenga que ser el moderador.</p></section>
    {!session ? <section className="mesa-panel rounded-3xl p-6 md:p-8"><div className="flex items-center gap-3"><UsersRound className="text-violet-300" /><div><p className="text-xs font-bold uppercase tracking-[.2em] text-violet-300">Paso 1</p><h2 className="text-2xl font-black">¿Cómo van a jugar?</h2><p className="mt-1 text-sm text-slate-400">Elige la forma de llevar el marcador de la noche.</p></div></div><div className="mt-6 grid gap-3 md:grid-cols-3"><button onClick={() => selectMode("solo")} className={`rounded-2xl border p-5 text-left transition ${mode === "solo" ? "border-violet-300 bg-violet-500/15" : "border-slate-700 bg-slate-950/50 hover:border-slate-500"}`}><p className="font-black">Voy a jugar solo</p><p className="mt-1 text-sm text-slate-400">Usaremos el nombre de tu perfil y un solo marcador.</p></button><button onClick={() => selectMode("individual")} className={`rounded-2xl border p-5 text-left transition ${mode === "individual" ? "border-violet-300 bg-violet-500/15" : "border-slate-700 bg-slate-950/50 hover:border-slate-500"}`}><p className="font-black">Con más personas</p><p className="mt-1 text-sm text-slate-400">Cada jugador acumula sus propios puntos.</p></button><button onClick={() => selectMode("teams")} className={`rounded-2xl border p-5 text-left transition ${mode === "teams" ? "border-violet-300 bg-violet-500/15" : "border-slate-700 bg-slate-950/50 hover:border-slate-500"}`}><p className="font-black">Por equipos</p><p className="mt-1 text-sm text-slate-400">Cada equipo comparte un marcador.</p></button></div>{mode !== "solo" && <form onSubmit={addParticipant} className="mt-7 flex flex-col gap-3 sm:flex-row"><input value={name} onChange={(event) => setName(event.target.value)} maxLength={24} placeholder={mode === "teams" ? "Nombre del equipo" : "Nombre del jugador"} className="flex-1 rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 outline-none focus:border-violet-400" /><button className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 font-black"><Plus size={18} /> Agregar</button></form>}<div className="mt-4 flex flex-wrap gap-2">{participants.map((participant) => <span key={participant.id} className="rounded-xl border border-slate-700 bg-slate-950/60 px-3 py-2 text-sm font-bold">{participant.name}{mode !== "solo" && <button onClick={() => setParticipants((current) => current.filter((item) => item.id !== participant.id))} className="ml-2 text-slate-500 hover:text-rose-300">×</button>}</span>)}</div><button onClick={startGameNight} disabled={!participants.length} className="mt-7 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 px-6 py-3 font-black disabled:opacity-40"><PartyPopper size={18} /> Empezar Game Night</button></section> : <><section className="mesa-panel rounded-3xl p-6 md:p-7"><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-emerald-300">Game Night activa · {modeLabels[session.mode]}</p><h2 className="mt-1 text-2xl font-black">{session.participants.map((participant) => participant.name).join(" · ")}</h2></div><div className="flex flex-wrap gap-3"><Link href="/host" className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 font-black"><Maximize size={18} /> Pantalla anfitrión</Link><Link href="/scoreboard" className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-3 font-black text-slate-950"><Trophy size={18} /> Ver marcador</Link><button onClick={() => setSession(null)} className="rounded-xl border border-slate-600 px-4 py-3 font-bold hover:bg-slate-800">Cambiar</button></div></div></section><GameModeCatalog mode="game-night" /></>}
    <Link href="/dashboard" className="flex w-fit items-center gap-2 text-sm font-bold text-slate-300 hover:text-white"><House size={17} /> Volver al inicio</Link>
  </div></AppLayout>;
}
