"use client";

import { ArrowLeft, Dice5, RotateCcw, Trophy } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import AppLayout from "@/app/components/AppLayout";
import ParchisBoard from "@/app/components/ParchisBoard";
import {
  PARCHIS_GOAL,
  ParchisState,
  createParchisGame,
  legalParchisMoves,
  moveParchisPiece,
  passParchisTurn,
} from "@/lib/parchis-engine";
import { getGameNightSession } from "@/lib/game-night-session";

const playerColors = ["blue", "yellow", "green", "red"];

export default function ParchisPage() {
  const [game, setGame] = useState<ParchisState | null>(null);
  const [roll, setRoll] = useState<number | null>(null);
  const [diceKey, setDiceKey] = useState(0);
  const [message, setMessage] = useState("Tira el dado para comenzar.");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const session = getGameNightSession();
      const names = session?.participants.map((participant) => participant.name) ?? ["Jugador 1", "Jugador 2"];
      setGame(createParchisGame(names.length > 1 ? names : [...names, "La Mesa"]));
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  function reset() {
    if (!game) return;
    setGame(createParchisGame(game.players.map((player) => player.name)));
    setRoll(null);
    setMessage("Nueva partida lista.");
  }

  function rollDice() {
    if (!game || game.winner || roll !== null) return;
    const value = Math.floor(Math.random() * 6) + 1;
    setDiceKey((key) => key + 1);
    const next = structuredClone(game);
    const legal = legalParchisMoves(next, value);
    if (!legal.length) {
      passParchisTurn(next);
      setGame(next);
      setRoll(null);
      setMessage(`Salió ${value}. No había movimientos; pasa el turno.`);
      return;
    }
    setRoll(value);
    setMessage(`Salió ${value}. Elige una ficha iluminada.`);
  }

  function move(pieceIndex: number) {
    if (!game || roll === null) return;
    const next = structuredClone(game);
    const result = moveParchisPiece(next, pieceIndex, roll);
    if (!result) {
      setMessage("Esa ficha no puede moverse con este dado.");
      return;
    }
    setGame(next);
    setRoll(null);
    setMessage(
      result.won
        ? `¡${next.players.find((player) => player.id === next.winner)?.name} ganó!`
        : result.captured.length
          ? "¡Captura! Conservas el turno."
          : result.reachedGoal
            ? "¡Ficha en la meta! Conservas el turno."
            : result.extraTurn
              ? "Sacaste seis. Vuelve a tirar."
              : "Movimiento completado.",
    );
  }

  if (!game) return <AppLayout immersive lockViewport><div className="grid h-dvh place-items-center text-slate-300">Preparando el tablero…</div></AppLayout>;

  const active = game.players[game.turn];
  const legal = roll === null ? [] : legalParchisMoves(game, roll);
  const winner = game.players.find((player) => player.id === game.winner);

  return (
    <AppLayout immersive lockViewport>
      <div className="parchis-screen">
        <header className="parchis-topbar">
          <Link href="/games" aria-label="Regresar a juegos"><ArrowLeft size={20} /></Link>
          <h1>PARCHÍS</h1>
          <button onClick={reset} aria-label="Nueva partida"><RotateCcw size={18} /></button>
        </header>

        <div className="parchis-player-strip">
          {game.players.map((player, index) => (
            <article key={player.id} className={`parchis-player-card is-${playerColors[index]} ${active.id === player.id && !winner ? "is-active" : ""}`}>
              <span>{player.name.slice(0, 1)}</span>
              <div><strong>{player.name}</strong><small>{player.pieces.filter((piece) => piece.steps === PARCHIS_GOAL).length}/4 meta</small></div>
            </article>
          ))}
        </div>

        <section className="parchis-board-stage">
          <ParchisBoard game={game} legalMoves={legal} onMove={move} />
          {winner && <div className="parchis-winner"><Trophy /> ¡{winner.name} ganó!</div>}
        </section>

        <footer className="parchis-controls">
          <div className="parchis-turn-info">
            <span>TURNO</span>
            <strong>{active.name}</strong>
            <p>{message}</p>
          </div>
          <div key={diceKey} className={`parchis-die ${roll ? "has-roll" : ""}`}>{roll ?? "?"}</div>
          <button onClick={rollDice} disabled={roll !== null || Boolean(winner)} className="parchis-roll-button">
            <Dice5 size={21} /> {roll === null ? "TIRAR DADO" : "MUEVE UNA FICHA"}
          </button>
        </footer>
      </div>
    </AppLayout>
  );
}
