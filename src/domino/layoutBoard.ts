import { DominoTile } from "@/types/domino";

export type PositionedTile = DominoTile & {
  x: number;
  y: number;
  horizontal: boolean;
};

const STEP = 72;

export function layoutBoard(
  board: DominoTile[]
): PositionedTile[] {
  let x = 0;
  let y = 0;

  let direction = 1;

  const positioned: PositionedTile[] = [];

  board.forEach((tile, index) => {

    positioned.push({
      ...tile,
      x,
      y,
      horizontal: true,
    });

    x += STEP * direction;

    if ((index + 1) % 8 === 0) {
      y += STEP;
      direction *= -1;
    }

  });

  return positioned;
}