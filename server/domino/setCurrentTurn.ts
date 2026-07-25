import { DominoGame } from "@/types/domino";

export function setCurrentTurn(
  game: DominoGame,
  uid: string
): void {
  game.currentTurn = uid;
}