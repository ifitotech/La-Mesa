import { DominoGame } from "@/types/domino";

export function getBoardRight(
  game: DominoGame
) {
  if (game.board.length === 0) {
    return null;
  }

  return game.board[game.board.length - 1].right;
}