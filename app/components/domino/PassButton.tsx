"use client";

import { useDominoStore } from "@/stores/useDominoStore";
import { dominoService } from "@/services/domino";

export function PassButton() {
  const game = useDominoStore((s) => s.game);

  if (!game) return null;

  return (
    <button
      onClick={() =>
        dominoService.pass(
          game.roomId
        )
      }
      className="rounded-lg bg-orange-600 px-4 py-2 text-white"
    >
      Pasar turno
    </button>
  );
}