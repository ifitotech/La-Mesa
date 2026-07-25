import { DominoGame } from "@/types/domino";

export function isCurrentTurn(
  game: DominoGame,
  uid: string
) {
  return game.currentTurn === uid;
}