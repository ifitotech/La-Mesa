import { DominoGame } from "@/types/domino";

export function getBoardSize(
  game: DominoGame
): number {
  return game.board.length;
}