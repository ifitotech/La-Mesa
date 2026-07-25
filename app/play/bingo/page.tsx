"use client";

import Link from "next/link";
import { ArrowLeft, CircleDot, RotateCcw, Volume2, VolumeX } from "lucide-react";
import { useEffect, useState } from "react";

import AppLayout from "@/app/components/AppLayout";
import { BingoCard, createBingoCard, hasBingo } from "@/lib/bingo";

const columns = ["B", "I", "N", "G", "O"];

export default function BingoPage() {
  const [card, setCard] = useState<BingoCard | null>(null);
  const [called, setCalled] = useState<number[]>([]);
  const [marked, setMarked] = useState<Set<number>>(() => new Set([12]));
  const [winner, setWinner] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [spanishVoice, setSpanishVoice] = useState<SpeechSynthesisVoice | null>(null);
  const lastNumber = called.at(-1);

  useEffect(() => {
    const timer = window.setTimeout(() => setCard(createBingoCard()), 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!("speechSynthesis" in window)) return;
    const chooseVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      const spanish = voices.filter((voice) => voice.lang.toLowerCase().startsWith("es"));
      const preferredNames = ["paulina", "mónica", "monica", "google", "microsoft", "helena", "jorge"];
      const voice = spanish.sort((a, b) => {
        const score = (item: SpeechSynthesisVoice) => {
          const name = item.name.toLowerCase();
          return (preferredNames.some((preferred) => name.includes(preferred)) ? 10 : 0)
            + (item.lang.toLowerCase().includes("mx") ? 4 : 0)
            + (item.localService ? 1 : 0);
        };
        return score(b) - score(a);
      })[0] ?? null;
      setSpanishVoice(voice);
    };
    chooseVoice();
    window.speechSynthesis.addEventListener("voiceschanged", chooseVoice);
    return () => window.speechSynthesis.removeEventListener("voiceschanged", chooseVoice);
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

    if (soundEnabled && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const announcement = new SpeechSynthesisUtterance(`Número... ${number}`);
      announcement.lang = spanishVoice?.lang ?? "es-MX";
      announcement.voice = spanishVoice;
      announcement.rate = 0.88;
      announcement.pitch = 1.03;
      announcement.volume = 1;
      window.speechSynthesis.speak(announcement);
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

  function toggleSound() {
    setSoundEnabled((value) => {
      if (value && "speechSynthesis" in window) window.speechSynthesis.cancel();
      return !value;
    });
  }

  if (!card) return <AppLayout immersive lockViewport><div className="grid h-dvh place-items-center text-slate-300">Preparando tu tarjeta…</div></AppLayout>;

  return (
    <AppLayout immersive lockViewport>
      <div className="bingo-screen">
        <header className="bingo-topbar">
          <Link href="/games" aria-label="Regresar a juegos"><ArrowLeft size={20} /></Link>
          <h1><CircleDot size={21} /> LA MESA <b>BINGO</b></h1>
          <button onClick={newPlayerCard} aria-label="Nueva tarjeta"><RotateCcw size={19} /></button>
        </header>

        <main className="bingo-premium-stage">
          <aside className="bingo-number-console">
            <p>NÚMERO ACTUAL</p>
            <div key={lastNumber ?? "empty"} className={`bingo-premium-ball ${lastNumber ? "is-drawn" : ""}`}>
              <span>{lastNumber ? columns[Math.min(4, Math.floor((lastNumber - 1) / 15))] : "B"}</span>
              <strong>{lastNumber ?? "–"}</strong>
            </div>
            <div className="bingo-premium-count"><strong>{called.length}</strong><span>de 75</span></div>
            <div className="bingo-premium-tools">
              <button onClick={toggleSound} className={soundEnabled ? "is-on" : ""} aria-label={soundEnabled ? "Silenciar números" : "Activar audio"}>
                {soundEnabled ? <Volume2 size={19} /> : <VolumeX size={19} />}
              </button>
              <button onClick={reset} aria-label="Nueva ronda"><RotateCcw size={19} /></button>
            </div>
          </aside>

          <section className="bingo-premium-card">
            <div className="bingo-card-grid">
              {columns.map((column) => <div key={column} className="bingo-letter">{column}</div>)}
              {card.flat().map((number, index) => (
                <div key={`${number}-${index}`} className={marked.has(index) ? "bingo-space is-marked" : "bingo-space"}>
                  {number === 0 ? "★" : number}
                </div>
              ))}
            </div>
            {winner && <div className="bingo-winner">¡BINGO! 🎉</div>}
          </section>

          <aside key={called.length} className="bingo-premium-history">
            <div className="bingo-history-heading"><strong>ÚLTIMOS NÚMEROS</strong><span>{called.length}/75</span></div>
            <div>
              {called.length ? (
                called.slice(-5).reverse().map((number, index) => <i key={number} style={{ "--history-index": index } as React.CSSProperties}>{number}</i>)
              ) : <span className="bingo-history-empty">La ronda está lista</span>}
            </div>
          </aside>

          <div className="bingo-premium-dock">
            <button onClick={callNumber} disabled={called.length >= 75}>
              <CircleDot size={20} /><span>SACAR NÚMERO</span>
            </button>
          </div>
        </main>
      </div>
    </AppLayout>
  );
}
