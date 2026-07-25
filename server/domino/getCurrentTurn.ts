import { DominoGame } from "@/types/domino";

export function getCurrentTurn(
  game: DominoGame
) {
  return game.currentTurn;
}