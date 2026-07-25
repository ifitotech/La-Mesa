"use client";

import Link from "next/link";
import { ArrowLeft, Dice5, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";

import AppLayout from "@/app/components/AppLayout";
import { GameNightSession, getGameNightSession, saveGameNightSession } from "@/lib/game-night-session";

const colors = ["bg-red-500", "bg-emerald-500", "bg-amber-400", "bg-blue-500"];

export default function ParchisPage() {
  const [session, setSession] = useState<GameNightSession | null>(null);
  const [recipientId, setRecipientId] = useState("");
  const [roll, setRoll] = useState<number | null>(null);
  const [turn, setTurn] = useState(0);
  const [positions, setPositions] = useState([0, 0, 0, 0]);
  const [winner, setWinner] = useState<string | null>(null);
  useEffect(() => { const timer = window.setTimeout(() => { const saved = getGameNightSession(); setSession(saved); setRecipientId(saved?.participants[0]?.id ?? ""); }, 0); return () => window.clearTimeout(timer); }, []);
  const players = session?.participants.length ? session.participants : [{ id: "solo", name: "Jugador", score: 0 }];
  const active = players[turn % players.length];
  function rollDice() { const value = Math.floor(Math.random() * 6) + 1; const token = turn % 4; setRoll(value); setPositions((current) => current.map((position, index) => index === token ? Math.min(28, position + value) : position)); if (positions[token] + value >= 28) setWinner(active.name); }
  function nextTurn() { setTurn((value) => value + 1); setRoll(null); }
  function awardPoint() { if (!session || !recipientId) return; const next = { ...session, participants: session.participants.map((player) => player.id === recipientId ? { ...player, score: player.score + 1 } : player) }; saveGameNightSession(next); setSession(next); }
  function reset() { setRoll(null); setTurn(0); setPositions([0, 0, 0, 0]); setWinner(null); }
  return <AppLayout lockViewport><div className="mx-auto max-w-3xl space-y-5"><Link href="/games" className="flex w-fit items-center gap-2 text-sm font-bold text-slate-400 hover:text-white"><ArrowLeft size={17} /> Juegos</Link><section className="mesa-panel-gold rounded-3xl p-6 text-center"><p className="text-xs font-black uppercase tracking-[.22em] text-amber-300">Beta Test · Game Night local</p><h1 className="mt-2 text-3xl font-black">Parchís</h1><p className="mt-3 text-slate-300">Tira el dado, avanza tu ficha y lleva los puntos de la noche.</p></section><section className="mesa-panel rounded-3xl p-5 text-center"><div className="mx-auto grid aspect-square max-w-md grid-cols-4 gap-2 rounded-3xl border-8 border-[#5c3517] bg-[#e6dfca] p-3 shadow-xl">{positions.map((position, index) => <div key={index} className={`relative rounded-2xl ${colors[index]} p-2 text-left text-xs font-black text-white`}><span>{players[index]?.name ?? `Ficha ${index + 1}`}</span><span className="absolute bottom-3 left-1/2 h-9 w-9 -translate-x-1/2 rounded-full border-4 border-white bg-white/40" /><span className="absolute bottom-2 right-2 rounded-lg bg-black/25 px-2 py-1">{position}/28</span></div>)}</div>{winner ? <div className="mt-5 rounded-2xl bg-amber-400/15 p-4 text-lg font-black text-amber-200">¡{winner} llegó a la meta! 🏆</div> : <><p className="mt-5 text-lg font-black">Turno de {active.name}</p><p className="mt-1 text-sm text-slate-400">{roll ? `Sacaste ${roll}. Avanza y pasa el turno.` : "Tira el dado para comenzar."}</p></>}{session && session.participants.length > 1 && <label className="mx-auto mt-5 block max-w-sm text-left"><span className="text-sm font-black text-amber-200">Punto para</span><select value={recipientId} onChange={(event) => setRecipientId(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-600 bg-slate-950 p-3">{session.participants.map((player) => <option key={player.id} value={player.id}>{player.name} · {player.score} pts</option>)}</select></label>}<div className="mt-6 flex flex-wrap justify-center gap-3"><button onClick={rollDice} disabled={roll !== null || winner !== null} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 px-5 py-3 font-black text-slate-950 disabled:opacity-40"><Dice5 size={19} /> Tirar dado</button>{roll && !winner && <><button onClick={() => { awardPoint(); nextTurn(); }} className="rounded-xl bg-emerald-600 px-5 py-3 font-black">+ Punto y siguiente</button><button onClick={nextTurn} className="rounded-xl border border-slate-600 px-5 py-3 font-black">Pasar turno</button></>}<button onClick={reset} className="inline-flex items-center gap-2 rounded-xl border border-slate-600 px-4 py-3 font-bold"><RotateCcw size={17} /> Nueva ronda</button></div></section></div></AppLayout>;
}
