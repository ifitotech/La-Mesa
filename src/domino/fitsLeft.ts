import { DominoTile } from "@/types/domino";

export function fitsLeft(
  boardLeft: number,
  tile: DominoTile
): boolean {
  return (
    tile.left === boardLeft ||
    tile.right === boardLeft
  );
}