import { DominoGame } from "@/types/domino";

export function getBoardLeftValue(
  game: DominoGame
) {
  if (game.board.length === 0) {
    return null;
  }

  return game.board[0].left;
}