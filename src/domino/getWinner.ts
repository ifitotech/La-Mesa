import { DominoGame } from "@/types/domino";

export function getWinner(
  game: DominoGame
): string | undefined {
  return game.winner;
}