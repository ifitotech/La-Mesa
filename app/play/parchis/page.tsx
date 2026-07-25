"use client";

import { ArrowLeft, Dice5, Home, RotateCcw, ShieldCheck, Trophy } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import AppLayout from "@/app/components/AppLayout";
import {
  PARCHIS_GOAL,
  ParchisState,
  createParchisGame,
  legalParchisMoves,
  moveParchisPiece,
  passParchisTurn,
} from "@/lib/parchis-engine";
import { getGameNightSession } from "@/lib/game-night-session";

const colors = [
  { panel: "border-rose-300/40 bg-rose-500/15", token: "bg-rose-500", text: "text-rose-200" },
  { panel: "border-emerald-300/40 bg-emerald-500/15", token: "bg-emerald-500", text: "text-emerald-200" },
  { panel: "border-amber-300/40 bg-amber-400/15", token: "bg-amber-400", text: "text-amber-200" },
  { panel: "border-blue-300/40 bg-blue-500/15", token: "bg-blue-500", text: "text-blue-200" },
];

export default function ParchisPage() {
  const [game, setGame] = useState<ParchisState | null>(null);
  const [roll, setRoll] = useState<number | null>(null);
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
    const next = structuredClone(game);
    const legal = legalParchisMoves(next, value);
    if (!legal.length) {
      passParchisTurn(next);
      setGame(next);
      setRoll(null);
      setMessage(`Salió ${value}. No había movimientos válidos; pasa el turno.`);
      return;
    }
    setRoll(value);
    setMessage(`Salió ${value}. Elige una ficha válida.`);
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
        ? `¡${next.players.find((player) => player.id === next.winner)?.name} ganó la partida!`
        : result.captured.length
          ? "¡Captura! La ficha rival vuelve a casa y conservas el turno."
          : result.reachedGoal
            ? "¡Ficha en la meta! Conservas el turno."
            : result.extraTurn
              ? "Sacaste seis. Vuelve a tirar."
              : "Movimiento completado. Siguiente turno.",
    );
  }

  if (!game) {
    return <AppLayout lockViewport><div className="mesa-panel mx-auto max-w-3xl rounded-3xl p-10 text-center text-slate-400">Preparando el tablero...</div></AppLayout>;
  }

  const active = game.players[game.turn];
  const legal = roll === null ? [] : legalParchisMoves(game, roll);
  const winner = game.players.find((player) => player.id === game.winner);

  return (
    <AppLayout lockViewport>
      <div className="mx-auto max-w-5xl space-y-5">
        <Link href="/games" className="flex w-fit items-center gap-2 text-sm font-bold text-slate-400 hover:text-white"><ArrowLeft size={17} /> Juegos</Link>
        <section className="mesa-panel-gold rounded-3xl p-5 text-center md:p-7">
          <p className="text-xs font-black uppercase tracking-[.22em] text-amber-300">Reglas clásicas · 2 a 4 jugadores</p>
          <h1 className="mt-2 text-3xl font-black">Parchís</h1>
          <p className="mt-2 text-sm text-slate-300">Saca con cinco, captura rivales y lleva tus cuatro fichas a la meta exacta.</p>
        </section>

        <section className="parchis-table-scene rounded-[2rem] p-4 pt-44 md:p-7 md:pt-56">
          <div className="grid gap-3 sm:grid-cols-2">
            {game.players.map((player, playerIndex) => (
              <article key={player.id} className={`rounded-2xl border p-4 ${colors[playerIndex].panel} ${active.id === player.id && !winner ? "ring-2 ring-amber-200/60" : ""}`}>
                <div className="flex items-center justify-between gap-3">
                  <h2 className={`font-black ${colors[playerIndex].text}`}>{player.name}</h2>
                  <span className="text-xs font-bold text-slate-300">{player.pieces.filter((piece) => piece.steps === PARCHIS_GOAL).length}/4 en meta</span>
                </div>
                <div className="mt-4 grid grid-cols-4 gap-2">
                  {player.pieces.map((piece, pieceIndex) => {
                    const movable = active.id === player.id && legal.includes(pieceIndex);
                    return (
                      <button
                        key={piece.id}
                        onClick={() => move(pieceIndex)}
                        disabled={!movable}
                        aria-label={`Ficha ${pieceIndex + 1} de ${player.name}`}
                        className={`relative flex aspect-square items-center justify-center rounded-full border-4 border-white/75 shadow-lg ${colors[playerIndex].token} ${movable ? "animate-pulse ring-4 ring-amber-200/50 hover:scale-105" : "disabled:opacity-65"}`}
                      >
                        {piece.steps === -1 ? <Home size={17} /> : piece.steps === PARCHIS_GOAL ? <Trophy size={17} /> : <span className="text-xs font-black">{piece.steps}</span>}
                      </button>
                    );
                  })}
                </div>
              </article>
            ))}
          </div>

          <div className="mt-5 rounded-2xl border border-amber-100/15 bg-black/25 p-5 text-center">
            {winner ? (
              <p className="flex items-center justify-center gap-2 text-xl font-black text-amber-200"><Trophy /> ¡{winner.name} ganó!</p>
            ) : (
              <>
                <p className="text-xs font-black uppercase tracking-[.2em] text-amber-200/70">Turno actual</p>
                <p className="mt-2 text-2xl font-black">{active.name}</p>
              </>
            )}
            <p className="mt-2 text-sm text-slate-300">{message}</p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <button onClick={rollDice} disabled={roll !== null || Boolean(winner)} className="mesa-action inline-flex items-center gap-2 disabled:opacity-40"><Dice5 size={19} /> {roll === null ? "Tirar dado" : `Dado: ${roll}`}</button>
              <button onClick={reset} className="inline-flex items-center gap-2 rounded-xl border border-amber-100/20 bg-black/20 px-4 py-3 font-bold"><RotateCcw size={17} /> Nueva partida</button>
            </div>
            <p className="mt-4 flex items-center justify-center gap-2 text-xs text-emerald-100/55"><ShieldCheck size={14} /> Las casillas seguras no permiten capturas.</p>
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
