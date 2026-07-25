import { DominoGame } from "@/types/domino";

export function getBoardExtremes(
  game: DominoGame
) {
  if (game.board.length === 0) {
    return null;
  }

  return {
    left: game.board[0].left,
    right: game.board[game.board.length - 1].right,
  };
}