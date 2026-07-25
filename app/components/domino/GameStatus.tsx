"use client";

import { useDominoStore } from "@/stores/useDominoStore";

export function GameStatus() {
  const game = useDominoStore((s) => s.game);

  if (!game) return null;

  return (
    <div className="rounded-lg border p-4">
      <p>
        Estado: <b>{game.status}</b>
      </p>

      <p>
        Turno: <b>{game.currentTurn}</b>
      </p>

      <p>
        Fichas en el pozo: <b>{game.stock.length}</b>
      </p>

      {game.winner && (
        <p>
          Ganador: <b>{game.winner}</b>
        </p>
      )}
    </div>
  );
}