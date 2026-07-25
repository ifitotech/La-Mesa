import { DominoGame } from "@/types/domino";

export function getCurrentPlayerUid(
  game: DominoGame
) {
  return game.currentTurn;
}