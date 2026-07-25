"use client";

import { useDominoStore } from "@/stores/useDominoStore";

export function WinnerModal() {
  const game = useDominoStore((s) => s.game);

  if (!game?.winner) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70">
      <div className="rounded-xl bg-white p-8 text-center text-black">
        <h2 className="mb-4 text-3xl font-bold">
          ¡Partida terminada!
        </h2>

        <p className="text-xl">
          Ganador: {game.winner}
        </p>
      </div>
    </div>
  );
}