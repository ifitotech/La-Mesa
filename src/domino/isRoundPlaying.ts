import { DominoGame } from "@/types/domino";

export function isRoundPlaying(
  game: DominoGame
): boolean {
  return game.status === "playing";
}