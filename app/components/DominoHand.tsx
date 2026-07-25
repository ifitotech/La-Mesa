"use client";

import { useMemo } from "react";

import { dominoService } from "@/services/domino";
import { useDominoStore } from "@/stores/useDominoStore";
import { useAuth } from "@/hooks/useAuth";
import DominoTile from "./DominoTile";

export function DominoHand() {
  const game = useDominoStore((s) => s.game);

  const { user } = useAuth();

  const uid = user?.uid;

  const player = useMemo(() => {
    if (!game || !uid) return null;

    return (
      game.players.find((p) => p.uid === uid) ?? null
    );
  }, [game, uid]);

  if (!game || !player || !uid) {
    return null;
  }

  const isMyTurn = game.currentTurn === uid;

  return (
    <section className="flex flex-wrap justify-center gap-2 rounded-2xl border border-amber-200/15 bg-black/25 p-3">
      {player.hand.map((tile) => (
        <DominoTile
          key={tile.id}
          onClick={() =>
            isMyTurn && dominoService.play(game.roomId, uid, tile.id, "right")
          }
          tile={tile}
        />
      ))}
    </section>
  );
}
