"use client";

import { PositionedTile } from "@/server/domino/layoutBoard";
import DominoTile from "./DominoTile";

type Props = {
  board: PositionedTile[];
};

export default function DominoTable({
  board,
}: Props) {
  return (
    <div className="relative h-[700px] w-full overflow-auto rounded-3xl bg-green-700">
      {board.map((tile) => (
        <div
          key={tile.id}
          className="absolute transition-all duration-300"
          style={{
            left: tile.x,
            top: tile.y,
          }}
        >
          <DominoTile
            tile={{
              id: tile.id,
              left: tile.left,
              right: tile.right,
            }}
          />
        </div>
      ))}
    </div>
  );
}