import { DominoTile } from "@/types/domino";

export function createSet(maxPip = 6): DominoTile[] {
  const tiles: DominoTile[] = [];

  for (let left = 0; left <= maxPip; left++) {
    for (let right = left; right <= maxPip; right++) {
      tiles.push({
        id: crypto.randomUUID(),
        left,
        right,
      });
    }
  }

  return tiles;
}
