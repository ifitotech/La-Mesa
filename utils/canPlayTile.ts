import { DominoTile } from "@/types/domino";

export function canPlayTile(
  tile: DominoTile,
  board: DominoTile[]
) {
  if (board.length === 0) return true;

  const left = board[0].left;
  const right = board[board.length - 1].right;

  return (
    tile.left === left ||
    tile.right === left ||
    tile.left === right ||
    tile.right === right
  );
}