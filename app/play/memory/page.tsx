"use client";

import Link from "next/link";
import { ArrowLeft, RotateCcw, Trophy } from "lucide-react";
import { useEffect, useState } from "react";

import AppLayout from "@/app/components/AppLayout";
import { useCountry } from "@/contexts/CountryContext";

type Card = { id: string; value: string; matched: boolean };

const baseSymbols = ["🎲", "🎵", "⚽", "🎨", "🍿", "🎤", "🎭", "🏆"];
const localSymbols: Record<string, string[]> = {
  CU: ["🌴", "🎺"], PR: ["🐸", "🏝️"], DO: ["🥭", "💃"], MX: ["🌮", "🎸"],
  CO: ["☕", "🦜"], VE: ["🫓", "🌅"], US: ["🗽", "🎬"], ES: ["🥘", "🪭"],
};

function createDeck(country: string): Card[] {
  const symbols = [...baseSymbols.slice(0, 6), ...(localSymbols[country] ?? baseSymbols.slice(6, 8))];
  return [...symbols, ...symbols]
    .map((value, index) => ({ id: `${value}-${index}`, value, matched: false }))
    .sort(() => Math.random() - 0.5);
}

export default function MemoryPage() {
  const { country } = useCountry();
  const [deck, setDeck] = useState<Card[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [locked, setLocked] = useState(false);

  const finished = deck.length > 0 && deck.every((card) => card.matched);

  useEffect(() => {
    const timer = window.setTimeout(() => setDeck(createDeck(country.code)), 0);
    return () => window.clearTimeout(timer);
  }, [country.code]);

  function reset() {
    setDeck(createDeck(country.code));
    setSelected([]);
    setMoves(0);
    setLocked(false);
  }

  function reveal(index: number) {
    if (locked || selected.includes(index) || deck[index].matched) return;
    const next = [...selected, index];
    setSelected(next);
    if (next.length !== 2) return;

    setMoves((value) => value + 1);
    const [first, second] = next;
    if (deck[first].value === deck[second].value) {
      setDeck((cards) => cards.map((card, cardIndex) => next.includes(cardIndex) ? { ...card, matched: true } : card));
      setSelected([]);
      return;
    }

    setLocked(true);
    window.setTimeout(() => {
      setSelected([]);
      setLocked(false);
    }, 850);
  }

  if (!deck.length) return <AppLayout lockViewport><div className="mesa-panel mx-auto max-w-3xl rounded-3xl p-10 text-center text-slate-400">Preparando las cartas...</div></AppLayout>;

  return <AppLayout lockViewport><div className="mx-auto max-w-3xl space-y-5">
    <Link href="/games" className="flex w-fit items-center gap-2 text-sm font-bold text-slate-400 hover:text-white"><ArrowLeft size={17} /> Juegos</Link>
    <section className="mesa-panel-gold rounded-3xl p-6 text-center"><p className="text-xs font-bold uppercase tracking-[.24em] text-sky-300">Solo o por turnos · {country.flag} {country.name}</p><h1 className="mt-2 text-3xl font-black">Memoria</h1><p className="mt-3 text-slate-300">Destapa dos cartas y encuentra sus parejas. En grupo, pueden alternar el dispositivo en cada turno.</p></section>
    <section className="mesa-premium-surface rounded-[2rem] p-5 md:p-7"><div className="mb-5 flex items-center justify-between"><p className="font-bold text-amber-100">{moves} movimientos</p><button onClick={reset} className="inline-flex items-center gap-2 rounded-xl border border-amber-200/25 bg-black/20 px-4 py-2 text-sm font-bold hover:border-amber-200/60"><RotateCcw size={16} /> Reiniciar</button></div><div className="grid grid-cols-4 gap-2.5 sm:gap-3">{deck.map((card, index) => { const visible = card.matched || selected.includes(index); return <button key={card.id} onClick={() => reveal(index)} aria-label={visible ? `Carta ${card.value}` : "Carta oculta"} className={`relative aspect-[.76] overflow-hidden rounded-xl border text-3xl shadow-xl transition duration-300 sm:rounded-2xl md:text-4xl ${visible ? "border-amber-200/55 bg-gradient-to-br from-[#fff9e8] to-[#dfc889] text-slate-950 shadow-amber-950/30" : "border-amber-200/25 bg-[radial-gradient(circle_at_center,#1e6547,#0b2b1f_70%)] text-amber-200 hover:-translate-y-1 hover:border-amber-200/60"}`}><span className={`absolute inset-1 rounded-lg border ${visible ? "border-amber-800/15" : "border-amber-200/15"}`} />{visible ? <span className="relative drop-shadow-sm">{card.value}</span> : <span className="relative flex h-full items-center justify-center font-serif text-2xl text-amber-200/80">LM</span>}</button>; })}</div>{finished && <div className="mt-6 flex items-center justify-center gap-2 rounded-2xl border border-amber-200/30 bg-amber-300/15 p-4 font-black text-amber-100"><Trophy size={20} /> ¡Completaste la ronda en {moves} movimientos!</div>}</section>
  </div></AppLayout>;
}
