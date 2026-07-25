"use client";

import { Plus, Trophy } from "lucide-react";
import { useState } from "react";

import { GameNightSession, getGameNightSession, saveGameNightSession } from "@/lib/game-night-session";

export default function GameNightPointControl() {
  const [session, setSession] = useState<GameNightSession | null>(getGameNightSession);
  const [selectedId, setSelectedId] = useState(session?.participants[0]?.id ?? "");

  const activeSession = session;
  if (!activeSession?.participants.length) return null;

  function addPoint() {
    const currentSession = session;
    if (!currentSession || !selectedId) return;
    const nextSession: GameNightSession = {
      mode: currentSession.mode ?? "individual",
      participants: currentSession.participants.map((participant) => participant.id === selectedId ? { ...participant, score: participant.score + 1 } : participant),
    };
    saveGameNightSession(nextSession);
    setSession(nextSession);
  }

  return <aside className="fixed bottom-4 right-4 z-50 w-[min(360px,calc(100vw-2rem))] rounded-2xl border border-amber-300/35 bg-slate-950/95 p-4 shadow-2xl backdrop-blur"><div className="flex items-center gap-2"><Trophy size={18} className="text-amber-300" /><div><p className="text-sm font-black">Punto de Game Night</p><p className="text-xs text-slate-400">Elige quién ganó este punto.</p></div></div><div className="mt-3 flex gap-2"><select value={selectedId} onChange={(event) => setSelectedId(event.target.value)} className="min-w-0 flex-1 rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm font-bold outline-none focus:border-amber-300">{activeSession.participants.map((participant) => <option key={participant.id} value={participant.id}>{participant.name} · {participant.score} pts</option>)}</select><button onClick={addPoint} className="inline-flex items-center gap-1 rounded-xl bg-amber-500 px-4 py-2 text-sm font-black text-slate-950 hover:bg-amber-400"><Plus size={17} /> Punto</button></div></aside>;
}
