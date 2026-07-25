import { DominoGame } from "@/types/domino";

export function getBoardMiddle(
  game: DominoGame
) {
  if (game.board.length === 0) {
    return null;
  }

  return game.board[
    Math.floor(game.board.length / 2)
  ];
}