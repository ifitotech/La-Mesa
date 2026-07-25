import { DominoGame } from "@/types/domino";

export function canPlay(
  game: DominoGame,
  playerId: string
) {
  return game.currentTurn === playerId;
}