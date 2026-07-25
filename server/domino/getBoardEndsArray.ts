import { DominoGame } from "@/types/domino";

export function getBoardEndsArray(
  game: DominoGame
) {
  if (game.board.length === 0) {
    return [];
  }

  return [
    game.board[0].left,
    game.board[game.board.length - 1].right,
  ];
}