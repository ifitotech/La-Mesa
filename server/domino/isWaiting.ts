import { DominoGame } from "@/types/domino";

export function isWaiting(
  game: DominoGame
) {
  return game.status === "waiting";
}