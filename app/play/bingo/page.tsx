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
    if (!card) return;
    const available = Array.from({ length: 75 }, (_, index) => index + 1).filter((number) => !called.includes(number));
    if (!available.length) return;
    const number = available[Math.floor(Math.random() * available.length)];
    setCalled((values) => [...values, number]);

    const position = card.flat().findIndex((value) => value === number);
    if (position >= 0) {
      setMarked((previous) => {
        const next = new Set(previous);
        next.add(position);
        if (hasBingo(next)) setWinner(true);
        return next;
      });
    }

    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(new SpeechSynthesisUtterance(`Número ${number}`));
    }
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
          <aside className="bingo-caller-panel">
            <div key={lastNumber ?? "empty"} className={`bingo-last-ball ${lastNumber ? "is-drawn" : ""}`}><span>ÚLTIMO</span><strong>{lastNumber ?? "–"}</strong></div>
            <div key={called.length} className="bingo-history">
              <span>HAN SALIDO · {called.length}/75</span>
              <p>{called.length ? called.slice(-12).reverse().join(" · ") : "Todavía ninguno"}</p>
            </div>
            <button onClick={reset} className="bingo-reset-button"><RotateCcw size={17} /> Nueva ronda</button>
          </aside>

          <section className="bingo-card-panel">
            <div className="bingo-card-grid">
              {columns.map((column) => <div key={column} className="bingo-letter">{column}</div>)}
              {card.flat().map((number, index) => (
                <div key={`${number}-${index}`} className={marked.has(index) ? "bingo-space is-marked" : "bingo-space"}>
                  {number === 0 ? "★" : number}
                </div>
              ))}
            </div>
            <button onClick={callNumber} disabled={called.length >= 75} className="bingo-call-button"><Volume2 size={19} /> SACAR NÚMERO</button>
            {winner && <div className="bingo-winner">¡BINGO! 🎉</div>}
          </section>
        </div>
      </div>
    </AppLayout>
  );
}
