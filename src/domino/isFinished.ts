import { DominoGame } from "@/types/domino";

export function isFinished(
  game: DominoGame
) {
  return game.status === "finished";
}