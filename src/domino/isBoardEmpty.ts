import { DominoGame } from "@/types/domino";

export function isBoardEmpty(
  game: DominoGame
): boolean {
  return game.board.length === 0;
}