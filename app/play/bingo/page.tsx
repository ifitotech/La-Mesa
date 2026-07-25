"use client";

import Link from "next/link";
import { ArrowLeft, CircleDot, RotateCcw, Settings, Users, Volume2, VolumeX } from "lucide-react";
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
          <div className="bingo-nav-item"><Users size={19} /><span>Jugadores</span></div>
          <h1><CircleDot size={21} /> LA MESA <b>BINGO</b></h1>
          <div className="bingo-nav-item"><Settings size={19} /><span>Ajustes</span></div>
          <button onClick={newPlayerCard} aria-label="Nueva tarjeta"><RotateCcw size={19} /></button>
        </header>

        <div className="bingo-casino-stage">
          <div className="bingo-host">
            <div className="bingo-host-head"><span /><i /></div>
            <div className="bingo-host-body"><strong>LA MESA</strong></div>
            <div className="bingo-host-hands"><i /><i /></div>
          </div>
          <div className="bingo-player-seat bingo-seat-left"><span>🎩</span><strong>Rosy</strong><small>2 cartones</small></div>
          <div className="bingo-player-seat bingo-seat-right"><span>👩🏽</span><strong>Jas</strong><small>1 cartón</small></div>

          <div className="bingo-game-grid">
          <aside className="bingo-caller-panel">
            <div key={lastNumber ?? "empty"} className={`bingo-last-ball ${lastNumber ? "is-drawn" : ""}`}><span>NÚMERO</span><strong>{lastNumber ?? "–"}</strong></div>
            <div key={called.length} className="bingo-history">
              <span>HAN SALIDO · {called.length}/75</span>
              {called.length ? (
                <div className="bingo-history-balls">
                  {called.slice(-10).reverse().map((number, index) => <i key={number} style={{ "--history-index": index } as React.CSSProperties}>{number}</i>)}
                </div>
              ) : <p>Todavía ninguno</p>}
            </div>
            <div className="bingo-top-actions">
              <button onClick={toggleSound} className={`bingo-audio-button ${soundEnabled ? "is-on" : ""}`} aria-label={soundEnabled ? "Silenciar números" : "Activar audio"}>
                {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
              </button>
              <button onClick={reset} className="bingo-reset-button"><RotateCcw size={17} /> Nueva ronda</button>
            </div>
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

          <div className="bingo-local-seat">
            <span className="bingo-local-avatar">TÚ</span>
            <strong>Tu mesa</strong>
            <small>{called.length} números cantados</small>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
