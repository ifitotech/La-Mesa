"use client";

import { ArrowLeft, RotateCcw, Trophy, UsersRound } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import AppLayout from "@/app/components/AppLayout";
import { useCountry } from "@/contexts/CountryContext";
import {
  MemoryGame,
  closeMemoryMiss,
  createMemoryGame,
  memoryWinners,
  revealMemoryCard,
} from "@/lib/memory-engine";
import { getGameNightSession } from "@/lib/game-night-session";

const baseSymbols = ["🎲", "🎵", "⚽", "🎨", "🍿", "🎤"];
const localSymbols: Record<string, string[]> = {
  CU: ["🌴", "🎺"], PR: ["🐸", "🏝️"], DO: ["🥭", "💃"], MX: ["🌮", "🎸"],
  CO: ["☕", "🦜"], VE: ["🫓", "🌅"], US: ["🗽", "🎬"], ES: ["🥘", "🪭"],
};

function symbolsFor(country: string) {
  return [...baseSymbols, ...(localSymbols[country] ?? ["🎭", "🏆"])];
}

export default function MemoryPage() {
  const { country } = useCountry();
  const [game, setGame] = useState<MemoryGame | null>(null);
  const [locked, setLocked] = useState(false);

  const createRound = useCallback(() => {
    const session = getGameNightSession();
    const names = session?.participants.map((participant) => participant.name) ?? ["Jugador"];
    setGame(createMemoryGame(symbolsFor(country.code), names));
    setLocked(false);
  }, [country.code]);

  useEffect(() => {
    const timer = window.setTimeout(createRound, 0);
    return () => window.clearTimeout(timer);
  }, [createRound]);

  function reveal(index: number) {
    if (!game || locked) return;
    const next = structuredClone(game);
    const result = revealMemoryCard(next, index);
    if (result === "invalid") return;
    setGame(next);
    if (result !== "miss") return;
    setLocked(true);
    window.setTimeout(() => {
      setGame((current) => {
        if (!current) return current;
        const cleared = structuredClone(current);
        closeMemoryMiss(cleared);
        return cleared;
      });
      setLocked(false);
    }, 850);
  }

  if (!game) return <AppLayout lockViewport><div className="mesa-panel mx-auto max-w-3xl rounded-3xl p-10 text-center text-slate-400">Preparando las cartas...</div></AppLayout>;

  const active = game.players[game.turn];
  const winners = game.finished ? memoryWinners(game) : [];

  return (
    <AppLayout lockViewport>
      <div className="mx-auto max-w-4xl space-y-5">
        <Link href="/games" className="flex w-fit items-center gap-2 text-sm font-bold text-slate-400 hover:text-white"><ArrowLeft size={17} /> Juegos</Link>
        <section className="mesa-panel-gold rounded-3xl p-5 text-center md:p-7">
          <p className="text-xs font-bold uppercase tracking-[.24em] text-amber-300">{country.flag} {country.name} · Turnos reales</p>
          <h1 className="mt-2 text-3xl font-black">Memoria</h1>
          <p className="mt-2 text-slate-300">Encuentra una pareja para sumar un punto y conservar tu turno.</p>
        </section>

        <section className="family-table-scene game-3d-stage rounded-[2rem] p-4 pt-36 md:p-7 md:pt-44">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[.18em] text-amber-200/70"><UsersRound size={15} /> Turno</p>
              <p className="mt-1 text-xl font-black">{game.finished ? "Ronda terminada" : active.name}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {game.players.map((player) => <span key={player.id} className={`rounded-full border px-3 py-2 text-xs font-black ${active.id === player.id && !game.finished ? "border-amber-200/50 bg-amber-300/15 text-amber-100" : "border-white/10 bg-black/20 text-slate-300"}`}>{player.name} · {player.score}</span>)}
              <button onClick={createRound} className="inline-flex items-center gap-2 rounded-xl border border-amber-200/25 bg-black/20 px-3 py-2 text-xs font-bold hover:border-amber-200/60"><RotateCcw size={15} /> Reiniciar</button>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
            {game.cards.map((card, index) => {
              const visible = Boolean(card.matchedBy) || game.selected.includes(index);
              return (
                <button
                  key={card.id}
                  onClick={() => reveal(index)}
                  disabled={Boolean(card.matchedBy) || locked}
                  aria-label={visible ? `Carta ${card.value}` : "Carta oculta"}
                  className={`game-3d-card relative aspect-[.76] overflow-hidden rounded-xl border text-3xl transition duration-300 sm:rounded-2xl md:text-4xl ${visible ? "border-amber-200/55 bg-gradient-to-br from-[#fff9e8] to-[#dfc889] text-slate-950 shadow-amber-950/30" : "border-amber-200/25 bg-[radial-gradient(circle_at_center,#1e6547,#08291c_70%)] text-amber-200 hover:border-amber-200/60"}`}
                >
                  <span className={`absolute inset-1 rounded-lg border ${visible ? "border-amber-800/15" : "border-amber-200/15"}`} />
                  {visible ? <span className="relative drop-shadow-sm">{card.value}</span> : <span className="relative flex h-full items-center justify-center font-serif text-2xl text-amber-200/80">LM</span>}
                </button>
              );
            })}
          </div>

          {game.finished && <div className="mt-6 flex items-center justify-center gap-2 rounded-2xl border border-amber-200/30 bg-amber-300/15 p-4 text-center font-black text-amber-100"><Trophy size={20} /> {winners.length > 1 ? `Empate: ${winners.map((winner) => winner.name).join(" y ")}` : `¡${winners[0].name} ganó con ${winners[0].score} parejas!`}</div>}
          <p className="mt-4 text-center text-xs text-emerald-100/55">{game.moves} turnos completados</p>
        </section>
      </div>
    </AppLayout>
  );
}
