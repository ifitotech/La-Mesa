import { DominoGame } from "@/types/domino";

export function isCurrentPlayer(
  game: DominoGame,
  uid: string
) {
  return game.currentTurn === uid;
}