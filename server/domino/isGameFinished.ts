import { DominoGame } from "@/types/domino";

export function isGameFinished(
  game: DominoGame
): boolean {
  return game.status === "finished";
}