import { DominoGame } from "@/types/domino";

export function getCurrentPlayerUidOrNull(
  game: DominoGame
) {
  return game.currentTurn ?? null;
}