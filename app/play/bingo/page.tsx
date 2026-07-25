"use client";

import Link from "next/link";
import { ArrowLeft, CircleDot, RotateCcw, UserRound, Volume2 } from "lucide-react";
import { useEffect, useState } from "react";

import AppLayout from "@/app/components/AppLayout";
import { BingoCard, createBingoCard, hasBingo } from "@/lib/bingo";

const columns = ["B", "I", "N", "G", "O"];

export default function BingoPage() {
  const [card, setCard] = useState<BingoCard | null>(null);
  const [called, setCalled] = useState<number[]>([]);
  const [marked, setMarked] = useState<Set<number>>(() => new Set([12]));
  const [winner, setWinner] = useState(false);
  const [mode, setMode] = useState<"host" | "player" | "both">("host");

  const lastNumber = called.at(-1);

  useEffect(() => {
    const timer = window.setTimeout(() => setCard(createBingoCard()), 0);
    return () => window.clearTimeout(timer);
  }, []);

  function callNumber() {
    const available = Array.from({ length: 75 }, (_, index) => index + 1).filter((number) => !called.includes(number));
    if (!available.length) return;
    const number = available[Math.floor(Math.random() * available.length)];
    setCalled((values) => [...values, number]);
  }

  function mark(position: number) {
    if (!card) return;
    const value = card.flat()[position];
    if (value !== 0 && !called.includes(value)) return;
    setMarked((previous) => {
      const next = new Set(previous);
      if (next.has(position) && position !== 12) next.delete(position);
      else next.add(position);
      if (hasBingo(next)) setWinner(true);
      return next;
    });
  }

  function reset() {
    setCard(createBingoCard());
    setCalled([]);
    setMarked(new Set([12]));
    setWinner(false);
  }

  function newPlayerCard() {
    setCard(createBingoCard());
    setMarked(new Set([12]));
    setWinner(false);
  }

  if (!card) return <AppLayout lockViewport><div className="mesa-panel mx-auto max-w-4xl rounded-3xl p-10 text-center text-slate-400">Preparando tu tarjeta de Bingo...</div></AppLayout>;

  return <AppLayout lockViewport><div className="mx-auto max-w-4xl space-y-5">
    <Link href="/games" className="flex w-fit items-center gap-2 text-sm font-bold text-slate-400 hover:text-white"><ArrowLeft size={17} /> Juegos</Link>
    <section className="mesa-panel-gold rounded-3xl p-6 text-center"><p className="text-xs font-bold uppercase tracking-[.24em] text-emerald-300">Game Night presencial · Sin internet</p><h1 className="mt-2 flex justify-center gap-3 text-3xl font-black"><CircleDot className="text-emerald-300" /> Bingo</h1><p className="mt-3 text-slate-300">Una persona canta los números y cada jugador puede usar su propio dispositivo o una tarjeta diferente.</p></section>
    <div className="flex flex-wrap justify-center gap-3"><button onClick={() => setMode("host")} className={`rounded-xl px-5 py-3 font-black ${mode === "host" ? "bg-emerald-600 text-white" : "border border-slate-600 text-slate-300"}`}><Volume2 className="mr-2 inline" size={18} /> Anfitrión</button><button onClick={() => setMode("player")} className={`rounded-xl px-5 py-3 font-black ${mode === "player" ? "bg-violet-600 text-white" : "border border-slate-600 text-slate-300"}`}><UserRound className="mr-2 inline" size={18} /> Jugador</button><button onClick={() => setMode("both")} className={`rounded-xl px-5 py-3 font-black ${mode === "both" ? "bg-amber-500 text-slate-950" : "border border-slate-600 text-slate-300"}`}>Ambos</button></div>
    <div className={`grid gap-5 ${mode === "both" ? "lg:grid-cols-[1fr_300px]" : mode === "player" ? "grid-cols-1" : "mx-auto max-w-md grid-cols-1"}`}>
      <section className={`mesa-panel rounded-3xl p-5 md:p-7 ${mode === "host" ? "hidden" : ""}`}><div className="grid grid-cols-5 overflow-hidden rounded-2xl border border-slate-600">{columns.map((column) => <div key={column} className="bg-emerald-600/85 py-3 text-center text-xl font-black">{column}</div>)}{card.flat().map((number, index) => <button key={`${number}-${index}`} onClick={() => mark(index)} className={`aspect-square border border-slate-700/70 text-lg font-black transition md:text-2xl ${marked.has(index) ? "bg-emerald-400 text-slate-950" : "bg-slate-950/60 hover:bg-slate-800"}`}>{number === 0 ? "★" : number}</button>)}</div><p className="mt-4 text-center text-sm text-slate-400">Marca solo los números que hayan salido. El centro es libre.</p><button onClick={newPlayerCard} className="mx-auto mt-5 inline-flex items-center gap-2 rounded-xl border border-slate-600 px-4 py-2 font-bold hover:bg-slate-800"><RotateCcw size={17} /> Nueva tarjeta</button>{winner && <div className="mt-5 rounded-2xl bg-amber-400/15 p-4 font-black text-amber-200">¡BINGO! 🎉</div>}</section>
      <aside className={`mesa-panel rounded-3xl p-6 text-center ${mode === "player" ? "hidden" : ""}`}><p className="text-xs font-bold uppercase tracking-[.2em] text-slate-400">Último número</p><p className="mt-4 text-7xl font-black text-amber-200">{lastNumber ?? "–"}</p><p className="mt-3 text-sm text-slate-400">{called.length}/75 llamados</p><button onClick={callNumber} disabled={called.length >= 75} className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-3 font-black disabled:opacity-50"><Volume2 size={18} /> Sacar número</button><button onClick={reset} className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-600 px-4 py-3 font-bold text-slate-200 hover:bg-slate-800"><RotateCcw size={17} /> Nueva ronda</button><div className="mt-5 border-t border-slate-700 pt-4 text-left"><p className="text-xs font-bold uppercase tracking-[.16em] text-slate-400">Números llamados</p><p className="mt-2 max-h-32 overflow-y-auto text-sm text-slate-300">{called.length ? called.join(" · ") : "Aún no ha salido ningún número."}</p></div></aside>
    </div>
  </div></AppLayout>;
}
