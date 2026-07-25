import { DominoGame } from "@/types/domino";

export function restartRound(
  game: DominoGame
): void {
  game.board = [];
  game.stock = [];
  game.round += 1;
  game.winner = undefined;
  game.status = "waiting";
}