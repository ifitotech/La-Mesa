import { DominoGame } from "@/types/domino";

export function serializeGame(
  game: DominoGame
): string {
  return JSON.stringify(game);
}