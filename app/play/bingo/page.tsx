"use client";

import Link from "next/link";
import { ArrowLeft, CircleDot, RotateCcw, Volume2 } from "lucide-react";
import { useEffect, useState } from "react";

import AppLayout from "@/app/components/AppLayout";
import { BingoCard, createBingoCard, hasBingo } from "@/lib/bingo";

const columns = ["B", "I", "N", "G", "O"];

export default function BingoPage() {
  const [card, setCard] = useState<BingoCard | null>(null);
  const [called, setCalled] = useState<number[]>([]);
  const [marked, setMarked] = useState<Set<number>>(() => new Set([12]));
  const [winner, setWinner] = useState(false);
  const lastNumber = called.at(-1);

  useEffect(() => {
    const timer = window.setTimeout(() => setCard(createBingoCard()), 0);
    return () => window.clearTimeout(timer);
  }, []);

  function callNumber() {
    const available = Array.from({ length: 75 }, (_, index) => index + 1).filter((number) => !called.includes(number));
    if (!available.length) return;
    setCalled((values) => [...values, available[Math.floor(Math.random() * available.length)]]);
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

  if (!card) return <AppLayout immersive lockViewport><div className="grid h-dvh place-items-center text-slate-300">Preparando tu tarjeta…</div></AppLayout>;

  return (
    <AppLayout immersive lockViewport>
      <div className="bingo-screen">
        <header className="bingo-topbar">
          <Link href="/games" aria-label="Regresar a juegos"><ArrowLeft size={20} /></Link>
          <h1><CircleDot size={21} /> BINGO</h1>
          <button onClick={newPlayerCard} aria-label="Nueva tarjeta"><RotateCcw size={19} /></button>
        </header>

        <div className="bingo-game-grid">
          <section className="bingo-card-panel">
            <div className="bingo-card-grid">
              {columns.map((column) => <div key={column} className="bingo-letter">{column}</div>)}
              {card.flat().map((number, index) => (
                <button
                  key={`${number}-${index}`}
                  onClick={() => mark(index)}
                  aria-label={`Carta ${number || "libre"}`}
                  className={marked.has(index) ? "is-marked" : ""}
                >
                  {number === 0 ? "★" : number}
                </button>
              ))}
            </div>
            {winner && <div className="bingo-winner">¡BINGO! 🎉</div>}
          </section>

          <aside className="bingo-caller-panel">
            <div className="bingo-last-ball"><span>ÚLTIMO</span><strong>{lastNumber ?? "–"}</strong></div>
            <p className="bingo-progress">{called.length}/75 números</p>
            <button onClick={callNumber} disabled={called.length >= 75} className="bingo-call-button"><Volume2 size={19} /> SACAR NÚMERO</button>
            <button onClick={reset} className="bingo-reset-button"><RotateCcw size={17} /> Nueva ronda</button>
            <div className="bingo-history">
              <span>HAN SALIDO</span>
              <p>{called.length ? called.slice(-12).reverse().join(" · ") : "Todavía ninguno"}</p>
            </div>
          </aside>
        </div>
      </div>
    </AppLayout>
  );
}
