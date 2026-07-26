"use client";

import Link from "next/link";
import { ArrowLeft, ChevronLeft, ChevronRight, Layers, RotateCcw, Trophy } from "lucide-react";
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
  const playerPoints = player.hand.reduce((total, tile) => total + tile.left + tile.right, 0);
  const opponentPoints = opponent.hand.reduce((total, tile) => total + tile.left + tile.right, 0);
  const isPlayerTurn = game.status === "playing" && game.currentTurn === practicePlayer;

  return <AppLayout immersive lockViewport>
    <div className="domino-premium-screen">
      <header className="domino-premium-hud">
        <Link href="/games" aria-label={text.back}><ArrowLeft size={20} /></Link>
        <h1>LA MESA <b>{text.title}</b></h1>
        <div className="domino-hud-actions">
          <button onClick={() => selectSet(6)} className={maxPip === 6 ? "active" : ""}>6</button>
          <button onClick={() => selectSet(9)} className={maxPip === 9 ? "active" : ""}>9</button>
          <button onClick={restart} aria-label={text.newGame}><RotateCcw size={18} /></button>
        </div>
      </header>

      <main className="domino-premium-table">
        <section className="domino-premium-opponent">
          <div className="domino-premium-profile"><span>LM</span><div><strong>La Mesa</strong><small>{opponent.hand.length} fichas · {opponentPoints} pts</small></div></div>
          <div className="domino-premium-hidden">{opponent.hand.map((tile) => <i key={tile.id} />)}</div>
        </section>

        <section className="domino-premium-chain">
          <button onClick={() => setSide("left")} className={side === "left" ? "active" : ""} aria-label={text.placeLeft}><ChevronLeft /><strong>{leftEnd ?? "—"}</strong></button>
          <div>{game.board.length ? game.board.map((tile) => <DominoTile key={tile.id} tile={tile} orientation="horizontal" />) : <span>{text.ready}</span>}</div>
          <button onClick={() => setSide("right")} className={side === "right" ? "active" : ""} aria-label={text.placeRight}><strong>{rightEnd ?? "—"}</strong><ChevronRight /></button>
        </section>

        <section className="domino-premium-player">
          <div className="domino-premium-status">{game.status === "finished" && <Trophy size={17} />}<span>{message}</span></div>
          <div className="domino-premium-hand">{player.hand.map((tile) => <DominoTile key={tile.id} tile={tile} onClick={() => play(tile)} />)}</div>
          <div className="domino-premium-bottom">
            <div className="domino-premium-profile"><span>TÚ</span><div><strong>{isPlayerTurn ? (isEnglish ? "Your turn" : "Tu turno") : (isEnglish ? "Waiting" : "Esperando")}</strong><small>{player.hand.length} fichas · {playerPoints} pts</small></div></div>
            <button onClick={draw} disabled={!isPlayerTurn}><Layers size={19} /> {text.draw}<b>{game.stock.length}</b></button>
          </div>
        </section>
      </main>
    </div>
  </AppLayout>;
}
