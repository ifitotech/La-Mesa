import { DominoGame } from "@/types/domino";

export function hasWinner(
  game: DominoGame
): boolean {
  return game.winner !== undefined;
}