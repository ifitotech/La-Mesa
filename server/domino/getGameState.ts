import { DominoGame } from "@/types/domino";

export function getGameState(
  game: DominoGame
) {
  return {
    status: game.status,
    currentTurn: game.currentTurn,
  };
}