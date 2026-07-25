import { DominoGame, DominoTile } from "@/types/domino";

export function canPlaceRight(
  game: DominoGame,
  tile: DominoTile
): boolean {
  if (game.board.length === 0) {
    return true;
  }

  const right =
    game.board[game.board.length - 1].right;

  return (
    tile.left === right ||
    tile.right === right
  );
}