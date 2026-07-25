import { DominoGame } from "@/types/domino";

export function isPlayerTurn(
  game: DominoGame,
  playerId: string
) {
  return game.currentTurn === playerId;
}