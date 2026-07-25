import { DominoGame } from "@/types/domino";

export function getTurnNumber(
  game: DominoGame
) {
  return game.currentTurn;
}