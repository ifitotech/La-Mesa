"use client";

import { useDominoStore } from "@/stores/useDominoStore";
import DominoTile from "./DominoTile";

export function DominoBoard() {
  const game = useDominoStore(
    (s) => s.game
  );

  if (!game) return null;

  return (
    <section className="flex min-h-[180px] flex-wrap content-center justify-center gap-1 rounded-[2rem] border-[10px] border-[#5c3517] bg-[radial-gradient(circle_at_center,#17653b,#0a321d)] p-5 shadow-[inset_0_0_0_3px_#b17a3c,inset_0_0_40px_#031b0d,0_15px_35px_rgba(0,0,0,.3)]">
      {game.board.map((tile) => (
        <DominoTile key={tile.id} tile={tile} />
      ))}
    </section>
  );
}
