import { DominoTile } from "@/types/domino";

export function createSet(): DominoTile[] {
  const tiles: DominoTile[] = [];

  for (let left = 0; left <= 6; left++) {
    for (let right = left; right <= 6; right++) {
      tiles.push({
        id: crypto.randomUUID(),
        left,
        right,
      });
    }
  }

  return tiles;
}