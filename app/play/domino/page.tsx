"use client";

import Link from "next/link";
import { ArrowLeft, CircleCheck, Layers, RotateCcw, Trophy } from "lucide-react";
import { useEffect, useState } from "react";

import AppLayout from "@/app/components/AppLayout";
import DominoTile from "@/app/components/DominoTile";
import { useCountry } from "@/contexts/CountryContext";
import { createGame } from "@/server/domino/createGame";
import { drawTile } from "@/server/domino/drawTile";
import { advanceTurn } from "@/server/domino/advanceTurn";
import { canPlayerMove } from "@/server/domino/canPlayerMove";
import { finishBlockedDominoGame, playComputerTurn } from "@/server/domino/playComputerTurn";
import { playTileOnSide } from "@/server/domino/playTileOnSide";
import { DominoGame, DominoTile as DominoPiece } from "@/types/domino";

const practicePlayer = "practice-player";
const computerPlayer = "la-mesa-dealer";

function newPracticeGame(maxPip: 6 | 9) {
  return createGame("practice", [practicePlayer, computerPlayer], maxPip);
}

function copyGame(game: DominoGame): DominoGame {
  return {
    ...game,
    board: [...game.board],
    stock: [...game.stock],
    players: game.players.map((player) => ({ ...player, hand: [...player.hand] })),
  };
}

export default function SoloDominoPage() {
  const { isEnglish } = useCountry();
  const text = isEnglish ? {
    loading: "Preparing Dominoes...", start: "Play any tile to begin.", back: "Games", mode: "Solo practice", title: "Dominoes", description: "Choose a side, build the chain, and clear your hand.", newGame: "New game", set: "Set", doubleSix: "Double-six", doubleNine: "Double-nine", left: "Left end", right: "Right end", ready: "The table is ready.", placeLeft: "Place left", placeRight: "Place right", draw: "Draw", tiles: "Your tiles", remaining: "remaining", complete: "Practice complete!", blocked: "This round is blocked.", won: "You won! You played every tile.", move: "Great move. Keep building the chain.", drew: "You drew a tile. Try placing it on either side.", stockEmpty: "The stock is empty. Play a tile that fits.", noMove: "Blocked game: no tiles left to draw and no legal moves.", newReady: "New practice game ready. Play any tile to begin.", invalid: (side: string) => `That tile does not fit on the ${side} side.`
  } : {
    loading: "Preparando tu mesa de práctica...", start: "Juega cualquier ficha para comenzar.", back: "Juegos", mode: "Modo individual", title: "Dominó", description: "Elige un lado, forma la cadena y quédate sin fichas.", newGame: "Nueva partida", set: "Modalidad", doubleSix: "Doble seis", doubleNine: "Doble nueve", left: "Extremo izquierdo", right: "Extremo derecho", ready: "La mesa está lista.", placeLeft: "Poner a la izquierda", placeRight: "Poner a la derecha", draw: "Robar", tiles: "Tus fichas", remaining: "restantes", complete: "¡Práctica completada!", blocked: "Esta ronda está bloqueada.", won: "¡Ganaste! Jugaste todas tus fichas.", move: "Buena jugada. Sigue formando la cadena.", drew: "Robaste una ficha. Intenta colocarla en cualquiera de los lados.", stockEmpty: "El pozo está vacío. Juega una ficha que encaje.", noMove: "Partida bloqueada: no quedan fichas para robar ni jugadas válidas.", newReady: "Nueva partida de práctica lista. Juega cualquier ficha para comenzar.", invalid: (side: string) => `Esa ficha no encaja en el lado ${side}.`
  };
  const [game, setGame] = useState<DominoGame | null>(null);
  const [message, setMessage] = useState("");
  const [side, setSide] = useState<"left" | "right">("right");
  const [maxPip, setMaxPip] = useState<6 | 9>(6);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setGame(newPracticeGame(6));
      setMessage(text.start);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [text.start]);

  useEffect(() => {
    if (!game || game.status !== "playing" || game.currentTurn !== computerPlayer) return;
    const timer = window.setTimeout(() => {
      const nextGame = copyGame(game);
      const result = playComputerTurn(nextGame, computerPlayer);
      setGame(nextGame);
      setMessage(
        result === "won"
          ? (isEnglish ? "La Mesa won the round." : "La Mesa ganó la ronda.")
          : result === "blocked"
            ? (isEnglish ? "Blocked round. The lowest hand wins." : "Ronda cerrada. Gana la mano con menos puntos.")
            : (isEnglish ? "La Mesa played. Your turn." : "La Mesa jugó. Es tu turno."),
      );
    }, 700);
    return () => window.clearTimeout(timer);
  }, [game, isEnglish]);

  function restart() {
    setGame(newPracticeGame(maxPip));
    setMessage(text.newReady);
    setSide("right");
  }

  function selectSet(nextMaxPip: 6 | 9) {
    setMaxPip(nextMaxPip);
    setGame(newPracticeGame(nextMaxPip));
    setMessage(text.start);
    setSide("right");
  }

  function play(tile: DominoPiece) {
    if (!game || game.status !== "playing") return;
    const nextGame = copyGame(game);
    if (!playTileOnSide(nextGame, practicePlayer, tile.id, side)) {
      setMessage(text.invalid(side === "left" ? text.left.toLowerCase() : text.right.toLowerCase()));
      return;
    }
    if (nextGame.players[0].hand.length === 0) {
      setGame({ ...nextGame, status: "finished", winner: practicePlayer });
      setMessage(text.won);
      return;
    }
    advanceTurn(nextGame);
    setGame(nextGame);
    setMessage(isEnglish ? "Good move. La Mesa is thinking..." : "Buena jugada. La Mesa está pensando...");
  }

  function draw() {
    if (!game || game.status !== "playing") return;
    const nextGame = copyGame(game);
    const nextPlayer = nextGame.players[0];
    if (drawTile(nextPlayer, nextGame.stock)) {
      setGame(nextGame);
      setMessage(text.drew);
      return;
    }
    const leftEnd = nextGame.board[0]?.left;
    const rightEnd = nextGame.board.at(-1)?.right;
    const hasMove = nextPlayer.hand.some((tile) => nextGame.board.length === 0 || tile.left === leftEnd || tile.right === leftEnd || tile.left === rightEnd || tile.right === rightEnd);
    if (!hasMove && finishBlockedDominoGame(nextGame)) {
      setGame(nextGame);
      setMessage(text.noMove);
      return;
    }
    if (!canPlayerMove(nextGame, practicePlayer)) advanceTurn(nextGame);
    setGame(nextGame);
    setMessage(text.stockEmpty);
  }

  if (!game) return <AppLayout lockViewport><div className="mesa-panel rounded-3xl p-10 text-center text-slate-400">{text.loading}</div></AppLayout>;

  const player = game.players[0];
  const opponent = game.players[1];
  const leftEnd = game.board[0]?.left;
  const rightEnd = game.board.at(-1)?.right;

  return <AppLayout lockViewport><div className="mx-auto max-w-5xl space-y-5">
    <Link href="/games" className="flex w-fit items-center gap-2 text-sm font-bold text-slate-400 hover:text-white"><ArrowLeft size={17} /> {text.back}</Link>
    <section className="mesa-panel-gold rounded-3xl p-5 md:p-7">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><div><p className="text-xs font-bold uppercase tracking-[.24em] text-amber-300">{text.mode}</p><h1 className="mt-1 text-3xl font-black">{text.title}</h1><p className="mt-1 text-sm text-slate-400">{text.description}</p></div><button onClick={restart} className="mesa-action flex items-center gap-2"><RotateCcw size={17} /> {text.newGame}</button></div>
      <div className="mt-5 flex flex-wrap items-center gap-2"><span className="mr-1 text-xs font-black uppercase tracking-[.18em] text-slate-400">{text.set}</span><button onClick={() => selectSet(6)} className={`rounded-xl px-4 py-2 text-sm font-black transition ${maxPip === 6 ? "bg-blue-600 text-white" : "border border-slate-600 bg-slate-950/50 text-slate-300"}`}>{text.doubleSix}</button><button onClick={() => selectSet(9)} className={`rounded-xl px-4 py-2 text-sm font-black transition ${maxPip === 9 ? "bg-blue-600 text-white" : "border border-slate-600 bg-slate-950/50 text-slate-300"}`}>{text.doubleNine}</button></div>
    </section>
    <section className="domino-table-scene game-3d-stage rounded-[2rem] p-4 pt-36 md:p-7 md:pt-44">
      <div className="mb-5 flex justify-center -space-x-3" aria-label={`${opponent.hand.length} fichas de La Mesa`}>{opponent.hand.map((tile) => <span key={tile.id} className="h-14 w-8 rounded-md border-2 border-amber-100/35 bg-[radial-gradient(circle,#164f39,#071d15)] shadow-[0_8px_18px_rgba(0,0,0,.45)]" />)}</div>
      <div className="mb-4 grid grid-cols-2 gap-3 text-center"><div className="rounded-xl border border-amber-200/20 bg-slate-950/55 p-3"><p className="text-xs font-bold uppercase text-slate-400">{text.left}</p><p className="mt-1 text-2xl font-black text-amber-200">{leftEnd ?? "–"}</p></div><div className="rounded-xl border border-amber-200/20 bg-slate-950/55 p-3"><p className="text-xs font-bold uppercase text-slate-400">{text.right}</p><p className="mt-1 text-2xl font-black text-amber-200">{rightEnd ?? "–"}</p></div></div>
      <div className="flex min-h-[280px] flex-wrap content-center justify-center gap-1 rounded-[2rem] border border-amber-100/10 bg-black/5 p-4 shadow-inner shadow-black/20">{game.board.length === 0 ? <p className="text-sm font-bold uppercase tracking-[.18em] text-emerald-100/60">{text.ready}</p> : game.board.map((tile) => <DominoTile key={tile.id} tile={tile} />)}</div>
      <div className="mt-5 rounded-2xl border border-slate-700 bg-slate-950/65 p-4"><p className="text-sm text-slate-300">{game.status === "finished" && game.winner ? <span className="flex items-center gap-2 font-black text-amber-200"><Trophy size={18} /> {message}</span> : message}</p><div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto]"><div className="flex rounded-xl border border-slate-700 p-1"><button onClick={() => setSide("left")} className={`flex-1 rounded-lg px-4 py-2 text-sm font-black ${side === "left" ? "bg-blue-600 text-white" : "text-slate-400"}`}>{text.placeLeft}</button><button onClick={() => setSide("right")} className={`flex-1 rounded-lg px-4 py-2 text-sm font-black ${side === "right" ? "bg-blue-600 text-white" : "text-slate-400"}`}>{text.placeRight}</button></div><button onClick={draw} disabled={game.status !== "playing"} className="mesa-action flex items-center justify-center gap-2 disabled:opacity-40"><Layers size={17} /> {text.draw} ({game.stock.length})</button></div></div>
      <p className="mt-6 text-center text-sm font-bold text-slate-400">{text.tiles} · {player.hand.length} {text.remaining}</p><div className="mt-3 flex flex-wrap justify-center gap-2">{player.hand.map((tile) => <DominoTile key={tile.id} tile={tile} onClick={() => play(tile)} />)}</div>
      {game.status === "finished" && <div className="mt-5 flex items-center justify-center gap-2 rounded-2xl bg-emerald-500/15 p-4 font-black text-emerald-200"><CircleCheck size={20} /> {game.winner ? text.complete : text.blocked}</div>}
    </section>
  </div></AppLayout>;
}
