import { DominoTile } from "@/types/domino";
import { flipTile } from "./flipTile";

export function normalizeTileForRight(
  boardRight: number,
  tile: DominoTile
): DominoTile {
  if (tile.left === boardRight) {
    return tile;
  }

  return flipTile(tile);
}