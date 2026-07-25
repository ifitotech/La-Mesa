import { DominoGame } from "@/types/domino";

export function assertPlayerTurn(
  game: DominoGame,
  uid: string
): void {
  if (game.currentTurn !== uid) {
    throw new Error("No es el turno del jugador.");
  }
}