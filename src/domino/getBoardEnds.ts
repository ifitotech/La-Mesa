import { DominoGame } from "@/types/domino";

export function getBoardEnds(
  game: DominoGame
): { left: number; right: number } | undefined {
  if (game.board.length === 0) {
    return undefined;
  }

  return {
    left: game.board[0].left,
    right: game.board[game.board.length - 1].right,
  };
}