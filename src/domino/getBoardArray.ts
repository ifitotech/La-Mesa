import { DominoGame } from "@/types/domino";

export function getBoardArray(
  game: DominoGame
) {
  return [...game.board];
}