import { DominoGame } from "@/types/domino";

export function isCurrentPlayerWinner(
  game: DominoGame
) {
  return game.winner === game.currentTurn;
}