import { DominoGame, DominoTile } from "@/types/domino";

export function canPlaceLeft(
  game: DominoGame,
  tile: DominoTile
): boolean {
  if (game.board.length === 0) {
    return true;
  }

  const left = game.board[0].left;

  return (
    tile.left === left ||
    tile.right === left
  );
}