import { DominoGame } from "@/types/domino";

export function isPlayerWinner(
  game: DominoGame,
  uid: string
): boolean {
  return game.winner === uid;
}