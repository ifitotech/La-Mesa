"use client";

import { ArrowLeft, Hand, Plus, RotateCcw, ShieldCheck, Volume2 } from "lucide-react";
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

function Card({ card, hidden = false, index = 0 }: { card: BlackjackCard; hidden?: boolean; index?: number }) {
  const red = card.suit === "♥" || card.suit === "♦";
  return (
    <div
      className={`casino-card ${hidden ? "casino-card-back" : ""} ${red ? "text-rose-600" : "text-slate-950"}`}
      style={{ "--card-index": index } as React.CSSProperties}
    >
      {hidden ? (
        <span className="casino-card-monogram">LM</span>
      ) : (
        <>
          <span className="casino-card-corner">{card.rank}<small>{card.suit}</small></span>
          <span className="casino-card-suit">{card.suit}</span>
          <span className="casino-card-corner casino-card-corner-bottom">{card.rank}<small>{card.suit}</small></span>
        </>
      )}
    </div>
  );
}

function Seat({ name, balance, className }: { name: string; balance: string; className: string }) {
  return (
    <div className={`casino-seat ${className}`}>
      <div className="casino-avatar" aria-hidden="true">{name.slice(0, 1)}</div>
      <div>
        <strong>{name}</strong>
        <span>◉ {balance}</span>
      </div>
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
  const [chips, setChips] = useState(2500);
  const [bet, setBet] = useState(100);

  function newRound() {
    const nextDeck = createBlackjackDeck();
    const nextPlayer = [nextDeck.pop()!, nextDeck.pop()!];
    const nextDealer = [nextDeck.pop()!, nextDeck.pop()!];
    setDeck(nextDeck);
    setPlayer(nextPlayer);
    setDealer(nextDealer);
    const natural = isBlackjack(nextPlayer);
    setFinished(natural);
    const result = natural ? resolveBlackjack(nextPlayer, nextDealer) : null;
    setOutcome(result);
    if (result === "blackjack") {
      setWins((value) => value + 1);
      setChips((value) => value + Math.round(bet * 1.5));
    }
  }

  useEffect(() => {
    const timer = window.setTimeout(newRound, 0);
    return () => window.clearTimeout(timer);
    // La primera mano se reparte una sola vez al montar la mesa.
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    if (result === "win" || result === "blackjack") {
      setWins((value) => value + 1);
      setChips((value) => value + (result === "blackjack" ? Math.round(bet * 1.5) : bet));
    } else if (result === "lose") {
      setChips((value) => Math.max(0, value - bet));
    }
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
    blackjack: "BLACKJACK",
    win: "GANASTE",
    lose: "GANA LA CASA",
    push: "EMPATE",
  };

  if (!player.length) return <AppLayout lockViewport><div className="p-10 text-center text-amber-200">Barajando la mesa…</div></AppLayout>;

  return (
    <AppLayout lockViewport>
      <div className="casino-game-shell">
        <header className="casino-hud">
          <Link href="/games" aria-label="Regresar a juegos"><ArrowLeft /></Link>
          <div><span>BLACKJACK</span><strong>21</strong></div>
          <button aria-label="Sonido"><Volume2 /></button>
        </header>

        <section className="casino-blackjack-table">
          <div className="casino-rule"><strong>BLACKJACK PAGA 3 A 2</strong><span>CRUPIER SE PLANTA EN 17</span></div>
          <Seat name="Rosy" balance="8.4K" className="casino-seat-left" />
          <Seat name="Fito" balance="12.7K" className="casino-seat-right" />

          <div className="casino-dealer-zone">
            <span className="casino-zone-label">CRUPIER · {finished ? blackjackHandValue(dealer) : "?"}</span>
            <div className="casino-hand">{dealer.map((card, index) => <Card key={card.id} card={card} index={index} hidden={!finished && index === 1} />)}</div>
          </div>

          <div className="casino-player-zone">
            <div className="casino-score">{blackjackHandValue(player)}</div>
            <div className="casino-hand">{player.map((card, index) => <Card key={card.id} card={card} index={index} />)}</div>
          </div>

          <div className="casino-pot">
            <button onClick={() => setBet((value) => value === 500 ? 50 : value + 50)} disabled={!finished && deck.length < 52}>
              <span>APUESTA</span><strong>{bet}</strong>
            </button>
          </div>

          <div className="casino-result" aria-live="polite">
            {outcome ? messages[outcome] : "PIDE CARTA O PLÁNTATE"}
          </div>

          <div className="casino-controls">
            {!finished ? (
              <>
                <button onClick={() => finishDealer()} className="casino-control casino-control-red"><Hand /> PLANTARSE</button>
                <button onClick={hit} className="casino-control casino-control-green"><Plus /> PEDIR</button>
              </>
            ) : (
              <button onClick={newRound} className="casino-control casino-control-gold"><RotateCcw /> NUEVA MANO</button>
            )}
          </div>

          <div className="casino-me">
            <div className="casino-avatar casino-avatar-me"><ShieldCheck /></div>
            <strong>Tu mesa</strong>
            <span>◉ {chips.toLocaleString()} · {wins} victorias</span>
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
