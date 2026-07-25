import { DominoGame } from "@/types/domino";

export function declareWinner(
  game: DominoGame,
  uid: string
): void {
  game.winner = uid;
  game.status = "finished";
}