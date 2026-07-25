"use client";

import { ArrowLeft, Crown, Hand, Plus, RotateCcw, ShieldCheck, Trophy } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import AppLayout from "@/app/components/AppLayout";
import {
  BlackjackCard,
  BlackjackOutcome,
  blackjackHandValue,
  createBlackjackDeck,
  dealerShouldHit,
  isBlackjack,
  resolveBlackjack,
} from "@/lib/blackjack";

function Card({ card, hidden = false }: { card: BlackjackCard; hidden?: boolean }) {
  const red = card.suit === "♥" || card.suit === "♦";
  return (
    <div className={`relative flex h-36 w-24 shrink-0 flex-col items-center justify-center rounded-xl border-4 border-[#f2e5c1] shadow-[0_16px_32px_rgba(0,0,0,.38)] sm:h-44 sm:w-28 ${hidden ? "bg-[radial-gradient(circle,#1c6748,#08291c)]" : "bg-gradient-to-br from-[#fffdf5] to-[#ded1af]"} ${red ? "text-rose-600" : "text-slate-900"}`}>
      {hidden ? <span className="font-serif text-xl font-black text-amber-200">LM</span> : <><span className="absolute left-2 top-1 text-lg font-black">{card.rank}</span><span className="text-4xl">{card.suit}</span><span className="absolute bottom-1 right-2 rotate-180 text-lg font-black">{card.rank}</span></>}
    </div>
  );
}

export default function BlackjackPage() {
  const [deck, setDeck] = useState<BlackjackCard[]>([]);
  const [player, setPlayer] = useState<BlackjackCard[]>([]);
  const [dealer, setDealer] = useState<BlackjackCard[]>([]);
  const [finished, setFinished] = useState(false);
  const [outcome, setOutcome] = useState<BlackjackOutcome | null>(null);
  const [wins, setWins] = useState(0);

  function newRound() {
    const nextDeck = createBlackjackDeck();
    const nextPlayer = [nextDeck.pop()!, nextDeck.pop()!];
    const nextDealer = [nextDeck.pop()!, nextDeck.pop()!];
    setDeck(nextDeck);
    setPlayer(nextPlayer);
    setDealer(nextDealer);
    const natural = isBlackjack(nextPlayer);
    setFinished(natural);
    setOutcome(natural ? resolveBlackjack(nextPlayer, nextDealer) : null);
    if (natural && resolveBlackjack(nextPlayer, nextDealer) === "blackjack") setWins((value) => value + 1);
  }

  useEffect(() => {
    const timer = window.setTimeout(newRound, 0);
    return () => window.clearTimeout(timer);
  }, []);

  function finishDealer(nextPlayer = player, remainingDeck = deck) {
    const nextDealer = [...dealer];
    const nextDeck = [...remainingDeck];
    while (dealerShouldHit(nextDealer)) nextDealer.push(nextDeck.pop()!);
    const result = resolveBlackjack(nextPlayer, nextDealer);
    setDealer(nextDealer);
    setDeck(nextDeck);
    setOutcome(result);
    setFinished(true);
    if (result === "win" || result === "blackjack") setWins((value) => value + 1);
  }

  function hit() {
    if (finished) return;
    const nextDeck = [...deck];
    const nextPlayer = [...player, nextDeck.pop()!];
    setPlayer(nextPlayer);
    setDeck(nextDeck);
    if (blackjackHandValue(nextPlayer) >= 21) finishDealer(nextPlayer, nextDeck);
  }

  const messages: Record<BlackjackOutcome, string> = {
    blackjack: "¡Blackjack natural!",
    win: "¡Ganaste la mano!",
    lose: "La casa gana esta mano.",
    push: "Empate. Nadie pierde.",
  };

  if (!player.length) return <AppLayout lockViewport><div className="mesa-panel mx-auto max-w-3xl rounded-3xl p-10 text-center text-slate-400">Barajando...</div></AppLayout>;

  return (
    <AppLayout lockViewport>
      <div className="mx-auto max-w-5xl space-y-5">
        <Link href="/games" className="flex w-fit items-center gap-2 text-sm font-bold text-slate-400 hover:text-white"><ArrowLeft size={17} /> Juegos</Link>
        <section className="mesa-panel-gold rounded-3xl p-5 text-center md:p-7">
          <p className="text-xs font-black uppercase tracking-[.22em] text-amber-300">Blackjack clásico · Sin apuestas</p>
          <h1 className="mt-2 flex items-center justify-center gap-3 text-3xl font-black"><Crown className="text-amber-300" /> Blackjack 21</h1>
          <p className="mt-2 text-slate-300">Acércate a 21 sin pasarte. El crupier debe pedir hasta llegar a 17.</p>
        </section>

        <section className="blackjack-table-scene rounded-[2rem] p-5 text-center md:p-8">
          <div className="flex items-center justify-between text-xs font-black uppercase tracking-[.16em] text-amber-100/70"><span>Crupier · {finished ? blackjackHandValue(dealer) : "?"}</span><span className="flex items-center gap-2"><Trophy size={15} /> {wins} victorias</span></div>
          <div className="mt-4 flex min-h-44 -space-x-3 justify-center">{dealer.map((card, index) => <Card key={card.id} card={card} hidden={!finished && index === 1} />)}</div>
          <div className="my-6 flex items-center gap-3"><span className="h-px flex-1 bg-amber-100/15" /><ShieldCheck className="text-amber-300" /><span className="h-px flex-1 bg-amber-100/15" /></div>
          <p className="text-xs font-black uppercase tracking-[.16em] text-emerald-100/70">Tu mano · {blackjackHandValue(player)}</p>
          <div className="mt-4 flex min-h-44 -space-x-3 justify-center">{player.map((card) => <Card key={card.id} card={card} />)}</div>

          <div className="mt-6 min-h-8">
            {outcome && <p className="mesa-gold-text text-2xl font-black">{messages[outcome]}</p>}
            {!outcome && <p className="text-sm text-slate-300">¿Pides otra carta o te plantas?</p>}
          </div>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            {!finished && <><button onClick={hit} className="mesa-action inline-flex items-center gap-2"><Plus size={18} /> Pedir</button><button onClick={() => finishDealer()} className="inline-flex items-center gap-2 rounded-xl border border-amber-200/25 bg-black/25 px-5 py-3 font-black hover:border-amber-200/60"><Hand size={18} /> Plantarse</button></>}
            {finished && <button onClick={newRound} className="mesa-action inline-flex items-center gap-2"><RotateCcw size={18} /> Nueva mano</button>}
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
