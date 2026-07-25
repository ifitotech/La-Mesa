"use client";

import Link from "next/link";
import { ArrowLeft, Layers, RotateCcw } from "lucide-react";
import { useState } from "react";

import AppLayout from "@/app/components/AppLayout";
import DominoTile from "@/app/components/DominoTile";
import { createGame } from "@/server/domino/createGame";
import { drawTile } from "@/server/domino/drawTile";
import { playTile } from "@/server/domino/playTile";
import { DominoGame } from "@/types/domino";

const practicePlayer = "practice-player";

function newPracticeGame() {
  return createGame("practice", [practicePlayer]);
}

export default function SoloDominoPage() {
  const [game, setGame] = useState<DominoGame>(newPracticeGame);
  const [message, setMessage] = useState("Juega cualquier ficha para comenzar.");
  const player = game.players[0];

  function refresh(message: string) {
    setGame({ ...game, board: [...game.board], stock: [...game.stock], players: game.players.map((item) => ({ ...item, hand: [...item.hand] })) });
    setMessage(message);
  }

  function play(tileId: string) {
    if (playTile(game, practicePlayer, tileId)) {
      refresh(player.hand.length === 0 ? "¡Ganaste la práctica!" : "Buena jugada. Sigue colocando fichas.");
      return;
    }
    setMessage("Esa ficha no encaja. Prueba otra o roba del pozo.");
  }

  function draw() {
    refresh(drawTile(player, game.stock) ? "Robaste una ficha." : "El pozo está vacío.");
  }

  return <AppLayout>
    <div className="mx-auto max-w-5xl space-y-5">
      <Link href="/games" className="flex w-fit items-center gap-2 text-sm font-bold text-slate-400 hover:text-white"><ArrowLeft size={17} /> Juegos</Link>
      <section className="mesa-panel-gold rounded-3xl p-5 md:p-7"><div className="flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-[.24em] text-amber-300">Modo individual</p><h1 className="mt-1 text-3xl font-black">Dominó de práctica</h1></div><button onClick={() => { setGame(newPracticeGame()); setMessage("Nueva partida lista."); }} className="mesa-action flex items-center gap-2"><RotateCcw size={17} /> Reiniciar</button></div></section>
      <section className="mesa-panel-gold rounded-3xl p-5 md:p-7">
        <div className="flex min-h-[260px] flex-wrap content-center justify-center gap-1 rounded-[2rem] border-[10px] border-[#5c3517] bg-[radial-gradient(circle_at_center,#17653b,#0a321d)] p-5 shadow-[inset_0_0_0_3px_#b17a3c,inset_0_0_40px_#031b0d]">
          {game.board.length === 0 ? <p className="text-sm font-bold text-emerald-100/70">La mesa está lista.</p> : game.board.map((tile) => <DominoTile key={tile.id} tile={tile} />)}
        </div>
        <div className="mt-5 flex items-center justify-between rounded-2xl border border-slate-700 bg-slate-950/65 p-4"><p className="text-sm text-slate-300">{message}</p><button onClick={draw} className="mesa-action flex shrink-0 items-center gap-2"><Layers size={17} /> Robar ({game.stock.length})</button></div>
        <p className="mt-6 text-center text-sm font-bold text-slate-400">Tus fichas</p>
        <div className="mt-3 flex flex-wrap justify-center gap-2">{player.hand.map((tile) => <DominoTile key={tile.id} tile={tile} onClick={() => play(tile.id)} />)}</div>
      </section>
    </div>
  </AppLayout>;
}
