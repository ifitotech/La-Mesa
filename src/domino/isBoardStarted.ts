import { DominoGame } from "@/types/domino";

export function isBoardStarted(
  game: DominoGame
) {
  return game.board.length > 0;
}