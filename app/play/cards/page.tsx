"use client";

import Link from "next/link";
import { ArrowLeft, Crown, RotateCcw, Sparkles, Trophy } from "lucide-react";
import { useEffect, useState } from "react";

import AppLayout from "@/app/components/AppLayout";
import { useCountry } from "@/contexts/CountryContext";
import { GameNightSession, getGameNightSession, saveGameNightSession } from "@/lib/game-night-session";

type SpanishSuit = "oros" | "copas" | "espadas" | "bastos";
type PlayingCard = { rank: number; suit: SpanishSuit; value: number };

const ranks = [1, 2, 3, 4, 5, 6, 7, 10, 11, 12];
const suits: SpanishSuit[] = ["oros", "copas", "espadas", "bastos"];
const suitSymbols: Record<SpanishSuit, string> = { oros: "●", copas: "♥", espadas: "♠", bastos: "♣" };
const suitLabels: Record<SpanishSuit, string> = { oros: "Oros", copas: "Copas", espadas: "Espadas", bastos: "Bastos" };
const rankLabels: Record<number, string> = { 10: "S", 11: "C", 12: "R" };

function drawRound(): [PlayingCard, PlayingCard] {
  const deck = suits.flatMap((suit) => ranks.map((rank) => ({ rank, suit, value: rank })));
  const firstIndex = Math.floor(Math.random() * deck.length);
  const player = deck.splice(firstIndex, 1)[0];
  const table = deck[Math.floor(Math.random() * deck.length)];
  return [player, table];
}

export default function CardsPage() {
  const { isEnglish } = useCountry();
  const [cards, setCards] = useState<[PlayingCard, PlayingCard] | null>(null);
  const [session, setSession] = useState<GameNightSession | null>(null);
  const [recipientId, setRecipientId] = useState("");
  const [roundScore, setRoundScore] = useState(0);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setCards(drawRound());
      const saved = getGameNightSession();
      setSession(saved);
      setRecipientId(saved?.participants[0]?.id ?? "");
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const copy = isEnglish ? {
    back: "Games", eyebrow: "Spanish deck · Local game · Beta", title: "High Card", description: "Draw a Spanish-deck card against the table. The highest card wins the round.", you: "Your card", table: "Table card", win: "You win this round!", lose: "The table wins this round.", tie: "Tie. Draw again!", roundPoints: "round points", pointFor: "Point for", draw: "Draw next cards", restart: "Restart score", loading: "Shuffling cards..."
  } : {
    back: "Juegos", eyebrow: "Baraja española · Juego local · Beta", title: "Carta más alta", description: "Saca una carta española contra la mesa. La carta más alta gana la ronda.", you: "Tu carta", table: "Carta de la mesa", win: "¡Ganaste esta ronda!", lose: "La mesa gana esta ronda.", tie: "Empate. ¡Vuelvan a sacar!", roundPoints: "puntos en la ronda", pointFor: "Punto para", draw: "Sacar nuevas cartas", restart: "Reiniciar puntos", loading: "Barajando cartas..."
  };

  function awardGameNightPoint() {
    if (!session || !recipientId) return;
    const nextSession = { ...session, participants: session.participants.map((participant) => participant.id === recipientId ? { ...participant, score: participant.score + 1 } : participant) };
    saveGameNightSession(nextSession);
    setSession(nextSession);
  }

  function nextRound() {
    const next = drawRound();
    setCards(next);
    if (next[0].value > next[1].value) {
      setRoundScore((score) => score + 1);
      awardGameNightPoint();
    }
  }

  if (!cards) return <AppLayout><div className="mesa-panel mx-auto max-w-3xl rounded-3xl p-10 text-center text-slate-400">{copy.loading}</div></AppLayout>;

  const [playerCard, tableCard] = cards;
  const outcome = playerCard.value === tableCard.value ? copy.tie : playerCard.value > tableCard.value ? copy.win : copy.lose;
  const cardStyle = (card: PlayingCard) => ({ oros: "text-amber-500", copas: "text-rose-600", espadas: "text-blue-700", bastos: "text-emerald-700" })[card.suit];
  const cardRank = (card: PlayingCard) => rankLabels[card.rank] ?? String(card.rank);

  return <AppLayout><div className="mx-auto max-w-3xl space-y-5">
    <Link href="/games" className="flex w-fit items-center gap-2 text-sm font-bold text-slate-400 hover:text-white"><ArrowLeft size={17} /> {copy.back}</Link>
    <section className="mesa-panel-gold rounded-3xl p-6 text-center md:p-8"><p className="text-xs font-bold uppercase tracking-[.24em] text-rose-300">{copy.eyebrow}</p><h1 className="mt-2 flex justify-center gap-3 text-3xl font-black"><Crown className="text-amber-300" /> {copy.title}</h1><p className="mx-auto mt-3 max-w-xl text-slate-300">{copy.description}</p></section>
    <section className="mesa-panel rounded-3xl p-6 text-center md:p-9"><div className="flex items-center justify-center gap-5 sm:gap-10"><div><p className="mb-3 text-xs font-black uppercase tracking-[.18em] text-slate-400">{copy.you}</p><div className={`relative flex h-44 w-28 flex-col items-center justify-center rounded-2xl bg-stone-100 text-5xl font-black shadow-xl sm:h-52 sm:w-36 sm:text-6xl ${cardStyle(playerCard)}`}><span className="absolute left-3 top-3 text-lg">{cardRank(playerCard)}</span><span>{cardRank(playerCard)}</span><span className="mt-3 text-4xl">{suitSymbols[playerCard.suit]}</span><span className="absolute bottom-3 text-[10px] uppercase tracking-[.14em]">{suitLabels[playerCard.suit]}</span></div></div><Sparkles className="text-amber-300" /><div><p className="mb-3 text-xs font-black uppercase tracking-[.18em] text-slate-400">{copy.table}</p><div className={`relative flex h-44 w-28 flex-col items-center justify-center rounded-2xl bg-stone-100 text-5xl font-black shadow-xl sm:h-52 sm:w-36 sm:text-6xl ${cardStyle(tableCard)}`}><span className="absolute left-3 top-3 text-lg">{cardRank(tableCard)}</span><span>{cardRank(tableCard)}</span><span className="mt-3 text-4xl">{suitSymbols[tableCard.suit]}</span><span className="absolute bottom-3 text-[10px] uppercase tracking-[.14em]">{suitLabels[tableCard.suit]}</span></div></div></div><p className="mt-7 text-2xl font-black text-amber-200">{outcome}</p><p className="mt-2 text-sm font-bold text-slate-400">{roundScore} {copy.roundPoints}</p>{session && session.participants.length > 1 && <label className="mx-auto mt-6 block max-w-sm rounded-2xl border border-amber-300/35 bg-amber-400/10 p-4 text-left"><span className="flex items-center gap-2 text-sm font-black text-amber-200"><Trophy size={16} /> {copy.pointFor}</span><select value={recipientId} onChange={(event) => setRecipientId(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-600 bg-slate-950 px-3 py-2 font-bold outline-none focus:border-amber-300">{session.participants.map((participant) => <option key={participant.id} value={participant.id}>{participant.name} · {participant.score} pts</option>)}</select></label>}<div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"><button onClick={nextRound} className="rounded-xl bg-gradient-to-r from-rose-600 to-red-700 px-6 py-3 font-black">{copy.draw}</button><button onClick={() => setRoundScore(0)} className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-600 px-6 py-3 font-bold hover:bg-slate-800"><RotateCcw size={17} /> {copy.restart}</button></div></section>
  </div></AppLayout>;
}
