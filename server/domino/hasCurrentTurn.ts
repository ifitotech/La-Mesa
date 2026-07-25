import { DominoGame } from "@/types/domino";

export function hasCurrentTurn(
  game: DominoGame
) {
  return game.currentTurn !== "";
}