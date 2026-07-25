import { DominoTile } from "@/types/domino";
import { flipTile } from "./flipTile";

export function normalizeTileForLeft(
  boardLeft: number,
  tile: DominoTile
): DominoTile {
  if (tile.right === boardLeft) {
    return tile;
  }

  return flipTile(tile);
}