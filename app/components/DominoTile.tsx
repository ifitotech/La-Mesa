"use client";

import { DominoTile as Tile } from "@/types/domino";
import DominoPip from "./DominoPip";

type Props = {
  tile: Tile;
  onClick?: () => void;
};

function DominoTile({
  tile,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      type="button"
      className="game-3d-card flex h-24 w-14 flex-col overflow-hidden rounded-lg border-2 border-stone-300 bg-gradient-to-br from-stone-50 to-stone-200 text-black transition hover:border-amber-300 disabled:cursor-not-allowed disabled:opacity-60"
    >
      <div className="flex flex-1 items-center justify-center border-b border-stone-400">
        <DominoPip value={tile.left} />
      </div>

      <div className="flex flex-1 items-center justify-center">
        <DominoPip value={tile.right} />
      </div>
    </button>
  );
}

export default DominoTile;
