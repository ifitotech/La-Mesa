import { DominoGame } from "@/types/domino";

export function getWinnerExists(
  game: DominoGame
) {
  return Boolean(game.winner);
}