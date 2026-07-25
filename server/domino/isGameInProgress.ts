import { DominoGame } from "@/types/domino";

export function isGameInProgress(
  game: DominoGame
) {
  return game.status === "playing";
}