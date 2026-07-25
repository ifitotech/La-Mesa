"use client";

import { useDominoStore } from "@/stores/useDominoStore";
import DominoTile from "./DominoTile";

export function DominoBoard() {
  const game = useDominoStore(
    (s) => s.game
  );

  if (!game) return null;

  return (
    <section className="flex min-h-[180px] flex-wrap content-center justify-center gap-1 rounded-[2rem] border-[8px] border-[#7b5123] bg-[radial-gradient(circle_at_center,#1e6446,#0b2d20_68%,#071c14)] p-5 shadow-[inset_0_0_0_2px_#d2a752,inset_0_0_55px_#031b0d,0_18px_42px_rgba(0,0,0,.35)]">
      {game.board.map((tile) => (
        <DominoTile key={tile.id} tile={tile} />
      ))}
    </section>
  );
}
