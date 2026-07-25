import { DominoGame } from "@/types/domino";

export function setWinner(
  game: DominoGame,
  uid: string
): void {
  game.winner = uid;
}