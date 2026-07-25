import { DominoGame } from "@/types/domino";

export function getGameStatus(
  game: DominoGame
) {
  return game.status;
}