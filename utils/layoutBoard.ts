import { DominoTile } from "@/types/domino";

export interface PositionedTile extends DominoTile {
  x: number;
  y: number;
  rotation: number;
  horizontal: boolean;
}

const STEP = 70;
const LIMIT = 7;

export function layoutBoard(board: DominoTile[]): PositionedTile[] {
  let x = 0;
  let y = 0;

  let dir = 1;

  const positioned: PositionedTile[] = [];

  board.forEach((tile, index) => {
    const turn = Math.floor(index / LIMIT);

    let rotation = 0;
    const horizontal = true;

    if (turn % 2 === 1) {
      rotation = 180;
    }

    if (index !== 0 && index % LIMIT === 0) {
      y += STEP;
      dir *= -1;
    }

    positioned.push({
      ...tile,
      x,
      y,
      rotation,
      horizontal,
    });

    x += STEP * dir;
  });

  return positioned;
}
