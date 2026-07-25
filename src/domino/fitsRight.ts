import { DominoTile } from "@/types/domino";

export function fitsRight(
  boardRight: number,
  tile: DominoTile
): boolean {
  return (
    tile.left === boardRight ||
    tile.right === boardRight
  );
}