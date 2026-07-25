import { DominoGame } from "@/types/domino";

export function getRound(
  game: DominoGame
): number {
  return game.round;
}