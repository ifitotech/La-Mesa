import { DominoTile } from "@/types/domino";

export function flipTile(
  tile: DominoTile
): DominoTile {
  return {
    ...tile,
    left: tile.right,
    right: tile.left,
  };
}