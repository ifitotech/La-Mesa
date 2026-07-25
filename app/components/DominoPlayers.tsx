"use client";

import { useDominoStore } from "@/stores/useDominoStore";

export function DominoPlayers() {
  const game = useDominoStore(
    (s) => s.game
  );

  if (!game) return null;

  return (
    <section className="grid gap-2 sm:grid-cols-2">
      {game.players.map((player) => (
        <div
          key={player.uid}
          className={`rounded-2xl border bg-slate-950/70 p-3 ${
            game.currentTurn === player.uid
              ? "border-emerald-400 shadow-[0_0_16px_rgba(74,222,128,.18)]"
              : "border-slate-700"
          }`}
        >
          <div className="font-bold">{player.uid}</div>
          <div className="mt-1 flex justify-between text-sm text-slate-400"><span>Fichas: {player.hand.length}</span><span>{player.points} pts</span></div>
        </div>
      ))}
    </section>
  );
}
